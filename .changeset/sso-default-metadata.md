---
"@better-auth/sso": patch
---

修复(sso): 在 spMetadata 中使用 findSAMLProvider 以便 defaultSSO 提供者能够正确解析

`/sso/saml2/sp/metadata` 是唯一一个直接调用 `adapter.findOne`
的 SAML 端点，因此通过 `defaultSSO` 配置的提供者（这些提供者不会持久化到
数据库）会导致它抛出 `NOT_FOUND`。现在该端点使用共享的
`findSAMLProvider` 辅助函数，与 `signInSSO`、SAML 回调处理程序以及
`signOut` 保持一致。
