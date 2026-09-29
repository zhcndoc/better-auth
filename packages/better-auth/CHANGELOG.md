# better-auth

## 1.7.6

### 补丁更改

- [#11325](https://github.com/better-auth/better-auth/pull/11325) [`af88385`](https://github.com/better-auth/better-auth/commit/af883851ae9c3b55c0d8240fabea3dc797cd5cd0) 感谢 [@Wadiou](https://github.com/Wadiou)！- Admin 插件的 `bannedUserMessage` 现在可以是一个接收被封禁用户的函数，因此登录错误可以包含封禁原因等详细信息。

- [#11268](https://github.com/better-auth/better-auth/pull/11268) [`2fa501c`](https://github.com/better-auth/better-auth/commit/2fa501cdf9e022d5f7241fabce1a67f1828d777b) 感谢 [@bytaesu](https://github.com/bytaesu)！- 支持通过 OAuth Proxy 插件关联社交账号。

- [#11366](https://github.com/better-auth/better-auth/pull/11366) [`d41e2ca`](https://github.com/better-auth/better-auth/commit/d41e2caf1a5bf09afc916087b739e0a5d00ab5c5) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当 Kysely 方言无法内省 Cloudflare D1 时，使用针对性的 PRAGMA 查询。

- [#11016](https://github.com/better-auth/better-auth/pull/11016) [`3d0efa3`](https://github.com/better-auth/better-auth/commit/3d0efa308d575c4aa184d65deaf29f2626add8fd) 感谢 [@davbrito](https://github.com/davbrito)！- 支持在托管于 Vercel 的应用中，对受保护的身份验证路由进行 Vercel BotID 检查。

- [#11333](https://github.com/better-auth/better-auth/pull/11333) [`631ac29`](https://github.com/better-auth/better-auth/commit/631ac296a55ccecf51a7995e89a3e528a5f782da) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当自定义模型名称与另一个 schema 键匹配时，保留逻辑模型标识。

- [#11324](https://github.com/better-auth/better-auth/pull/11324) [`8853419`](https://github.com/better-auth/better-auth/commit/88534192c1d0fd62b108b568243a134e6df61ab1) 感谢 [@XXMOHAMED012](https://github.com/XXMOHAMED012)！- 现在，长度超过 `maxPasswordLength` 的密码会在登录（电子邮件、用户名、电话号码）、verify-password、change-password（`currentPassword`）、delete-user、接收密码的双因素端点以及 admin create-user 中，在哈希前以 `PASSWORD_TOO_LONG` 错误拒绝；这与 sign-up 和密码重置已有的行为一致。

- [#11316](https://github.com/better-auth/better-auth/pull/11316) [`2ee1545`](https://github.com/better-auth/better-auth/commit/2ee1545f244d87e5edd6a003b48b90a5539f8afa) 感谢 [@Smidge](https://github.com/Smidge)！- 修复会话或插件身份验证查询在流式组件完成 hydration 前解析时出现的 React hydration 不匹配问题。hydration 期间保留服务器渲染的 pending 状态，随后更新为当前客户端状态，同时不更改普通或计算型插件存储。

- [#11376](https://github.com/better-auth/better-auth/pull/11376) [`fc45d08`](https://github.com/better-auth/better-auth/commit/fc45d08b26ac8e433fc7899a12be392cc52735ba) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当请求重叠时，防止较早的身份验证查询响应替换较新的结果。

- 已更新依赖 [[`41b7dc1`](https://github.com/better-auth/better-auth/commit/41b7dc15de41a8726422c392a4857d8764828891), [`d41e2ca`](https://github.com/better-auth/better-auth/commit/d41e2caf1a5bf09afc916087b739e0a5d00ab5c5), [`631ac29`](https://github.com/better-auth/better-auth/commit/631ac296a55ccecf51a7995e89a3e528a5f782da), [`2b13e01`](https://github.com/better-auth/better-auth/commit/2b13e011b4a4f8be4e4c39573b9e962cbabb2094)]：
  - @better-auth/prisma-adapter@1.7.6
  - @better-auth/kysely-adapter@1.7.6
  - @better-auth/core@1.7.6
  - @better-auth/drizzle-adapter@1.7.6
  - @better-auth/memory-adapter@1.7.6
  - @better-auth/mongo-adapter@1.7.6
  - @better-auth/telemetry@1.7.6

## 1.7.5

### 补丁更改

- [#11283](https://github.com/better-auth/better-auth/pull/11283) [`e56c45b`](https://github.com/better-auth/better-auth/commit/e56c45bddb8ca859175a47ab345b6c6dcc6da5d7) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在服务器上记录 Cloudflare Turnstile 错误代码和绑定不匹配情况，以便诊断 CAPTCHA 验证失败。

- [#11209](https://github.com/better-auth/better-auth/pull/11209) [`8d37cc3`](https://github.com/better-auth/better-auth/commit/8d37cc3b7732a04908b28d8abb7f010a286d6c43) 感谢 [@siam923](https://github.com/siam923)！- 移除未使用的可选 `better-sqlite3` peer 依赖，以避免安装冲突。

- [#11272](https://github.com/better-auth/better-auth/pull/11272) [`348fc26`](https://github.com/better-auth/better-auth/commit/348fc26c9904d800cd471947ba98abb5e8431b60) 感谢 [@bytaesu](https://github.com/bytaesu)！- 验证现有字符串列上的索引时，使用 MySQL 报告的字节长度。

- [#11203](https://github.com/better-auth/better-auth/pull/11203) [`cb627eb`](https://github.com/better-auth/better-auth/commit/cb627ebeb174d9a35ccc79018110bbc7a50a6fb8) 感谢 [@dshukertjr](https://github.com/dshukertjr)！- 为直接 PostgreSQL 连接添加 `database.schemaName` 选项。设置后，适配器和 CLI 会在每条语句中限定 schema，因此 `auth generate` 会生成一个带 schema 限定的迁移，在创建表之前创建 schema，而不是依赖连接的 `search_path`。

- [#11270](https://github.com/better-auth/better-auth/pull/11270) [`133f6a2`](https://github.com/better-auth/better-auth/commit/133f6a27175ba21193742564d94aebfc9ec89920) 感谢 [@bytaesu](https://github.com/bytaesu)！- 防止 PostgreSQL 迁移将其他 schema 中的表或当前 schema 中的视图误认为 Better Auth 表。

- 已更新依赖 [[`e18bc83`](https://github.com/better-auth/better-auth/commit/e18bc83172dca1804f0c5c3eff41d65e2849c557), [`cb627eb`](https://github.com/better-auth/better-auth/commit/cb627ebeb174d9a35ccc79018110bbc7a50a6fb8), [`dae97ed`](https://github.com/better-auth/better-auth/commit/dae97ed932a084a11faa96a2e1abf052fc85d2ea)]：
  - @better-auth/drizzle-adapter@1.7.5
  - @better-auth/kysely-adapter@1.7.5
  - @better-auth/core@1.7.5
  - @better-auth/memory-adapter@1.7.5
  - @better-auth/mongo-adapter@1.7.5
  - @better-auth/prisma-adapter@1.7.5
  - @better-auth/telemetry@1.7.5

## 1.7.4

### 补丁更改

- [#11205](https://github.com/better-auth/better-auth/pull/11205) [`3f890eb`](https://github.com/better-auth/better-auth/commit/3f890eb631e0278045b3b5b40d29b11bd9d4c332) 感谢 [@bytaesu](https://github.com/bytaesu)！- 测试工具支持 Vitest 5，同时保留对之前支持的 Vitest 版本的兼容性。

- [#11224](https://github.com/better-auth/better-auth/pull/11224) [`c1756a2`](https://github.com/better-auth/better-auth/commit/c1756a22745d4580425559b8800acc6e9a70e30f) 感谢 [@bytaesu](https://github.com/bytaesu)！- 添加 `experimental.instrumentation.enabled`，以便按身份验证实例禁用 Better Auth OpenTelemetry span 创建。默认情况下仍启用检测，且与使用情况报告相互独立。

- [#11217](https://github.com/better-auth/better-auth/pull/11217) [`9b9638e`](https://github.com/better-auth/better-auth/commit/9b9638ec99057ade649280fa1447408238158f1c) 感谢 [@onmax](https://github.com/onmax)！- 允许 `testUtils` 身份验证辅助工具通过 `session` 选项接受额外的会话字段，包括没有默认值的必填字段，以及针对每个会话覆盖已配置的默认值。

- 已更新依赖 [[`3ff842a`](https://github.com/better-auth/better-auth/commit/3ff842ab7fdf60746b5d7bd8c27becd2d0a79c2e), [`b905bfe`](https://github.com/better-auth/better-auth/commit/b905bfe3d97de3c88fc31f7f2820531702df583e), [`c1756a2`](https://github.com/better-auth/better-auth/commit/c1756a22745d4580425559b8800acc6e9a70e30f)]：
  - @better-auth/core@1.7.4
  - @better-auth/drizzle-adapter@1.7.4
  - @better-auth/kysely-adapter@1.7.4
  - @better-auth/memory-adapter@1.7.4
  - @better-auth/mongo-adapter@1.7.4
  - @better-auth/prisma-adapter@1.7.4
  - @better-auth/telemetry@1.7.4

## 1.7.3

### 补丁更改

- [#11060](https://github.com/better-auth/better-auth/pull/11060) [`3660f06`](https://github.com/better-auth/better-auth/commit/3660f062d6e7a9b02e3fc8eee5b99482117ebba0) 感谢 [@bytaesu](https://github.com/bytaesu)！- 处理格式错误的自定义 scheme 回调 URL，避免过度处理。

- [#11037](https://github.com/better-auth/better-auth/pull/11037) [`5bd7096`](https://github.com/better-auth/better-auth/commit/5bd709640a14e03972420bbfe778e3c732df80d5) 感谢 [@bytaesu](https://github.com/bytaesu)！- 防止重复注册 TOTP 覆盖已启用的验证器及其备用代码。

- [#11120](https://github.com/better-auth/better-auth/pull/11120) [`7ec7146`](https://github.com/better-auth/better-auth/commit/7ec71461f1b3dcc0f9852ced5cc1ed7252ded4f2) 感谢 [@onmax](https://github.com/onmax)！- cookie 缓存已禁用、但客户端仍持有缓存的会话 cookie 时，防止 `getSession` 失败。

- [#9908](https://github.com/better-auth/better-auth/pull/9908) [`76d311f`](https://github.com/better-auth/better-auth/commit/76d311f4b94799496ddfc0be7d03db1731f4b2a6) 感谢 [@harshil1712](https://github.com/harshil1712)！- 将 Cloudflare 添加为内置社交提供商，支持客户端密钥身份验证，以及无需密钥的 PKCE 客户端。

- [#11188](https://github.com/better-auth/better-auth/pull/11188) [`c47b765`](https://github.com/better-auth/better-auth/commit/c47b76517d235d7cde07a1b4717f76b8f71a675f) 感谢 [@bytaesu](https://github.com/bytaesu)！- 无需可能较慢的尾部斜杠正则表达式即可规范化 Auth0 域名。

- [#11084](https://github.com/better-auth/better-auth/pull/11084) [`2d5c63d`](https://github.com/better-auth/better-auth/commit/2d5c63d512164d4e18c5e67b79a9c7d19b27b669) 感谢 [@bytaesu](https://github.com/bytaesu)！- 使用 Vue 客户端和 Nuxt `useFetch` 时，防止重复的会话请求和 hydration 不匹配。

- [#11147](https://github.com/better-auth/better-auth/pull/11147) [`a9d8c12`](https://github.com/better-auth/better-auth/commit/a9d8c12d14b99a2df35ae2fba98ad4e4bc512ad5) 感谢 [@bytaesu](https://github.com/bytaesu)！- 添加 `isPasswordCompromised`，以便在自定义服务端流程中检查密码是否出现在 Have I Been Pwned 中，同时忽略出现次数为零的填充响应条目。

- [#10988](https://github.com/better-auth/better-auth/pull/10988) [`9fc7498`](https://github.com/better-auth/better-auth/commit/9fc749867592536b6e472381581cee8f00f6b59b) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在代理 OAuth 登录后运行回调钩子，并在回调 cookie 不可用时保留服务器状态。旧版 `/oauth-proxy-callback` 端点已弃用，并将在下一个次要版本中移除。

- [#11178](https://github.com/better-auth/better-auth/pull/11178) [`be0e007`](https://github.com/better-auth/better-auth/commit/be0e007e20ea310aa533acf49edfae34cfc797a9) 感谢 [@bytaesu](https://github.com/bytaesu)！- 初始化期间报告缺失的表、缺失的列，以及 Better Auth 从不写入的必填列，并提供修复指导。Kysely 会检查实时数据库 schema。身份验证请求会等待同一项检查；如果 schema 不匹配，则会被拒绝。

  默认启用验证，包括在生产环境中。设置 `advanced.database.validateSchema: false` 可禁用运行时验证。若未写入的必填列需要手动修复，`auth migrate` 会拒绝应用更改。

- [#11069](https://github.com/better-auth/better-auth/pull/11069) [`0bb0dbf`](https://github.com/better-auth/better-auth/commit/0bb0dbf6f38ab53a0c1f2fb639acd7bd602e2a24) 感谢 [@bytaesu](https://github.com/bytaesu)！- 提升动态组织角色权限检查的性能。

- [#11153](https://github.com/better-auth/better-auth/pull/11153) [`2220ee7`](https://github.com/better-auth/better-auth/commit/2220ee726934de3aa128d5b4114391be8e9570cc) 感谢 [@bytaesu](https://github.com/bytaesu)！- 通过使用 `(providerId, accountId)` 标识账号，并移除 1.7.0 中引入的 `issuer` 要求，恢复与 1.6 数据库的登录兼容性。从 1.6 升级不再需要账号 schema 迁移。遇到不明确的账号键时会拒绝操作，而不是任意选择一个账号。

  如果你已应用 1.7.0 至 1.7.2 的账号 schema，请在升级前移除其 issuer 唯一索引。对于 SQL 数据库，还需将 `issuer` 设为可空或移除该列，以便成功注册和关联账号。`auth migrate` 不会执行此清理。请参阅[升级指南](https://www.better-auth.com/docs/guides/1-7-upgrade-guide)了解特定数据库的操作步骤。

- [#10978](https://github.com/better-auth/better-auth/pull/10978) [`5fe5bc2`](https://github.com/better-auth/better-auth/commit/5fe5bc21d1bf699655054192f4f833bcc33d0ba4) 感谢 [@BetterAndBetterII](https://github.com/BetterAndBetterII)！- 当发现失败时跳过通用 OAuth 提供商，而不是导致其余身份验证 API 无法运行。

- [#10963](https://github.com/better-auth/better-auth/pull/10963) [`74a7369`](https://github.com/better-auth/better-auth/commit/74a7369179cc6ab9fc2a9f13a67b33e8c00aa9ac) 感谢 [@thisismert](https://github.com/thisismert)！- 在上次登录方式插件中追踪电子邮件 OTP 登录。

- [#11085](https://github.com/better-auth/better-auth/pull/11085) [`e16b40a`](https://github.com/better-auth/better-auth/commit/e16b40aeadde4203c883f121e7e5f7a2ec04d6b2) 感谢 [@bytaesu](https://github.com/bytaesu)！- 为 Vue 客户端的 `useSession` hook 提供类型安全的 Nuxt `useFetch` 集成。

- [#11066](https://github.com/better-auth/better-auth/pull/11066) [`c0444dc`](https://github.com/better-auth/better-auth/commit/c0444dc97928f46978c42083083d3b8642b89493) 感谢 [@bytaesu](https://github.com/bytaesu)！- 将打包的 Zod 依赖升级到 4.5。生成的 OpenAPI schema 现在会将必填请求字段标记为与运行时验证一致，其中包括 passkey 注册响应。

- 已更新依赖 [[`352d012`](https://github.com/better-auth/better-auth/commit/352d012bd54e613782bf4af22aae24443541c77c), [`76d311f`](https://github.com/better-auth/better-auth/commit/76d311f4b94799496ddfc0be7d03db1731f4b2a6), [`3e9e197`](https://github.com/better-auth/better-auth/commit/3e9e19746e609004da31bea3356c0059611d9ed4), [`157ec8d`](https://github.com/better-auth/better-auth/commit/157ec8d8799ddda642f2fe40120fc364660a8864), [`baa08f4`](https://github.com/better-auth/better-auth/commit/baa08f4ee674f5cc39624063847c89f1bea73186), [`9e36635`](https://github.com/better-auth/better-auth/commit/9e36635eb2fbf27d58c70d3361724335ba9a9951), [`be0e007`](https://github.com/better-auth/better-auth/commit/be0e007e20ea310aa533acf49edfae34cfc797a9), [`a2bae0c`](https://github.com/better-auth/better-auth/commit/a2bae0cad04ccc23c40555c77f86b0da1ba40ebc), [`1a1b7d5`](https://github.com/better-auth/better-auth/commit/1a1b7d56f51cb9ce6b06334b22fcbfa0d52be05a), [`2220ee7`](https://github.com/better-auth/better-auth/commit/2220ee726934de3aa128d5b4114391be8e9570cc)]：
  - @better-auth/core@1.7.3
  - @better-auth/drizzle-adapter@1.7.3
  - @better-auth/prisma-adapter@1.7.3
  - @better-auth/kysely-adapter@1.7.3
  - @better-auth/memory-adapter@1.7.3
  - @better-auth/mongo-adapter@1.7.3
  - @better-auth/telemetry@1.7.3

## 1.7.2

### 补丁更改

- [#10875](https://github.com/better-auth/better-auth/pull/10875) [`d5d889b`](https://github.com/better-auth/better-auth/commit/d5d889bfd8708601d8f27526d35fb9568450b51e) 感谢 [@bytaesu](https://github.com/bytaesu)！- 修复 Cloudflare D1 上的程序化迁移失败问题，同时保留对受支持数据库中现有索引的验证。

- [#10982](https://github.com/better-auth/better-auth/pull/10982) [`b4ad5a1`](https://github.com/better-auth/better-auth/commit/b4ad5a110ca4f2e043c0f23a8e5f87e0b31c3fc6) 感谢 [@bytaesu](https://github.com/bytaesu)！- 内置占位邮箱现在始终使用带命名空间的 `{identifier}@{namespace}.placeholder.invalid` 格式。

- [#10934](https://github.com/better-auth/better-auth/pull/10934) [`c7a5c1a`](https://github.com/better-auth/better-auth/commit/c7a5c1a7ed65a5169e98bd347df91b16bb394692) 感谢 [@bytaesu](https://github.com/bytaesu)！- Cookie-cache 读取签名会话数据无效时现在会发出警告，而不是静默地表现为已登出会话。

- [#10879](https://github.com/better-auth/better-auth/pull/10879) [`78f0c39`](https://github.com/better-auth/better-auth/commit/78f0c3922c273de29bd0b77213fbc37cc3b5917e) 感谢 [@starslingdev](https://github.com/apps/starslingdev)！- 使用 `getTestInstance` 的测试套件现在运行得更快，因为共享 fixture 默认会避免生产环境密码哈希带来的开销。自定义 `emailAndPassword.password` 实现仍具有优先权。

- [#10823](https://github.com/better-auth/better-auth/pull/10823) [`ce8a3ab`](https://github.com/better-auth/better-auth/commit/ce8a3ab5442fdd388f3b1346b71292cf617c3146) 感谢 [@sosyz](https://github.com/sosyz)！- 确保永久封禁用户时会清除先前临时封禁的到期时间。

- [#10907](https://github.com/better-auth/better-auth/pull/10907) [`a021eaf`](https://github.com/better-auth/better-auth/commit/a021eafaf235dd08c0835d91ee714aca24c4605e) 感谢 [@heliohm](https://github.com/heliohm)！- 使用更多插件创建的客户端现在可以再次赋值给声明插件较少的客户端类型，与 1.6 中的行为一致。

- [#10959](https://github.com/better-auth/better-auth/pull/10959) [`c8dcfa5`](https://github.com/better-auth/better-auth/commit/c8dcfa57e11e22325dbb2a0cc1af6775f41b1315) 感谢 [@bytaesu](https://github.com/bytaesu)！- 允许使用 `Referrer-Policy: no-referrer` 的页面提交同源表单，同时继续拒绝不受信任的请求来源。

- [#10979](https://github.com/better-auth/better-auth/pull/10979) [`fced1a5`](https://github.com/better-auth/better-auth/commit/fced1a5d360c14e6358f88dedc9014ff862873f1) 感谢 [@bytaesu](https://github.com/bytaesu)！- 允许相对回调和重定向 URL 使用标准路径、查询和片段语法，同时保留开放重定向防护。

- [#10041](https://github.com/better-auth/better-auth/pull/10041) [`f6891a2`](https://github.com/better-auth/better-auth/commit/f6891a2d2d4f7ead7e9b13e65316a0cbd88f3fe4) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 允许受信任来源检查所验证的相对回调 URL 中包含 `~`。

- [#10877](https://github.com/better-auth/better-auth/pull/10877) [`649818a`](https://github.com/better-auth/better-auth/commit/649818a2969594e58147a2cc08157812ea0b75ef) 感谢 [@bytaesu](https://github.com/bytaesu)！- 防止已禁用的 MyISAM 索引通过迁移索引检查。

- 更新的依赖项 [[`557e19b`](https://github.com/better-auth/better-auth/commit/557e19bfad0f2d2842903ddb1e768a0506aceaea), [`64da15b`](https://github.com/better-auth/better-auth/commit/64da15b0b1ca078d80f115ee0a5bd9ad4ca4d64e), [`d5d889b`](https://github.com/better-auth/better-auth/commit/d5d889bfd8708601d8f27526d35fb9568450b51e), [`b4ad5a1`](https://github.com/better-auth/better-auth/commit/b4ad5a110ca4f2e043c0f23a8e5f87e0b31c3fc6), [`ea77118`](https://github.com/better-auth/better-auth/commit/ea77118d4e00f69ddffed4fb42dfedc08594ea9e), [`5aea9f7`](https://github.com/better-auth/better-auth/commit/5aea9f77284dfb7b187e8e7bec0cebd4b8834123), [`fced1a5`](https://github.com/better-auth/better-auth/commit/fced1a5d360c14e6358f88dedc9014ff862873f1), [`e1d4011`](https://github.com/better-auth/better-auth/commit/e1d40116e2b6a797372ac82b9feea39f57285632)]：
  - @better-auth/core@1.7.2
  - @better-auth/kysely-adapter@1.7.2
  - @better-auth/drizzle-adapter@1.7.2
  - @better-auth/memory-adapter@1.7.2
  - @better-auth/mongo-adapter@1.7.2
  - @better-auth/prisma-adapter@1.7.2
  - @better-auth/telemetry@1.7.2

## 1.7.1

### 补丁变更

- [#10863](https://github.com/better-auth/better-auth/pull/10863) [`845bbd1`](https://github.com/better-auth/better-auth/commit/845bbd1de682ab87e03ce925f85087da81249a4e) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `auth migrate` 不再尝试向已有数据行的表添加没有默认值的必填列。此操作会停止并报错，指出列名以及需要先运行的回填操作。此前，生成的语句在 SQLite、Postgres 和 SQL Server 上会失败；在 MySQL 上则会为每条现有记录将新列填为空字符串，并报告成功。如果 `auth migrate` 已在 1.7 上针对 MySQL 数据库运行，请执行升级指南中账户身份部分的检查。

  对于此拒绝操作，`getMigrations` 会抛出新的 `UnsafeMigrationError`（从 `better-auth/db/migration` 导出），因此调用方可以将其与其他迁移错误（如索引定义冲突）区分开来。

  `auth generate` 仍会为外部迁移工具生成语句，并附带注释横幅，指出需要先手动回填的列。

  如果某个必填字段对应的数据库列仍可为空，则会记录警告，而不是阻止迁移。

  CLI 命令失败时现在会打印错误并以非零代码退出，而不是产生未处理的 Promise 拒绝。

- 更新的依赖项 []：
  - @better-auth/core@1.7.1
  - @better-auth/drizzle-adapter@1.7.1
  - @better-auth/kysely-adapter@1.7.1
  - @better-auth/memory-adapter@1.7.1
  - @better-auth/mongo-adapter@1.7.1
  - @better-auth/prisma-adapter@1.7.1
  - @better-auth/telemetry@1.7.1

## 1.7.0

### 次要变更

- [#8733](https://github.com/better-auth/better-auth/pull/8733) [`4e8e4c7`](https://github.com/better-auth/better-auth/commit/4e8e4c7fc5fb2723144cbf41c4a1bfa28de8d671) 感谢 [@bytaesu](https://github.com/bytaesu)！- 新增 `hydrateSession`，用于使用从服务器获取的会话为客户端注入初始数据，使 `useSession` 在首次渲染时就能返回数据。

- [#9930](https://github.com/better-auth/better-auth/pull/9930) [`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 Expo 和其他应用内浏览器中，OAuth 回调不会返回会话 cookie；现在匿名账户关联在社交登录和通用 OAuth 登录后也能正常工作。`onLinkAccount` 会触发，匿名用户也会迁移；此前这一步会被静默跳过。

  插件现在可以通过新的 `addOAuthServerContext` API，在 OAuth 重定向期间携带受服务器信任的数据，并在回调中通过 `getOAuthState().serverContext` 读取。与 `additionalData` 不同，这些数据无法通过请求体设置，因此适合存放服务器必须信任的值。

  对于 `@better-auth/oauth-provider`，登录后的授权查询现在通过这个仅限服务器的通道传递，因此无法再通过 `additionalData` 注入。

- [#10004](https://github.com/better-auth/better-auth/pull/10004) [`b36c38f`](https://github.com/better-auth/better-auth/commit/b36c38f9842d3416689340552989449a32007819) 感谢 [@bytaesu](https://github.com/bytaesu)！- captcha 插件现在要求端点条目匹配完整的 auth 路径，除非使用通配符模式。这样可以防止 `/sign-in//email` 之类的请求绕过 captcha，同时仍允许匹配带尾随斜杠的路径，例如 `/sign-in/email/`。若要保护多个路由，请将 `/sign-in` 之类的部分路径替换为明确的通配符，例如 `/sign-in/*` 或 `/sign-in/**`。

- [#10746](https://github.com/better-auth/better-auth/pull/10746) [`6782647`](https://github.com/better-auth/better-auth/commit/6782647d7c2d248246f9ef3980e656725c29ce64) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth 设备授权现在通过 `oauthDeviceAuthorization()` 与 `oauthProvider()` 或 `mcp()` 一起使用。此集成取代了独立的 `deviceCodeGrant()` 插件和共享授权配置。独立的 Device Authorization 不再接受或存储 RFC 8707 资源，`onDeviceAuthRequest` 也只会接收 `clientId` 和 `scope`。OAuth 集成会拒绝非绝对 URI 或包含片段的资源指示符。

  OAuth 集成将可选的 `resource` 列替换为 `oauthClientId` 和 `resources`。使用该集成时，请重新生成并应用 schema。从早期的 1.7 预发布版本升级前，请等待待处理的 OAuth 设备代码过期或将其删除，因为这些代码无法通过新集成兑换。

- [#10402](https://github.com/better-auth/better-auth/pull/10402) [`763a267`](https://github.com/better-auth/better-auth/commit/763a2671c5372d88c291881977c8a1c2e29034b1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 插件数据库 schema 现在可以在多个字段上定义命名或自动生成的表级索引。SQL 迁移以及生成的 Drizzle 或 Prisma schema 会以一致的方式解析配置的表名和列名，而 MongoDB 适配器会在首次执行强制索引的写入之前创建相同的索引。

- [#9766](https://github.com/better-auth/better-auth/pull/9766) [`bf39cbf`](https://github.com/better-auth/better-auth/commit/bf39cbf13f3b934f728cde72b1e7ebdc4c85f641) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 新增仅限服务器的 `auth.api.consumePhoneNumberOTP` API，用于需要验证并消费验证码、但不创建或更新用户或会话的自定义手机 OTP 流程。

- [#10330](https://github.com/better-auth/better-auth/pull/10330) [`081d3c3`](https://github.com/better-auth/better-auth/commit/081d3c379c720926295067d878c421b5e8684c78) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 在服务器和客户端插件上都设置 `displayUsername: false`，即可省略 username 插件中单独的 `displayUsername` 字段。

- [#10059](https://github.com/better-auth/better-auth/pull/10059) [`49b5cf6`](https://github.com/better-auth/better-auth/commit/49b5cf650e1264ecc4c917ca193ea05c3b58a3b9) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- Device Authorization 现在会为 `deviceCode` 和 `userCode` 创建唯一数据库索引，因此每个生成的代码在其所在列中都必须唯一。所有适配器上的现有安装都必须在应用迁移前解决重复值。MySQL 和 SQL Server 安装还必须将这两列转换为有长度限制的字符串，并在运行迁移前清理长度超过 191 个字符的值。

  生成的代码长度上限为 191 个字符。签发代码时最多会尝试 3 次以解决唯一键冲突；如果仍无法生成唯一的 `deviceCode` 和 `userCode`，则返回 `server_error`。默认生成的用户代码在验证、批准和拒绝时允许大小写变更和用于提高可读性的分隔符；不属于默认字符集的自定义代码则必须完全匹配。`/device` 限流器在与配置的代码有效期相等的时间窗口内允许 5 个请求，而 `/device/token` 轮询仍使用独立的间隔行为。

- [#9645](https://github.com/better-auth/better-auth/pull/9645) [`e014029`](https://github.com/better-auth/better-auth/commit/e0140297a59ddb59cccbcb4ba46c513de8cb86a7) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 加固 Electron OAuth 流程，并收紧自定义 scheme 的可信来源匹配。

  Electron 登录流程现在强制要求 PKCE S256。Plain PKCE 会被拒绝：`code_challenge_method` 参数已移除，所有授权码都会通过使用 SHA-256 对 verifier 进行哈希来验证。服务器不再信任 `electron-origin` 请求头来设置请求 Origin。Electron 客户端现在会发送真实的 `Origin`（例如 `myapp:/`），因此请同时升级 `@better-auth/electron` 客户端和服务器，并确保应用的 scheme 位于 `trustedOrigins` 中。未使用的 `disableOriginOverride` 选项已移除。

  `trustedOrigins` 中的自定义 scheme 条目现在按 scheme 和 authority 匹配，而不是按字符串前缀匹配。像 `myapp://` 或 `exp://` 这样的无主机条目仍信任该 scheme 下的所有主机；但像 `myapp://callback` 这样的带主机条目只精确匹配该主机，因此 `myapp://callback.attacker.tld` 不再能满足匹配条件。

- [#9948](https://github.com/better-auth/better-auth/pull/9948) [`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3) 感谢 [@yordis](https://github.com/yordis)！- feat(generic-oauth)：添加 `refreshTokenParams` 配置，用于在刷新令牌时转发额外参数

  多租户 OIDC 提供商（Zitadel 多组织、带有 `audience` 的 Auth0）需要在刷新请求中发送额外的请求体参数，以便重新限定令牌范围，而无需完整的授权重定向。generic-oauth 插件现在接受 `refreshTokenParams` 选项（对象或同步/异步函数），并将其合并到刷新请求体中；`grant_type` 和 `refresh_token` 不允许被覆盖。函数形式会接收触发刷新的请求的元数据，因此可以使用请求范围的数据（headers、cookies），而无需依赖 AsyncLocalStorage 等外部状态。

  `UpstreamProvider.refreshAccessToken` 现在接受可选的第二个 `ctx` 参数；此变更向后兼容，因为现有仅接受 `refreshToken` 的实现仍然有效。请参阅 [#7554](https://github.com/better-auth/better-auth/issues/7554)。

- [#9069](https://github.com/better-auth/better-auth/pull/9069) [`c7d2253`](https://github.com/better-auth/better-auth/commit/c7d22539ec4f7322d9625ae2953d397c3863d097) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将 generic OAuth 插件重写为一等社交提供商，并采用 OAuth 2.1 安全默认值。提供商现在使用 `signIn.social` + `callback/:id`，而不是专用插件端点；默认要求 PKCE（OAuth 2.1），支持 RFC 9207 issuer 验证、注入 `openid` scope 的 OIDC 自动发现，以及带类型的提供商 ID。

  **破坏性变更：**
  - `signIn.oauth2({ providerId })` 替换为 `signIn.social({ provider })`
  - `oauth2.link()` 替换为 `linkSocial()`
  - 回调 URL 从 `/api/auth/oauth2/callback/:id` 更改为 `/api/auth/callback/:id`
  - `genericOAuthClient()` 已移除；generic OAuth 提供商现在使用标准社交客户端 API
  - `pkce` 默认值改为 `true`（原为 `false`）；对于拒绝 PKCE 的提供商，请设置 `pkce: false`
  - `authorizationUrlParams` 和 `tokenUrlParams` 只接受 `Record<string, string>`
  - `issuer` 和 `requireIssuerValidation` 配置字段已移除；issuer 验证会通过 OIDC 发现自动进行
  - `mapProfileToUser` 的 profile 类型为 `OAuth2UserInfo & Record<string, unknown>`

- [#9966](https://github.com/better-auth/better-auth/pull/9966) [`ec8a38c`](https://github.com/better-auth/better-auth/commit/ec8a38c08f5cfe2d922be0f8a49f2d0fa84de799) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用 `discoveryUrl` 配置的 genericOAuth 提供商现在会根据其发布的 JWKS 验证提供商的 `id_token`（签名、issuer、audience 和声明的算法），并使用服务器生成的 OIDC `nonce` 将其绑定到授权请求。如果 `id_token` 验证失败，或未返回预期的 `nonce`，则登录会被拒绝。

  如果某个提供商在授权码流程中不返回 `nonce` claim，请为其设置 `disableIdTokenNonceBinding: true`。

  这些提供商现在也支持通过 `signIn.social({ idToken })` 使用客户端提交的 id_token 登录；此前此操作会返回 `ID_TOKEN_NOT_SUPPORTED`。

  使用显式端点而非 `discoveryUrl` 配置的提供商不受影响。

- [#9368](https://github.com/better-auth/better-auth/pull/9368) [`430c895`](https://github.com/better-auth/better-auth/commit/430c89549060ef6bd477ed2510650b9e49bba560) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- Generic OAuth 用户现在调用 `authClient.signOut()` 时，可以从配置的 OpenID 提供商注销。如果提供商公开了通过发现获取或配置的注销端点，Better Auth 会重定向到该端点，并在可用时附带已存储的 `id_token_hint`。请传入 `callbackURL` 或配置 `postLogoutRedirectURI` 来设置返回流程，也可以选择传入 `state`；或者设置 `disableRedirect`，自行处理返回的 `url`。如果多个已关联提供商都支持注销，Better Auth 会选择最近更新的账户。设置 `disableProviderLogout: true` 可让注销仅在本地进行。

- [#9431](https://github.com/better-auth/better-auth/pull/9431) [`523f95c`](https://github.com/better-auth/better-auth/commit/523f95c10db24b790bbd75fe85c86c34d3465267) 感谢 [@pi0](https://github.com/pi0)！- feat：使 `Auth` 实例可通过 fetch 访问

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 遇到 scope 限制的 MCP 客户端现在可以准确了解需要申请哪些 scope。缺少受保护的 scope 时，会返回带有 RFC 6750 `insufficient_scope` `WWW-Authenticate` challenge 的 `403`，其中列出所有缺失的 scope。客户端可以将这些 scope 合并到一个授权请求中，而不必针对每个 scope 单独打开一次浏览器重定向。
  - 通过 `RequireMcpAuthOptions` 或对应的 `createMcpProtectedRequestHandler` 验证器选项中的 `requiredScopes` 配置受保护的 scope。默认采用精确匹配；`isScopeSatisfied` 可用于定义层级策略。
  - 当某个操作动态确定其所需的 scope 时，请使用 `createInsufficientScopeError`。`createResourceServerChallenge` 会将该信号和可识别的令牌错误转换为安全的 RFC 6750 challenge。
  - 仅在未认证的 challenge 提示中使用 `challengeScopes`。

  由处理器生成的响应、普通权限拒绝、配置失败以及无关的抛出值都会保留其原始状态和身份。

- [#10403](https://github.com/better-auth/better-auth/pull/10403) [`dbd302e`](https://github.com/better-auth/better-auth/commit/dbd302e422c66620cde391f6a80ab90ee34182f9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 现在账户身份按受信任的 issuer 进行范围限定，而不是按提供商配置。账户使用唯一的 `(issuer, accountId)` 键，因此同一个 OpenID Connect issuer 的别名会去重为同一个外部身份，而不同 issuer 下相同的 subject 仍然彼此独立。这种身份去重不会为别名引入独立的授权或提供商生命周期记录。

  此版本要求 `Account.issuer`，但保留 `Account.accountId` 作为由提供商分配的账户标识符。账户专属 API 通过 `accountId` 请求属性选择本地的 `Account.id`；令牌和提供商配置文件 API 则可以通过 `useAccountCookie: true` 选择经过签名的账户 cookie。凭证账户使用 `local:credential`，并将关联用户的稳定 `id` 作为其提供商身份。

  OAuth 提供商身份现在取自原始的已验证配置文件。OpenID Connect 发现使用 `sub`，普通 OAuth 使用 `id`，提供商也可以通过 `accountSubject` 声明其他不可变字段；Better Auth 不再在运行时于 `sub` 和 `id` 之间切换。`getUserInfo().user` 不再携带提供商身份，`mapProfileToUser` 也不能返回 `id`。请从 `accountInfo.account.accountId` 而不是 `accountInfo.user.id` 读取选定的身份。通用 `microsoftEntraId` helper 现在要求提供具体的租户 GUID；多租户 authority 请使用内置的 Microsoft 提供商。

  SSO 账户 subject 现在由协议定义。OIDC 使用经过验证的 `sub` claim，SAML 使用签名的 `NameID`；两种配置中的 `mapping.id` 均已移除。未使用 metadata XML 的手动 SAML 配置必须设置 `idpMetadata.entityID`，因为 `samlConfig.issuer` 用于标识服务提供商，不再作为 IdP 身份。

  部署前，请按照 Better Auth 1.7 升级指南应用经过审核的账户身份回填。生成的 schema 迁移无法自动分配受信任的 issuer，也无法自动解决现有身份冲突。

- [#10359](https://github.com/better-auth/better-auth/pull/10359) [`8784c1c`](https://github.com/better-auth/better-auth/commit/8784c1c1f4301acf96d980e5bf81ff56435e2545) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 数据库联接已从 `experimental` 移至稳定选项 `advanced.database.joins`（默认值：`false`）。

  如果之前设置了 `experimental: { joins: true }`，请将配置更新为：

  ```ts
  advanced: {
    database: {
      joins: true,
    },
  }
  ```

  支持原生联接的适配器会在启用时使用原生联接。如果适配器无法为某个查询返回联接数据，Better Auth 会退回到额外查询并合并结果。Drizzle 和 Prisma 用户应确保 schema 包含所需的关系（`npx auth@latest generate`）。

- [#9992](https://github.com/better-auth/better-auth/pull/9992) [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- MCP 插件已从 `better-auth` 移至独立包 `@better-auth/mcp`，并基于 `@better-auth/oauth-provider` 构建。请从包根目录导入授权插件和受保护请求 helper。核心内置的 MCP 客户端（`createMcpAuthClient` 及其适配器）已移除；MCP 协议和传输客户端请使用官方版本 2 的 `@modelcontextprotocol/client` 和 `@modelcontextprotocol/server` 包。OAuth 端点从 `/mcp/*` 移至 `/oauth2/*`，发现端点为 `/.well-known/oauth-authorization-server`，受保护资源元数据端点为 `/.well-known/oauth-protected-resource`。基于发现机制的 MCP 客户端会自动使用新位置。

  共享 auth 路由 helper 已从 `withMcpAuth` 更名为 `requireMcpAuth`。独立的受保护资源工厂已从 `mcpHandler` 更名为 `createMcpProtectedRequestHandler`；请传入一个扁平的 `McpProtectedRequestHandlerOptions` 对象，其中包含 `issuer`、单个 `audience`、可选的 `jwtVerifyOptions`、令牌验证字段和 challenge 字段。其回调会接收 `accessTokenClaims`。`requireMcpAuth` 会根据已发布的 JWKS 验证访问令牌，为 DPoP 绑定令牌验证 DPoP 证明，并将已验证的访问令牌 claims 传递给处理器。

  `createInsufficientScopeError` 现在会在构造错误时，根据 RFC 6750 `error_description` 字符集验证自定义描述。无效描述会抛出 `TypeError("invalid error_description")`，确保错误在进入资源 challenge 序列化之前被拦截。

  MCP 2026-07-28 使用无状态请求和响应传输。请使用版本 2 的 `@modelcontextprotocol/server` 提供 MCP 路由，将 `createMcpHandler` 配置为 `legacy: "reject"`，用 `requireMcpAuth` 包装它，并且只导出 `POST`。移除 MCP 路由的 `GET` 和 `DELETE` 导出，以及 `redisUrl` 等会话存储选项。OAuth 客户端、consent、授权码、刷新令牌和安全记录仍然是持久化的授权状态。

  迁移时，请安装 `@better-auth/mcp`、`@better-auth/cimd`，以及应用所需的官方版本 2 MCP 客户端或服务器包；添加现在为令牌签名所必需的 `jwt()` 插件；并将之前嵌套在 `oidcConfig` 下的选项移至 `mcp({ ... })` 的扁平选项中。数据库模型也已变更：`oauthApplication` 更名为 `oauthClient`，并新增 `oauthRefreshToken` 和 `oauthClientAssertion` 表。请使用 `npx auth migrate` 或 `npx auth generate` 重新生成或迁移 schema。

- [#10204](https://github.com/better-auth/better-auth/pull/10204) [`0683a5f`](https://github.com/better-auth/better-auth/commit/0683a5f36befb45ade3866c7f8057791eadeee59) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- Microsoft 登录现在会在内置 `microsoft` 提供商和 Generic OAuth `microsoftEntraId` helper 中，使用稳定的 `oid` claim 标识 Entra 账户。没有有效 `oid` 的令牌会被拒绝；如果 Microsoft 发现信息未提供 ID 令牌验证元数据，Generic OAuth helper 将拒绝初始化。升级前，必须迁移现有基于 `sub` 创建的 Microsoft 账户行。

- [#9305](https://github.com/better-auth/better-auth/pull/9305) [`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth)：在 `signIn.social`、`linkSocial` 和 `signIn.sso` 中实现逐请求 `additionalParams` 和 `loginHint` 的一致支持

  统一的扩展方式，用于按请求自定义提供商授权 URL。此前，Google 的 `access_type=offline` / `prompt=consent`、Cognito 的 `identity_provider=Google` 或 Microsoft 的 `domain_hint` 等动态参数只能作为静态服务器配置设置。

  ### 新增功能
  - `signIn.social`、`linkSocial` 和 `signIn.sso` 接受 `additionalParams: Record<string, string>`。这些值会作为查询参数附加到授权 URL。
  - `linkSocial` 也接受 `loginHint`，与 `signIn.social` 和 `signIn.sso` 的接口保持一致。
  - `OAuthProvider.createAuthorizationURL` 的输入契约新增 `additionalParams`；每个内置提供商都会将其转发给共享 helper。
  - Generic-OAuth 提供商会将调用时传入的 `additionalParams` 与配置级别的 `authorizationUrlParams` 合并；键冲突时以调用时传入的值为准。
  - Cognito 提供类型化的 `identityProvider?: string` 配置选项，该选项会映射到 `identity_provider` 查询参数，避免使用魔法字符串。

  ### 安全性
  - 共享的 `createAuthorizationURL` helper 会静默丢弃调用方提供的任何 `RESERVED_AUTHORIZATION_PARAMS` 中的键（`state`、`client_id`、`redirect_uri`、`response_type`、`code_challenge`、`code_challenge_method`、`nonce`、`scope`）。请求体 Zod schema 也会拒绝相同的键并返回 400，因此误用会在入口处明确提示，而不会静默覆盖安全关键参数。`nonce` 被列为保留参数，因此调用方无法替换 OIDC nonce Better Auth 在将 discovery provider 的 `id_token` 绑定到授权请求时生成的值。
  - 使用非标准客户端标识符的 provider（`wechat` → `appid`、`tiktok` → `client_key`）还会过滤这些键，防止调用方替换已配置的 OAuth 应用。
  - 集成功能所必需的 provider 协议常量（`atlassian` → `audience`、`notion` → `owner`）会最后合并，因此调用方提供的 `additionalParams` 无法覆盖它们。代表操作员意图的已配置默认值（例如 Google `include_granted_scopes`、Cognito `identityProvider`）仍可由调用方覆盖。
  - 如果解析出的 provider 是 SAML，`signIn.sso` 会以 400 拒绝 `additionalParams`；SAML AuthnRequest 已签名，无法携带调用方提供的查询参数，因此静默丢弃这些参数会误导集成方。

  ### OpenAPI
  - 在 OpenAPI 生成器中新增 `ZodRecord` 处理，使 `z.record()` 字段输出带有类型化 `additionalProperties` 的 `type: object`。同时修复了一个长期存在的问题：`additionalData` 此前会被渲染为 `type: string`。

  ### 重构
  - `discord`、`roblox`、`zoom` 和 `slack` provider 现在会委托给共享的 `createAuthorizationURL` helper，并继承其 RFC 行为和保留键保护。
  - `tiktok` 和 `wechat` 保留手动 URL 构造（非标准 OAuth2 参数名称和 URL 片段要求），但会通过相同的保留键过滤器传递 `additionalParams`。

  关闭 [#2351](https://github.com/better-auth/better-auth/issues/2351)。
  关闭 [#5441](https://github.com/better-auth/better-auth/issues/5441)。
  关闭 [#5592](https://github.com/better-auth/better-auth/issues/5592)。
  关闭 [#5604](https://github.com/better-auth/better-auth/issues/5604)。
  取代 [#4992](https://github.com/better-auth/better-auth/issues/4992) 和 [#5443](https://github.com/better-auth/better-auth/issues/5443)。

- [#10127](https://github.com/better-auth/better-auth/pull/10127) [`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 配置了 `baseURL.allowedHosts` 时，OAuth 登录、账号关联、回调和代理流程现在会根据当前请求的基础 URL 构建 `redirect_uri`。在多主机部署中，内置社交 provider 和通用 OAuth provider 现在会使用解析出的请求主机进行重定向。

  使用共享 `/callback/<provider-id>` 路由时，自定义 `OAuthProvider` 实现可以省略 `callbackPath`。仅在使用自定义回调路由时设置 `callbackPath`。

- [#10039](https://github.com/better-auth/better-auth/pull/10039) [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth-provider)!：DPoP 绑定访问令牌（RFC 9449）

  OAuth provider 集成现在可以签发和验证 DPoP 发送方约束令牌。客户端可在注册时通过 `dpop_bound_access_tokens`、在授权请求中通过 `dpop_jkt`，或通过指定配置了 `dpopBoundAccessTokensRequired` 的资源来请求这类令牌。签发的令牌包含 `cnf.jkt`，返回 `token_type: "DPoP"`，并在刷新令牌轮换、内省和 userinfo 过程中保持绑定。

  资源服务器通过 `verifyAccessTokenRequest` 验证 DPoP 请求；该函数会检查 `Authorization: DPoP` 方案、证明、请求目标、访问令牌哈希和证明重放。MCP 包会在受保护资源元数据中声明 DPoP，并验证 DPoP 绑定请求。证明重放通过数据库支持的验证存储拒绝，因此防重放机制在多个实例间有效。`verifyAccessTokenRequest` 和 `requireMcpAuth` 默认使用该存储；可通过 `createDpopReplayStore(internalAdapter)` 创建，或传入自定义的 `dpop.replayStore`。此功能需要数据库支持的验证存储：仅使用二级存储的部署会拒绝 DPoP 请求，而不会跳过重放保护。

  破坏性变更：原始令牌验证器 `verifyAccessToken` 在 `better-auth/oauth2` 和 `oauthProviderResourceClient` action 中均更名为 `verifyBearerToken`，并且会拒绝 DPoP 绑定令牌。任何可能接收这类令牌的端点都应使用 `verifyAccessTokenRequest`。资源请求输入类型从 `AccessTokenRequestInput` 更名为 `ResourceRequestInput`，DPoP 算法选项在所有位置统一为 `signingAlgorithms`。

  运行 schema 迁移以添加 DPoP 令牌绑定字段：访问令牌表和刷新令牌表中的 `confirmation` 列。DPoP 绑定客户端还会新增 `dpopBoundAccessTokens`，资源则会新增 `dpopBoundAccessTokensRequired`。不会添加专用的重放表；证明重放会复用验证存储。

- [#9828](https://github.com/better-auth/better-auth/pull/9828) [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用单个共享验证器验证社交 provider 的 id_token。

  客户端提交的 id_token 登录（`signIn.social({ idToken })` 和账号关联）现在由单个函数验证，而不是使用各 provider 独立的 `verifyIdToken` 方法。每个 provider 都声明一个包含 JWKS 来源、issuer 和 audience 的 `idToken` 配置，核心验证器会执行签名、issuer、audience 和 nonce 检查。未声明配置的 provider 会拒绝客户端 id_token 路径。

  PayPal 以前会接受任何可解码的 id_token，而不验证其签名。PayPal 从访问令牌中获取身份，因此现在不声明 `idToken` 配置，客户端 id_token 路径会返回 `ID_TOKEN_NOT_SUPPORTED`。通过重定向流程进行的 PayPal 登录不变。

  直接实现 `UpstreamProvider` 的自定义 provider 应将已移除的 `verifyIdToken` 方法替换为 `idToken` 配置：

  ```ts
  idToken: {
  	jwks: createRemoteJWKSet(new URL("https://issuer.example/.well-known/jwks.json")),
  	issuer: "https://issuer.example",
  	audience: clientId,
  },
  ```

  如果验证方式无法使用本地 JWKS，可传入 `idToken: { verify: async (token, nonce) => boolean }`。provider 选项 `verifyIdToken` 和 `disableIdTokenSignIn` 不变。

- [#9079](https://github.com/better-auth/better-auth/pull/9079) [`6f2948e`](https://github.com/better-auth/better-auth/commit/6f2948e87bb5fa14bd2174a91f7143e1eced1b87) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth-provider)：根据 OIDC Core §3.1.3.6 在 ID token 中计算 `at_hash`

  与访问令牌一同签发的 ID token 现在包含 `at_hash` 声明，该声明会以加密方式绑定两个令牌，以防止令牌替换攻击。哈希算法根据实际签名密钥的算法选择（EdDSA/Ed25519 使用 SHA-512，RS/ES/PS384 使用 SHA-384，RS/ES/PS512 使用 SHA-512，其余使用 SHA-256）。

  `better-auth/plugins` 新增了 `resolveSigningKey()` 导出，可用于解析当前 JWKS 签名密钥（包括其算法）。使用自定义 `jwt.sign` 回调时，会根据声明的算法验证已签名 ID token 的标头，以防止 `at_hash` 不匹配。

- [#10135](https://github.com/better-auth/better-auth/pull/10135) [`f68044d`](https://github.com/better-auth/better-auth/commit/f68044dcfbd9fb83763249ed9509cfacbcce47be) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！- 注册的 OAuth 客户端现在可以使用 RFC 8628 设备流程获取 OAuth 访问令牌。在 `oauthProvider()` 或 `mcp()` 旁添加 `oauthDeviceAuthorization()`，在 `/device/code` 请求代码，并在用户批准后于 `/oauth2/token` 兑换。OAuth 和 OpenID discovery 会公布 `device_authorization_endpoint`。

  设备授权请求可以绑定 RFC 8707 资源指示符。`GET /device` 会向拥有该请求的已认证用户返回所请求的客户端、作用域和资源。令牌请求可以复用或缩小已批准的资源范围，但不能添加新资源。现有的一方设备客户端仍会从 `/device/token` 获取 Better Auth session token。

  启用 `oauthDeviceAuthorization()` 会向 `deviceCode` 添加可空的 `oauthClientId` 和 `resources` 字段。添加此集成后，请重新生成并应用数据库 schema。

  机密客户端在 `/device/code` 使用其注册的方法进行身份验证，而公开客户端发送 `client_id`。空的 `client_id`、`scope`、`user_id` 和身份验证值会被视为未提供；这些参数中任意一个出现多个非空值时都会返回 `invalid_request`，而多个 `resource` 值仍受支持。只有在 `oauthDeviceAuthorization({ validateClient })` 接受未知 OAuth 客户端 ID 时，这些 ID 才会进入独立设备流程。

- [#9929](https://github.com/better-auth/better-auth/pull/9929) [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 向 OAuth provider 选项添加 `requireEmailVerification`，适用于内置社交 provider 和 Generic OAuth 插件。当 provider 报告邮箱未经验证时，仍会创建或关联用户和账号，但不会签发 session：OAuth 回调会重定向并附带 `?error=email_not_verified`，而 ID token 和 One Tap 登录会返回 `403` `EMAIL_NOT_VERIFIED`。验证邮件遵循现有的 `emailVerification.sendOnSignUp` / `sendOnSignIn` 设置。

  此选项按 provider 单独启用，且不会继承 `emailAndPassword.requireEmailVerification`，因此现有社交登录仍可正常使用。此限制会检查本地用户的验证状态，因此通过其他方式验证过的用户仍可访问。仅对会报告可信 `email_verified` 信号的 provider 启用此选项。

- [#9648](https://github.com/better-auth/better-auth/pull/9648) [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！- OAuth provider 现在明确建模受保护资源。使用 `resources` 配置资源，或通过 `oauthResource` 管理 API 创建资源。每个资源都可以定义令牌 TTL、允许的作用域、自定义 JWT 声明和 JWT 签名固定项。

  `validAudiences` 已移除。请将每个现有资源标识符移入 `resources`；通过 `oauthClientResource` 或动态客户端注册 `resources`，关联应仅限于特定资源的客户端。

  访问令牌签发现在会对请求的 RFC 8707 `resource` 值应用资源策略。OAuth provider 会将作用域缩小到资源允许列表，使用最短的已配置 TTL，从自定义声明中剔除保留的 RFC 9068 声明名称，生成 `jti`，并保留重复的 `resource` 表单参数。

  刷新令牌 TTL 现在使用适用的最短生命周期。如果部署中某个资源的 `refreshTokenTtl` 长于 `refreshTokenExpiresIn`，刷新令牌将按 provider 默认值过期，而不是采用更长的资源值。

  JWT 签名现在可以遵循按资源设置的固定项。`signJWT()` 接受 `signingKeyId` 和 `signingAlgorithm`；JWKS adapter 提供 `getKeyById()` 和 `getLatestKeyByAlg()`。`jwks` 表新增可空的 `alg` 和 `crv` 列，`keyPairConfigs` 可以在同一个密钥环中配置多种算法。

  升级后，部署前请运行 `npx auth generate` 并应用迁移。迁移会添加 `oauthResource`、`oauthClientResource` 和新的 `jwks` 列。没有这些变更，使用 `signingAlgorithm` 的资源将无法找到匹配的密钥。

  资源服务器应在各自的源站发布 RFC 9728 受保护资源元数据。OAuth provider 提供的质询 helper 会将客户端指向该元数据。

  `@better-auth/mcp` 现在要求显式设置 `resource` 选项。该插件会将该标识符存储为 OAuth resource，为其发布 RFC 9728 受保护资源元数据，并将签发的访问令牌绑定到该资源。现有的 `mcp({ loginPage, consentPage })` 配置应添加受保护 MCP 资源标识符，例如 `resource: "https://api.example.com/mcp"`。

- [#10397](https://github.com/better-auth/better-auth/pull/10397) [`bb6c102`](https://github.com/better-auth/better-auth/commit/bb6c1021e8f6200e60ff852cbd95fb6841a0ec4b) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 添加 `organization.getOrganization()`，用于获取组织元数据，不包含成员或邀请。

- [#8931](https://github.com/better-auth/better-auth/pull/8931) [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 为 `session_data` cookie 缓存令牌添加选择启用的 JWKS 非对称 JWT 支持，使服务可以使用公钥而非共享密钥验证 cookie 缓存 JWT。可将 `jwt({ sessionCookieCache: true })` 与 `session.cookieCache.strategy = "jwt"` 一起启用。

- [#8977](https://github.com/better-auth/better-auth/pull/8977) [`954b664`](https://github.com/better-auth/better-auth/commit/954b664f4f251f8dd028451dab3ab43067dbf890) 感谢 [@ruban-s](https://github.com/ruban-s)！- 允许向 `listUserTeams` API 传入 `userId` 和 `organizationId`。`userId` 允许调用方列出组织中其他成员的团队（受 `member:update` 权限限制）。`organizationId` 会将结果限定到特定组织，而无需切换 session 的当前组织，与 `addTeamMember`/`removeTeamMember` 使用的模式一致。

- [#9969](https://github.com/better-auth/better-auth/pull/9969) [`76a3342`](https://github.com/better-auth/better-auth/commit/76a33429fc2a3edcc85307bf81b9d92a95f9de6c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用 `secondaryStorage` 和 `session.preserveSessionInDatabase` 登出时，现在会运行已配置的 `session.delete` hooks，并将保留的 session 行标记为已结束。绑定到该 session 的 OAuth Provider 访问令牌和刷新令牌会被撤销，且登出时会触发 back-channel logout。以前这种配置会跳过这些 hooks，因此令牌会一直有效到过期。

- [#9657](https://github.com/better-auth/better-auth/pull/9657) [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加固 `private_key_jwt` 和令牌端点客户端身份验证，并添加从结构上支持此修复的 helper。

  `@better-auth/core/oauth2` 现在提供 `encodeBasicCredentials` 和 `decodeBasicCredentials`，这对经过往返测试的函数遵循 RFC 6749 §2.3.1（对每个值使用 `application/x-www-form-urlencoded` 编码，且仅在第一个 `:` 处分割）。解码器会以大小写不敏感的方式接受方案，并根据 RFC 7235 §2.1 容忍凭据前一个或多个空格。客户端的 `client_secret_basic` 和服务端的 Better Auth OAuth provider 都会使用这些 helper，因此包含保留字符的凭据可以在整个调用链中正确往返，且 `basic xxx` 或 `Basic  xxx` 这样的标头也会被接受。

  `createPrivateKeyJwtClientAssertionGetter` 会立即验证选项。不支持的算法（`HS256`、`none`）、不包含密钥材料的 JWK，以及显式 `algorithm` 与 JWK 内嵌 `alg` 不一致的情况，都会在构造时而非首次令牌请求时抛出异常。`signPrivateKeyJwtClientAssertion` 对直接调用方执行相同检查。**破坏性变更：**此前，若 JWK `alg` 不受支持但与显式 `algorithm` 不同，配置会静默使用显式选项进行签名；现在会在构造时失败。

  **破坏性变更：**`@better-auth/oauth-provider` 现在仅接受 RFC 7517 JWK Set 对象格式且包含非空 `keys` 数组的客户端 `jwks` 元数据。在 DCR payload、管理端和用户端客户端创建、Client ID Metadata Documents、测试 fixture 及生成的客户端代码中，将 `jwks: [key]` 替换为 `jwks: { keys: [key] }`。远程获取的 `jwks_uri` 响应必须使用相同的对象格式。EC 密钥必须使用 P-256、P-384 或 P-521；OKP 密钥必须使用 Ed25519。如果密钥声明了 `alg`，它必须是受支持的 `private_key_jwt` 算法，且与密钥类型和曲线相匹配；如果客户端在其断言标头中选择算法，则省略 `alg`。此前通过 `oauthToSchema` 写入的 OAuth 客户端行已存储为 JWK Set 对象，因此这属于请求、配置和类型迁移，而非再次改写数据库；请单独审查在 Better Auth 之外写入的行。

  如果 `resolvePrivateKey` 回调未返回 `privateKeyJwk` 或 `privateKeyPem`，SSO `private_key_jwt` 流程会以 `error_description=no_private_key_available` 重定向。此前重定向路径只会在完全没有 resolver 时提前返回；resolver 返回空值时会继续执行，最终导致内部签名错误。

  `better-auth/test` 新增 `getHttpTestInstance`，作为 `getTestInstance` 的对应方法：它会在操作系统分配的端口上绑定真实 HTTP 监听器，并根据发现的 URL 构建 auth 实例。它消除了测试文件一直各自复制粘贴的临时服务器后重新绑定所造成的竞态。

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为整个调用链的令牌端点请求添加客户端身份验证配置，包括 `private_key_jwt`（RFC 7523）。

  通用 OAuth provider 现在接受用于令牌端点客户端身份验证的 `tokenEndpointAuth`。JWT 客户端断言使用 `tokenEndpointAuth: { method: "private_key_jwt", getClientAssertion }`，公开客户端使用 `{ method: "none" }`，显式基于密钥的客户端身份验证使用 `{ method: "client_secret_basic" }` 或 `{ method: "client_secret_post" }`，并搭配 `clientSecret`。现有的 `authentication: "basic" | "post"` 选项仍可用于基于密钥的令牌请求。

  使用 `createPrivateKeyJwtClientAssertionGetter()` 可根据私钥签署 RFC 7523 断言。断言 getter 会接收 `{ clientId, tokenEndpoint, grantType }`，因此集成无需在断言 helper 中重复客户端 ID 或令牌端点值。Core OAuth2 现在导出私钥 JWT 专用 helper 和类型：`signPrivateKeyJwtClientAssertion`、`createPrivateKeyJwtClientAssertionGetter`、`PrivateKeyJwtSigningAlgorithm` 和 `PRIVATE_KEY_JWT_SIGNING_ALGORITHMS`。

  令牌端点客户端身份验证参数由 `clientId`、`clientSecret` 和 `tokenEndpointAuth` 推导。已配置的令牌端点身份验证要求提供 `clientId`；基于密钥的令牌端点身份验证还要求提供 `clientSecret`。自定义令牌参数用于 provider 专属字段，不会替代已配置的客户端身份验证值。

  `refreshAccessToken()` 现在会将 `resource` 值转发到刷新令牌请求，因此 RFC 8707 资源指示符可通过高级刷新 helper 和 `refreshAccessTokenRequest()` 使用。

  同步 OAuth2 请求构造器 `createAuthorizationCodeRequest`、`createRefreshAccessTokenRequest` 和 `createClientCredentialsTokenRequest` 已移除。请改用异步的 `authorizationCodeRequest`、`refreshAccessTokenRequest` 和 `clientCredentialsTokenRequest` helper。

  服务器会验证使用非对称密钥签署的 JWT 客户端断言，客户端也可以在授权码、刷新和客户端凭据令牌请求中使用相同的令牌端点身份验证约定。

- [#9134](https://github.com/better-auth/better-auth/pull/9134) [`652fa53`](https://github.com/better-auth/better-auth/commit/652fa53e4912837fe234651e7c7705fb35abe188) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 动态 `baseURL` 配置现在会忽略 `x-forwarded-host` 和 `x-forwarded-proto`，除非设置了 `advanced.trustedProxyHeaders: true`。

  使用 `baseURL: { allowedHosts }` 的请求现在默认会根据 `Host` 解析 auth 源站，因此除非启用可信代理标头，否则转发标头无法选择其他允许的主机。

  **破坏性变更：**如果代理仅通过 `x-forwarded-host` 暴露公共主机名，请设置 `advanced.trustedProxyHeaders: true`。代理会将 `Host` 重写为公共主机名的部署（nginx 默认配置、Vercel、Cloudflare 和 Netlify）不受影响。

  **迁移：**

  ```ts
  betterAuth({
    baseURL: { allowedHosts: [...] },
    advanced: {
      trustedProxyHeaders: true,
    },
  });
  ```

- [#9240](https://github.com/better-auth/better-auth/pull/9240) [`729c00d`](https://github.com/better-auth/better-auth/commit/729c00d74c94f558893da1e3a9ee86451d1b23da) 感谢 [@adrianmxb](https://github.com/adrianmxb)！- feat(username)：添加不可变用户名选项

  这允许用户在注册或首次更新时设置用户名，但之后无法将其更改为其他值。用户仍然可以更新其他个人资料字段。

- [#10031](https://github.com/better-auth/better-auth/pull/10031) [`6fe9faa`](https://github.com/better-auth/better-auth/commit/6fe9faab65eb640dbe9bb762954a068586e8661c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 从 `better-auth/plugins` 中移除已弃用的 `oidcProvider` 插件。将 OIDC 授权服务器集成迁移到 `@better-auth/oauth-provider`。

- [#10473](https://github.com/better-auth/better-auth/pull/10473) [`ed61b47`](https://github.com/better-auth/better-auth/commit/ed61b4798e0ccedadc3b0c0e0a2d08b5d4b7ed5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加事务式 OIDC 用户解析，使应用能够将经过验证的发行者和主题配对关联到确切的现有用户，同时保留或更新本地个人资料。

- [#10234](https://github.com/better-auth/better-auth/pull/10234) [`973fdde`](https://github.com/better-auth/better-auth/commit/973fdde79d9746b15d5ac0427049e8a008a7705c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SIWE 插件现在会在钱包地址或 Chain ID 尚未确定时签发 nonce。`authClient.siwe.nonce()` 和 `authClient.siwe.getNonce()` 不再接受钱包字段，`getNonce` 必须返回 ERC-4361 nonce（8-250 个字母数字字符），SIWE 验证现在会从已签名的 ERC-4361 消息中读取钱包地址和 Chain ID。

- [#9864](https://github.com/better-auth/better-auth/pull/9864) [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 添加 `user.validateUserInfo` 用户配置准入钩子，使应用能够在创建用户或关联新账户之前拒绝某个身份。它会在所有会配置用户的方法的创建步骤中运行一次（OAuth、SSO/SAML、电子邮件/密码、魔法链接、电子邮件 OTP、匿名、SIWE、电话号码、管理员创建的用户和 SCIM），包括没有持久化数据库的无状态设置。

  当现有 OAuth 或 SSO 用户再次登录时（`source.action` 为 `"sign-in"`），该钩子也会重新运行，并接收最新的提供方电子邮件和个人资料，以便域名或组织策略能够拒绝其提供方身份已超出允许范围的用户。非提供方的回访登录不会重新验证。

  回调会接收映射后的 `user`，以及描述 `action`（`create-user`、`link-account` 或 `sign-in`）、`method` 和提供方元数据的 `source`：OAuth 提供方对应 `source.oauth`，OIDC/SAML SSO 提供方对应 `source.sso`。返回 `{ error, errorDescription }` 即可拒绝：浏览器流程会重定向到错误 URL，程序化流程则返回 `403`。

- [#10036](https://github.com/better-auth/better-auth/pull/10036) [`ad35ead`](https://github.com/better-auth/better-auth/commit/ad35eadd130162565a1b93c27f3a66910dca0b0e) 感谢 [@bytaesu](https://github.com/bytaesu)！- 要求 Google One Tap 服务器回调在验证 ID token 前解析出 Google client ID。使用 One Tap 插件时，请配置 `oneTap({ clientId })` 或 `socialProviders.google.clientId`。

- [#9057](https://github.com/better-auth/better-auth/pull/9057) [`544f1c6`](https://github.com/better-auth/better-auth/commit/544f1c63c9826831d96a126fbe568d8a8a8fde68) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(two-factor)!：添加仅 OTP 启用模式和判别式响应

  `enableTwoFactor` 现在接受一个 `method` 参数（`"otp" | "totp"`，默认为 `"totp"`），并返回带有 `method` 字段的判别式响应。

  ### `method: "otp"`
  - 立即设置 `twoFactorEnabled: true`。
  - 返回 `{ method: "otp" }`。
  - 要求在服务器上配置 `otpOptions.sendOTP`；否则会返回 `OTP_NOT_CONFIGURED`。

  ### `method: "totp"`（默认）
  - 返回 `{ method: "totp", totpURI, backupCodes }`。
  - 如果设置了 `totpOptions.disable`，则返回 `TOTP_NOT_CONFIGURED`。

  现有的 `skipVerificationOnEnable` 选项仍支持 TOTP 注册。

  ### 破坏性变更
  - **响应结构已变更**：`enableTwoFactor` 的响应中包含一个 `method` 字段（`"otp"` 或 `"totp"`）。

### 修补变更

- [#10014](https://github.com/better-auth/better-auth/pull/10014) [`73541c1`](https://github.com/better-auth/better-auth/commit/73541c119041113b1909fe244ff4b8210618b5b5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- Cloudflare Workers 应用现在可以在导入 Better Auth 子路径（如 `better-auth/db`）时启动。Beta 构建此前会在应用代码运行前于模块初始化期间崩溃。

- [#10299](https://github.com/better-auth/better-auth/pull/10299) [`cf8eaac`](https://github.com/better-auth/better-auth/commit/cf8eaac26e11bcdb7309d537f1730b2559963861) 感谢 [@momomuchu](https://github.com/momomuchu)！- 扩大 drizzle-kit 对等依赖的版本范围

- [#10501](https://github.com/better-auth/better-auth/pull/10501) [`65fc17c`](https://github.com/better-auth/better-auth/commit/65fc17c755c3e2c8c77d5b401d612737764c219d) 感谢 [@KingIronMan2011](https://github.com/KingIronMan2011)！- 将可选的 `drizzle-orm` 对等依赖范围扩展为 `^0.45.2 || >=1.0.0-rc.1 <2.0.0`，与 `@better-auth/drizzle-adapter` 保持一致，并允许安装 Drizzle ORM v1 RC 而不产生对等依赖警告。

- [#10622](https://github.com/better-auth/better-auth/pull/10622) [`ecd83da`](https://github.com/better-auth/better-auth/commit/ecd83daa01ec482d31667019737cb6697f03da0b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 当启用原生事务的单连接 SQLite 数据库使用 JWT 策略进行会话 Cookie 缓存时，注册不再发生死锁。JWKS 密钥查询和创建现在会解析事务作用域内的适配器，而不是始终查询根连接，因此在注册期间生成签名密钥时会加入外围事务，而不是与其争用唯一可用的连接。在多连接数据库（Postgres、MySQL）上，这也修复了一个静默的原子性缺口：事务期间创建的 JWKS 密钥可能会独立于创建它的事务提交。

- [#10293](https://github.com/better-auth/better-auth/pull/10293) [`fe4c820`](https://github.com/better-auth/better-auth/commit/fe4c8209479cc90a4c2e8692b2d84fde26926af2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `npx auth migrate` 现在可以向现有的 SQLite、PostgreSQL 和 MySQL 表添加带静态默认值的必需列，以及可空的唯一列。必需的唯一列仍需在应用唯一约束前手动回填不同的值。

- [#9898](https://github.com/better-auth/better-auth/pull/9898) [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2) 感谢 [@ItalyPaleAle](https://github.com/ItalyPaleAle)！- 为 Microsoft Entra ID 社交提供程序添加 `clientAssertion` 支持。

- [#9301](https://github.com/better-auth/better-auth/pull/9301) [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 `GenericOAuthConfig` 和 SSO `OIDCConfig` 中添加 `allowIdpInitiated`，以支持无需 `state` 参数即可发起 OAuth 的提供程序（例如 Clever）。启用后，无状态回调会在服务器端重新启动 OAuth 流程，并生成新的 state 和 PKCE，同时保留 CSRF 保护。此外，还增强了 `parseState`，使其能够处理 GET 回调中未定义的请求正文。

- [#10065](https://github.com/better-auth/better-auth/pull/10065) [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 携带凭据的 OAuth 和设备授权响应现在都会一致地发送 `Cache-Control: no-store` 和 `Pragma: no-cache`，确保代理、CDN 和浏览器不会缓存这些响应。这涵盖 token、introspection 和 userinfo 端点、动态和管理客户端注册、客户端密钥轮换，以及设备代码和设备 token 响应，包括这些端点返回的错误响应。

  端点通过 `metadata: { noStore: true }` 声明此设置；对于手动构建的响应，响应头集合会作为 `NO_STORE_HEADERS` 从 `@better-auth/core` 导出。

- [#10124](https://github.com/better-auth/better-auth/pull/10124) [`06daf70`](https://github.com/better-auth/better-auth/commit/06daf7011e548ef5a7d513c96e3a440331977a7d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在账户关联期间，如果 `overrideUserInfo` 返回 `null`，则保留已解析的 OAuth 用户。

- [#9304](https://github.com/better-auth/better-auth/pull/9304) [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 通过 OIDC Back-Channel Logout 1.0，将登出通知发送到所有已连接的应用，并立即切断 API 访问。

  当用户在 OP 端结束会话（登出、`/oauth2/end-session`、管理员撤销、封禁）时，`@better-auth/oauth-provider` 现在会通知所有持有该会话 token 的 Relying Party。用户的 API 访问会立即被切断，而不是让访问 token 一直可用到自身 TTL 到期。每个客户端都可以通过 DCR 或管理员客户端创建端点注册 `backchannel_logout_uri`（以及可选的 `backchannel_logout_session_required`）以启用此功能。提供程序会为每个客户端签署一个 `logout+jwt` Logout Token，并并行 POST 到相应客户端，同时为每个 RP 设置较短的超时时间。

  **破坏性变更。** 如果不透明或 JWT 访问 token 绑定的会话已结束，其 introspection 现在会返回 `{ active: false }`，而 `/oauth2/userinfo` 会以 `invalid_token` 拒绝该 token。此前，该 token 在自身 TTL 到期前仍会保持有效。如果你依赖访问 token 的有效期长于用户会话，这种行为将不再成立。

  不含 `offline_access` 的刷新 token 会在会话结束时撤销；含 `offline_access` 的刷新 token 会保留，以便长期 API 访问能够超出浏览器会话的生命周期（OIDC Back-Channel Logout 1.0 §2.7）。会话结束时使访问 token 失效，是超出 §2.7 要求的额外 OP 加固措施，通过会话存活状态强制执行，因此即使禁用了 JWT 插件，该措施仍然有效。

  如果配置了宿主的后台任务处理器（Vercel `waitUntil`、Cloudflare `ctx.waitUntil`），则通过该处理器执行通知；如果未配置处理器，则会在线完成，以免请求结束时丢失通知。在无服务器运行时上配置 `advanced.backgroundTasks.handler`，以确保登出操作快速完成。

  启用 JWT 插件时，`/.well-known/openid-configuration` 和 `/.well-known/oauth-authorization-server` 的发现信息会公布 `backchannel_logout_supported: true` 和 `backchannel_logout_session_supported: true`。每个已注册的 `backchannel_logout_uri` 都必须是无凭据、公开可访问的 HTTPS URL，且不能包含片段；公共客户端和机密客户端均不允许使用环回 HTTP。CIMD 文档不能注册后通道登出元数据。防止 SSRF 的主机防护措施会阻止私有、保留、隧道和云元数据主机，同时也适用于 `private_key_jwt` 客户端的 `jwks_uri`。

  `@better-auth/oauth-provider` 的架构变更：
  - `oauthClient.backchannelLogoutUri: string | null`
  - `oauthClient.backchannelLogoutSessionRequired: boolean`
  - `oauthAccessToken.revoked: Date | null`

  `better-auth` 的 `signJWT` 新增了可选的 `header` 参数，并会将其转发给自定义远程签名器。需要显式媒体类型的 JWT 配置（例如 `typ: "logout+jwt"`）现在可以直接设置，而无需调用底层签名原语。

- [#10125](https://github.com/better-auth/better-auth/pull/10125) [`a83152e`](https://github.com/better-auth/better-auth/commit/a83152e2e884b1ac1724f95cea2056795d60e5cc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在用户创建事务中创建新的 OAuth 账户。具有原生事务支持的适配器会在账户写入失败时回滚用户创建；其他适配器仍会按顺序执行写入。

- [#10128](https://github.com/better-auth/better-auth/pull/10128) [`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在登录重新认证和刷新 token 请求期间保留先前授予的 OAuth 作用域。`account.scope` 现在只会单调累积：仅当通过 `linkSocial` 新授予作用域时才会合并进去；如果提供程序返回的作用域声明比用户已获授的作用域更窄，也不会再缩减存储值。

- [#10170](https://github.com/better-auth/better-auth/pull/10170) [`6ddb555`](https://github.com/better-auth/better-auth/commit/6ddb5554c01da4df6c637013dac7ea4ec8a43b52) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 已将捆绑依赖更新至最新兼容版本，包括 jose、nanostores、noble 加密包和 SimpleWebAuthn。这些更新向后兼容，现有项目无需修改。

- [#10390](https://github.com/better-auth/better-auth/pull/10390) [`0de88f5`](https://github.com/better-auth/better-auth/commit/0de88f5e61d96f460e02b8a526e58acb16455d15) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SCIM 连接现在可以将用户、组和直接成员关系配置到应用自定义的配置域中，无需组织或 SSO 插件。应用可以通过投影将组成员关系映射到经过验证的自定义角色。此服务还支持 SCIM 2.0 发现、筛选、分页、响应属性选择、原子 PATCH 操作，以及 Microsoft Entra ID 和 Okta 常用的请求模式。

  此变更替换了先前的 SCIM 配置、客户端 API、数据库架构和基于组织的组模型。现有 SCIM 安装无法原地迁移配置状态。恢复流量前，请按照 1.7 升级指南中的 SCIM 切换步骤操作，包括重新配置整个目录。

  延迟执行的数据库副作用现在只会在事务成功后运行。已回滚的用户更新不再刷新其缓存配置文件；已回滚的批量会话撤销也不再使会话失效。

- [#10505](https://github.com/better-auth/better-auth/pull/10505) [`d701f90`](https://github.com/better-auth/better-auth/commit/d701f90e6f81ede26209a50a5100bd9914a7ad5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- One Tap、Electron 和 Expo 客户端插件现在可以与 `createAuthClient` 组合使用，且不会产生 TypeScript 错误；生成的客户端也会保留各个插件推断出的操作。

- [#10621](https://github.com/better-auth/better-auth/pull/10621) [`59c4c83`](https://github.com/better-auth/better-auth/commit/59c4c832fc4eed813e98b5b2c45a91cf2d4ad9e7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许测试实例为 postgres 和 mysql 启用原生数据库事务。

- 更新的依赖项 [[`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71), [`763a267`](https://github.com/better-auth/better-auth/commit/763a2671c5372d88c291881977c8a1c2e29034b1), [`5d38b13`](https://github.com/better-auth/better-auth/commit/5d38b138c3c73eb06fe247ef6631c66e86ccc92b), [`692b22c`](https://github.com/better-auth/better-auth/commit/692b22c517011444f812fe21c206e399e35e8417), [`ea06c5a`](https://github.com/better-auth/better-auth/commit/ea06c5a71f448dfc600f1c2f7b0de732730c79cd), [`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3), [`430c895`](https://github.com/better-auth/better-auth/commit/430c89549060ef6bd477ed2510650b9e49bba560), [`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0), [`dbd302e`](https://github.com/better-auth/better-auth/commit/dbd302e422c66620cde391f6a80ab90ee34182f9), [`8784c1c`](https://github.com/better-auth/better-auth/commit/8784c1c1f4301acf96d980e5bf81ff56435e2545), [`ecd83da`](https://github.com/better-auth/better-auth/commit/ecd83daa01ec482d31667019737cb6697f03da0b), [`e4818b5`](https://github.com/better-auth/better-auth/commit/e4818b545984dce99e3c798ead5691c5bf775a70), [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2), [`0683a5f`](https://github.com/better-auth/better-auth/commit/0683a5f36befb45ade3866c7f8057791eadeee59), [`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8), [`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d), [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2), [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9), [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b), [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734), [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a), [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656), [`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0), [`ed61b47`](https://github.com/better-auth/better-auth/commit/ed61b4798e0ccedadc3b0c0e0a2d08b5d4b7ed5a), [`0de88f5`](https://github.com/better-auth/better-auth/commit/0de88f5e61d96f460e02b8a526e58acb16455d15), [`3a79aff`](https://github.com/better-auth/better-auth/commit/3a79aff58ed82e45caf04c2ee4acaf0f4d09a86c), [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f), [`d701f90`](https://github.com/better-auth/better-auth/commit/d701f90e6f81ede26209a50a5100bd9914a7ad5a)]：
  - @better-auth/core@1.7.0
  - @better-auth/drizzle-adapter@1.7.0
  - @better-auth/mongo-adapter@1.7.0
  - @better-auth/kysely-adapter@1.7.0
  - @better-auth/memory-adapter@1.7.0
  - @better-auth/prisma-adapter@1.7.0
  - @better-auth/telemetry@1.7.0

## 1.7.0-rc.6

### 补丁变更

- [#10769](https://github.com/better-auth/better-auth/pull/10769) [`773de54`](https://github.com/better-auth/better-auth/commit/773de54b18c0e920a3542bdecaf8b42fffc0dc4b) 感谢 [@bytaesu](https://github.com/bytaesu)！- 防止瞬时重新挂载期间出现重复的会话请求，同时确保对不完整的刷新进行重新验证。

- [#10794](https://github.com/better-auth/better-auth/pull/10794) [`2ad2928`](https://github.com/better-auth/better-auth/commit/2ad2928f967afa9f9858caecd01466ecb8686982) 感谢 [@bytaesu](https://github.com/bytaesu)！- 恢复客户端插件声明与下游 TypeScript 使用者的兼容性。

- 更新的依赖项 [[`692b22c`](https://github.com/better-auth/better-auth/commit/692b22c517011444f812fe21c206e399e35e8417)]：
  - @better-auth/drizzle-adapter@1.7.0-rc.6
  - @better-auth/core@1.7.0-rc.6
  - @better-auth/kysely-adapter@1.7.0-rc.6
  - @better-auth/memory-adapter@1.7.0-rc.6
  - @better-auth/mongo-adapter@1.7.0-rc.6
  - @better-auth/prisma-adapter@1.7.0-rc.6
  - @better-auth/telemetry@1.7.0-rc.6

## 1.7.0-rc.5

### 次要变更

- [#10746](https://github.com/better-auth/better-auth/pull/10746) [`6782647`](https://github.com/better-auth/better-auth/commit/6782647d7c2d248246f9ef3980e656725c29ce64) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth 设备授权现在与 `oauthProvider()` 或 `mcp()` 配合使用 `oauthDeviceAuthorization()`。这一集成同时替代了独立的 `deviceCodeGrant()` 插件和共享授权配置。独立设备授权不再接受或存储 RFC 8707 资源，`onDeviceAuthRequest` 也只会接收 `clientId` 和 `scope`。OAuth 集成会拒绝非绝对 URI 或包含片段的资源指示符。

  OAuth 集成用 `oauthClientId` 和 `resources` 替代可选的 `resource` 列。使用该集成时，请重新生成并应用架构。从早期 1.7 预发布版本升级前，请等待待处理的 OAuth 设备代码过期或将其删除，因为这些代码无法通过新集成兑换。

- [#10330](https://github.com/better-auth/better-auth/pull/10330) [`081d3c3`](https://github.com/better-auth/better-auth/commit/081d3c379c720926295067d878c421b5e8684c78) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 在服务端和客户端插件上设置 `displayUsername: false`，即可省略 username 插件单独的 `displayUsername` 字段。

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-rc.5
  - @better-auth/drizzle-adapter@1.7.0-rc.5
  - @better-auth/kysely-adapter@1.7.0-rc.5
  - @better-auth/memory-adapter@1.7.0-rc.5
  - @better-auth/mongo-adapter@1.7.0-rc.5
  - @better-auth/prisma-adapter@1.7.0-rc.5
  - @better-auth/telemetry@1.7.0-rc.5

## 1.7.0-rc.4

### 补丁变更

- [#10676](https://github.com/better-auth/better-auth/pull/10676) [`90b5093`](https://github.com/better-auth/better-auth/commit/90b509344794b8064700371cbc04b985d0519839) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当 React 重试一个已挂起的组件时，对正在进行的会话请求进行去重

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-rc.4
  - @better-auth/drizzle-adapter@1.7.0-rc.4
  - @better-auth/kysely-adapter@1.7.0-rc.4
  - @better-auth/memory-adapter@1.7.0-rc.4
  - @better-auth/mongo-adapter@1.7.0-rc.4
  - @better-auth/prisma-adapter@1.7.0-rc.4
  - @better-auth/telemetry@1.7.0-rc.4

## 1.7.0-rc.3

### 次要变更

- [#10059](https://github.com/better-auth/better-auth/pull/10059) [`49b5cf6`](https://github.com/better-auth/better-auth/commit/49b5cf650e1264ecc4c917ca193ea05c3b58a3b9) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 设备授权现在会为设备和用户代码查找创建数据库索引。超过 191 个字符的代码将被拒绝。现有 MySQL 和 SQL Server 安装必须将这些列转换为有长度限制的字符串，并在运行迁移前处理超长值

- [#9368](https://github.com/better-auth/better-auth/pull/9368) [`430c895`](https://github.com/better-auth/better-auth/commit/430c89549060ef6bd477ed2510650b9e49bba560) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- Generic OAuth 用户现在可以在调用 `authClient.signOut()` 时从配置的 OpenID 提供商登出。当提供商公开了发现或配置的登出端点时，Better Auth 会重定向到该端点，并在可用时包含存储的 `id_token_hint`。为返回流程传入 `callbackURL` 或配置 `postLogoutRedirectURI`，可选提供 `state`；也可以设置 `disableRedirect`，自行处理返回的 `url`。当多个关联提供商支持登出时，Better Auth 会选择最近更新的账户。设置 `disableProviderLogout: true` 可保持仅本地登出

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 遇到权限范围阻碍的 MCP 客户端现在可以准确了解需要申请哪些权限范围。缺少受保护权限范围时，会返回带有 RFC 6750 `insufficient_scope` `WWW-Authenticate` challenge 的 `403` 响应，其中列出所有缺少的权限范围。客户端可以将这些权限范围合并到一个授权请求中，而不必针对每个权限范围分别打开浏览器重定向
  - 通过 `RequireMcpAuthOptions` 或对应的 `createMcpProtectedRequestHandler` 验证器选项中的 `requiredScopes` 配置受保护的权限范围。默认仍采用精确匹配；`isScopeSatisfied` 可定义层级策略
  - 当某项操作动态确定所需权限范围时，使用 `createInsufficientScopeError`。`createResourceServerChallenge` 会将该信号和已识别的令牌错误转换为安全的 RFC 6750 challenge
  - 仅在未认证的 challenge 提示中使用 `challengeScopes`

  由处理程序生成的响应、普通权限拒绝、配置失败以及无关的抛出值均保留其原始状态和身份

- [#10204](https://github.com/better-auth/better-auth/pull/10204) [`0683a5f`](https://github.com/better-auth/better-auth/commit/0683a5f36befb45ade3866c7f8057791eadeee59) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- Microsoft 登录现在在内置 `microsoft` 提供商和 Generic OAuth `microsoftEntraId` 助手中，均使用稳定的 `oid` 声明识别 Entra 账户。没有有效 `oid` 的令牌会被拒绝；Generic OAuth 助手也会在 Microsoft 发现信息未提供 ID 令牌验证元数据时拒绝初始化。升级前，必须迁移由 `sub` 创建的现有 Microsoft 账户记录

- [#10135](https://github.com/better-auth/better-auth/pull/10135) [`f68044d`](https://github.com/better-auth/better-auth/commit/f68044dcfbd9fb83763249ed9509cfacbcce47be) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！- 已注册的 OAuth 客户端现在可以使用 RFC 8628 设备流程获取由提供商管理的 OAuth 令牌。将 `deviceCodeGrant()` 与 `deviceAuthorization()` 和 `oauthProvider()` 一同添加；客户端在 `/device/code` 请求代码，并在用户批准后于 `/oauth2/token` 进行交换。OAuth 和 OpenID 发现信息现在会公布 `device_authorization_endpoint`

  设备授权请求可以绑定 RFC 8707 资源指示符。现在，`GET /device` 会向拥有该请求的已认证用户返回请求方的 `client_id`、`scope` 和 `resource` 值；`onDeviceAuthRequest` 会将 resource 作为第三个参数接收。令牌请求可以重用或缩小已批准的资源集合，但添加资源的请求会被拒绝。现有第一方设备客户端仍会从 `/device/token` 获取 Better Auth 会话令牌

  `deviceCode` 表新增了可选的 `resource` 字段。在部署此更新前，运行 `npx @better-auth/cli generate` 并应用迁移

### 补丁变更

- [#10622](https://github.com/better-auth/better-auth/pull/10622) [`ecd83da`](https://github.com/better-auth/better-auth/commit/ecd83daa01ec482d31667019737cb6697f03da0b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 当单连接 SQLite 数据库启用了原生事务，且会话 Cookie 缓存使用 JWT 策略时，注册不再发生死锁。JWKS 密钥查找和创建现在会使用事务范围的适配器，而不是始终查询根连接，因此注册期间生成签名密钥时会加入外围事务，而不再与其争用唯一可用连接。在多连接数据库（Postgres、MySQL）上，这也修复了一个静默的原子性缺口：在事务期间创建的 JWKS 密钥可能独立于创建它的事务提交

- [#10505](https://github.com/better-auth/better-auth/pull/10505) [`d701f90`](https://github.com/better-auth/better-auth/commit/d701f90e6f81ede26209a50a5100bd9914a7ad5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- One Tap、Electron 和 Expo 客户端插件现在可以与 `createAuthClient` 组合使用，不会产生 TypeScript 错误，且生成的客户端会保留每个插件推断出的操作

- [#10621](https://github.com/better-auth/better-auth/pull/10621) [`59c4c83`](https://github.com/better-auth/better-auth/commit/59c4c832fc4eed813e98b5b2c45a91cf2d4ad9e7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许测试实例为 postgres 和 mysql 启用原生数据库事务

- 已更新依赖项 [[`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71), [`430c895`](https://github.com/better-auth/better-auth/commit/430c89549060ef6bd477ed2510650b9e49bba560), [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71), [`ecd83da`](https://github.com/better-auth/better-auth/commit/ecd83daa01ec482d31667019737cb6697f03da0b), [`0683a5f`](https://github.com/better-auth/better-auth/commit/0683a5f36befb45ade3866c7f8057791eadeee59), [`d701f90`](https://github.com/better-auth/better-auth/commit/d701f90e6f81ede26209a50a5100bd9914a7ad5a)]：
  - @better-auth/core@1.7.0-rc.3
  - @better-auth/kysely-adapter@1.7.0-rc.3
  - @better-auth/drizzle-adapter@1.7.0-rc.3
  - @better-auth/memory-adapter@1.7.0-rc.3
  - @better-auth/mongo-adapter@1.7.0-rc.3
  - @better-auth/prisma-adapter@1.7.0-rc.3
  - @better-auth/telemetry@1.7.0-rc.3

## 1.7.0-rc.2

### 次要变更

- [#10402](https://github.com/better-auth/better-auth/pull/10402) [`763a267`](https://github.com/better-auth/better-auth/commit/763a2671c5372d88c291881977c8a1c2e29034b1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 插件数据库架构现在可以在多个字段上定义命名或自动生成的表级索引。SQL 迁移以及生成的 Drizzle 或 Prisma 架构会以一致方式解析配置的表名和列名，而 MongoDB 适配器会在首次强制执行索引的写入操作前创建相同的索引

- [#10403](https://github.com/better-auth/better-auth/pull/10403) [`dbd302e`](https://github.com/better-auth/better-auth/commit/dbd302e422c66620cde391f6a80ab90ee34182f9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 账户身份现在按可信发行者而非提供商配置进行区分。账户现在使用唯一键 `(issuer, providerAccountId)`，因此同一 OpenID Connect 发行者的别名会对同一外部身份去重，而不同发行者的相同主体仍会分别保留。这种身份去重不会为别名引入独立的授权或提供商生命周期记录

  此版本包含破坏性变更。`Account.accountId` 已重命名为 `Account.providerAccountId`，且 `Account.issuer` 现为必填项。账户专用 API 通过 `accountId` 选择本地 `Account.id`；令牌和提供商资料 API 则可以改用 `useAccountCookie: true` 选择已签名的账户 Cookie。凭据账户使用 `local:credential`，并将关联用户的稳定 `id` 作为其提供商身份

  OAuth 提供商身份现在来自原始的已验证资料。OpenID Connect 发现使用 `sub`，普通 OAuth 使用 `id`，提供商可以通过 `accountSubject` 声明其他不可变字段；Better Auth 不再在运行时于 `sub` 和 `id` 之间切换。`getUserInfo().user` 不再携带提供商身份，`mapProfileToUser` 也不能返回 `id`。请从 `accountInfo.account.providerAccountId` 而非 `accountInfo.user.id` 读取选定身份。通用 `microsoftEntraId` 助手现在要求提供具体的租户 GUID；对于多租户授权机构，请使用内置 Microsoft 提供商

  SSO 账户主体现在由协议定义。OIDC 使用已验证的 `sub` 声明，SAML 使用已签名的 `NameID`；两种配置中的 `mapping.id` 均已移除。没有元数据 XML 的手动 SAML 配置必须设置 `idpMetadata.entityID`，因为 `samlConfig.issuer` 标识的是服务提供商，不再作为 IdP 身份

  部署前，请按照 Better Auth 1.7 升级指南应用经审查的账户身份回填。生成的架构迁移无法自动分配可信发行者或解决现有身份冲突

- [#10359](https://github.com/better-auth/better-auth/pull/10359) [`8784c1c`](https://github.com/better-auth/better-auth/commit/8784c1c1f4301acf96d980e5bf81ff56435e2545) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 数据库联接已从 `experimental` 移至稳定选项 `advanced.database.joins`（默认值：`false`）

  如果你之前设置了 `experimental: { joins: true }`，请将配置更新为：

  ```ts
  advanced: {
    database: {
      joins: true,
    },
  }
  ```

  启用后，支持原生联接的适配器会使用原生联接。如果适配器无法为某个查询返回联接数据，Better Auth 会改用额外查询并合并结果。Drizzle 和 Prisma 用户应确保其架构包含所需关系（`npx auth@latest generate`）

- [#10397](https://github.com/better-auth/better-auth/pull/10397) [`bb6c102`](https://github.com/better-auth/better-auth/commit/bb6c1021e8f6200e60ff852cbd95fb6841a0ec4b) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 新增 `organization.getOrganization()`，用于获取不包含成员或邀请的组织元数据

- [#10473](https://github.com/better-auth/better-auth/pull/10473) [`ed61b47`](https://github.com/better-auth/better-auth/commit/ed61b4798e0ccedadc3b0c0e0a2d08b5d4b7ed5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 新增事务式 OIDC 用户解析，使应用能够将已验证的发行者和主体配对关联到确切的现有用户，同时保留或更新本地资料

- [#10234](https://github.com/better-auth/better-auth/pull/10234) [`973fdde`](https://github.com/better-auth/better-auth/commit/973fdde79d9746b15d5ac0427049e8a008a7705c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SIWE 插件现在会在尚未知晓钱包地址或 Chain ID 时签发随机数。`authClient.siwe.nonce()` 和 `authClient.siwe.getNonce()` 不再接受钱包字段，`getNonce` 必须返回 ERC-4361 随机数（8-250 个字母数字字符），SIWE 验证现在会从已签名的 ERC-4361 消息中读取钱包地址和 Chain ID

### 补丁变更

- [#10299](https://github.com/better-auth/better-auth/pull/10299) [`cf8eaac`](https://github.com/better-auth/better-auth/commit/cf8eaac26e11bcdb7309d537f1730b2559963861) 感谢 [@momomuchu](https://github.com/momomuchu)！- 扩大 drizzle-kit 对等依赖的版本范围

- [#10390](https://github.com/better-auth/better-auth/pull/10390) [`0de88f5`](https://github.com/better-auth/better-auth/commit/0de88f5e61d96f460e02b8a526e58acb16455d15) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SCIM 连接现在可以在无需组织或 SSO 插件的情况下，将 Users、Groups 和直接成员关系配置到应用自定义的配置域中。应用可以通过投影，将 Group 成员关系映射到经过验证的自定义角色。该服务还支持 SCIM 2.0 发现、筛选、分页、响应属性选择、原子 PATCH 操作，以及 Microsoft Entra ID 和 Okta 使用的常见请求模式

  这取代了之前的 SCIM 配置、客户端 API、数据库架构和基于组织的 Group 模型。现有 SCIM 安装无法原地迁移配置状态。恢复流量前，请按照 1.7 升级指南中的 SCIM 切换流程操作，包括完整的目录重新配置

  延迟执行的数据库副作用现在只会在事务成功后运行。已回滚的 User 更新不再刷新其缓存资料，已回滚的批量会话撤销也不再使会话失效

- 已更新依赖项 [[`763a267`](https://github.com/better-auth/better-auth/commit/763a2671c5372d88c291881977c8a1c2e29034b1), [`5d38b13`](https://github.com/better-auth/better-auth/commit/5d38b138c3c73eb06fe247ef6631c66e86ccc92b), [`dbd302e`](https://github.com/better-auth/better-auth/commit/dbd302e422c66620cde391f6a80ab90ee34182f9), [`8784c1c`](https://github.com/better-auth/better-auth/commit/8784c1c1f4301acf96d980e5bf81ff56435e2545), [`e4818b5`](https://github.com/better-auth/better-auth/commit/e4818b545984dce99e3c798ead5691c5bf775a70), [`ed61b47`](https://github.com/better-auth/better-auth/commit/ed61b4798e0ccedadc3b0c0e0a2d08b5d4b7ed5a), [`0de88f5`](https://github.com/better-auth/better-auth/commit/0de88f5e61d96f460e02b8a526e58acb16455d15)]：
  - @better-auth/core@1.7.0-rc.2
  - @better-auth/drizzle-adapter@1.7.0-rc.2
  - @better-auth/mongo-adapter@1.7.0-rc.2
  - @better-auth/kysely-adapter@1.7.0-rc.2
  - @better-auth/memory-adapter@1.7.0-rc.2
  - @better-auth/prisma-adapter@1.7.0-rc.2
  - @better-auth/telemetry@1.7.0-rc.2

## 1.7.0-rc.1

### 补丁变更

- [#10293](https://github.com/better-auth/better-auth/pull/10293) [`fe4c820`](https://github.com/better-auth/better-auth/commit/fe4c8209479cc90a4c2e8692b2d84fde26926af2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `npx auth migrate` 在向现有表添加列时不再中止。带默认值的必填列或唯一列现在可以在 SQLite 以及已有数据的 Postgres 和 MySQL 数据库上迁移。升级已有组织团队的数据库时，之前会在新增 `team.memberCount` 和 `teamMember.membershipKey` 列时失败

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-rc.1
  - @better-auth/drizzle-adapter@1.7.0-rc.1
  - @better-auth/kysely-adapter@1.7.0-rc.1
  - @better-auth/memory-adapter@1.7.0-rc.1
  - @better-auth/mongo-adapter@1.7.0-rc.1
  - @better-auth/prisma-adapter@1.7.0-rc.1
  - @better-auth/telemetry@1.7.0-rc.1

## 1.7.0-rc.0

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-rc.0
  - @better-auth/drizzle-adapter@1.7.0-rc.0
  - @better-auth/kysely-adapter@1.7.0-rc.0
  - @better-auth/memory-adapter@1.7.0-rc.0
  - @better-auth/mongo-adapter@1.7.0-rc.0
  - @better-auth/prisma-adapter@1.7.0-rc.0
  - @better-auth/telemetry@1.7.0-rc.0

## 1.7.0-beta.10

### 补丁变更

- [#10170](https://github.com/better-auth/better-auth/pull/10170) [`6ddb555`](https://github.com/better-auth/better-auth/commit/6ddb5554c01da4df6c637013dac7ea4ec8a43b52) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 已将打包的依赖更新至最新的兼容版本，包括 jose、nanostores、noble 加密包和 SimpleWebAuthn。这些更新向后兼容，无需修改现有项目。

- 已更新依赖项 [[`ea06c5a`](https://github.com/better-auth/better-auth/commit/ea06c5a71f448dfc600f1c2f7b0de732730c79cd)]：
  - @better-auth/drizzle-adapter@1.7.0-beta.10
  - @better-auth/core@1.7.0-beta.10
  - @better-auth/kysely-adapter@1.7.0-beta.10
  - @better-auth/memory-adapter@1.7.0-beta.10
  - @better-auth/mongo-adapter@1.7.0-beta.10
  - @better-auth/prisma-adapter@1.7.0-beta.10
  - @better-auth/telemetry@1.7.0-beta.10

## 1.7.0-beta.9

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-beta.9
  - @better-auth/drizzle-adapter@1.7.0-beta.9
  - @better-auth/kysely-adapter@1.7.0-beta.9
  - @better-auth/memory-adapter@1.7.0-beta.9
  - @better-auth/mongo-adapter@1.7.0-beta.9
  - @better-auth/prisma-adapter@1.7.0-beta.9
  - @better-auth/telemetry@1.7.0-beta.9

## 1.7.0-beta.8

### 次要变更

- [#10127](https://github.com/better-auth/better-auth/pull/10127) [`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 配置了 `baseURL.allowedHosts` 时，OAuth 登录、账户关联、回调和代理流程现在会根据当前请求的基础 URL 构建 `redirect_uri`。内置社交提供商和通用 OAuth 提供商现在会在多主机部署中使用解析后的请求主机进行重定向。

  使用共享 `/callback/<provider-id>` 路由时，自定义 `OAuthProvider` 实现可以省略 `callbackPath`。仅在使用自定义回调路由时才设置 `callbackPath`。

### 补丁变更

- [#10124](https://github.com/better-auth/better-auth/pull/10124) [`06daf70`](https://github.com/better-auth/better-auth/commit/06daf7011e548ef5a7d513c96e3a440331977a7d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 在账户关联期间，如果 `overrideUserInfo` 返回 `null`，则保留已解析的 OAuth 用户。

- [#10125](https://github.com/better-auth/better-auth/pull/10125) [`a83152e`](https://github.com/better-auth/better-auth/commit/a83152e2e884b1ac1724f95cea2056795d60e5cc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 在用户创建事务中创建新的 OAuth 账户，这样账户写入失败时就会回滚用户行。

- [#10128](https://github.com/better-auth/better-auth/pull/10128) [`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 在登录重新认证和刷新令牌请求期间保留之前授予的 OAuth 作用域。`account.scope` 现在只会单调累积：仅当通过 `linkSocial` 添加新授权的作用域时才会合并；如果提供商返回的作用域声明比用户已获授权的作用域更窄，则不会再缩减存储值。

- 已更新依赖项 [[`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d), [`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0), [`3a79aff`](https://github.com/better-auth/better-auth/commit/3a79aff58ed82e45caf04c2ee4acaf0f4d09a86c)]：
  - @better-auth/core@1.7.0-beta.8
  - @better-auth/drizzle-adapter@1.7.0-beta.8
  - @better-auth/kysely-adapter@1.7.0-beta.8
  - @better-auth/memory-adapter@1.7.0-beta.8
  - @better-auth/mongo-adapter@1.7.0-beta.8
  - @better-auth/prisma-adapter@1.7.0-beta.8
  - @better-auth/telemetry@1.7.0-beta.8

## 1.7.0-beta.7

### 次要变更

- [#9948](https://github.com/better-auth/better-auth/pull/9948) [`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3) 感谢 [@yordis](https://github.com/yordis)！ - feat(generic-oauth)：添加 `refreshTokenParams` 配置，以便在刷新令牌时转发额外参数

  多租户 OIDC 提供商（Zitadel 多组织、带有 `audience` 的 Auth0）需要在刷新请求中发送额外的请求体参数，以便在不进行完整授权重定向的情况下重新确定令牌的作用域。通用 oauth 插件现在接受 `refreshTokenParams` 选项（对象或同步/异步函数），并将其合并到刷新请求体中，同时禁止覆盖 `grant_type` 和 `refresh_token`。函数形式会接收触发刷新的请求的元数据，因此可以使用请求范围内的数据（请求头、Cookie），而无需依赖 AsyncLocalStorage 之类的外部状态。

  `UpstreamProvider.refreshAccessToken` 现在接受可选的第二个 `ctx` 参数；此更改向后兼容，因为现有仅接受 `refreshToken` 的实现仍然有效。参见 [#7554](https://github.com/better-auth/better-auth/issues/7554)。

### 补丁变更

- 已更新依赖项 [[`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3), [`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0)]：
  - @better-auth/core@1.7.0-beta.7
  - @better-auth/drizzle-adapter@1.7.0-beta.7
  - @better-auth/kysely-adapter@1.7.0-beta.7
  - @better-auth/memory-adapter@1.7.0-beta.7
  - @better-auth/mongo-adapter@1.7.0-beta.7
  - @better-auth/prisma-adapter@1.7.0-beta.7
  - @better-auth/telemetry@1.7.0-beta.7

## 1.7.0-beta.6

### 次要变更

- [#10004](https://github.com/better-auth/better-auth/pull/10004) [`b36c38f`](https://github.com/better-auth/better-auth/commit/b36c38f9842d3416689340552989449a32007819) 感谢 [@bytaesu](https://github.com/bytaesu)！ - captcha 插件现在要求端点条目匹配完整的 auth 路径，除非使用通配符模式。这可以防止 `/sign-in//email` 之类的请求绕过 captcha，同时保留 `/sign-in/email/` 这类尾部斜杠匹配。若要保护多个路由，请将 `/sign-in` 之类的部分路径替换为 `/sign-in/*` 或 `/sign-in/**` 之类的显式通配符。

- [#9766](https://github.com/better-auth/better-auth/pull/9766) [`bf39cbf`](https://github.com/better-auth/better-auth/commit/bf39cbf13f3b934f728cde72b1e7ebdc4c85f641) 感谢 [@GautamBytes](https://github.com/GautamBytes)！ - 添加仅限服务器端使用的 `auth.api.consumePhoneNumberOTP` API，适用于需要验证并消费验证码，但不创建或更新用户或会话的自定义手机号 OTP 流程。

- [#9992](https://github.com/better-auth/better-auth/pull/9992) [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - MCP 插件从 `better-auth` 移至独立包 `@better-auth/mcp`，并基于 `@better-auth/oauth-provider` 构建。从 `@better-auth/mcp` 导入服务器插件及其辅助工具，并从 `@better-auth/mcp/client` 和 `@better-auth/mcp/client/adapters` 导入远程客户端和适配器（此前分别从 `better-auth/plugins` 和 `better-auth/plugins/mcp/client` 导入）。OAuth 端点从 `/mcp/*` 迁移至 `/oauth2/*`，发现端点位于 `/.well-known/oauth-authorization-server`，受保护资源元数据位于 `/.well-known/oauth-protected-resource`。基于发现机制的 MCP 客户端会自动获取新位置。

  路由辅助函数更名为 `requireMcpAuth`（原为 `withMcpAuth`），远程客户端更名为 `createMcpResourceClient`（原为 `createMcpAuthClient`）。`requireMcpAuth` 会根据已发布的 JWKS 验证 bearer token，并将已验证的 JWT 声明传递给处理程序。

  若要迁移，请安装 `@better-auth/mcp`，添加 `jwt()` 插件（现在签署令牌时必需），并将原先嵌套在 `oidcConfig` 下的选项移至 `mcp({ ... })` 的顶层。数据库模型也有变更：`oauthApplication` 更名为 `oauthClient`，并新增 `oauthRefreshToken` 和 `oauthClientAssertion` 表。使用 `npx auth migrate` 或 `npx auth generate` 重新生成或迁移架构。

- [#10039](https://github.com/better-auth/better-auth/pull/10039) [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - feat(oauth-provider)!：DPoP 绑定访问令牌（RFC 9449）

  OAuth 提供商集成现在可以签发和验证 DPoP 发送方约束令牌。客户端可在注册时通过 `dpop_bound_access_tokens`、在授权请求中通过 `dpop_jkt`，或通过指定启用了 `dpopBoundAccessTokensRequired` 的资源来请求此类令牌。签发的令牌包含 `cnf.jkt`，返回 `token_type: "DPoP"`，并在刷新令牌轮换、内省和 userinfo 过程中保持绑定。

  资源服务器可使用 `verifyAccessTokenRequest` 验证 DPoP 请求，该函数会检查 `Authorization: DPoP` 方案、证明、请求目标、访问令牌哈希和证明重放。MCP 包会在受保护资源元数据中声明支持 DPoP，并验证绑定了 DPoP 的请求。证明重放会通过数据库支持的验证存储予以拒绝，因此跨实例也能实现防重放。`verifyAccessTokenRequest` 和 `requireMcpAuth` 默认使用该存储；可通过 `createDpopReplayStore(internalAdapter)` 创建，也可传入自定义的 `dpop.replayStore`。此功能需要数据库支持的验证存储：仅使用二级存储的部署会拒绝 DPoP 请求，而不是跳过重放保护。

  破坏性变更：原始令牌验证器 `verifyAccessToken` 在 `better-auth/oauth2` 和 `oauthProviderResourceClient` 操作中均更名为 `verifyBearerToken`，并且会拒绝绑定了 DPoP 的令牌。对于任何可能接收此类令牌的端点，请使用 `verifyAccessTokenRequest`。资源请求输入类型从 `AccessTokenRequestInput` 更名为 `ResourceRequestInput`，DPoP 算法选项在所有位置均为 `signingAlgorithms`。

  请运行架构迁移以添加 DPoP 令牌绑定字段：访问令牌表和刷新令牌表中的 `confirmation` 列。绑定了 DPoP 的客户端还会增加 `dpopBoundAccessTokens`，资源则会增加 `dpopBoundAccessTokensRequired`。不会新增专用的重放表；证明重放会复用验证存储。

- [#9648](https://github.com/better-auth/better-auth/pull/9648) [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！ - OAuth 提供商现在会显式建模受保护资源。可通过 `resources` 配置它们，或使用 `oauthResource` 管理 API 创建它们。每个资源都可以定义令牌 TTL、允许的作用域、自定义 JWT 声明和 JWT 签名固定项。

  `validAudiences` 已移除。将每个现有资源标识符移至 `resources`；通过 `oauthClientResource` 或动态客户端注册 `resources`，将客户端关联到应限制其访问的特定资源。

  访问令牌签发现在会对请求中的 RFC 8707 `resource` 值应用资源策略。OAuth 提供商会将作用域缩小至资源允许列表，使用最短的已配置 TTL，从自定义声明中移除保留的 RFC 9068 声明名称，生成 `jti`，并保留重复的 `resource` 表单参数。

  刷新令牌 TTL 现在采用最短的适用生命周期。若部署中某资源的 `refreshTokenTtl` 长于 `refreshTokenExpiresIn`，则刷新令牌会在提供商默认的时间到期，而不会采用该资源较长的值。

  JWT 签名现在可以遵循每个资源的固定项。`signJWT()` 接受 `signingKeyId` 和 `signingAlgorithm`；JWKS 适配器公开 `getKeyById()` 和 `getLatestKeyByAlg()`。`jwks` 表新增可空的 `alg` 和 `crv` 列，`keyPairConfigs` 可在一个密钥环中配置多个算法。

  升级后，请运行 `npx @better-auth/cli generate` 并在部署前应用迁移。迁移会新增 `oauthResource`、`oauthClientResource` 和新的 `jwks` 列。若不应用迁移，使用 `signingAlgorithm` 的资源将无法找到匹配的密钥。

  资源服务器应在自身源站发布 RFC 9728 受保护资源元数据。OAuth 提供商提供的质询辅助工具会将客户端指向该元数据。

  `@better-auth/mcp` 现在要求显式设置 `resource` 选项。该插件会将该标识符存储为 OAuth 资源，为其发布 RFC 9728 受保护资源元数据，并将签发的访问令牌绑定到该资源。现有的 `mcp({ loginPage, consentPage })` 配置应添加受保护的 MCP 资源标识符，例如 `resource: "https://api.example.com/mcp"`。

- [#8931](https://github.com/better-auth/better-auth/pull/8931) [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734) 感谢 [@GautamBytes](https://github.com/GautamBytes)！ - 添加可选启用的、由 JWKS 支持的非对称 JWT 支持，用于 `session_data` Cookie 缓存令牌，使服务可以使用公钥而非共享密钥验证 Cookie 缓存 JWT。

- [#9134](https://github.com/better-auth/better-auth/pull/9134) [`652fa53`](https://github.com/better-auth/better-auth/commit/652fa53e4912837fe234651e7c7705fb35abe188) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 动态 `baseURL` 配置现在会忽略 `x-forwarded-host` 和 `x-forwarded-proto`，除非设置 `advanced.trustedProxyHeaders: true`。

  使用 `baseURL: { allowedHosts }` 的请求现在默认根据 `Host` 解析 auth 源站，因此除非启用受信任代理请求头，否则转发请求头无法选择其他允许的主机。

  **破坏性变更：**如果代理仅通过 `x-forwarded-host` 暴露公共主机名，请设置 `advanced.trustedProxyHeaders: true`。代理会将 `Host` 重写为公共主机名的部署（nginx 默认配置、Vercel、Cloudflare 和 Netlify）不受影响。

  **迁移：**

  ```ts
  betterAuth({
    baseURL: { allowedHosts: [...] },
    advanced: {
      trustedProxyHeaders: true,
    },
  });
  ```

- [#10031](https://github.com/better-auth/better-auth/pull/10031) [`6fe9faa`](https://github.com/better-auth/better-auth/commit/6fe9faab65eb640dbe9bb762954a068586e8661c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 从 `better-auth/plugins` 中移除已弃用的 `oidcProvider` 插件。请将 OIDC 授权服务器集成迁移至 `@better-auth/oauth-provider`。

- [#10036](https://github.com/better-auth/better-auth/pull/10036) [`ad35ead`](https://github.com/better-auth/better-auth/commit/ad35eadd130162565a1b93c27f3a66910dca0b0e) 感谢 [@bytaesu](https://github.com/bytaesu)！ - 要求 Google One Tap 服务器回调在验证 ID 令牌前解析出 Google 客户端 ID。使用 One Tap 插件时，请配置 `oneTap({ clientId })` 或 `socialProviders.google.clientId`。

### 补丁变更

- [#10014](https://github.com/better-auth/better-auth/pull/10014) [`73541c1`](https://github.com/better-auth/better-auth/commit/73541c119041113b1909fe244ff4b8210618b5b5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - Cloudflare Workers 应用现在可以在导入 `better-auth/db` 等 Better Auth 子路径时启动。Beta 版本此前会在应用代码运行前，于模块初始化期间崩溃。

- [#10065](https://github.com/better-auth/better-auth/pull/10065) [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 携带凭据的 OAuth 和设备授权响应现在都会一致地发送 `Cache-Control: no-store` 和 `Pragma: no-cache`，确保代理、CDN 和浏览器绝不会缓存这些响应。涵盖 token、introspection 和 userinfo 端点、动态和管理客户端注册、客户端密钥轮换，以及设备代码和设备令牌响应，包括这些端点返回的错误响应。

  端点通过 `metadata: { noStore: true }` 声明此设置；对于手动构建的响应，可从 `@better-auth/core` 导入导出的请求头集合 `NO_STORE_HEADERS`。

- 已更新依赖项 [[`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9)]：
  - @better-auth/core@1.7.0-beta.6
  - @better-auth/drizzle-adapter@1.7.0-beta.6
  - @better-auth/kysely-adapter@1.7.0-beta.6
  - @better-auth/memory-adapter@1.7.0-beta.6
  - @better-auth/mongo-adapter@1.7.0-beta.6
  - @better-auth/prisma-adapter@1.7.0-beta.6
  - @better-auth/telemetry@1.7.0-beta.6

## 1.7.0-beta.5

### 次要变更

- [#9930](https://github.com/better-auth/better-auth/pull/9930) [`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 Expo 和其他应用内浏览器中，OAuth 回调不带会话 Cookie 返回时，匿名账户现在可以在社交和通用 OAuth 登录后成功关联。`onLinkAccount` 会触发，匿名用户也会被迁移；此前这一步会被静默跳过。

  插件现在可以通过新的 `addOAuthServerContext` API，在 OAuth 重定向过程中携带服务器信任的数据，并在回调时通过 `getOAuthState().serverContext` 读取。与 `additionalData` 不同，它无法通过请求体设置，因此适合存放服务器必须信任的值。

  对于 `@better-auth/oauth-provider`，登录后的授权查询现在通过此服务器专用通道传递，因此无法再通过 `additionalData` 注入。

- [#9645](https://github.com/better-auth/better-auth/pull/9645) [`e014029`](https://github.com/better-auth/better-auth/commit/e0140297a59ddb59cccbcb4ba46c513de8cb86a7) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 加强 Electron OAuth 流程，并收紧自定义 Scheme 的可信来源匹配。

  Electron 登录流程现在强制使用 PKCE S256。普通 PKCE 会被拒绝：`code_challenge_method` 参数已移除，并且每个授权码都会通过 SHA-256 对 verifier 进行哈希来验证。服务器不再信任 `electron-origin` 标头来设置请求 Origin。Electron 客户端现在会发送真实的 `Origin`（例如 `myapp:/`），因此请同时升级 `@better-auth/electron` 客户端和服务器，并确保应用的 Scheme 位于 `trustedOrigins` 中。未使用的 `disableOriginOverride` 选项已移除。

  `trustedOrigins` 中的自定义 Scheme 条目现在根据 Scheme 和 authority 匹配，而不是根据字符串前缀匹配。像 `myapp://` 或 `exp://` 这样不包含主机的条目，仍会信任该 Scheme 下的所有主机；但像 `myapp://callback` 这样包含主机的条目会精确匹配该主机，因此不再会被 `myapp://callback.attacker.tld` 满足。

- [#9966](https://github.com/better-auth/better-auth/pull/9966) [`ec8a38c`](https://github.com/better-auth/better-auth/commit/ec8a38c08f5cfe2d922be0f8a49f2d0fa84de799) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 现在，使用 `discoveryUrl` 配置的 genericOAuth provider 会根据其发布的 JWKS 验证 provider 的 `id_token`（包括签名、issuer、audience 和声明的算法）。验证失败的 `id_token` 登录会被拒绝。

  这些 provider 也支持通过 `signIn.social({ idToken })` 使用客户端提交的 id_token 登录；此前这会返回 `ID_TOKEN_NOT_SUPPORTED`。

  使用显式端点而非 `discoveryUrl` 配置的 provider 不受影响。

- [#9828](https://github.com/better-auth/better-auth/pull/9828) [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用单个共享验证器验证社交 provider 的 id_token。

  客户端提交的 id_token 登录（`signIn.social({ idToken })` 和账户关联）现在由一个函数验证，而不再使用每个 provider 各自的 `verifyIdToken` 方法。每个 provider 声明一个包含 JWKS 来源、issuer 和 audience 的 `idToken` 配置，核心验证器负责执行签名、issuer、audience 和 nonce 检查。未声明配置的 provider 会拒绝客户端 id_token 登录路径。

  PayPal 此前接受任何可解码的 id_token，而不验证其签名。PayPal 从 access token 派生身份，因此现在不声明 `idToken` 配置，客户端 id_token 登录路径会返回 `ID_TOKEN_NOT_SUPPORTED`。通过重定向流程进行 PayPal 登录不受影响。

  直接实现 `OAuthProvider` 的自定义 provider，需要用 `idToken` 配置替换已移除的 `verifyIdToken` 方法：

  ```ts
  idToken: {
  	jwks: createRemoteJWKSet(new URL("https://issuer.example/.well-known/jwks.json")),
  	issuer: "https://issuer.example",
  	audience: clientId,
  },
  ```

  对于无法使用本地 JWKS 的验证方式，请传入 `idToken: { verify: async (token, nonce) => boolean }`。provider 选项 `verifyIdToken` 和 `disableIdTokenSignIn` 不受影响。

- [#9929](https://github.com/better-auth/better-auth/pull/9929) [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 OAuth provider 选项中添加 `requireEmailVerification`，适用于内置社交 provider 和 Generic OAuth 插件。当 provider 报告邮箱未验证时，用户和账户仍会被创建或关联，但不会签发会话：OAuth 回调会重定向并附带 `?error=email_not_verified`，ID token 和 One Tap 登录则会返回 `403` `EMAIL_NOT_VERIFIED`。验证邮件遵循现有的 `emailVerification.sendOnSignUp` / `sendOnSignIn` 设置。

  此选项需要按 provider 单独启用，且不会继承 `emailAndPassword.requireEmailVerification`，因此现有社交登录仍可正常使用。此门控会检查本地用户的验证状态，因此通过其他方式完成验证的用户仍可访问。仅对会报告可信 `email_verified` 信号的 provider 启用此选项。

- [#9969](https://github.com/better-auth/better-auth/pull/9969) [`76a3342`](https://github.com/better-auth/better-auth/commit/76a33429fc2a3edcc85307bf81b9d92a95f9de6c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用 `secondaryStorage` 和 `session.preserveSessionInDatabase` 退出登录时，现在会执行配置的 `session.delete` hooks，并将保留的会话记录标记为已结束。绑定到该会话的 OAuth Provider access token 和 refresh token 会被撤销，退出登录时也会触发后端通道注销。此前在此配置下会跳过这些 hooks，因此令牌会一直有效到过期。

- [#9864](https://github.com/better-auth/better-auth/pull/9864) [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 添加 `user.validateUserInfo` 配置门控，使应用可以在创建用户或关联新账户前拒绝某个身份。对于所有会创建用户的方法，此门控都会在创建步骤执行一次（OAuth、SSO/SAML、邮箱/密码、魔法链接、邮箱 OTP、匿名、SIWE、电话号码、管理员创建的用户和 SCIM），包括没有持久化数据库的无状态配置。

  当现有 OAuth 或 SSO 用户再次登录时（`source.action` 为 `"sign-in"`），也会重新运行此门控，并接收最新的 provider 邮箱和个人资料，以便域名或组织策略可以拒绝 provider 身份已超出允许范围的用户。非 provider 的回访登录不会重新验证。

  回调接收映射后的 `user`，以及描述 `action`（`create-user`、`link-account` 或 `sign-in`）、`method` 和 provider 元数据的 `source`：OAuth provider 使用 `source.oauth`，OIDC/SAML SSO provider 使用 `source.sso`。返回 `{ error, errorDescription }` 即可拒绝：浏览器流程会重定向到错误 URL，编程式流程会返回 `403`。

### 补丁变更

- [#9898](https://github.com/better-auth/better-auth/pull/9898) [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2) 感谢 [@ItalyPaleAle](https://github.com/ItalyPaleAle)！- 为 Microsoft Entra ID 社交 provider 添加 `clientAssertion` 支持。

- [#9304](https://github.com/better-auth/better-auth/pull/9304) [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 通过 OIDC Back-Channel Logout 1.0，将退出登录操作传播到所有已连接的应用，并立即切断 API 访问。

  当用户在 OP 处结束会话（退出登录、`/oauth2/end-session`、管理员撤销、封禁）时，`@better-auth/oauth-provider` 现在会通知所有持有该会话令牌的 Relying Party。用户的 API 访问会立即被切断，而不是等到 access token 自身的 TTL 到期后才失效。每个客户端可通过 DCR 或管理员客户端创建端点注册 `backchannel_logout_uri`（以及可选的 `backchannel_logout_session_required`）来选择启用此功能。provider 会为每个客户端签署一个 `logout+jwt` Logout Token，并并行 POST 到相应客户端，同时为每个 RP 设置较短的超时时间。

  **破坏性变更。** 绑定会话已结束的不透明或 JWT access token，在 introspection 中现在会返回 `{ active: false }`，`/oauth2/userinfo` 则会以 `invalid_token` 拒绝该令牌。此前，令牌会一直有效到自身的 TTL 到期。如果你依赖 access token 的有效期长于用户会话，这种行为现在不再成立。

  未包含 `offline_access` 的 refresh token 会在会话结束时被撤销；包含 `offline_access` 的 refresh token 会被保留，因此长期 API 访问可以在浏览器会话结束后继续（OIDC Back-Channel Logout 1.0 §2.7）。会话结束时使 access token 失效是超出 §2.7 要求之外的额外 OP 加固措施，由会话有效性检查强制执行，因此即使禁用了 JWT 插件，该措施仍然有效。

  如果配置了宿主的后台任务处理程序，通知会通过它执行（Vercel `waitUntil`、Cloudflare `ctx.waitUntil`）；如果未配置处理程序，则会在线程内完成，以免请求结束时丢失通知。在无服务器运行时，请配置 `advanced.backgroundTasks.handler`，以确保退出登录快速完成。

  当启用 JWT 插件时，`/.well-known/openid-configuration` 和 `/.well-known/oauth-authorization-server` 的 Discovery 文档会公布 `backchannel_logout_supported: true` 和 `backchannel_logout_session_supported: true`。注册 `backchannel_logout_uri` 时，系统会拒绝包含片段、使用非 http(s) Scheme 的 URI，以及机密客户端使用的非 HTTPS 目标。其 SSRF 主机防护会阻止私有、保留、隧道和云元数据主机，现在也覆盖 `private_key_jwt` 客户端的 `jwks_uri`。

  `@better-auth/oauth-provider` 的 Schema 变更：
  - `oauthClient.backchannelLogoutUri: string | null`
  - `oauthClient.backchannelLogoutSessionRequired: boolean`
  - `oauthAccessToken.revoked: Date | null`

  `better-auth` 的 `signJWT` 新增了可选的 `header` 参数，并会将其转发给自定义远程签名器。需要显式媒体类型的 JWT profile（例如 `typ: "logout+jwt"`）现在可以设置该参数，而无需使用底层签名原语。

- 更新的依赖项 [[`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2)、[`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f)、[`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b)、[`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f)]：
  - @better-auth/core@1.7.0-beta.5
  - @better-auth/drizzle-adapter@1.7.0-beta.5
  - @better-auth/kysely-adapter@1.7.0-beta.5
  - @better-auth/memory-adapter@1.7.0-beta.5
  - @better-auth/mongo-adapter@1.7.0-beta.5
  - @better-auth/prisma-adapter@1.7.0-beta.5
  - @better-auth/telemetry@1.7.0-beta.5

## 1.7.0-beta.4

## 1.6.30

### 补丁变更

- 更新的依赖项 [[`07c1718`](https://github.com/better-auth/better-auth/commit/07c17189f58502bf038e5f22766f8a99df60ac99)]：
  - @better-auth/core@1.6.30
  - @better-auth/drizzle-adapter@1.6.30
  - @better-auth/kysely-adapter@1.6.30
  - @better-auth/memory-adapter@1.6.30
  - @better-auth/mongo-adapter@1.6.30
  - @better-auth/prisma-adapter@1.6.30
  - @better-auth/telemetry@1.6.30

## 1.6.29

### 补丁变更

- [#10805](https://github.com/better-auth/better-auth/pull/10805) [`e6e1b4e`](https://github.com/better-auth/better-auth/commit/e6e1b4e8146a84d2a2c5fe2c497c81d03dfc2ad3) 感谢 [@Emmaccen](https://github.com/Emmaccen)！- 启用辅助存储时，通过并行删除会话来加快批量会话撤销。

- 更新的依赖项 []：
  - @better-auth/core@1.6.29
  - @better-auth/drizzle-adapter@1.6.29
  - @better-auth/kysely-adapter@1.6.29
  - @better-auth/memory-adapter@1.6.29
  - @better-auth/mongo-adapter@1.6.29
  - @better-auth/prisma-adapter@1.6.29
  - @better-auth/telemetry@1.6.29

## 1.6.28

### 补丁变更

- [#10769](https://github.com/better-auth/better-auth/pull/10769) [`773de54`](https://github.com/better-auth/better-auth/commit/773de54b18c0e920a3542bdecaf8b42fffc0dc4b) 感谢 [@bytaesu](https://github.com/bytaesu)！- 防止在短暂重新挂载期间重复请求会话，同时确保未完成的刷新会被重新验证。

- [#10794](https://github.com/better-auth/better-auth/pull/10794) [`2ad2928`](https://github.com/better-auth/better-auth/commit/2ad2928f967afa9f9858caecd01466ecb8686982) 感谢 [@bytaesu](https://github.com/bytaesu)！- 恢复客户端插件声明与下游 TypeScript 使用者的兼容性。

- 更新的依赖项 []：
  - @better-auth/core@1.6.28
  - @better-auth/drizzle-adapter@1.6.28
  - @better-auth/kysely-adapter@1.6.28
  - @better-auth/memory-adapter@1.6.28
  - @better-auth/mongo-adapter@1.6.28
  - @better-auth/prisma-adapter@1.6.28
  - @better-auth/telemetry@1.6.28

## 1.6.27

### 补丁变更

- [#10657](https://github.com/better-auth/better-auth/pull/10657) [`2ae491e`](https://github.com/better-auth/better-auth/commit/2ae491eac3ece50839a0eb2d4f868c4deedac67b) 感谢 [@bytaesu](https://github.com/bytaesu)！- 将端点和中间件上下文类型与运行时路由参数对齐，并在从端点上下文解析会话时保留响应标头。

- [#10676](https://github.com/better-auth/better-auth/pull/10676) [`90b5093`](https://github.com/better-auth/better-auth/commit/90b509344794b8064700371cbc04b985d0519839) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当 React 重试已挂起的组件时，合并尚未完成的会话请求。

- 更新的依赖项 [[`2ae491e`](https://github.com/better-auth/better-auth/commit/2ae491eac3ece50839a0eb2d4f868c4deedac67b)]：
  - @better-auth/core@1.6.27
  - @better-auth/drizzle-adapter@1.6.27
  - @better-auth/kysely-adapter@1.6.27
  - @better-auth/memory-adapter@1.6.27
  - @better-auth/mongo-adapter@1.6.27
  - @better-auth/prisma-adapter@1.6.27
  - @better-auth/telemetry@1.6.27

## 1.6.26

### 补丁变更

- [#10619](https://github.com/better-auth/better-auth/pull/10619) [`9ede805`](https://github.com/better-auth/better-auth/commit/9ede8059b56e1415c1e8cfdd93ff72691b848bbf) 感谢 [@jeroenvandermerwe](https://github.com/jeroenvandermerwe)！- 确保未配置后台任务处理程序时，数据库速率限制清理仍能完成。

- [#10608](https://github.com/better-auth/better-auth/pull/10608) [`5a811f1`](https://github.com/better-auth/better-auth/commit/5a811f1b4314b8bcf6f21c0b72de5cb67d552d97) 感谢 [@bytaesu](https://github.com/bytaesu)！- 邮箱注册后，将邮箱验证类型传递给自定义 OTP 生成器。

- [#10605](https://github.com/better-auth/better-auth/pull/10605) [`d8327f1`](https://github.com/better-auth/better-auth/commit/d8327f1fea92243b6fea1b0ab183e2a989792c0c) 感谢 [@XXMOHAMED012](https://github.com/XXMOHAMED012)！- 邮箱 OTP 验证检查不再会在 OTP 本身通过验证前泄露某个邮箱是否已注册。

- [#10513](https://github.com/better-auth/better-auth/pull/10513) [`e2c73fb`](https://github.com/better-auth/better-auth/commit/e2c73fbec87f5e19f6a2b5ac371bc5bba9bd49ff) 感谢 [@mrosberghaus](https://github.com/mrosberghaus)！- 修复 `jwtClient()` 与 `inferAdditionalFields` 等其他客户端插件组合使用时，会导致 `createAuthClient` 类型推断失效的问题。额外用户字段（例如 `updateUser` 中的字段）现在会再次保留。

- [#10635](https://github.com/better-auth/better-auth/pull/10635) [`af50c45`](https://github.com/better-auth/better-auth/commit/af50c45553a62cfb6cdcdede86828731ca00c22c) 感谢 [@krish-vachhani](https://github.com/krish-vachhani)！- 修复 `oneTapClient()` 与其他客户端插件组合使用时，会导致 `createAuthClient` 类型推断失效的问题。客户端现在可以再次使用 `oneTap` 操作。

- [#10633](https://github.com/better-auth/better-auth/pull/10633) [`701cd43`](https://github.com/better-auth/better-auth/commit/701cd43babac52784d855291a6adc0cf3fba7970) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在活动的数据库事务中创建或读取 JWKS 签名密钥时，现在会使用事务作用域的适配器，而非根连接。在启用了原生事务的单连接 SQLite 数据库中，这不再会造成死锁；在 Postgres 和 MySQL 中，密钥也会与外围事务一起提交，而不是独立于该事务提交。

- [#10599](https://github.com/better-auth/better-auth/pull/10599) [`e7b0eba`](https://github.com/better-auth/better-auth/commit/e7b0eba327e050f50764802e21484c6cabb56600) 感谢 [@bytaesu](https://github.com/bytaesu)！- 使用 `oAuthProxy` 时，保留来自 `form_post` 回调的 Apple 用户数据。

- [#10552](https://github.com/better-auth/better-auth/pull/10552) [`2b4a14f`](https://github.com/better-auth/better-auth/commit/2b4a14f180ed2eeb9692d6933064b001f66ec52c) 感谢 [@bytaesu](https://github.com/bytaesu)！- 允许用户在输入无效密码后重试邮箱 OTP 密码重置。

- [#10467](https://github.com/better-auth/better-auth/pull/10467) [`7552a3b`](https://github.com/better-auth/better-auth/commit/7552a3b563fe1ae922fb65db12d005c38a12614d) 感谢 [@jlucaso1](https://github.com/jlucaso1)！- 提升已插桩的 Next.js 应用中 `nextCookies` 的性能。

- [#10580](https://github.com/better-auth/better-auth/pull/10580) [`ea38fca`](https://github.com/better-auth/better-auth/commit/ea38fcac7435137604e9b3ba2fe149a1848d0eeb) 感谢 [@Emmaccen](https://github.com/Emmaccen)！- 跳过无效的二级存储会话条目，而不丢弃其他有效会话。

- [#10520](https://github.com/better-auth/better-auth/pull/10520) [`a03e4c1`](https://github.com/better-auth/better-auth/commit/a03e4c18677e2dc01a9b47b2a8017b92dbf9ece7) 感谢 [@bytaesu](https://github.com/bytaesu)！- 确保删除用户时，也会从二级存储中移除其会话。

- 已更新依赖项 [[`a30e274`](https://github.com/better-auth/better-auth/commit/a30e274b5daed6057086d76b91d17abfa02196d7)]：
  - @better-auth/core@1.6.26
  - @better-auth/drizzle-adapter@1.6.26
  - @better-auth/kysely-adapter@1.6.26
  - @better-auth/memory-adapter@1.6.26
  - @better-auth/mongo-adapter@1.6.26
  - @better-auth/prisma-adapter@1.6.26
  - @better-auth/telemetry@1.6.26

## 1.6.25

### 补丁变更

- [#10479](https://github.com/better-auth/better-auth/pull/10479) [`5124c34`](https://github.com/better-auth/better-auth/commit/5124c3487903e96223bb3f54347724bb0204bb95) 感谢 [@krish-vachhani](https://github.com/krish-vachhani)！- 当 Google 提供商禁用注册时，阻止 Google One Tap 创建新用户。

- [#10444](https://github.com/better-auth/better-auth/pull/10444) [`7439359`](https://github.com/better-auth/better-auth/commit/743935991f9991e8243d6c3d14773b9cfca462e8) 感谢 [@birkskyum](https://github.com/birkskyum)！- 从 Solid 客户端公开真实的 `$fetch` 实例和 `$store` 原子，而不是将它们解析为动态 API 路由。

- 已更新依赖项 [[`0ffd1fb`](https://github.com/better-auth/better-auth/commit/0ffd1fb28d44a8266d62791cd4c97e263444d03b)]：
  - @better-auth/core@1.6.25
  - @better-auth/drizzle-adapter@1.6.25
  - @better-auth/kysely-adapter@1.6.25
  - @better-auth/memory-adapter@1.6.25
  - @better-auth/mongo-adapter@1.6.25
  - @better-auth/prisma-adapter@1.6.25
  - @better-auth/telemetry@1.6.25

## 1.6.24

### 补丁变更

- [#10235](https://github.com/better-auth/better-auth/pull/10235) [`03dc5a0`](https://github.com/better-auth/better-auth/commit/03dc5a046f536994950800ea557b8e2e2e0cdfdd) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复用户将内置模型名称映射为与其他架构键冲突的字符串时，外键和适配器联接被静默错误路由的问题

- [#10357](https://github.com/better-auth/better-auth/pull/10357) [`7508940`](https://github.com/better-auth/better-auth/commit/750894037639c4158472cc1d4994b0e07bf1f59a) 感谢 [@c-nicol](https://github.com/c-nicol)！- 修复同时设置了 `unique: true` 和 `index: true` 的新表字段的 Kysely 迁移生成问题。

- [#10342](https://github.com/better-auth/better-auth/pull/10342) [`bae7198`](https://github.com/better-auth/better-auth/commit/bae71988ab79aeb4f19f245ceabac9eca8706a50) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复成员超过约 100 人的组织调用 `organization.listMembers` 时出现“找不到成员对应的用户”错误的问题，方法是对用户查询应用相同的成员数量限制。

- [#10336](https://github.com/better-auth/better-auth/pull/10336) [`ef4d273`](https://github.com/better-auth/better-auth/commit/ef4d27360cec8a0bc11a94e135ea4a3dd32b1969) 感谢 [@Tushar-Khandelwal-2004](https://github.com/Tushar-Khandelwal-2004)！- 防止克隆请求抛出异常时导致验证回调使身份验证请求失败。

- [#10333](https://github.com/better-auth/better-auth/pull/10333) [`99dbdd7`](https://github.com/better-auth/better-auth/commit/99dbdd7ea98740d11689394220a718dfb9579276) 感谢 [@c-nicol](https://github.com/c-nicol)！- 修复同时设置了 `unique: true` 和 `index: true` 的字段的 Drizzle 架构生成问题。

- [#10368](https://github.com/better-auth/better-auth/pull/10368) [`086ca91`](https://github.com/better-auth/better-auth/commit/086ca91f51dd8158aff6cbf54c4f9c7ce220914d) 感谢 [@gaurav0107](https://github.com/gaurav0107)！- 在 magic-link（`/sign-in/magic-link`）和 email-otp（`/email-otp/send-verification-otp`）发送端点强制验证请求的 `Origin`，包括无 Cookie 请求，以匹配内置的 `/sign-in/email` 和 `/sign-up/email` 路由。无 Cookie 的跨域 POST 不再能向任意地址发送 magic-link 或验证 OTP 邮件。不携带 `Origin` 的无 Cookie 请求（服务器到服务器请求）不受影响。

- [#10290](https://github.com/better-auth/better-auth/pull/10290) [`8f2dedd`](https://github.com/better-auth/better-auth/commit/8f2dedd89301da9fb52c1a64df6a9683f9be55fd) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 通过 CORS 向浏览器客户端公开远程 MCP 身份验证客户端的 401 挑战标头。

- [#10453](https://github.com/better-auth/better-auth/pull/10453) [`4e685ee`](https://github.com/better-auth/better-auth/commit/4e685eef420b5576913b9803b58c7e7ee7342203) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- OpenAPI 现在会在 `/sign-up/email` 和 `/update-user` 请求体中包含 `user.additionalFields` 以及插件用户架构字段（例如 username 插件中的 `username` / `displayUsername`）。

- [#10190](https://github.com/better-auth/better-auth/pull/10190) [`3bf0e49`](https://github.com/better-auth/better-auth/commit/3bf0e4981e025ba9af684013a27b0102a04f7c56) 感谢 [@gaurav-init](https://github.com/gaurav-init)！- 在 organization 插件中，将端点上下文作为第二个参数传递给 `beforeDeleteOrganization` 和 `afterDeleteOrganization` 钩子，使其与文档中显示的签名以及现有的 `databaseHooks` 模式一致。Stripe 插件的 `beforeDeleteOrganization` 包装器现在会将上下文转发给用户提供的钩子，而不再丢弃它。

- [#10040](https://github.com/better-auth/better-auth/pull/10040) [`f59a0ee`](https://github.com/better-auth/better-auth/commit/f59a0ee7895a024ddd4c5c387344173888e17be4) 感谢 [@shiminshen](https://github.com/shiminshen)！- 当 ID 生成委托给数据库时，组织邀请现在会让数据库生成其 `id`（例如，使用支持 UUID 的适配器，如 Postgres 时配置 `advanced.database.generateId: "uuid"`），与其他所有模型保持一致。此前，`createInvitation` 总是在应用程序代码中生成邀请 `id`，因此邀请行收到的是应用程序生成的值，而组织、成员和团队则能正确地将生成工作交由数据库处理（[better-auth/better-auth#10024](https://github.com/better-auth/better-auth/issues/10024)）。调用方提供的 id（例如通过 `beforeCreateInvitation` 提供）仍会保留。

- [#10302](https://github.com/better-auth/better-auth/pull/10302) [`0f2cc1b`](https://github.com/better-auth/better-auth/commit/0f2cc1b33b77850948dac4d889e5f46bba41e8d5) 感谢 [@momomuchu](https://github.com/momomuchu)！- 在 `getDefaultModelName` 中优先匹配精确的架构键，而不是 `modelName` 别名，因此，将内置表重新映射到另一张表的架构键上（例如 `user.modelName = "account"`）不会导致内部适配器查询被错误路由到另一张表。

- [#9787](https://github.com/better-auth/better-auth/pull/9787) [`ae78109`](https://github.com/better-auth/better-auth/commit/ae781091186f321b4e4ec9e84f64b6e4d5ea1043) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复 `useSession({ throw: true })` 的 `data` 类型错误地排除了 `null` 的问题。

- [#10222](https://github.com/better-auth/better-auth/pull/10222) [`46d2bf0`](https://github.com/better-auth/better-auth/commit/46d2bf02c98902da7b344753372d48cfe0e5ebb3) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复：为 get-session 路由添加 no-store cache-control 标头

- [#10316](https://github.com/better-auth/better-auth/pull/10316) [`29a373e`](https://github.com/better-auth/better-auth/commit/29a373eaf1778820061a9380c29831c2de2ce704) 感谢 [@vinay-oppuri](https://github.com/vinay-oppuri)！- 在迁移差异中将 SQLite `BIGINT` 识别为有效数字类型，使数据库速率限制器列（如 `lastRequest`）不再在每次运行时都报告无关的待处理变更。

- [#10379](https://github.com/better-auth/better-auth/pull/10379) [`f6d18fa`](https://github.com/better-auth/better-auth/commit/f6d18fa8f79b9323e10b50f72e2b1a088844e4bb) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复（客户端）：在重新挂载后恢复身份验证查询重新验证和信号监听器

- [#5753](https://github.com/better-auth/better-auth/pull/5753) [`f23ce50`](https://github.com/better-auth/better-auth/commit/f23ce5012ea47fac1a69b1dad203dfdef3830fd0) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 新增（last-login-method）：用于符合 GDPR 的 `beforeStoreCookie` 选项

- [#10376](https://github.com/better-auth/better-auth/pull/10376) [`c4d1dda`](https://github.com/better-auth/better-auth/commit/c4d1ddaa952eab7edfec942fab223f35798518ab) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 将请求端点上下文作为第三个参数传递给 `verifyIdToken`，以便自定义 ID 令牌验证器读取请求标头（例如 Apple 的 `user-agent` 要求）。

- 已更新依赖项 [[`6758231`](https://github.com/better-auth/better-auth/commit/6758231905d2e86a7b3f058dd05c17ba739aa80f), [`54fab08`](https://github.com/better-auth/better-auth/commit/54fab084469a27257e66a0814523ebac7145ef5d), [`c4d1dda`](https://github.com/better-auth/better-auth/commit/c4d1ddaa952eab7edfec942fab223f35798518ab)]：
  - @better-auth/core@1.6.24
  - @better-auth/drizzle-adapter@1.6.24
  - @better-auth/kysely-adapter@1.6.24
  - @better-auth/memory-adapter@1.6.24
  - @better-auth/mongo-adapter@1.6.24
  - @better-auth/prisma-adapter@1.6.24
  - @better-auth/telemetry@1.6.24

## 1.6.23

### 补丁变更

- [#9138](https://github.com/better-auth/better-auth/pull/9138) [`8581f97`](https://github.com/better-auth/better-auth/commit/8581f97ea0000e03edd6aa7911efabf694a9ff95) 感谢 [@vladflotsky](https://github.com/vladflotsky)！- 为通用 OAuth 插件添加预配置的 Yandex 提供商辅助函数。

- 已更新依赖项 [[`930b260`](https://github.com/better-auth/better-auth/commit/930b260cfd402e9f8886719a3ced503b9ceff7f6)]：
  - @better-auth/drizzle-adapter@1.6.23
  - @better-auth/core@1.6.23
  - @better-auth/kysely-adapter@1.6.23
  - @better-auth/memory-adapter@1.6.23
  - @better-auth/mongo-adapter@1.6.23
  - @better-auth/prisma-adapter@1.6.23
  - @better-auth/telemetry@1.6.23

## 1.6.22

### 补丁变更

- [#10239](https://github.com/better-auth/better-auth/pull/10239) [`c06a56d`](https://github.com/better-auth/better-auth/commit/c06a56d83a40bbaeac12d3a8b8b67e59f92a9110) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用 magic-link 和 email-OTP 登录时，如果某个账户的邮箱从未确认过，现在会重置该账户的凭据。当验证结果指向此类账户时，系统会移除其现有密码并撤销其会话，然后再为用户登录，因此，对邮箱的已验证控制权将成为该账户的可信依据。

  如果你使用邮箱和密码注册，但首次登录时使用的是 magic link 或 email OTP，而不是先确认验证邮件，那么你的密码会被清除，你需要通过密码重置设置新密码。

- [#10240](https://github.com/better-auth/better-auth/pull/10240) [`3a035e9`](https://github.com/better-auth/better-auth/commit/3a035e968e27bfdee1e53ad857e5569090d9f2d1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为双重身份验证添加账户级锁定。尝试次数限制按账户计算，适用于所有登录质询和验证因素：TOTP、email-OTP 和备用代码共用一个计数器，验证成功后该计数器会重置。

  默认启用：连续验证失败 10 次后，账户会被锁定 15 分钟；尝试在锁定期间进行验证时，会返回 `429` 和 `ACCOUNT_TEMPORARILY_LOCKED` 错误代码。可通过 `twoFactor({ accountLockout: { enabled, maxFailedAttempts, durationSeconds } })` 进行配置。

  升级后请运行数据库迁移：此操作会向 `twoFactor` 表添加 `failedVerificationCount` 和 `lockedUntil` 列。

- 已更新依赖项 [[`8bd43d9`](https://github.com/better-auth/better-auth/commit/8bd43d9d8312fd9ddbfb8fb5c827cf0a0e55132d)]：
  - @better-auth/core@1.6.22
  - @better-auth/drizzle-adapter@1.6.22
  - @better-auth/kysely-adapter@1.6.22
  - @better-auth/memory-adapter@1.6.22
  - @better-auth/mongo-adapter@1.6.22
  - @better-auth/prisma-adapter@1.6.22
  - @better-auth/telemetry@1.6.22

## 1.6.21

### 补丁变更

- [#10212](https://github.com/better-auth/better-auth/pull/10212) [`e0762a1`](https://github.com/better-auth/better-auth/commit/e0762a127ce351a96614e60866b3455e6eddffa1) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在挂载于根路径的部署中，路径不以配置的 `basePath` 开头的请求现在会返回 404，而不会解析为某个端点。

- [#10187](https://github.com/better-auth/better-auth/pull/10187) [`882cf9e`](https://github.com/better-auth/better-auth/commit/882cf9e592d1d305b5b78cadbb10aaeee7acd6dc) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 即使启用了会话 cookie 缓存，管理员权限变更和封禁现在也会立即对管理员 API 生效。在无状态应用中，即使签名 cookie 是会话记录，敏感会话检查也会继续正常工作。

- [#9939](https://github.com/better-auth/better-auth/pull/9939) [`f52e1ab`](https://github.com/better-auth/better-auth/commit/f52e1ab50b60d289b64d6b06f1bff5a4358cdfd0) 感谢 [@benpsnyder](https://github.com/benpsnyder)！- 修复了不传入 schema 选项调用 deviceAuthorization() 时，在构造阶段抛出 ZodError 的问题

- [#10196](https://github.com/better-auth/better-auth/pull/10196) [`b5bec19`](https://github.com/better-auth/better-auth/commit/b5bec193a56cec2f7b71c84d71dacb632f0b96a0) 感谢 [@Paola3stefania](https://github.com/Paola3stefania)！- OAuth 注册和账号关联时的个人资料同步现在会忽略标记为 `input: false` 的用户字段所对应的提供商个人资料值。允许输入的附加字段仍会通过 `mapProfileToUser` 持久化；OAuth 创建用户时，schema 默认值仍会生效。使用 `mapProfileToUser` 填充 `input: false` 字段的应用应改为在服务器端配置代码中设置这些字段。

- [#10197](https://github.com/better-auth/better-auth/pull/10197) [`816d7f9`](https://github.com/better-auth/better-auth/commit/816d7f92522518e90d437c2a366d75db56690f86) 感谢 [@Paola3stefania](https://github.com/Paola3stefania)！- Google 登录现在接受 `hd: "*"`，以允许任何 Google Workspace 托管域名，同时仍会拒绝没有托管域名声明的令牌。

  Google One Tap 现在会在创建会话前应用配置的 Google 托管域名限制。

- [#10192](https://github.com/better-auth/better-auth/pull/10192) [`239bcc8`](https://github.com/better-auth/better-auth/commit/239bcc836cf39c4fb409a15333be45134f9e9e65) 感谢 [@bytaesu](https://github.com/bytaesu)！- 社交登录时，根据已验证的 ID 令牌主体验证 PayPal 用户信息。

- [#10228](https://github.com/better-auth/better-auth/pull/10228) [`1bc370a`](https://github.com/better-auth/better-auth/commit/1bc370aef5c249e82127cb9d35972101087ecde6) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SIWE 插件不再绑定已属于其他账号的邮箱。此前，当 `anonymous` 设为 `false` 时，即使该邮箱已被使用，`/siwe/verify` 仍会使用该邮箱创建新账号；现在在这种情况下会保留由钱包推导出的地址，因此同一邮箱无法关联到两个账号。

- [#10198](https://github.com/better-auth/better-auth/pull/10198) [`570267c`](https://github.com/better-auth/better-auth/commit/570267cd5e782f018933ce3af4f51dbd250bf7de) 感谢 [@rachit367](https://github.com/rachit367)！- 插件 schema 表现在会遵循 `disableMigration`。标记为 `disableMigration: true` 的表现在会被 `better-auth generate`（Drizzle 和 Prisma 输出）及运行时迁移器跳过，而不会再被输出并创建。此前，在组装表列表时该标记会被丢弃，因此没有生效。

- [#10182](https://github.com/better-auth/better-auth/pull/10182) [`461ca6f`](https://github.com/better-auth/better-auth/commit/461ca6fd2453a2e145fa18a1df543e435e884701) 感谢 [@bytaesu](https://github.com/bytaesu)！- 只有在通过用户名验证时，才会将显示用户名回退值作为用户名存储，用于邮箱注册。

- [#10183](https://github.com/better-auth/better-auth/pull/10183) [`88409b0`](https://github.com/better-auth/better-auth/commit/88409b0078c2bfddcc6503031fff333bfa045cd2) 感谢 [@bytaesu](https://github.com/bytaesu)！- 创建会话前，要求 OAuth 代理个人资料回调与已签发的 OAuth state 匹配。

- [#10203](https://github.com/better-auth/better-auth/pull/10203) [`5953157`](https://github.com/better-auth/better-auth/commit/5953157acf619bcb8233c91952b1e4072202f055) 感谢 [@bytaesu](https://github.com/bytaesu)！- 速率限制现在不再信任多跳 `X-Forwarded-For` 链，防止位于追加代理后面的客户端伪造最左侧跳点以绕过按 IP 设置的速率限制。单值 IP 标头仍可正常使用。若要在代理链后获取真实客户端 IP，可将 `advanced.ipAddress.trustedProxies` 设置为反向代理 IP 或 CIDR 范围（从右向左遍历链并跳过受信任的跳点），也可将 `advanced.ipAddress.ipAddressHeaders` 指向单个受信任的客户端 IP 标头。

- [#10191](https://github.com/better-auth/better-auth/pull/10191) [`b046f9e`](https://github.com/better-auth/better-auth/commit/b046f9ec112b2cf547efea8dc870a4895602c53b) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在插件请求处理器运行前，对客户端请求进行速率限制。

- [#10210](https://github.com/better-auth/better-auth/pull/10210) [`ae647b4`](https://github.com/better-auth/better-auth/commit/ae647b4abe5a4d606c326f1ce0ffa2500b5424d1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- TOTP 和备用码的双因素验证现在会在每个登录挑战输错五次验证码后锁定。达到上限后，挑战将以 `TOO_MANY_ATTEMPTS_REQUEST_NEW_CODE` 拒绝，用户必须重新登录才能再次尝试。

  在滚动部署期间，使用先前版本签发的双因素挑战可能会提示用户重新登录；部署完成后此问题便会消失。

- 已更新依赖项 [[`90d509e`](https://github.com/better-auth/better-auth/commit/90d509e0b9f72614170ad7124ae9d3a7a97d7d3a), [`816d7f9`](https://github.com/better-auth/better-auth/commit/816d7f92522518e90d437c2a366d75db56690f86), [`570267c`](https://github.com/better-auth/better-auth/commit/570267cd5e782f018933ce3af4f51dbd250bf7de), [`5953157`](https://github.com/better-auth/better-auth/commit/5953157acf619bcb8233c91952b1e4072202f055)]：
  - @better-auth/core@1.6.21
  - @better-auth/kysely-adapter@1.6.21
  - @better-auth/prisma-adapter@1.6.21
  - @better-auth/drizzle-adapter@1.6.21
  - @better-auth/memory-adapter@1.6.21
  - @better-auth/mongo-adapter@1.6.21
  - @better-auth/telemetry@1.6.21

## 1.6.20

### 补丁变更

- [#10121](https://github.com/better-auth/better-auth/pull/10121) [`21448b1`](https://github.com/better-auth/better-auth/commit/21448b1b77681e71e80ae0728d8658c936c18eb8) 感谢 [@adityachaudhary99](https://github.com/adityachaudhary99)！- OAuth 账号关联和创建用户时的错误日志现在会使用在 `betterAuth()` 中配置的自定义 `logger`，而不是始终写入默认控制台日志记录器。

- [#9621](https://github.com/better-auth/better-auth/pull/9621) [`8ecf238`](https://github.com/better-auth/better-auth/commit/8ecf23817f5e501bdd8ab63ad5fdf2554ff1dff5) 感谢 [@dipan-ck](https://github.com/dipan-ck)！- 使用不支持小数秒精度的数据库时，会话刷新不再产生超过浏览器 400 天上限的 cookie Max-Age。

- [#8734](https://github.com/better-auth/better-auth/pull/8734) [`930f534`](https://github.com/better-auth/better-auth/commit/930f5341d956bf3075f43758392a5c7f50947104) 感谢 [@sleepe229](https://github.com/sleepe229)！- 声明继承的 APIError 属性以修复 TypeScript 类型推断错误

- 已更新依赖项 []：
  - @better-auth/core@1.6.20
  - @better-auth/drizzle-adapter@1.6.20
  - @better-auth/kysely-adapter@1.6.20
  - @better-auth/memory-adapter@1.6.20
  - @better-auth/mongo-adapter@1.6.20
  - @better-auth/prisma-adapter@1.6.20
  - @better-auth/telemetry@1.6.20

## 1.6.19

### 补丁变更

- [#10088](https://github.com/better-auth/better-auth/pull/10088) [`de4aa52`](https://github.com/better-auth/better-auth/commit/de4aa52e991f0a56786300af3e0d9ac8331f1996) 感谢 [@bytaesu](https://github.com/bytaesu)！- 接近浏览器单个 cookie 大小限制的会话和账号缓存 cookie（例如使用较长的 `cookiePrefix` 或缓存许多字段时）现在会拆分成多个分块，而不再被浏览器静默丢弃。即使分块后仍无法容纳的超大缓存会被跳过并发出警告，而不会导致请求失败，因此读取时会回退到数据库。

- [#9995](https://github.com/better-auth/better-auth/pull/9995) [`b4b0266`](https://github.com/better-auth/better-auth/commit/b4b02660c760fe4c8889d1311a3dbf3165f88d0b) 感谢 [@ElGauchooooo](https://github.com/ElGauchooooo)！- 设备授权插件现在允许在通过 `/device/code` 签发设备代码时传入可选的 `user_id`，以预先将代码绑定到该用户。只有绑定的用户可以批准或拒绝该代码，因此公开可见的用户代码不再能被其他人抢先认领。

- [#10086](https://github.com/better-auth/better-auth/pull/10086) [`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 刷新令牌轮换和令牌撤销、双因素备用码重新生成、设备代码认领以及组织邀请接受现在都能在 Prisma 上正常工作。此前，这些流程中的并发或重复请求在 Prisma 上可能会返回错误，而不是预期结果。

  在低于 5.0 的 MongoDB 服务器上，这些流程及其他受保护的值更新（速率限制窗口重置、API 密钥补充）不再因空更新错误而失败。

  `@better-auth/core`：`incrementOne` 在调用时既没有 `increment` 也没有 `set`，现在会报告明确的错误。

- [#9319](https://github.com/better-auth/better-auth/pull/9319) [`581f827`](https://github.com/better-auth/better-auth/commit/581f8271fb911cea2ce74810e086709909457cd3) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复（last-login-method）：清除跨子域 cookie 时包含域名

- [#10067](https://github.com/better-auth/better-auth/pull/10067) [`8407885`](https://github.com/better-auth/better-auth/commit/840788502a13d6fa4aa4540b930ddb4a99dc1ed6) 感谢 [@bytaesu](https://github.com/bytaesu)！- `oauth-popup` 插件现在会忽略通过其 `additionalData` 参数传入的内部 OAuth state 字段，因此 `additionalData` 只会携带你自己的自定义值。

- [#9555](https://github.com/better-auth/better-auth/pull/9555) [`c1a8a64`](https://github.com/better-auth/better-auth/commit/c1a8a64c146fab20c7ad0076ffdf12eff9adc17a) 感谢 [@ChrisMGeo](https://github.com/ChrisMGeo)！- 修复 Better Auth 回调、会话和 passkey 路由的无效 OpenAPI 输出，使客户端生成器能够使用该 schema。

- [#10071](https://github.com/better-auth/better-auth/pull/10071) [`635f190`](https://github.com/better-auth/better-auth/commit/635f1908702d0c63cf66b4e5f054e9d527a3c8f7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 从包装器包导出的 Auth 客户端现在无需额外类型注解即可在 TypeScript 声明构建中输出。

- [#10070](https://github.com/better-auth/better-auth/pull/10070) [`a787e0b`](https://github.com/better-auth/better-auth/commit/a787e0b66b368a1af0b4ba17c9750c2839668246) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用单连接池的数据库适配器不再导致单次验证流程挂起。这修复了连接数受限的无服务器数据库配置中的 magic-link 验证及类似令牌检查。

- [#9348](https://github.com/better-auth/better-auth/pull/9348) [`c2f718f`](https://github.com/better-auth/better-auth/commit/c2f718fcdeec0c1767bb8acd5fefdd3810863b0a) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复：cookie 缓存回退查找

- [#8863](https://github.com/better-auth/better-auth/pull/8863) [`7d18175`](https://github.com/better-auth/better-auth/commit/7d18175637a0b95a501fde0cf3db080879367a9d) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- `sendVerificationEmail` 通过 `runInBackgroundOrAwait` 调用；当配置了 `advanced.backgroundTasks.handler` 时，这可能会延后任务执行（因此处理器可能会在邮件回调完成前返回 **200**），而在默认路径中，错误会被捕获并记录日志但**不会重新抛出**。因此，抛出 `APIError` 的用户回调（例如速率限制器返回 **429**）无法可靠地反映在 HTTP 响应中（[better-auth/better-auth#8757](https://github.com/better-auth/better-auth/issues/8757)）。

  现在我们会等待 `sendVerificationEmailFn` 完成，使失败能够以正确的状态码呈现给客户端。未认证的 `/send-verification-email` 路径会设置 500 毫秒的恒定时间下限，避免响应耗时泄露该邮箱是否属于真实的未验证用户。

- 已更新依赖项 [[`0895993`](https://github.com/better-auth/better-auth/commit/08959936d29de8a37d469e42d9077859b643d6b3), [`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63), [`a787e0b`](https://github.com/better-auth/better-auth/commit/a787e0b66b368a1af0b4ba17c9750c2839668246)]：
  - @better-auth/drizzle-adapter@1.6.19
  - @better-auth/core@1.6.19
  - @better-auth/mongo-adapter@1.6.19
  - @better-auth/kysely-adapter@1.6.19
  - @better-auth/memory-adapter@1.6.19
  - @better-auth/prisma-adapter@1.6.19
  - @better-auth/telemetry@1.6.19

## 1.6.18

### 补丁变更

- [#9315](https://github.com/better-auth/better-auth/pull/9315) [`9ef7240`](https://github.com/better-auth/better-auth/commit/9ef7240fec4a9d8469dd5ed24249949d3400e732) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 修复交叉和默认值包装的请求体 schema 的 OpenAPI requestBody 生成问题

- [#9583](https://github.com/better-auth/better-auth/pull/9583) [`b21a5f7`](https://github.com/better-auth/better-auth/commit/b21a5f7f6ca1f63c6b69666a498b4227b15e316c) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 修复复合 monorepo 中无法推断插件提供的客户端方法和附加会话字段的问题。

- 已更新依赖项 [[`b21a5f7`](https://github.com/better-auth/better-auth/commit/b21a5f7f6ca1f63c6b69666a498b4227b15e316c)]：
  - @better-auth/core@1.6.18
  - @better-auth/drizzle-adapter@1.6.18
  - @better-auth/kysely-adapter@1.6.18
  - @better-auth/memory-adapter@1.6.18
  - @better-auth/mongo-adapter@1.6.18
  - @better-auth/prisma-adapter@1.6.18
  - @better-auth/telemetry@1.6.18

## 1.6.17

### 补丁变更

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 当一个团队只有一个空余名额时，接受加入该团队的邀请却会被错误地以超出成员限制为由拒绝，并留下一个悬空的成员记录。同时接受两个邀请加入一个接近满员的团队，也可能导致团队成员数超过上限。这两个问题现已修复。

- [#9482](https://github.com/better-auth/better-auth/pull/9482) [`3e99e6c`](https://github.com/better-auth/better-auth/commit/3e99e6c77ef788377a3ddb7abe790c7dc3df1493) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当目标用户没有凭据账户时，`admin.setUserPassword` 现在会创建一个凭据账户，与 `resetPassword` 的行为一致。此前，对于没有现有凭据账户的用户（例如仅通过社交登录或魔法链接注册的用户），调用会返回 `status: true`，但不执行任何操作。因此，管理员现在可以直接将用户从其他身份验证系统迁移过来，或为仅通过社交登录的用户设置初始密码，无需操作 `account` 表。

- [`96c78c3`](https://github.com/better-auth/better-auth/commit/96c78c3e983ab3a2d914780fcc5d66d90537f9ac) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 将预期的身份验证验证失败日志级别从错误降为警告。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 验证码提供商的验证请求现在会在 10 秒后超时并默认拒绝，因此响应缓慢或无法访问的验证码提供商不再会无限期占用请求。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 删除账户确认链接在其回调被并发打开时，不再可能多次删除账户。

- [#9991](https://github.com/better-auth/better-auth/pull/9991) [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 通过 `/delete-user/callback` 完成账户删除时，如果会话已在服务器端撤销，现在会失败，而不会在 Cookie 缓存有效期内继续执行。仅将会话保留在 Cookie 中的部署不受影响。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 轮询设备授权令牌时，多个轮询请求同时到达也不再可能多次兑换同一个已批准的设备代码。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 同时从多个请求提交相同的邮箱 OTP 时，不再可能多次登录，也不再可能获得超过尝试次数上限的额外尝试机会。

- [#10002](https://github.com/better-auth/better-auth/pull/10002) [`ed7b6c9`](https://github.com/better-auth/better-auth/commit/ed7b6c9ac0fa2bb7f246f552b41046302ef8138c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 向已达到 `maximumMembersPerTeam` 上限的团队添加成员，现在无论通过哪种方式都会被拒绝。带有 `teamId` 的 `addMember` 和 `add-team-member` 之前会跳过邀请接受流程所执行的限制检查，因此可能导致团队人数超过上限。被拒绝的 `addMember` 不再创建组织成员。

- [#9677](https://github.com/better-auth/better-auth/pull/9677) [`e0a768c`](https://github.com/better-auth/better-auth/commit/e0a768c973f9d9ccd4aee959efcbe1fbcc2e608d) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 重构 `role.authorize` 的控制流，同时保留现有的授权行为。

- [#9987](https://github.com/better-auth/better-auth/pull/9987) [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当 `mapProfileToUser` 派生账户 ID 时，如果用户信息响应中没有 `sub` 或 `id` 字段，通用 OAuth 登录现在也能正常工作。`id` 字段为空时，现在会回退使用 `sub`。

- [#9991](https://github.com/better-auth/better-auth/pull/9991) [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 对于已过期的会话，`getCookieCache` 现在会返回 `null`，而不是过时的会话数据。调用该方法来限制访问的中间件不再会将已过期的签名 Cookie 视为有效会话。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 启用 Have I Been Pwned 插件时，默认情况下现在会在更多设置密码的端点上检查提交的密码是否存在于泄露数据库中，包括邮箱 OTP 和电话号码的重置密码路由，以及管理员创建用户和设置用户密码的路由。启用该插件并使用默认路径时，无法再通过这些路由设置已泄露的密码。

- [#9987](https://github.com/better-auth/better-auth/pull/9987) [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在同一浏览器中切换用户时，保留新签发的账户 Cookie，不再根据过时的请求 Cookie 状态使其失效。

- [#9991](https://github.com/better-auth/better-auth/pull/9991) [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 不再接受已过期的 MCP 访问令牌。受保护的 MCP 资源现在会在持有者令牌过期后拒绝该令牌，无论是在服务器端还是通过远程客户端。仅当原始授权包含 `offline_access` 作用域时，才接受刷新令牌。

- [#9991](https://github.com/better-auth/better-auth/pull/9991) [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 多会话的 `set-active` 和 `revoke` 端点现在只会操作调用者持有其签名 Cookie 的会话。此前，即使请求者没有某个会话的 Cookie，也可以在请求正文中指定该会话的令牌来激活或撤销该会话。

- [#9890](https://github.com/better-auth/better-auth/pull/9890) [`d9c526b`](https://github.com/better-auth/better-auth/commit/d9c526b2a57afe9e01ff25da400f1d634b4c1ac7) 感谢 [@bytaesu](https://github.com/bytaesu)！- 添加实验性的 `oauthPopup` 插件（包含 `oauthPopupClient` 和 `signIn.popup`），用于基于弹出窗口的 OAuth 登录。它允许应用在跨站 iframe 中完成登录：在弹出窗口中完成 OAuth，然后将会话令牌传回打开该窗口的页面，再由 `bearer` 插件使用该令牌进行身份验证。该 API 在实验期间可能会发生变化。

- [#9991](https://github.com/better-auth/better-auth/pull/9991) [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OIDC 提供商的 RP 发起注销端点（`/oauth2/endsession`）不再响应仅携带会话 Cookie 的跨站 GET 请求来注销用户或撤销其 OAuth 令牌。通过有效的 `id_token_hint` 进行身份验证的注销不受影响。

- [#10003](https://github.com/better-auth/better-auth/pull/10003) [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- Google One Tap 现在要求配置 Google 客户端 ID；如果未设置，则会拒绝登录回调。不再接受为其他应用签发的 Google ID 令牌。请在 `oneTap` 插件或 `socialProviders.google` 中设置客户端 ID。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 并发兑换时，同一个一次性令牌不再可能多次兑换为会话。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 同时从多个请求使用密码重置令牌时，不再可能多次更改密码。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 同时从多个请求提交相同的电话号码 OTP 时，不再可能多次登录，也不再可能获得超过尝试次数上限的额外尝试机会。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 并发请求不再可能绕过配置的速率限制。内存速率限制存储不再无限增长，数据库后端也会自行清理过期条目。自定义速率限制存储可以实现新的可选 `consume` 方法以严格执行限制；若未实现，则保留此前的行为并记录一次性警告。

- [#9987](https://github.com/better-auth/better-auth/pull/9987) [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8) 感谢 [@bytaesu](https://github.com/bytaesu)！- 删除团队不再会破坏其待处理邀请。已删除的团队会从这些邀请中移除，邀请对剩余团队或作为普通组织级邀请仍然有效。接受仍引用已不存在团队的邀请时会失败，但不会消耗该邀请。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加 `internalAdapter.reserveVerificationValue`。它会以原子方式记录单次使用标记（例如重放墓碑），确保多个并发调用者中只有一个成功，其余调用者会发现该标记已被占用。基于数据库的验证存储具有原子性；仅使用二级存储的验证则尽力而为。

- [#8760](https://github.com/better-auth/better-auth/pull/8760) [`8960f5f`](https://github.com/better-auth/better-auth/commit/8960f5f3bd2f0dccbfb768d69737d8a24d793a9e) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 会话刷新现在会避免因焦点和其他浏览器会话事件而重复发送 `/get-session` 请求。当重新获取的数据没有变化时，客户端钩子会保留稳定的数据引用，从而减少不必要的重新渲染。在会话请求进行中卸载时，也不再会导致会话状态卡在加载状态。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 同时从多个请求提交时，同一个 Sign-In with Ethereum nonce 不再可能被用于多次登录。

- [#9979](https://github.com/better-auth/better-auth/pull/9979) [`5c289b5`](https://github.com/better-auth/better-auth/commit/5c289b52bc166be3a36ec3c112b04195dc7621d8) 感谢 [@SferaDev](https://github.com/SferaDev)！- 无状态 OAuth 部署现在可以在不同服务器实例分别处理登录和后续请求后，读取账户信息、访问令牌和刷新令牌。在这种情况下，会话刷新也会保留 OAuth 账户 Cookie，而不是将其清除。

- [#9990](https://github.com/better-auth/better-auth/pull/9990) [`1dbf5bb`](https://github.com/better-auth/better-auth/commit/1dbf5bb59de5d628f0d07d5e846eba8287b831d7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强了多个流程中对请求可信度的处理。即使无法确定客户端 IP，现在也会执行速率限制，而不是跳过限制。未配置 `baseURL` 时，密码重置和验证链接会使用当前请求的主机，而不是服务器处理的第一个请求的主机；请求作用域内的 `trustedOrigins` 回调也不再影响其他并发请求。OAuth 代理、Google One Tap 和 Expo 授权代理会拒绝不在 `trustedOrigins` 中的重定向目标和回调目标。Google reCAPTCHA 和 Cloudflare Turnstile 接受可选的 `expectedAction` 和 `allowedHostnames`，以拒绝为不同操作或主机名签发的令牌。服务器端获取请求会拒绝其他保留的 IPv6 范围，格式错误的重定向参数则会返回 400，而不是 500。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 已过期的双因素登录挑战不再能通过有效的 TOTP、OTP 或备份代码完成登录；并发验证时，同一个挑战也不再能创建多个会话。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 同时从多个请求提交相同的双因素 OTP 时，不再可能多次登录，也不再可能获得超过尝试次数上限的额外尝试机会。

- [#9777](https://github.com/better-auth/better-auth/pull/9777) [`59e0ccb`](https://github.com/better-auth/better-auth/commit/59e0ccbedc6c336b1e77f71c62484d654fd2fca3) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 客户端 `updateSession` 调用现在接受从 `inferAdditionalFields` 推断出的自定义会话字段。

- [#9962](https://github.com/better-auth/better-auth/pull/9962) [`b803c61`](https://github.com/better-auth/better-auth/commit/b803c61fdcfc64be4e26bf6fa10953621f0070cc) 感谢 [@Bekacru](https://github.com/Bekacru)！- 更新组织成员时验证角色。现在会将角色规范化为单独的标记，并根据配置的静态角色和动态角色进行检查，因此未知或格式错误的角色值会被拒绝，而不是持久化。

- 已更新依赖项 [[`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`1dbf5bb`](https://github.com/better-auth/better-auth/commit/1dbf5bb59de5d628f0d07d5e846eba8287b831d7), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7)]：
  - @better-auth/memory-adapter@1.6.17
  - @better-auth/kysely-adapter@1.6.17
  - @better-auth/drizzle-adapter@1.6.17
  - @better-auth/prisma-adapter@1.6.17
  - @better-auth/mongo-adapter@1.6.17
  - @better-auth/core@1.6.17
  - @better-auth/telemetry@1.6.17

## 1.6.16

### Patch Changes

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 在 admin 插件中，通过专属权限保护用户受保护字段。现在，`/admin/create-user` 在提供 `role`（顶层或通过 `data.role`）时要求具备 `user:set-role` 权限，会根据配置的角色验证请求的角色，要求对通过 `data` 传入的封禁字段具备 `user:ban` 权限，并且不再允许 `data` 覆盖 `email`、`name` 或 `role`。现在，`/admin/update-user` 对 `banned`/`banReason`/`banExpires` 要求具备 `user:ban` 权限（封禁时会撤销用户的会话，并拒绝封禁自身），对 `email`/`emailVerified` 要求具备新的 `user:set-email` 权限（并进行邮箱验证、小写转换和唯一性检查），并拒绝 `password` 更新，要求改用 `/admin/set-user-password`。如果你使用自定义访问控制，请在 statements 中添加 `set-email`，并将其（以及 `ban`）授予应能通过 `update-user` 更改这些字段的角色。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 通过通用 OAuth 登录时，要求提供方账户 ID。此前，默认的 userinfo 处理器在提供方响应中没有 `sub`（或 `id`）时会回退为空字符串，而回调也从未检查解析出的账户 ID。对于某些省略 `sub` 的非 OIDC 提供方，账户可能会使用同一个空 ID 存储，之后的登录可能会解析到已有账户。现在，通用 OAuth 回调在无法解析账户 ID 时会拒绝登录，默认的 userinfo 处理器在既没有 `sub` 也没有 `id` 时不会返回个人资料，内置 OAuth 回调也会拒绝空账户 ID。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 将组织邀请中的团队 ID 限定为受邀组织所属。现在，`createInvitation` 无论是否设置 `teams.maximumMembersPerTeam`，都会验证每个请求的 `teamId` 是否属于邀请所属组织；`acceptInvitation` 在添加团队成员资格前，会再次检查每个已存储团队所属的组织。此前，在默认团队人数不受限制的情况下，可以将其他组织的团队 ID 存入邀请，并在接受邀请时应用。

- [#9973](https://github.com/better-auth/better-auth/pull/9973) [`87e7aa5`](https://github.com/better-auth/better-auth/commit/87e7aa5e0fd8f19b326beb5bec409a9ed1f245ca) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 即使请求不携带 Cookie，邮箱登录和注册现在也会根据 `trustedOrigins` 验证 `Origin` 或 `Referer` 标头。不发送 `Origin`/`Referer` 标头且没有 Fetch Metadata 的请求（例如 curl 或服务器到服务器的客户端）不受影响。发送了不受信任的 `Origin`/`Referer` 且不携带 Cookie 的非浏览器客户端，现在会收到 403，必须将该来源添加到 `trustedOrigins`。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 要求 `/refresh-token` 仅在账户 Cookie 中的 `userId`、`providerId` 以及（如有提供）`accountId` 与解析出的会话用户匹配时，才信任该 Cookie。

- [#9967](https://github.com/better-auth/better-auth/pull/9967) [`893cf6c`](https://github.com/better-auth/better-auth/commit/893cf6cb3f1f2669b39f6ac8d3d49cf830e5732e) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 删除会话后，如果同时启用了 Cookie 缓存和数据库或辅助存储，`/update-session` 以及账户令牌端点（`/get-access-token`、`/refresh-token`、`/account-info`）现在会立即停止接受该会话。此前，这些路由会继续从缓存的 Cookie 中提供已删除的会话，直到缓存过期。仅在 Cookie 中存储会话的部署不受影响。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 创建会话前，将 SIWE 签名消息绑定到服务器状态。此前，`/siwe/verify` 只检查钱包地址是否存在 nonce 记录，然后完全委托给 `verifyMessage`。由于文档中的 `verifyMessage`（viem）只进行签名恢复，不检查消息正文，因此，钱包针对其他消息（更早的 nonce、其他域名或任意内容）生成的签名，也可能通过针对新生成 nonce 的验证。

  现在，插件会自行解析 ERC-4361 消息，并要求其 nonce、域名、地址和链 ID 与服务器签发的 nonce 及配置的 `domain` 匹配，同时会在验证签名之前执行消息的 `Expiration Time` / `Not Before` 时间限制。现在，`message` 必须是有效的 ERC-4361 消息（所有标准 SIWE 客户端都会生成此类消息）；不符合规范或不匹配的消息会被拒绝，并返回 401（`UNAUTHORIZED_SIWE_MESSAGE_MISMATCH`、`UNAUTHORIZED_SIWE_MESSAGE_EXPIRED` 或 `UNAUTHORIZED_SIWE_MESSAGE_NOT_YET_VALID`）。`verifyMessage` 实现应继续只进行签名恢复。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 将 SSO 提供方 ID 与用于社交/OAuth 提供方的账户关联提供方命名空间分开。此前，注册的 SSO 提供方若 ID 与已配置的 `accountLinking.trustedProviders` 条目匹配（例如 `google`），就会被视为受信任的提供方，并可能隐式关联到使用相同邮箱的现有已验证账户。

  现在，SSO 注册会拒绝与已配置的社交提供方、`trustedProviders` 条目或保留内置 ID 冲突的提供方 ID。此外，OIDC 和 SAML 回调不再根据 `trustedProviders` 名称匹配来推断信任——SSO 信任仅由已验证的域名所有权（`domainVerified`）决定。`handleOAuthUserInfo` 新增了 `trustProviderByName` 选项（默认为 `true`，保留社交提供方的行为），SSO 插件会将其设为 `false`。

- [#9965](https://github.com/better-auth/better-auth/pull/9965) [`5e49c56`](https://github.com/better-auth/better-auth/commit/5e49c56a9e12a9b6b3fd1202bbc7a2fc97aeeafd) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 现在，向 `/update-session` 传入 `activeOrganizationId`、`activeTeamId` 或 `impersonatedBy` 会返回 400。请改用专用端点更改这些由插件管理的会话字段，例如 `organization.setActive`。

- 已更新依赖 [[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)]：
  - @better-auth/core@1.6.16
  - @better-auth/drizzle-adapter@1.6.16
  - @better-auth/kysely-adapter@1.6.16
  - @better-auth/memory-adapter@1.6.16
  - @better-auth/mongo-adapter@1.6.16
  - @better-auth/prisma-adapter@1.6.16
  - @better-auth/telemetry@1.6.16

## 1.6.15

### 补丁更新

- [#9875](https://github.com/better-auth/better-auth/pull/9875) [`1012b69`](https://github.com/better-auth/better-auth/commit/1012b690466ccd7078441dbfb406eef166fca805) 感谢 [@WilsonnnTan](https://github.com/WilsonnnTan)！- admin 插件的 `unbanUser`、`setRole` 和 `adminUpdateUser` 端点过去会调用 `internalAdapter.updateUser`，却不检查目标用户是否存在，因此调用者传入未知 ID 时，底层数据库错误（例如 Prisma 的 `P2025`）会作为通用 HTTP 500 冒出。现在，这些端点会与现有的 `banUser` 守卫保持一致：通过 `findUserById` 查找用户，如果没有返回记录，就抛出明确的 `NOT_FOUND`（`USER_NOT_FOUND`）。修复 [#9800](https://github.com/better-auth/better-auth/issues/9800)。

- [#9865](https://github.com/better-auth/better-auth/pull/9865) [`ad60333`](https://github.com/better-auth/better-auth/commit/ad60333d1517142d688c61b6ccee14b4c30864ae) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- list-session 端点现在要求进行 fresh-age 会话检查。

- [#9811](https://github.com/better-auth/better-auth/pull/9811) [`0933c05`](https://github.com/better-auth/better-auth/commit/0933c050ff8735466a273347c9aab0fdd8cd38ff) 感谢 [@zeroknowledge0x](https://github.com/zeroknowledge0x)！- 恢复与 Kysely 0.28 和 0.29 的 SQLite 方言自省兼容性。现在，这些方言会在本地镜像 Kysely 稳定的迁移表名称，从而避免 Turbopack 中严格的 ESM 构建失败，同时无需强制使用者升级到 Kysely 0.29。

- [#9919](https://github.com/better-auth/better-auth/pull/9919) [`b0ddfd3`](https://github.com/better-auth/better-auth/commit/b0ddfd3433cafac312ee99ec5fb7dbb9a240da35) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在整个 OAuth 登录流程中运行已配置的钩子

  现在，在 auth 实例上配置的 `hooks.before` / `hooks.after` 会在用户登录、选择账户或同意后继续进行的 OAuth 授权流程中运行。此前，这些钩子在该流程中会被跳过。

  `hooks.before` 设置标头或 Cookie 后返回自身响应时，这些标头或 Cookie 不再被丢弃；`hooks.after` 抛出 `APIError` 时，其 Cookie 和错误标头也不再丢失。

- 已更新依赖 []：
  - @better-auth/core@1.6.15
  - @better-auth/drizzle-adapter@1.6.15
  - @better-auth/kysely-adapter@1.6.15
  - @better-auth/memory-adapter@1.6.15
  - @better-auth/mongo-adapter@1.6.15
  - @better-auth/prisma-adapter@1.6.15
  - @better-auth/telemetry@1.6.15

## 1.6.14

### 补丁更新

- [#9877](https://github.com/better-auth/better-auth/pull/9877) [`2d9781a`](https://github.com/better-auth/better-auth/commit/2d9781a83ddc7b51ecffbd7d24c28e4b917e2323) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 恢复常规的邮件邀请流程，同时说明针对组织邀请的更严格验证要求。

  客户端的 `listUserInvitations` 现在始终要求会话邮箱已验证，因为它会从 `session.user.email` 枚举邀请 ID。`requireEmailVerificationOnInvitation` 选项现在控制携带邀请 ID 的收件人调用（`acceptInvitation`、`rejectInvitation`、`getInvitation`）。未设置时，Better Auth 会为内置的不透明邀请 ID 保留邮件邀请注册流程，包括默认生成器或 `advanced.database.generateId: "uuid"`；如果邀请 ID 由外部控制或可预测，例如 `advanced.database.generateId: "serial"` / `false` 或自定义 ID 生成方式，则要求邮箱已验证。如果应用会在受邀用户邮箱之外公开邀请 ID、向成员公开组织邀请列表，或要求更严格的所有权证明，应设置 `requireEmailVerificationOnInvitation: true`，或在登录前要求邮箱已验证。

- [#9841](https://github.com/better-auth/better-auth/pull/9841) [`5a2d642`](https://github.com/better-auth/better-auth/commit/5a2d642bc7d940f4242df9b304818a8653ea2a10) 感谢 [@bytaesu](https://github.com/bytaesu)！- 可选字段（`required: false`）现在接受 `null`，而不仅仅是省略。此前，生成的输入验证会拒绝 `null`，尽管列允许为空，因此无法通过传入 `null` 清除可空字段。

- [#9845](https://github.com/better-auth/better-auth/pull/9845) [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强 OAuth 提供方插件中的重定向 URI 验证。`isSafeUrlScheme` 和 `SafeUrlSchema` 不再调用 `URL.canParse`，因为某些受支持的运行时中没有该方法，调用它可能会抛出错误，或静默禁用危险方案检查。现在，它们会使用带 `try`/`catch` 的回退解析方式。根据 RFC 6749 §3.1.2，`SafeUrlSchema` 也会拒绝包含片段部分的重定向 URI。

- [#9806](https://github.com/better-auth/better-auth/pull/9806) [`9d3450a`](https://github.com/better-auth/better-auth/commit/9d3450ae23e8387d24adfb7bb1cb24cc6965b6e3) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当 `__Secure-` Cookie 和非安全 Cookie 同时存在时，`getSessionCookie` 现在会优先使用 `__Secure-` Cookie，因此非安全 Cookie 不再会覆盖当前会话 Cookie。

- 已更新依赖 [[`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - @better-auth/core@1.6.14
  - @better-auth/drizzle-adapter@1.6.14
  - @better-auth/kysely-adapter@1.6.14
  - @better-auth/memory-adapter@1.6.14
  - @better-auth/mongo-adapter@1.6.14
  - @better-auth/prisma-adapter@1.6.14
  - @better-auth/telemetry@1.6.14

## 1.6.13

### 次要更新

- [#9305](https://github.com/better-auth/better-auth/pull/9305) [`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 功能（oauth）：在 `signIn.social`、`linkSocial` 和 `signIn.sso` 中实现按请求传入 `additionalParams` 和 `loginHint`

  统一的扩展机制，用于按请求自定义提供商授权 URL。以前，Google 的 `access_type=offline` / `prompt=consent`、Cognito 的 `identity_provider=Google` 或 Microsoft 的 `domain_hint` 等动态参数只能通过静态服务器配置设置。

  ### 新增功能
  - `signIn.social`、`linkSocial` 和 `signIn.sso` 接受 `additionalParams: Record<string, string>`。这些值会作为查询参数追加到授权 URL。
  - `linkSocial` 也接受 `loginHint`，与 `signIn.social` 和 `signIn.sso` 的接口保持一致。
  - `OAuthProvider.createAuthorizationURL` 的输入契约新增 `additionalParams`；所有内置提供商都会将其传递给共享辅助函数。
  - Generic-OAuth 提供商会将调用时传入的 `additionalParams` 与配置级的 `authorizationUrlParams` 合并；键冲突时以调用时传入的值为准。
  - Cognito 提供类型化配置选项 `identityProvider?: string`，映射到 `identity_provider` 查询参数，无需使用魔法字符串。

  ### 安全性
  - 共享的 `createAuthorizationURL` 辅助函数会静默丢弃调用方提供的、位于 `RESERVED_AUTHORIZATION_PARAMS` 中的任何键（`state`、`client_id`、`redirect_uri`、`response_type`、`code_challenge`、`code_challenge_method`、`scope`）。请求体 Zod schema 也会以 400 错误拒绝相同的键，因此误用会在边界处显式暴露，而不是静默覆盖安全关键参数。
  - 使用非标准客户端标识符的提供商（`wechat` → `appid`、`tiktok` → `client_key`）也会过滤这些键，防止调用方替换已配置的 OAuth 应用。
  - 集成正常运行所需的提供商协议常量（`atlassian` → `audience`、`notion` → `owner`）会最后合并，因此调用方提供的 `additionalParams` 无法覆盖它们。代表操作员意图的已配置默认值（例如 Google 的 `include_granted_scopes`、Cognito 的 `identityProvider`）仍可由调用方覆盖。
  - 如果解析出的提供商是 SAML，`signIn.sso` 会以 400 错误拒绝 `additionalParams`；SAML AuthnRequest 已签名，无法携带调用方提供的查询参数，因此静默丢弃这些参数会误导集成方。

  ### OpenAPI
  - 在 OpenAPI 生成器中新增对 `ZodRecord` 的处理，使 `z.record()` 字段输出带有类型化 `additionalProperties` 的 `type: object`。顺带修复了一个长期存在的问题：`additionalData` 被渲染为 `type: string`。

  ### 重构
  - `discord`、`roblox`、`zoom` 和 `slack` 提供商现在会委托给共享的 `createAuthorizationURL` 辅助函数，并继承其 RFC 行为和保留键防护。
  - `tiktok` 和 `wechat` 保留手动构建 URL 的方式（因其 OAuth2 参数名称不标准且有 URL 片段要求），但会传递 `additionalParams`，并使用相同的保留键过滤器。

  修复 [#2351](https://github.com/better-auth/better-auth/issues/2351)。
  修复 [#5441](https://github.com/better-auth/better-auth/issues/5441)。
  修复 [#5592](https://github.com/better-auth/better-auth/issues/5592)。
  修复 [#5604](https://github.com/better-auth/better-auth/issues/5604)。
  取代 [#4992](https://github.com/better-auth/better-auth/issues/4992) 和 [#5443](https://github.com/better-auth/better-auth/issues/5443)。

- [#9657](https://github.com/better-auth/better-auth/pull/9657) [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 加固 `private_key_jwt` 和令牌端点客户端身份验证，并添加从结构上实现此修复所需的辅助函数。

  `@better-auth/core/oauth2` 现在导出 `encodeBasicCredentials` 和 `decodeBasicCredentials`，这对经过往返测试的函数遵循 RFC 6749 §2.3.1（对每个值进行 `application/x-www-form-urlencoded` 编码，仅在第一个 `:` 处分割）。解码器不区分大小写地接受方案名称，并按 RFC 7235 §2.1 容忍凭据前的一个或多个空格。客户端侧的 `client_secret_basic` 和服务器侧的 Better Auth OAuth 提供商都通过这些辅助函数处理，因此包含保留字符的凭据可以在整个调用链中正确往返，并且 `basic xxx` 或 `Basic  xxx` 这样的标头也能被接受。

  `createPrivateKeyJwtClientAssertionGetter` 会立即验证选项。不支持的算法（`HS256`、`none`）、不包含密钥材料的 JWK，以及显式 `algorithm` 与 JWK 内嵌的 `alg` 不一致，都会在构造时抛出错误，而不是等到首次令牌请求时才报错。`signPrivateKeyJwtClientAssertion` 对直接调用方也执行相同检查。**破坏性变更：**以前，配置中不支持的 JWK `alg` 与不同的显式 `algorithm` 配对时，会静默地使用显式选项进行签名；现在会在构造时失败。

  `@better-auth/oauth-provider` 会在 schema 层拒绝空的 `jwks` 载荷（`jwks: []` 和 `jwks: { keys: [] }`），使文档说明的客户端元数据契约与 `checkOAuthClient` 在运行时已实施的规则保持一致。Schema 使用方（TypeScript、OpenAPI、生成的 SDK）现在也能看到此约束。

  SSO `private_key_jwt` 流程会在 `resolvePrivateKey` 回调未返回 `privateKeyJwk` 或 `privateKeyPem` 时，通过重定向返回 `error_description=no_private_key_available`。此前，重定向路径只会在完全没有解析器时提前结束；解析器返回空值时则会继续执行，最终导致内部签名错误。

  `better-auth/test` 新增 `getHttpTestInstance`，它对应于 `getTestInstance`，会在操作系统分配的端口上绑定真实 HTTP 监听器，并根据检测到的 URL 创建 auth 实例。它消除了测试文件一直各自复制粘贴的“临时服务器再重新绑定”竞态问题。

### 补丁变更

- [#9301](https://github.com/better-auth/better-auth/pull/9301) [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 在 `GenericOAuthConfig` 和 SSO `OIDCConfig` 中添加 `allowIdpInitiated`，以支持不带 `state` 参数就发起 OAuth 的提供商（例如 Clever）。启用后，无状态回调会在服务器端使用新的 state 和 PKCE 重新启动 OAuth 流程，同时保留 CSRF 防护。还加固了 `parseState`，使其能够处理 GET 回调中未定义的请求体。

- [#9845](https://github.com/better-auth/better-auth/pull/9845) [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 加固 OAuth 提供商插件中的重定向 URI 验证。`isSafeUrlScheme` 和 `SafeUrlSchema` 不再调用 `URL.canParse`；某些受支持的运行时中不存在此方法，调用时可能抛出异常或静默禁用危险方案检查。现在改用 `try`/`catch` 回退方式进行解析。`SafeUrlSchema` 还会根据 RFC 6749 §3.1.2 拒绝包含片段部分的重定向 URI。

- 已更新依赖项 [[`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8)、[`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2)、[`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a)、[`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - @better-auth/core@1.7.0-beta.4
  - @better-auth/drizzle-adapter@1.7.0-beta.4
  - @better-auth/kysely-adapter@1.7.0-beta.4
  - @better-auth/memory-adapter@1.7.0-beta.4
  - @better-auth/mongo-adapter@1.7.0-beta.4
  - @better-auth/prisma-adapter@1.7.0-beta.4
  - @better-auth/telemetry@1.7.0-beta.4

## 1.7.0-beta.3

### 次要变更

- [#8733](https://github.com/better-auth/better-auth/pull/8733) [`4e8e4c7`](https://github.com/better-auth/better-auth/commit/4e8e4c7fc5fb2723144cbf41c4a1bfa28de8d671) 感谢 [@bytaesu](https://github.com/bytaesu)! - 添加 `hydrateSession`，用服务器获取的会话为客户端预置数据，使 `useSession` 在首次渲染时就返回数据。

- [#9431](https://github.com/better-auth/better-auth/pull/9431) [`523f95c`](https://github.com/better-auth/better-auth/commit/523f95c10db24b790bbd75fe85c86c34d3465267) 感谢 [@pi0](https://github.com/pi0)! - 功能：使 `Auth` 实例可供 fetch 调用

- [#9240](https://github.com/better-auth/better-auth/pull/9240) [`729c00d`](https://github.com/better-auth/better-auth/commit/729c00d74c94f558893da1e3a9ee86451d1b23da) 感谢 [@adrianmxb](https://github.com/adrianmxb)! - 功能（username）：添加不可变用户名选项

  这样，用户可以在注册或首次更新时设置用户名，但之后无法将其更改为其他值。用户仍可更新其他个人资料字段。

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-beta.3
  - @better-auth/drizzle-adapter@1.7.0-beta.3
  - @better-auth/kysely-adapter@1.7.0-beta.3
  - @better-auth/memory-adapter@1.7.0-beta.3
  - @better-auth/mongo-adapter@1.7.0-beta.3
  - @better-auth/prisma-adapter@1.7.0-beta.3
  - @better-auth/telemetry@1.7.0-beta.3

## 1.7.0-beta.2

### 次要变更

- [#8977](https://github.com/better-auth/better-auth/pull/8977) [`954b664`](https://github.com/better-auth/better-auth/commit/954b664f4f251f8dd028451dab3ab43067dbf890) 感谢 [@ruban-s](https://github.com/ruban-s)! - 允许向 `listUserTeams` API 传入 `userId` 和 `organizationId`。`userId` 允许调用方列出组织其他成员的团队（受 `member:update` 权限控制）。`organizationId` 可将结果限定到特定组织，而无需切换会话的当前组织，与 `addTeamMember`/`removeTeamMember` 使用的模式一致。

### 补丁变更

- [#9205](https://github.com/better-auth/better-auth/pull/9205) [`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 修复（two-factor）：撤销 [#9122](https://github.com/better-auth/better-auth/issues/9122) 对强制执行范围的扩大

  恢复 [#9122](https://github.com/better-auth/better-auth/issues/9122) 之前的强制执行范围。仅在 `/sign-in/email`、`/sign-in/username` 和 `/sign-in/phone-number` 上要求进行 2FA 验证，与 v1.6.2 发布时的行为一致。非凭据登录流程（magic link、email OTP、OAuth、SSO、passkey、SIWE、one-tap、phone-number OTP、device authorization、email-verification auto-sign-in）默认不再要求通过 2FA 挑战。

  计划在未来的次要版本中扩大强制执行范围，增加按方法退出的选项，并与 NIST SP 800-63B-4 身份验证器保证级别保持一致。

- [#9068](https://github.com/better-auth/better-auth/pull/9068) [`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09) 感谢 [@GautamBytes](https://github.com/GautamBytes)! - 修复当 `advanced.database.generateId` 设置为 `"uuid"` 时，PostgreSQL 适配器会忽略 create hooks 强制指定的 UUID 用户 ID 的问题。

- [#9165](https://github.com/better-auth/better-auth/pull/9165) [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 杂项（adapters）：要求使用已修补的 `drizzle-orm` 和 `kysely` 对等依赖版本

  将 `drizzle-orm` 对等依赖范围收窄为 `^0.45.2`，将 `kysely` 对等依赖范围收窄为 `^0.28.14`。这两个新范围都限定在包含漏洞修复的次要版本线，不包含更新版本，因此适配器只会声明支持经过实际测试的版本。使用较旧 ORM 版本的用户会在安装时收到警告，可以与适配器一同升级；该对等依赖标记为可选，因此安装不会硬性失败。

- 已更新依赖项 [[`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - @better-auth/drizzle-adapter@1.7.0-beta.2
  - @better-auth/kysely-adapter@1.7.0-beta.2
  - @better-auth/core@1.7.0-beta.2
  - @better-auth/memory-adapter@1.7.0-beta.2
  - @better-auth/mongo-adapter@1.7.0-beta.2
  - @better-auth/prisma-adapter@1.7.0-beta.2
  - @better-auth/telemetry@1.7.0-beta.2

## 1.7.0-beta.1

### 次要变更

- [#9069](https://github.com/better-auth/better-auth/pull/9069) [`c7d2253`](https://github.com/better-auth/better-auth/commit/c7d22539ec4f7322d9625ae2953d397c3863d097) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 将通用 OAuth 插件重写为一流的社交提供商，并采用 OAuth 2.1 安全默认值。提供商现在使用 `signIn.social` + `callback/:id`，而不是专用插件端点；默认要求 PKCE（OAuth 2.1），验证 RFC 9207 issuer，通过注入 `openid` scope 自动发现 OIDC，并使用类型化的提供商 ID。

  **破坏性变更：**
  - `signIn.oauth2({ providerId })` 替换为 `signIn.social({ provider })`
  - `oauth2.link()` 替换为 `linkSocial()`
  - 回调 URL 从 `/api/auth/oauth2/callback/:id` 更改为 `/api/auth/callback/:id`
  - 移除 `genericOAuthClient()`；通用 OAuth 提供商现在使用标准社交客户端 API
  - `pkce` 默认值变为 `true`（之前为 `false`）；对于拒绝 PKCE 的提供商，请设置 `pkce: false`
  - `authorizationUrlParams` 和 `tokenUrlParams` 仅接受 `Record<string, string>`
  - 移除 `issuer` 和 `requireIssuerValidation` 配置字段；通过 OIDC discovery 自动进行 issuer 验证
  - `mapProfileToUser` 的 profile 类型为 `OAuth2UserInfo & Record<string, unknown>`

- [#9079](https://github.com/better-auth/better-auth/pull/9079) [`6f2948e`](https://github.com/better-auth/better-auth/commit/6f2948e87bb5fa14bd2174a91f7143e1eced1b87) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 功能（oauth-provider）：根据 OIDC Core §3.1.3.6 在 ID token 中计算 `at_hash`

  与 access token 一同签发的 ID token 现在包含 `at_hash` 声明，该声明会以加密方式绑定这两个 token，防止 token 替换攻击。哈希算法根据实际签名密钥的算法选择（EdDSA/Ed25519 使用 SHA-512，RS/ES/PS384 使用 SHA-384，RS/ES/PS512 使用 SHA-512，其他算法均使用 SHA-256）。

  `better-auth/plugins` 现在导出新的 `resolveSigningKey()`，用于解析当前 JWKS 签名密钥（包括其算法）。使用自定义 `jwt.sign` 回调时，会根据声明的算法验证签名后 ID token 的标头，以防止 `at_hash` 不匹配。

### 补丁变更

- [#9131](https://github.com/better-auth/better-auth/pull/9131) [`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 强化直接调用 `auth.api.*` 和插件元数据辅助函数时对动态 `baseURL` 的处理

  **直接调用 `auth.api.*`**
  - 当无法解析 baseURL（没有来源且没有 `fallback`）时，抛出带有明确消息的 `APIError`，而不是将 `ctx.context.baseURL = ""` 留给下游插件，导致其崩溃。
  - 将直接 API 路径上的 `allowedHosts` 不匹配转换为 `APIError`。
  - 在动态路径上遵循 `advanced.trustedProxyHeaders`（默认值为 `true`，保持不变）。此前，配合 `allowedHosts` 时会无条件信任 `x-forwarded-host` / `-proto`；现在它们会经过与静态路径相同的检查。后续 PR 会将默认值改为 `false`。
  - `resolveRequestContext` 每次调用都会重新加载 `trustedProviders` 和 cookies（此外还有 `trustedOrigins`）。当没有完整的 `Request` 可用时，用户定义的 `trustedOrigins(req)` / `trustedProviders(req)` 回调会接收一个根据转发标头合成的 `Request`。
  - 在仅使用标头的协议回退路径中，为环回主机（`localhost`、`127.0.0.1`、`[::1]`、`0.0.0.0`）推断协议为 `http`，避免本地开发调用静默解析为 `https://localhost:3000`。
  - `hasRequest` 使用 `isRequestLike`；后者现在会拒绝伪造 `Symbol.toStringTag`、但不具备真实 `url` / `headers.get` 结构的对象。

  **插件元数据辅助函数**
  - `oauthProviderAuthServerMetadata`、`oauthProviderOpenIdConfigMetadata`、`oAuthDiscoveryMetadata` 和 `oAuthProtectedResourceMetadata` 会将传入的请求转发给链式调用的 `auth.api`，因此在动态配置下，`issuer` 和发现 URL 会反映请求主机。
  - `withMcpAuth` 会将传入的请求转发给 `getMcpSession`，传递 `trustedProxyHeaders`，并在无法解析 `baseURL` 时发出不带参数的 `Bearer` challenge（而不是 `Bearer resource_metadata="undefined/..."`）。
  - `@better-auth/oauth-provider` 中的 `metadataResponse` 会通过 `new Headers()` 规范化标头，使调用方可以传入 `Headers`、元组数组或记录，而不会导致条目被静默丢弃。

- [#9122](https://github.com/better-auth/better-auth/pull/9122) [`484ce6a`](https://github.com/better-auth/better-auth/commit/484ce6a262c39b9c1be91d37774a2a13de3a5a1f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 修复（双因素）：在所有登录路径上强制执行 2FA

  现在，2FA 后置钩子会在任何创建新会话的端点上触发，涵盖 magic-link、OAuth、passkey、email-OTP、SIWE 以及所有未来的登录方式。已认证请求（会话刷新、个人资料更新）不受影响。

- [#7231](https://github.com/better-auth/better-auth/pull/7231) [`f875897`](https://github.com/better-auth/better-auth/commit/f8758975ae475429d56b34aa6067e304ee973c8f) 感谢 [@Byte-Biscuit](https://github.com/Byte-Biscuit)！ - 修复（双因素）：验证后保留备用码的存储格式

  使用备用码后，剩余码现在会按照用户配置的相同 `storeBackupCodes` 策略（明文、加密或自定义）重新保存。此前，无论存储模式为何，代码都会始终使用内置的对称加密重新加密，这会导致明文或自定义存储模式下后续验证失败。

- [#9078](https://github.com/better-auth/better-auth/pull/9078) [`9a6d475`](https://github.com/better-auth/better-auth/commit/9a6d4759cd4451f0535d53f171bcfc8891c41db7) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 修复（客户端）：避免 `isMounted` 竞态条件导致大量 rps

- [#9113](https://github.com/better-auth/better-auth/pull/9113) [`513dabb`](https://github.com/better-auth/better-auth/commit/513dabb132e2c08a5b6d3b7e88dd397fcd66c1af) 感谢 [@bytaesu](https://github.com/bytaesu)！ - 在直接调用 `auth.api` 时，根据请求标头解析动态 `baseURL`

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-beta.1
  - @better-auth/drizzle-adapter@1.7.0-beta.1
  - @better-auth/kysely-adapter@1.7.0-beta.1
  - @better-auth/memory-adapter@1.7.0-beta.1
  - @better-auth/mongo-adapter@1.7.0-beta.1
  - @better-auth/prisma-adapter@1.7.0-beta.1
  - @better-auth/telemetry@1.7.0-beta.1

## 1.7.0-beta.0

### 次要更改

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 在整个技术栈中添加 `private_key_jwt`（RFC 7523）客户端身份验证。服务器使用非对称密钥验证 JWT 客户端断言；客户端则在授权码、刷新令牌和客户端凭据流程中对其进行签名。

- [#9057](https://github.com/better-auth/better-auth/pull/9057) [`544f1c6`](https://github.com/better-auth/better-auth/commit/544f1c63c9826831d96a126fbe568d8a8a8fde68) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 功能（双因素）！：添加仅 OTP 启用方式并移除 `skipVerificationOnEnable`

  `enableTwoFactor` 现在接受一个 `method` 参数（`"otp" | "totp"`，默认值为 `"totp"`），并返回带有 `method` 字段的判别式响应。

  ### `method: "otp"`
  - 立即设置 `twoFactorEnabled: true`。
  - 返回 `{ method: "otp" }`。
  - 要求服务器配置 `otpOptions.sendOTP`；否则会以 `OTP_NOT_CONFIGURED` 拒绝。

  ### `method: "totp"`（默认）
  - 返回 `{ method: "totp", totpURI, backupCodes }`。
  - 如果设置了 `totpOptions.disable`，则以 `TOTP_NOT_CONFIGURED` 拒绝。

  ### 破坏性更改
  - **已移除 `skipVerificationOnEnable`**：需要立即激活时使用 `method: "otp"`，否则使用标准 TOTP 验证流程。
  - **响应结构已更改**：`enableTwoFactor` 的响应中包含 `method` 字段（`"otp"` 或 `"totp"`）。

### 补丁更改

## 1.6.10

### 补丁更改

- [#8339](https://github.com/better-auth/better-auth/pull/8339) [`1e0f26d`](https://github.com/better-auth/better-auth/commit/1e0f26d4c83608d14a533f33458ade0f8504fd16) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 修复（验证码）：导致 email-otp 流程中断

- [#9484](https://github.com/better-auth/better-auth/pull/9484) [`8c1e917`](https://github.com/better-auth/better-auth/commit/8c1e91757d91d103c332e90201c39ce5892c37e8) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 修复：警告 cookie-plugin 是数组中的最后一项

- [#9437](https://github.com/better-auth/better-auth/pull/9437) [`b2d655c`](https://github.com/better-auth/better-auth/commit/b2d655c77c7c627ada17456d1de106fdce6fa18e) 感谢 [@cyphercodes](https://github.com/cyphercodes)！ - 允许组织邀请角色输入类型接受动态访问控制角色。

- [#9497](https://github.com/better-auth/better-auth/pull/9497) [`09f1327`](https://github.com/better-auth/better-auth/commit/09f1327acb9c6bbfeb272dc62c7013172cf33153) 感谢 [@bytaesu](https://github.com/bytaesu)！ - 设置 cookie 后再重定向的端点（例如社交登录回调和 magic-link 验证）现在不会在响应中将每个 `Set-Cookie` 条目重复输出两次。

- [#9387](https://github.com/better-auth/better-auth/pull/9387) [`906b7b3`](https://github.com/better-auth/better-auth/commit/906b7b34a710d49798e166395da2bcd2be13ef46) 感谢 [@bytaesu](https://github.com/bytaesu)！ - bearer 插件现在在将其会话令牌合并到请求 `Cookie` 标头时，每个 cookie 名称只会生成一个条目。此前，如果请求中已有过期的会话 cookie，合并后的标头可能会包含同名的两个条目，这会影响选择第一个匹配项的下游代码。

- [#9475](https://github.com/better-auth/better-auth/pull/9475) [`e9c978e`](https://github.com/better-auth/better-auth/commit/e9c978e2af9e61d35f50fd040305cbb8fdda32ba) 感谢 [@jaydeep-pipaliya](https://github.com/jaydeep-pipaliya)！ - 修复（用户名）：遵循 `/sign-in/username` 中的 callbackURL

  该端点接受 `callbackURL` 请求体字段，但会忽略它，因此 `authClient.signIn.username({ ..., callbackURL })` 会静默失效，而 `authClient.signIn.email` 则能按预期重定向。现在，处理程序会在提供 `callbackURL` 时设置 `Location` 标头，并在 `token`/`user` 之外返回 `{ redirect, url }`，与 email 流程保持一致。

- [#9440](https://github.com/better-auth/better-auth/pull/9440) [`e71aad3`](https://github.com/better-auth/better-auth/commit/e71aad3b6d67502cfb770fa8890f3ab58c537114) 感谢 [@cyphercodes](https://github.com/cyphercodes)！ - 登出后清除组织活动钩子状态，避免 `useActiveMemberRole` 在 SPA 登出/登录流程中保留上一位用户的角色。

- [#9402](https://github.com/better-auth/better-auth/pull/9402) [`80a655d`](https://github.com/better-auth/better-auth/commit/80a655d271dcae5f785a70f13be60f80fb828cf1) 感谢 [@onmax](https://github.com/onmax)！ - 管理员模拟身份开始或结束后，重新验证客户端会话。

- [#9503](https://github.com/better-auth/better-auth/pull/9503) [`15ff28a`](https://github.com/better-auth/better-auth/commit/15ff28a957a18df8ecd2aa08d66b94c91ae9a6a4) 感谢 [@bytaesu](https://github.com/bytaesu)！ - `internalAdapter.deleteAccount` 参数从 `accountId` 重命名为 `id`，以反映其按主键查询，而不是按 `accountId` 列查询。运行时行为没有变化。

- [#9268](https://github.com/better-auth/better-auth/pull/9268) [`88a7c67`](https://github.com/better-auth/better-auth/commit/88a7c678f4db3f7da580d53071b2595b92354a45) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 修复：POST /sign-in/social 的 openAPI 架构错误地声明了必需字段

- [#8839](https://github.com/better-auth/better-auth/pull/8839) [`9a7b51d`](https://github.com/better-auth/better-auth/commit/9a7b51d0d3dfbc6b2697fe5f9edd0bb480bdf89b) 感谢 [@dipan-ck](https://github.com/dipan-ck)！ - 当 `emailAndPassword.autoSignIn` 为 false 时应用邮箱枚举保护。重复注册现在会返回合成用户（`token: null`）并触发 `onExistingUserSignUp`；新注册则会跳过自动登录（`token: null`）——即使未启用 `requireEmailVerification` 也如此，与文档一致。

- [#9065](https://github.com/better-auth/better-auth/pull/9065) [`1b25902`](https://github.com/better-auth/better-auth/commit/1b259024dcd1bbbc08559ee057f22c01929a72a7) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 通用 OAuth 回调路由中的非 ASCII error_description 会在重定向时导致 TypeError

- [#9349](https://github.com/better-auth/better-auth/pull/9349) [`cf59136`](https://github.com/better-auth/better-auth/commit/cf591360e72a8d01741618cd61cdeea84cf8398a) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 修复（组织）：重新导出字段类型，以避免使用 additionalFields 时出现 TS2742

- [#9453](https://github.com/better-auth/better-auth/pull/9453) [`a597ee0`](https://github.com/better-auth/better-auth/commit/a597ee01ed4e6d85aba5ee9f15100acc578390d9) 感谢 [@mausic](https://github.com/mausic)！ - 组织插件的 `cancelPendingInvitationsOnReInvite` 选项现在会在重新邀请同一邮箱时，实际取消此前待处理的邀请。此前该选项不起作用——重新邀请始终会因 `USER_IS_ALREADY_INVITED_TO_THIS_ORGANIZATION` 而失败

- [#9456](https://github.com/better-auth/better-auth/pull/9456) [`fc02ced`](https://github.com/better-auth/better-auth/commit/fc02cedb708e2b5987a177539a903cc35155a426) 感谢 [@cyphercodes](https://github.com/cyphercodes)！ - 当 OAuth 提供方用户信息缺少账户 ID 时拒绝回调，以避免将账户关联到字面值为 `undefined` 的 ID。

- [#9461](https://github.com/better-auth/better-auth/pull/9461) [`9f1ef1f`](https://github.com/better-auth/better-auth/commit/9f1ef1f7e5500e0b3dbe2a18e25e3519847cd7a9) 感谢 [@cyphercodes](https://github.com/cyphercodes)！ - 将 `authClient.siwe.getNonce()` 暴露为 SIWE nonce 端点的兼容别名。

- [#9369](https://github.com/better-auth/better-auth/pull/9369) [`36ef808`](https://github.com/better-auth/better-auth/commit/36ef808c6cedec6eeb9a3a4e6790e0ab46d96ff3) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 修复：one-tap、email-otp 和邮箱验证中的邮箱大小写错误

- [#9239](https://github.com/better-auth/better-auth/pull/9239) [`c1336c5`](https://github.com/better-auth/better-auth/commit/c1336c563d45f93ca3fd4da4e6c767fc267d86d0) 感谢 [@GautamBytes](https://github.com/GautamBytes)！ - 修复 `organization.setActiveTeam`，使其只接受当前活动组织中的团队。

- [#7764](https://github.com/better-auth/better-auth/pull/7764) [`3a9a2c3`](https://github.com/better-auth/better-auth/commit/3a9a2c37eeab1d0c98845a47642d4dc27fe54ceb) 感谢 [@programming-with-ia](https://github.com/programming-with-ia)！ - 内务处理：在内部适配器上暴露 refreshUserSessions

- [#9521](https://github.com/better-auth/better-auth/pull/9521) [`fde0432`](https://github.com/better-auth/better-auth/commit/fde043207ef3d5a5e1f74aa5ddabf77d523d52d4) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 修复：改善链接的无障碍问题

- 已更新依赖项 [[`2220a6d`](https://github.com/better-auth/better-auth/commit/2220a6d6c25ebd24c8568131636389dc0c12f82b)]：
  - @better-auth/core@1.6.10
  - @better-auth/drizzle-adapter@1.6.10
  - @better-auth/kysely-adapter@1.6.10
  - @better-auth/memory-adapter@1.6.10
  - @better-auth/mongo-adapter@1.6.10
  - @better-auth/prisma-adapter@1.6.10
  - @better-auth/telemetry@1.6.10

## 1.6.9

### 补丁更改

- 已更新依赖项 [[`815ecf6`](https://github.com/better-auth/better-auth/commit/815ecf62b6f6c5bf656ab55da393ce63d7eed0a6)]：
  - @better-auth/core@1.6.9
  - @better-auth/drizzle-adapter@1.6.9
  - @better-auth/kysely-adapter@1.6.9
  - @better-auth/memory-adapter@1.6.9
  - @better-auth/mongo-adapter@1.6.9
  - @better-auth/prisma-adapter@1.6.9
  - @better-auth/telemetry@1.6.9

## 1.6.8

### 补丁更改

- [#9253](https://github.com/better-auth/better-auth/pull/9253) [`856ab24`](https://github.com/better-auth/better-auth/commit/856ab2426c0dce7377ee1ca26dbb7d9e52fb6429) 感谢 [@baptisteArno](https://github.com/baptisteArno)！- 修复（organization）：允许通过 `beforeCreateTeam` 和 `beforeCreateInvitation` 传递 id

  对于团队和邀请，这与 [#4765](https://github.com/better-auth/better-auth/issues/4765) 相对应：`adapter.createTeam` 和 `adapter.createInvitation` 现在会传递 `forceAllowId: true`，因此相应钩子返回的 id 会在数据库插入后保留。

- [#9331](https://github.com/better-auth/better-auth/pull/9331) [`9aa8e63`](https://github.com/better-auth/better-auth/commit/9aa8e63de84549634216e13e407cf6d8aa61acc3) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复（oauth）：为可能不返回电子邮件的提供商支持 `mapProfileToUser` 回退

  对于可能不返回电子邮件地址的 OAuth 提供商（仅使用手机号的 Discord 账号、Apple 后续登录、GitHub 私有邮箱、Facebook、LinkedIn，以及 Microsoft Entra ID 管理的用户），现在可以在 `mapProfileToUser` 中合成电子邮件，从而解除社交登录限制。拒绝日志消息现在会指向此变通方案以及新的["处理不提供电子邮件的提供商"](https://www.better-auth.com/docs/concepts/oauth#handling-providers-without-email)文档章节。

  提供商个人资料类型现在反映了 `email` 可能为 `null` 或缺失的情况：
  - `DiscordProfile.email` 为 `string | null`，且是可选属性（未授予 `email` scope 时缺失）
  - `AppleProfile.email` 为可选属性
  - `GithubProfile.email` 为 `string | null`
  - `FacebookProfile.email` 为可选属性
  - `FacebookProfile.email_verified` 为可选属性（Meta 的 Graph API 不包含此字段）
  - `LinkedInProfile.email` 为可选属性
  - `LinkedInProfile.email_verified` 为可选属性
  - `MicrosoftEntraIDProfile.email` 为可选属性

  之前在 `mapProfileToUser` 中直接解引用 `profile.email` 的 TypeScript 使用者会看到与运行时实际情况相符的编译错误；请使用空值合并回退（`profile.email ?? ...`）或对该字段进行空值检查。

  当提供商和 `mapProfileToUser` 都未生成电子邮件时，登录仍会返回 `error=email_not_found`（社交回调）或 `error=email_is_missing`（Generic OAuth 插件）。针对没有电子邮件的用户提供一等支持，并按 OpenID Connect Core §5.7 以 `(providerId, accountId)` 为键进行标识的工作，已在 [#9124](https://github.com/better-auth/better-auth/issues/9124) 中跟踪。

- 已更新依赖项 [[`9aa8e63`](https://github.com/better-auth/better-auth/commit/9aa8e63de84549634216e13e407cf6d8aa61acc3)]：
  - @better-auth/core@1.6.8
  - @better-auth/drizzle-adapter@1.6.8
  - @better-auth/kysely-adapter@1.6.8
  - @better-auth/memory-adapter@1.6.8
  - @better-auth/mongo-adapter@1.6.8
  - @better-auth/prisma-adapter@1.6.8
  - @better-auth/telemetry@1.6.8

## 1.6.7

### 补丁更新

- [#9211](https://github.com/better-auth/better-auth/pull/9211) [`307196a`](https://github.com/better-auth/better-auth/commit/307196a405e067f4a863de2ed68528e8d4bdc162) 感谢 [@stewartjarod](https://github.com/stewartjarod)！- 当端点抛出 `APIError` 时，保留累积在 `ctx.responseHeaders` 上的 `Set-Cookie` 标头。来自 `deleteSessionCookie` 的 Cookie 副作用（以及抛出前任何 `ctx.setCookie` / `ctx.setHeader` 调用）不再会在错误路径中被悄然丢弃。

- [#9292](https://github.com/better-auth/better-auth/pull/9292) [`4f373ee`](https://github.com/better-auth/better-auth/commit/4f373eed8a42e02460dbd2ee9973b9493cea04eb) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在通过受众验证 ID 令牌的提供商（Google、Apple、Microsoft Entra、Facebook、Cognito）上接受 Client ID 数组。授权码流程使用第一个条目；验证 ID 令牌的 `aud` 声明时接受所有条目，因此单个后端可以通过各自平台专用的 Client ID 为 Web、iOS 和 Android 客户端提供服务。

  ```ts
  socialProviders: {
    google: {
      clientId: [
        process.env.GOOGLE_WEB_CLIENT_ID!,
        process.env.GOOGLE_IOS_CLIENT_ID!,
        process.env.GOOGLE_ANDROID_CLIENT_ID!,
      ],
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  }
  ```

  传入单个字符串仍可正常工作；无需迁移。

  还从 `@better-auth/core/oauth2` 导出了 `getPrimaryClientId`，供提供商作者使用：它返回主要 Client ID（原始字符串，或数组索引 0 处的条目），与授权码流程的 `clientSecret` 配对。现在，提供商会在登录时拒绝空数组、空字符串和缺失的配置，而不再悄然生成格式错误的授权 URL。Google、Apple 和 Facebook 都要求同时提供 `clientId` 和 `clientSecret`，因为这些提供商都要求在服务端进行代码交换时使用客户端密钥。Microsoft Entra 和 Cognito 只要求 `clientId`，因为两者都支持仅使用 PKCE 的公共客户端流程（无需密钥）。

- [#9293](https://github.com/better-auth/better-auth/pull/9293) [`e1b1cfc`](https://github.com/better-auth/better-auth/commit/e1b1cfc7a262c8bf0c383a7b2b1d140472d33e56) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 `parseState` 中防护 `c.body` 未定义的情况。在某些运行时中，以 GET 方式到达的回调请求不会设置 `c.body`，导致现有错误重定向执行前，`c.body.state` 就抛出 `TypeError`。现在状态查询会先检查查询参数，并安全地回退到 `c.body?.state`，因此缺少状态参数的回调会重定向到错误页面，而不是崩溃。

- [#4894](https://github.com/better-auth/better-auth/pull/4894) [`d053a45`](https://github.com/better-auth/better-auth/commit/d053a4583e0db9132e52a100ae33e13d040a6bae) 感谢 [@Kinfe123](https://github.com/Kinfe123)！- 当通过 `updatePhoneNumber: true` 验证电话号码时触发 `callbackOnVerification`。此前回调只会在首次验证时运行，因此依赖它的使用者（例如，用于将已验证号码同步到外部系统）会错过已登录用户更改号码时的事件。

- 已更新依赖项 [[`307196a`](https://github.com/better-auth/better-auth/commit/307196a405e067f4a863de2ed68528e8d4bdc162)、[`4a180f0`](https://github.com/better-auth/better-auth/commit/4a180f0b0c084c59e7b006058d3fdbd8542face5)、[`4f373ee`](https://github.com/better-auth/better-auth/commit/4f373eed8a42e02460dbd2ee9973b9493cea04eb)]：
  - @better-auth/core@1.6.7
  - @better-auth/drizzle-adapter@1.6.7
  - @better-auth/kysely-adapter@1.6.7
  - @better-auth/memory-adapter@1.6.7
  - @better-auth/mongo-adapter@1.6.7
  - @better-auth/prisma-adapter@1.6.7
  - @better-auth/telemetry@1.6.7

## 1.6.6

### 补丁更新

- [#9214](https://github.com/better-auth/better-auth/pull/9214) [`4debfb6`](https://github.com/better-auth/better-auth/commit/4debfb600ff448f3e63ed242a2fb5a2c41654be1) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复（custom-session）：在验证 disableRefresh 查询参数时使用强制转换后的布尔值

- [#9235](https://github.com/better-auth/better-auth/pull/9235) [`9ea7eb1`](https://github.com/better-auth/better-auth/commit/9ea7eb1eab28d50d40836ab4e2cbe5a81c4da1aa) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当 `customSession` 插件和框架集成转发 `Set-Cookie` 标头时，保留 `Partitioned` 属性。

- [#9266](https://github.com/better-auth/better-auth/pull/9266) [`ab4c10f`](https://github.com/better-auth/better-auth/commit/ab4c10fbc09defcd851d614acecc111cc114b543) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复（organization）：正确推断团队附加字段

- [#9219](https://github.com/better-auth/better-auth/pull/9219) [`a61083e`](https://github.com/better-auth/better-auth/commit/a61083e023163d0a14d9e886ce556ba459677428) 感谢 [@bytaesu](https://github.com/bytaesu)！- 允许通过 `updateUser({ phoneNumber: null })` 移除电话号码。已验证标志会以原子方式重置。更改为不同的号码仍需要通过 `verify({ updatePhoneNumber: true })` 进行 OTP 验证。

- [#9226](https://github.com/better-auth/better-auth/pull/9226) [`e64ff72`](https://github.com/better-auth/better-auth/commit/e64ff720fb8514cb78aedd1660223d8b948284da) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将主机/IP 分类统一到 `@better-auth/core/utils/host`，并修复了此前各包的正则表达式检查遗漏的多个回环/SSRF 绕过问题。

  **Electron 用户图片代理：已修复 SSRF 绕过问题（`@better-auth/electron`）。** `fetchUserImage` 以前使用自定义 IPv4/IPv6 正则表达式限制出站请求，但该表达式遗漏了多个攻击向量。以下地址此前均可在生产环境中访问，现在已被拦截：
  - `http://tenant.localhost/` 及其他 `*.localhost` 名称（RFC 6761 将整个顶级域保留用于回环）。
  - `http://[::ffff:169.254.169.254]/`（映射到 IPv4 地址的 IPv6 指向 AWS IMDS，是经典的 SSRF 绕过方式）。
  - `http://metadata.google.internal/`、`http://metadata.goog/`（GCP 实例元数据）。
  - `http://instance-data/`、`http://instance-data.ec2.internal/`（AWS IMDS 的备用 FQDN）。
  - `http://100.100.100.200/`（Alibaba Cloud IMDS；位于 RFC 6598 共享地址空间 `100.64/10`，旧正则表达式未涵盖该范围）。
  - `http://0.0.0.0:PORT/`（Linux/macOS 内核会将未指定地址路由到回环：Oligo 的“0.0.0.0 Day”）。
  - `http://[fc00::...]/`、`http://[fd00::...]/`（符合 RFC 4193 的 IPv6 ULA）以及 IPv6 链路本地地址 `fe80::/10`，旧正则表达式均无法识别。

  文档专用地址范围（RFC 5737 / RFC 3849）、基准测试地址（`198.18/15`）、多播地址和广播地址现在也会被拒绝。

  **`better-auth`：不再将 `0.0.0.0` 视为回环地址。** `packages/better-auth/src/utils/url.ts` 中此前的 `isLoopbackHost` 实现将 `0.0.0.0` 与 `127.0.0.1` / `::1` / `localhost` 归为一类。`0.0.0.0` 是未指定地址，并非回环地址；将其视为回环地址会让浏览器来源的请求访问绑定到 localhost 的开发服务（Oligo 的“0.0.0.0 Day”）。该辅助函数现在接受完整的 `127.0.0.0/8` 地址范围和任何 `*.localhost` 名称，并拒绝 `0.0.0.0`。

  **`better-auth`：加强受信任来源的子字符串检查。** `getTrustedOrigins` 以前在判断是否为动态 `baseURL.allowedHosts` 条目添加 `http://` 变体时，会使用 `host.includes("localhost") || host.includes("127.0.0.1")`。`evil-localhost.com` 或 `127.0.0.1.nip.io` 等错误配置会因此错误地获得信任列表中的 HTTP 来源。现在该检查使用共享分类器，因此只有真实的回环主机才会获得 HTTP 变体。

  **`@better-auth/oauth-provider`：符合 RFC 8252。**
  - §7.3 的重定向 URI 匹配现在接受完整的 `127.0.0.0/8` 地址范围（而不仅是 `127.0.0.1`）以及 `[::1]`，并支持灵活的端口比较。灵活端口匹配仅适用于 IP 字面量；根据 §8.3（对回环地址“不建议”使用），`localhost` 等 DNS 名称仍使用精确字符串匹配。
  - `validateIssuerUrl` 使用共享的回环检查，而不是仅比较两个主机名字面值。

  **新模块：`@better-auth/core/utils/host`。** 导出 `classifyHost`、`isLoopbackIP`、`isLoopbackHost` 和 `isPublicRoutableHost`。通过一套符合 RFC 6890 / RFC 6761 / RFC 8252 的实现处理 IPv4、IPv6（包括带方括号的字面量、区域 ID、映射到 IPv4 的地址，以及包含嵌入式 IPv4 递归处理的 6to4 / NAT64 / Teredo 隧道形式）和 FQDN，并维护精选的云元数据 FQDN 集合。整个 monorepo 中所有自定义的回环/私有/链路本地检查现在都会使用该模块。

- 已更新依赖项 [[`b5742f9`](https://github.com/better-auth/better-auth/commit/b5742f9d08d7c6ae0848279b79c8bcc0a09082d7)、[`a844c7d`](https://github.com/better-auth/better-auth/commit/a844c7dd087715678787cb10bf9670fad46e535b)、[`e64ff72`](https://github.com/better-auth/better-auth/commit/e64ff720fb8514cb78aedd1660223d8b948284da)]：
  - @better-auth/core@1.6.6
  - @better-auth/drizzle-adapter@1.6.6
  - @better-auth/kysely-adapter@1.6.6
  - @better-auth/memory-adapter@1.6.6
  - @better-auth/mongo-adapter@1.6.6
  - @better-auth/prisma-adapter@1.6.6
  - @better-auth/telemetry@1.6.6

## 1.6.5

### 补丁更新

- [#9119](https://github.com/better-auth/better-auth/pull/9119) [`938dd80`](https://github.com/better-auth/better-auth/commit/938dd80e2debfab7f7ef480792a5e63876e779d9) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 澄清测试工具插件在生产环境中的推荐用法

- [#9087](https://github.com/better-auth/better-auth/pull/9087) [`0538627`](https://github.com/better-auth/better-auth/commit/05386271ca143d07416297611d3b31e6c20e2f2a) 感谢 [@ramonclaudio](https://github.com/ramonclaudio)！- 修复（client）：在 `/change-password` 和 `/revoke-other-sessions` 后重新获取会话

- 已更新依赖项 []：
  - @better-auth/core@1.6.5
  - @better-auth/drizzle-adapter@1.6.5
  - @better-auth/kysely-adapter@1.6.5
  - @better-auth/memory-adapter@1.6.5
  - @better-auth/mongo-adapter@1.6.5
  - @better-auth/prisma-adapter@1.6.5
  - @better-auth/telemetry@1.6.5

## 1.6.4

### 补丁更新

- [#9205](https://github.com/better-auth/better-auth/pull/9205) [`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复（two-factor）：撤销 [#9122](https://github.com/better-auth/better-auth/issues/9122) 引起的强制执行范围扩大

  恢复到 [#9122](https://github.com/better-auth/better-auth/issues/9122) 之前的强制执行范围。仅在 `/sign-in/email`、`/sign-in/username` 和 `/sign-in/phone-number` 上要求进行 2FA 验证，与 v1.6.2 及之前版本的行为一致。非凭证登录流程（magic link、email OTP、OAuth、SSO、passkey、SIWE、one-tap、phone-number OTP、device authorization、email-verification auto-sign-in）默认不再要求进行 2FA 验证。

  计划在未来的次要版本中扩大强制执行范围，支持按方法选择退出，并与 NIST SP 800-63B-4 身份验证器保证级别保持一致。

- [#9068](https://github.com/better-auth/better-auth/pull/9068) [`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 修复 `advanced.database.generateId` 设置为 `"uuid"` 时，PostgreSQL 适配器忽略创建钩子中强制指定的 UUID 用户 ID 的问题。

- [#9165](https://github.com/better-auth/better-auth/pull/9165) [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 清理（adapters）：要求使用经过修补的 `drizzle-orm` 和 `kysely` 对等版本

  将 `drizzle-orm` 对等依赖版本范围缩小至 `^0.45.2`，并将 `kysely` 对等依赖版本范围缩小至 `^0.28.14`。这两个新范围都锁定在包含漏洞修复的次要版本线上，不再包含更高版本，因此适配器只声明支持经过实际测试的版本。使用较旧 ORM 版本的使用者会在安装时收到警告，可以与适配器一同升级；该对等依赖标记为可选，因此安装不会硬性失败。

- 已更新依赖项 [[`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - @better-auth/drizzle-adapter@1.6.4
  - @better-auth/kysely-adapter@1.6.4
  - @better-auth/core@1.6.4
  - @better-auth/memory-adapter@1.6.4
  - @better-auth/mongo-adapter@1.6.4
  - @better-auth/prisma-adapter@1.6.4
  - @better-auth/telemetry@1.6.4

## 1.6.3

### 补丁更新

- [#9131](https://github.com/better-auth/better-auth/pull/9131) [`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加固直接调用 `auth.api.*` 和插件元数据辅助函数时的动态 `baseURL` 处理

  **直接调用 `auth.api.*`**
  - 当无法解析 baseURL（没有来源且没有 `fallback`）时，抛出带有明确消息的 `APIError`，而不是将 `ctx.context.baseURL` 留为空字符串，导致下游插件崩溃。
  - 将直接 API 路径上的 `allowedHosts` 不匹配转换为 `APIError`。
  - 在动态路径上遵循 `advanced.trustedProxyHeaders`（默认值仍为 `true`）。此前，使用 `allowedHosts` 时会无条件信任 `x-forwarded-host` / `-proto`；现在它们会经过与静态路径相同的检查。默认值改为 `false` 将在后续 PR 中发布。
  - `resolveRequestContext` 会在每次调用时重新填充 `trustedProviders` 和 cookies（此外还包括 `trustedOrigins`）。当没有完整的 `Request` 可用时，用户定义的 `trustedOrigins(req)` / `trustedProviders(req)` 回调会收到一个根据转发标头合成的 `Request`。
  - 在仅有标头的协议回退中，为回环主机（`localhost`、`127.0.0.1`、`[::1]`、`0.0.0.0`）推断 `http`，这样本地开发调用就不会悄然解析为 `https://localhost:3000`。
  - `hasRequest` 使用 `isRequestLike`，后者现在会拒绝伪造 `Symbol.toStringTag`、但不具备真实 `url` / `headers.get` 结构的对象。

  **插件元数据辅助函数**
  - `oauthProviderAuthServerMetadata`、`oauthProviderOpenIdConfigMetadata`、`oAuthDiscoveryMetadata` 和 `oAuthProtectedResourceMetadata` 会将传入的请求转发给其链式 `auth.api` 调用，因此在动态配置下，`issuer` 和发现 URL 会反映请求主机。
  - `withMcpAuth` 会将传入的请求转发给 `getMcpSession`，传递 `trustedProxyHeaders`，并在无法解析 `baseURL` 时发送不带参数的 `Bearer` challenge（而不是 `Bearer resource_metadata="undefined/..."`）。
  - `@better-auth/oauth-provider` 中的 `metadataResponse` 通过 `new Headers()` 规范化标头，因此调用方可以传入 `Headers`、元组数组或记录对象，而不会导致条目被悄然丢弃。

- [#9122](https://github.com/better-auth/better-auth/pull/9122) [`484ce6a`](https://github.com/better-auth/better-auth/commit/484ce6a262c39b9c1be91d37774a2a13de3a5a1f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复（双重验证）：在所有登录路径上强制执行双重验证

  现在，双重验证的 after-hook 会在任何创建新会话的端点上触发，涵盖 magic-link、OAuth、passkey、email-OTP、SIWE 及所有未来的登录方式。已认证的请求（会话刷新、个人资料更新）除外。

- [#7231](https://github.com/better-auth/better-auth/pull/7231) [`f875897`](https://github.com/better-auth/better-auth/commit/f8758975ae475429d56b34aa6067e304ee973c8f) 感谢 [@Byte-Biscuit](https://github.com/Byte-Biscuit)！- 修复（双重验证）：验证后保留备用码存储格式

  使用备用码后，剩余代码现在会按照用户配置的相同 `storeBackupCodes` 策略（明文、加密或自定义）重新保存。此前，代码总是使用内置的对称加密重新加密，导致明文或自定义存储模式下后续验证失败。

- [#9072](https://github.com/better-auth/better-auth/pull/9072) [`6ce30cf`](https://github.com/better-auth/better-auth/commit/6ce30cf13853619b9022e93bd6ecb956bc32482d) 感谢 [@ramonclaudio](https://github.com/ramonclaudio)！- 修复（API）：使 `requestPasswordResetCallback` 顶层的 `operationId` 与 OpenAPI `resetPasswordCallback` 保持一致

- [#8389](https://github.com/better-auth/better-auth/pull/8389) [`f6428d0`](https://github.com/better-auth/better-auth/commit/f6428d02fcabc2e628f39b0e402f1a6eb0602649) 感谢 [@Oluwatobi-Mustapha](https://github.com/Oluwatobi-Mustapha)！- 修复（open-api）：修正 OAS 3.1 的 get-session 可空 schema

- [#9078](https://github.com/better-auth/better-auth/pull/9078) [`9a6d475`](https://github.com/better-auth/better-auth/commit/9a6d4759cd4451f0535d53f171bcfc8891c41db7) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 修复（客户端）：防止 isMounted 竞态条件导致大量 rps

- [#9113](https://github.com/better-auth/better-auth/pull/9113) [`513dabb`](https://github.com/better-auth/better-auth/commit/513dabb132e2c08a5b6d3b7e88dd397fcd66c1af) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在直接调用 `auth.api` 时从请求标头解析动态 `baseURL`

- [#8926](https://github.com/better-auth/better-auth/pull/8926) [`c5066fe`](https://github.com/better-auth/better-auth/commit/c5066fe5d68babf2376cfc63d813de5542eca463) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在结账和升级时省略按用量计费价格的数量

- [#9084](https://github.com/better-auth/better-auth/pull/9084) [`5f84335`](https://github.com/better-auth/better-auth/commit/5f84335815d75410320bdfa665a6712d3416b04f) 感谢 [@bytaesu](https://github.com/bytaesu)！- 支持 Stripe SDK v21 和 v22

- 已更新依赖项 [[`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656)]：
  - @better-auth/core@1.7.0-beta.0
  - @better-auth/drizzle-adapter@1.7.0-beta.0
  - @better-auth/kysely-adapter@1.7.0-beta.0
  - @better-auth/memory-adapter@1.7.0-beta.0
  - @better-auth/mongo-adapter@1.7.0-beta.0
  - @better-auth/prisma-adapter@1.7.0-beta.0
  - @better-auth/telemetry@1.7.0-beta.0
- 已更新依赖项 []：
  - @better-auth/core@1.6.3
  - @better-auth/drizzle-adapter@1.6.3
  - @better-auth/kysely-adapter@1.6.3
  - @better-auth/memory-adapter@1.6.3
  - @better-auth/mongo-adapter@1.6.3
  - @better-auth/prisma-adapter@1.6.3
  - @better-auth/telemetry@1.6.3

## 1.6.2

### 补丁变更

- [#8949](https://github.com/better-auth/better-auth/pull/8949) [`9deb793`](https://github.com/better-auth/better-auth/commit/9deb7936aba7931f2db4b460141f476508f11bfd) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 安全：将 OAuth state 参数与 cookie 中存储的 nonce 进行验证，以防止基于 cookie 的流程遭受 CSRF 攻击

- [#8983](https://github.com/better-auth/better-auth/pull/8983) [`2cbcb9b`](https://github.com/better-auth/better-auth/commit/2cbcb9baacdd8e6fa1ed605e9b788f8922f0a8c2) 感谢 [@jaydeep-pipaliya](https://github.com/jaydeep-pipaliya)！- 修复（oauth2）：防止 link-social 回调中的跨提供商账户冲突

  link-social 回调使用了 `findAccount(accountId)`，它会根据账户 ID 在所有提供商中进行匹配。当两个提供商返回相同的数字 ID（例如 Google 和 GitHub 都分配了 `99999`）时，查询可能会匹配到错误提供商的账户，导致误报 `account_already_linked_to_different_user` 错误，或悄然更新错误账户的令牌。

  已替换为 `findAccountByProviderId(accountId, providerId)`，将查询限定到正确的提供商，与通用 OAuth 插件中已有的模式一致。

- [#9059](https://github.com/better-auth/better-auth/pull/9059) [`b20fa42`](https://github.com/better-auth/better-auth/commit/b20fa424c379396f0b86f94fbac1604e4a17fe19) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复（next-js）：在 `nextCookies()` 中将 cookie 探测替换为基于标头的 RSC 检测，以防止无限路由刷新循环并消除泄漏的 `__better-auth-cookie-store` cookie。同时修复双重验证注册流程：在删除旧会话之前先设置新的会话 cookie。

- [#9058](https://github.com/better-auth/better-auth/pull/9058) [`608d8c3`](https://github.com/better-auth/better-auth/commit/608d8c3082c2d6e52c6ca6a8f38348619869b1ae) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复（sso）：根据 SAML 2.0 Bindings §3.4.4.1，在已签名的 SAML AuthnRequests 中包含 RelayState
  - 现在会将 RelayState 传递给 samlify 的 ServiceProvider 构造函数，使其包含在重定向绑定签名中。此前，RelayState 会在签名后追加，导致符合规范的 IdP 拒绝已签名的 AuthnRequests。
  - 如果没有私钥却设置了 `authnRequestsSigned: true`，现在会抛出错误，而不是悄然发送未签名的请求。

- [#8772](https://github.com/better-auth/better-auth/pull/8772) [`8409843`](https://github.com/better-auth/better-auth/commit/84098432ad8432fe33b3134d933e574259f3430a) 感谢 [@aarmful](https://github.com/aarmful)！- 新增（双重验证）：在登录重定向响应中包含已启用的双重验证方式

  现在，双重验证登录重定向会返回 `twoFactorMethods`（例如 `["totp", "otp"]`），使前端无需猜测即可渲染正确的验证界面。`onTwoFactorRedirect` 客户端回调会将 `twoFactorMethods` 作为上下文参数接收。
  - 仅当用户拥有已验证的 TOTP 密钥且配置中未禁用 TOTP 时，才会包含 TOTP。
  - 配置了 `otpOptions.sendOTP` 时，会包含 OTP。
  - 未验证的 TOTP 注册不会包含在方式列表中。

- [#8711](https://github.com/better-auth/better-auth/pull/8711) [`e78a7b1`](https://github.com/better-auth/better-auth/commit/e78a7b120d56b7320cc8d818270e20057963a7b2) 感谢 [@aarmful](https://github.com/aarmful)！- 修复（双重验证）：防止未验证的 TOTP 注册阻碍登录

  在 `twoFactor` 表中新增一个 `verified` 布尔列，用于跟踪 TOTP 密钥是否已由用户确认。
  - **首次注册：**`enableTwoFactor` 创建记录时将 `verified` 设为 `false`。只有在 `verifyTOTP` 使用有效代码验证成功后，记录才会被更新为 `verified: true`。
  - **重新注册**（在 TOTP 已验证的情况下调用 `enableTwoFactor`）：新记录会保留 `verified: true`，因此用户在轮换 TOTP 密钥时不会被锁在登录流程之外。
  - **登录：**`verifyTOTP` 会拒绝 `verified === false` 的记录，防止已放弃的注册阻碍身份验证。备用码和 OTP 不受影响，可在注册未完成期间作为备用方式使用。

  **迁移：**新列的默认值为 `true`，因此现有的 `twoFactor` 记录会被视为已验证。无需进行数据迁移。`skipVerificationOnEnable: true` 也不受影响——在该模式下，记录会以 `verified: true` 创建。

- 已更新依赖项 []：
  - @better-auth/core@1.6.2
  - @better-auth/drizzle-adapter@1.6.2
  - @better-auth/kysely-adapter@1.6.2
  - @better-auth/memory-adapter@1.6.2
  - @better-auth/mongo-adapter@1.6.2
  - @better-auth/prisma-adapter@1.6.2
  - @better-auth/telemetry@1.6.2

## 1.6.1

### 补丁变更

- [#9023](https://github.com/better-auth/better-auth/pull/9023) [`2e537df`](https://github.com/better-auth/better-auth/commit/2e537df5f7f2a4263f52cce74d7a64a0a947792b) 感谢 [@jonathansamines](https://github.com/jonathansamines)！- 更新端点检测，使其始终使用端点路由

- [#8902](https://github.com/better-auth/better-auth/pull/8902) [`f61ad1c`](https://github.com/better-auth/better-auth/commit/f61ad1cab7360e4460e6450904e97498298a79d5) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 对所有 `checkPassword` 失败情况使用 `INVALID_PASSWORD`

- [#9017](https://github.com/better-auth/better-auth/pull/9017) [`7495830`](https://github.com/better-auth/better-auth/commit/749583065958e8a310badaa5ea3acc8382dc0ca2) 感谢 [@bytaesu](https://github.com/bytaesu)！- 恢复通用 Auth<O> 上下文中的 getSession 可访问性

- 已更新依赖项 []：
  - @better-auth/core@1.6.1
  - @better-auth/drizzle-adapter@1.6.1
  - @better-auth/kysely-adapter@1.6.1
  - @better-auth/memory-adapter@1.6.1
  - @better-auth/mongo-adapter@1.6.1
  - @better-auth/prisma-adapter@1.6.1
  - @better-auth/telemetry@1.6.1

## 1.6.0

### 次要变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为数据库适配器新增不区分大小写的查询支持

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为插件接口新增可选的版本字段，并公开所有内置插件的版本

### 补丁变更

- [#8985](https://github.com/better-auth/better-auth/pull/8985) [`dd537cb`](https://github.com/better-auth/better-auth/commit/dd537cbdeb618abe9e274129f1670d0c03e89ae5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 弃用 `oidc-provider` 插件，改用 `@better-auth/oauth-provider`

  `oidc-provider` 插件现在会在实例化时发出一次性运行时弃用警告，并在 TypeScript 中标记为 `@deprecated`。它将在下一个主版本中移除。请迁移到 `@better-auth/oauth-provider`。

- [#8843](https://github.com/better-auth/better-auth/pull/8843) [`bd9bd58`](https://github.com/better-auth/better-auth/commit/bd9bd58f8768b2512f211c98c227148769d533c5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 SCIM 管理端点上强制执行基于角色的授权，并通过共享授权中间件规范化通行密钥所有权检查

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 从 magic-link 验证端点返回额外的用户字段和会话数据

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许无密码用户启用、禁用和管理双重身份验证

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 防止 updateUser 覆盖无关的 username 或 displayUsername 字段

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用非阻塞 scrypt 进行密码哈希，避免阻塞事件循环

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 更新用户资料时强制确保用户名唯一

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将会话有效期计算与创建时间对齐，而非更新时间

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 通过提供商的 accountId 而非内部 id 比较账户 cookie

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 email-otp 插件中请求更改电子邮件后触发会话信号

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 phone-number 插件中重新抛出 sendOTP 失败，而非静默吞掉错误

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用 form_post 响应模式时，从请求正文读取 OAuth 代理回调参数

- [#8980](https://github.com/better-auth/better-auth/pull/8980) [`469eee6`](https://github.com/better-auth/better-auth/commit/469eee6d846b32a43f36b418868e6a4c916382dc) 感谢 [@bytaesu](https://github.com/bytaesu)！- 修复验证 storeIdentifier 设置为 hashed 时 OAuth state 被重复哈希的问题

- [#8981](https://github.com/better-auth/better-auth/pull/8981) [`560230f`](https://github.com/better-auth/better-auth/commit/560230f751dfc5d6efc8f7f3f12e5970c9ba09ea) 感谢 [@bytaesu](https://github.com/bytaesu)！- 防止 `any` 导致 `auth.$Infer` 和 `auth.$ERROR_CODES` 类型收窄失效。当 body 为 `any` 时，保留客户端查询类型。

- 已更新依赖 [[`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33)]：
  - @better-auth/drizzle-adapter@1.6.0
  - @better-auth/kysely-adapter@1.6.0
  - @better-auth/memory-adapter@1.6.0
  - @better-auth/mongo-adapter@1.6.0
  - @better-auth/prisma-adapter@1.6.0
  - @better-auth/core@1.6.0
  - @better-auth/telemetry@1.6.0

## 1.6.0-beta.0

### 次要更改

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为数据库适配器添加不区分大小写的查询支持

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为插件接口添加可选的 version 字段，并公开所有内置插件的 version

### 补丁更改

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 从 magic-link 验证端点返回额外的用户字段和会话数据

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许无密码用户启用、禁用和管理双重身份验证

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 防止 updateUser 覆盖无关的 username 或 displayUsername 字段

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用非阻塞 scrypt 进行密码哈希，避免阻塞事件循环

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 更新用户资料时强制确保用户名唯一

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将会话有效期计算与创建时间对齐，而非更新时间

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 通过提供商的 accountId 而非内部 id 比较账户 cookie

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 email-otp 插件中请求更改电子邮件后触发会话信号

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 phone-number 插件中重新抛出 sendOTP 失败，而非静默吞掉错误

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用 form_post 响应模式时，从请求正文读取 OAuth 代理回调参数

- 已更新依赖 [[`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b)]：
  - @better-auth/drizzle-adapter@1.6.0-beta.0
  - @better-auth/kysely-adapter@1.6.0-beta.0
  - @better-auth/memory-adapter@1.6.0-beta.0
  - @better-auth/mongo-adapter@1.6.0-beta.0
  - @better-auth/prisma-adapter@1.6.0-beta.0
  - @better-auth/core@1.6.0-beta.0
  - @better-auth/telemetry@1.6.0-beta.0
