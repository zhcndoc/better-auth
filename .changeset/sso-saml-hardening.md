---
"@better-auth/sso": patch
---

修复(sso)：统一 SAML 响应处理并修复提供者/配置错误

**错误修复：**

- 修复 SP 元数据端点在 ACS URL 中使用内部行 ID 而非 `providerId` 的问题
- 修复配置了 `defaultSSO` 时 `acsEndpoint` 跳过数据库提供者查找的问题
- 修复 `acsEndpoint` 缺少加密字段（`isAssertionEncrypted`、`encPrivateKey`）导致静默解密失败的问题
- 修复 `defaultSSO` 配置在回调路径中的解析错误（对已解析对象使用 `safeJsonParse`）
- 修复 `createSP` 缺少 `callbackUrl` 回退到自动生成的 ACS URL 的问题
- 通过所有加密和签名字段完善 `createSP`/`createIdP` 辅助函数

**行为变更：**

- ACS 错误重定向查询参数现在使用大写错误代码（例如 `error=SAML_MULTIPLE_ASSERTIONS` 而非 `error=multiple_assertions`）。如果您的应用程序从重定向 URL 解析这些错误代码，请更新预期值。
- SAML 提供者注册现在会拒绝没有可用 IdP 入口点的配置（没有有效的 `entryPoint` URL、没有 `idpMetadata.metadata`，也没有 `idpMetadata.singleSignOnService`）。此前这些配置会成功注册但在登录时失败。
- 对 `entryPoint` 的验证从 `startsWith("http")` 收紧为 `new URL()` 解析，拒绝格式错误的 URL（如 `http:evil` 或 `http//missing-colon`）。

**重构（不更改 API）：**

- 提取共享的 `processSAMLResponse` 处理管道，以消除 `callbackSSOSAML` 和 `acsEndpoint` 之间约 500 行重复逻辑
- 将 `validateSAMLTimestamp` 移至 `saml/timestamp.ts`（从原始位置重新导出以保持兼容性）
