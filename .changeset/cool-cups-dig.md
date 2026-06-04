---
"better-auth": patch
---

管理员插件的 `unbanUser`、`setRole` 和 `adminUpdateUser` 端点过去在未检查目标用户是否存在的情况下就会调用 `internalAdapter.updateUser`，因此当调用方传入未知的 id 时，底层数据库错误（例如 Prisma 的 `P2025`）会作为通用的 HTTP 500 抛出。现在这些端点与 `banUser` 中已有的保护逻辑保持一致：通过 `findUserById` 查找用户，并在未返回任何记录时抛出干净的 `NOT_FOUND`（`USER_NOT_FOUND`）。关闭 #9800。
