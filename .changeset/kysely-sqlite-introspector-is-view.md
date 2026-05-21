---
"@better-auth/kysely-adapter": patch
---

修复捆绑的 SQLite introspector（`BunSqliteDialect`、`NodeSqliteDialect`），使表不再被报告为视图。introspector 只查询 `type = 'table'` 的行，但每个 `TableMetadata` 都被返回为 `isView: true`。现在依赖 `isView` 分支处理的消费者（CLI 代码生成、模式 diff）会看到正确的值。
