---
"auth": patch
---

当 `auth generate` 的配置导入尚未生成的 `--output` 文件时恢复（例如 Convex 首次运行时 `import schema from "./schema"`），方法是临时创建一个占位符并重试配置加载。
