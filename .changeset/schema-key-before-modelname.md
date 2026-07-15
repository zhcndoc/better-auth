---
"better-auth": 补丁
---

在 `getDefaultModelName` 中优先使用精确的 schema-key 匹配，而不是 `modelName` 别名，这样将内置表重新映射到另一个表的 schema key（例如 `user.modelName = "account"`）时，不会把内部适配器查询错误地重定向到错误的表。
