---
"better-auth": patch
"@better-auth/stripe": patch
---

加强 URL 归一化和 Stripe 客户搜索转义。URL 辅助函数现在会在不使用正则表达式的情况下去除末尾斜杠，而 Stripe 搜索查询值会在引号前转义反斜杠。
