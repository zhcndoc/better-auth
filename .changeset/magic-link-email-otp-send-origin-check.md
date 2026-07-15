---
"better-auth": patch
---

在 magic-link（`/sign-in/magic-link`）和 email-otp（`/email-otp/send-verification-otp`）发送端点上强制校验请求 `Origin`，包括无 cookie 的请求，以与内置的 `/sign-in/email` 和 `/sign-up/email` 路由保持一致。无 cookie 的跨站 POST 将不再能够向任意地址触发 magic-link 或验证 OTP 邮件发送。对于不携带 `Origin`（服务器到服务器）的无 cookie 请求，不受影响。
