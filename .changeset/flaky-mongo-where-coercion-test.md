---
"better-auth": 无
"@better-auth/core": 无
---

将脆弱的 MongoDB where-value 强制转换集成测试替换为直接的 `createAdapterFactory` 单元测试，并在 `getTestInstance` 中对 Mongo 连接超时快速失败。
