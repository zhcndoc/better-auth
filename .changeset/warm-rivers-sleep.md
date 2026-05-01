---
"@better-auth/stripe": 补丁
---

`onSubscriptionDeleted`、`onTrialEnd` 和 `onTrialExpired` 现在接收更新后的订阅行，而不是更新前的快照，这与其余生命周期回调保持一致。
