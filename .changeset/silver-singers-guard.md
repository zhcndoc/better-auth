---
"better-auth": 补丁
---

当提供者的用户信息缺少 account id 时，拒绝 OAuth 回调，以避免将账户链接到字面上的 `undefined` id。
