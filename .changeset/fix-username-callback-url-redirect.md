---
"better-auth": 补丁
---

修复(username)：尊重 `/sign-in/username` 上的 callbackURL

该端点接受了一个 `callbackURL` 请求体字段，但忽略了它，因此
`authClient.signIn.username({ ..., callbackURL })` 会静默地什么也不做，
而 `authClient.signIn.email` 则会按预期重定向。现在当提供
`callbackURL` 时，处理程序会设置一个 `Location` 头，并在
`token`/`user` 之外返回 `{ redirect, url }`，与 email 流程保持一致。
