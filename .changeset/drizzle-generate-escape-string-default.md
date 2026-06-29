---
"auth": patch
---

修复 `better-auth generate` 在字段的字符串默认值包含引号或反斜杠时，生成无效的 Drizzle schema。
