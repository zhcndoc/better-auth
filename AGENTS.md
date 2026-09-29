# Better Auth 开发指南

这是 Better Auth 仓库——一个全面的 TypeScript 身份验证框架，旨在与运行时和框架无关。

## 项目结构

- `packages/better-auth` - 主身份验证库
- `packages/core` - 共享核心类型和实用工具
- `packages/cli` - CLI 工具
- `packages/*` - 数据库适配器、插件、集成
- `docs/` - 文档站点（Next.js + Fumadocs），内容位于 `docs/content/docs/`
- `test/` - 共享测试工作区
- `e2e/` - 端到端测试（smoke、adapter、integration）
- `demo/` - 示例应用

## 命令

- 始终使用 `pnpm`（绝不使用 npm、yarn 或 bun）
- 绝不要运行 `pnpm test`（这会运行所有包的测试）。请使用 `vitest path/to/test -t <pattern>`
- 类型检查：`pnpm typecheck`
- 在 `package.json` 或 `pnpm-workspace.yaml` 中更改依赖版本后，从受影响的工作区根目录运行 `pnpm install --lockfile-only`，以避免更新无关的 lockfile。使用 `pnpm install --frozen-lockfile` 进行验证。嵌套的 `demo/*` 工作区有各自单独的 lockfile。
- 格式化和 lint 会在提交时自动运行（Lefthook + Biome）。无需手动运行。

## 编写代码

- 必须兼容 Node.js、Bun、Deno 和 Cloudflare Workers。避免使用特定于运行时的 API。
- Biome（代码使用制表符，JSON 使用 2 个空格）
- 绝不要使用 `any`。绝不要使用类。
- 使用 `Uint8Array` 而非 `Buffer`（测试中除外）
- 以 `import * as z from "zod"` 的形式导入 zod
- 仅导入类型时使用 `import type`
- Node.js 内置模块使用 `node:` 协议（例如 `node:crypto`）
- 为公共 API 编写 JSDoc 注释
- Better Auth CLI 包已从 `@better-auth/cli` 更名为 `auth`。在文档和面向用户的消息中使用 `npx auth@latest`，同时在变更日志和解释此次更名的内容中保留历史引用。
- 插件应尽可能保持独立。处理插件时，优先修改插件，而非更改核心部分。

### URL 组合

- 向回调或重定向 URL 添加查询参数时，使用 `@better-auth/core/utils/url` 中的 `appendQueryParams`。将 origin 验证与信任验证分开处理。

```ts
const params = new URLSearchParams({ error });
const redirectURL = appendQueryParams(errorURL, params);

throw ctx.redirect(redirectURL);
```

### 占位邮箱

当前架构要求 `User.email` 必填且唯一，这是一个限制。

当某个流程必须合成邮箱时，使用 `createPlaceholderEmail`，并提供稳定的标识符和命名空间。确保占位邮箱未经验证，并保留将生成工作委托给用户代码的流程。

## 问题分类与架构

- 可复现的错误不一定就是 bug。首先要证明该行为违反了 Better Auth 文档约定、TypeScript 约定或既有运行时语义。
- 更改公共 API 行为之前，检查相关代码路径的现有文档、生成或推断出的类型、端点元数据、发布历史和 git 历史。将 `requireHeaders`、`requireRequest`、端点方法、schema 和 middleware 等长期存在的元数据视为 API 约定的一部分。
- 对于回归问题的说法，请对比确切报告的版本或标签。如果该行为在声称的版本之前就已存在，除非有其他约定能够证明相反，否则应将其归类为预期行为、文档缺失或集成使用不当。
- 区分无效用法与有效的空状态。例如：不带请求标头检查服务器会话属于无效用法；带有标头但没有会话 cookie 的服务器会话检查则是有效请求，会返回 `null`。
- 不要为了让运行时行为更宽松而弱化 TypeScript 指引，除非这是明确的架构决策。可选输入类型可能会让用户和代理难以发现集成错误。
- 当前行为符合预期但容易引起困惑时，优先改进文档或错误消息，而不是更改 API 约定。
- 审查或修复外部问题 PR 时，应根据周边约定验证问题和提议的修复，然后再改进 PR。如果 PR 更改了长期存在的约定，应在推送更改前指出这一点。

## 测试

- 大多数测试使用 Vitest；`e2e/` 下的部分测试使用 Playwright
- 使用 `better-auth/test` 中的 `getTestInstance()`。它会返回 `{ client, auth, sessionSetter, ... }`
- 通过 `clientOptions.plugins` 传入客户端插件
- 绝不要在测试中使用 `createAuthClient()` 创建单独的客户端
- 默认测试数据库为 SQLite 内存数据库；其他数据库请使用 `testWith`
- 适配器测试需要 Docker：`docker compose up -d`
- 回归测试：使用 `@see` 引用相关问题或权威来源。不要引用当前 pull request 或其审查评论：
  ```typescript
  /**
   * @see https://github.com/better-auth/better-auth/issues/{issue_number}
   */
  it("should handle the previously broken behavior", async () => {
    // ...
  });
  ```
- 多个回归测试共用同一引用时，将共享的 `@see` 放在聚焦的 `describe()` 上方。对于独立的回归测试，将其放在 `it()` 上方。

## 重要开发说明

- 修复 bug 和新增功能必须包含测试
  - 对于 bug 修复：确认可复现行为违反预期约定后，先编写一个失败的测试，再实现修复
- 更改公共 API 时，更新文档（`docs/content/docs/`）
- 完成前确保 `pnpm typecheck` 通过
- 除非用户明确要求，否则不要提交
- Conventional Commits：`feat(scope):`、`fix(scope):`、`docs:`、`chore:`。对于破坏性更改使用 `!`（例如 `feat(auth)!:`）
- PR 的目标分支为 `main`
