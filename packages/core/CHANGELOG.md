# @better-auth/core

## 1.7.6

### Patch Changes

- [#11333](https://github.com/better-auth/better-auth/pull/11333) [`631ac29`](https://github.com/better-auth/better-auth/commit/631ac296a55ccecf51a7995e89a3e528a5f782da) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当自定义模型名称与另一个架构键匹配时，保留逻辑模型标识。

## 1.7.5

### Patch Changes

- [#11203](https://github.com/better-auth/better-auth/pull/11203) [`cb627eb`](https://github.com/better-auth/better-auth/commit/cb627ebeb174d9a35ccc79018110bbc7a50a6fb8) 感谢 [@dshukertjr](https://github.com/dshukertjr)！- 为直接 PostgreSQL 连接添加 `database.schemaName` 选项。设置后，适配器和 CLI 会在每条语句中限定该架构，因此 `auth generate` 会生成一个带架构限定的迁移，在创建表之前先创建架构，而不是依赖连接的 `search_path`。

- [#11290](https://github.com/better-auth/better-auth/pull/11290) [`dae97ed`](https://github.com/better-auth/better-auth/commit/dae97ed932a084a11faa96a2e1abf052fc85d2ea) 感谢 [@bytaesu](https://github.com/bytaesu)！- 为不使用 Cloudflare Workers 的项目恢复数据库选项类型推断。

## 1.7.4

### Patch Changes

- [#11210](https://github.com/better-auth/better-auth/pull/11210) [`3ff842a`](https://github.com/better-auth/better-auth/commit/3ff842ab7fdf60746b5d7bd8c27becd2d0a79c2e) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在未安装可选 OpenTelemetry API 时，防止 Metro 等打包工具失败。

- [#11224](https://github.com/better-auth/better-auth/pull/11224) [`c1756a2`](https://github.com/better-auth/better-auth/commit/c1756a22745d4580425559b8800acc6e9a70e30f) 感谢 [@bytaesu](https://github.com/bytaesu)！- 添加 `experimental.instrumentation.enabled`，以便按 auth 实例禁用 Better Auth OpenTelemetry span 创建。默认情况下，检测功能仍处于启用状态，且独立于使用情况报告。

## 1.7.3

### Patch Changes

- [#11179](https://github.com/better-auth/better-auth/pull/11179) [`352d012`](https://github.com/better-auth/better-auth/commit/352d012bd54e613782bf4af22aae24443541c77c) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在初始化期间验证 Drizzle 架构对象和生成的 Prisma 客户端模型（包括生产环境），并提供修复不匹配项的指引。这些检查不会查询数据库，也无法检测尚未应用的迁移。

  对于模型元数据未包含可空性信息的 Prisma 客户端，`auth generate` 会读取现有 Prisma 架构，并报告 Better Auth 从不写入的必填字段。设置 `advanced.database.validateSchema: false` 可禁用运行时验证。

- [#9908](https://github.com/better-auth/better-auth/pull/9908) [`76d311f`](https://github.com/better-auth/better-auth/commit/76d311f4b94799496ddfc0be7d03db1731f4b2a6) 感谢 [@harshil1712](https://github.com/harshil1712)！- 将 Cloudflare 添加为内置社交身份提供商，支持客户端密钥身份验证，以及无需密钥的 PKCE 客户端。

- [#11101](https://github.com/better-auth/better-auth/pull/11101) [`3e9e197`](https://github.com/better-auth/better-auth/commit/3e9e19746e609004da31bea3356c0059611d9ed4) 感谢 [@bytaesu](https://github.com/bytaesu)！- 为需要非标准请求参数的提供商添加自定义令牌端点身份验证策略。

- [#11068](https://github.com/better-auth/better-auth/pull/11068) [`157ec8d`](https://github.com/better-auth/better-auth/commit/157ec8d8799ddda642f2fe40120fc364660a8864) 感谢 [@bytaesu](https://github.com/bytaesu)！- 提高请求 IP 验证性能。

- [#11102](https://github.com/better-auth/better-auth/pull/11102) [`baa08f4`](https://github.com/better-auth/better-auth/commit/baa08f4ee674f5cc39624063847c89f1bea73186) 感谢 [@bytaesu](https://github.com/bytaesu)！- 修复使用文档中说明的 `clientKey` 和 `clientSecret` 选项配置时 TikTok 登录和令牌刷新失败的问题。

- [#11129](https://github.com/better-auth/better-auth/pull/11129) [`9e36635`](https://github.com/better-auth/better-auth/commit/9e36635eb2fbf27d58c70d3361724335ba9a9951) 感谢 [@bytaesu](https://github.com/bytaesu)！- 改进 PayPal 授权码和刷新令牌请求，包括 PKCE 参数处理。

- [#11178](https://github.com/better-auth/better-auth/pull/11178) [`be0e007`](https://github.com/better-auth/better-auth/commit/be0e007e20ea310aa533acf49edfae34cfc797a9) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在初始化期间报告缺失的表、缺失的列，以及 Better Auth 从不写入的必填列，并提供修复指引。Kysely 会检查实时数据库架构。身份验证请求会等待同一项检查；如果架构不匹配，请求将被拒绝。

  默认情况下启用验证，包括生产环境。设置 `advanced.database.validateSchema: false` 可禁用运行时验证。当必填但未写入的列需要手动修复时，`auth migrate` 会拒绝应用更改。

- [#11134](https://github.com/better-auth/better-auth/pull/11134) [`a2bae0c`](https://github.com/better-auth/better-auth/commit/a2bae0cad04ccc23c40555c77f86b0da1ba40ebc) 感谢 [@bytaesu](https://github.com/bytaesu)！- 通过符合 OAuth 规范的 Basic 身份验证和重定向保护，改进 Reddit 令牌请求。

- [#11189](https://github.com/better-auth/better-auth/pull/11189) [`1a1b7d5`](https://github.com/better-auth/better-auth/commit/1a1b7d56f51cb9ce6b06334b22fcbfa0d52be05a) 感谢 [@bytaesu](https://github.com/bytaesu)！- 再次将 `consumeOne` 和 `incrementOne` 设为自定义数据库适配器的可选方法；在缺少原生方法时使用受保护的回退方案。回退方案要求条件写入具有原子性，并准确统计受影响的行数。当竞争导致重试次数耗尽时，回退递增可能会失败。

- [#11153](https://github.com/better-auth/better-auth/pull/11153) [`2220ee7`](https://github.com/better-auth/better-auth/commit/2220ee726934de3aa128d5b4114391be8e9570cc) 感谢 [@bytaesu](https://github.com/bytaesu)！- 通过使用 `(providerId, accountId)` 标识账户，并移除 1.7.0 引入的 `issuer` 要求，恢复与 1.6 数据库的登录兼容性。从 1.6 升级不再需要账户架构迁移。对于含糊不清的账户键，将拒绝处理，而不是任意选择一个账户。

  如果已应用 1.7.0 至 1.7.2 的账户架构，请在升级前移除其 issuer 唯一索引。对于 SQL 数据库，还应将 `issuer` 设为可空或移除该列，以确保注册和账户关联能够成功。`auth migrate` 不会执行此清理。请按照[升级指南](https://www.better-auth.com/docs/guides/1-7-upgrade-guide)中的数据库特定步骤操作。

## 1.7.2

### Patch Changes

- [#10938](https://github.com/better-auth/better-auth/pull/10938) [`557e19b`](https://github.com/better-auth/better-auth/commit/557e19bfad0f2d2842903ddb1e768a0506aceaea) 感谢 [@bytaesu](https://github.com/bytaesu)！- 添加同步 auth 端点上下文访问方式 `getCurrentAuthEndpointContext`，以及可选访问方式 `tryGetCurrentAuthEndpointContext`。现有的 `getCurrentAuthContext` 和 `getCurrentAuthContextAsyncLocalStorage` 函数仍可作为已弃用的兼容 API 使用。

- [#10855](https://github.com/better-auth/better-auth/pull/10855) [`64da15b`](https://github.com/better-auth/better-auth/commit/64da15b0b1ca078d80f115ee0a5bd9ad4ca4d64e) 感谢 [@bytaesu](https://github.com/bytaesu)！- 防止启用多个运行时条件的 Cloudflare Workers 构建产物中异步上下文丢失。

- [#10982](https://github.com/better-auth/better-auth/pull/10982) [`b4ad5a1`](https://github.com/better-auth/better-auth/commit/b4ad5a110ca4f2e043c0f23a8e5f87e0b31c3fc6) 感谢 [@bytaesu](https://github.com/bytaesu)！- 内置占位邮箱现在统一使用带命名空间的 `{identifier}@{namespace}.placeholder.invalid` 格式。

- [#10979](https://github.com/better-auth/better-auth/pull/10979) [`fced1a5`](https://github.com/better-auth/better-auth/commit/fced1a5d360c14e6358f88dedc9014ff862873f1) 感谢 [@bytaesu](https://github.com/bytaesu)！- 允许相对回调和重定向 URL 使用标准路径、查询和片段语法，同时保留开放重定向保护。

- [#10939](https://github.com/better-auth/better-auth/pull/10939) [`e1d4011`](https://github.com/better-auth/better-auth/commit/e1d40116e2b6a797372ac82b9feea39f57285632) 感谢 [@bytaesu](https://github.com/bytaesu)！- 处理身份验证请求时发出的日志现在会遵循配置的自定义日志记录器、日志级别和禁用设置。

## 1.7.1

## 1.7.0

### Minor Changes

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- Client ID 元数据文档现在遵循共享缓存新鲜度规则，并在新鲜度存在歧义时采取默认拒绝策略。该插件优先使用 `s-maxage`，而非 `max-age` 和 `Expires`；遵循 `s-maxage=0`；使用 ETag 或 Last-Modified 有条件地重新验证；并将无效或重复的新鲜度指令视为立即过期。并发刷新会汇聚到同一个客户端资源链接，而不是因其唯一约束而失败。

  共享 OAuth 元数据验证现在会拒绝空白的 `client_name`，但不会修剪有效的显示名称。原生私有使用重定向必须采用 RFC 8252 规定的单斜杠形式，例如 `com.example.app:/callback`。原生 HTTP 重定向只接受完全匹配的 `localhost`、`127.0.0.1` 或 `[::1]` 主机；其他 `127.0.0.0/8` 地址和 localhost 子域名都会被拒绝。

  CIMD 现在通过 `metadataFetchPolicy` 限制元数据请求放大：同一客户端的请求会合并；每客户端节流以及全局／每源并发限制会立即拒绝请求；滚动 60 秒预算会限制唯一客户端的大量请求。HTTP `no-store`、`private` 和 `Vary: *` 行为保持不变，且永远不会将元数据或验证器提供给调度器。

  Node.js 部署可以从 `@better-auth/cimd/node` 导入 `fetchClientMetadataResource`。该传输仅解析一次，拒绝任何非公共 DNS 答案，通过不使用全局 HTTPS 连接池的方式固定已批准的连接，保留 Host 和 TLS 证书身份，并返回重定向和响应正文而不进行缓冲。其他运行时仍需负责提供等效的安全传输。

  现在会忽略未知的 draft-02 元数据成员，且绝不会持久化。已识别的机密、特权字段和服务器控制项仍会导致致命错误，而通用内部别名和非标准的客户端凭据授权写法则会被剔除。

- [#10402](https://github.com/better-auth/better-auth/pull/10402) [`763a267`](https://github.com/better-auth/better-auth/commit/763a2671c5372d88c291881977c8a1c2e29034b1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 插件数据库架构现在可以跨多个字段定义具名或自动生成的表级索引。SQL 迁移以及生成的 Drizzle 或 Prisma 架构会一致地解析配置的表名和列名，而 MongoDB 适配器会在首次强制执行索引的写入之前创建相同的索引。

- [#9948](https://github.com/better-auth/better-auth/pull/9948) [`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3) 感谢 [@yordis](https://github.com/yordis)！- feat(generic-oauth)：新增 `refreshTokenParams` 配置，用于在刷新令牌时转发额外参数

  多租户 OIDC 提供商（Zitadel 多组织、带有 `audience` 的 Auth0）需要在刷新调用中发送额外的正文参数，以便在无需完整授权重定向的情况下重新限定令牌范围。generic-oauth 插件现在接受 `refreshTokenParams` 选项（对象或同步／异步函数），并将其合并到刷新请求正文中，同时禁止覆盖 `grant_type` 和 `refresh_token`。函数形式会接收触发刷新的请求的元数据，因此无需依赖 AsyncLocalStorage 等带外状态，即可获取请求作用域数据（标头、Cookie）。

  `UpstreamProvider.refreshAccessToken` 现在接受可选的第二个 `ctx` 参数；此更改向后兼容，因为现有仅接收 `refreshToken` 的实现仍然有效。请参阅 [#7554](https://github.com/better-auth/better-auth/issues/7554)。

- [#9368](https://github.com/better-auth/better-auth/pull/9368) [`430c895`](https://github.com/better-auth/better-auth/commit/430c89549060ef6bd477ed2510650b9e49bba560) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- Generic OAuth 用户现在可以在调用 `authClient.signOut()` 时从配置的 OpenID 提供商注销。当提供商公开了已发现或配置的注销端点时，Better Auth 会重定向到该端点，并在可用时附带已存储的 `id_token_hint`。传入 `callbackURL` 或配置 `postLogoutRedirectURI` 以设置返回流程，也可以选择传入 `state`；或者设置 `disableRedirect`，自行处理返回的 `url`。当多个已关联提供商均支持注销时，Better Auth 会选择最近更新的账户。设置 `disableProviderLogout: true` 可使注销仅在本地生效。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 遇到权限范围限制的 MCP 客户端现在可以准确获知需要申请哪些权限范围。缺少受保护的权限范围时，会返回带有 RFC 6750 `insufficient_scope` `WWW-Authenticate` 挑战的 `403`，其中会列出所有缺少的权限范围。客户端可以将这些权限范围合并到一个授权请求中，而不必为每个权限范围分别打开一次浏览器重定向。
  - 通过 `RequireMcpAuthOptions` 或匹配的 `createMcpProtectedRequestHandler` 验证器选项，使用 `requiredScopes` 配置受保护的权限范围。默认情况下仍使用精确匹配；`isScopeSatisfied` 可定义分层策略。
  - 当某个操作动态确定所需权限范围时，请使用 `createInsufficientScopeError`。`createResourceServerChallenge` 会将此信号和已识别的令牌错误转换为安全的 RFC 6750 挑战。
  - 仅将 `challengeScopes` 用作未认证挑战提示。

  处理程序生成的响应、普通权限拒绝、配置失败以及无关的抛出值，都会保留原始状态和身份。

- [#10403](https://github.com/better-auth/better-auth/pull/10403) [`dbd302e`](https://github.com/better-auth/better-auth/commit/dbd302e422c66620cde391f6a80ab90ee34182f9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 账户身份现在按可信发行者而非提供商配置进行区分。账户现在使用唯一的 `(issuer, accountId)` 键，因此同一 OpenID Connect 发行者的别名会对同一外部身份去重，而不同发行者的相同主体仍会保持独立。此身份去重不会为别名引入独立的授权或提供商生命周期记录。

  此版本要求 `Account.issuer`，但保留 `Account.accountId` 作为提供商分配的账户标识符。账户专用 API 通过 `accountId` 请求属性选择本地 `Account.id`；令牌和提供商个人资料 API 则可以使用 `useAccountCookie: true` 选择已签名的账户 Cookie。凭据账户使用 `local:credential`，并以关联用户稳定的 `id` 作为其提供商身份。

  OAuth 提供商身份现在取自原始的已验证个人资料。OpenID Connect 发现使用 `sub`，普通 OAuth 使用 `id`，提供商可以通过 `accountSubject` 指定其他不可变字段；Better Auth 不再在运行时于 `sub` 和 `id` 之间切换。`getUserInfo().user` 不再携带提供商身份，并且 `mapProfileToUser` 不能返回 `id`。请从 `accountInfo.account.accountId` 读取所选身份，而不是从 `accountInfo.user.id` 读取。通用的 `microsoftEntraId` helper 现在要求传入具体的租户 GUID；多租户授权机构请使用内置的 Microsoft 提供商。

  SSO 账户主体现在由协议定义。OIDC 使用已验证的 `sub` 声明，SAML 使用已签名的 `NameID`；两种配置都移除了 `mapping.id`。不带元数据 XML 的手动 SAML 配置必须设置 `idpMetadata.entityID`，因为 `samlConfig.issuer` 标识的是服务提供商，不再充当 IdP 身份。

  部署前，请按照 Better Auth 1.7 升级指南执行经过审核的账户身份回填。生成的架构迁移无法自动分配可信发行者或解决现有身份冲突。

- [#10359](https://github.com/better-auth/better-auth/pull/10359) [`8784c1c`](https://github.com/better-auth/better-auth/commit/8784c1c1f4301acf96d980e5bf81ff56435e2545) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 数据库联接已从 `experimental` 移至稳定选项 `advanced.database.joins`（默认值：`false`）。

  如果你之前设置了 `experimental: { joins: true }`，请将配置更新为：

  ```ts
  advanced: {
    database: {
      joins: true,
    },
  }
  ```

  支持原生联接的适配器会在启用时使用联接。如果适配器无法为某个查询返回联接数据，Better Auth 会回退到额外查询并合并结果。Drizzle 和 Prisma 用户应确保其架构包含所需关系（`npx auth@latest generate`）。

- [#10204](https://github.com/better-auth/better-auth/pull/10204) [`0683a5f`](https://github.com/better-auth/better-auth/commit/0683a5f36befb45ade3866c7f8057791eadeee59) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- Microsoft 登录现在会在内置的 `microsoft` 提供商和 Generic OAuth `microsoftEntraId` helper 中，使用稳定的 `oid` 声明识别 Entra 账户。没有有效 `oid` 的令牌会被拒绝，并且如果 Microsoft 发现结果未提供 ID 令牌验证元数据，Generic OAuth helper 将拒绝初始化。升级前必须迁移现有基于 `sub` 创建的 Microsoft 账户行。

- [#9305](https://github.com/better-auth/better-auth/pull/9305) [`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth)：在 `signIn.social`、`linkSocial` 和 `signIn.sso` 中实现每请求 `additionalParams` 和 `loginHint` 一致性

  统一的扩展机制，用于按请求自定义提供商授权 URL。此前，Google 的 `access_type=offline`／`prompt=consent`、Cognito 的 `identity_provider=Google` 或 Microsoft 的 `domain_hint` 等动态参数只能作为静态服务器配置设置。

  ### 新功能
  - `signIn.social`、`linkSocial` 和 `signIn.sso` 接受 `additionalParams: Record<string, string>`。这些值会作为查询参数附加到授权 URL。
  - `linkSocial` 也接受 `loginHint`，与 `signIn.social` 和 `signIn.sso` 的接口保持一致。
  - `OAuthProvider.createAuthorizationURL` 的输入契约新增 `additionalParams`；每个内置提供商都会将其转发给共享 helper。
  - Generic-OAuth 提供商会将调用时的 `additionalParams` 与配置级的 `authorizationUrlParams` 合并；键冲突时以调用时的值为准。
  - Cognito 提供类型化配置选项 `identityProvider?: string`，该选项会映射到 `identity_provider` 查询参数，避免使用魔法字符串。

  ### 安全性
  - 共享的 `createAuthorizationURL` helper 会静默丢弃调用方提供的 `RESERVED_AUTHORIZATION_PARAMS` 中的任何键（`state`、`client_id`、`redirect_uri`、`response_type`、`code_challenge`、`code_challenge_method`、`nonce`、`scope`）。请求正文 Zod 架构也会以 400 拒绝相同的键，因此误用会在边界处明确显示，而不会静默覆盖安全关键参数。`nonce` 被保留，以免调用方替换 Better Auth 生成的 OIDC nonce；该 nonce 用于将发现提供商的 `id_token` 绑定到授权请求。
  - 使用非标准客户端标识符的提供商（`wechat` → `appid`、`tiktok` → `client_key`）也会过滤这些键，以防调用方替换已配置的 OAuth 应用。
  - 集成正常运行所必需的提供商协议常量（`atlassian` → `audience`、`notion` → `owner`）会最后合并，因此调用方提供的 `additionalParams` 无法覆盖它们。代表操作员意图的已配置默认值（例如 Google `include_granted_scopes`、Cognito `identityProvider`）仍可由调用方覆盖。
  - 如果解析出的提供商是 SAML，`signIn.sso` 会以 400 拒绝 `additionalParams`；SAML AuthnRequest 经过签名，无法携带调用方提供的查询参数，因此静默丢弃这些参数会误导集成方。

  ### OpenAPI
  - 在 OpenAPI 生成器中新增了对 `ZodRecord` 的处理，因此 `z.record()` 字段会生成带类型化 `additionalProperties` 的 `type: object`。同时修复了一个长期存在的问题：`additionalData` 之前会被呈现为 `type: string`。

  ### 重构
  - `discord`、`roblox`、`zoom` 和 `slack` 提供商现在委托给共享的 `createAuthorizationURL` helper，并继承其 RFC 行为和保留键防护。
  - `tiktok` 和 `wechat` 保留手动 URL 构造（非标准 OAuth2 参数名称和 URL 片段要求），但会使用相同的保留键过滤器传递 `additionalParams`。

  关闭 [#2351](https://github.com/better-auth/better-auth/issues/2351)。
  关闭 [#5441](https://github.com/better-auth/better-auth/issues/5441)。
  关闭 [#5592](https://github.com/better-auth/better-auth/issues/5592)。
  关闭 [#5604](https://github.com/better-auth/better-auth/issues/5604)。
  取代 [#4992](https://github.com/better-auth/better-auth/issues/4992) 和 [#5443](https://github.com/better-auth/better-auth/issues/5443)。

- [#10127](https://github.com/better-auth/better-auth/pull/10127) [`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 配置了 `baseURL.allowedHosts` 时，OAuth 登录、账户关联、回调和代理流程现在会根据当前请求的基础 URL 构建 `redirect_uri`。在多主机部署中，内置社交提供商和通用 OAuth 提供商现在会使用解析出的请求主机进行重定向。

  使用共享的 `/callback/<provider-id>` 路由时，自定义 `OAuthProvider` 实现可以省略 `callbackPath`。仅在使用自定义回调路由时设置 `callbackPath`。

- [#10039](https://github.com/better-auth/better-auth/pull/10039) [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth-provider)!：DPoP 绑定访问令牌（RFC 9449）

  OAuth 提供商集成现在可以签发和验证 DPoP 发送方约束令牌。客户端可以在注册时通过 `dpop_bound_access_tokens` 请求此类令牌，在授权请求中传入 `dpop_jkt`，或者选择配置了 `dpopBoundAccessTokensRequired` 的资源。签发的令牌带有 `cnf.jkt`，返回 `token_type: "DPoP"`，并在刷新令牌轮换、内省和 userinfo 过程中继续保持绑定。

  资源服务器使用 `verifyAccessTokenRequest` 验证 DPoP 请求；该函数会检查 `Authorization: DPoP` 方案、证明、请求目标、访问令牌哈希以及证明重放。MCP 包会在受保护资源元数据中声明 DPoP，并验证 DPoP 绑定请求。证明重放会通过数据库支持的验证存储予以拒绝，因此防重放机制在多个实例间也有效。`verifyAccessTokenRequest` 和 `requireMcpAuth` 默认使用该存储；可使用 `createDpopReplayStore(internalAdapter)` 创建一个，或传入自定义的 `dpop.replayStore`。这需要数据库支持的验证存储：仅使用辅助存储的部署会拒绝 DPoP 请求，而不会跳过重放保护。

  破坏性变更：原始令牌验证器 `verifyAccessToken` 在 `better-auth/oauth2` 和 `oauthProviderResourceClient` 操作中均重命名为 `verifyBearerToken`，并且该函数会拒绝 DPoP 绑定令牌。任何可能收到此类令牌的端点都应使用 `verifyAccessTokenRequest`。资源请求输入类型从 `AccessTokenRequestInput` 重命名为 `ResourceRequestInput`，并且 DPoP 算法选项统一为 `signingAlgorithms`。

  运行架构迁移，为 DPoP 令牌绑定字段添加支持：在访问令牌表和刷新令牌表中添加 `confirmation` 列。DPoP 绑定客户端还会新增 `dpopBoundAccessTokens`，资源则会新增 `dpopBoundAccessTokensRequired`。不会新增专用的重放表；证明重放会复用验证存储。

- [#9828](https://github.com/better-auth/better-auth/pull/9828) [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用单个共享验证器验证社交提供商的 id_token。

  客户端提交的 id_token 登录（`signIn.social({ idToken })` 和账户关联）现在由一个函数统一验证，而不再使用各提供商单独的 `verifyIdToken` 方法。每个提供商通过包含 JWKS 来源、发行者和受众的 `idToken` 配置声明相关信息，核心验证器会执行签名、发行者、受众和 nonce 检查。未声明配置的提供商会拒绝客户端 id_token 路径。

  PayPal 之前会接受任何可解码的 id_token，而不验证其签名。由于 PayPal 从访问令牌中获取身份信息，因此现在不会声明 `idToken` 配置，客户端 id_token 路径会返回 `ID_TOKEN_NOT_SUPPORTED`。通过重定向流程进行 PayPal 登录的行为保持不变。

  直接实现 `UpstreamProvider` 的自定义提供商，应将已移除的 `verifyIdToken` 方法替换为 `idToken` 配置：

  ```ts
  idToken: {
  	jwks: createRemoteJWKSet(new URL("https://issuer.example/.well-known/jwks.json")),
  	issuer: "https://issuer.example",
  	audience: clientId,
  },
  ```

  对于无法使用本地 JWKS 进行验证的情况，请传入 `idToken: { verify: async (token, nonce) => boolean }`。`verifyIdToken` 和 `disableIdTokenSignIn` 提供商选项保持不变。

- [#10065](https://github.com/better-auth/better-auth/pull/10065) [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 携带凭据的 OAuth 和设备授权响应现在都会一致地发送 `Cache-Control: no-store` 和 `Pragma: no-cache`，使代理、CDN 和浏览器绝不会缓存这些响应。此更改涵盖令牌、内省和 userinfo 端点、动态和管理员客户端注册、客户端密钥轮换，以及设备代码和设备令牌响应，包括这些端点返回的错误响应。

  端点通过 `metadata: { noStore: true }` 声明此行为，手动构建响应时可从 `@better-auth/core` 导入导出的标头集 `NO_STORE_HEADERS`。

- [#9929](https://github.com/better-auth/better-auth/pull/9929) [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 OAuth 提供商选项中新增 `requireEmailVerification`，适用于内置社交提供商和 Generic OAuth 插件。当提供商报告电子邮件未验证时，用户和账户仍会创建或关联，但不会签发会话：OAuth 回调会重定向并附带 `?error=email_not_verified`，ID 令牌和 One Tap 登录则返回 `403` `EMAIL_NOT_VERIFIED`。验证邮件遵循现有的 `emailVerification.sendOnSignUp`／`sendOnSignIn` 设置。

  此选项按提供商启用，且不会继承 `emailAndPassword.requireEmailVerification`，因此现有社交登录仍可正常工作。该门控会检查本地用户的验证状态，因此通过其他方式验证的用户仍可访问。仅对会提供可信 `email_verified` 信号的提供商启用此选项。

- [#8931](https://github.com/better-auth/better-auth/pull/8931) [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 新增可选的、基于 JWKS 的非对称 JWT 支持，用于 `session_data` Cookie 缓存令牌，使服务能够使用公钥而非共享密钥验证 Cookie 缓存 JWT。可通过 `jwt({ sessionCookieCache: true })` 与 `session.cookieCache.strategy = "jwt"` 一同启用。

- [#9657](https://github.com/better-auth/better-auth/pull/9657) [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加固 `private_key_jwt` 和令牌端点客户端身份验证，并添加使修复在结构上得到保证的 helper。

  `@better-auth/core/oauth2` 现在公开 `encodeBasicCredentials` 和 `decodeBasicCredentials`，这两个函数经过往返测试，并遵循 RFC 6749 §2.3.1（分别对每个值使用 `application/x-www-form-urlencoded` 编码，仅按第一个 `:` 分割）。解码器会以不区分大小写的方式接受方案，并根据 RFC 7235 §2.1 容忍凭据前存在一个或多个空格。客户端的 `client_secret_basic` 和服务器端的 Better Auth OAuth 提供商现在都会调用这些 helper，因此包含保留字符的凭据可以在整个技术栈中顺利往返，并且 `basic xxx` 或 `Basic  xxx` 这样的标头也会被接受。

  `createPrivateKeyJwtClientAssertionGetter` 会立即验证选项。不支持的算法（`HS256`、none`）、不包含密钥材料的 JWK，以及显式 `algorithm` 与嵌入在 JWK 中的 `alg` 不一致的情况，都会在构造时抛出错误，而不是等到首次请求令牌时才报错。`signPrivateKeyJwtClientAssertion` 对直接调用者也会执行相同的检查。**破坏性变更：**过去，配置中将不受支持的 JWK `alg` 与不同的显式 `algorithm` 配对时，会静默地使用显式选项签名；现在会在构造时失败。

  **破坏性变更：**`@better-auth/oauth-provider` 仅接受 RFC 7517 JWK Set 对象形式且 `keys` 数组非空的客户端 `jwks` 元数据。在 DCR 负载、管理端和用户端客户端创建、Client ID Metadata Documents、测试固件以及生成的客户端代码中，请将 `jwks: [key]` 替换为 `jwks: { keys: [key] }`。远程获取的 `jwks_uri` 响应也必须使用相同的对象结构。EC 密钥必须使用 P-256、P-384 或 P-521；OKP 密钥必须使用 Ed25519。当密钥声明了 `alg` 时，它必须是受支持的 `private_key_jwt` 算法，且与密钥类型和曲线匹配；如果客户端在其断言头中选择算法，则省略 `alg`。之前通过 `oauthToSchema` 写入的 OAuth 客户端记录已经存储为 JWK Set 对象，因此这是请求、配置和类型迁移，而不是再次进行数据库重写；请单独审计在 Better Auth 之外写入的记录。

  当 `resolvePrivateKey` 回调未返回 `privateKeyJwk` 或 `privateKeyPem` 时，SSO `private_key_jwt` 流程会通过重定向返回 `error_description=no_private_key_available`。此前，重定向路径仅在完全没有 resolver 时才会提前终止；resolver 返回空值时会继续执行，最终导致内部签名错误。

  `better-auth/test` 新增了 `getHttpTestInstance`，它是 `getTestInstance` 的对应实现，会在操作系统分配的端口上绑定真实 HTTP 监听器，并使用发现的 URL 构造 auth 实例。它消除了测试文件各自复制粘贴的“临时服务器后重新绑定”竞态问题。

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为整个技术栈中的令牌端点请求新增客户端身份验证配置，包括 `private_key_jwt`（RFC 7523）。

  通用 OAuth 提供商现在接受 `tokenEndpointAuth`，用于令牌端点客户端身份验证。JWT 客户端断言可使用 `tokenEndpointAuth: { method: "private_key_jwt", getClientAssertion }`；公共客户端可使用 `{ method: "none" }`；显式基于密钥的客户端身份验证可使用 `{ method: "client_secret_basic" }` 或 `{ method: "client_secret_post" }`，并提供 `clientSecret`。现有的 `authentication: "basic" | "post"` 选项仍可用于基于密钥的令牌请求。

  使用 `createPrivateKeyJwtClientAssertionGetter()` 从私钥签署 RFC 7523 断言。断言 getter 接收 `{ clientId, tokenEndpoint, grantType }`，因此集成无需在断言辅助函数中重复客户端 ID 或令牌端点值。Core OAuth2 现在导出私钥 JWT 专用辅助函数和类型：`signPrivateKeyJwtClientAssertion`、`createPrivateKeyJwtClientAssertionGetter`、`PrivateKeyJwtSigningAlgorithm` 和 `PRIVATE_KEY_JWT_SIGNING_ALGORITHMS`。

  令牌端点客户端身份验证参数由 `clientId`、`clientSecret` 和 `tokenEndpointAuth` 推导。配置了令牌端点身份验证时必须提供 `clientId`；基于密钥的令牌端点身份验证还必须提供 `clientSecret`。自定义令牌参数用于提供商特定字段，不会取代已配置的客户端身份验证值。

  `refreshAccessToken()` 现在会将 `resource` 值转发到刷新令牌请求，因此 RFC 8707 资源指示符可通过高级刷新辅助函数和 `refreshAccessTokenRequest()` 使用。

  同步 OAuth2 请求构造器 `createAuthorizationCodeRequest`、`createRefreshAccessTokenRequest` 和 `createClientCredentialsTokenRequest` 已移除。请改用异步的 `authorizationCodeRequest`、`refreshAccessTokenRequest` 和 `clientCredentialsTokenRequest` 辅助函数。

  服务器会验证使用非对称密钥签署的 JWT 客户端断言，客户端可对授权码、刷新令牌和客户端凭据令牌请求使用相同的令牌端点身份验证约定。

- [#10473](https://github.com/better-auth/better-auth/pull/10473) [`ed61b47`](https://github.com/better-auth/better-auth/commit/ed61b4798e0ccedadc3b0c0e0a2d08b5d4b7ed5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 新增事务性 OIDC 用户解析，使应用能够将已验证的签发者和主题配对关联到确切的现有用户，同时保留或更新本地个人资料。

- [#9864](https://github.com/better-auth/better-auth/pull/9864) [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 新增 `user.validateUserInfo` 配置关卡，使应用能够在创建用户或关联新账户之前拒绝某个身份。对于所有会创建用户的方法（OAuth、SSO/SAML、电子邮件/密码、魔法链接、电子邮件 OTP、匿名、SIWE、电话号码、管理员创建用户以及 SCIM），它都会在创建步骤执行一次，包括没有持久化数据库的无状态设置。

  当现有 OAuth 或 SSO 用户再次登录时（`source.action` 为 `"sign-in"`），此回调也会再次运行，并接收最新的提供商邮箱和个人资料，以便域名或组织策略拒绝提供商身份已超出允许范围的用户。非提供商的返回登录不会重新验证。

  回调会接收映射后的 `user`，以及描述 `action`（`create-user`、`link-account` 或 `sign-in`）、`method` 和提供商元数据的 `source`：OAuth 提供商的元数据位于 `source.oauth`，OIDC/SAML SSO 提供商的元数据位于 `source.sso`。返回 `{ error, errorDescription }` 即可拒绝：浏览器流程会重定向到错误 URL，程序化流程则返回 `403`。

### 补丁变更

- [#10126](https://github.com/better-auth/better-auth/pull/10126) [`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加固主机分类器（`@better-auth/core/utils/host`），修复此前被错误报告为公共地址的三种非公共地址形式：已弃用的 IPv4 兼容 IPv6（`::w.x.y.z`，RFC 4291 §2.5.5.1，例如 `[::127.0.0.1]` 会被 `URL` 规范化为 `[::7f00:1]`）、6to4 中继任播前缀 `192.88.99.0/24`（RFC 7526），以及已弃用的站点本地地址 `fec0::/10`（RFC 3879）。基于 `isPublicRoutableHost` / `classifyHost` 构建的 SSRF 防护（`jwks_uri` 验证、SSO OIDC 发现、CIMD 元数据获取）现在会拒绝这些地址。

- [#9898](https://github.com/better-auth/better-auth/pull/9898) [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2) 感谢 [@ItalyPaleAle](https://github.com/ItalyPaleAle)！- 为 Microsoft Entra ID 社交提供商新增 `clientAssertion` 支持。

- [#9301](https://github.com/better-auth/better-auth/pull/9301) [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 `GenericOAuthConfig` 和 SSO `OIDCConfig` 中新增 `allowIdpInitiated`，以支持不带 `state` 参数发起 OAuth 的提供商（例如 Clever）。启用后，无状态回调会在服务器端使用新的 state 和 PKCE 重新启动 OAuth 流程，同时保留 CSRF 防护。还加固了 `parseState`，使其能处理 GET 回调中未定义的请求体。

- [#10128](https://github.com/better-auth/better-auth/pull/10128) [`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在登录重新认证和刷新令牌请求期间保留此前已授予的 OAuth 作用域。`account.scope` 现在只会单调累积：仅在通过 `linkSocial` 添加作用域时才会合并新授予的作用域；提供商返回的作用域声明比用户已获授的作用域更窄时，也不再缩减存储值。

- [#10390](https://github.com/better-auth/better-auth/pull/10390) [`0de88f5`](https://github.com/better-auth/better-auth/commit/0de88f5e61d96f460e02b8a526e58acb16455d15) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SCIM 连接现在无需组织或 SSO 插件，即可在应用定义的配置域中配置 User、Group 和直接成员关系。应用可通过投影将 Group 成员关系映射到经过验证的自定义角色。该服务还支持 SCIM 2.0 发现、筛选、分页、响应属性选择、原子 PATCH 操作，以及 Microsoft Entra ID 和 Okta 使用的常见请求模式。

  这取代了之前的 SCIM 配置、客户端 API、数据库架构和基于组织的 Group 模型。现有 SCIM 安装无法原地迁移配置状态。恢复流量前，请按照 1.7 升级指南中的 SCIM 切换步骤操作，包括重新配置完整目录。

  延迟执行的数据库副作用现在只会在事务成功后运行。回滚的 User 更新不再刷新其缓存个人资料，回滚的批量会话撤销也不再使会话失效。

- [#10129](https://github.com/better-auth/better-auth/pull/10129) [`3a79aff`](https://github.com/better-auth/better-auth/commit/3a79aff58ed82e45caf04c2ee4acaf0f4d09a86c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为 Google 提供商新增 `includeGrantedScopes` 选项。将其设为 `false`，默认情况下便会从授权 URL 中省略 `include_granted_scopes=true`，使每个 OAuth 流程只请求自身的作用域，而不是累积先前的授权。默认值为 `true`，保留现有行为；调用时的 `additionalParams` 仍可覆盖单个流程的设置。

- [#10505](https://github.com/better-auth/better-auth/pull/10505) [`d701f90`](https://github.com/better-auth/better-auth/commit/d701f90e6f81ede26209a50a5100bd9914a7ad5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- One Tap、Electron 和 Expo 客户端插件现在可与 `createAuthClient` 组合使用而不产生 TypeScript 错误，且生成的客户端会保留每个插件推断出的操作。

## 1.7.0-rc.6

## 1.7.0-rc.5

## 1.7.0-rc.4

## 1.7.0-rc.3

### 次要变更

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- Client ID Metadata Documents 现在遵循共享缓存新鲜度规则；当新鲜度无法确定时，会采取失败关闭策略。插件优先使用 `s-maxage`，其次为 `max-age` 和 `Expires`，遵循 `s-maxage=0`，使用 ETag 或 Last-Modified 有条件地重新验证，并将无效或重复的新鲜度指令视为立即过期。并发刷新会汇聚到同一个客户端资源关联，而不会因其唯一约束而失败。

  共享 OAuth 元数据验证现在会拒绝空白的 `client_name`，但不会裁剪有效的显示名称。原生私有用途重定向必须采用 RFC 8252 规定的单斜杠形式，例如 `com.example.app:/callback`。原生 HTTP 重定向只接受主机名严格为 `localhost`、`127.0.0.1` 或 `[::1]` 的地址；其他 `127.0.0.0/8` 地址和 localhost 子域名均会被拒绝。

  CIMD 现在通过 `metadataFetchPolicy` 限制元数据请求放大：同一客户端的获取请求会合并，客户端级节流以及全局/来源并发限制会立即拒绝请求，滚动 60 秒预算则限制唯一客户端的大量请求。HTTP `no-store`、`private` 和 `Vary: *` 行为保持不变，且绝不会将元数据或验证器交给限流器处理。

  Node.js 部署可从 `@better-auth/cimd/node` 导入 `fetchClientMetadataResource`。该传输层仅解析一次 DNS，拒绝任何非公共 DNS 结果，不使用全局 HTTPS 连接池而固定使用获准的连接，同时保留 Host 和 TLS 证书身份，并以不缓冲的方式返回重定向和响应体。其他运行时仍需自行提供同等安全的传输层。

  现在会忽略未知的 draft-02 元数据成员，且永不持久化。已识别的机密信息、权限字段和服务器控制项仍会导致错误；通用内部别名和非标准的客户端凭据授权写法则会被剥除。

- [#9368](https://github.com/better-auth/better-auth/pull/9368) [`430c895`](https://github.com/better-auth/better-auth/commit/430c89549060ef6bd477ed2510650b9e49bba560) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 通用 OAuth 用户现在调用 `authClient.signOut()` 时，可以从配置的 OpenID 提供商登出。如果提供商公开了发现到或已配置的登出端点，Better Auth 会重定向到该端点，并在可用时包含已存储的 `id_token_hint`。通过 `callbackURL` 或配置 `postLogoutRedirectURI` 设置返回流程，并可选地附带 `state`；也可以设置 `disableRedirect`，自行处理返回的 `url`。如果多个已关联提供商都支持登出，Better Auth 会选择最近更新的账户。设置 `disableProviderLogout: true` 可仅在本地登出。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 遇到作用域限制的 MCP 客户端现在能准确得知应请求哪些作用域。缺少受保护作用域时会返回 `403`，并附带 RFC 6750 `insufficient_scope` `WWW-Authenticate` 质询，其中列出所有缺失的作用域。客户端可将这些作用域合并到一个授权请求中，而不必针对每个作用域分别打开一次浏览器重定向。
  - 通过 `RequireMcpAuthOptions` 或对应的 `createMcpProtectedRequestHandler` 验证器选项中的 `requiredScopes` 配置受保护的作用域。默认仍要求精确匹配；`isScopeSatisfied` 可定义分层策略。
  - 当某项操作动态确定所需作用域时，使用 `createInsufficientScopeError`。`createResourceServerChallenge` 会将该信号和已识别的令牌错误转换为安全的 RFC 6750 质询。
  - 仅将 `challengeScopes` 用作未认证质询的提示。

  处理程序生成的响应、普通权限拒绝、配置失败以及无关的抛出值均会保留其原始状态和身份。

- [#10204](https://github.com/better-auth/better-auth/pull/10204) [`0683a5f`](https://github.com/better-auth/better-auth/commit/0683a5f36befb45ade3866c7f8057791eadeee59) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- Microsoft 登录现在会在内置的 `microsoft` 提供商和通用 OAuth `microsoftEntraId` 辅助函数中，使用稳定的 `oid` 声明识别 Entra 账户。没有有效 `oid` 的令牌会被拒绝；如果 Microsoft 发现信息未提供 ID 令牌验证元数据，通用 OAuth 辅助函数将拒绝初始化。升级前必须迁移由 `sub` 创建的现有 Microsoft 账户记录。

### 补丁变更

- [#10505](https://github.com/better-auth/better-auth/pull/10505) [`d701f90`](https://github.com/better-auth/better-auth/commit/d701f90e6f81ede26209a50a5100bd9914a7ad5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- One Tap、Electron 和 Expo 客户端插件现在可与 `createAuthClient` 组合使用而不产生 TypeScript 错误，且生成的客户端会保留每个插件推断出的操作。

## 1.7.0-rc.2

### 次要变更

- [#10402](https://github.com/better-auth/better-auth/pull/10402) [`763a267`](https://github.com/better-auth/better-auth/commit/763a2671c5372d88c291881977c8a1c2e29034b1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 插件数据库架构现在可定义跨多个字段的命名表级索引或自动生成的表级索引。SQL 迁移以及生成的 Drizzle 或 Prisma 架构会一致地解析配置的表名和列名，而 MongoDB 适配器会在首次执行强制索引的写入前创建相同的索引。

- [#10403](https://github.com/better-auth/better-auth/pull/10403) [`dbd302e`](https://github.com/better-auth/better-auth/commit/dbd302e422c66620cde391f6a80ab90ee34182f9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 账户身份现在根据受信任的签发者而非提供商配置进行限定。账户现在使用唯一键 `(issuer, providerAccountId)`，因此同一 OpenID Connect 签发者的别名会对一个外部身份去重，而不同签发者的相同主题仍会保持独立。这种身份去重不会为别名引入独立的授权或提供商生命周期记录。

  此版本包含破坏性变更。`Account.accountId` 已重命名为 `Account.providerAccountId`，且 `Account.issuer` 现在为必填项。账户专用 API 通过 `accountId` 选择本地 `Account.id`；令牌和提供商个人资料 API 则可使用 `useAccountCookie: true` 选择已签名的账户 Cookie。凭据账户使用 `local:credential`，并将关联用户的稳定 `id` 作为其提供商身份。

  OAuth 提供商身份现在取自原始、已验证的个人资料。OpenID Connect 发现使用 `sub`，普通 OAuth 使用 `id`，而提供商可通过 `accountSubject` 指定其他不可变字段；Better Auth 不再在运行时于 `sub` 和 `id` 之间切换。`getUserInfo().user` 不再携带提供商身份，`mapProfileToUser` 也不能再返回 `id`。请从 `accountInfo.account.providerAccountId` 中读取选定的身份，而不是从 `accountInfo.user.id` 中读取。通用的 `microsoftEntraId` 辅助函数现在要求提供具体的租户 GUID；若要使用多租户授权机构，请使用内置的 Microsoft 提供商。

  SSO 账户主题现在由协议定义。OIDC 使用经过验证的 `sub` 声明，SAML 使用已签名的 `NameID`；两种配置中的 `mapping.id` 均已移除。没有元数据 XML 的手动 SAML 配置必须设置 `idpMetadata.entityID`，因为 `samlConfig.issuer` 标识的是服务提供商，不再作为 IdP 身份。

  部署前，请按照 Better Auth 1.7 升级指南执行经过审查的账户身份回填。生成的架构迁移无法自动分配受信任的签发者，也无法自动解决现有身份冲突。

- [#10359](https://github.com/better-auth/better-auth/pull/10359) [`8784c1c`](https://github.com/better-auth/better-auth/commit/8784c1c1f4301acf96d980e5bf81ff56435e2545) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 数据库联接已从 `experimental` 移至稳定选项 `advanced.database.joins`（默认值：`false`）。

  如果之前设置了 `experimental: { joins: true }`，请将配置更新为：

  ```ts
  advanced: {
    database: {
      joins: true,
    },
  }
  ```

  启用后，支持原生联接的适配器会使用原生联接。如果适配器无法为查询返回联接数据，Better Auth 会改为执行额外查询并合并结果。Drizzle 和 Prisma 用户应确保架构中包含所需关系（`npx auth@latest generate`）。

- [#10473](https://github.com/better-auth/better-auth/pull/10473) [`ed61b47`](https://github.com/better-auth/better-auth/commit/ed61b4798e0ccedadc3b0c0e0a2d08b5d4b7ed5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 新增事务性 OIDC 用户解析，使应用能够将已验证的签发者和主题配对关联到确切的现有用户，同时保留或更新本地个人资料。

### 补丁变更

- [#10390](https://github.com/better-auth/better-auth/pull/10390) [`0de88f5`](https://github.com/better-auth/better-auth/commit/0de88f5e61d96f460e02b8a526e58acb16455d15) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SCIM 连接现在可以在不使用 organization 或 SSO 插件的情况下，将 Users、Groups 和直接成员关系配置到应用定义的配置域中。应用可以通过投影将 Group 成员关系映射到经过验证的自定义角色。该服务还支持 SCIM 2.0 发现、筛选、分页、响应属性选择、原子 PATCH 操作，以及 Microsoft Entra ID 和 Okta 使用的常见请求模式。

  这取代了先前的 SCIM 配置、客户端 API、数据库架构和基于 organization 的 Group 模型。现有 SCIM 安装无法原地迁移配置状态。恢复流量前，请按照 1.7 升级指南中的 SCIM 切换步骤操作，包括完整重新配置目录。

  延迟的数据库副作用现在只会在事务成功后运行。回滚的 User 更新不再刷新其缓存的个人资料，回滚的批量会话撤销也不再使会话失效。

## 1.7.0-rc.1

## 1.7.0-rc.0

## 1.7.0-beta.10

## 1.7.0-beta.9

## 1.7.0-beta.8

### 次要更改

- [#10127](https://github.com/better-auth/better-auth/pull/10127) [`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 配置了 `baseURL.allowedHosts` 后，OAuth 登录、账户关联、回调和代理流程现在会根据当前请求的基本 URL 构建 `redirect_uri`。在多主机部署中，内置社交提供方和通用 OAuth 提供方现在会使用解析出的请求主机进行重定向。

  使用共享 `/callback/<provider-id>` 路由时，自定义 `OAuthProvider` 实现可以省略 `callbackPath`。仅在使用自定义回调路由时设置 `callbackPath`。

### 补丁更改

- [#10128](https://github.com/better-auth/better-auth/pull/10128) [`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在登录重新认证和刷新令牌请求期间保留之前授予的 OAuth 作用域。`account.scope` 现在只会单调递增：仅在通过 `linkSocial` 新增授权作用域时才会合并进来；如果提供方返回的作用域声明比用户已获授权的范围更窄，也不会缩小已存储的值。

- [#10129](https://github.com/better-auth/better-auth/pull/10129) [`3a79aff`](https://github.com/better-auth/better-auth/commit/3a79aff58ed82e45caf04c2ee4acaf0f4d09a86c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为 Google 提供方添加 `includeGrantedScopes` 选项。设为 `false` 可默认从授权 URL 中省略 `include_granted_scopes=true`，使每个 OAuth 流程只请求自身的作用域，而不累积之前授予的作用域。默认值为 `true`，保留现有行为；调用时的 `additionalParams` 仍会在单次流程覆盖设置时优先。

## 1.7.0-beta.7

### 次要更改

- [#9948](https://github.com/better-auth/better-auth/pull/9948) [`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3) 感谢 [@yordis](https://github.com/yordis)！- feat(generic-oauth)：添加 `refreshTokenParams` 配置，以便在刷新令牌时转发额外参数

  多租户 OIDC 提供方（Zitadel 多组织、带有 `audience` 的 Auth0）需要在刷新请求中发送额外的正文参数，以便在不进行完整授权重定向的情况下重新限定令牌范围。generic-oauth 插件现在接受 `refreshTokenParams` 选项（对象或同步/异步函数），并将其合并到刷新请求正文中，同时禁止覆盖 `grant_type` 和 `refresh_token`。函数形式会接收触发刷新的请求的元数据，因此无需 AsyncLocalStorage 等带外状态即可使用请求作用域数据（标头、Cookie）。

  `UpstreamProvider.refreshAccessToken` 现在接受可选的第二个 `ctx` 参数；此更改向后兼容，因为现有仅接受 `refreshToken` 的实现仍然有效。参见 [#7554](https://github.com/better-auth/better-auth/issues/7554)。

### 补丁更改

- [#10126](https://github.com/better-auth/better-auth/pull/10126) [`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加固主机分类器（`@better-auth/core/utils/host`），以防止其将三种非公共地址形式误报为公共地址：已弃用的 IPv4 兼容 IPv6 地址（`::w.x.y.z`，RFC 4291 §2.5.5.1，例如 `[::127.0.0.1]`，会被 `URL` 规范化为 `[::7f00:1]`）、6to4 中继任播前缀 `192.88.99.0/24`（RFC 7526），以及已弃用的站点本地地址 `fec0::/10`（RFC 3879）。基于 `isPublicRoutableHost` / `classifyHost` 构建的 SSRF 防护（`jwks_uri` 验证、SSO OIDC 发现、CIMD 元数据获取）现在会拒绝这些地址。

## 1.7.0-beta.6

### 次要更改

- [#10039](https://github.com/better-auth/better-auth/pull/10039) [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth-provider)!：DPoP 绑定访问令牌（RFC 9449）

  OAuth 提供方集成现在可以签发并验证受 DPoP 发送方约束的令牌。客户端可在注册时通过 `dpop_bound_access_tokens`、在授权请求中通过 `dpop_jkt`，或通过指定一个配置了 `dpopBoundAccessTokensRequired` 的资源来请求此类令牌。签发的令牌包含 `cnf.jkt`，返回 `token_type: "DPoP"`，并在刷新令牌轮换、内省和 userinfo 过程中保持绑定。

  资源服务器通过 `verifyAccessTokenRequest` 验证 DPoP 请求，该函数会检查 `Authorization: DPoP` 方案、证明、请求目标、访问令牌哈希和证明重放。MCP 包会在受保护资源元数据中声明 DPoP，并验证 DPoP 绑定请求。证明重放会通过数据库支持的验证存储拒绝，因此可在多个实例之间防止重放。`verifyAccessTokenRequest` 和 `requireMcpAuth` 默认使用该存储；可通过 `createDpopReplayStore(internalAdapter)` 创建一个，或传入自定义的 `dpop.replayStore`。此功能需要数据库支持的验证存储：仅使用辅助存储的部署会拒绝 DPoP 请求，而不是跳过重放保护。

  破坏性更改：原始令牌验证器 `verifyAccessToken` 在 `better-auth/oauth2` 中以及作为 `oauthProviderResourceClient` 操作时，均重命名为 `verifyBearerToken`，并且会拒绝 DPoP 绑定令牌。任何可能接收此类令牌的端点都应使用 `verifyAccessTokenRequest`。资源请求输入类型从 `AccessTokenRequestInput` 重命名为 `ResourceRequestInput`，DPoP 算法选项统一为 `signingAlgorithms`。

  请运行架构迁移，以添加 DPoP 令牌绑定字段：访问令牌表和刷新令牌表中的 `confirmation` 列。DPoP 绑定客户端还会新增 `dpopBoundAccessTokens`，资源则会新增 `dpopBoundAccessTokensRequired`。不会添加专用的重放表；证明重放会复用验证存储。

- [#10065](https://github.com/better-auth/better-auth/pull/10065) [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 携带凭据的 OAuth 和设备授权响应现在都会一致地发送 `Cache-Control: no-store` 和 `Pragma: no-cache`，确保代理、CDN 和浏览器不会缓存这些响应。涵盖令牌、内省和 userinfo 端点、动态和管理客户端注册、客户端密钥轮换，以及设备代码和设备令牌响应，包括这些端点返回的错误响应。

  端点通过 `metadata: { noStore: true }` 声明此设置；对于手动构建的响应，标头集合以 `NO_STORE_HEADERS` 的形式从 `@better-auth/core` 导出。

## 1.7.0-beta.5

### 次要更改

- [#9828](https://github.com/better-auth/better-auth/pull/9828) [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 使用单一共享验证器验证社交提供方的 id_token。

  客户端提交的 id_token 登录（`signIn.social({ idToken })` 和账户关联）现在由一个函数验证，而不再使用针对各提供方的 `verifyIdToken` 方法。每个提供方声明包含 JWKS 来源、签发者和受众的 `idToken` 配置，核心验证器会执行签名、签发者、受众和 nonce 检查。未声明配置的提供方会拒绝客户端 id_token 路径。

  PayPal 以前接受任何可解码的 id_token，而不会验证其签名。PayPal 从访问令牌中派生身份，因此现在不声明 `idToken` 配置；客户端 id_token 路径会返回 `ID_TOKEN_NOT_SUPPORTED`。通过重定向流程进行 PayPal 登录的行为不变。

  直接实现 `OAuthProvider` 的自定义提供方，应使用 `idToken` 配置替换已移除的 `verifyIdToken` 方法：

  ```ts
  idToken: {
  	jwks: createRemoteJWKSet(new URL("https://issuer.example/.well-known/jwks.json")),
  	issuer: "https://issuer.example",
  	audience: clientId,
  },
  ```

  对于无法使用本地 JWKS 的验证，请传入 `idToken: { verify: async (token, nonce) => boolean }`。提供方选项 `verifyIdToken` 和 `disableIdTokenSignIn` 保持不变。

- [#9929](https://github.com/better-auth/better-auth/pull/9929) [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将 `requireEmailVerification` 添加到 OAuth 提供方选项，适用于内置社交提供方和 Generic OAuth 插件。当提供方报告电子邮件未经验证时，仍会创建或关联用户和账户，但不会签发会话：OAuth 回调会重定向并附带 `?error=email_not_verified`，ID token 和 One Tap 登录则返回 `403` `EMAIL_NOT_VERIFIED`。验证邮件遵循现有的 `emailVerification.sendOnSignUp` / `sendOnSignIn` 设置。

  此选项需要按提供方单独启用，且不会继承 `emailAndPassword.requireEmailVerification`，因此现有社交登录仍可正常使用。该门控会检查本地用户的验证状态，因此通过其他方式验证的用户仍可访问。仅对会提供可信 `email_verified` 信号的提供方启用此选项。

- [#9864](https://github.com/better-auth/better-auth/pull/9864) [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 添加 `user.validateUserInfo` 配置门控，使应用可以在创建用户或关联新账户之前拒绝某个身份。对于所有会配置用户的方法（OAuth、SSO/SAML、电子邮件/密码、魔法链接、电子邮件 OTP、匿名、SIWE、电话号码、管理员创建的用户和 SCIM），它都会在创建步骤运行一次，包括没有持久化数据库的无状态部署。

  当现有 OAuth 或 SSO 用户再次登录时（`source.action` 为 `"sign-in"`），也会重新运行此配置，并接收最新的提供方电子邮件和个人资料，以便域名或组织策略可以拒绝其提供方身份已超出允许范围的用户。对于非提供方的回访登录，不会重新验证。

  回调会接收映射后的 `user`，以及描述 `action`（`create-user`、`link-account` 或 `sign-in`）、`method` 和提供方元数据的 `source`：OAuth 提供方使用 `source.oauth`，OIDC/SAML SSO 提供方使用 `source.sso`。返回 `{ error, errorDescription }` 即可拒绝：浏览器流程会重定向到错误 URL，程序化流程则返回 `403`。

### 补丁更改

- [#9898](https://github.com/better-auth/better-auth/pull/9898) [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2) 感谢 [@ItalyPaleAle](https://github.com/ItalyPaleAle)！- 为 Microsoft Entra ID 社交提供方添加 `clientAssertion` 支持。

## 1.7.0-beta.4

## 1.6.30

### 补丁更改

- [#10833](https://github.com/better-auth/better-auth/pull/10833) [`07c1718`](https://github.com/better-auth/better-auth/commit/07c17189f58502bf038e5f22766f8a99df60ac99) 感谢 [@bytaesu](https://github.com/bytaesu)！- 防止并发冷启动请求间歇性丢失身份验证或事务上下文。

## 1.6.29

## 1.6.28

## 1.6.27

### 补丁更改

- [#10657](https://github.com/better-auth/better-auth/pull/10657) [`2ae491e`](https://github.com/better-auth/better-auth/commit/2ae491eac3ece50839a0eb2d4f868c4deedac67b) 感谢 [@bytaesu](https://github.com/bytaesu)！- 使端点和中间件上下文类型与运行时路由参数保持一致，并在从端点上下文解析会话时保留响应标头。

## 1.6.26

### 补丁更改

- [#10576](https://github.com/better-auth/better-auth/pull/10576) [`a30e274`](https://github.com/better-auth/better-auth/commit/a30e274b5daed6057086d76b91d17abfa02196d7) 感谢 [@bytaesu](https://github.com/bytaesu)！- 添加一个实用工具，用于在保留域 `placeholder.invalid` 上创建稳定、带命名空间的占位电子邮件地址。

## 1.6.25

### 补丁更改

- [#10294](https://github.com/better-auth/better-auth/pull/10294) [`0ffd1fb`](https://github.com/better-auth/better-auth/commit/0ffd1fb28d44a8266d62791cd4c97e263444d03b) 感谢 [@jsj](https://github.com/jsj)！- 在授权期间发送 Apple OAuth PKCE code challenge，以便回调令牌交换包含匹配的 code verifier。

## 1.6.24

### 补丁更改

- [#9862](https://github.com/better-auth/better-auth/pull/9862) [`54fab08`](https://github.com/better-auth/better-auth/commit/54fab084469a27257e66a0814523ebac7145ef5d) 感谢 [@OrangeManLi](https://github.com/OrangeManLi)！- 修复请求状态 `AsyncLocalStorage` 初始化竞争，该问题可能间歇性地抛出 `No request state found. Please make sure you are calling this function within a runWithRequestState callback.`。`ensureAsyncStorage()` 现在会缓存正在进行的初始化，使并发的首次调用者共用同一个 `AsyncLocalStorage` 实例，而不是各自创建一个并由最后一次写入生效。此问题会在无服务器冷启动时显现（例如 Cloudflare Workers）：在惰性导入 `node:async_hooks` 完成前，首批请求就已到达，导致 `runWithRequestState().run()` 和嵌套的 `getCurrentRequestState()` 使用了不同实例。

- [#10376](https://github.com/better-auth/better-auth/pull/10376) [`c4d1dda`](https://github.com/better-auth/better-auth/commit/c4d1ddaa952eab7edfec942fab223f35798518ab) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 将请求端点上下文作为第三个参数传递给 `verifyIdToken`，使自定义 ID token 验证器可以读取请求标头（例如 Apple 的 `user-agent` 要求）。

## 1.6.23

## 1.6.22

### 补丁更改

- [#10241](https://github.com/better-auth/better-auth/pull/10241) [`8bd43d9`](https://github.com/better-auth/better-auth/commit/8bd43d9d8312fd9ddbfb8fb5c827cf0a0e55132d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 拒绝服务端 OAuth 请求中的 HTTP 重定向

  Better Auth 会拒绝其发出的服务端 OAuth 请求中的 HTTP 重定向，包括令牌交换、令牌刷新、客户端凭据、令牌内省和 JWKS 请求。提供方端点无法将这些请求重定向到非预期的内部地址。符合规范的 OAuth 提供方会直接响应这些端点的请求，绝不会重定向，因此标准集成不会受到影响。

## 1.6.21

### 补丁更改

- [#10180](https://github.com/better-auth/better-auth/pull/10180) [`90d509e`](https://github.com/better-auth/better-auth/commit/90d509e0b9f72614170ad7124ae9d3a7a97d7d3a) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 当没有行匹配或调用时未提供谓词时，`adapter.update` 现在会返回 `null`。有意执行批量更新时请使用 `updateMany`。

  Kysely MySQL 适配器在受保护的更新未命中时，不再返回行。带有 `id` 条件的更新即使 `id` 不是第一个谓词，也会返回目标行。请保持启用 MySQL 的匹配行语义；mysql2 默认通过 `FOUND_ROWS` 启用该语义。禁用后，幂等更新可能会被误判为未命中。

  当更新保护条件排除目标行时，Prisma 适配器现在会返回 `null`，而不是抛出 Prisma 的未找到异常。共享适配器测试套件现在会断言各适配器实现具有相同的失败关闭更新行为。

- [#10197](https://github.com/better-auth/better-auth/pull/10197) [`816d7f9`](https://github.com/better-auth/better-auth/commit/816d7f92522518e90d437c2a366d75db56690f86) 感谢 [@Paola3stefania](https://github.com/Paola3stefania)！- Google 登录现在接受 `hd: "*"`，以允许任何 Google Workspace 托管域，同时仍拒绝不含托管域声明的令牌。

  Google One Tap 现在会在创建会话前应用配置的 Google 托管域限制。

- [#10198](https://github.com/better-auth/better-auth/pull/10198) [`570267c`](https://github.com/better-auth/better-auth/commit/570267cd5e782f018933ce3af4f51dbd250bf7de) 感谢 [@rachit367](https://github.com/rachit367)！- 在插件架构表上遵循 `disableMigration` 设置。标记为 `disableMigration: true` 的表现在会被 `better-auth generate`（Drizzle 和 Prisma 输出）和运行时迁移器跳过，不再被输出并创建。此前在组装表列表时该标记被丢弃，因此没有生效。

- [#10203](https://github.com/better-auth/better-auth/pull/10203) [`5953157`](https://github.com/better-auth/better-auth/commit/5953157acf619bcb8233c91952b1e4072202f055) 感谢 [@bytaesu](https://github.com/bytaesu)！- 速率限制不再信任多跳 `X-Forwarded-For` 链，防止位于会追加此标头的代理之后的客户端伪造最左侧跳点以绕过每 IP 速率限制。单值 IP 标头仍可正常使用。若要通过代理链获取真实客户端，请将 `advanced.ipAddress.trustedProxies` 设置为反向代理 IP 或 CIDR 范围（链会从右向左遍历并跳过受信任的跳点），或将 `advanced.ipAddress.ipAddressHeaders` 指向单个受信任的客户端 IP 标头。

## 1.6.20

### 补丁更改

- [#8734](https://github.com/better-auth/better-auth/pull/8734) [`930f534`](https://github.com/better-auth/better-auth/commit/930f5341d956bf3075f43758392a5c7f50947104) 感谢 [@sleepe229](https://github.com/sleepe229)！- 声明继承的 `APIError` 属性，以修复 TypeScript 类型推断错误。

## 1.6.19

### 补丁更改

- [#10086](https://github.com/better-auth/better-auth/pull/10086) [`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 刷新令牌轮换和令牌撤销、双因素备份码重新生成、设备代码认领以及组织邀请接受现在都能在 Prisma 上正常工作。此前，这些流程中的并发或重复请求在 Prisma 上可能会返回错误，而不是预期结果。

  在低于 5.0 的 MongoDB 服务器上，这些流程以及其他受保护的值更新（速率限制窗口重置、API 密钥补充）不再因空更新错误而失败。

  `@better-auth/core`：`incrementOne` 在没有 `increment` 且没有 `set` 的情况下调用时，现在会报告清晰的错误。

- [#10070](https://github.com/better-auth/better-auth/pull/10070) [`a787e0b`](https://github.com/better-auth/better-auth/commit/a787e0b66b368a1af0b4ba17c9750c2839668246) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 单次使用的验证流程在使用单连接池的数据库适配器上不再会卡住。这修复了连接受限的无服务器数据库环境中的魔法链接验证和类似的令牌检查问题。

## 1.6.18

### 补丁变更

- [#9583](https://github.com/better-auth/better-auth/pull/9583) [`b21a5f7`](https://github.com/better-auth/better-auth/commit/b21a5f7f6ca1f63c6b69666a498b4227b15e316c) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 修复复合单体仓库中无法推断插件提供的客户端方法和额外会话字段的问题。

## 1.6.17

### 补丁变更

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加可选的 `incrementOne` 适配器方法和可选的 `SecondaryStorage.increment` 方法。`incrementOne` 会在 where 子句的条件保护下，以原子方式将有符号数值增量应用于单行（例如，仅当剩余使用次数计数器仍为正数时才递减），并返回更新后的行；如果没有行符合条件，则返回 null。未原生实现此方法的适配器仍可通过基于事务的回退机制正常工作。`SecondaryStorage.increment` 会以原子方式递增计数器，并且仅在首次创建键时设置其生存时间。

- [#9987](https://github.com/better-auth/better-auth/pull/9987) [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8) 感谢 [@bytaesu](https://github.com/bytaesu)！- 修复 JWKS 缓存可能在每次访问令牌验证时增长而导致的内存泄漏。

- [#10003](https://github.com/better-auth/better-auth/pull/10003) [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- Microsoft Entra ID 登录现在会遵循配置的租户限制。`tenantId: "organizations"` 会拒绝个人 Microsoft 账户，而 `tenantId: "consumers"` 会拒绝工作和学校账户。此前，这两类账户都会被接受。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 并发请求不再能绕过配置的速率限制。内存速率限制存储不再无限增长，数据库后端会自行删除过期条目。自定义速率限制存储可以实现新的可选 `consume` 方法，以实现严格限制；未实现该方法时会保留先前行为，并记录一次性警告。

- [#10003](https://github.com/better-auth/better-auth/pull/10003) [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 没有邮箱的 Reddit 用户现在会收到一个不可路由的占位地址（`<id>@reddit.invalid`），而不是使用真实的 `reddit.com` 域名，因此该地址无法匹配可投递的邮箱。该地址仍未验证，并且 `mapProfileToUser` 可以提供真实邮箱。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加 `internalAdapter.reserveVerificationValue`。它会以原子方式记录一个单次使用标记（例如重放墓碑），从而确保多个并发调用者中恰好只有一个成功，其余调用者会发现该标记已被占用。基于数据库的验证存储是原子的；仅使用二级存储的验证则尽力保证原子性。

- [#9990](https://github.com/better-auth/better-auth/pull/9990) [`1dbf5bb`](https://github.com/better-auth/better-auth/commit/1dbf5bb59de5d628f0d07d5e846eba8287b831d7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强了多个流程中对请求的信任处理。即使无法确定客户端 IP，现在也会执行速率限制，而不再跳过。当未配置 `baseURL` 时，密码重置和验证链接会使用当前请求的主机，而不是服务器处理的第一个请求的主机；请求范围内的 `trustedOrigins` 回调也不再影响其他并发请求。OAuth 代理、Google One Tap 和 Expo 授权代理会拒绝不在 `trustedOrigins` 中的重定向目标和回调目标。Google reCAPTCHA 和 Cloudflare Turnstile 接受可选的 `expectedAction` 和 `allowedHostnames`，以拒绝为不同操作或主机名签发的令牌。服务器端 fetch 会拒绝更多保留的 IPv6 范围，格式错误的重定向参数会返回 400，而不是 500。

- [#10003](https://github.com/better-auth/better-auth/pull/10003) [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 微信登录现在可以通过文档所述的默认设置成功完成。此前，由于微信不返回邮箱地址，登录会失败。创建的用户会获得一个稳定且未经验证的占位邮箱；可通过 `mapProfileToUser` 提供真实邮箱。

## 1.6.16

### 补丁变更

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 根据配置的应用验证 Facebook 不透明访问令牌。此前，`verifyIdToken` 对任何非 JWT 令牌都会返回 `true`，而 `getUserInfo` 会使用调用方提供的令牌调用 Graph `/me`，却不检查该令牌由哪个应用签发，因此无法区分为其他 Facebook 应用签发的令牌。现在会通过 `debug_token` 端点检查 Facebook 令牌，要求 `is_valid` 为真、`app_id` 与已配置的客户端 ID 之一匹配，并且 `user_id` 与返回的用户资料匹配，之后才接受该令牌。要使用访问令牌登录，必须配置客户端密钥。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 根据 ID 令牌强制执行 Google `hd`（托管域）选项。此前，`hd` 仅作为授权提示发送给 Google，本身并不能将登录限制为配置的 Workspace 域名。设置 `hd` 后，已验证 ID 令牌（`verifyIdToken`）中的 `hd` 声明以及解码后的回调用户资料（`getUserInfo`）中都必须存在该声明且与配置匹配，否则登录会被拒绝。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 按来源隔离 JWKS 缓存。此前，访问令牌验证使用单个全局密钥集；只要其中包含与令牌 `kid` 匹配的密钥，就会重复使用该密钥集，而不考虑验证所针对的 JWKS 来源。当针对多个来源验证令牌时，如果两个来源有相同的 `kid`，令牌可能会与从其他来源获取的密钥匹配。现在缓存会按 JWKS 来源建立索引，并遵循 TTL，因此每次验证都会使用对应来源的密钥；TTL 到期后，轮换或移除的密钥也不再会被使用。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 在直接登录时对 PayPal ID 令牌进行密码学验证。此前，`verifyIdToken` 只解码 JWT 并检查是否存在 `sub` 声明，没有执行签名、签发者、受众或过期时间检查，因此任何格式正确且搭配有效访问令牌的令牌都会被接受。现在会使用 PayPal 的签发者和已发布的 JWKS（RS256）或客户端密钥（HS256）来验证令牌，将 `aud` 固定为配置的 `clientId`，限制 `maxTokenAge`，并在提供 `nonce` 时对其进行检查。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 停止将 Reddit 的 `oauth_client_id` 映射为用户邮箱。Reddit 的 `identity` 范围不会返回邮箱地址，而该提供商此前会将 `oauth_client_id`（用于标识 OAuth 应用，对该应用的所有用户都相同）存储为 `user.email`，并将 `has_verified_email` 作为 `emailVerified`。这会导致同一应用的所有 Reddit 用户共用一个“已验证”邮箱，可能造成隐式账户关联或接管。Reddit 提供商现在会在提供 `mapProfileToUser` 时使用其返回的邮箱，否则会回退到每个用户唯一的合成地址（`<reddit-user-id>@reddit.com`），并且不再将其标记为已验证。如需使用实际邮箱，请通过 `mapProfileToUser` 提供。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 修复 `verifyAccessToken` 在远程内省期间静默丢弃已配置的受众检查。此前，如果在 `verifyOptions` 中设置了必需的 `audience`，但内省响应没有包含 `aud` 声明，就会跳过受众验证，并接受来自该签发者的任何有效令牌。因此，同一签发者为其他资源或客户端签发的令牌也可能通过验证。现在验证会要求存在该声明：缺失或不匹配的 `aud` 都会被拒绝。根据 RFC 7662，`aud` 在内省响应中为可选项；对于确实会省略 `aud` 的授权服务器，可使用新的 `remoteVerify.allowMissingAudience: true` 标志恢复旧行为，但仍会拒绝受众不匹配的情况。

## 1.6.15

## 1.6.14

### 补丁变更

- [#9845](https://github.com/better-auth/better-auth/pull/9845) [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强 OAuth 提供商插件中的重定向 URI 验证。`isSafeUrlScheme` 和 `SafeUrlSchema` 不再调用 `URL.canParse`，因为某些受支持的运行时中没有该方法，调用时可能抛出异常，或静默禁用危险方案检查。现在会使用 `try`/`catch` 回退进行解析。根据 RFC 6749 §3.1.2，`SafeUrlSchema` 还会拒绝包含片段部分的重定向 URI。

## 1.6.13

### 次要变更

- [#9305](https://github.com/better-auth/better-auth/pull/9305) [`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth)：在 `signIn.social`、`linkSocial` 和 `signIn.sso` 中统一支持按请求配置 `additionalParams` 和 `loginHint`

  提供统一的扩展入口，以便按请求自定义提供商授权 URL。此前，Google 的 `access_type=offline` / `prompt=consent`、Cognito 的 `identity_provider=Google` 或 Microsoft 的 `domain_hint` 等动态参数只能作为静态服务器配置设置。

  ### 新增功能
  - `signIn.social`、`linkSocial` 和 `signIn.sso` 接受 `additionalParams: Record<string, string>`。这些值会作为查询参数追加到授权 URL 中。
  - `linkSocial` 也接受 `loginHint`，与 `signIn.social` 和 `signIn.sso` 的接口保持一致。
  - `OAuthProvider.createAuthorizationURL` 的输入契约新增 `additionalParams`；所有内置提供商都会将其传递给共享辅助函数。
  - Generic-OAuth 提供商会将调用时的 `additionalParams` 与配置级别的 `authorizationUrlParams` 合并；键冲突时以调用时的值为准。
  - Cognito 提供类型化配置选项 `identityProvider?: string`，该选项会映射到 `identity_provider` 查询参数，避免使用魔法字符串。

  ### 安全性
  - 共享的 `createAuthorizationURL` 辅助函数会静默丢弃调用方提供的 `RESERVED_AUTHORIZATION_PARAMS` 中的任何键（`state`、`client_id`、`redirect_uri`、`response_type`、`code_challenge`、`code_challenge_method`、`scope`）。请求体 Zod 模式会以 400 拒绝相同的键，因此在边界处就能明确发现误用，而不会静默覆盖安全关键参数。
  - 使用非标准客户端标识符的提供商（`wechat` → `appid`、`tiktok` → `client_key`）也会额外过滤这些键，避免调用方替换已配置的 OAuth 应用。
  - 集成正常运行所必需的提供商协议常量（`atlassian` → `audience`、`notion` → `owner`）会在最后合并，因此调用方提供的 `additionalParams` 无法覆盖它们。代表运维人员意图的已配置默认值（例如 Google `include_granted_scopes`、Cognito `identityProvider`）仍可由调用方覆盖。
  - 当解析后的提供商为 SAML 时，`signIn.sso` 会以 400 拒绝 `additionalParams`；SAML AuthnRequest 会经过签名，不能携带调用方提供的查询参数，因此静默丢弃这些参数会误导集成方。

  ### OpenAPI
  - 在 OpenAPI 生成器中添加 `ZodRecord` 处理，使 `z.record()` 字段生成带有类型化 `additionalProperties` 的 `type: object`。此外，还修复了一项长期存在的问题：`additionalData` 此前会被渲染为 `type: string`。

  ### 重构
  - `discord`、`roblox`、`zoom` 和 `slack` 提供商现在委托给共享的 `createAuthorizationURL` 辅助函数，并继承其 RFC 行为和保留键防护。
  - `tiktok` 和 `wechat` 保留手动 URL 构建（因其使用非标准 OAuth2 参数名称和 URL 片段要求），但会使用相同的保留键过滤器传递 `additionalParams`。

  关闭 [#2351](https://github.com/better-auth/better-auth/issues/2351)。
  关闭 [#5441](https://github.com/better-auth/better-auth/issues/5441)。
  关闭 [#5592](https://github.com/better-auth/better-auth/issues/5592)。
  关闭 [#5604](https://github.com/better-auth/better-auth/issues/5604)。
  取代 [#4992](https://github.com/better-auth/better-auth/issues/4992) 和 [#5443](https://github.com/better-auth/better-auth/issues/5443)。

- [#9657](https://github.com/better-auth/better-auth/pull/9657) [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强 `private_key_jwt` 和令牌端点客户端身份验证，并添加使修复从结构上得到保障的辅助函数。

  `@better-auth/core/oauth2` 现在公开 `encodeBasicCredentials` 和 `decodeBasicCredentials`。这对经过往返测试的函数遵循 RFC 6749 §2.3.1（分别对每个值执行 `application/x-www-form-urlencoded` 编码，仅在第一个 `:` 处分割）。解码器会以不区分大小写的方式接受方案，并根据 RFC 7235 §2.1 容忍凭据前一个或多个空格。客户端的 `client_secret_basic` 和服务器端的 Better Auth OAuth 提供商都会使用这些辅助函数，因此包含保留字符的凭据可以在整个调用链中正确往返，且 `basic xxx` 或 `Basic  xxx` 这样的标头也会被接受。

  `createPrivateKeyJwtClientAssertionGetter` 会立即验证选项。不支持的算法（`HS256`、`none`）、不含密钥材料的 JWK，以及显式 `algorithm` 与 JWK 内嵌的 `alg` 不一致，都会在构造时抛出错误，而不是等到首次请求令牌时才报错。`signPrivateKeyJwtClientAssertion` 会对直接调用者执行同样的检查。**破坏性变更：**此前，若 JWK 的 `alg` 不受支持但显式 `algorithm` 与其不同，配置会静默地使用显式选项进行签名；现在会在构造时失败。

  `@better-auth/oauth-provider` 会在模式层拒绝空的 `jwks` 负载（`jwks: []` 和 `jwks: { keys: [] }`），使文档所述的客户端元数据契约与 `checkOAuthClient` 已在运行时执行的限制保持一致。模式使用方（TypeScript、OpenAPI、生成的 SDK）现在也能看到该限制。

  当 `resolvePrivateKey` 回调未返回 `privateKeyJwk` 或 `privateKeyPem` 时，SSO `private_key_jwt` 流程会重定向并返回 `error_description=no_private_key_available`。此前，重定向路径仅在解析器完全不存在时才会提前结束；解析器返回空值时会继续执行，进而导致内部签名错误。

  `better-auth/test` 新增 `getHttpTestInstance`，它是 `getTestInstance` 的对应方法，会在操作系统分配的端口上绑定真实 HTTP 监听器，并根据发现的 URL 构建 auth 实例。它消除了测试文件各自复制粘贴的“临时服务器后重新绑定”竞态问题。

### 补丁变更

- [#9301](https://github.com/better-auth/better-auth/pull/9301) [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 `GenericOAuthConfig` 和 SSO `OIDCConfig` 中添加 `allowIdpInitiated`，以支持不带 `state` 参数发起 OAuth 的提供商（例如 Clever）。启用后，无状态回调会在服务器端使用新的 state 和 PKCE 重新启动 OAuth 流程，同时保留 CSRF 保护。还加强了 `parseState` 对 GET 回调中未定义请求体的处理。

- [#9845](https://github.com/better-auth/better-auth/pull/9845) [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强 OAuth 提供商插件中的重定向 URI 验证。`isSafeUrlScheme` 和 `SafeUrlSchema` 不再调用 `URL.canParse`，因为某些受支持的运行时中没有该方法，调用时可能抛出异常，或静默禁用危险方案检查。现在会使用 `try`/`catch` 回退进行解析。根据 RFC 6749 §3.1.2，`SafeUrlSchema` 还会拒绝包含片段部分的重定向 URI。

## 1.7.0-beta.3

## 1.7.0-beta.2

## 1.7.0-beta.1

## 1.7.0-beta.0

### 次要变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在整个技术栈中添加 `private_key_jwt`（RFC 7523）客户端身份验证。服务器使用非对称密钥验证 JWT 客户端断言；客户端则在授权码、刷新和客户端凭据流程中对其进行签名。

## 1.6.10

### 补丁变更

- [#9395](https://github.com/better-auth/better-auth/pull/9395) [`2220a6d`](https://github.com/better-auth/better-auth/commit/2220a6d6c25ebd24c8568131636389dc0c12f82b) 感谢 [@cyphercodes](https://github.com/cyphercodes)！- 当未安装 OpenTelemetry 时，将 Cloudflare Workers instrumentation 导入路由到纯 no-op 入口。

## 1.6.9

### 补丁变更

- [#9340](https://github.com/better-auth/better-auth/pull/9340) [`815ecf6`](https://github.com/better-auth/better-auth/commit/815ecf62b6f6c5bf656ab55da393ce63d7eed0a6) 感谢 [@erquhart](https://github.com/erquhart)！- 修复（core）：在适配器工厂中自引用 `./instrumentation`，使 `exports` 映射将 edge/browser 路由到纯变体

## 1.6.8

### 补丁变更

- [#9331](https://github.com/better-auth/better-auth/pull/9331) [`9aa8e63`](https://github.com/better-auth/better-auth/commit/9aa8e63de84549634216e13e407cf6d8aa61acc3) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复（oauth）：支持为可能不提供 email 的提供商使用 `mapProfileToUser` 回退

  对于可能不返回 email 地址的 OAuth 提供商（仅使用电话号码的 Discord 账户、Apple 后续登录、GitHub 私有 email、Facebook、LinkedIn 和 Microsoft Entra ID 托管用户），现在可以通过在 `mapProfileToUser` 中合成 email 来解除阻碍。拒绝日志消息现在会指向此变通方案以及新的[“处理不提供 Email 的提供商”](https://www.better-auth.com/docs/concepts/oauth#handling-providers-without-email)文档章节。

  提供商个人资料类型现在反映了 `email` 可能为 `null` 或不存在的情况：
  - `DiscordProfile.email` 为 `string | null` 且可选（未授予 `email` scope 时不存在）
  - `AppleProfile.email` 为可选
  - `GithubProfile.email` 为 `string | null`
  - `FacebookProfile.email` 为可选
  - `FacebookProfile.email_verified` 为可选（Meta 的 Graph API 不包含此字段）
  - `LinkedInProfile.email` 为可选
  - `LinkedInProfile.email_verified` 为可选
  - `MicrosoftEntraIDProfile.email` 为可选

  此前在 `mapProfileToUser` 中直接解引用 `profile.email` 的 TypeScript 使用者会看到与运行时实际情况相符的编译错误；请使用空值合并回退（`profile.email ?? ...`）或对字段进行 null 检查。

  如果提供商和 `mapProfileToUser` 都没有生成 email，登录仍会以 `error=email_not_found`（社交回调）或 `error=email_is_missing`（Generic OAuth 插件）拒绝。针对没有 email 的用户提供一等支持，并以 OpenID Connect Core §5.7 中的 `(providerId, accountId)` 为键进行标识，正在 [#9124](https://github.com/better-auth/better-auth/issues/9124) 中跟踪。

## 1.6.7

### 补丁变更

- [#9211](https://github.com/better-auth/better-auth/pull/9211) [`307196a`](https://github.com/better-auth/better-auth/commit/307196a405e067f4a863de2ed68528e8d4bdc162) 感谢 [@stewartjarod](https://github.com/stewartjarod)！- 当端点抛出 `APIError` 时，保留累积在 `ctx.responseHeaders` 上的 `Set-Cookie` 标头。来自 `deleteSessionCookie`（以及抛出异常前任何 `ctx.setCookie` / `ctx.setHeader` 调用）的 Cookie 副作用不再在错误路径中被悄悄丢弃。

- [#9281](https://github.com/better-auth/better-auth/pull/9281) [`4a180f0`](https://github.com/better-auth/better-auth/commit/4a180f0b0c084c59e7b006058d3fdbd8542face5) 感谢 [@ramonclaudio](https://github.com/ramonclaudio)！- 修复（core）：在 `browser`/`edge` 条件下提供 no-op `./instrumentation`，与 `./async_hooks` 保持一致

- [#9292](https://github.com/better-auth/better-auth/pull/9292) [`4f373ee`](https://github.com/better-auth/better-auth/commit/4f373eed8a42e02460dbd2ee9973b9493cea04eb) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 对通过 audience 验证 ID token 的提供商（Google、Apple、Microsoft Entra、Facebook、Cognito）支持使用 Client ID 数组。授权码流程使用第一项；验证 ID token 的 `aud` 声明时接受所有项，因此单个后端可以为 Web、iOS 和 Android 客户端提供服务，并使用各平台专属的 Client ID。

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

  传入单个字符串仍然有效；无需迁移。

  还从 `@better-auth/core/oauth2` 导出 `getPrimaryClientId`，供提供商作者使用：它返回主要 Client ID（原始字符串，或数组索引 0 处的项），与用于授权码流程的 `clientSecret` 配对。现在，提供商会在登录时拒绝空数组、空字符串和缺失的配置，而不是悄悄生成格式错误的授权 URL。Google、Apple 和 Facebook 都要求同时提供 `clientId` 和 `clientSecret`，因为这些提供商在服务器端代码交换时都要求客户端密钥。Microsoft Entra 和 Cognito 只要求 `clientId`，因为二者都支持仅使用 PKCE 的公共客户端流程（无需密钥）。

## 1.6.6

### 补丁变更

- [#9227](https://github.com/better-auth/better-auth/pull/9227) [`b5742f9`](https://github.com/better-auth/better-auth/commit/b5742f9d08d7c6ae0848279b79c8bcc0a09082d7) 感谢 [@bytaesu](https://github.com/bytaesu)！- 新增有界并发实用工具 `mapConcurrent`，位于 `@better-auth/core/utils/async`

- [#9111](https://github.com/better-auth/better-auth/pull/9111) [`a844c7d`](https://github.com/better-auth/better-auth/commit/a844c7dd087715678787cb10bf9670fad46e535b) 感谢 [@jonathansamines](https://github.com/jonathansamines)！- `@opentelemetry/api` 现在是可选的 peer dependency

- [#9226](https://github.com/better-auth/better-auth/pull/9226) [`e64ff72`](https://github.com/better-auth/better-auth/commit/e64ff720fb8514cb78aedd1660223d8b948284da) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将主机/IP 分类整合到 `@better-auth/core/utils/host`，并修复了先前各软件包独立使用的正则表达式检查所遗漏的多个环回/SSRF 绕过问题。

  **Electron 用户图片代理：已修复 SSRF 绕过（`@better-auth/electron`）。** `fetchUserImage` 先前使用专门的 IPv4/IPv6 正则表达式限制出站请求，但遗漏了多种绕过方式。以下所有地址在生产环境中都曾可访问，现在已被阻止：
  - `http://tenant.localhost/` 和其他 `*.localhost` 名称（RFC 6761 将整个顶级域保留用于环回）。
  - `http://[::ffff:169.254.169.254]/`（IPv4 映射的 IPv6 地址指向 AWS IMDS，这是经典的 SSRF 绕过方式）。
  - `http://metadata.google.internal/`、`http://metadata.goog/`（GCP 实例元数据）。
  - `http://instance-data/`、`http://instance-data.ec2.internal/`（AWS IMDS 的备用 FQDN）。
  - `http://100.100.100.200/`（Alibaba Cloud IMDS；位于 RFC 6598 共享地址空间 `100.64/10`，旧正则表达式未覆盖该空间）。
  - `http://0.0.0.0:PORT/`（Linux/macOS 内核会将未指定地址路由到环回地址：Oligo 的“0.0.0.0 Day”）。
  - `http://[fc00::...]/`、`http://[fd00::...]/`（RFC 4193 中的 IPv6 ULA），以及 IPv6 链路本地地址 `fe80::/10`，旧正则表达式均无法识别。

  现在也会拒绝文档专用地址范围（RFC 5737 / RFC 3849）、基准测试地址（`198.18/15`）、多播和广播地址。

  **`better-auth`：不再将 `0.0.0.0` 视为环回地址。** 先前 `packages/better-auth/src/utils/url.ts` 中的 `isLoopbackHost` 实现将 `0.0.0.0` 与 `127.0.0.1` / `::1` / `localhost` 归为一类。`0.0.0.0` 是未指定地址，而非环回地址；将其视为环回地址会使浏览器源请求能够访问绑定到 localhost 的开发服务（Oligo 的“0.0.0.0 Day”）。现在，此辅助函数支持完整的 `127.0.0.0/8` 范围和任意 `*.localhost` 名称，并拒绝 `0.0.0.0`。

  **`better-auth`：加强受信任源的子字符串检查。** `getTrustedOrigins` 先前在判断是否为动态 `baseURL.allowedHosts` 条目添加 `http://` 变体时使用 `host.includes("localhost") || host.includes("127.0.0.1")`。诸如 `evil-localhost.com` 或 `127.0.0.1.nip.io` 这样的错误配置会因此错误地获得受信任列表中的 HTTP 源。现在，该检查使用共享分类器，因此只有真正的环回主机才会获得 HTTP 变体。

  **`@better-auth/oauth-provider`：符合 RFC 8252。**
  - §7.3 的重定向 URI 匹配现在接受完整的 `127.0.0.0/8` 范围（而不只是 `127.0.0.1`）以及 `[::1]`，并支持灵活匹配端口。端口灵活匹配仅适用于 IP 字面量；根据 §8.3，DNS 名称（如 `localhost`）仍使用精确字符串匹配，因为环回地址不建议采用灵活匹配。
  - `validateIssuerUrl` 使用共享的环回检查，而非仅比较两个主机名字面量。

  **新增模块：`@better-auth/core/utils/host`。** 导出 `classifyHost`、`isLoopbackIP`、`isLoopbackHost` 和 `isPublicRoutableHost`。它提供一个遵循 RFC 6890 / RFC 6761 / RFC 8252 的实现，可处理 IPv4、IPv6（包括带括号的字面量、区域 ID、IPv4 映射地址，以及包含嵌入式 IPv4 递归解析的 6to4 / NAT64 / Teredo 隧道形式）和 FQDN，并包含经过筛选的云元数据 FQDN 集合。整个 monorepo 中所有专门的环回/私有/链路本地检查现在都统一使用该模块。

## 1.6.5

## 1.6.4

## 1.6.3

## 1.6.2

## 1.6.1

## 1.6.0

### 补丁变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 OpenTelemetry 跟踪中跳过将重定向 APIErrors 记录为 span 错误

## 1.6.0-beta.0

### 补丁变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 OpenTelemetry 跟踪中跳过将重定向 APIErrors 记录为 span 错误
