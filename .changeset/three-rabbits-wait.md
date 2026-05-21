---
"better-auth": patch
---

修复了在需要 2FA 的登录过程中会泄漏会话 Cookie 的问题。凭据处理器会写入有效的 `session_token` / `session_data` Cookie，而 2FA 后置钩子只是为其追加了过期覆盖；原始响应读取者可以捕获这些有效值，并在 `session.cookieCache.enabled` 时重放它们以绕过 2FA。`expireCookie` 现在会在重新设置之前清除先前匹配的 `Set-Cookie` 条目（包括分块）。`/two-factor/disable` 现在改用了 `sensitiveSessionMiddleware`，作为纵深防御。
