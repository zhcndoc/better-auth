---
"better-auth": patch
---

将 SQLite `BIGINT` 识别为迁移差异中的有效数字类型，这样像 `lastRequest` 这样的数据库支持的速率限制器列就不再会在每次运行时报告虚假的待处理更改。
