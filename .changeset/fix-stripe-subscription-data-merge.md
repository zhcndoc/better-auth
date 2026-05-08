---
"@better-auth/stripe": patch
---

从 `getCheckoutSessionParams` 返回自定义的 `subscription_data` 不再会在 Stripe Checkout 中隐藏方案的免费试用，也不会在 `customer.subscription.created` webhook 触发时创建重复的本地订阅记录。
