---
"better-auth": patch
---

组织插件的 `cancelPendingInvitationsOnReInvite` 选项现在会在重新邀请同一邮箱时真正取消之前的待处理邀请。此前该选项没有任何效果——重新邀请总是会失败，并返回 `USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION`。
