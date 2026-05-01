---
"@better-auth/stripe": patch
---

`onSubscriptionUpdate` 现在会接收 `stripeSubscription`（原始的 Stripe 对象），与所有其他订阅回调的结构保持一致。`onSubscriptionCancel` 现在也会接收更新后的订阅行，而不是更新前的快照。
