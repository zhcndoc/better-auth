---
"better-auth": patch
---

使用 `getTestInstance` 的测试套件现在运行速度更快，因为共享 fixture 默认避免了生产环境中的密码哈希开销。自定义的 `emailAndPassword.password` 实现仍然具有优先权。
