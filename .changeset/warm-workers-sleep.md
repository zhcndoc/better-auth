---
"@better-auth/core": patch
---

当未安装 OpenTelemetry 时，将 Cloudflare Workers 的埋点导入路由到纯空操作（no-op）入口。
