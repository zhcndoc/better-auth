---
"better-auth": patch
---

在登出后清除组织活动 hook 状态，以便 `useActiveMemberRole` 在 SPA 登出/登录流程中不会保留上一个用户的角色。
