# @better-auth/mcp

## 1.7.6

### 补丁变更

- 更新的依赖项 []：
  - @better-auth/oauth-provider@1.7.6

## 1.7.5

### 补丁变更

- 更新的依赖项 []：
  - @better-auth/oauth-provider@1.7.5

## 1.7.4

### 补丁变更

- 更新的依赖项 []：
  - @better-auth/oauth-provider@1.7.4

## 1.7.3

### 补丁变更

- 更新的依赖项 [[`4d09d50`](https://github.com/better-auth/better-auth/commit/4d09d502254f1bfe65dafc8d813d803225429c4a)]：
  - @better-auth/oauth-provider@1.7.3

## 1.7.2

### 补丁变更

- 更新的依赖项 [[`bb8d7c4`](https://github.com/better-auth/better-auth/commit/bb8d7c4541992baedd53325761e19a919a805fc7)，[`fced1a5`](https://github.com/better-auth/better-auth/commit/fced1a5d360c14e6358f88dedc9014ff862873f1)]：
  - @better-auth/oauth-provider@1.7.2

## 1.7.1

### 补丁变更

- 更新的依赖项 []：
  - @better-auth/oauth-provider@1.7.1

## 1.7.0

### 次要变更

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - OAuth 客户端现在会存储 `applicationType`，并在 OAuth 元数据中将其公开为 `application_type`。身份验证方式仅由 `tokenEndpointAuthMethod` 决定：`"none"` 表示公开客户端，其他所有方式都表示机密客户端。已移除旧版 `type` 和 `public` 字段。

  `OAuthClient` 不再具有兜底字符串索引。请使用命名交叉类型（例如 `OAuthClient & YourExtensionMetadata`）显式建模自定义 wire 扩展；旧版 `type` 和 `public` 字段不再能作为未知附加字段通过类型检查。
  - 动态、管理员和用户管理的注册中，如果省略 `application_type`，默认值为 `web`。Client ID Metadata Documents 会将省略的值保留为 `null`。
  - Web 重定向要求使用 HTTPS，且主机不能是环回地址。Native 重定向接受已声明的 HTTPS URL、精确匹配的 HTTP 环回主机，或反向域名私用方案。
  - 注册资源选项用于控制资源链接。`mcp()` 默认会添加其受保护资源，因此符合标准的客户端不再需要 `resources` 扩展。
  - `mcp()` 不再启用未经身份验证的 Dynamic Client Registration。将 `mcp()` 与 `cimd()` 组合使用以启用 Client ID Metadata Documents，或显式启用两个 DCR 标志。

  此版本需要数据库迁移。添加 `applicationType` 和可空的 `clientDiscoveryId`；将旧版 `web` 和 `native` 值直接映射，将 `user-agent-based` 映射为 `NULL` 以便手动重新分类，且绝不能从 `public` 推导其值。仅根据已知的发现来源设置 `clientDiscoveryId`，绝不能通过检查 HTTPS 客户端 ID 来设置。在添加新的复合唯一索引之前，请对现有的 `(clientId, resourceId)` 链接去重，然后删除旧版列。使用自定义架构映射的部署必须手动应用此回填。

  机器对机器的作用域权限现在单独存储在可空的 `oauthClient.clientCredentialsScopes` 中。缺失、`NULL` 和空值都会拒绝签发 `client_credentials` 令牌。只有管理员创建和更新端点会公开 `client_credentials_scopes`，且分配非空值需要 `clientPrivileges` 批准新的 `configure-client-credentials-scopes` 操作。DCR、CIMD 和用户管理的注册不能分配此字段；CIMD 刷新会保留现有的管理员拥有值。移除 `clientCredentialGrantDefaultScopes`，将每个现有客户端回填为 `[]`，将 `[]` 配置为新行的默认值，然后在审核客户端后显式分配每个获批的机器作用域。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 遇到作用域限制的 MCP 客户端现在可以明确得知需要申请哪些作用域。缺少受保护作用域时会返回 `403`，并附带 RFC 6750 `insufficient_scope` `WWW-Authenticate` 挑战，其中会列出所有缺失的作用域。客户端可以将这些作用域合并到一次授权请求中，而不必为每个作用域分别打开一次浏览器重定向。
  - 通过 `RequireMcpAuthOptions` 或匹配的 `createMcpProtectedRequestHandler` 验证器选项中的 `requiredScopes` 配置受保护作用域。默认仍要求精确匹配；`isScopeSatisfied` 可定义层级策略。
  - 当某项操作动态确定所需作用域时，请使用 `createInsufficientScopeError`。`createResourceServerChallenge` 会将该信号和已识别的令牌错误转换为安全的 RFC 6750 挑战。
  - 仅将 `challengeScopes` 用作未经身份验证时的挑战提示。

  处理器生成的响应、普通权限拒绝、配置失败以及无关的抛出值都会保留其原始状态和身份。

- [#9992](https://github.com/better-auth/better-auth/pull/9992) [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - MCP 插件从 `better-auth` 移至独立包 `@better-auth/mcp`，并基于 `@better-auth/oauth-provider` 构建。请从包根目录导入授权插件和受保护请求辅助函数。内置的 MCP 客户端（`createMcpAuthClient` 及其适配器）已移除；MCP 协议和传输客户端请使用官方版本 2 的 `@modelcontextprotocol/client` 和 `@modelcontextprotocol/server` 包。OAuth 端点从 `/mcp/*` 移至 `/oauth2/*`，发现端点位于 `/.well-known/oauth-authorization-server`，受保护资源元数据位于 `/.well-known/oauth-protected-resource`。基于发现机制的 MCP 客户端会自动获取新的位置。

  共享身份验证路由辅助函数从 `withMcpAuth` 重命名为 `requireMcpAuth`。独立的受保护资源工厂从 `mcpHandler` 重命名为 `createMcpProtectedRequestHandler`；请传入一个扁平的 `McpProtectedRequestHandlerOptions` 对象，其中包含 `issuer`、单个 `audience`、可选的 `jwtVerifyOptions`、令牌验证字段和挑战字段。其回调会接收 `accessTokenClaims`。`requireMcpAuth` 会根据已发布的 JWKS 验证访问令牌，为 DPoP 绑定令牌验证 DPoP 证明，并将已验证的访问令牌声明传递给处理器。

  `createInsufficientScopeError` 现在会在构造错误时，根据 RFC 6750 `error_description` 字符集验证自定义描述。无效描述会抛出 `TypeError("invalid error_description")`，避免错误进入资源挑战序列化流程。

  MCP 2026-07-28 使用无状态请求和响应传输。使用版本 2 的 `@modelcontextprotocol/server` 提供 MCP 路由，使用 `legacy: "reject"` 配置 `createMcpHandler`，用 `requireMcpAuth` 包装，并且只导出 `POST`。移除 MCP 路由的 `GET` 和 `DELETE` 导出，以及 `redisUrl` 等会话存储选项。OAuth 客户端、许可、授权码、刷新令牌和安全记录仍是持久化的授权状态。

  迁移时，请安装 `@better-auth/mcp`、`@better-auth/cimd` 以及应用所需的官方版本 2 MCP 客户端或服务器包；添加现在为令牌签名所必需的 `jwt()` 插件；并将原先嵌套在 `oidcConfig` 下的选项移至 `mcp({ ... })` 的扁平选项中。数据库模型有所变化：`oauthApplication` 变为 `oauthClient`，并新增 `oauthRefreshToken` 和 `oauthClientAssertion` 表。请使用 `npx auth migrate` 或 `npx auth generate` 重新生成或迁移架构。

- [#10039](https://github.com/better-auth/better-auth/pull/10039) [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - feat(oauth-provider)!：DPoP 绑定访问令牌（RFC 9449）

  OAuth 提供方集成现在可以签发和验证 DPoP 发送方约束令牌。客户端可在注册时通过 `dpop_bound_access_tokens`、在授权请求中通过 `dpop_jkt`，或通过使用配置了 `dpopBoundAccessTokensRequired` 的资源来请求此类令牌。签发的令牌包含 `cnf.jkt`，返回 `token_type: "DPoP"`，并在刷新令牌轮换、内省和 userinfo 过程中保持绑定。

  资源服务器使用 `verifyAccessTokenRequest` 验证 DPoP 请求；该函数会检查 `Authorization: DPoP` 方案、证明、请求目标、访问令牌哈希和证明重放。MCP 包会在受保护资源元数据中声明支持 DPoP，并验证 DPoP 绑定请求。证明重放会通过数据库支持的验证存储予以拒绝，因此可在多个实例间防止重放。`verifyAccessTokenRequest` 和 `requireMcpAuth` 默认使用该存储；请使用 `createDpopReplayStore(internalAdapter)` 创建一个存储，或传入自定义的 `dpop.replayStore`。此功能需要数据库支持的验证存储：仅使用辅助存储的部署会拒绝 DPoP 请求，而不是跳过重放保护。

  破坏性变更：原始令牌验证器 `verifyAccessToken` 在 `better-auth/oauth2` 和 `oauthProviderResourceClient` 操作中都重命名为 `verifyBearerToken`，并且会拒绝 DPoP 绑定令牌。任何可能接收此类令牌的端点都应使用 `verifyAccessTokenRequest`。资源请求输入类型从 `AccessTokenRequestInput` 重命名为 `ResourceRequestInput`，DPoP 算法选项在所有地方都统一为 `signingAlgorithms`。

  请为 DPoP 令牌绑定字段运行架构迁移：访问令牌和刷新令牌表中的 `confirmation` 列。DPoP 绑定客户端还会新增 `dpopBoundAccessTokens`，资源则会新增 `dpopBoundAccessTokensRequired`。不会新增专用的重放表；证明重放会复用验证存储。

- [#9648](https://github.com/better-auth/better-auth/pull/9648) [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！ - OAuth 提供方现在会显式建模受保护资源。使用 `resources` 配置它们，或通过 `oauthResource` 管理 API 创建它们。每个资源都可以定义令牌 TTL、允许的作用域、自定义 JWT 声明和 JWT 签名固定项。

  `validAudiences` 已移除。请将每个现有资源标识符移入 `resources`；使用 `oauthClientResource` 或 Dynamic Client Registration 的 `resources`，将客户端链接到应仅限其访问的资源。

  访问令牌签发现在会对请求的 RFC 8707 `resource` 值应用资源策略。OAuth 提供方会将作用域限制在资源允许列表内，采用已配置的最短 TTL，从自定义声明中剔除保留的 RFC 9068 声明名称，发出 `jti`，并保留重复的 `resource` 表单参数。

  刷新令牌 TTL 现在采用适用的最短有效期。对于每个资源的 `refreshTokenTtl` 长于 `refreshTokenExpiresIn` 的部署，刷新令牌会按提供方默认值过期，而不再采用较长的资源值。

  JWT 签名现在可以遵循每个资源的固定项。`signJWT()` 接受 `signingKeyId` 和 `signingAlgorithm`；JWKS 适配器会公开 `getKeyById()` 和 `getLatestKeyByAlg()`。`jwks` 表新增可空的 `alg` 和 `crv` 列，`keyPairConfigs` 可在一个密钥环中配置多个算法。

  升级后，请运行 `npx auth generate` 并在部署前应用迁移。迁移会新增 `oauthResource`、`oauthClientResource` 和新的 `jwks` 列。若不应用迁移，使用 `signingAlgorithm` 的资源将无法找到匹配的密钥。

  资源服务器应在自身源站发布 RFC 9728 受保护资源元数据。OAuth 提供方提供的挑战辅助函数会指引客户端访问该元数据。

  `@better-auth/mcp` 现在要求显式设置 `resource` 选项。该插件会将此标识符存储为 OAuth 资源，为其发布 RFC 9728 受保护资源元数据，并将签发的访问令牌绑定到该资源。现有的 `mcp({ loginPage, consentPage })` 配置应添加一个受保护的 MCP 资源标识符，例如 `resource: "https://api.example.com/mcp"`。

- [#10145](https://github.com/better-auth/better-auth/pull/10145) [`5838df2`](https://github.com/better-auth/better-auth/commit/5838df2f4146433164ca16ffdba2d196a4f8ff51) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 对于配置了 `refreshTokenReuseInterval` 的情况，OAuth Provider 现在可以在该时间间隔内为重复的刷新请求重放相同的刷新令牌响应。OAuth Provider 默认仍采用严格的重放处理；设置此选项即可启用重叠时间窗口。

  MCP 插件会为每个已配置客户端将该间隔默认设为 30 秒。重试的刷新请求可以恢复由另一个请求轮换令牌时生成的响应。OAuth Provider 默认仍采用严格处理；在 `mcp()` 中设置 `refreshTokenReuseInterval: 0` 可禁用重叠时间窗口。

### 补丁变更

- [#9131](https://github.com/better-auth/better-auth/pull/9131) [`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 动态 `baseURL` 配置现在可在直接服务器 API 调用以及 OAuth 或 MCP 发现中保持一致地解析：
  - 如果无法解析基础 URL，或请求主机违反 `allowedHosts`，则返回清晰的 `APIError`。
  - 在信任转发的主机和协议值之前，先应用 `advanced.trustedProxyHeaders`，并为每次直接调用刷新依赖请求的可信来源、可信提供程序和 Cookie。
  - 仅有标头时，为本地回环开发主机推断 HTTP；同时拒绝缺少可用 URL 和标头数据的类请求对象。
  - 根据当前请求主机生成 OAuth issuer、发现、受保护资源和 JWKS URL。
  - 让 `requireMcpAuth` 使用解析后的 Better Auth URL 作为默认 issuer、resource 和 JWKS URL。主机完全动态的资源服务器可通过显式验证选项使用 `createMcpProtectedRequestHandler`。
  - 保留以 `Headers`、元组数组或记录形式提供的元数据响应标头。

- 已更新依赖项 [[`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5), [`132e293`](https://github.com/better-auth/better-auth/commit/132e293d7a82db30d7d1a63fb32c28df863204ae), [`267229b`](https://github.com/better-auth/better-auth/commit/267229bd24d5f918ac4c9c7eca7507e8c603e310), [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71), [`cd8313b`](https://github.com/better-auth/better-auth/commit/cd8313ba003a8b3c46b11fefeae9a53305908cc3), [`4fe730a`](https://github.com/better-auth/better-auth/commit/4fe730a9c12f2ff68ca84523817b550adc7b2982), [`6782647`](https://github.com/better-auth/better-auth/commit/6782647d7c2d248246f9ef3980e656725c29ce64), [`e3125e8`](https://github.com/better-auth/better-auth/commit/e3125e872d40cdd6588cbcb65d8ca0d640bae15b), [`508d8d6`](https://github.com/better-auth/better-auth/commit/508d8d6f06488d33a44d11059c873fcb8721d7a1), [`a8200b2`](https://github.com/better-auth/better-auth/commit/a8200b297c4092cb51397a9285ef4d1f024dea75), [`5c6de4e`](https://github.com/better-auth/better-auth/commit/5c6de4ed265e7aa30e7e42a0e493386cf3ad6c96), [`b4b0867`](https://github.com/better-auth/better-auth/commit/b4b086722c2da179f885ad2680e10ed3410ad849), [`c7d2253`](https://github.com/better-auth/better-auth/commit/c7d22539ec4f7322d9625ae2953d397c3863d097), [`335cda7`](https://github.com/better-auth/better-auth/commit/335cda702ef8e2aecad4b26a427f16953e3aabd2), [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222), [`2fd3d58`](https://github.com/better-auth/better-auth/commit/2fd3d5850006d164317d4f53a81ac95f2d1f549a), [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9), [`6f2948e`](https://github.com/better-auth/better-auth/commit/6f2948e87bb5fa14bd2174a91f7143e1eced1b87), [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f), [`7d1288e`](https://github.com/better-auth/better-auth/commit/7d1288e7c56a2385713cbcc232a376a7fe228be4), [`f68044d`](https://github.com/better-auth/better-auth/commit/f68044dcfbd9fb83763249ed9509cfacbcce47be), [`050ef2d`](https://github.com/better-auth/better-auth/commit/050ef2dfcf22429135b49804de195f945f59f3c1), [`0e1770a`](https://github.com/better-auth/better-auth/commit/0e1770ac7563a27b1daab96d5d571657b3a45f75), [`a796214`](https://github.com/better-auth/better-auth/commit/a7962147b3a759ce6da542300e31f3b5705a63fa), [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627), [`3e852a2`](https://github.com/better-auth/better-auth/commit/3e852a26500446b2c4ad608933c71b616ceddba5), [`d368217`](https://github.com/better-auth/better-auth/commit/d368217efc1265996460d96c539b2ca669e33d49), [`dd42701`](https://github.com/better-auth/better-auth/commit/dd42701af4b8aa56287c6890a8217a270249571f), [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a), [`801968e`](https://github.com/better-auth/better-auth/commit/801968e354067869318718f4766d7011c0218a86), [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656), [`0143d69`](https://github.com/better-auth/better-auth/commit/0143d69195870ea6550a40add8618361dbbc3b8f), [`5838df2`](https://github.com/better-auth/better-auth/commit/5838df2f4146433164ca16ffdba2d196a4f8ff51), [`6f9a188`](https://github.com/better-auth/better-auth/commit/6f9a188bbb2665e56be1f1fb566eb1f5f919e1c8), [`f451d1c`](https://github.com/better-auth/better-auth/commit/f451d1c7589ddb4d2995fa54aee9375472ebea33), [`69acb7a`](https://github.com/better-auth/better-auth/commit/69acb7a3db3cd148a9cd1db5063dbdc69909165a), [`5ac6249`](https://github.com/better-auth/better-auth/commit/5ac62493ef7296b4ac89359d257a0a99305ac189), [`6d97c47`](https://github.com/better-auth/better-auth/commit/6d97c4754c80010524b922c39b28a7afd4012457)]：
  - @better-auth/oauth-provider@1.7.0

## 1.7.0-rc.6

### Patch Changes

- 已更新依赖项 [[`801968e`](https://github.com/better-auth/better-auth/commit/801968e354067869318718f4766d7011c0218a86), [`f451d1c`](https://github.com/better-auth/better-auth/commit/f451d1c7589ddb4d2995fa54aee9375472ebea33)]：
  - @better-auth/oauth-provider@1.7.0-rc.6

## 1.7.0-rc.5

### Patch Changes

- 已更新依赖项 [[`6782647`](https://github.com/better-auth/better-auth/commit/6782647d7c2d248246f9ef3980e656725c29ce64), [`a796214`](https://github.com/better-auth/better-auth/commit/a7962147b3a759ce6da542300e31f3b5705a63fa)]：
  - @better-auth/oauth-provider@1.7.0-rc.5

## 1.7.0-rc.4

### Patch Changes

- 已更新依赖项 []：
  - @better-auth/oauth-provider@1.7.0-rc.4

## 1.7.0-rc.3

### Minor Changes

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth 客户端现在会存储 `applicationType`，并在 OAuth 元数据中将其作为 `application_type` 暴露。身份验证仅由 `tokenEndpointAuthMethod` 决定：`"none"` 为公开客户端，其他所有方法均为机密客户端。旧版 `type` 和 `public` 字段已移除。

  `OAuthClient` 不再具有兜底字符串索引。使用具名交叉类型（例如 `OAuthClient & YourExtensionMetadata`）显式声明模型自定义 wire 扩展；旧版 `type` 和 `public` 字段不再会作为未知附加字段通过类型检查。
  - 动态、管理和用户管理的注册中，省略 `application_type` 时默认值为 `web`。客户端 ID 元数据文档会将省略的值保留为 `null`。
  - Web 重定向要求使用非回环主机上的 HTTPS。原生重定向接受已声明的 HTTPS URL、精确的 HTTP 回环主机或反向域名私用方案。
  - 注册资源选项控制资源链接。`mcp()` 默认会添加其受保护资源，因此符合标准的客户端不再需要 `resources` 扩展。
  - `mcp()` 不再启用未经身份验证的动态客户端注册。将 `mcp()` 与 `cimd()` 组合使用以启用客户端 ID 元数据文档，或显式启用两个 DCR 标志。

  此版本需要数据库迁移。添加 `applicationType` 和可空的 `clientDiscoveryId`；将旧的 `web` 和 `native` 值直接映射，将 `user-agent-based` 映射为 `NULL` 以便手动重新分类，并且绝不要从 `public` 推导该值。仅根据已知的发现来源设置 `clientDiscoveryId`，绝不要通过检查 HTTPS 客户端 ID 来设置。在添加新的复合唯一索引之前，先对现有的 `(clientId, resourceId)` 链接去重，然后删除旧列。使用自定义架构映射的部署必须手动应用此回填。

  机器对机器的作用域权限现在单独存储在可空的 `oauthClient.clientCredentialsScopes` 中。缺失、`NULL` 和空值都会禁止签发 `client_credentials` 令牌。只有管理创建和更新端点会暴露 `client_credentials_scopes`，且分配非空值需要 `clientPrivileges` 批准新的 `configure-client-credentials-scopes` 操作。DCR、CIMD 和用户管理的注册无法分配此字段；CIMD 刷新会保留现有的管理员所有值。移除 `clientCredentialGrantDefaultScopes`，将每个现有客户端回填为 `[]`，将 `[]` 配置为新行的默认值，然后在审计客户端后明确分配所有获批的机器作用域。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 遇到作用域限制的 MCP 客户端现在可以准确获知需要申请哪些作用域。缺少受保护作用域时，会返回带有 RFC 6750 `insufficient_scope` `WWW-Authenticate` 挑战的 `403`，其中列出了所有缺失作用域。客户端可以将这些作用域合并到一个授权请求中，而不必针对每个作用域分别打开一次浏览器重定向。
  - 通过 `RequireMcpAuthOptions` 或匹配的 `createMcpProtectedRequestHandler` 验证器选项中的 `requiredScopes` 配置受保护作用域。默认采用精确成员匹配；`isScopeSatisfied` 可定义分层策略。
  - 当某项操作动态确定所需作用域时，使用 `createInsufficientScopeError`。`createResourceServerChallenge` 会将此信号和可识别的令牌失败转换为安全的 RFC 6750 挑战。
  - 仅将 `challengeScopes` 用作未经过身份验证时的挑战提示。

  处理程序生成的响应、普通权限拒绝、配置失败以及无关的抛出值都会保留其原始状态和标识。

### Patch Changes

- 已更新依赖项 [[`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71), [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71), [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71), [`f68044d`](https://github.com/better-auth/better-auth/commit/f68044dcfbd9fb83763249ed9509cfacbcce47be)]：
  - @better-auth/oauth-provider@1.7.0-rc.3

## 1.7.0-rc.2

### Patch Changes

- 已更新依赖项 [[`69acb7a`](https://github.com/better-auth/better-auth/commit/69acb7a3db3cd148a9cd1db5063dbdc69909165a)]：
  - @better-auth/oauth-provider@1.7.0-rc.2

## 1.7.0-rc.1

### Patch Changes

- 已更新依赖项 []：
  - @better-auth/oauth-provider@1.7.0-rc.1

## 1.7.0-rc.0

### Patch Changes

- 已更新依赖项 []：
  - @better-auth/oauth-provider@1.7.0-rc.0

## 1.7.0-beta.7

### Minor Changes

- [#10145](https://github.com/better-auth/better-auth/pull/10145) [`5838df2`](https://github.com/better-auth/better-auth/commit/5838df2f4146433164ca16ffdba2d196a4f8ff51) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth Provider 现在可以在配置的 `refreshTokenReuseInterval` 时间间隔内，为重复的刷新请求重放相同的刷新令牌响应。OAuth Provider 默认仍采用严格的重放处理；设置此选项即可启用重叠窗口。

  对于所有已配置客户端，MCP 插件默认将该间隔设为 30 秒。重试的刷新请求可以恢复由另一个请求轮换令牌时生成的响应。OAuth Provider 默认仍采用严格处理；在 `mcp()` 上设置 `refreshTokenReuseInterval: 0` 即可禁用重叠窗口。

### Patch Changes

- 已更新依赖项 [[`5838df2`](https://github.com/better-auth/better-auth/commit/5838df2f4146433164ca16ffdba2d196a4f8ff51)]：
  - @better-auth/oauth-provider@1.7.0-beta.10

## 1.7.0-beta.6

### Minor Changes

- [#9992](https://github.com/better-auth/better-auth/pull/9992) [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - MCP 插件从 `better-auth` 中移出，成为独立的软件包 `@better-auth/mcp`，并基于 `@better-auth/oauth-provider` 构建。从 `@better-auth/mcp` 导入服务器插件及其辅助工具，从 `@better-auth/mcp/client` 和 `@better-auth/mcp/client/adapters` 导入远程客户端和适配器（此前分别从 `better-auth/plugins` 和 `better-auth/plugins/mcp/client` 导入）。OAuth 端点从 `/mcp/*` 移至 `/oauth2/*`，发现端点位于 `/.well-known/oauth-authorization-server`，受保护资源元数据位于 `/.well-known/oauth-protected-resource`。基于发现机制的 MCP 客户端会自行获取新的位置。

  路由辅助工具重命名为 `requireMcpAuth`（原为 `withMcpAuth`），远程客户端重命名为 `createMcpResourceClient`（原为 `createMcpAuthClient`）。`requireMcpAuth` 会根据已发布的 JWKS 验证 bearer token，并将经过验证的 JWT 声明传递给你的处理程序。

  迁移时，请安装 `@better-auth/mcp`，添加 `jwt()` 插件（现在签发令牌时必需），并将原先嵌套在 `oidcConfig` 下的选项移至 `mcp({ ... })` 的扁平选项中。数据库模型也有变化：`oauthApplication` 变为 `oauthClient`，并新增 `oauthRefreshToken` 和 `oauthClientAssertion` 表。使用 `npx auth migrate` 或 `npx auth generate` 重新生成或迁移 schema。

- [#10039](https://github.com/better-auth/better-auth/pull/10039) [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - feat(oauth-provider)!：DPoP 绑定的访问令牌（RFC 9449）

  OAuth 提供程序集成可以签发和验证 DPoP 发送方约束令牌。客户端可在注册时通过 `dpop_bound_access_tokens`、在授权请求中通过 `dpop_jkt`，或通过指定配置了 `dpopBoundAccessTokensRequired` 的资源来请求此类令牌。签发的令牌包含 `cnf.jkt`，返回 `token_type: "DPoP"`，并在刷新令牌轮换、内省和用户信息流程中保持绑定。

  资源服务器使用 `verifyAccessTokenRequest` 验证 DPoP 请求。该函数会检查 `Authorization: DPoP` 方案、证明、请求目标、访问令牌哈希和证明重放。MCP 软件包会在受保护资源元数据中声明支持 DPoP，并验证绑定了 DPoP 的请求。通过数据库支持的验证存储拒绝证明重放，因此可在多个实例间防止重放。`verifyAccessTokenRequest` 和 `requireMcpAuth` 默认使用该存储；使用 `createDpopReplayStore(internalAdapter)` 创建一个存储，或传入自定义的 `dpop.replayStore`。此功能需要数据库支持的验证存储：仅使用辅助存储的部署会拒绝 DPoP 请求，而不会跳过重放保护。

  破坏性变更：原始令牌验证器 `verifyAccessToken` 重命名为 `verifyBearerToken`，在 `better-auth/oauth2` 和 `oauthProviderResourceClient` 操作中均如此；该验证器会拒绝绑定了 DPoP 的令牌。对于任何可能收到此类令牌的端点，请使用 `verifyAccessTokenRequest`。资源请求输入类型从 `AccessTokenRequestInput` 重命名为 `ResourceRequestInput`，且 DPoP 算法选项在所有位置均为 `signingAlgorithms`。

  请执行 schema 迁移，以添加 DPoP 令牌绑定字段：访问令牌表和刷新令牌表中的 `confirmation` 列。绑定了 DPoP 的客户端还会新增 `dpopBoundAccessTokens`，资源则会新增 `dpopBoundAccessTokensRequired`。不会新增专用的重放表；证明重放会复用验证存储。

- [#9648](https://github.com/better-auth/better-auth/pull/9648) [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627) 感谢 [@brentmitchell25](https://github.com/brentmitchell25)！ - OAuth 提供程序现在会显式建模受保护资源。可使用 `resources` 配置资源，或通过 `oauthResource` 管理 API 创建资源。每个资源均可定义令牌 TTL、允许的范围、自定义 JWT 声明和 JWT 签名固定值。

  `validAudiences` 已移除。请将现有的每个资源标识符移入 `resources`；通过 `oauthClientResource` 或动态客户端注册中的 `resources`，将客户端关联到应受特定资源限制的资源。

  现在，访问令牌签发会对请求的 RFC 8707 `resource` 值应用资源策略。OAuth 提供程序会将范围缩小至资源允许列表，使用配置的最短 TTL，从自定义声明中剔除 RFC 9068 保留的声明名称，发出 `jti`，并保留重复的 `resource` 表单参数。

  刷新令牌 TTL 现在采用最短的适用期限。对于按资源设置的 `refreshTokenTtl` 长于 `refreshTokenExpiresIn` 的部署，刷新令牌将按提供程序默认值过期，而不会采用较长的资源值。

  JWT 签名现在可以遵循按资源设置的固定值。`signJWT()` 接受 `signingKeyId` 和 `signingAlgorithm`；JWKS 适配器会公开 `getKeyById()` 和 `getLatestKeyByAlg()`。`jwks` 表新增可空的 `alg` 和 `crv` 列，`keyPairConfigs` 可以在一个密钥环中配置多个算法。

  升级后，请运行 `npx @better-auth/cli generate` 并在部署前应用迁移。该迁移会新增 `oauthResource`、`oauthClientResource` 和新的 `jwks` 列。如果不应用迁移，使用 `signingAlgorithm` 的资源将无法找到匹配的密钥。

  资源服务器应在自身源站发布 RFC 9728 受保护资源元数据。OAuth 提供程序提供的质询辅助工具会引导客户端访问这些元数据。

  `@better-auth/mcp` 现在要求显式设置 `resource` 选项。该插件会将此标识符存储为 OAuth 资源，为其发布 RFC 9728 受保护资源元数据，并将签发的访问令牌绑定到该资源。现有的 `mcp({ loginPage, consentPage })` 配置应添加受保护的 MCP 资源标识符，例如 `resource: "https://api.example.com/mcp"`。

### 修补程序变更

- 已更新依赖项 [[`b36c38f`](https://github.com/better-auth/better-auth/commit/b36c38f9842d3416689340552989449a32007819), [`73541c1`](https://github.com/better-auth/better-auth/commit/73541c119041113b1909fe244ff4b8210618b5b5), [`bf39cbf`](https://github.com/better-auth/better-auth/commit/bf39cbf13f3b934f728cde72b1e7ebdc4c85f641), [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222), [`2fd3d58`](https://github.com/better-auth/better-auth/commit/2fd3d5850006d164317d4f53a81ac95f2d1f549a), [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9), [`050ef2d`](https://github.com/better-auth/better-auth/commit/050ef2dfcf22429135b49804de195f945f59f3c1), [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627), [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734), [`0143d69`](https://github.com/better-auth/better-auth/commit/0143d69195870ea6550a40add8618361dbbc3b8f), [`652fa53`](https://github.com/better-auth/better-auth/commit/652fa53e4912837fe234651e7c7705fb35abe188), [`6fe9faa`](https://github.com/better-auth/better-auth/commit/6fe9faab65eb640dbe9bb762954a068586e8661c), [`ad35ead`](https://github.com/better-auth/better-auth/commit/ad35eadd130162565a1b93c27f3a66910dca0b0e), [`6d97c47`](https://github.com/better-auth/better-auth/commit/6d97c4754c80010524b922c39b28a7afd4012457)]：
  - better-auth@1.7.0-beta.6
  - @better-auth/oauth-provider@1.7.0-beta.6
  - @better-auth/core@1.7.0-beta.6
