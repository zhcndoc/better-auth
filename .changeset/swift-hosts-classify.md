---
"@better-auth/core": patch
"better-auth": patch
"@better-auth/electron": patch
"@better-auth/oauth-provider": patch
---

将主机/IP 分类的逻辑整合到 `@better-auth/core/utils/host` 后面，并修复之前各个包分别使用的正则检查所遗漏的多个环回/SSRF 绕过问题。

**Electron 用户图片代理：已关闭 SSRF 绕过（`@better-auth/electron`）。** `fetchUserImage` 之前使用了一个专门的 IPv4/IPv6 正则对出站请求进行放行判断，但漏掉了多个向量。以下情况均可在生产环境中触达，现已全部阻止：

- `http://tenant.localhost/` 以及其他 `*.localhost` 域名（RFC 6761 保留整个 TLD 用于环回）。
- `http://[::ffff:169.254.169.254]/`（将 IPv4 映射到 IPv6 的写法以访问 AWS IMDS，这是经典的 SSRF 绕过）。
- `http://metadata.google.internal/`、`http://metadata.goog/`（GCP 实例元数据）。
- `http://instance-data/`、`http://instance-data.ec2.internal/`（AWS IMDS 的备用 FQDN）。
- `http://100.100.100.200/`（阿里云 IMDS；位于 RFC 6598 的共享地址空间 `100.64/10` 中，旧正则未覆盖）。
- `http://0.0.0.0:PORT/`（Linux/macOS 内核会将未指定地址路由到环回：Oligo 的 “0.0.0.0 Day”）。
- `http://[fc00::...]/`、`http://[fd00::...]/`（RFC 4193 定义的 IPv6 ULA）以及 IPv6 链路本地 `fe80::/10`（两者均未被该正则识别）。

文档范围（RFC 5737 / RFC 3849）、基准测试（`198.18/15`）、组播，以及广播也同样现在会被拒绝。

**`better-auth`：不再将 `0.0.0.0` 视为环回地址。** 先前 `packages/better-auth/src/utils/url.ts` 中的 `isLoopbackHost` 实现会将 `0.0.0.0` 与 `127.0.0.1` / `::1` / `localhost` 一起归类为环回。`0.0.0.0` 是未指定地址，并非环回；将其当作环回会使浏览器发起的请求能够到达绑定在 localhost 上的开发服务（Oligo 的 “0.0.0.0 Day”）。现在该辅助函数改为接收完整的 `127.0.0.0/8` 范围以及任意 `*.localhost` 名称，并拒绝 `0.0.0.0`。

**`better-auth`：可信来源子字符串的加固。** `getTrustedOrigins` 之前在决定是否为动态 `baseURL.allowedHosts` 条目添加 `http://` 变体时，使用了 `host.includes("localhost") || host.includes("127.0.0.1")`。像 `evil-localhost.com` 或 `127.0.0.1.nip.io` 这样的错误配置会被错误地加入到信任列表中的 HTTP 来源。现在该检查改用共享分类器，因此只有真正的环回主机才会获得 HTTP 变体。

**`@better-auth/oauth-provider`：遵循 RFC 8252。**

- §7.3 重定向 URI 匹配现在接受完整的 `127.0.0.0/8` 范围（不仅仅是 `127.0.0.1`）以及 `[::1]`，并进行端口可忽略的对比。端口可忽略匹配仅限于 IP 字面量；像 `localhost` 这样的 DNS 名称继续按照 §8.3 使用精确字符串匹配（对环回为 “NOT RECOMMENDED”）。
- `validateIssuerUrl` 使用共享的环回检查，而不是基于两个主机名字面量的比较。

**新增模块：`@better-auth/core/utils/host`。** 提供 `classifyHost`、`isLoopbackIP`、`isLoopbackHost` 和 `isPublicRoutableHost`。这是一个基于 RFC 6890 / RFC 6761 / RFC 8252 的实现，能够处理 IPv4、IPv6（包括带方括号的字面量、zone IDs、IPv4 映射地址，以及包含 IPv4 递归的 6to4 / NAT64 / Teredo 隧道形式）以及 FQDN，并内置了一个整理过的云元数据 FQDN 集合。monorepo 中所有专有的环回/私有/链路本地检查现在都统一通过它来路由。
