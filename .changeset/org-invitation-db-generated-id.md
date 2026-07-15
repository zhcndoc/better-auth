---
"better-auth": patch
---

当 ID 生成委托给数据库时（例如使用支持 UUID 的适配器如 Postgres，并将 `advanced.database.generateId: "uuid"`），组织邀请现在也会让数据库生成其 `id`，与其他所有模型保持一致。此前 `createInvitation` 总是在应用程序代码中生成邀请的 `id`，因此邀请行接收到的是应用生成的值，而不是数据库生成的值；与此同时，organizations、members 和 teams 则正确地将生成过程交给了数据库（[better-auth/better-auth#10024](https://github.com/better-auth/better-auth/issues/10024)）。如果调用方提供了 id（例如通过 `beforeCreateInvitation`），仍然会按该值处理。
