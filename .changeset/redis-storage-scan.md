---
"@better-auth/redis-storage": patch
---

在 `listKeys()` 和 `clear()` 中使用 `SCAN` 枚举键，而不是使用 `KEYS`，这样大型键空间不再阻塞 Redis 服务器。转义键前缀中的 glob 元字符，使 `clear()` 无法匹配存储区之外的键，并使 `clear()` 在空存储区上安全地执行空操作。
