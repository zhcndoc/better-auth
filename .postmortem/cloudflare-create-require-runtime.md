# 事后复盘：Cloudflare Workers `createRequire` Runtime Helper

## 问题引用

* [Issue #9983](https://github.com/better-auth/better-auth/issues/9983)
* [Issue #6690](https://github.com/better-auth/better-auth/issues/6690)
* [Issue #6665](https://github.com/better-auth/better-auth/issues/6665)
* [Issue #6638](https://github.com/better-auth/better-auth/issues/6638)
* [PR #6704](https://github.com/better-auth/better-auth/pull/6704)
* [PR #9657](https://github.com/better-auth/better-auth/pull/9657)

## 摘要

`better-auth@1.7.0-beta.4` 和 `1.7.0-beta.5` 重新引入了此前在 1.4.6 发布系列中出现过的 Cloudflare
Workers 启动崩溃问题。发布的 `better-auth` 包生成了以下共享的 rolldown runtime helper：

```js
import { createRequire } from "node:module";

var __require = /* @__PURE__ */ createRequire(import.meta.url);
```

Cloudflare Workers 可能会在打包后的输出中将 `import.meta.url` 保留为 undefined，因此该包会在模块求值阶段、应用程序代码运行之前崩溃。该崩溃影响了诸如 `better-auth/db` 这样的无关子路径，因为该 helper 位于被多个入口导入的共享 `_virtual/_rolldown/runtime.mjs` 文件中，而不仅仅是需要 CommonJS 互操作的 Node 特定代码中

## 再次出现的历史

此类 bug 已经再次出现过一次：

1. **1.4.6 报告（#6638、#6665、#6690）**：Cloudflare Workers 在启动期间崩溃，因为打包后的输出会急切调用 `createRequire(import.meta.url)`
2. **PR #6704**：添加了 Cloudflare smoke test，如果 Wrangler 输出包含 `createRequire`、`node:module` 或选定的仅限 Node 的模块，该测试就会失败
3. **PR #9657**：向 `better-auth/test` 添加了 `getHttpTestInstance`。该 helper 静态导入了 `listhen`，而 `listhen` 又在构建 `better-auth` 多入口包时引入了面向 CommonJS 的 Node server 依赖
4. **1.7.0-beta.4 和 beta.5**：发布的包再次包含了急切执行的共享 rolldown `__require` helper。现有 smoke test 没有失败，因为它检查的是 Wrangler 的最终 bundle，而不是发布包本身的 runtime helper

## 根本原因

### 仅用于测试的依赖污染了共享包 runtime

`packages/better-auth/src/test-utils/index.ts` 静态重新导出了 `http-test-instance.ts`，而该文件又静态导入了 `listhen`

由于 `better-auth/test` 是在同一个 `better-auth` 多入口构建中作为入口进行构建的，rolldown 将 `listhen` 及其传递依赖包含在了 `dist/node_modules/` 下。其中一些依赖需要 CommonJS 互操作，因此 rolldown 将 `__require` 添加到了共享 runtime helper 中

该 helper 在无关入口之间共享。导入 `better-auth/db` 的消费者并没有导入 `better-auth/test`，但仍然会求值同一个 runtime helper，并在 Workers 中崩溃

### 现有 smoke test 检查了错误的边界

Cloudflare smoke test 检查的是 Wrangler 对 fixture 进行打包和 tree-shaking 后的
`e2e/smoke/test/fixtures/cloudflare/dist/index.js`。这仍然有用，但它没有检查 npm 发布的
`packages/better-auth/dist/_virtual/_rolldown/runtime.mjs` 文件

包 runtime helper 是更早的契约边界。一旦其中包含急切执行的
`createRequire(import.meta.url)`，任何保留该 helper 的下游 bundler 都可能导致崩溃，即使另一个 fixture bundle 恰好将其 tree-shaking 掉也一样

## 修复

`getHttpTestInstance` 现在直接使用 `node:http.createServer()`，不再使用
`listhen`。该 helper 只需要一个由操作系统分配的本地 HTTP 端口，以及一个返回 promise 的
`close()` 方法，因此外部 listener 依赖是不必要的

Cloudflare smoke test 现在检查两个边界：

1. Wrangler 的最终 Worker bundle 仍然不能包含 `createRequire`、`node:fs` 或 `node:module`
2. 构建出的 `better-auth` rolldown runtime helper 不能包含 `createRequire`、`node:module` 或 `__require`

## 经验教训

1. **包 runtime helper 是 edge runtime 契约的一部分。** 只检查最终 app bundle 可能会遗漏已发布包的回归问题
2. **仅用于测试的导出可能污染多入口包中的 runtime 入口。** 如果某个子路径在同一个包中构建，静态导入可能会改变无关子路径所使用的共享 helper
3. **除非随后检查构建后的包 runtime，否则不要向 `better-auth/test` 添加外部 listener/server 依赖。** 当 Node 内置功能足够时，测试 helper 应优先使用 Node 内置功能
4. **生成的 `dist` 在本地可能已经过时。** 在宣布此类问题已修复或不受影响之前，请先重新构建

## 预防措施

1. 保留 Cloudflare smoke test 对
   `packages/better-auth/dist/_virtual/_rolldown/runtime.mjs` 的直接断言
2. 审查 `packages/better-auth/src/test-utils` 的变更时，重新构建
   `better-auth`，并扫描生成的 runtime helper 是否包含 `createRequire`、
   `node:module` 和 `__require`
3. 拒绝仅在生成的输出中对 `createRequire(import.meta.url)` 进行保护的修复。更安全的修复方式是从一开始就避免将 CommonJS 互操作引入共享 runtime helper
