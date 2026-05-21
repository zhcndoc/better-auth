---
"better-auth": patch
"@better-auth/oauth-provider": patch
---

已过期的 magic-link 令牌和 OAuth 授权码现在会被可靠地拒绝。对于已过期的令牌，magic-link 验证会重定向到 `?error=INVALID_TOKEN`（原为 `?error=EXPIRED_TOKEN`）。OIDC、MCP 以及 `@better-auth/oauth-provider` 的 `/token` 端点会在代码过期时返回 `error_description: "invalid code"`（原为 `"code expired"`）。OAuth 的 `error` 值仍保持为 `invalid_grant`。
