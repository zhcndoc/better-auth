---
"better-auth": patch
"@better-auth/stripe": patch
---

在组织插件中，将端点上下文作为第二个参数传递给 `beforeDeleteOrganization` 和 `afterDeleteOrganization` 钩子，以匹配文档中显示的签名以及现有的 `databaseHooks` 模式。Stripe 插件的 `beforeDeleteOrganization` 包装器现在会将上下文转发给用户提供的钩子，而不是丢弃它。
