---
"@better-auth/oauth-provider": patch
---

fix(oauth-provider): 将 consent-accept 的 postLogin 跳转绑定到签名会话

当 `authorize` 在 postLogin 门槛之后发出签名重定向时，它现在会在签名的授权查询中记录 `ba_pl=<sessionId>`。在同意接受时，只有当传入的签名查询标记与当前会话的 id 匹配时，才会以 `{ postLogin: true }` 调用 `authorizeEndpoint`；否则会重新进入 `authorize`，并继续强制执行 `postLogin.shouldRedirect`。这样可以解决 `setActive` 驱动流程在同意后弹回 postLogin 页面的问题，阻止带有 pre-postLogin 签名查询的直接 POST 到 `/oauth2/consent` 绕过 `shouldRedirect`，并防止不同或新登录的会话复用其他会话的标记来跳过 `shouldRedirect`。
