# @better-auth/oauth-provider

## 1.7.6

## 1.7.5

## 1.7.4

## 1.7.3

### 补丁变更

- [#11090](https://github.com/better-auth/better-auth/pull/11090) [`4d09d50`](https://github.com/better-auth/better-auth/commit/4d09d502254f1bfe65dafc8d813d803225429c4a) 感谢 [@Salman-Arshad](https://github.com/Salman-Arshad)！- 允许使用 `localhost` 回环重定向 URI 的原生 OAuth 客户端使用临时回调端口，并确保回环端口变化只影响端口。

## 1.7.2

### 补丁变更

- [#11010](https://github.com/better-auth/better-auth/pull/11010) [`bb8d7c4`](https://github.com/better-auth/better-auth/commit/bb8d7c4541992baedd53325761e19a919a805fc7) 感谢 [@bytaesu](https://github.com/bytaesu)！- 声明了服务器不支持的授权类型（例如 Claude 的企业级 `jwt-bearer` 授权类型）的客户端 ID 元数据文档客户端现在可以注册。只有与服务器没有任何共同授权类型的文档才会被拒绝。

- [#10979](https://github.com/better-auth/better-auth/pull/10979) [`fced1a5`](https://github.com/better-auth/better-auth/commit/fced1a5d360c14e6358f88dedc9014ff862873f1) 感谢 [@bytaesu](https://github.com/bytaesu)！- 允许相对回调和重定向 URL 使用标准的路径、查询和片段语法，同时保留开放重定向保护。

## 1.7.1

## 1.7.0

### 次要变更

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - OAuth 客户端现在会存储 `applicationType`，并在 OAuth 元数据中将其公开为 `application_type`。只有 `tokenEndpointAuthMethod` 决定身份验证方式：`"none"` 表示公开客户端，其他所有方式均表示机密客户端。旧版 `type` 和 `public` 字段已移除。

  `OAuthClient` 不再具有兜底的字符串索引。使用带名称的交叉类型（例如 `OAuthClient & YourExtensionMetadata`）显式建模自定义线缆扩展；旧版 `type` 和 `public` 字段不再能作为未知附加字段通过类型检查。
  - 动态、管理和用户管理的注册，在省略 `application_type` 时默认使用 `web`。Client ID Metadata Documents 会将省略的值保留为 `null`。
  - Web 重定向要求使用 HTTPS，且主机不能是环回地址。原生重定向接受已声明的 HTTPS URL、精确的 HTTP 环回主机，或反向域名形式的私用方案。
  - 注册资源选项控制资源链接。`mcp()` 默认会提供其受保护资源，因此基于标准的客户端不再需要 `resources` 扩展。
  - `mcp()` 不再启用未经身份验证的 Dynamic Client Registration。将 `mcp()` 与 `cimd()` 组合使用以支持 Client ID Metadata Documents，或显式启用两个 DCR 标志。

  此版本需要数据库迁移。添加 `applicationType` 和可空的 `clientDiscoveryId`；将旧的 `web` 和 `native` 值直接映射，将 `user-agent-based` 映射为 `NULL` 以便手动重新分类，且绝不要从 `public` 推导该值。仅根据已知的发现来源设置 `clientDiscoveryId`，绝不要通过检查 HTTPS 客户端 ID 来设置。在添加新的复合唯一索引之前，先对现有的 `(clientId, resourceId)` 链接去重，然后删除旧列。使用自定义架构映射的部署必须手动执行此回填。

  机器到机器的作用域授权现在单独存储在可空的 `oauthClient.clientCredentialsScopes` 中。缺失、`NULL` 和空值都会禁止签发 `client_credentials` 令牌。只有管理端创建和更新端点会公开 `client_credentials_scopes`，并且分配非空值需要 `clientPrivileges` 批准新的 `configure-client-credentials-scopes` 操作。DCR、CIMD 和用户管理的注册无法分配此字段；CIMD 刷新会保留现有的管理员所有值。移除 `clientCredentialGrantDefaultScopes`，将每个现有客户端回填为 `[]`，将 `[]` 配置为新行的默认值，然后在审核客户端后，明确分配每个已批准的机器作用域。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - Client ID Metadata Documents 现在遵循共享缓存的新鲜度规则，并在新鲜度有歧义时采取封闭失败策略。该插件优先使用 `s-maxage`，而非 `max-age` 和 `Expires`，遵循 `s-maxage=0`，使用 ETag 或 Last-Modified 有条件地重新验证，并将无效或重复的新鲜度指令视为立即过期。并发刷新会汇聚到同一个客户端-资源链接，而不是因其唯一约束而失败。

  共享 OAuth 元数据验证现在会拒绝空白的 `client_name`，但不会对有效的显示名称进行修剪。原生私用重定向要求使用 RFC 8252 单斜杠形式，例如 `com.example.app:/callback`。原生 HTTP 重定向只接受精确的 `localhost`、`127.0.0.1` 或 `[::1]` 主机；其他 `127.0.0.0/8` 地址和 localhost 子域名均会被拒绝。

  CIMD 现在通过 `metadataFetchPolicy` 限制元数据请求放大：同一客户端的请求会合并，按客户端节流以及全局/按来源的并发限制会立即拒绝请求，滚动 60 秒预算则限制唯一客户端的突发请求。HTTP `no-store`、`private` 和 `Vary: *` 行为保持不变，且绝不会将元数据或验证器提供给限流器。

  Node.js 部署可以从 `@better-auth/cimd/node` 导入 `fetchClientMetadataResource`。该传输只解析一次，拒绝任何非公共 DNS 答案，在不使用全局 HTTPS 池的情况下固定已批准的连接，保留 Host 和 TLS 证书身份，并返回重定向和响应正文而不进行缓冲。其他运行时仍需负责提供同等安全的传输。

  未知的 draft-02 元数据成员现在会被忽略，且永不持久化。已识别的机密、权限字段和服务器控制字段仍会导致失败，而通用内部别名和非标准的 client-credentials 授权拼写会被剥除。

- [#9159](https://github.com/better-auth/better-auth/pull/9159) [`cd8313b`](https://github.com/better-auth/better-auth/commit/cd8313ba003a8b3c46b11fefeae9a53305908cc3) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 添加 `@better-auth/cimd`，用于支持 [Client ID Metadata Document draft-02](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-client-id-metadata-document-02)。精确的 HTTPS 元数据文档 URL 会成为 OAuth `client_id`，并且安装该插件后，OAuth 发现会声明支持此功能。显式的 `metadataProfile: "mcp-2026-07-28"` 模式会应用 MCP 2026-07-28 固定采用的 draft-00 元数据要求。
  - 验证完整的共享 OAuth 客户端元数据架构。通用 draft-02 客户端可以省略 `client_name` 和 `redirect_uris`，并可使用 OAuth Provider 支持的任何授权类型；MCP 配置文件要求提供 `client_id`、`client_name` 和 `redirect_uris`。
  - 拒绝客户端机密、私有 JWK 材料、反向通道注销元数据、服务器拥有的字段、不安全的元数据 URL、非 JSON 响应、超大文档、重定向以及私有或保留的网络目标。不再支持环回 Client Identifier URL。
  - 通过统一的公共非对称密钥边界验证已注册、已发现和远程获取的客户端 JWKS。RFC 7517 JWK Set 必须使用 `{ "keys": [...] }`；将已移除的裸数组形式 `jwks: [key]` 替换为 `jwks: { keys: [key] }`。空、格式错误、对称、私有和不受支持的密钥集会在进入按 Provider 隔离的缓存之前失败。EC 密钥必须使用 P-256、P-384 或 P-521；OKP 密钥必须使用 Ed25519。声明的 `alg` 必须与密钥类型和曲线匹配。通过 `oauthToSchema` 写入的现有 OAuth 客户端行已经过规范化，因此无需重写数据库，除非这些行是在 Better Auth 之外写入的。
  - 要求部署方提供 `fetchClientMetadataResource`，作为元数据文档和发现所有的 `jwks_uri` 资源所用的传输。它必须只解析一次，拒绝 RFC 6890 特殊用途地址，为连接固定已批准的地址，并拒绝重定向。`isMetadataDocumentUrlAllowed` 仍可用于附加的应用策略。
  - 仅缓存有效的成功元数据，并采用有界存储、HTTP 共享缓存新鲜度规则、ETag 和 Last-Modified 条件重新验证，以及封闭失败的刷新行为。`Cache-Control: private` 和 `Vary: *` 不可缓存，且无条件的 `304` 会被拒绝。
  - 将 `oauthClient.clientDiscoveryId` 作为可空的发现来源信息持久化。发现 ID 全局唯一，且所属客户端在无法获取对应发现时会采取封闭失败策略。只有该发现可以刷新客户端，或为其元数据所有的资源提供传输，因此托管客户端和 DCR HTTPS 客户端 ID 无法被接管。
  - 创建或刷新客户端时，保留自定义模型名称、资源链接和管理员控制的客户端标志。刷新通知现在会接收 `previousClient`。

  OAuth Provider 还为自定义的已验证客户端解析插件公开了 `clientDiscovery`。发现项可以提供 `fetchClientMetadataResource`，其稳定的 `id` 会作为客户端来源信息持久化。

  预发布版本的使用者必须将 `createCimdResolver` 或 `cimdClientDiscovery` 重命名为 `createCimdClientDiscovery`，将 `ClientIdMetadataDocumentResult` 重命名为 `CimdMetadataValidationResult`，将 `ValidateCimdMetadataOptions` 重命名为 `CimdMetadataValidationOptions`，将 `isUrlClientId` 重命名为 `isCimdClientIdUrlCandidate`，并将 `MetadataDocumentFetch` 重命名为 `ClientMetadataResourceFetch`。将 `refreshRate` 重命名为 `metadataRevalidationInterval`；没有兼容性回退。数值形式的重新验证和 `minimumFetchInterval` 值以秒为单位。

  生命周期回调现在会接收命名的 `CimdClientCreatedEvent` 和 `CimdClientRefreshedEvent` 值。从 `clientMetadataDocument` 而不是 `metadata` 读取已验证的元数据，并从 `context` 而不是 `ctx` 读取端点上下文。现在必须提供 `CimdOptions`，因为 `fetchClientMetadataResource` 是必需的。移除预发布版本中的 `allowFetch`、`fetchMetadataDocument` 和 `allowLoopback` 选项。

  使用 CIMD 时，移除 `allowUnauthenticatedClientRegistration`，除非授权服务器有意将 Dynamic Client Registration 作为独立的后备机制支持。

- [#10746](https://github.com/better-auth/better-auth/pull/10746) [`6782647`](https://github.com/better-auth/better-auth/commit/6782647d7c2d248246f9ef3980e656725c29ce64) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - OAuth 设备授权现在与 `oauthProvider()` 或 `mcp()` 一起使用 `oauthDeviceAuthorization()`。这项单一集成取代了独立的 `deviceCodeGrant()` 插件和共享授权配置。独立的 Device Authorization 不再接受或存储 RFC 8707 资源，且 `onDeviceAuthRequest` 只会接收 `clientId` 和 `scope`。OAuth 集成会拒绝非绝对或包含片段的资源指示符 URI。

  OAuth 集成会将可选的 `resource` 列替换为 `oauthClientId` 和 `resources`。使用该集成时请重新生成并应用架构。从较早的 1.7 预发布版本升级前，请让待处理的 OAuth 设备代码过期或将其删除，因为它们无法通过新集成兑换。

- [#10156](https://github.com/better-auth/better-auth/pull/10156) [`e3125e8`](https://github.com/better-auth/better-auth/commit/e3125e872d40cdd6588cbcb65d8ca0d640bae15b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - OIDC Provider 现在会遵循 `claims.userinfo` 授权请求参数。客户端可以请求单个标准声明，UserInfo 端点会在作用域授权的声明之外，返回其能够提供的声明。请求的声明会成为用户同意内容的一部分，并且发现信息中会公布 `claims_parameter_supported`。

  使用 `claims` 参数但未请求 `openid` 作用域的授权请求会被拒绝。

  通过 `claims.userinfo` 请求的声明也适用于不透明访问令牌。对于 JWT 访问令牌，UserInfo 只会返回已授权作用域所涵盖的声明，因此客户端需要特定声明时，应请求对应的基础作用域。

  这会在 OAuth 访问令牌、刷新令牌和同意表中添加 `requestedUserInfoClaims` 列。升级后请运行数据库迁移。

- [#10146](https://github.com/better-auth/better-auth/pull/10146) [`a8200b2`](https://github.com/better-auth/better-auth/commit/a8200b297c4092cb51397a9285ef4d1f024dea75) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - OAuth Provider 现在允许服务器设置 `clientRegistrationRequirePKCE: false`，以允许通过 Dynamic Client Registration 创建的机密客户端在不使用 PKCE 的情况下完成授权码流程。公开客户端和带有 `offline_access` 的授权请求仍然需要 PKCE。

- [#9277](https://github.com/better-auth/better-auth/pull/9277) [`5c6de4e`](https://github.com/better-auth/better-auth/commit/5c6de4ed265e7aa30e7e42a0e493386cf3ad6c96) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - OAuth Provider 端点现在会针对格式错误的请求返回标准 OAuth `{ error, error_description }` 响应。令牌请求会区分缺少输入（`invalid_request`）、客户端身份验证失败（`invalid_client`）以及无效或不匹配的授权（`invalid_grant`）。HTTP Basic 身份验证失败也会返回带有 `WWW-Authenticate` 挑战的 `401`。

  授权错误会重定向到已注册客户端的可信重定向 URI，并附带 `state` 和 `iss`。除非客户端显式请求查询模式，否则隐式 `token` 和 `id_token` 响应会使用 URL 片段。没有可信重定向 URI 的请求仍会使用服务器错误页面。

  令牌、内省和撤销请求现在会将空凭据值视为未提供，拒绝重复的非空客户端凭据，并要求机密客户端使用其已注册的 `token_endpoint_auth_method`。内省和撤销请求还会忽略无法识别的 `token_type_hint` 值，而不是拒绝请求。

- [#9836](https://github.com/better-auth/better-auth/pull/9836) [`b4b0867`](https://github.com/better-auth/better-auth/commit/b4b086722c2da179f885ad2680e10ed3410ad849) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 将 OAuth 2.0 资源指示符（RFC 8707）绑定到授权许可。之前，系统会从令牌请求中读取请求的 `resource` 值，并且只针对服务器级别的 `validAudiences` 允许列表进行检查。因此，客户端可以为任何列入允许列表的资源获取访问令牌，不受授权内容限制。现在 Provider 会在 `/authorize` 捕获 `resource`，将其记录在授权许可中，并允许令牌和刷新端点缩小范围，但不能扩大范围。刷新令牌会保留原始授权许可中的资源（RFC 8707 §2.2），并且 `/oauth2/introspect` 会报告令牌的 `aud`。

  破坏性变更：授权中包含 `resource` 时，令牌和刷新请求只能缩小范围。请求授权未涵盖的资源会返回 `invalid_target`。`customAccessTokenClaims` 回调现在接收 `resources` 数组，而不再接收 `resource` 字符串。

  迁移：运行架构迁移（`npx auth migrate`，如果自行管理架构则运行 `npx auth generate`），以添加新的资源列。

- [#9069](https://github.com/better-auth/better-auth/pull/9069) [`c7d2253`](https://github.com/better-auth/better-auth/commit/c7d22539ec4f7322d9625ae2953d397c3863d097) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 将通用 OAuth 插件重写为一流的社交 Provider，并采用 OAuth 2.1 安全默认值。现在 Provider 使用 `signIn.social` + `callback/:id`，而不是专用插件端点，并默认要求 PKCE（OAuth 2.1）、验证 RFC 9207 issuer、自动发现 OIDC 并注入 `openid` 作用域，同时提供类型化的 Provider ID。

  **破坏性变更：**
  - `signIn.oauth2({ providerId })` 替换为 `signIn.social({ provider })`
  - `oauth2.link()` 替换为 `linkSocial()`
  - 回调 URL 从 `/api/auth/oauth2/callback/:id` 更改为 `/api/auth/callback/:id`
  - 移除 `genericOAuthClient()`；通用 OAuth Provider 现在使用标准社交客户端 API
  - `pkce` 默认值变为 `true`（原为 `false`）；对于拒绝 PKCE 的 Provider，请设置 `pkce: false`
  - `authorizationUrlParams` 和 `tokenUrlParams` 只接受 `Record<string, string>`
  - 移除 `issuer` 和 `requireIssuerValidation` 配置字段；通过 OIDC 发现自动验证 issuer
  - `mapProfileToUser` 的 profile 类型为 `OAuth2UserInfo & Record<string, unknown>`

- [#10140](https://github.com/better-auth/better-auth/pull/10140) [`335cda7`](https://github.com/better-auth/better-auth/commit/335cda702ef8e2aecad4b26a427f16953e3aabd2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - `customIdTokenClaims`、扩展 ID 令牌声明和按签发设置的 `idTokenClaims` 不再能设置 issuer、subject、audience、令牌有效期、nonce、会话或哈希绑定、`auth_time`、`acr`、`amr` 或 `azp` 等 OIDC/JWT 协议声明。命名空间自定义声明仍会出现在 ID 令牌中。

- [#10790](https://github.com/better-auth/better-auth/pull/10790) [`a966815`](https://github.com/better-auth/better-auth/commit/a966815b134cbfda0565724cd533f584347443cf) 感谢 [@bytaesu](https://github.com/bytaesu)！ - ID 令牌现在使用 `acr: "0"`，表示身份验证未达到 ISO/IEC 29115 级别 1，且 OpenID 发现信息只会公布 `"0"`。由于 `acr_values` 是可选的，对其他级别的请求会继续处理，而不会失败。在 OpenID Connect 流程中，如果必需的 `value` 或 `values` 无法满足，必需的 `claims.id_token.acr` 请求仍会失败。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 遇到作用域限制的 MCP 客户端现在可以准确获知需要申请哪些作用域。缺少受保护作用域时，会返回带有 RFC 6750 `insufficient_scope` `WWW-Authenticate` 挑战的 `403`，并列出所有缺少的作用域。客户端可以将这些作用域合并到一个授权请求中，而不必为每个作用域分别打开一次浏览器重定向。
  - 通过 `RequireMcpAuthOptions` 或对应的 `createMcpProtectedRequestHandler` 验证器选项中的 `requiredScopes` 配置受保护作用域。默认仍要求精确匹配；`isScopeSatisfied` 可定义分层策略。
  - 当某个操作动态确定所需作用域时，使用 `createInsufficientScopeError`。`createResourceServerChallenge` 会将该信号和已识别的令牌错误转换为安全的 RFC 6750 挑战。
  - 仅将 `challengeScopes` 用作未通过身份验证时的挑战提示。

  处理程序生成的响应、普通权限拒绝、配置失败和无关的抛出值均会保留其原始状态和身份。

- [#9992](https://github.com/better-auth/better-auth/pull/9992) [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - MCP 插件已从 `better-auth` 移至独立软件包 `@better-auth/mcp`，并基于 `@better-auth/oauth-provider` 构建。从该软件包根目录导入授权插件和受保护请求辅助工具。移除了内置的 MCP 客户端（`createMcpAuthClient` 及其适配器）；MCP 协议和传输客户端应使用官方版本 2 的 `@modelcontextprotocol/client` 和 `@modelcontextprotocol/server` 软件包。OAuth 端点从 `/mcp/*` 移至 `/oauth2/*`，发现端点位于 `/.well-known/oauth-authorization-server`，受保护资源元数据位于 `/.well-known/oauth-protected-resource`。基于发现的 MCP 客户端会自行获取新的位置。

  共享身份验证路由辅助工具从 `withMcpAuth` 重命名为 `requireMcpAuth`。独立的受保护资源工厂从 `mcpHandler` 重命名为 `createMcpProtectedRequestHandler`；传入一个扁平的 `McpProtectedRequestHandlerOptions` 对象，其中包含 `issuer`、单个 `audience`、可选的 `jwtVerifyOptions`、令牌验证字段和挑战字段。其回调会接收 `accessTokenClaims`。`requireMcpAuth` 会根据已发布的 JWKS 验证访问令牌，验证绑定到 DPoP 的令牌所附的 DPoP 证明，并将已验证的访问令牌声明传递给处理程序。

  `createInsufficientScopeError` 现在会在创建错误时，根据 RFC 6750 `error_description` 字符集验证自定义描述。无效描述会抛出 `TypeError("invalid error_description")`，避免错误进入资源挑战序列化流程。

  MCP 2026-07-28 使用无状态请求和响应传输。使用版本 2 的 `@modelcontextprotocol/server` 提供 MCP 路由，将 `createMcpHandler` 配置为 `legacy: "reject"`，使用 `requireMcpAuth` 包装它，并且只导出 `POST`。移除 MCP 路由的 `GET` 和 `DELETE` 导出，以及 `redisUrl` 等会话存储选项。OAuth 客户端、同意、授权码、刷新令牌和安全记录仍是持久化的授权状态。

  迁移时，请安装 `@better-auth/mcp`、`@better-auth/cimd`，以及应用所需的官方版本 2 MCP 客户端或服务器软件包；添加现在签署令牌所必需的 `jwt()` 插件；并将之前嵌套在 `oidcConfig` 下的选项移至 `mcp({ ... })` 的扁平选项。数据库模型也会更改：`oauthApplication` 变为 `oauthClient`，并新增 `oauthRefreshToken` 和 `oauthClientAssertion` 表。使用 `npx auth migrate` 或 `npx auth generate` 重新生成或迁移架构。

- [#10045](https://github.com/better-auth/better-auth/pull/10045) [`2fd3d58`](https://github.com/better-auth/better-auth/commit/2fd3d5850006d164317d4f53a81ac95f2d1f549a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - `/oauth2/introspect` 现在会为不透明访问令牌和 JWT 访问令牌返回相同的声明，并允许资源服务器内省面向自身的令牌。

  现在，对不透明令牌进行内省会返回与相同授权许可的 JWT 所携带的声明：你的 `customAccessTokenClaims` 和任何按资源设置的 `customClaims`。不透明令牌过去返回的声明较少。服务器拥有保留的声明名称（`iss`、`sub`、`aud`、`scope`、`auth_time` 等）；如果 `customAccessTokenClaims` 回调返回这些名称，现在会将其丢弃，而不是覆盖服务器的值。

  每次内省都会重新计算不透明令牌的声明，因此响应会反映当前状态。删除其资源后，它现在会报告 `{ active: false }`，与 JWT 相同。禁用一个 resource 会在现有令牌过期前继续保持其有效。相比之下，JWT 始终反映签发时签名的内容。

  资源服务器现在可以内省签发给其他客户端的令牌。这是常见的配置：前端持有令牌，独立的 API 对其进行验证。API 必须注册为资源，并与客户端关联。任何其他经过身份验证的客户端仍会收到 `{ active: false }`，且刷新令牌只能由请求它的客户端进行内省。

- [#10039](https://github.com/better-auth/better-auth/pull/10039) [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - feat(oauth-provider)!：绑定 DPoP 的访问令牌（RFC 9449）

  OAuth provider 集成现在可以签发并验证受 DPoP 发送方约束的令牌。客户端可在注册时通过 `dpop_bound_access_tokens`、在授权请求中通过 `dpop_jkt`，或通过指定配置了 `dpopBoundAccessTokensRequired` 的资源来请求此类令牌。签发的令牌包含 `cnf.jkt`，返回 `token_type: "DPoP"`，并在刷新令牌轮换、内省和 userinfo 流程中保持绑定。

  资源服务器可使用 `verifyAccessTokenRequest` 验证 DPoP 请求。该函数会检查 `Authorization: DPoP` 方案、证明、请求目标、访问令牌哈希以及证明重放。MCP package 会在受保护资源元数据中声明支持 DPoP，并验证绑定 DPoP 的请求。证明重放会通过数据库支持的验证存储被拒绝，因此防重放保护可跨实例生效。`verifyAccessTokenRequest` 和 `requireMcpAuth` 默认使用该存储；可通过 `createDpopReplayStore(internalAdapter)` 创建一个存储，或传入自定义的 `dpop.replayStore`。此功能需要数据库支持的验证存储：仅使用辅助存储的部署会拒绝 DPoP 请求，而不是跳过重放保护。

  破坏性变更：原始令牌验证器 `verifyAccessToken` 更名为 `verifyBearerToken`，在 `better-auth/oauth2` 和 `oauthProviderResourceClient` action 中均如此，并且它会拒绝绑定 DPoP 的令牌。任何可能收到此类令牌的端点都应使用 `verifyAccessTokenRequest`。资源请求输入类型从 `AccessTokenRequestInput` 更名为 `ResourceRequestInput`，DPoP 算法选项在所有位置统一为 `signingAlgorithms`。

  请针对 DPoP 令牌绑定字段运行 schema migration：即 access-token 和 refresh-token 表上的 `confirmation` 列。绑定 DPoP 的客户端还会新增 `dpopBoundAccessTokens`，资源则会新增 `dpopBoundAccessTokensRequired`。不会新增专用的重放表；证明重放会复用验证存储。

- [#9079](https://github.com/better-auth/better-auth/pull/9079) [`6f2948e`](https://github.com/better-auth/better-auth/commit/6f2948e87bb5fa14bd2174a91f7143e1eced1b87) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - feat(oauth-provider)：根据 OIDC Core §3.1.3.6 在 ID token 中计算 `at_hash`

  现在，与访问令牌一同签发的 ID token 会包含 `at_hash` 声明，该声明会以加密方式绑定这两个令牌，以防止令牌替换攻击。哈希算法根据实际签名密钥的算法选择（EdDSA/Ed25519 使用 SHA-512，RS/ES/PS384 使用 SHA-384，RS/ES/PS512 使用 SHA-512，其他算法均使用 SHA-256）。

  `better-auth/plugins` 现在提供了新的 `resolveSigningKey()` 导出，用于解析当前 JWKS 签名密钥（包括其算法）。使用自定义 `jwt.sign` 回调时，会验证已签名 ID token 的 header 是否与声明的算法匹配，以防止 `at_hash` 不匹配。

- [#9304](https://github.com/better-auth/better-auth/pull/9304) [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 通过 OIDC Back-Channel Logout 1.0 将退出登录操作传播到每个已连接的应用，并立即切断 API 访问。

  当用户在 OP 处结束会话（退出登录、`/oauth2/end-session`、管理员撤销、封禁）时，`@better-auth/oauth-provider` 现在会通知所有持有该会话令牌的 Relying Party。用户的 API 访问会立即被切断，而不是等到访问令牌各自的 TTL 到期。每个客户端都可以通过 DCR 或管理员客户端创建端点注册 `backchannel_logout_uri`（以及可选的 `backchannel_logout_session_required`）以启用此功能。Provider 会为每个客户端签署一个 `logout+jwt` Logout Token，并并行 POST 给该客户端，同时为每个 RP 设置较短的超时时间。

  **破坏性变更。** 对绑定会话已结束的 opaque 或 JWT 访问令牌进行内省时，现在会返回 `{ active: false }`，而 `/oauth2/userinfo` 会以 `invalid_token` 拒绝该令牌。此前，令牌会一直有效，直到自身 TTL 到期。如果你依赖访问令牌在用户会话结束后继续有效，此行为将不再成立。

  不带 `offline_access` 的刷新令牌会在会话结束时被撤销；带有 `offline_access` 的刷新令牌则会保留，以便长时间的 API 访问可以在浏览器会话结束后继续生效（OIDC Back-Channel Logout 1.0 §2.7）。会话结束时使访问令牌失效是超出 §2.7 要求之外的一项额外 OP 加固措施，通过会话存活状态强制执行，因此即使禁用 JWT plugin 也会生效。

  如果配置了宿主的后台任务处理程序，通知会通过该处理程序发送（Vercel `waitUntil`、Cloudflare `ctx.waitUntil`）；如果未配置处理程序，则会内联完成，以免请求结束时丢失通知。在无服务器运行时，请配置 `advanced.backgroundTasks.handler`，以确保退出登录操作保持快速。

  启用 JWT plugin 时，`/.well-known/openid-configuration` 和 `/.well-known/oauth-authorization-server` 的 Discovery 会声明 `backchannel_logout_supported: true` 和 `backchannel_logout_session_supported: true`。每个已注册的 `backchannel_logout_uri` 都必须是无凭据的公开 HTTPS URL，且不能包含片段；对于公开客户端和机密客户端，都会拒绝环回 HTTP。CIMD 文档无法注册后通道退出登录元数据。用于拦截私有、保留、隧道和云元数据主机的 SSRF 主机防护也适用于 `private_key_jwt` 客户端的 `jwks_uri`。

  `@better-auth/oauth-provider` 的 schema 变更：
  - `oauthClient.backchannelLogoutUri: string | null`
  - `oauthClient.backchannelLogoutSessionRequired: boolean`
  - `oauthAccessToken.revoked: Date | null`

  `better-auth` 的 `signJWT` 新增了可选的 `header` 参数，并会将其转发给自定义远程签名器。现在需要显式媒体类型的 JWT profile（例如 `typ: "logout+jwt"`）可以设置该参数，而无需使用底层签名原语。

- [#10135](https://github.com/better-auth/better-auth/pull/10135) [`f68044d`](https://github.com/better-auth/better-auth/commit/f68044dcfbd9fb83763249ed9509cfacbcce47be) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！ - 已注册的 OAuth 客户端现在可以使用 RFC 8628 设备流程获取 OAuth 访问令牌。在 `oauthProvider()` 或 `mcp()` 旁添加 `oauthDeviceAuthorization()`，在 `/device/code` 请求代码，并在用户批准后于 `/oauth2/token` 交换令牌。OAuth 和 OpenID Discovery 会声明 `device_authorization_endpoint`。

  设备授权请求可以绑定 RFC 8707 resource indicators。`GET /device` 会向拥有该请求且已通过身份验证的用户返回请求中的客户端、scopes 和 resources。令牌请求可以复用或缩小已批准的 resources 范围，但不能添加新资源。现有的第一方设备客户端仍会从 `/device/token` 获取 Better Auth 会话令牌。

  启用 `oauthDeviceAuthorization()` 会向 `deviceCode` 添加可空的 `oauthClientId` 和 `resources` 字段。添加集成后，请重新生成并应用数据库 schema。

  机密客户端使用其已注册的方法在 `/device/code` 进行身份验证，公开客户端则发送 `client_id`。空的 `client_id`、`scope`、`user_id` 和身份验证值会被视为未提供；这些参数中任何一个出现多个非空值时都会返回 `invalid_request`，而多个 `resource` 值仍受支持。只有当 `oauthDeviceAuthorization({ validateClient })` 接受未知 OAuth 客户端 ID 时，这些 ID 才会进入独立设备流程。

- [#10030](https://github.com/better-auth/better-auth/pull/10030) [`050ef2d`](https://github.com/better-auth/better-auth/commit/050ef2dfcf22429135b49804de195f945f59f3c1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 添加 OAuth Provider 扩展接口，使配套 plugins 可以注册令牌授权类型、基于断言的客户端身份验证方法、增量 Discovery 元数据、访问令牌/ID token/UserInfo 声明贡献者，以及客户端 ID Discovery 来源，而无需针对每项 OAuth RFC 修改 Provider 核心。可在 plugin 的 `init()` hook 中通过 `extendOAuthProvider(ctx, extension)` 注册。

  扩展内容受到约束：不同扩展之间的授权类型、身份验证方法和断言类型必须互不重叠；元数据和声明只会被添加，绝不会覆盖授权服务器核心内容。基于断言的客户端身份验证方法可以复用导出的 `consumeClientAssertion` helper，进行 RFC 7523 audience、有效期和 `jti` 重放检查。客户端身份验证策略只能证明调用者控制的是哪个客户端 ID。授权服务器会自行解析并授权客户端记录，并将其绑定到要签发的授权上，因此策略无法影响客户端的 grants、scopes 或启用状态，handler 也无法在授权一个 grant 的同时签发另一个 grant。

  Plugins 通过统一接口使用 Provider 功能。授权处理程序会收到一个 `provider`（用于解析客户端、签发令牌、对令牌进行哈希或查找、验证令牌），plugin 自身的端点可通过 `getOAuthProviderApi(ctx, opts, grantType?)` 获取同一个对象。调用 `issueTokens` 时传入 `confirmation`（RFC 7800 `cnf`），或从客户端身份验证策略返回该值，即可让签发的令牌受到发送方约束；`cnf` 由授权服务器负责管理，因此声明贡献者无法设置它。

  客户端 ID Discovery 也通过该接口提供：从外部来源解析客户端的 plugin 可通过 `extendOAuthProvider(ctx, { clientDiscovery })` 注册解析器，或者直接通过 `oauthProvider({ extensions: [{ clientDiscovery }] })` 组合使用。

- [#9936](https://github.com/better-auth/better-auth/pull/9936) [`0e1770a`](https://github.com/better-auth/better-auth/commit/0e1770ac7563a27b1daab96d5d571657b3a45f75) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 现在会强制执行 `max_age`。当客户端请求 `max_age`，且用户上次完成身份验证的时间早于该时间窗口时，Provider 会要求用户重新登录，生成的 ID token 中的 `auth_time` 也会反映此次新登录。此前，`max_age` 虽然会被接受，但不会被执行，因此依赖其不产生影响的流程现在会要求用户重新登录。

- [#10703](https://github.com/better-auth/better-auth/pull/10703) [`a796214`](https://github.com/better-auth/better-auth/commit/a7962147b3a759ce6da542300e31f3b5705a63fa) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！ - 从 oauth-provider plugin 中移除了 `silenceWarnings` 选项。该 plugin 已提供 oauth-authorization-server 和 openid-configuration 元数据端点，因此不再需要初始化警告以及用于屏蔽这些警告的配置标志。请从 oauthProvider 配置中删除所有 `silenceWarnings` 项。

- [#9648](https://github.com/better-auth/better-auth/pull/9648) [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！ - OAuth provider 现在会显式建模受保护资源。可通过 `resources` 配置资源，或通过 `oauthResource` 管理 API 创建资源。每个资源都可以定义令牌 TTL、允许的 scopes、自定义 JWT 声明和 JWT 签名固定项。

  已移除 `validAudiences`。请将现有的每个资源标识符移至 `resources`；通过 `oauthClientResource` 或 Dynamic Client Registration `resources`，将应仅限访问特定资源的客户端与这些资源关联。

  现在，访问令牌签发会根据请求中 RFC 8707 `resource` 值应用资源策略。OAuth provider 会将 scopes 缩小到资源允许列表，使用配置的最短 TTL，从自定义声明中剔除保留的 RFC 9068 声明名称，签发 `jti`，并保留重复的 `resource` 表单参数。

  刷新令牌 TTL 现在使用适用的最短有效期。如果部署中按资源配置的 `refreshTokenTtl` 长于 `refreshTokenExpiresIn`，刷新令牌将按 Provider 默认值过期，而不是使用更长的资源值。

  JWT 签名现在可以遵循按资源配置的固定项。`signJWT()` 接受 `signingKeyId` 和 `signingAlgorithm`；JWKS adapters 提供 `getKeyById()` 和 `getLatestKeyByAlg()`。`jwks` 表新增可空的 `alg` 和 `crv` 列，`keyPairConfigs` 可以在同一个 keyring 中配置多种算法。

  升级后，请运行 `npx auth generate` 并在部署前应用 migration。该 migration 会新增 `oauthResource`、`oauthClientResource` 和新的 `jwks` 列。如果不应用，使用 `signingAlgorithm` 的资源将无法找到匹配的密钥。

  资源服务器应在自身 origin 发布 RFC 9728 受保护资源元数据。OAuth provider 提供了 challenge helpers，可引导客户端访问这些元数据。

  `@better-auth/mcp` 现在要求显式设置 `resource` 选项。该 plugin 会将此标识符存储为 OAuth resource，为其发布 RFC 9728 受保护资源元数据，并将签发的访问令牌绑定到该资源。现有的 `mcp({ loginPage, consentPage })` 配置应添加受保护的 MCP 资源标识符，例如 `resource: "https://api.example.com/mcp"`。

- [#9970](https://github.com/better-auth/better-auth/pull/9970) [`3e852a2`](https://github.com/better-auth/better-auth/commit/3e852a26500446b2c4ad608933c71b616ceddba5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 撤销仍能通过本服务器验证的 JWT 访问令牌时，`/oauth2/revoke` 现在会返回 `400 unsupported_token_type`，而不是容易造成误解的 `200`。JWT 是自包含的，且不会被存储，因此服务器无法撤销它；此前的成功响应会造成可以撤销的假象，但令牌仍会持续有效，直到过期。已过期的 JWT 或 audience 被 OAuth 资源模型拒绝的 JWT 会验证失败，仍会返回成功的 `200` 空操作响应。

  若要切断 JWT 访问令牌的访问权限，请结束会话（退出登录、管理员撤销或后通道退出登录）；此操作会使绑定 `sid` 的令牌在内省和 userinfo 中变为非活动状态。也可以使用较短的令牌有效期。Opaque 令牌和刷新令牌的撤销行为不变。

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 为整个技术栈中的令牌端点请求添加客户端身份验证配置，包括 `private_key_jwt`（RFC 7523）。

  通用 OAuth providers 现在接受 `tokenEndpointAuth`，用于令牌端点客户端身份验证。JWT 客户端断言可使用 `tokenEndpointAuth: { method: "private_key_jwt", getClientAssertion }`；公开客户端可使用 `{ method: "none" }`；需要显式基于密钥的客户端身份验证时，可将 `{ method: "client_secret_basic" }` 或 `{ method: "client_secret_post" }` 与 `clientSecret` 配合使用。现有的 `authentication: "basic" | "post"` 选项仍可用于基于密钥的令牌请求。

  使用 `createPrivateKeyJwtClientAssertionGetter()` 从私钥签署 RFC 7523 断言。断言 getter 接收 `{ clientId, tokenEndpoint, grantType }`，因此集成无需在断言 helper 中重复客户端 ID 或令牌端点值。Core OAuth2 现在导出 private-key JWT 专用 helpers 和类型：`signPrivateKeyJwtClientAssertion`、`createPrivateKeyJwtClientAssertionGetter`、`PrivateKeyJwtSigningAlgorithm` 和 `PRIVATE_KEY_JWT_SIGNING_ALGORITHMS`。

  令牌端点客户端身份验证参数由 `clientId`、`clientSecret` 和 `tokenEndpointAuth` 推导。配置令牌端点身份验证时必须提供 `clientId`；基于密钥的令牌端点身份验证还必须提供 `clientSecret`。自定义令牌参数用于提供商特定字段，不能替代已配置的客户端身份验证值。

  `refreshAccessToken()` 现在会将 `resource` 值转发到刷新令牌请求，因此通过高级刷新 helper 和 `refreshAccessTokenRequest()` 均可使用 RFC 8707 resource indicators。

  同步 OAuth2 请求构建器 `createAuthorizationCodeRequest`、`createRefreshAccessTokenRequest` 和 `createClientCredentialsTokenRequest` 已移除。请改用异步的 `authorizationCodeRequest`、`refreshAccessTokenRequest` 和 `clientCredentialsTokenRequest` helpers。

  服务器会验证使用非对称密钥签署的 JWT 客户端断言，客户端也可以在授权码、刷新令牌和客户端凭据令牌请求中使用相同的令牌端点身份验证约定。

- [#10037](https://github.com/better-auth/better-auth/pull/10037) [`0143d69`](https://github.com/better-auth/better-auth/commit/0143d69195870ea6550a40add8618361dbbc3b8f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 机器客户端现在无需用户会话即可注册。向 `POST /oauth2/register` 的 `Authorization: Bearer` header 发送 RFC 7591 初始访问令牌，并使用新的 `validateInitialAccessToken` 选项进行验证。该功能可直接配置公开或机密客户端，每个客户端都可以选择性地标记所有者 `referenceId`。

  客户端创建端点现在会为新创建的客户端返回 `201 Created`。此前返回的是 `200 OK`。

- [#10145](https://github.com/better-auth/better-auth/pull/10145) [`5838df2`](https://github.com/better-auth/better-auth/commit/5838df2f4146433164ca16ffdba2d196a4f8ff51) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - OAuth Provider 现在可以在配置的 `refreshTokenReuseInterval` 内，为重复的刷新请求重放相同的刷新令牌响应。OAuth Provider 默认仍采用严格的重放处理；设置此选项即可启用重叠时间窗口。

  MCP plugin 会为每个已配置客户端将此间隔默认设为 30 秒。重试的刷新请求可以获取另一个请求轮换令牌时生成的响应。OAuth Provider 默认仍采用严格模式；在 `mcp()` 中设置 `refreshTokenReuseInterval: 0` 即可禁用重叠时间窗口。

### Patch Changes

- [#9930](https://github.com/better-auth/better-auth/pull/9930) [`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 Expo 和其他应用内浏览器中，匿名账户现在可以在社交登录和通用 OAuth 登录后关联；这些环境中的 OAuth 回调会在没有会话 Cookie 的情况下返回。`onLinkAccount` 会触发，匿名用户也会完成迁移；此前该操作会被静默跳过。

  插件现在可以通过新的 `addOAuthServerContext` API，在 OAuth 重定向期间传递服务器信任的数据，并可在回调中通过 `getOAuthState().serverContext` 读取。与 `additionalData` 不同，这些数据无法通过请求体设置，因此适合存放服务器必须信任的值。

  对于 `@better-auth/oauth-provider`，登录后的授权查询现在通过此服务器专用通道传递，因此无法再通过 `additionalData` 注入。

- [#10149](https://github.com/better-auth/better-auth/pull/10149) [`132e293`](https://github.com/better-auth/better-auth/commit/132e293d7a82db30d7d1a63fb32c28df863204ae) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth Provider 授权请求省略 `response_type` 时，现在会将 `invalid_request` 返回到已验证客户端的重定向 URI，而不是回退到提供程序错误页面。

- [#10151](https://github.com/better-auth/better-auth/pull/10151) [`267229b`](https://github.com/better-auth/better-auth/commit/267229bd24d5f918ac4c9c7eca7507e8c603e310) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为 OIDC 授权端点添加了表单编码的 POST 支持，并明确拒绝不受支持的 OpenID Connect 请求对象，返回标准的 `request_not_supported` 和 `request_uri_not_supported` 错误。

- [#10113](https://github.com/better-auth/better-auth/pull/10113) [`4fe730a`](https://github.com/better-auth/better-auth/commit/4fe730a9c12f2ff68ca84523817b550adc7b2982) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 通过 `extendOAuthProvider` 注册的 OAuth Provider 声明贡献者现在会收到签发会话的 ID。`claims.idToken` 或 `claims.accessToken` 贡献者可从 `input.sessionId` 读取该值，以便在 `authorization_code` 和 `refresh_token` 授权中派生每个会话的声明。没有会话时该值为 undefined，例如 `client_credentials`、不透明令牌内省，或会话已被删除的情况。

- [#10150](https://github.com/better-auth/better-auth/pull/10150) [`508d8d6`](https://github.com/better-auth/better-auth/commit/508d8d6f06488d33a44d11059c873fcb8721d7a1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth Provider 授权码重放现在会返回 `invalid_grant` 和 `400` 令牌响应，并撤销此前由该授权码签发的不透明令牌。

- [#10065](https://github.com/better-auth/better-auth/pull/10065) [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 携带凭据的 OAuth 和设备授权响应现在会一致地发送 `Cache-Control: no-store` 和 `Pragma: no-cache`，确保代理、CDN 和浏览器不会缓存这些响应。涵盖令牌、内省和用户信息端点、动态和管理员客户端注册、客户端密钥轮换，以及设备代码和设备令牌响应，包括这些端点返回的错误响应。

  端点通过 `metadata: { noStore: true }` 声明此设置；对于手动构建的响应，响应头集合已从 `@better-auth/core` 导出为 `NO_STORE_HEADERS`。

- [#10159](https://github.com/better-auth/better-auth/pull/10159) [`7d1288e`](https://github.com/better-auth/better-auth/commit/7d1288e7c56a2385713cbcc232a376a7fe228be4) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth 令牌端点会有条件地强制要求 `redirect_uri`：仅当授权请求中包含该参数时，才要求提供并进行匹配（RFC 6749 §4.1.3），因此，在未提供 `redirect_uri` 的情况下签发的授权码可以在不提供该参数的情况下兑换。与授权码绑定值不匹配的 `redirect_uri` 现在会返回 `invalid_grant`，而不是 `invalid_request`（RFC 6749 §5.2）。

- [#10152](https://github.com/better-auth/better-auth/pull/10152) [`d368217`](https://github.com/better-auth/better-auth/commit/d368217efc1265996460d96c539b2ca669e33d49) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OIDC UserInfo 响应会保留 `profile` 和 `email` 作用域声明，而不再默认将它们添加到授权码 ID 令牌中。

- [#10153](https://github.com/better-auth/better-auth/pull/10153) [`dd42701`](https://github.com/better-auth/better-auth/commit/dd42701af4b8aa56287c6890a8217a270249571f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 选择禁用 PKCE 的机密 OIDC 客户端，在授权请求同时包含 `openid` 和 `nonce` 时，现在可以请求 `offline_access`。

- [#9657](https://github.com/better-auth/better-auth/pull/9657) [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强了 `private_key_jwt` 和令牌端点客户端身份验证，并添加了使修复具备结构性保障的辅助函数。

  `@better-auth/core/oauth2` 现在导出 `encodeBasicCredentials` 和 `decodeBasicCredentials`，这对经过往返测试的函数遵循 RFC 6749 §2.3.1（分别对每个值进行 `application/x-www-form-urlencoded` 编码，仅按第一个 `:` 拆分）。解码器不区分大小写地接受身份验证方案，并按 RFC 7235 §2.1 容许凭据前有一个或多个空格。客户端侧的 `client_secret_basic` 和服务端的 Better Auth OAuth provider 都会使用这些辅助函数，因此包含保留字符的凭据可以在整个技术栈中正确往返，并且 `basic xxx` 或 `Basic  xxx` 这类请求头也会被接受。

  `createPrivateKeyJwtClientAssertionGetter` 会立即验证选项。不支持的算法（`HS256`、`none`）、不包含密钥材料的 JWK，以及显式 `algorithm` 与 JWK 内嵌的 `alg` 不一致，都会在构造时抛出错误，而不是等到首次令牌请求时才报错。`signPrivateKeyJwtClientAssertion` 对直接调用者也会执行相同检查。**重大变更：**过去将不支持的 JWK `alg` 与不同的显式 `algorithm` 配对时，会静默地使用显式选项签名；现在会在构造时失败。

  **重大变更：**`@better-auth/oauth-provider` 现在只接受符合 RFC 7517 的 JWK Set 对象作为客户端 `jwks` 元数据，该对象必须包含非空的 `keys` 数组。在 DCR 负载、管理端和用户客户端创建、Client ID Metadata Documents、测试夹具以及生成的客户端代码中，将 `jwks: [key]` 替换为 `jwks: { keys: [key] }`。远程获取的 `jwks_uri` 响应也必须使用相同的对象结构。EC 密钥必须使用 P-256、P-384 或 P-521；OKP 密钥必须使用 Ed25519。当密钥声明了 `alg` 时，它必须是受支持的 `private_key_jwt` 算法，且与密钥类型和曲线匹配；当客户端在断言头中选择算法时，应省略 `alg`。此前通过 `oauthToSchema` 写入的 OAuth 客户端行已存储为 JWK Set 对象，因此这属于请求、配置和类型迁移，而不是再次重写数据库；请单独审查在 Better Auth 之外写入的行。

  当 `resolvePrivateKey` 回调未返回 `privateKeyJwk` 或 `privateKeyPem` 时，SSO `private_key_jwt` 流程会重定向并附带 `error_description=no_private_key_available`。此前，重定向路径仅在完全不存在解析器时才会提前结束；解析器返回空值时会继续执行，最终导致内部签名错误。

  `better-auth/test` 新增了 `getHttpTestInstance`，它是 `getTestInstance` 的对应函数，会在操作系统分配的端口上绑定真实 HTTP 监听器，并使用发现的 URL 构造 auth 实例。它消除了测试文件各自复制粘贴的“临时服务器后重新绑定”竞态问题。

- [#10811](https://github.com/better-auth/better-auth/pull/10811) [`801968e`](https://github.com/better-auth/better-auth/commit/801968e354067869318718f4766d7011c0218a86) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `private_key_jwt` 客户端断言的 `aud` 可以使用接收端点 URL 或 OpenID Provider issuer。该声明可以是字符串，也可以是至少包含一个可接受值的数组。此规则适用于令牌、内省和撤销请求。

- [#10154](https://github.com/better-auth/better-auth/pull/10154) [`6f9a188`](https://github.com/better-auth/better-auth/commit/6f9a188bbb2665e56be1f1fb566eb1f5f919e1c8) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 当客户端尝试使用签发给另一个 OAuth 客户端的刷新令牌时，刷新令牌请求现在会返回 `invalid_grant`，并附带 `invalid refresh token` 描述。

- [#10812](https://github.com/better-auth/better-auth/pull/10812) [`f451d1c`](https://github.com/better-auth/better-auth/commit/f451d1c7589ddb4d2995fa54aee9375472ebea33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- RP-Initiated Logout 端点继续接受 `GET`，现在也接受表单编码的 `POST` 请求。它还支持 Better Auth 生成的客户端发送的 JSON 请求体。经明确确认后，浏览器用户无需 `id_token_hint` 即可注销，并会看到清晰的确认、成功或错误页面。无效的 ID 令牌提示会被安全地处理，注销重定向则要求与已注册的 `post_logout_redirect_uri` 完全匹配。

- [#10472](https://github.com/better-auth/better-auth/pull/10472) [`69acb7a`](https://github.com/better-auth/better-auth/commit/69acb7a3db3cd148a9cd1db5063dbdc69909165a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 只有在相关会话成功删除后，才会撤销与会话绑定的 OAuth 令牌并发送后通道注销通知。

- [#10155](https://github.com/better-auth/better-auth/pull/10155) [`5ac6249`](https://github.com/better-auth/better-auth/commit/5ac62493ef7296b4ac89359d257a0a99305ac189) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OIDC UserInfo `POST` 请求现在接受在 `application/x-www-form-urlencoded` 请求体中传递的 bearer 访问令牌。同时在 Authorization 请求头和表单请求体中发送 bearer 令牌的请求现在会返回 `invalid_request`。

- [#10068](https://github.com/better-auth/better-auth/pull/10068) [`6d97c47`](https://github.com/better-auth/better-auth/commit/6d97c4754c80010524b922c39b28a7afd4012457) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `/oauth2/userinfo` 现在会在访问令牌无效、过期、已撤销或未知时，返回带有 `WWW-Authenticate` 挑战的 `401 invalid_token` 响应。`/oauth2/introspect` 仍会将这些令牌报告为未激活。

## 1.7.0-rc.6

### 修补程序变更

- [#10811](https://github.com/better-auth/better-auth/pull/10811) [`801968e`](https://github.com/better-auth/better-auth/commit/801968e354067869318718f4766d7011c0218a86) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `private_key_jwt` 客户端断言的 `aud` 可以使用接收端点 URL 或 OpenID Provider issuer。该声明可以是字符串，也可以是至少包含一个可接受值的数组。此规则适用于令牌、内省和撤销请求。

- [#10812](https://github.com/better-auth/better-auth/pull/10812) [`f451d1c`](https://github.com/better-auth/better-auth/commit/f451d1c7589ddb4d2995fa54aee9375472ebea33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- RP-Initiated Logout 端点继续接受 `GET`，现在也接受表单编码的 `POST` 请求。它还支持 Better Auth 生成的客户端发送的 JSON 请求体。经明确确认后，浏览器用户无需 `id_token_hint` 即可注销，并会看到清晰的确认、成功或错误页面。无效的 ID 令牌提示会被安全地处理，注销重定向则要求与已注册的 `post_logout_redirect_uri` 完全匹配。

## 1.7.0-rc.5

### 次要变更

- [#10746](https://github.com/better-auth/better-auth/pull/10746) [`6782647`](https://github.com/better-auth/better-auth/commit/6782647d7c2d248246f9ef3980e656725c29ce64) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth 设备授权现在通过 `oauthDeviceAuthorization()` 与 `oauthProvider()` 或 `mcp()` 配合使用。这一集成取代了独立的 `deviceCodeGrant()` 插件和共享授权配置。独立设备授权不再接受或存储 RFC 8707 资源，`onDeviceAuthRequest` 仅接收 `clientId` 和 `scope`。OAuth 集成会拒绝非绝对 URI 或包含片段的资源指示符。

  OAuth 集成将可选的 `resource` 列替换为 `oauthClientId` 和 `resources`。使用该集成时，请重新生成并应用架构。从早期的 1.7 预发布版本升级前，请等待待处理的 OAuth 设备代码过期或将其删除，因为它们无法通过新集成兑换。

- [#10703](https://github.com/better-auth/better-auth/pull/10703) [`a796214`](https://github.com/better-auth/better-auth/commit/a7962147b3a759ce6da542300e31f3b5705a63fa) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 从 oauth-provider 插件中移除了 `silenceWarnings` 选项。该插件已经提供 oauth-authorization-server 和 openid-configuration 元数据端点，因此不再需要初始化警告以及用于关闭这些警告的配置标志。请从 oauthProvider 配置中删除所有 `silenceWarnings` 条目。

## 1.7.0-rc.4

## 1.7.0-rc.3

### 次要变更

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth 客户端现在会存储 `applicationType`，并在 OAuth 元数据中将其公开为 `application_type`。只有 `tokenEndpointAuthMethod` 决定身份验证方式：`"none"` 为公开客户端，其他所有方式均为机密客户端。旧版 `type` 和 `public` 字段已移除。

  `OAuthClient` 不再包含兜底的字符串索引。请使用命名交叉类型（如 `OAuthClient & YourExtensionMetadata`）显式建模自定义线缆扩展；旧版 `type` 和 `public` 字段不再能作为未知附加字段通过类型检查。
  - 动态、管理和用户管理的注册中，省略 `application_type` 时默认为 `web`。客户端 ID 元数据文档会将省略的值保留为 `null`。
  - Web 重定向要求使用 HTTPS，且主机不能是回环主机。原生重定向接受已声明的 HTTPS URL、精确匹配的 HTTP 回环主机，或反向域名形式的私有使用方案。
  - 注册资源选项控制资源链接。`mcp()` 默认会添加其受保护资源，因此符合标准的客户端不再需要 `resources` 扩展。
  - `mcp()` 不再启用未经身份验证的动态客户端注册。将 `mcp()` 与 `cimd()` 组合以使用客户端 ID 元数据文档，或显式启用这两个 DCR 标志。

  此版本需要数据库迁移。添加 `applicationType` 和可空的 `clientDiscoveryId`；将旧的 `web` 和 `native` 值直接映射，将 `user-agent-based` 映射为 `NULL` 以便手动重新分类，并且绝不要从 `public` 推导该值。只能根据已知的发现来源设置 `clientDiscoveryId`，绝不要通过检查 HTTPS 客户端 ID 来推导。添加新的复合唯一索引前，先对现有的 `(clientId, resourceId)` 链接去重，然后删除旧列。使用自定义架构映射的部署必须手动应用此回填。

  现在，机器对机器的作用域授权单独存储在可空的 `oauthClient.clientCredentialsScopes` 中。缺失、`NULL` 和空值都会拒绝签发 `client_credentials` 令牌。只有管理创建和更新端点会公开 `client_credentials_scopes`，且分配非空值需要 `clientPrivileges` 批准新的 `configure-client-credentials-scopes` 操作。DCR、CIMD 和用户管理的注册不能分配此字段；CIMD 刷新会保留现有的管理员所有值。移除 `clientCredentialGrantDefaultScopes`，将每个现有客户端回填为 `[]`，将 `[]` 配置为新行的默认值，然后在审核客户端后显式分配每个已批准的机器作用域。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 客户端 ID 元数据文档现在遵循共享缓存的新鲜度规则，并在新鲜度存在歧义时采取默认拒绝策略。该插件优先使用 `s-maxage`，而非 `max-age` 和 `Expires`，遵循 `s-maxage=0`，使用 ETag 或 Last-Modified 进行条件重新验证，并将无效或重复的新鲜度指令视为立即过期。并发刷新会收敛到同一个客户端资源链接，而不会因其唯一约束而失败。

  共享 OAuth 元数据验证现在会拒绝空白的 `client_name`，但不会裁剪有效的显示名称。原生私有使用重定向要求符合 RFC 8252 的单斜杠形式，例如 `com.example.app:/callback`。原生 HTTP 重定向仅接受精确的 `localhost`、`127.0.0.1` 或 `[::1]` 主机；其他 `127.0.0.0/8` 地址和 localhost 子域名均会被拒绝。

  CIMD 现在通过 `metadataFetchPolicy` 限制元数据请求放大：同一客户端的请求会合并，每客户端节流以及全局／每来源并发限制会立即拒绝请求，滚动 60 秒预算会限制唯一客户端的大量请求。HTTP `no-store`、`private` 和 `Vary: *` 行为保持不变，且绝不会将元数据或验证器传入调度器。

  Node.js 部署可以从 `@better-auth/cimd/node` 导入 `fetchClientMetadataResource`。传输层只解析一次 DNS，拒绝任何非公开 DNS 答案，不使用全局 HTTPS 连接池固定经批准的连接，保留 Host 和 TLS 证书身份，并在不缓冲的情况下返回重定向和响应正文。其他运行时仍需负责提供等效的安全传输。

  现在会忽略未知的 draft-02 元数据成员，且绝不会持久化。可识别的机密、权限字段和服务器控制字段仍会导致致命错误，而通用内部别名和非标准的客户端凭据授权拼写会被剥离。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 遇到作用域限制的 MCP 客户端现在会准确获知需要请求哪些作用域。缺少受保护作用域时，会返回带有 RFC 6750 `insufficient_scope` `WWW-Authenticate` 挑战的 `403`，并列出所有缺失作用域。客户端可以将这些作用域合并到一个授权请求中，而不必针对每个作用域分别打开浏览器重定向。
  - 通过 `RequireMcpAuthOptions` 或匹配的 `createMcpProtectedRequestHandler` 验证器选项中的 `requiredScopes` 配置受保护作用域。默认仍为精确匹配；`isScopeSatisfied` 可定义分层策略。
  - 在操作动态确定所需作用域时，使用 `createInsufficientScopeError`。`createResourceServerChallenge` 会将该信号和可识别的令牌错误转换为安全的 RFC 6750 挑战。
  - 仅将 `challengeScopes` 用作未经身份验证时的挑战提示。

  由处理程序生成的响应、普通权限拒绝、配置失败和无关的抛出值都保留其原始状态和标识。

- [#10135](https://github.com/better-auth/better-auth/pull/10135) [`f68044d`](https://github.com/better-auth/better-auth/commit/f68044dcfbd9fb83763249ed9509cfacbcce47be) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！- 已注册的 OAuth 客户端现在可以使用 RFC 8628 设备授权流程获取由提供方管理的 OAuth 令牌。在 `deviceAuthorization()` 和 `oauthProvider()` 旁添加 `deviceCodeGrant()`；客户端在 `/device/code` 请求代码，并在用户批准后通过 `/oauth2/token` 兑换代码。OAuth 和 OpenID 发现现在会公布 `device_authorization_endpoint`。

  设备授权请求可以绑定 RFC 8707 资源指示符。`GET /device` 现在会向拥有该请求的已认证用户返回请求中的 `client_id`、`scope` 和 `resource` 值，`onDeviceAuthRequest` 会将资源作为第三个参数接收。令牌请求可以重用或缩小已批准的资源集合，但会拒绝添加资源的请求。现有第一方设备客户端仍会从 `/device/token` 获取 Better Auth 会话令牌。

  `deviceCode` 表新增了可选的 `resource` 字段。部署此更新前，请运行 `npx @better-auth/cli generate` 并应用迁移。

## 1.7.0-rc.2

### 补丁变更

- [#10472](https://github.com/better-auth/better-auth/pull/10472) [`69acb7a`](https://github.com/better-auth/better-auth/commit/69acb7a3db3cd148a9cd1db5063dbdc69909165a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 仅在相关会话删除成功后，才撤销与会话绑定的 OAuth 令牌并发送后通道注销。

## 1.7.0-rc.1

## 1.7.0-rc.0

## 1.7.0-beta.10

### 次要变更

- [#10145](https://github.com/better-auth/better-auth/pull/10145) [`5838df2`](https://github.com/better-auth/better-auth/commit/5838df2f4146433164ca16ffdba2d196a4f8ff51) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth Provider 现在可以在配置的 `refreshTokenReuseInterval` 期间，为重复的刷新请求重放相同的刷新令牌响应。OAuth Provider 默认仍严格处理重放；设置此选项即可启用重叠窗口。

  MCP 插件会将所有已配置客户端的该间隔默认设为 30 秒。重试的刷新请求可以取回另一个请求轮换令牌时生成的响应。OAuth Provider 默认仍严格处理重放；在 `mcp()` 上设置 `refreshTokenReuseInterval: 0` 即可禁用重叠窗口。

## 1.7.0-beta.9

### 次要变更

- [#10156](https://github.com/better-auth/better-auth/pull/10156) [`e3125e8`](https://github.com/better-auth/better-auth/commit/e3125e872d40cdd6588cbcb65d8ca0d640bae15b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OIDC 提供方现在会遵循 `claims.userinfo` 授权请求参数。客户端可以请求单个标准声明，UserInfo 端点会在作用域授权的声明之外，返回其能够提供的声明。请求的声明会成为用户授权同意的一部分，并且发现文档会公布 `claims_parameter_supported`。

  对不透明访问令牌，通过 `claims.userinfo` 请求的声明会得到遵循。对于 JWT 访问令牌，UserInfo 仅返回已授权作用域所覆盖的声明，因此客户端需要特定声明时，请求其对应的作用域。

  这会在 OAuth 访问令牌、刷新令牌和授权同意表中添加 `requestedUserInfoClaims` 列。升级后请运行数据库迁移。

- [#10146](https://github.com/better-auth/better-auth/pull/10146) [`a8200b2`](https://github.com/better-auth/better-auth/commit/a8200b297c4092cb51397a9285ef4d1f024dea75) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth Provider 现在允许服务器设置 `clientRegistrationRequirePKCE: false`，从而允许通过动态客户端注册创建的机密客户端在不使用 PKCE 的情况下完成授权码流程。公开客户端和包含 `offline_access` 的授权请求仍要求使用 PKCE。

- [#10140](https://github.com/better-auth/better-auth/pull/10140) [`335cda7`](https://github.com/better-auth/better-auth/commit/335cda702ef8e2aecad4b26a427f16953e3aabd2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- ID 令牌现在报告 `acr: "0"`，而非 InCommon Bronze URI。默认 OpenID 发现文档不再公布 `acr_values_supported`，因为提供方目前尚不支持可请求的 ACR 类别。

  `customIdTokenClaims`、扩展 ID 令牌声明和每次签发的 `idTokenClaims` 现在都不能设置 OIDC/JWT 协议声明，例如 issuer、subject、audience、令牌有效期、nonce、会话或哈希绑定、`auth_time`、`acr`、`amr` 或 `azp`。命名空间自定义声明仍会出现在 ID 令牌中。

### 补丁变更

- [#10149](https://github.com/better-auth/better-auth/pull/10149) [`132e293`](https://github.com/better-auth/better-auth/commit/132e293d7a82db30d7d1a63fb32c28df863204ae) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth Provider 授权请求省略 `response_type` 时，现在会将 `invalid_request` 返回到已验证的客户端重定向 URI，而不是回退到提供方错误页面。

- [#10151](https://github.com/better-auth/better-auth/pull/10151) [`267229b`](https://github.com/better-auth/better-auth/commit/267229bd24d5f918ac4c9c7eca7507e8c603e310) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为 OIDC 授权端点添加了表单编码 POST 支持，并明确使用标准的 `request_not_supported` 和 `request_uri_not_supported` 错误拒绝不受支持的 OpenID Connect 请求对象。

- [#10150](https://github.com/better-auth/better-auth/pull/10150) [`508d8d6`](https://github.com/better-auth/better-auth/commit/508d8d6f06488d33a44d11059c873fcb8721d7a1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth Provider 现在会在授权码重放时返回带有 `400` 令牌响应的 `invalid_grant`，并撤销此前从该授权码签发的不透明令牌。

- [#10159](https://github.com/better-auth/better-auth/pull/10159) [`7d1288e`](https://github.com/better-auth/better-auth/commit/7d1288e7c56a2385713cbcc232a376a7fe228be4) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 OAuth 令牌端点中有条件地强制校验 `redirect_uri`：仅当授权请求包含该参数时，才要求提供并进行匹配（RFC 6749 §4.1.3），因此，签发时未包含 `redirect_uri` 的授权码在兑换时也可以不提供该参数。不匹配授权码绑定值的 `redirect_uri` 现在会返回 `invalid_grant`，而非 `invalid_request`（RFC 6749 §5.2）。

- [#10152](https://github.com/better-auth/better-auth/pull/10152) [`d368217`](https://github.com/better-auth/better-auth/commit/d368217efc1265996460d96c539b2ca669e33d49) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 OIDC UserInfo 响应中保留 `profile` 和 `email` 作用域声明，而不是默认将它们添加到授权码 ID 令牌中；公布 `acr_values_supported: ["0"]`；并拒绝不受支持的 `acr_values` 授权请求，而不是静默降级。

- [#10153](https://github.com/better-auth/better-auth/pull/10153) [`dd42701`](https://github.com/better-auth/better-auth/commit/dd42701af4b8aa56287c6890a8217a270249571f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许已选择不使用 PKCE 的机密 OIDC 客户端在授权请求同时包含 `openid` 和 `nonce` 时请求 `offline_access`。

- [#10154](https://github.com/better-auth/better-auth/pull/10154) [`6f9a188`](https://github.com/better-auth/better-auth/commit/6f9a188bbb2665e56be1f1fb566eb1f5f919e1c8) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 客户端尝试使用签发给另一 OAuth 客户端的刷新令牌时，刷新令牌请求现在会返回带有 `invalid refresh token` 描述的 `invalid_grant`。

- [#10155](https://github.com/better-auth/better-auth/pull/10155) [`5ac6249`](https://github.com/better-auth/better-auth/commit/5ac62493ef7296b4ac89359d257a0a99305ac189) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OIDC UserInfo `POST` 请求现在接受请求正文中 `application/x-www-form-urlencoded` 格式的 bearer 访问令牌。如果请求同时在 Authorization 标头和表单正文中发送 bearer 令牌，则现在会返回 `invalid_request`。

- 已更新依赖项 []：
  - better-auth@1.7.0-beta.9
  - @better-auth/core@1.7.0-beta.9

## 1.7.0-beta.8

### 补丁变更

- 已更新依赖项 [[`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d), [`06daf70`](https://github.com/better-auth/better-auth/commit/06daf7011e548ef5a7d513c96e3a440331977a7d), [`a83152e`](https://github.com/better-auth/better-auth/commit/a83152e2e884b1ac1724f95cea2056795d60e5cc), [`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0), [`3a79aff`](https://github.com/better-auth/better-auth/commit/3a79aff58ed82e45caf04c2ee4acaf0f4d09a86c)]：
  - better-auth@1.7.0-beta.8
  - @better-auth/core@1.7.0-beta.8

## 1.7.0-beta.7

### 补丁变更

- [#10113](https://github.com/better-auth/better-auth/pull/10113) [`4fe730a`](https://github.com/better-auth/better-auth/commit/4fe730a9c12f2ff68ca84523817b550adc7b2982) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 通过 `extendOAuthProvider` 注册的 OAuth Provider 声明贡献者现在会收到签发会话的 ID。`claims.idToken` 或 `claims.accessToken` 贡献者可以从 `input.sessionId` 读取该值，以便在 `authorization_code` 和 `refresh_token` 授权类型中派生每个会话的声明。没有会话时，该值为 undefined，例如 `client_credentials`、不透明令牌内省，或会话已被删除的情况。

- 已更新依赖项 [[`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3), [`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0)]：
  - better-auth@1.7.0-beta.7
  - @better-auth/core@1.7.0-beta.7

## 1.7.0-beta.6

### 次要变更

- [#9992](https://github.com/better-auth/better-auth/pull/9992) [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- MCP 插件从 `better-auth` 中移出，成为独立的软件包 `@better-auth/mcp`，并基于 `@better-auth/oauth-provider` 构建。请从 `@better-auth/mcp` 导入服务器插件及其辅助工具，并从 `@better-auth/mcp/client` 和 `@better-auth/mcp/client/adapters` 导入远程客户端和适配器（此前分别从 `better-auth/plugins` 和 `better-auth/plugins/mcp/client` 导入）。OAuth 端点从 `/mcp/*` 移至 `/oauth2/*`，发现端点位于 `/.well-known/oauth-authorization-server`，受保护资源元数据位于 `/.well-known/oauth-protected-resource`。基于发现机制的 MCP 客户端会自动使用新的位置。

  路由辅助函数重命名为 `requireMcpAuth`（原为 `withMcpAuth`），远程客户端重命名为 `createMcpResourceClient`（原为 `createMcpAuthClient`）。`requireMcpAuth` 会根据已发布的 JWKS 验证 bearer token，并将经过验证的 JWT 声明传递给你的处理函数。

  迁移时，请安装 `@better-auth/mcp`，添加 `jwt()` 插件（现在签署 token 时必须使用），并将此前嵌套在 `oidcConfig` 下的选项移至 `mcp({ ... })` 的平铺选项中。数据库模型也有变更：`oauthApplication` 变为 `oauthClient`，并新增 `oauthRefreshToken` 和 `oauthClientAssertion` 表。请使用 `npx auth migrate` 或 `npx auth generate` 重新生成或迁移你的 schema。

- [#10045](https://github.com/better-auth/better-auth/pull/10045) [`2fd3d58`](https://github.com/better-auth/better-auth/commit/2fd3d5850006d164317d4f53a81ac95f2d1f549a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `/oauth2/introspect` 现在会对 opaque 和 JWT access token 返回相同的声明，并允许资源服务器 introspect 为其签发的 token。

  现在 introspect opaque token 会返回与相同授权所签发的 JWT 携带的声明：你的 `customAccessTokenClaims` 以及任何针对资源的 `customClaims`。此前 opaque token 返回的声明较少。保留声明名称（`iss`、`sub`、`aud`、`scope`、`auth_time` 等）由服务器管理；如果 `customAccessTokenClaims` 回调返回其中某个声明，该声明现在会被丢弃，而不会覆盖服务器的值。

  每次 introspect opaque token 时都会重新计算其声明，因此响应会反映当前状态。删除其资源后，响应会变为 `{ active: false }`，与 JWT 相同。停用资源不会影响现有 token 的有效性，直到它们过期。相比之下，JWT 始终反映签发时签入其中的内容。

  资源服务器现在可以 introspect 签发给其他客户端的 token。这是常见的配置：前端持有 token，由独立的 API 对其进行验证。API 必须注册为资源，并与客户端关联。任何其他已认证的客户端仍会收到 `{ active: false }`，而 refresh token 只能由请求它的客户端 introspect。

- [#10039](https://github.com/better-auth/better-auth/pull/10039) [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth-provider)!：DPoP 绑定的 access token（RFC 9449）

  OAuth provider 集成现在可以签发和验证受 DPoP 发送方约束的 token。客户端可以在注册时通过 `dpop_bound_access_tokens` 请求此类 token，在授权请求中通过 `dpop_jkt` 请求，或将请求发送至配置了 `dpopBoundAccessTokensRequired` 的资源。签发的 token 携带 `cnf.jkt`，返回 `token_type: "DPoP"`，并在 refresh token 轮换、introspection 和 userinfo 过程中保持绑定。

  资源服务器可使用 `verifyAccessTokenRequest` 验证 DPoP 请求；该函数会检查 `Authorization: DPoP` 方案、proof、请求目标、access token 哈希以及 proof 重放。MCP 软件包会在受保护资源元数据中声明支持 DPoP，并验证绑定了 DPoP 的请求。通过数据库支持的验证存储拒绝重放的 proof，因此可在多个实例间防止重放。`verifyAccessTokenRequest` 和 `requireMcpAuth` 默认使用该存储；你也可以使用 `createDpopReplayStore(internalAdapter)` 创建一个，或传入自定义的 `dpop.replayStore`。此功能需要数据库支持的验证存储：仅使用二级存储的部署会拒绝 DPoP 请求，而不会跳过重放保护。

  破坏性变更：原始 token 验证函数 `verifyAccessToken` 重命名为 `verifyBearerToken`，该变更同时适用于 `better-auth/oauth2` 和 `oauthProviderResourceClient` 操作，且该函数会拒绝绑定了 DPoP 的 token。对于任何可能收到这类 token 的端点，请使用 `verifyAccessTokenRequest`。资源请求输入类型从 `AccessTokenRequestInput` 重命名为 `ResourceRequestInput`，DPoP 算法选项统一为 `signingAlgorithms`。

  请运行 schema 迁移，添加 DPoP token 绑定字段：access token 表和 refresh token 表上的 `confirmation` 列。绑定了 DPoP 的客户端还会新增 `dpopBoundAccessTokens`，资源则会新增 `dpopBoundAccessTokensRequired`。不会新增专用的重放表；proof 重放检查会复用验证存储。

- [#10030](https://github.com/better-auth/better-auth/pull/10030) [`050ef2d`](https://github.com/better-auth/better-auth/commit/050ef2dfcf22429135b49804de195f945f59f3c1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 新增 OAuth Provider 扩展接口，使配套插件无需因每项 OAuth RFC 而更改 provider 核心代码，即可注册 token 授权类型、基于断言的客户端认证方法、附加发现元数据、access-token/ID-token/UserInfo 声明贡献者以及 client-id 发现来源。可在插件的 `init()` 钩子中通过 `extendOAuthProvider(ctx, extension)` 进行注册。

  扩展贡献受到约束：不同扩展的授权类型、认证方法和断言类型必须互不重叠；元数据和声明只会附加，绝不会覆盖授权服务器核心内容。基于断言的客户端认证方法可以复用导出的 `consumeClientAssertion` 辅助函数，以进行 RFC 7523 audience、有效期和 `jti` 重放检查。客户端认证策略只能证明调用方控制了哪个 client id。授权服务器会自行解析并授权客户端记录，并将其绑定到正在签发的授权，因此策略无法影响客户端的授权类型、scope 或启用状态，处理函数也无法在授权一种 grant 的同时签发另一种。

  插件通过统一接口使用 provider 功能。授权处理函数会接收 `provider`（用于解析客户端、签发 token、计算 token 哈希或查找 token，以及验证 token），插件自身的端点则可通过 `getOAuthProviderApi(ctx, opts, grantType?)` 获取同一对象。通过向 `issueTokens` 传入 `confirmation`（RFC 7800 `cnf`），或由客户端认证策略返回该值，可以让签发的 token 受发送方约束；`cnf` 由授权服务器管理，因此声明贡献者无法设置它。

  客户端 ID 发现功能通过此接口提供：从外部来源解析客户端的插件，可通过 `extendOAuthProvider(ctx, { clientDiscovery })` 注册该功能，也可以通过 `oauthProvider({ extensions: [{ clientDiscovery }] })` 直接组合。

- [#9648](https://github.com/better-auth/better-auth/pull/9648) [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！- OAuth provider 现在会显式建模受保护资源。可通过 `resources` 配置资源，或通过 `oauthResource` 管理 API 创建资源。每个资源均可定义 token TTL、允许的 scope、自定义 JWT 声明和 JWT 签名密钥固定配置。

  `validAudiences` 已移除。请将每个现有资源标识符移入 `resources`；通过 `oauthClientResource` 或动态客户端注册中的 `resources`，关联应受特定资源限制的客户端。

  现在签发 access token 时，会对请求中的 RFC 8707 `resource` 值应用资源策略。OAuth provider 会根据资源允许列表缩小 scope，使用配置的最短 TTL，从自定义声明中剔除 RFC 9068 保留声明名称，生成 `jti`，并保留重复的 `resource` 表单参数。

  Refresh token 的 TTL 现在采用适用的最短有效期。如果部署配置的某个资源的 `refreshTokenTtl` 长于 `refreshTokenExpiresIn`，refresh token 将按照 provider 默认值过期，而不再使用该资源较长的有效期。

  JWT 签名现在可以遵循每个资源的密钥固定配置。`signJWT()` 接受 `signingKeyId` 和 `signingAlgorithm`；JWKS 适配器会公开 `getKeyById()` 和 `getLatestKeyByAlg()`。`jwks` 表新增可空的 `alg` 和 `crv` 列，`keyPairConfigs` 可在一个 keyring 中配置多种算法。

  升级后，请运行 `npx @better-auth/cli generate` 并在部署前应用迁移。迁移会新增 `oauthResource`、`oauthClientResource` 和新的 `jwks` 列。若不应用迁移，使用 `signingAlgorithm` 的资源将无法找到匹配的密钥。

  资源服务器应在自身 origin 发布 RFC 9728 受保护资源元数据。OAuth provider 提供挑战辅助函数，用于指引客户端前往该元数据。

  `@better-auth/mcp` 现在要求显式指定 `resource` 选项。该插件会将此标识符存储为 OAuth 资源，为其发布 RFC 9728 受保护资源元数据，并将签发的 access token 绑定到该资源。现有的 `mcp({ loginPage, consentPage })` 配置应添加受保护 MCP 资源标识符，例如 `resource: "https://api.example.com/mcp"`。

- [#10037](https://github.com/better-auth/better-auth/pull/10037) [`0143d69`](https://github.com/better-auth/better-auth/commit/0143d69195870ea6550a40add8618361dbbc3b8f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 机器客户端现在无需用户会话即可注册。向 `POST /oauth2/register` 的 `Authorization: Bearer` 标头发送 RFC 7591 初始访问 token，并使用新增的 `validateInitialAccessToken` 选项验证该 token。这样可以直接配置公开或机密客户端，并可为每个客户端添加可选的所有者 `referenceId`。

  新创建客户端的端点现在会返回 `201 Created`，此前返回的是 `200 OK`。

### 补丁变更

- [#10065](https://github.com/better-auth/better-auth/pull/10065) [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 携带凭据的 OAuth 和设备授权响应现在都会统一发送 `Cache-Control: no-store` 和 `Pragma: no-cache`，使代理、CDN 和浏览器都不会缓存这些响应。涵盖的端点包括 token、introspection 和 userinfo 端点，动态客户端注册和管理客户端注册、客户端密钥轮换，以及设备码和设备 token 响应，也包括这些端点的错误响应。

  端点通过 `metadata: { noStore: true }` 声明此设置；由代码手动构建的响应可使用从 `@better-auth/core` 导出的标头集合 `NO_STORE_HEADERS`。

- [#10068](https://github.com/better-auth/better-auth/pull/10068) [`6d97c47`](https://github.com/better-auth/better-auth/commit/6d97c4754c80010524b922c39b28a7afd4012457) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 当 access token 无效、过期、已撤销或未知时，`/oauth2/userinfo` 现在会返回带有 `WWW-Authenticate` challenge 的 `401 invalid_token` 响应。`/oauth2/introspect` 仍会将这些 token 报告为非活跃状态。

- 更新的依赖项 [[`b36c38f`](https://github.com/better-auth/better-auth/commit/b36c38f9842d3416689340552989449a32007819), [`73541c1`](https://github.com/better-auth/better-auth/commit/73541c119041113b1909fe244ff4b8210618b5b5), [`bf39cbf`](https://github.com/better-auth/better-auth/commit/bf39cbf13f3b934f728cde72b1e7ebdc4c85f641), [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222), [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9), [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627), [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734), [`652fa53`](https://github.com/better-auth/better-auth/commit/652fa53e4912837fe234651e7c7705fb35abe188), [`6fe9faa`](https://github.com/better-auth/better-auth/commit/6fe9faab65eb640dbe9bb762954a068586e8661c), [`ad35ead`](https://github.com/better-auth/better-auth/commit/ad35eadd130162565a1b93c27f3a66910dca0b0e)]：
  - better-auth@1.7.0-beta.6
  - @better-auth/core@1.7.0-beta.6

## 1.7.0-beta.5

### 次要变更

- [#9304](https://github.com/better-auth/better-auth/pull/9304) [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 通过 OIDC Back-Channel Logout 1.0，将退出登录事件传播到每个已连接的应用，并立即切断 API 访问。

  当用户在 OP 上的会话结束时（退出登录、`/oauth2/end-session`、管理员撤销、封禁），`@better-auth/oauth-provider` 现在会通知所有持有该会话 token 的信赖方。用户的 API 访问会立即切断，而不是等到 access token 自身的 TTL 到期。每个客户端可通过 DCR 或管理端客户端创建端点注册 `backchannel_logout_uri`（以及可选的 `backchannel_logout_session_required`），以选择加入此功能。Provider 会为每个客户端签署一个 `logout+jwt` Logout Token，并并行 POST 至对应客户端，每个 RP 均设有较短的超时时间。

  **破坏性变更。** 绑定会话已结束的 opaque 或 JWT access token，在 introspection 时现在会返回 `{ active: false }`，`/oauth2/userinfo` 则会以 `invalid_token` 拒绝该 token。此前该 token 会一直保持有效，直至自身 TTL 到期。如果你依赖 access token 在用户会话结束后继续有效，此行为将不再成立。

  不含 `offline_access` 的 refresh token 会在会话结束时撤销；含 `offline_access` 的 refresh token 会保留，以便长期 API 访问可在浏览器会话结束后继续（OIDC Back-Channel Logout 1.0 §2.7）。会话结束时使 access token 失效，是超出 §2.7 要求的额外 OP 加固措施，通过会话存活状态强制执行，因此即使禁用了 JWT 插件也有效。

  如果配置了宿主的后台任务处理器，通知会通过该处理器发送（Vercel `waitUntil`、Cloudflare `ctx.waitUntil`）；如果未配置处理器，则会在线程内完成，避免请求结束时丢失通知。在无服务器运行时中，请配置 `advanced.backgroundTasks.handler`，以保持退出登录操作快速完成。

  启用 JWT 插件时，`/.well-known/openid-configuration` 和 `/.well-known/oauth-authorization-server` 的发现信息会声明 `backchannel_logout_supported: true` 和 `backchannel_logout_session_supported: true`。注册 `backchannel_logout_uri` 时，会拒绝包含片段、使用非 http(s) scheme 的 URI，以及机密客户端使用的非 HTTPS 目标。其 SSRF 主机防护会阻止私有、保留、隧道和云元数据主机；现在该防护也覆盖 `private_key_jwt` 客户端的 `jwks_uri`。

  `@better-auth/oauth-provider` 的 schema 变更：
  - `oauthClient.backchannelLogoutUri: string | null`
  - `oauthClient.backchannelLogoutSessionRequired: boolean`
  - `oauthAccessToken.revoked: Date | null`

  `better-auth` 的 `signJWT` 新增可选的 `header` 参数，并会将其传递给自定义远程签名器。需要显式媒体类型的 JWT 配置（例如 `typ: "logout+jwt"`），现在无需使用底层签名原语即可设置。

- [#9936](https://github.com/better-auth/better-auth/pull/9936) [`0e1770a`](https://github.com/better-auth/better-auth/commit/0e1770ac7563a27b1daab96d5d571657b3a45f75) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `max_age` 现在会被强制执行。当客户端请求 `max_age`，且用户的认证时间早于该时间窗口时，provider 会将用户重定向回登录页面，生成的 ID token 中的 `auth_time` 也会反映重新登录时间。此前 `max_age` 虽会被接受，但会被忽略，因此原本依赖其不起作用的流程现在会提示用户重新登录。

- [#9970](https://github.com/better-auth/better-auth/pull/9970) [`3e852a2`](https://github.com/better-auth/better-auth/commit/3e852a26500446b2c4ad608933c71b616ceddba5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 撤销仍可通过此服务器验证的 JWT access token 时，`/oauth2/revoke` 现在会返回 `400 unsupported_token_type`，而不再返回容易造成误解的 `200`。JWT 是自包含的，且从不存储，因此服务器无法撤销它；此前成功响应暗示 token 已被撤销，但该 token 实际上仍会持续工作直到过期。已过期或 audience 错误的 JWT 会验证失败，仍会返回成功的 `200` 空操作响应。

  若要切断 JWT access token 的访问权限，请结束会话（退出登录、管理员撤销或 back-channel logout），这会使绑定了 `sid` 的 token 在 introspection 和 userinfo 中变为非活跃状态；或者使用较短的 token 有效期。Opaque token 和 refresh token 的撤销行为不变。

### 补丁变更

- [#9930](https://github.com/better-auth/better-auth/pull/9930) [`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 Expo 和其他应用内浏览器中，社交登录和通用 OAuth 登录后现在可以关联匿名账户，即使 OAuth 回调返回时没有会话 Cookie 也能正常工作。`onLinkAccount` 会触发，匿名用户也会迁移；此前，这一流程会被静默跳过。

  插件现在可以使用新的 `addOAuthServerContext` API，在 OAuth 重定向过程中传递服务器信任的数据，并在回调中通过 `getOAuthState().serverContext` 读取。与 `additionalData` 不同，此数据无法通过请求体设置，因此适合存放服务器必须信任的值。

  对于 `@better-auth/oauth-provider`，登录后的授权查询现在通过此服务器专用通道传递，因此无法再通过 `additionalData` 注入。

- 更新的依赖项 [[`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5), [`e014029`](https://github.com/better-auth/better-auth/commit/e0140297a59ddb59cccbcb4ba46c513de8cb86a7), [`ec8a38c`](https://github.com/better-auth/better-auth/commit/ec8a38c08f5cfe2d922be0f8a49f2d0fa84de799), [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2), [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f), [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f), [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b), [`76a3342`](https://github.com/better-auth/better-auth/commit/76a33429fc2a3edcc85307bf81b9d92a95f9de6c), [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f)]：
  - better-auth@1.7.0-beta.5
  - @better-auth/core@1.7.0-beta.5

## 1.7.0-beta.4

### 次要更改

- [#9836](https://github.com/better-auth/better-auth/pull/9836) [`b4b0867`](https://github.com/better-auth/better-auth/commit/b4b086722c2da179f885ad2680e10ed3410ad849) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将 OAuth 2.0 资源指示符（RFC 8707）绑定到授权授予。此前，`resource`（受众）从令牌请求中读取，且只根据服务器范围的 `validAudiences` 允许列表进行检查。因此，客户端可以获取针对任意允许列表中资源的访问令牌，无论授权内容涵盖什么。现在，提供程序会在 `/authorize` 时捕获 `resource`，将其记录在授权授予上，并允许令牌和刷新端点缩小范围，但不能扩大范围。刷新令牌会保留原始授权授予中的资源（RFC 8707 §2.2），而 `/oauth2/introspect` 会报告令牌的 `aud`。

  破坏性变更：当授权包含 `resource` 时，令牌和刷新请求只能缩小其范围。请求授权未涵盖的资源会返回 `invalid_target`。`customAccessTokenClaims` 回调现在接收 `resources` 数组，而不再接收 `resource` 字符串。

  迁移：运行架构迁移（`npx @better-auth/cli migrate`；如果你自行管理架构，则运行 `generate`），以添加新的资源列。

## 1.6.30

### 补丁更改

- 更新的依赖项 [[`07c1718`](https://github.com/better-auth/better-auth/commit/07c17189f58502bf038e5f22766f8a99df60ac99)]：
  - @better-auth/core@1.6.30
  - better-auth@1.6.30

## 1.6.29

### 补丁更改

- 更新的依赖项 [[`e6e1b4e`](https://github.com/better-auth/better-auth/commit/e6e1b4e8146a84d2a2c5fe2c497c81d03dfc2ad3)]：
  - better-auth@1.6.29
  - @better-auth/core@1.6.29

## 1.6.28

### 补丁更改

- 更新的依赖项 [[`773de54`](https://github.com/better-auth/better-auth/commit/773de54b18c0e920a3542bdecaf8b42fffc0dc4b), [`2ad2928`](https://github.com/better-auth/better-auth/commit/2ad2928f967afa9f9858caecd01466ecb8686982)]：
  - better-auth@1.6.28
  - @better-auth/core@1.6.28

## 1.6.27

### 补丁更改

- 更新的依赖项 [[`2ae491e`](https://github.com/better-auth/better-auth/commit/2ae491eac3ece50839a0eb2d4f868c4deedac67b), [`90b5093`](https://github.com/better-auth/better-auth/commit/90b509344794b8064700371cbc04b985d0519839)]：
  - @better-auth/core@1.6.27
  - better-auth@1.6.27

## 1.6.26

### 补丁更改

- 更新的依赖项 [[`9ede805`](https://github.com/better-auth/better-auth/commit/9ede8059b56e1415c1e8cfdd93ff72691b848bbf), [`5a811f1`](https://github.com/better-auth/better-auth/commit/5a811f1b4314b8bcf6f21c0b72de5cb67d552d97), [`d8327f1`](https://github.com/better-auth/better-auth/commit/d8327f1fea92243b6fea1b0ab183e2a989792c0c), [`e2c73fb`](https://github.com/better-auth/better-auth/commit/e2c73fbec87f5e19f6a2b5ac371bc5bba9bd49ff), [`af50c45`](https://github.com/better-auth/better-auth/commit/af50c45553a62cfb6cdcdede86828731ca00c22c), [`701cd43`](https://github.com/better-auth/better-auth/commit/701cd43babac52784d855291a6adc0cf3fba7970), [`a30e274`](https://github.com/better-auth/better-auth/commit/a30e274b5daed6057086d76b91d17abfa02196d7), [`e7b0eba`](https://github.com/better-auth/better-auth/commit/e7b0eba327e050f50764802e21484c6cabb56600), [`2b4a14f`](https://github.com/better-auth/better-auth/commit/2b4a14f180ed2eeb9692d6933064b001f66ec52c), [`7552a3b`](https://github.com/better-auth/better-auth/commit/7552a3b563fe1ae922fb65db12d005c38a12614d), [`ea38fca`](https://github.com/better-auth/better-auth/commit/ea38fcac7435137604e9b3ba2fe149a1848d0eeb), [`a03e4c1`](https://github.com/better-auth/better-auth/commit/a03e4c18677e2dc01a9b47b2a8017b92dbf9ece7)]：
  - better-auth@1.6.26
  - @better-auth/core@1.6.26

## 1.6.25

### 补丁更改

- 更新的依赖项 [[`5124c34`](https://github.com/better-auth/better-auth/commit/5124c3487903e96223bb3f54347724bb0204bb95), [`0ffd1fb`](https://github.com/better-auth/better-auth/commit/0ffd1fb28d44a8266d62791cd4c97e263444d03b), [`7439359`](https://github.com/better-auth/better-auth/commit/743935991f9991e8243d6c3d14773b9cfca462e8)]：
  - better-auth@1.6.25
  - @better-auth/core@1.6.25

## 1.6.24

### 补丁更改

- 更新的依赖项 [[`03dc5a0`](https://github.com/better-auth/better-auth/commit/03dc5a046f536994950800ea557b8e2e2e0cdfdd), [`7508940`](https://github.com/better-auth/better-auth/commit/750894037639c4158472cc1d4994b0e07bf1f59a), [`bae7198`](https://github.com/better-auth/better-auth/commit/bae71988ab79aeb4f19f245ceabac9eca8706a50), [`ef4d273`](https://github.com/better-auth/better-auth/commit/ef4d27360cec8a0bc11a94e135ea4a3dd32b1969), [`6758231`](https://github.com/better-auth/better-auth/commit/6758231905d2e86a7b3f058dd05c17ba739aa80f), [`99dbdd7`](https://github.com/better-auth/better-auth/commit/99dbdd7ea98740d11689394220a718dfb9579276), [`086ca91`](https://github.com/better-auth/better-auth/commit/086ca91f51dd8158aff6cbf54c4f9c7ce220914d), [`8f2dedd`](https://github.com/better-auth/better-auth/commit/8f2dedd89301da9fb52c1a64df6a9683f9be55fd), [`4e685ee`](https://github.com/better-auth/better-auth/commit/4e685eef420b5576913b9803b58c7e7ee7342203), [`3bf0e49`](https://github.com/better-auth/better-auth/commit/3bf0e4981e025ba9af684013a27b0102a04f7c56), [`f59a0ee`](https://github.com/better-auth/better-auth/commit/f59a0ee7895a024ddd4c5c387344173888e17be4), [`54fab08`](https://github.com/better-auth/better-auth/commit/54fab084469a27257e66a0814523ebac7145ef5d), [`0f2cc1b`](https://github.com/better-auth/better-auth/commit/0f2cc1b33b77850948dac4d889e5f46bba41e8d5), [`ae78109`](https://github.com/better-auth/better-auth/commit/ae781091186f321b4e4ec9e84f64b6e4d5ea1043), [`46d2bf0`](https://github.com/better-auth/better-auth/commit/46d2bf02c98902da7b344753372d48cfe0e5ebb3), [`29a373e`](https://github.com/better-auth/better-auth/commit/29a373eaf1778820061a9380c29831c2de2ce704), [`f6d18fa`](https://github.com/better-auth/better-auth/commit/f6d18fa8f79b9323e10b50f72e2b1a088844e4bb), [`f23ce50`](https://github.com/better-auth/better-auth/commit/f23ce5012ea47fac1a69b1dad203dfdef3830fd0), [`c4d1dda`](https://github.com/better-auth/better-auth/commit/c4d1ddaa952eab7edfec942fab223f35798518ab)]：
  - better-auth@1.6.24
  - @better-auth/core@1.6.24

## 1.6.23

### 补丁更改

- 更新的依赖项 [[`8581f97`](https://github.com/better-auth/better-auth/commit/8581f97ea0000e03edd6aa7911efabf694a9ff95)]：
  - better-auth@1.6.23
  - @better-auth/core@1.6.23

## 1.6.22

### 补丁更改

- 更新的依赖项 [[`c06a56d`](https://github.com/better-auth/better-auth/commit/c06a56d83a40bbaeac12d3a8b8b67e59f92a9110), [`8bd43d9`](https://github.com/better-auth/better-auth/commit/8bd43d9d8312fd9ddbfb8fb5c827cf0a0e55132d), [`3a035e9`](https://github.com/better-auth/better-auth/commit/3a035e968e27bfdee1e53ad857e5569090d9f2d1)]：
  - better-auth@1.6.22
  - @better-auth/core@1.6.22

## 1.6.21

### 补丁更改

- 更新的依赖项 [[`e0762a1`](https://github.com/better-auth/better-auth/commit/e0762a127ce351a96614e60866b3455e6eddffa1), [`882cf9e`](https://github.com/better-auth/better-auth/commit/882cf9e592d1d305b5b78cadbb10aaeee7acd6dc), [`f52e1ab`](https://github.com/better-auth/better-auth/commit/f52e1ab50b60d289b64d6b06f1bff5a4358cdfd0), [`90d509e`](https://github.com/better-auth/better-auth/commit/90d509e0b9f72614170ad7124ae9d3a7a97d7d3a), [`b5bec19`](https://github.com/better-auth/better-auth/commit/b5bec193a56cec2f7b71c84d71dacb632f0b96a0), [`816d7f9`](https://github.com/better-auth/better-auth/commit/816d7f92522518e90d437c2a366d75db56690f86), [`239bcc8`](https://github.com/better-auth/better-auth/commit/239bcc836cf39c4fb409a15333be45134f9e9e65), [`1bc370a`](https://github.com/better-auth/better-auth/commit/1bc370aef5c249e82127cb9d35972101087ecde6), [`570267c`](https://github.com/better-auth/better-auth/commit/570267cd5e782f018933ce3af4f51dbd250bf7de), [`461ca6f`](https://github.com/better-auth/better-auth/commit/461ca6fd2453a2e145fa18a1df543e435e884701), [`88409b0`](https://github.com/better-auth/better-auth/commit/88409b0078c2bfddcc6503031fff333bfa045cd2), [`5953157`](https://github.com/better-auth/better-auth/commit/5953157acf619bcb8233c91952b1e4072202f055), [`b046f9e`](https://github.com/better-auth/better-auth/commit/b046f9ec112b2cf547efea8dc870a4895602c53b), [`ae647b4`](https://github.com/better-auth/better-auth/commit/ae647b4abe5a4d606c326f1ce0ffa2500b5424d1)]：
  - better-auth@1.6.21
  - @better-auth/core@1.6.21

## 1.6.20

### 补丁更改

- 更新的依赖项 [[`21448b1`](https://github.com/better-auth/better-auth/commit/21448b1b77681e71e80ae0728d8658c936c18eb8), [`8ecf238`](https://github.com/better-auth/better-auth/commit/8ecf23817f5e501bdd8ab63ad5fdf2554ff1dff5), [`930f534`](https://github.com/better-auth/better-auth/commit/930f5341d956bf3075f43758392a5c7f50947104)]：
  - better-auth@1.6.20
  - @better-auth/core@1.6.20

## 1.6.19

### 补丁更改

- [#10086](https://github.com/better-auth/better-auth/pull/10086) [`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 刷新令牌轮换和令牌撤销、双因素备份码重新生成、设备码认领以及组织邀请接受现在都可在 Prisma 上正常工作。在 Prisma 上，这些流程中的并发或重复请求此前可能返回错误，而不是预期结果。

  在低于 5.0 版本的 MongoDB 服务器上，这些流程以及其他受保护的值更新（速率限制窗口重置、API 密钥补充）不再会因空更新错误而失败。

  `@better-auth/core`：调用 `incrementOne` 时既未提供 `increment` 也未提供 `set`，现在会报告清晰的错误。

- 更新的依赖项 [[`de4aa52`](https://github.com/better-auth/better-auth/commit/de4aa52e991f0a56786300af3e0d9ac8331f1996), [`b4b0266`](https://github.com/better-auth/better-auth/commit/b4b02660c760fe4c8889d1311a3dbf3165f88d0b), [`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63), [`581f827`](https://github.com/better-auth/better-auth/commit/581f8271fb911cea2ce74810e086709909457cd3), [`8407885`](https://github.com/better-auth/better-auth/commit/840788502a13d6fa4aa4540b930ddb4a99dc1ed6), [`c1a8a64`](https://github.com/better-auth/better-auth/commit/c1a8a64c146fab20c7ad0076ffdf12eff9adc17a), [`635f190`](https://github.com/better-auth/better-auth/commit/635f1908702d0c63cf66b4e5f054e9d527a3c8f7), [`a787e0b`](https://github.com/better-auth/better-auth/commit/a787e0b66b368a1af0b4ba17c9750c2839668246), [`c2f718f`](https://github.com/better-auth/better-auth/commit/c2f718fcdeec0c1767bb8acd5fefdd3810863b0a), [`7d18175`](https://github.com/better-auth/better-auth/commit/7d18175637a0b95a501fde0cf3db080879367a9d)]：
  - better-auth@1.6.19
  - @better-auth/core@1.6.19

## 1.6.18

### 补丁更改

- [#9941](https://github.com/better-auth/better-auth/pull/9941) [`729fd84`](https://github.com/better-auth/better-auth/commit/729fd84034d547f37bb8c1c5b8958280c5bdb487) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 修复 OAuth provider 签名查询验证问题，避免 CDN 或代理对查询参数重新排序导致签名验证失败。部署此补丁前创建的现有签名重定向可能会失败，直到其较短的过期时间窗口结束。

- 更新的依赖项 [[`9ef7240`](https://github.com/better-auth/better-auth/commit/9ef7240fec4a9d8469dd5ed24249949d3400e732), [`b21a5f7`](https://github.com/better-auth/better-auth/commit/b21a5f7f6ca1f63c6b69666a498b4227b15e316c)]：
  - better-auth@1.6.18
  - @better-auth/core@1.6.18

## 1.6.17

### 补丁变更

- [#9987](https://github.com/better-auth/better-auth/pull/9987) [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8) 感谢 [@bytaesu](https://github.com/bytaesu)！- 令牌内省和撤销不再在每次请求时都从数据库获取签名密钥。密钥会按 auth 实例缓存，刷新周期与远程 JWKS 源相同，均为五分钟。

- 更新的依赖项 [[`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`3e99e6c`](https://github.com/better-auth/better-auth/commit/3e99e6c77ef788377a3ddb7abe790c7dc3df1493), [`96c78c3`](https://github.com/better-auth/better-auth/commit/96c78c3e983ab3a2d914780fcc5d66d90537f9ac), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`ed7b6c9`](https://github.com/better-auth/better-auth/commit/ed7b6c9ac0fa2bb7f246f552b41046302ef8138c), [`e0a768c`](https://github.com/better-auth/better-auth/commit/e0a768c973f9d9ccd4aee959efcbe1fbcc2e608d), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`d9c526b`](https://github.com/better-auth/better-auth/commit/d9c526b2a57afe9e01ff25da400f1d634b4c1ac7), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`8960f5f`](https://github.com/better-auth/better-auth/commit/8960f5f3bd2f0dccbfb768d69737d8a24d793a9e), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`5c289b5`](https://github.com/better-auth/better-auth/commit/5c289b52bc166be3a36ec3c112b04195dc7621d8), [`1dbf5bb`](https://github.com/better-auth/better-auth/commit/1dbf5bb59de5d628f0d07d5e846eba8287b831d7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`59e0ccb`](https://github.com/better-auth/better-auth/commit/59e0ccbedc6c336b1e77f71c62484d654fd2fca3), [`b803c61`](https://github.com/better-auth/better-auth/commit/b803c61fdcfc64be4e26bf6fa10953621f0070cc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7)]：
  - better-auth@1.6.17
  - @better-auth/core@1.6.17

## 1.6.16

### 补丁变更

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- `/oauth2/continue` 登录后步骤不再将客户端提交的 `postLogin` 标记视为交互式关卡已完成的证明。现在会根据签名 `oauth_query` 上由服务器签发且绑定会话的标记来判断是否完成（与 consent 端点相同）；如果缺少该标记，`authorize` 会针对当前会话重新运行 `postLogin.shouldRedirect`，如果仍需选择，则重定向回该关卡。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 令牌内省现在要求 JWT 访问令牌包含 `azp`（客户端）声明，并且解析到已启用的客户端，之后才会报告为有效。这可确保只有由 OAuth 令牌端点签发的令牌才会被视为访问令牌，因为 JWT 插件可以签发与其共享相同颁发者、受众和签名密钥的会话 JWT。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 在令牌端点强制执行每个客户端的授权类型。此前只检查了提供方级别的 `grantTypes` 允许列表，因此注册为 `authorization_code` 的客户端仍可请求 `client_credentials` 令牌，使委托给用户的客户端变成机器对机器客户端。现在，如果客户端未声明 `client_credentials` 和 `authorization_code` 授权类型，则会以 `unauthorized_client` 拒绝请求。任何获准使用 `authorization_code` 授权类型的客户端仍可使用刷新令牌（受 `offline_access` 限制），但纯 `client_credentials` 客户端不再获发刷新令牌。未记录 `grantTypes` 的客户端将回退到 `["authorization_code"]`，与注册默认值一致。

- 更新的依赖项 [[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`87e7aa5`](https://github.com/better-auth/better-auth/commit/87e7aa5e0fd8f19b326beb5bec409a9ed1f245ca), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`893cf6c`](https://github.com/better-auth/better-auth/commit/893cf6cb3f1f2669b39f6ac8d3d49cf830e5732e), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`5e49c56`](https://github.com/better-auth/better-auth/commit/5e49c56a9e12a9b6b3fd1202bbc7a2fc97aeeafd), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)]：
  - better-auth@1.6.16
  - @better-auth/core@1.6.16

## 1.6.15

### 补丁变更

- [#9919](https://github.com/better-auth/better-auth/pull/9919) [`b0ddfd3`](https://github.com/better-auth/better-auth/commit/b0ddfd3433cafac312ee99ec5fb7dbb9a240da35) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 让已配置的钩子贯穿整个 OAuth 登录流程

  现在，在用户登录、选择账户或同意后继续执行的 OAuth 授权中，会运行 auth 实例上配置的 `hooks.before` / `hooks.after`。此前它们在此流程中被跳过。

  `hooks.before` 在返回自身响应前设置的标头或 Cookie 不再丢失；而抛出 `APIError` 的 `hooks.after` 也不再丢失其 Cookie 或错误的标头。

- [#9937](https://github.com/better-auth/better-auth/pull/9937) [`fe9600b`](https://github.com/better-auth/better-auth/commit/fe9600bc0734eeb2e6fbb0c53d3b81888bd4247d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- UserInfo 端点（`/oauth2/userinfo`）现在除 `GET` 外，也接受将访问令牌放在 `Authorization` 标头中的 `POST` 请求。

- 更新的依赖项 [[`1012b69`](https://github.com/better-auth/better-auth/commit/1012b690466ccd7078441dbfb406eef166fca805), [`ad60333`](https://github.com/better-auth/better-auth/commit/ad60333d1517142d688c61b6ccee14b4c30864ae), [`0933c05`](https://github.com/better-auth/better-auth/commit/0933c050ff8735466a273347c9aab0fdd8cd38ff), [`b0ddfd3`](https://github.com/better-auth/better-auth/commit/b0ddfd3433cafac312ee99ec5fb7dbb9a240da35)]：
  - better-auth@1.6.15
  - @better-auth/core@1.6.15

## 1.6.14

### 补丁变更

- [#9845](https://github.com/better-auth/better-auth/pull/9845) [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强 OAuth 提供方插件中的重定向 URI 验证。`isSafeUrlScheme` 和 `SafeUrlSchema` 不再调用 `URL.canParse`，因为某些受支持的运行时中不存在此方法，可能导致抛出错误或静默禁用危险方案检查。现在它们会使用 `try` / `catch` 回退进行解析。按照 RFC 6749 §3.1.2，`SafeUrlSchema` 也会拒绝包含片段组件的重定向 URI。

- 更新的依赖项 [[`2d9781a`](https://github.com/better-auth/better-auth/commit/2d9781a83ddc7b51ecffbd7d24c28e4b917e2323), [`5a2d642`](https://github.com/better-auth/better-auth/commit/5a2d642bc7d940f4242df9b304818a8653ea2a10), [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f), [`9d3450a`](https://github.com/better-auth/better-auth/commit/9d3450ae23e8387d24adfb7bb1cb24cc6965b6e3)]：
  - better-auth@1.6.14
  - @better-auth/core@1.6.14

## 1.6.13

### 补丁变更

- [#9657](https://github.com/better-auth/better-auth/pull/9657) [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强 `private_key_jwt` 和令牌端点客户端身份验证，并添加使修复在结构上成立的辅助函数。

  `@better-auth/core/oauth2` 现在公开 `encodeBasicCredentials` 和 `decodeBasicCredentials`，这是一对经过往返测试的函数，遵循 RFC 6749 §2.3.1（对每个值进行 `application/x-www-form-urlencoded` 编码，仅按第一个 `:` 分割）。解码器不区分大小写地接受方案，并且按照 RFC 7235 §2.1，允许凭据前有一个或多个空格。客户端侧的 `client_secret_basic` 和服务器侧的 Better Auth OAuth 提供方都会使用这些辅助函数，因此包含保留字符的凭据可以在整个技术栈中正确往返，并且会接受 `basic xxx` 或 `Basic  xxx` 这样的标头。

  `createPrivateKeyJwtClientAssertionGetter` 会立即验证选项。不支持的算法（`HS256`、`none`）、不包含密钥材料的 JWK，以及显式 `algorithm` 与 JWK 内嵌的 `alg` 不一致，都会在构造时抛出错误，而不是等到首次请求令牌时才报错。`signPrivateKeyJwtClientAssertion` 对直接调用者也执行相同检查。**破坏性变更：**此前，将不受支持的 JWK `alg` 与不同的显式 `algorithm` 搭配时，会静默地使用显式选项进行签名；现在会在构造时失败。

  `@better-auth/oauth-provider` 会在 schema 层拒绝空的 `jwks` 负载（`jwks: []` 和 `jwks: { keys: [] }`），使文档中描述的客户端元数据约定与 `checkOAuthClient` 在运行时已执行的检查保持一致。Schema 使用者（TypeScript、OpenAPI、生成的 SDK）现在也能看到这一限制。

  当 `resolvePrivateKey` 回调未返回 `privateKeyJwk` 或 `privateKeyPem` 时，SSO `private_key_jwt` 流程会使用 `error_description=no_private_key_available` 重定向。此前，只有在完全未提供解析器时，重定向路径才会提前终止；解析器返回空值时则会继续执行并导致内部签名错误。

  `better-auth/test` 新增了 `getHttpTestInstance`，它是 `getTestInstance` 的对应函数，会在操作系统分配的端口上绑定真实 HTTP 监听器，并根据发现的 URL 构造 auth 实例。它消除了测试文件一直各自复制的“临时服务器后再重新绑定”竞争问题。

- [#9845](https://github.com/better-auth/better-auth/pull/9845) [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强 OAuth 提供方插件中的重定向 URI 验证。`isSafeUrlScheme` 和 `SafeUrlSchema` 不再调用 `URL.canParse`，因为某些受支持的运行时中不存在此方法，可能导致抛出错误或静默禁用危险方案检查。现在它们会使用 `try` / `catch` 回退进行解析。按照 RFC 6749 §3.1.2，`SafeUrlSchema` 也会拒绝包含片段组件的重定向 URI。

- 更新的依赖项 [[`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8), [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2), [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a), [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - better-auth@1.7.0-beta.4
  - @better-auth/core@1.7.0-beta.4

## 1.7.0-beta.3

### 补丁变更

- 更新了依赖 [[`4e8e4c7`](https://github.com/better-auth/better-auth/commit/4e8e4c7fc5fb2723144cbf41c4a1bfa28de8d671)、[`523f95c`](https://github.com/better-auth/better-auth/commit/523f95c10db24b790bbd75fe85c86c34d3465267)、[`729c00d`](https://github.com/better-auth/better-auth/commit/729c00d74c94f558893da1e3a9ee86451d1b23da)]：
  - better-auth@1.7.0-beta.3
  - @better-auth/core@1.7.0-beta.3

## 1.7.0-beta.2

### 次要变更

- [#9277](https://github.com/better-auth/better-auth/pull/9277) [`5c6de4e`](https://github.com/better-auth/better-auth/commit/5c6de4ed265e7aa30e7e42a0e493386cf3ad6c96) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- fix(oauth-provider)：从验证失败中返回符合 RFC 的 `{ error, error_description }` 信封

  内部 `createOAuthEndpoint` 包装器现在会将 zod 验证失败转换为 RFC 6749 §5.2、7009 §2.2.1、7662 §2.3 和 7591 §3.2.2 要求的信封。失败问题会按字段进行路由：
  - 缺少必需值时，映射到 `errorCodesByField[name].missing` 或端点的 `defaultError`。
  - 不受支持的值（未知枚举成员）映射到 `errorCodesByField[name].invalid` 或 `defaultError`。
  - 其他任何失败（类型错误、重复的查询参数、格式无效、细化验证失败）都映射到 `defaultError`，因此 RFC 6749 §3.1 中的格式错误请求无论涉及哪个字段，都会返回端点的默认代码。

  现在，所有六个 OAuth 端点（`/oauth2/token`、`/oauth2/authorize`、`/oauth2/revoke`、`/oauth2/introspect`、`/oauth2/register`、`/oauth2/end-session`）都会针对格式错误的请求返回符合 RFC 的错误。`/oauth2/authorize` 验证失败时，如果 `client_id` 和 `redirect_uri` 与已注册客户端匹配，则会将请求重定向到依赖方，并附带 `error`、`error_description`、回传的 `state` 和 `iss`；没有受信任的 RP 时，则回退到服务器错误页面。

  同一批端点还修复了其他 RFC 合规性问题：
  - `/oauth2/revoke` 和 `/oauth2/introspect` 现在会忽略未知的 `token_type_hint`，而不是拒绝请求。RFC 7009 §2.2.1 和 RFC 7662 §2.1 将 `unsupported_token_type` 保留给令牌本身，而不是提示值；服务器可以忽略无法识别的提示，并搜索所有受支持的令牌类型。
  - `/oauth2/authorize` 错误重定向现在遵循 OIDC Core 1.0 §5 响应模式。对于 `response_type=token` 或 `id_token`，错误会按照 RFC 6749 §4.2.2.1 放在 URL 片段中；显式设置 `response_mode=query` 时会覆盖默认模式。

### 补丁变更

- 更新了依赖 [[`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4)、[`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09)、[`954b664`](https://github.com/better-auth/better-auth/commit/954b664f4f251f8dd028451dab3ab43067dbf890)、[`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - better-auth@1.7.0-beta.2
  - @better-auth/core@1.7.0-beta.2

## 1.7.0-beta.1

### 次要变更

- [#9069](https://github.com/better-auth/better-auth/pull/9069) [`c7d2253`](https://github.com/better-auth/better-auth/commit/c7d22539ec4f7322d9625ae2953d397c3863d097) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将通用 OAuth 插件重写为一等社交提供方，并采用 OAuth 2.1 安全默认设置。提供方现在使用 `signIn.social` + `callback/:id`，而不是专用插件端点；默认要求 PKCE（OAuth 2.1），验证 RFC 9207 issuer，通过 OIDC 自动发现注入 `openid` scope，并提供带类型的提供方 ID。

  **破坏性变更：**
  - `signIn.oauth2({ providerId })` 替换为 `signIn.social({ provider })`
  - `oauth2.link()` 替换为 `linkSocial()`
  - 回调 URL 从 `/api/auth/oauth2/callback/:id` 更改为 `/api/auth/callback/:id`
  - 移除 `genericOAuthClient()`；通用 OAuth 提供方现在使用标准社交客户端 API
  - `pkce` 默认值改为 `true`（原为 `false`）；对于拒绝 PKCE 的提供方，请设置 `pkce: false`
  - `authorizationUrlParams` 和 `tokenUrlParams` 仅接受 `Record<string, string>`
  - 移除 `issuer` 和 `requireIssuerValidation` 配置字段；issuer 验证会通过 OIDC 发现自动进行
  - `mapProfileToUser` 的 profile 类型为 `OAuth2UserInfo & Record<string, unknown>`

- [#9079](https://github.com/better-auth/better-auth/pull/9079) [`6f2948e`](https://github.com/better-auth/better-auth/commit/6f2948e87bb5fa14bd2174a91f7143e1eced1b87) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth-provider)：根据 OIDC Core §3.1.3.6 在 ID 令牌中计算 `at_hash`

  与访问令牌一同颁发的 ID 令牌现在包含 `at_hash` 声明，该声明通过密码学方式将两个令牌绑定起来，以防止令牌替换攻击。哈希算法根据实际签名密钥的算法选择（EdDSA/Ed25519 使用 SHA-512，RS/ES/PS384 使用 SHA-384，RS/ES/PS512 使用 SHA-512，其他算法均使用 SHA-256）。

  `better-auth/plugins` 现在提供新的 `resolveSigningKey()` 导出，用于解析当前 JWKS 签名密钥（包括其算法）。使用自定义 `jwt.sign` 回调时，会验证已签名 ID 令牌的标头是否符合声明的算法，以防止 `at_hash` 不匹配。

### 补丁变更

- [#9123](https://github.com/better-auth/better-auth/pull/9123) [`e2e25a4`](https://github.com/better-auth/better-auth/commit/e2e25a49545f3e386cfcc4e86b33c1796a1430b1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- fix(oauth-provider)：在未认证的 DCR 中将机密客户端身份验证方法覆盖为公共客户端方法

  启用 `allowUnauthenticatedClientRegistration` 后，未认证的 DCR
  请求若指定 `client_secret_post`、`client_secret_basic`，或省略
  `token_endpoint_auth_method`（根据
  [RFC 7591 §2](https://datatracker.ietf.org/doc/html/rfc7591#section-2)，该字段默认值为 `client_secret_basic`），
  现在会被静默覆盖为 `token_endpoint_auth_method: "none"`（公共客户端），
  而不是返回 HTTP 401 拒绝请求。

  这遵循了 [RFC 7591 §3.2.1](https://datatracker.ietf.org/doc/html/rfc7591#section-3.2.1)，
  该规范允许服务器“拒绝或替换客户端在注册期间提交的任何所请求的元数据值，
  并将其替换为合适的值”。注册响应会将实际使用的方法告知
  客户端，使符合规范的客户端能够进行相应调整。

  这修复了与实际 MCP 客户端（Claude、Codex、Factory
  Droid 等）的互操作性问题；这些客户端会在 DCR 负载中发送
  `token_endpoint_auth_method: "client_secret_post"`，因为服务器元数据在
  `token_endpoint_auth_methods_supported` 中公布了该方法。

  关闭 [#8588](https://github.com/better-auth/better-auth/issues/8588)

- [#9131](https://github.com/better-auth/better-auth/pull/9131) [`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 强化对直接 `auth.api.*` 调用和插件元数据辅助函数的动态 `baseURL` 处理

  **直接 `auth.api.*` 调用**
  - 无法解析 baseURL（没有来源且没有 `fallback`）时，抛出带有明确消息的 `APIError`，而不是让 `ctx.context.baseURL = ""`，导致下游插件崩溃。
  - 将直接 API 路径上的 `allowedHosts` 不匹配转换为 `APIError`。
  - 在动态路径上遵循 `advanced.trustedProxyHeaders`（默认值为 `true`，保持不变）。此前，配合 `allowedHosts` 时会无条件信任 `x-forwarded-host` / `-proto`；现在它们会像静态路径一样经过同一检查。默认值改为 `false` 的变更将在后续 PR 中发布。
  - `resolveRequestContext` 会在每次调用时重新加载 `trustedProviders` 和 cookies（此外还会重新加载 `trustedOrigins`）。当没有完整的 `Request` 时，用户定义的 `trustedOrigins(req)` / `trustedProviders(req)` 回调会接收一个根据转发标头合成的 `Request`。
  - 在仅基于标头的协议回退路径中，对回环主机（`localhost`、`127.0.0.1`、`[::1]`、`0.0.0.0`）推断为 `http`，避免本地开发调用悄然解析为 `https://localhost:3000`。
  - `hasRequest` 使用 `isRequestLike`；后者现在会拒绝仅伪造 `Symbol.toStringTag`、但没有真实 `url` / `headers.get` 结构的对象。

  **插件元数据辅助函数**
  - `oauthProviderAuthServerMetadata`、`oauthProviderOpenIdConfigMetadata`、`oAuthDiscoveryMetadata` 和 `oAuthProtectedResourceMetadata` 会将传入的 request 转发给链式调用的 `auth.api`，因此动态配置下的 `issuer` 和发现 URL 会反映请求主机。
  - `withMcpAuth` 会将传入的 request 转发给 `getMcpSession`，传递 `trustedProxyHeaders`，并在无法解析 `baseURL` 时返回一个不带附加参数的 `Bearer` challenge（而不是 `Bearer resource_metadata="undefined/..."`）。
  - `@better-auth/oauth-provider` 中的 `metadataResponse` 会通过 `new Headers()` 规范化标头，因此调用方可以传入 `Headers`、元组数组或记录，而不会静默丢失条目。

- [#9118](https://github.com/better-auth/better-auth/pull/9118) [`314e06f`](https://github.com/better-auth/better-auth/commit/314e06f0fd84ac90b55b5430624a74c5a8d62bfd) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth-provider)：添加 `customTokenResponseFields` 回调，并使用 Zod 验证授权码

  在 `OAuthOptions` 中添加 `customTokenResponseFields` 回调，用于向所有授权类型的令牌端点响应注入自定义字段。标准 OAuth 字段（`access_token`、`token_type` 等）无法被覆盖。此功能遵循 `customAccessTokenClaims` 和 `customIdTokenClaims` 的相同模式。

  现在会在反序列化时使用 Zod schema 验证授权码的校验值；对于格式错误或已损坏的值，会始终返回 `invalid_verification` 错误，而不是可能产生 500 错误。

- 更新了依赖 [[`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45)、[`484ce6a`](https://github.com/better-auth/better-auth/commit/484ce6a262c39b9c1be91d37774a2a13de3a5a1f)、[`f875897`](https://github.com/better-auth/better-auth/commit/f8758975ae475429d56b34aa6067e304ee973c8f)、[`c7d2253`](https://github.com/better-auth/better-auth/commit/c7d22539ec4f7322d9625ae2953d397c3863d097)、[`9a6d475`](https://github.com/better-auth/better-auth/commit/9a6d4759cd4451f0535d53f171bcfc8891c41db7)、[`513dabb`](https://github.com/better-auth/better-auth/commit/513dabb132e2c08a5b6d3b7e88dd397fcd66c1af)、[`6f2948e`](https://github.com/better-auth/better-auth/commit/6f2948e87bb5fa14bd2174a91f7143e1eced1b87)]：
  - better-auth@1.7.0-beta.1
  - @better-auth/core@1.7.0-beta.1

## 1.7.0-beta.0

### 次要变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在整个技术栈中添加 `private_key_jwt`（RFC 7523）客户端身份验证。服务器会验证使用非对称密钥签名的 JWT 客户端断言；客户端则会在授权码、刷新令牌和客户端凭证流程中为这些断言签名。

### 补丁变更

- 更新了依赖 [[`6ce30cf`](https://github.com/better-auth/better-auth/commit/6ce30cf13853619b9022e93bd6ecb956bc32482d)、[`f6428d0`](https://github.com/better-auth/better-auth/commit/f6428d02fcabc2e628f39b0e402f1a6eb0602649)、[`c5066fe`](https://github.com/better-auth/better-auth/commit/c5066fe5d68babf2376cfc63d813de5542eca463)、[`5f84335`](https://github.com/better-auth/better-auth/commit/5f84335815d75410320bdfa665a6712d3416b04f)、[`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656)、[`544f1c6`](https://github.com/better-auth/better-auth/commit/544f1c63c9826831d96a126fbe568d8a8a8fde68)]：
  - better-auth@1.7.0-beta.0
  - @better-auth/core@1.7.0-beta.0

## 1.6.10

### 补丁变更

- [#9344](https://github.com/better-auth/better-auth/pull/9344) [`408a307`](https://github.com/better-auth/better-auth/commit/408a3076bdd5b450c96bdad82be797ac8a8d3f83) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - fix(oauth-provider)：将 consent-accept 的 postLogin 跳过与签名会话绑定

  当 `authorize` 发出通过 postLogin 门槛的签名重定向时，现在会在签名授权查询中记录 `ba_pl=<sessionId>`。接受 consent 时，仅当传入的签名查询中的标记与当前会话的 id 匹配，才会使用 `{ postLogin: true }` 调用 `authorizeEndpoint`；否则会重新进入 `authorize`，并继续执行 `postLogin.shouldRedirect`。这解决了由 `setActive` 驱动的流程在 consent 之后跳回 postLogin 页面的问题，阻止使用 postLogin 之前的签名查询直接 POST 到 `/oauth2/consent` 并跳过 `shouldRedirect`，还可防止其他会话或新登录的会话重复使用另一个会话的标记来跳过 `shouldRedirect`。

- [#9389](https://github.com/better-auth/better-auth/pull/9389) [`f7bc1c7`](https://github.com/better-auth/better-auth/commit/f7bc1c73490d657a8ffa92a58ecfa9d8403d4fda) 感谢 [@zllovesuki](https://github.com/zllovesuki)! - 为生成的 schema 中的 OAuth provider 外键字段添加索引。

- [#9344](https://github.com/better-auth/better-auth/pull/9344) [`408a307`](https://github.com/better-auth/better-auth/commit/408a3076bdd5b450c96bdad82be797ac8a8d3f83) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - fix(oauth-provider)：在强制登录后完成过期的 `prompt=login consent` 续接流程

  Consent 续接流程现在会携带签名授权请求的签发时间，并且仅当活动会话是为该请求创建时，才会清除残留的 `login` prompt。这既保留了强制重新认证语义，也避免重新认证完成后又被送回 `/login` 的循环。

- [#9406](https://github.com/better-auth/better-auth/pull/9406) [`d427d1d`](https://github.com/better-auth/better-auth/commit/d427d1dba91db8861d935ca5838f49eb7e617f67) 感谢 [@cyphercodes](https://github.com/cyphercodes)! - 导出公共声明使用的 OAuth provider 辅助类型，使下游声明生成能够以可移植的方式为 auth 实例命名。

- [#9324](https://github.com/better-auth/better-auth/pull/9324) [`6b03a45`](https://github.com/better-auth/better-auth/commit/6b03a45a14d905aa070068290adfedfd4c5f4e2d) 感谢 [@dvanmali](https://github.com/dvanmali)! - 将刷新令牌类型中的 `sessionId` 设为可选，以匹配刷新令牌 schema。

- 更新的依赖项 [[`1e0f26d`](https://github.com/better-auth/better-auth/commit/1e0f26d4c83608d14a533f33458ade0f8504fd16), [`8c1e917`](https://github.com/better-auth/better-auth/commit/8c1e91757d91d103c332e90201c39ce5892c37e8), [`b2d655c`](https://github.com/better-auth/better-auth/commit/b2d655c77c7c627ada17456d1de106fdce6fa18e), [`09f1327`](https://github.com/better-auth/better-auth/commit/09f1327acb9c6bbfeb272dc62c7013172cf33153), [`906b7b3`](https://github.com/better-auth/better-auth/commit/906b7b34a710d49798e166395da2bcd2be13ef46), [`e9c978e`](https://github.com/better-auth/better-auth/commit/e9c978e2af9e61d35f50fd040305cbb8fdda32ba), [`e71aad3`](https://github.com/better-auth/better-auth/commit/e71aad3b6d67502cfb770fa8890f3ab58c537114), [`80a655d`](https://github.com/better-auth/better-auth/commit/80a655d271dcae5f785a70f13be60f80fb828cf1), [`15ff28a`](https://github.com/better-auth/better-auth/commit/15ff28a957a18df8ecd2aa08d66b94c91ae9a6a4), [`88a7c67`](https://github.com/better-auth/better-auth/commit/88a7c678f4db3f7da580d53071b2595b92354a45), [`9a7b51d`](https://github.com/better-auth/better-auth/commit/9a7b51d0d3dfbc6b2697fe5f9edd0bb480bdf89b), [`1b25902`](https://github.com/better-auth/better-auth/commit/1b259024dcd1bbbc08559ee057f22c01929a72a7), [`cf59136`](https://github.com/better-auth/better-auth/commit/cf591360e72a8d01741618cd61cdeea84cf8398a), [`a597ee0`](https://github.com/better-auth/better-auth/commit/a597ee01ed4e6d85aba5ee9f15100acc578390d9), [`fc02ced`](https://github.com/better-auth/better-auth/commit/fc02cedb708e2b5987a177539a903cc35155a426), [`9f1ef1f`](https://github.com/better-auth/better-auth/commit/9f1ef1f7e5500e0b3dbe2a18e25e3519847cd7a9), [`36ef808`](https://github.com/better-auth/better-auth/commit/36ef808c6cedec6eeb9a3a4e6790e0ab46d96ff3), [`c1336c5`](https://github.com/better-auth/better-auth/commit/c1336c563d45f93ca3fd4da4e6c767fc267d86d0), [`3a9a2c3`](https://github.com/better-auth/better-auth/commit/3a9a2c37eeab1d0c98845a47642d4dc27fe54ceb), [`fde0432`](https://github.com/better-auth/better-auth/commit/fde043207ef3d5a5e1f74aa5ddabf77d523d52d4), [`2220a6d`](https://github.com/better-auth/better-auth/commit/2220a6d6c25ebd24c8568131636389dc0c12f82b)]：
  - better-auth@1.6.10
  - @better-auth/core@1.6.10

## 1.6.9

### 补丁变更

- 更新的依赖项 [[`815ecf6`](https://github.com/better-auth/better-auth/commit/815ecf62b6f6c5bf656ab55da393ce63d7eed0a6)]：
  - @better-auth/core@1.6.9
  - better-auth@1.6.9

## 1.6.8

### 补丁变更

- [#9328](https://github.com/better-auth/better-auth/pull/9328) [`8e3cc34`](https://github.com/better-auth/better-auth/commit/8e3cc3453c8e0b066dd3ba3d492d9494a1670d62) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - fix(oauth-provider)：接受不带 `state` 的 authorization-code 流程

  通过将 `state` 视为授权服务器的可选参数，使 authorization-code 验证与 authorize 端点以及 OAuth/OIDC 语义保持一致。provider 仍会在 `state` 存在时回传它，Better Auth 客户端辅助函数也会继续生成并验证它。

- 更新的依赖项 [[`856ab24`](https://github.com/better-auth/better-auth/commit/856ab2426c0dce7377ee1ca26dbb7d9e52fb6429), [`9aa8e63`](https://github.com/better-auth/better-auth/commit/9aa8e63de84549634216e13e407cf6d8aa61acc3)]：
  - better-auth@1.6.8
  - @better-auth/core@1.6.8

## 1.6.7

### 补丁变更

- [#9244](https://github.com/better-auth/better-auth/pull/9244) [`4e0e6e1`](https://github.com/better-auth/better-auth/commit/4e0e6e1fd32705063cf4831c0339212066aa369f) 感谢 [@TanishValesha](https://github.com/TanishValesha)! - 当 `ctx.request` 不存在时，从 `ctx.headers` 读取 OAuth2 userinfo `Authorization`，使 `auth.api.oauth2UserInfo({ headers })` 与 HTTP `GET /oauth2/userinfo` 保持一致。

- 更新的依赖项 [[`307196a`](https://github.com/better-auth/better-auth/commit/307196a405e067f4a863de2ed68528e8d4bdc162), [`4a180f0`](https://github.com/better-auth/better-auth/commit/4a180f0b0c084c59e7b006058d3fdbd8542face5), [`4f373ee`](https://github.com/better-auth/better-auth/commit/4f373eed8a42e02460dbd2ee9973b9493cea04eb), [`e1b1cfc`](https://github.com/better-auth/better-auth/commit/e1b1cfc7a262c8bf0c383a7b2b1d140472d33e56), [`d053a45`](https://github.com/better-auth/better-auth/commit/d053a4583e0db9132e52a100ae33e13d040a6bae)]：
  - better-auth@1.6.7
  - @better-auth/core@1.6.7

## 1.6.6

### 补丁变更

- [#9226](https://github.com/better-auth/better-auth/pull/9226) [`e64ff72`](https://github.com/better-auth/better-auth/commit/e64ff720fb8514cb78aedd1660223d8b948284da) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)! - 将主机/IP 分类统一到 `@better-auth/core/utils/host`，并修复旧有的逐包正则检查遗漏的多个 loopback/SSRF 绕过问题。

  **Electron 用户图片代理：已封堵 SSRF 绕过（`@better-auth/electron`）。** `fetchUserImage` 之前使用自定义 IPv4/IPv6 正则限制出站请求，但该正则遗漏了多个攻击向量。以下地址在生产环境中都可访问，现在均已被阻止：
  - `http://tenant.localhost/` 及其他 `*.localhost` 名称（RFC 6761 将整个 TLD 保留用于 loopback）。
  - `http://[::ffff:169.254.169.254]/`（映射到 AWS IMDS 的 IPv4-mapped IPv6，是经典的 SSRF 绕过方式）。
  - `http://metadata.google.internal/`、`http://metadata.goog/`（GCP 实例元数据）。
  - `http://instance-data/`、`http://instance-data.ec2.internal/`（AWS IMDS 备用 FQDN）。
  - `http://100.100.100.200/`（Alibaba Cloud IMDS；位于 RFC 6598 共享地址空间 `100.64/10`，旧正则未覆盖该范围）。
  - `http://0.0.0.0:PORT/`（Linux/macOS 内核会将未指定地址路由到 loopback：Oligo 的“0.0.0.0 Day”）。
  - `http://[fc00::...]/`、`http://[fd00::...]/`（RFC 4193 中定义的 IPv6 ULA）以及 IPv6 链路本地地址 `fe80::/10`，旧正则无法识别这两者。

  现在也会拒绝文档专用地址范围（RFC 5737 / RFC 3849）、基准测试地址范围（`198.18/15`）、多播地址和广播地址。

  **`better-auth`：不再将 `0.0.0.0` 视为 loopback。** 之前 `packages/better-auth/src/utils/url.ts` 中的 `isLoopbackHost` 实现会将 `0.0.0.0` 与 `127.0.0.1` / `::1` / `localhost` 一并归类。`0.0.0.0` 是未指定地址，而不是 loopback；将其视为 loopback 会使浏览器来源请求能够访问绑定到 localhost 的开发服务（Oligo 的“0.0.0.0 Day”）。该辅助函数现在接受完整的 `127.0.0.0/8` 范围和任意 `*.localhost` 名称，并拒绝 `0.0.0.0`。

  **`better-auth`：强化受信任来源的子字符串检查。** `getTrustedOrigins` 之前在判断是否为动态 `baseURL.allowedHosts` 条目添加 `http://` 变体时，使用 `host.includes("localhost") || host.includes("127.0.0.1")`。像 `evil-localhost.com` 或 `127.0.0.1.nip.io` 这样的错误配置会因此错误地在信任列表中获得 HTTP 来源。现在改用共享分类器进行检查，因此只有真正的 loopback 主机才会获得 HTTP 变体。

  **`@better-auth/oauth-provider`：符合 RFC 8252。**
  - §7.3 的重定向 URI 匹配现在接受完整的 `127.0.0.0/8` 范围（而不只是 `127.0.0.1`）以及 `[::1]`，并支持端口灵活匹配。端口灵活匹配仅适用于 IP 字面量；根据 §8.3，对于 `localhost` 等 DNS 名称仍采用精确字符串匹配（“NOT RECOMMENDED”用于 loopback）。
  - `validateIssuerUrl` 使用共享的 loopback 检查，而不是仅比较两个主机名字面量。

  **新模块：`@better-auth/core/utils/host`。** 提供 `classifyHost`、`isLoopbackIP`、`isLoopbackHost` 和 `isPublicRoutableHost`。这是一个符合 RFC 6890 / RFC 6761 / RFC 8252 的实现，可处理 IPv4、IPv6（包括带方括号的字面量、区域 ID、IPv4-mapped 地址，以及带内嵌 IPv4 递归处理的 6to4 / NAT64 / Teredo 隧道形式）和 FQDN，并包含经过整理的云元数据 FQDN 集合。现在整个 monorepo 中所有自定义的 loopback/private/link-local 检查都会统一通过该模块进行。

- 更新的依赖项 [[`b5742f9`](https://github.com/better-auth/better-auth/commit/b5742f9d08d7c6ae0848279b79c8bcc0a09082d7), [`4debfb6`](https://github.com/better-auth/better-auth/commit/4debfb600ff448f3e63ed242a2fb5a2c41654be1), [`9ea7eb1`](https://github.com/better-auth/better-auth/commit/9ea7eb1eab28d50d40836ab4e2cbe5a81c4da1aa), [`a844c7d`](https://github.com/better-auth/better-auth/commit/a844c7dd087715678787cb10bf9670fad46e535b), [`ab4c10f`](https://github.com/better-auth/better-auth/commit/ab4c10fbc09defcd851d614acecc111cc114b543), [`a61083e`](https://github.com/better-auth/better-auth/commit/a61083e023163d0a14d9e886ce556ba459677428), [`e64ff72`](https://github.com/better-auth/better-auth/commit/e64ff720fb8514cb78aedd1660223d8b948284da)]：
  - @better-auth/core@1.6.6
  - better-auth@1.6.6

## 1.6.5

### 补丁变更

- [`5b900a2`](https://github.com/better-auth/better-auth/commit/5b900a2b43a734ecde6b624b92a4e21468376012) 感谢 [@chdanielmueller](https://github.com/chdanielmueller)! - fix(oauth-provider)：在创建 OAuth 客户端时强制执行客户端权限检查

- 更新的依赖项 [[`938dd80`](https://github.com/better-auth/better-auth/commit/938dd80e2debfab7f7ef480792a5e63876e779d9), [`0538627`](https://github.com/better-auth/better-auth/commit/05386271ca143d07416297611d3b31e6c20e2f2a)]：
  - better-auth@1.6.5
  - @better-auth/core@1.6.5

## 1.6.4

### 补丁变更

- 更新的依赖项 [[`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4), [`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09), [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - better-auth@1.6.4
  - @better-auth/core@1.6.4

## 1.6.3

### 补丁变更

- [#9123](https://github.com/better-auth/better-auth/pull/9123) [`e2e25a4`](https://github.com/better-auth/better-auth/commit/e2e25a49545f3e386cfcc4e86b33c1796a1430b1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复（oauth-provider）：在未认证的 DCR 中将机密客户端身份验证方法覆盖为公开客户端身份验证方法

  启用 `allowUnauthenticatedClientRegistration` 后，对于指定了 `client_secret_post`、`client_secret_basic`，或省略了 `token_endpoint_auth_method`（根据 [RFC 7591 §2](https://datatracker.ietf.org/doc/html/rfc7591#section-2)，默认值为 `client_secret_basic`）的未认证 DCR 请求，现在会将其静默覆盖为 `token_endpoint_auth_method: "none"`（公开客户端），而不是返回 HTTP 401 拒绝请求。

  这遵循 [RFC 7591 §3.2.1](https://datatracker.ietf.org/doc/html/rfc7591#section-3.2.1)，该规范允许服务器“拒绝或替换客户端在注册期间提交的任何请求元数据值，并将其替换为合适的值”。注册响应会向客户端告知实际使用的方法，使符合规范的客户端能够相应调整。

  这修复了与真实 MCP 客户端（Claude、Codex、Factory Droid 等）的互操作性问题：由于服务器元数据在 `token_endpoint_auth_methods_supported` 中公布了 `client_secret_post`，这些客户端会在 DCR 负载中发送 `token_endpoint_auth_method: "client_secret_post"`。

  关闭 [#8588](https://github.com/better-auth/better-auth/issues/8588)

- [#9131](https://github.com/better-auth/better-auth/pull/9131) [`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加固直接调用 `auth.api.*` 和插件元数据辅助函数时动态 `baseURL` 的处理

  **直接调用 `auth.api.*`**
  - 当无法解析 baseURL（没有来源且没有 `fallback`）时，抛出带有明确消息的 `APIError`，而不是让 `ctx.context.baseURL = ""`，导致下游插件崩溃。
  - 将直接 API 路径上的 `allowedHosts` 不匹配转换为 `APIError`。
  - 在动态路径上遵循 `advanced.trustedProxyHeaders`（默认值为 `true`，保持不变）。此前，使用 `allowedHosts` 时会无条件信任 `x-forwarded-host` / `-proto`；现在它们会经过与静态路径相同的检查。默认值改为 `false` 的变更将在后续 PR 中发布。
  - `resolveRequestContext` 每次调用时都会重新加载 `trustedProviders` 和 cookies（以及 `trustedOrigins`）。当没有完整的 `Request` 可用时，用户定义的 `trustedOrigins(req)` / `trustedProviders(req)` 回调会收到一个根据转发标头合成的 `Request`。
  - 在仅有标头的协议回退场景中，为环回主机（`localhost`、`127.0.0.1`、`[::1]`、`0.0.0.0`）推断 `http`，避免本地开发调用被静默解析为 `https://localhost:3000`。
  - `hasRequest` 使用 `isRequestLike`，后者现在会拒绝那些伪造了 `Symbol.toStringTag`，但不具备真实 `url` / `headers.get` 结构的对象。

  **插件元数据辅助函数**
  - `oauthProviderAuthServerMetadata`、`oauthProviderOpenIdConfigMetadata`、`oAuthDiscoveryMetadata` 和 `oAuthProtectedResourceMetadata` 会将收到的请求转发给链式调用的 `auth.api`，因此动态配置中的 `issuer` 和发现 URL 会反映请求主机。
  - `withMcpAuth` 会将收到的请求转发给 `getMcpSession`，传递 `trustedProxyHeaders`，并在无法解析 `baseURL` 时发出不带参数的 `Bearer` challenge（而不是 `Bearer resource_metadata="undefined/..."`）。
  - `@better-auth/oauth-provider` 中的 `metadataResponse` 通过 `new Headers()` 规范化标头，使调用方传入 `Headers`、元组数组或记录时不会静默丢弃条目。

- [#9118](https://github.com/better-auth/better-auth/pull/9118) [`314e06f`](https://github.com/better-auth/better-auth/commit/314e06f0fd84ac90b55b5430624a74c5a8d62bfd) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 新增 `customTokenResponseFields` 回调，并对授权码进行 Zod 验证

  在 `OAuthOptions` 中新增 `customTokenResponseFields` 回调，用于向所有授权类型的令牌端点响应注入自定义字段。标准 OAuth 字段（`access_token`、`token_type` 等）不可覆盖。此回调遵循与 `customAccessTokenClaims` 和 `customIdTokenClaims` 相同的模式。

  现在会在反序列化时使用 Zod schema 验证授权码校验值；对于格式错误或损坏的值，将始终返回 `invalid_verification` 错误，而不是可能导致 500 错误。

- 已更新依赖项 [[`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45), [`484ce6a`](https://github.com/better-auth/better-auth/commit/484ce6a262c39b9c1be91d37774a2a13de3a5a1f), [`f875897`](https://github.com/better-auth/better-auth/commit/f8758975ae475429d56b34aa6067e304ee973c8f), [`6ce30cf`](https://github.com/better-auth/better-auth/commit/6ce30cf13853619b9022e93bd6ecb956bc32482d), [`f6428d0`](https://github.com/better-auth/better-auth/commit/f6428d02fcabc2e628f39b0e402f1a6eb0602649), [`9a6d475`](https://github.com/better-auth/better-auth/commit/9a6d4759cd4451f0535d53f171bcfc8891c41db7), [`513dabb`](https://github.com/better-auth/better-auth/commit/513dabb132e2c08a5b6d3b7e88dd397fcd66c1af), [`c5066fe`](https://github.com/better-auth/better-auth/commit/c5066fe5d68babf2376cfc63d813de5542eca463), [`5f84335`](https://github.com/better-auth/better-auth/commit/5f84335815d75410320bdfa665a6712d3416b04f)]：
  - better-auth@1.6.3
  - @better-auth/core@1.6.3

## 1.6.2

### 补丁变更

- [#9060](https://github.com/better-auth/better-auth/pull/9060) [`4c829bf`](https://github.com/better-auth/better-auth/commit/4c829bf2892a7fbf9f137f9bc9972b0c8fff12b5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复提示重定向过程中多值查询参数的保留问题
  - `serializeAuthorizationQuery` 现在对数组值使用 `params.append()`，而不是会将数组合并成单个逗号分隔条目的 `String(array)`。
  - `deleteFromPrompt` 的返回类型从 `Record<string, string>` 扩展为 `Record<string, string | string[]>`。此前的类型不正确——`Object.fromEntries()` 会静默丢弃重复键，因此较窄的类型只是因为数据遭到破坏才成立。

- [#8998](https://github.com/better-auth/better-auth/pull/8998) [`c6922dc`](https://github.com/better-auth/better-auth/commit/c6922dce8edaed9293ce8d8962fa6ec03dafb2ce) 感谢 [@dvanmali](https://github.com/dvanmali)！- Typescript 将 skip_consent 指定为 never 类型，并通过 zod 报错

- 已更新依赖项 [[`9deb793`](https://github.com/better-auth/better-auth/commit/9deb7936aba7931f2db4b460141f476508f11bfd), [`2cbcb9b`](https://github.com/better-auth/better-auth/commit/2cbcb9baacdd8e6fa1ed605e9b788f8922f0a8c2), [`b20fa42`](https://github.com/better-auth/better-auth/commit/b20fa424c379396f0b86f94fbac1604e4a17fe19), [`608d8c3`](https://github.com/better-auth/better-auth/commit/608d8c3082c2d6e52c6ca6a8f38348619869b1ae), [`8409843`](https://github.com/better-auth/better-auth/commit/84098432ad8432fe33b3134d933e574259f3430a), [`e78a7b1`](https://github.com/better-auth/better-auth/commit/e78a7b120d56b7320cc8d818270e20057963a7b2)]：
  - better-auth@1.6.2
  - @better-auth/core@1.6.2

## 1.6.1

### 补丁变更

- 已更新依赖项 [[`2e537df`](https://github.com/better-auth/better-auth/commit/2e537df5f7f2a4263f52cce74d7a64a0a947792b), [`f61ad1c`](https://github.com/better-auth/better-auth/commit/f61ad1cab7360e4460e6450904e97498298a79d5), [`7495830`](https://github.com/better-auth/better-auth/commit/749583065958e8a310badaa5ea3acc8382dc0ca2)]：
  - better-auth@1.6.1
  - @better-auth/core@1.6.1

## 1.6.0

### 次要变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为插件接口添加可选的 version 字段，并在所有内置插件中公开 version

### 补丁变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 仅在配置了 secondaryStorage 时才要求设置 storeSessionInDatabase

- [#8632](https://github.com/better-auth/better-auth/pull/8632) [`e5091ee`](https://github.com/better-auth/better-auth/commit/e5091ee1e64fcbe69bdeb4ed86e774e32ca85d7d) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复 PAR scope 丢失、环回重定向匹配和 DCR skip_consent
  - **PAR（RFC 9126）**：在处理前将 `request_uri` 解析为存储的参数；根据 §4 丢弃前通道 URL 参数，以防止 prompt/scope 注入
  - **环回（RFC 8252 §7.3）**：对 `127.0.0.1` 和 `[::1]` 使用不受端口影响的重定向 URI 匹配；协议、主机、路径和查询仍必须匹配
  - **DCR**：在 schema 中接受 `skip_consent`，但在动态注册期间拒绝它，以防止权限提升
  - **序列化**：修复 `oAuthState` 查询序列化，并保留 `max_age` 等非字符串值

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许 customIdTokenClaims 覆盖 ID 令牌中的 acr 和 auth_time

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 init 中处理动态 baseURL 配置，避免对象格式的 URL 导致崩溃

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在根据不同适配器的数据结构推导 OIDC auth_time 前规范化会话时间戳

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 从登录后的 OAuth 后续流程返回 JSON 重定向，修复被 CORS 阻止的 302 响应

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 启用二级存储时强制使用数据库支持的会话，以便在初始化时快速失败

- 已更新依赖项 [[`dd537cb`](https://github.com/better-auth/better-auth/commit/dd537cbdeb618abe9e274129f1670d0c03e89ae5), [`bd9bd58`](https://github.com/better-auth/better-auth/commit/bd9bd58f8768b2512f211c98c227148769d533c5), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`469eee6`](https://github.com/better-auth/better-auth/commit/469eee6d846b32a43f36b418868e6a4c916382dc), [`560230f`](https://github.com/better-auth/better-auth/commit/560230f751dfc5d6efc8f7f3f12e5970c9ba09ea)]：
  - better-auth@1.6.0
  - @better-auth/core@1.6.0

## 1.6.0-beta.0

### 次要变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为插件接口添加可选的 version 字段，并在所有内置插件中公开 version

### 补丁变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 仅在配置了 secondaryStorage 时才要求 storeSessionInDatabase

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许 customIdTokenClaims 覆盖 ID 令牌中的 acr 和 auth_time

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 init 中处理动态 baseURL 配置，避免对象格式的 URL 导致崩溃

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在根据不同适配器的结构推导 OIDC auth_time 前，规范化会话时间戳

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 从登录后的 OAuth 后续流程返回 JSON 重定向，以修复被 CORS 阻止的 302 响应

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 启用二级存储时强制使用数据库支持的会话，以便在初始化时快速失败

- 更新的依赖项 [[`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b)]：
  - better-auth@1.6.0-beta.0
  - @better-auth/core@1.6.0-beta.0
