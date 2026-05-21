---
"better-auth": patch
---

当 `advanced.database.generateId` 返回包含逗号的团队 ID 时，组织邀请不再会悄悄将受邀者路由到错误的团队。邀请 API 现在会以 `INVALID_TEAM_ID` 错误拒绝此类 ID。
