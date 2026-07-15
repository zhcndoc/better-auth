---
"@better-auth/core": patch
"better-auth": patch
---

将请求端点上下文作为第三个参数传递给 `verifyIdToken`，这样自定义 ID 令牌验证器就可以读取请求头（例如 Apple 的 `user-agent` 要求）。
