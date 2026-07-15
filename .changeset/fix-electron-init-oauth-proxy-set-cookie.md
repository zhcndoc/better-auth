---
"@better-auth/electron": patch
---

`/electron/init-oauth-proxy` 现在会分别转发内部登录响应中的每个 Set-Cookie。之前 `Headers.get("set-cookie")` 会把它们作为一个逗号拼接的字符串返回，因此浏览器会静默丢弃桌面深度链接交接所需的 transfer-token cookie。
