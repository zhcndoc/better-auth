---
"better-auth": patch
---

在默认验证码设置下，Email OTP 登录不再会因为缺少 captcha token 错误而失败。如果你有意希望在 Email OTP 登录时启用验证码，请将 `/sign-in/email-otp` 添加到 `captcha({ endpoints })` 中。
