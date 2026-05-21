---
"better-auth": 补丁
---

`role.authorize` 现在会将空的操作列表（`[]` 或 `{ actions: [] }`）视为未授权，并在返回结果之前，使用 `OR` 连接器评估每个请求的资源。
