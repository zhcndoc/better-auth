---
"@better-auth/oauth-provider": 补丁
---

修复(oauth-provider): 在强制登录后完成过期的 `prompt=login consent` 继续流程

同意继续流程现在会携带已签名的授权请求签发时间，并且只有在当前会话是为该请求创建时，才会清除残留的 `login` 提示。这保留了强制重新认证的语义，同时避免了已完成的重新认证被送回 `/login` 的循环。
