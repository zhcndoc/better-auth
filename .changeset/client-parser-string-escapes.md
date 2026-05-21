---
"better-auth": patch
---

`parseJSON` 现在会解码带引号字符串中的转义序列，例如 `\n`、`\\` 和 `\uXXXX`。像组织元数据这类会经过 `JSON.stringify` 再还原回来的值，不再会在原本字符的位置出现原始转义字符。
