---
"@better-auth/drizzle-adapter": patch
---

在构建复合 `where` 子句之前拒绝缺失的 Drizzle schema 字段，防止应用程序 schema 过期时生成格式错误的 SQL。
