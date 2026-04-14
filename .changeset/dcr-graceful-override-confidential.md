---
"@better-auth/oauth-provider": patch
---

修复（oauth-provider）：在未认证 DCR 中将机密认证方法覆盖为公开

当启用 `allowUnauthenticatedClientRegistration` 时，未认证的 DCR 请求如果指定了 `client_secret_post`、`client_secret_basic` 或省略 `token_endpoint_auth_method`（根据 [RFC 7591 §2](https://datatracker.ietf.org/doc/html/rfc7591#section-2) 默认为 `client_secret_basic`），现在会被静默覆盖为 `token_endpoint_auth_method: "none"`（公开客户端），而不是以 HTTP 401 拒绝。

这遵循 [RFC 7591 §3.2.1](https://datatracker.ietf.org/doc/html/rfc7591#section-3.2.1)，该规范允许服务器“拒绝或替换注册过程中提交的客户端元数据值，并用合适的值进行替换。” 注册响应将实际的方法返回给客户端，允许兼容的客户端进行调整。

修复了与真实世界 MCP 客户端（Claude、Codex、Factory Droid 等）的互操作性问题，这些客户端在 DCR 负载中发送 `token_endpoint_auth_method: "client_secret_post"`，因为服务器元数据在 `token_endpoint_auth_methods_supported` 中宣传了该方法。

关闭 #8588
