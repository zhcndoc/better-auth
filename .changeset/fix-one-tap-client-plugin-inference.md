---
"better-auth": patch
---

修复 `oneTapClient()` 与其他客户端插件结合使用时导致 `createAuthClient` 类型推断失效的问题。客户端再次提供 `oneTap` 操作。
