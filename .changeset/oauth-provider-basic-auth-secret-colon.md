---
"@better-auth/oauth-provider": 补丁
---

Basic Auth 认证现在接受包含 `:` 的 `client_secret` 值。此前，`/token`、`/revoke` 和 `/introspect` 会拒绝任何机密客户端中其密钥包含冒号的有效凭据。
