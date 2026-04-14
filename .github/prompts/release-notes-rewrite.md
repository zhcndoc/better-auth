<!-- Prompt structure adapted from sst/opencode (MIT, Copyright (c) 2025 opencode) -->
<!-- https://github.com/anomalyco/opencode — .opencode/command/changelog.md -->

你正在为一个用于 TypeScript 的开源认证框架 **better-auth** 重写发布说明。

## 输入文件

**原始变更日志：** __RAW_CHANGELOG_PATH__  
每一项都是一条单行 PR 标题，后跟一个 PR 链接，按 npm 包和变更类型（Breaking Changes、Features、Bug Fixes）进行分组。

**变更集上下文（可选）：** __CONTEXT_PATH__  
一个将 PR 编号映射到完整变更集描述的 JSON 文件。使用这些描述作为背景来撰写更优质的标题——它们解释了每个变更背后的动机与细节。如果文件路径为 `"none"` 或不存在，则跳过此步骤。

## 你的任务

将每个条目标题重写为一个简洁、用户友好的一行描述。  
原始标题是常规提交消息（例如：`fix(scope): replace cookie probe with header-based RSC detection`）。  
请将其转换为清晰说明用户所看到的变化的表述。

## 编写规则

重写标题时请遵循：
- 移除常规提交前缀（`fix(scope):`、`feat:` 等）
- 替换为描述变更类型的过去式动词：“Fixed …”、“Added …”、“Improved …”、“Refactored …”、“Removed …”
- 保持在单行内 —— 这是摘要，不是段落
- 描述用户可见的影响，而非内部代码变更
- 使用反引\`` 包裹代码标识符：函数名、配置键、字段名、类型名（如 `nextCookies()`、`twoFactorMethods`）
- 不要对通用概念使用反引\``（如“password hashing”保持原样）
- 如果标题不清晰，请阅读该 PR 的变更集上下文，或检查差异：`gh pr diff <N> --repo __GITHUB_REPOSITORY__ | head -200`
- 从标题中移除 PR 编号后缀（链接中已包含该编号）

### 重大变更（Breaking Changes）
- `### ❗ Breaking Changes` 下的条目需要附带迁移说明
- 同样重写标题（使用过去式、用户视角）
- 原始输出中可能包含在标题行下方的缩进变更集详情；请将其替换为单行块引用：
  `> **Migration:** <变更内容及用户所需操作>`
- 检查 PR 差异（`gh pr diff <N>`）以获取确切的迁移操作
- 如果存在可配置关闭选项，请在行内代码中使用代码块包裹
- 保持迁移说明简洁（最多 1-3 行）
- 示例：
  ```
  Before (raw):
  - feat(sso)!: enable InResponseTo validation by default for SAML flows ([#8736](url))
    ...indented changeset description...

  After (rewritten):
  - Enabled InResponseTo validation by default for SP-initiated SAML flows ([#8736](url))
  > **Migration:** Set `sso({ saml: { enableInResponseToValidation: false } })` to restore the previous behavior.
  ```

## 结构规则（不得违反）
- 不得添加或删除条目
- 不得修改 PR 链接 `([#NNNN](url))`
- 不得修改 `## \`package-name\`` 标题及其顺序
- 不得修改 `### ❗ Breaking Changes`、`### Features` 或 `### Bug Fixes` 子标题及其顺序
- 不得修改每个包结尾的 `CHANGELOG` 链接
- 不得添加作者署名（`by @username`）
- 不得使用长破折号（—）；请使用逗号、冒号或括号（例外：重大变更标题后允许使用 “ — ”）
- 保持博客文章链接、贡献者章节和完整变更日志链接原样
- 每个条目保持在单行（标题 + PR 链接），重大变更除外，额外增加一行迁移说明

将最终发布说明写入：__RAW_CHANGELOG_PATH__.final
