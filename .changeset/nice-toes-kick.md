---
"better-auth": patch
---

允许使用 `updateUser({ phoneNumber: null })` 移除电话号码。已验证标志会以原子方式重置。更换为其他号码仍需要通过 `verify({ updatePhoneNumber: true })` 进行 OTP 验证。
