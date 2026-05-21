---
"better-auth": 补丁
---

`deleteOrganization` 和 `removeMember` 现在在某一步失败时会回滚，而不是留下孤立记录。
