---
"@better-auth/oauth-provider": patch
---

从包根目录导出 `verifyOAuthQueryParams`，这样，渲染自定义授权同意页面的应用就能在渲染任何内容之前，验证此插件的 `signParams` 添加到授权查询参数中的 `sig`/`exp`。
