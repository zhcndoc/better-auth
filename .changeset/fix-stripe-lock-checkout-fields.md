---
"@better-auth/stripe": patch
---

`getCheckoutSessionParams` 不再覆盖插件为 webhook 对账和计费内部管理的字段：`success_url`、`cancel_url`、`mode`、`customer`、`customer_email`、`client_reference_id` 和 `line_items`。其他参数仍会透传。`locale` 现在优先使用请求中的值，而不是 `getCheckoutSessionParams` 中的值。
