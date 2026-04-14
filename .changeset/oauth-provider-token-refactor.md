---
"@better-auth/oauth-provider": patch
---

feat(oauth-provider): 添加 `customTokenResponseFields` 回调以及使用 Zod 对授权码进行验证

在 `OAuthOptions` 中添加 `customTokenResponseFields` 回调，以在所有授权类型中向令牌端点响应注入自定义字段。标准 OAuth 字段（如 `access_token`、`token_type` 等）无法被覆盖。遵循与 `customAccessTokenClaims` 和 `customIdTokenClaims` 相同的模式。

授权码的反序列化验证值现在将通过 Zod 架构进行验证，对于格式错误或损坏的值，一致返回 `invalid_verification` 错误，而不是潜在的 500 错误。
