---
"better-auth": patch
---

`sendVerificationEmail` 通过 `runInBackgroundOrAwait` 被调用，这可能会在配置了 `advanced.backgroundTasks.handler` 时延迟执行工作（因此处理程序可能会在邮件回调完成之前就返回 **200**），而在默认路径下则会 **捕获并记录错误而不重新抛出**。因此，抛出 `APIError` 的用户回调（例如来自速率限制器的 **429**）并不能可靠地反映到 HTTP 响应中（[better-auth/better-auth#8757](https://github.com/better-auth/better-auth/issues/8757)）。

现在我们会等待 `sendVerificationEmailFn`，以便失败能够以正确的状态暴露给客户端。未认证的 `/send-verification-email` 路径会强制执行一个恒定时间下限（500 ms），以免响应时长泄露该邮箱是否属于真实的未验证用户。
