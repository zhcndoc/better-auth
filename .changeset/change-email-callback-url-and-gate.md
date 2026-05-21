---
"better-auth": patch
---

`changeEmail` 不再在流程无法完成时静默返回 `{ status: true }`：如果已验证用户缺少 `emailVerification.sendVerificationEmail`，请求现在会以 400 错误失败。`callbackURL` 的值也会进行 URL 编码，因此携带自身查询字符串的回调在通过 verify-email 链接往返时能够保留下来。
