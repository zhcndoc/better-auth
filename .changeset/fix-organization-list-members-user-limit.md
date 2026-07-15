---
"better-auth": patch
---

通过将相同的成员资格限制应用于 users 查询，修复 `organization.listMembers` 在成员数超过约 100 的组织中因 “User not found for member” 而失败的问题。
