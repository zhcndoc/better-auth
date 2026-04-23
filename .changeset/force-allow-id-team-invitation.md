---
"better-auth": 补丁
---

修复(organization)：允许通过 `beforeCreateTeam` 和 `beforeCreateInvitation` 传递 id

镜像 #4765，适用于团队和邀请：`adapter.createTeam` 和 `adapter.createInvitation` 现在传递 `forceAllowId: true`，因此从相应钩子返回的 id 能在数据库插入后保留。
