# 事后分析：在 Next.js 中通过请求头检测 RSC 上下文

## 问题参考

* [PR #7625](https://github.com/better-auth/better-auth/pull/7625) - 首次基于请求头的检测
* [PR #7763](https://github.com/better-auth/better-auth/pull/7763) - 改为 cookie 探测
* [PR #9059](https://github.com/better-auth/better-auth/pull/9059) - 回退到基于请求头的检测
* [PR #9851](https://github.com/better-auth/better-auth/pull/9851) - 尝试通过代理转发该请求头

## 摘要

你无法通过读取 Next.js 中的 `RSC` 请求头来检测 RSC 请求。
浏览器会在软导航时发送 `RSC: 1`，但 Next.js 会将 `rsc`、`next-router-state-tree`、`next-router-prefetch` 等视为内部
Flight 请求头，并在用户代码运行之前，从所有用户可访问的表面上移除它们。无论是 Server Component 的 `headers()` 还是代理的
`request.headers`，看到的都是 `null`。任何基于读取这些请求头来进行 RSC 检测的方案都会在一开始就失效，而贡献者却不断把它重新引入。

## 反复出现的历史

这段逻辑已经在四个 PR 中反复循环，每一次都只是用一个真实问题去换另一个问题：

1. **#7625** 引入了基于请求头的检测（`RSC: 1`）。
2. **#7763** 发现该请求头不可访问，于是改为 cookie
   探测：先 `cookies().set()` 再 `delete()`，用来测试是否可写。
3. **#9059** 又回退到基于请求头的检测，因为该探测的
   `cookies().set()` 会无条件地使路由缓存失效，
   导致无限刷新循环（#8464）以及泄漏的探测 cookie
   （#8828）。它假设客户端发起的 flight 请求中存在 `RSC: 1`。在 Next.js 16 中并不是这样。
4. **#9851**（外部贡献者）假设只有在存在代理/middleware 时该请求头才会被移除，并试图把它转发到一个自定义的 `x-better-auth-is-rsc` 请求头中。实际上代理也根本看不到它。

## 根本原因

### Next.js 会在所有表面上移除 Flight 请求头

`FLIGHT_HEADERS` 会在两个彼此独立的地方被删除，而且都发生在用户
代码运行之前（固定到 Next.js `v16.3.0-canary.36`，SHA `58e8c0b`）：

* 代理路径，在构建 `NextRequestHint` 之前：
  [`server/web/adapter.ts`](https://github.com/vercel/next.js/blob/58e8c0b4457f8f7cb737158efc543f3708f3e6e3/packages/next/src/server/web/adapter.ts#L164-L172)
* `headers()` 路径，在 `getHeaders()` 中：
  [`server/async-storage/request-store.ts`](https://github.com/vercel/next.js/blob/58e8c0b4457f8f7cb737158efc543f3708f3e6e3/packages/next/src/server/async-storage/request-store.ts#L29-L36)

Next.js 这样做是有意的，因此 RSC 请求不会被区别对待，
而是与其 HTML 对应请求保持一致。该行为在
[RSC requests and rewrites](https://nextjs.org/docs/app/api-reference/file-conventions/proxy#rsc-requests-and-rewrites) 中有文档说明。

```ts
// 错误 - 在 RSC 中始终为 null，无论是否有代理
const isRSC = (await headers()).get("RSC") === "1"

// 也错误 - 代理同样会把它移除，根本没有东西可转发
requestHeaders.set("x-better-auth-is-rsc", request.headers.get("RSC"))
```

### 为什么这两种修复方式会以不同方式失败

* **Cookie 探测（#7763）**：可以作为信号，但 `cookies().set()`
  会在每次调用时使路由缓存失效。这个副作用不可接受。
* **读取请求头（#7625、#9059）**：没有任何副作用，但请求头
  从来就不存在。属于静默无操作。

### 为什么测试仍然通过

`next-js.test.ts` 中的回归测试对 `next/headers` 进行了 mock：

```ts
headers: vi.fn(async () => new Headers({ RSC: "1" }))
```

`new Headers({ RSC: "1" })` 是真实 Next.js 运行时永远不会产生的输入，
因为它会先把该请求头移除。mock 只会返回测试传入的内容，
因此整个测试套件只能证明代码与 mock 一致，而不能证明 mock 与运行时一致。
这正是 mocking 边界的内在局限：你是在 stub 边界的输出，而不是在验证产生该输出的规则。

## 如何验证

运行一个真实的 Next.js 应用，而不是单元测试。一个在软导航时输出
`(await headers()).get("RSC")` 的 Server Component 会打印 `null`，即使 DevTools 显示
`?_rsc=...` 请求上有 `RSC: 1`。记录 `request.headers.get("RSC")` 的 `proxy.ts`
也同样会打印 `null`。

## 经验教训

1. **内部 Flight 请求头对用户不可访问。** 从 `headers()` 或 `request.headers` 读取 `RSC`
   总是返回 `null`。
2. **mock 无法验证对真实模块的假设。** 测试将 `headers()` stub 成返回一个运行时从不发出的值，
   因此绿灯测试套件只能证明代码与 mock 一致。mock 一个边界时，你是在 stub 它的输出，而不是在验证移除该请求头的规则。依赖这条规则的行为应该放在真实应用或 e2e 检查中。
3. **两个方向都走不通。** 读取请求头是无操作，代理
   转发也是无操作，cookie 探测则有不可接受的副作用。
4. **检测本身就是错误目标。** 它存在的唯一目的，是在 cookie 无法写入时跳过 session 刷新。
   应该让刷新具备幂等性，这样在那种情况下也不会有害，而不是去检测上下文。
5. **这是一个反复出现的贡献者假设。** 当 PR 读取 `RSC` 请求头时，请在评审中链接本文档。

## 预防措施

1. 在检测位置添加一条代码注释，指向这篇事后分析。
2. 拒绝那些从 `headers()` 或代理中读取 `RSC` / `next-router-*` 的 PR。链接上面提到的两处 Next.js 源码行。
