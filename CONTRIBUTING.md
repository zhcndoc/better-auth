# 为 Better Auth 做贡献

你好，非常感谢你有兴趣为 Better Auth 做贡献。本指南将帮助你开始参与。你的贡献会让 Better Auth 变得更好，让所有人受益。在开始之前，请花点时间阅读以下指南。

参与本项目即表示你同意遵守我们的 [行为准则](CODE_OF_CONDUCT.md)。

## 仓库设置

1. Fork 仓库并在本地克隆：

   ```bash
   git clone https://github.com/your-username/better-auth.git
   cd better-auth
   ```

2. 安装 Node.js（建议使用 LTS 版本）

   > **注意**：本项目配置为使用
   > [nvm](https://github.com/nvm-sh/nvm) 管理本地 Node.js 版本，
   > 因此这是让你快速开始的最简单方式。

   安装后，使用：

   ```bash
   nvm install
   nvm use
   ```

   你也可以查看
   [Node.js 安装](https://nodejs.org/en/download)，了解其他受支持的
   方法。

3. 安装 [pnpm](https://pnpm.io/)

   > **注意：**本项目配置为通过
   > [corepack](https://github.com/nodejs/corepack) 管理 [pnpm](https://pnpm.io/)。
   > 安装后，首次使用时系统会提示你安装正确的 pnpm
   > 版本

   你也可以使用 `npm` 安装：

   ```bash
   npm install -g pnpm
   ```

4. 安装项目依赖：

   ```bash
   pnpm install
   ```

5. 构建项目：

   ```bash
   pnpm build
   ```

## 测试

Bug 修复和新功能必须包含测试。

运行完整测试套件：

```bash
pnpm test
```

也可以按文件或目录进行筛选：

```bash
pnpm vitest packages/better-auth/src/plugins/organization --run
```

### 单元测试

使用 `better-auth/test` 中的 `getTestInstance()` 设置测试实例：

```typescript
import { getTestInstance } from "better-auth/test";

const { client, auth } = await getTestInstance({
  plugins: [organization()],
});
```

### 数据库适配器测试

适配器测试需要 Docker 容器。运行适配器测试前，请先启动容器：

> **注意：**在 macOS 上，MSSQL 容器需要 Rosetta 仿真，并且至少分配 2 GB 内存。

```bash
docker compose up -d
```

### 端到端测试

端到端测试位于 `e2e/`，分为三个套件：smoke、adapter 和 integration。

### 回归测试

为特定 GitHub issue 编写测试时，请添加 `@see` 注释：

```typescript
/**
 * @see https://github.com/better-auth/better-auth/issues/1234
 */
it("should handle the previously broken behavior", async () => {
  // ...
});
```

## 文档

文档网站位于 `docs/`，内容按主题整理在 `docs/content/docs/` 下。

在本地运行文档：

```bash
pnpm -F docs dev
```

修改公共 API 时，请更新相关文档。

## Issue 指南

提交 issue 前，请先搜索现有 issue，避免重复。
我们提供了模板，帮助你开始提交。

### Bug 报告

使用 [bug 报告模板](https://github.com/better-auth/better-auth/issues/new?template=bug_report.yml)。
请清楚描述 bug，并提供重现步骤和最小复现示例。

### 功能请求

新功能应从讨论开始。提交 [功能请求](https://github.com/better-auth/better-auth/issues/new?template=feature_request.yml)，描述问题、你提出的解决方案，以及该方案如何使项目受益。这样我们就能在有人开始编写代码前，就范围和 API 形式达成一致。

### 社交服务提供商集成

对于可以由
[Generic OAuth 插件](https://www.better-auth.com/docs/plugins/generic-oauth)
支持的新社交服务提供商，默认使用由社区维护的辅助工具。Better Auth 优先考虑可扩展性，而不是维护每个服务提供商集成的细节。
将服务提供商加入本仓库意味着持续的维护承诺，并要求 Better Auth 承诺维护该集成。

| 集成 | 标准 | 维护者 |
| --- | --- | --- |
| 内置社交服务提供商 | 广泛使用，或具有超出 Generic OAuth 范围的服务提供商特定行为 | Better Auth |
| 内置服务提供商辅助工具 | 需求广泛且由 Generic OAuth 支持 | Better Auth |
| 社区服务提供商辅助工具 | 由 Generic OAuth 支持 | 服务提供商或社区 |

当缺失的能力与具体服务提供商无关时，应优先改进 Generic OAuth，而不是添加服务提供商专属代码。

在实现内置社交服务提供商或内置服务提供商辅助工具之前，请先提交功能请求。供应商贡献或其他认证库中的支持可以表明存在需求，但这本身并不能决定 Better Auth 是否会维护该集成。

社区辅助工具可以独立开发和发布。它们可以申请列入
[其他社交服务提供商](https://www.better-auth.com/docs/authentication/other-social-providers#community-provider-helpers)
文档。条目必须注明软件包、仓库、文档、维护者、支持的 Better Auth 版本以及相关测试。辅助工具必须使用 Better Auth 的公共 API，并说明其回调 URL、权限范围和令牌端点身份验证方式。

### 安全报告

请勿针对安全漏洞公开提交 issue。
请通过 [GitHub Security Advisories](https://github.com/better-auth/better-auth/security/advisories/new) 报告。
详情请参阅 [SECURITY.md](/SECURITY.md)。

## Pull Request 指南

> [!NOTE]
> 实现新功能和其他重大改动前，请先在 issue 中讨论。
> 在讨论之前就引入功能的 pull request，或范围过大而无法有效审查的 pull request，
> 可能会在未进行详细审查的情况下被关闭。
> 与此同时，Better Auth 团队会尽力及时参与这些社区讨论并提供明确指导，
> 以便贡献者避免投入可能与项目方向不符的工作。

### 代码格式与 lint

[Lefthook](https://lefthook.dev/) 会在每次提交时并行运行 lint、格式化和拼写检查。依赖项 lint（knip）、类型检查和测试等其他检查会在 CI 中运行。

若要按命令名称跳过特定 hook，请使用 `LEFTHOOK_EXCLUDE`：

```bash
LEFTHOOK_EXCLUDE=spell git commit -m "your message"
```

提交 PR 前，请运行 `pnpm typecheck` 并确保检查通过。

### 分支目标

- **`main` 是稳定分支。**它会发布 bug 修复、安全相关工作、增量改进，以及不需要用户采取行动的行为变更。新功能也可以合入该分支，只要它们经过充分测试、不具破坏性，并且可以安全地立即采用。
- **`next` 是 beta 分支。**它会在 beta 周期（为用户留出适应时间）之后发布新功能、重构和破坏性变更。

自动化会将带有 `minor` 或 `major` changeset 的 PR 从 `main` 移至 `next`。

### Changeset

修改 `packages/**` 的 PR 必须包含 changeset 才能合并。准备提交时运行 `pnpm changeset`，如果改动在审查过程中发生变化，也可以更新 changeset。CLI 会引导你选择受影响的软件包、版本升级类型，以及面向用户的简短变更日志说明。请将生成的文件与 PR 一起提交。

根据对用户的影响选择版本升级类型：

- **`patch`** 用于 bug 修复和用户无需了解的增量改动。
- **`minor`** 或 **`major`** 用于用户需要了解的任何改动（参见[分支目标](#branch-targeting)）。

好的描述应当：

- 面向阅读变更日志的最终用户，而不是 PR 审查者。
- 清晰简洁。
- 说明发生了什么变化，而不是使用类似提交信息的前缀（例如 `fix:`、`feat:`）。
- 描述用户遇到的症状，而不是内部原因。

如果你不确定改动是否需要 changeset，维护者会在合并前处理。

### 提交 PR

1. 针对 **`main`** 分支创建 pull request。

2. PR 标题必须遵循 [Conventional Commits](https://www.conventionalcommits.org/) 格式，并可选添加受影响的软件包或功能的 scope：

   ```
   `feat(scope): description` or
   `fix(scope): description` or
   `perf: description` or
   `docs: description` or
   `chore: description` etc.
   ```

   - 标题主题必须以小写字母开头。
   - 如果改动仅涉及 `docs/`，请使用 `docs`。
   - 对于破坏性变更，请追加 `!`（例如 `feat(scope)!: description`）。此类改动应进入 `next`，而非 `main`。

3. 在 PR 描述中：
   - 清楚描述你修改了什么以及原因
   - 引用相关 issue（例如“Closes #1234”）
   - 列出所有潜在的破坏性变更
   - UI 改动请附上截图

## 维护指南

以下规则适用于 issue 和 PR：

- **核心 schema：**由于会对现有系统产生广泛影响，我们目前不接受核心 schema 改动。

### Issue 分类

这些标签用于向贡献者传达维护者当前的意图和下一步操作。简单明了的 issue 可能会直接解决，而无需进入此流程。

在获得 `needs:*` 或 `target:*` 标签之前，issue 属于未分类状态。分类后，它必须且只能拥有以下任一组中的一个标签：

| 标签 | 含义 |
| --- | --- |
| `needs: info` | 需要报告者提供更多信息。 |
| `needs: repro` | 需要提供最小复现示例。 |
| `needs: discussion` | 需要进一步讨论，以就范围或方向达成一致。 |
| `target: patch` | 已接受，可随 patch 版本发布。 |
| `target: minor` | 已接受，需要随 minor 版本发布。 |
| `target: major` | 已接受，需要随 major 版本发布。 |

```text
Untriaged
    │
    ▼
Triaged
    ├─ needs: info / repro / discussion
    └─ target: patch / minor / major
    │
    ▼
Completed
```

对于已分类的 issue，如果没有 `needs:*` 标签，表示维护者目前不需要更多信息、复现示例或进一步讨论。随着 issue 的进展，标签可能会被添加、更改或移除。

`target:*` 标签表示可以包含该改动的最低版本类别。它不代表优先级，也不意味着在添加标签或开始工作后，该 issue 就会纳入下一个符合条件的版本。该改动可能会随之后任意一个符合条件的版本发布。里程碑表示目前计划发布的版本；受指派人员或关联的 pull request 则表示正在进行的工作。

## 跟进已关闭的 Issue 和 PR

关闭的 issue 和 PR 在 7 天没有活动后会自动锁定，并添加 `locked` 标签。这样可以避免旧讨论串中不断堆积跟进内容，让任何新的背景信息都能单独分类处理。

如果你遇到了类似问题，或有新的信息，请创建新的 issue 或 PR，并引用已锁定的 issue 或 PR。

## AI 政策

我们欢迎使用 AI 辅助的贡献，无论是代码还是 issue 报告，只要它们能解决实际问题。代码必须遵循我们的编码标准，并包含适当的测试和文档。你还应当充分审查并理解所提交的内容，以便能够讨论它。不符合这些指南的 PR 和 issue 将被关闭。AI 可以减少实现所需的工作量，但不会降低审查、长期维护、兼容性或支持的成本。与提交代码的数量相比，我们更重视符合项目方向的改动。
