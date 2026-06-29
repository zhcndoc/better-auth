---
"@better-auth/drizzle-adapter": 补丁
---

修复 `updateMany` 和 `deleteMany` 在 Cloudflare D1 以及 postgres-js / bun-sql 驱动上报告受影响行数为 0 的问题。
