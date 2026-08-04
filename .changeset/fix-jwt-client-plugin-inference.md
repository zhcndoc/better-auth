---
"better-auth": patch
---

修复 `jwtClient()` 与其他客户端插件（例如 `inferAdditionalFields`）结合使用时导致 `createAuthClient` 类型推断失效的问题。额外的用户字段（例如 `updateUser` 中的字段）现已恢复保留。
