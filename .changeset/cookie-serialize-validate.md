---
"better-auth": patch
"@better-auth/electron": patch
---

包含超出裸 cookie-octet 范围的字符（例如 `;`、`"` 或 `\`）的 Cookie 值现在会在 `Cookie` 头中进行百分号编码。此前这些值在重新序列化时会被丢弃，这可能会破坏在 Cookie 中存储结构化值的流程。
