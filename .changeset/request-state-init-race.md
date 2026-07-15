---
"@better-auth/core": patch
---

修复了一个 request-state `AsyncLocalStorage` 初始化竞态问题，该问题偶尔会抛出 `No request state found. Please make sure you are calling this function within a runWithRequestState callback.` `ensureAsyncStorage()` 现在会对其进行中的初始化进行记忆化处理，因此并发的首次调用者会共享同一个 `AsyncLocalStorage` 实例，而不是各自构造一个后由最后一次写入生效。这在无服务器冷启动场景（例如 Cloudflare Workers）中会暴露出来，因为首批请求会在懒加载的 `node:async_hooks` 导入完成之前到达，导致 `runWithRequestState().run()` 和嵌套的 `getCurrentRequestState()` 落到不同的实例上。
