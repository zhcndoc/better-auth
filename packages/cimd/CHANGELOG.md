# @better-auth/cimd

## 1.7.6

## 1.7.5

### 补丁变更

- [#11161](https://github.com/better-auth/better-auth/pull/11161) [`753c2d1`](https://github.com/better-auth/better-auth/commit/753c2d19f77c07749f24f0dcacab2f88dc88484c) 感谢 [@bytaesu](https://github.com/bytaesu)！- 允许具有有效但无法缓存的元数据的 CIMD 客户端连续发起 OAuth 请求，同时保留失败获取的退避机制以及来源/全局获取限制。

## 1.7.4

## 1.7.3

### 补丁变更

- [#10730](https://github.com/better-auth/better-auth/pull/10730) [`1d9b55c`](https://github.com/better-auth/better-auth/commit/1d9b55cfdb789224b545ae317b4bca6b5621d755) 感谢 [@erikpr1994](https://github.com/erikpr1994)！- 修复在受支持的 Node.js 版本上，CIMD 客户端元数据发现因 `ERR_INVALID_IP_ADDRESS` 而失败的问题。

## 1.7.2

## 1.7.1

## 1.7.0

### 次要变更

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth 客户端现在会存储 `applicationType`，并在 OAuth 元数据中将其作为 `application_type` 暴露。只有 `tokenEndpointAuthMethod` 决定身份验证方式：`"none"` 表示公开客户端，其他所有方式都表示机密客户端。旧版 `type` 和 `public` 字段已移除。

  `OAuthClient` 不再包含兜底字符串索引。请使用命名交叉类型（例如 `OAuthClient & YourExtensionMetadata`）显式建模自定义线格式扩展；旧版 `type` 和 `public` 字段不再能作为未知附带字段通过类型检查。
  - 动态、管理和用户管理的注册在未提供 `application_type` 时，默认值为 `web`。客户端 ID 元数据文档会将未提供的值保留为 `null`。
  - Web 重定向要求使用非环回主机上的 HTTPS。原生重定向接受已声明的 HTTPS URL、精确的 HTTP 环回主机，或反向域名私有使用方案。
  - 注册资源选项控制资源链接。`mcp()` 默认会添加其受保护资源，因此符合标准的客户端不再需要 `resources` 扩展。
  - `mcp()` 不再启用未经身份验证的动态客户端注册。要使用客户端 ID 元数据文档，请将 `mcp()` 与 `cimd()` 组合使用；或者显式启用两个 DCR 标志。

  此版本需要数据库迁移。添加 `applicationType` 和可空的 `clientDiscoveryId`；将旧版 `web` 和 `native` 值直接映射，将 `user-agent-based` 映射为 `NULL` 以便手动重新分类，且绝不要从 `public` 推导该值。仅根据已知的发现来源设置 `clientDiscoveryId`，绝不要通过检查 HTTPS 客户端 ID 来设置。在添加新的复合唯一索引之前，先对现有的 `(clientId, resourceId)` 链接去重，然后删除旧列。使用自定义架构映射的部署必须手动应用此回填。

  机器间范围权限现在单独存储在可空的 `oauthClient.clientCredentialsScopes` 中。缺失、`NULL` 和空值都会拒绝签发 `client_credentials` 令牌。只有管理端创建和更新端点会公开 `client_credentials_scopes`，并且分配非空值时需要 `clientPrivileges` 批准新的 `configure-client-credentials-scopes` 操作。DCR、CIMD 和用户管理的注册不能分配此字段；CIMD 刷新会保留现有的管理员所有值。移除 `clientCredentialGrantDefaultScopes`，将每个现有客户端回填为 `[]`，将新行的默认值配置为 `[]`，然后在审核客户端后，明确分配每个获批的机器范围。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 客户端 ID 元数据文档现在遵循共享缓存的新鲜度规则，并在新鲜度存在歧义时采取失败关闭策略。插件优先使用 `s-maxage` 而非 `max-age` 和 `Expires`，遵循 `s-maxage=0`，通过 ETag 或 Last-Modified 有条件地重新验证，并将无效或重复的新鲜度指令视为立即过期。并发刷新会汇聚到同一个客户端-资源链接，而不会因其唯一约束而失败。

  共享 OAuth 元数据验证现在会拒绝空白的 `client_name`，但不会裁剪有效的显示名称。原生私有使用重定向要求采用 RFC 8252 单斜杠形式，例如 `com.example.app:/callback`。原生 HTTP 重定向只接受精确的 `localhost`、`127.0.0.1` 或 `[::1]` 主机；其他 `127.0.0.0/8` 地址和 localhost 子域名均会被拒绝。

  CIMD 现在通过 `metadataFetchPolicy` 限制元数据请求放大：同一客户端的获取请求会合并；超出每客户端节流限制以及全局/每来源并发限制时会立即拒绝；滚动 60 秒预算会限制针对唯一客户端的请求喷洒。HTTP `no-store`、`private` 和 `Vary: *` 行为保持不变，且不会将元数据或验证器提供给流量控制器。

  Node.js 部署可以从 `@better-auth/cimd/node` 导入 `fetchClientMetadataResource`。该传输只解析一次，拒绝任何非公共 DNS 答案，不使用全局 HTTPS 连接池来固定获准的连接，保留 Host 和 TLS 证书身份，并在不缓冲的情况下返回重定向和响应正文。其他运行时仍需负责提供等效的安全传输。

  现在会忽略未知的 draft-02 元数据成员，且绝不会持久化这些成员。已识别的密钥、权限字段和服务器控制字段仍会导致致命错误，而通用内部别名和非标准客户端凭据权限拼写会被剥除。

- [#9159](https://github.com/better-auth/better-auth/pull/9159) [`cd8313b`](https://github.com/better-auth/better-auth/commit/cd8313ba003a8b3c46b11fefeae9a53305908cc3) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加 `@better-auth/cimd`，用于支持 [客户端 ID 元数据文档 draft-02](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-client-id-metadata-document-02)。精确的 HTTPS 元数据文档 URL 会成为 OAuth `client_id`，安装此插件后，OAuth 发现信息会声明支持此功能。显式的 `metadataProfile: "mcp-2026-07-28"` 模式会应用 MCP 2026-07-28 所固定的 draft-00 元数据要求。
  - 验证完整的共享 OAuth 客户端元数据架构。通用 draft-02 客户端可以省略 `client_name` 和 `redirect_uris`，并且可以使用 OAuth Provider 支持的任何授权类型；MCP 配置文件要求提供 `client_id`、`client_name` 和 `redirect_uris`。
  - 拒绝客户端密钥、私有 JWK 材料、后端通道注销元数据、服务器所有的字段、不安全的元数据 URL、非 JSON 响应、超大文档、重定向，以及私有或保留网络目标。不再支持环回客户端标识符 URL。
  - 通过统一的公共非对称密钥边界验证已注册、已发现和远程获取的客户端 JWKS。RFC 7517 JWK 集必须使用 `{ "keys": [...] }`；请将已移除的裸数组形式 `jwks: [key]` 替换为 `jwks: { keys: [key] }`。空、格式错误、对称、私有和不受支持的密钥集会在进入 Provider 作用域缓存之前被拒绝。EC 密钥必须使用 P-256、P-384 或 P-521；OKP 密钥必须使用 Ed25519。声明的 `alg` 必须与密钥类型和曲线匹配。通过 `oauthToSchema` 写入的现有 OAuth 客户端行已完成规范化，因此无需重写数据库，除非这些行是在 Better Auth 之外写入的。
  - 要求部署方提供 `fetchClientMetadataResource` 作为元数据文档和发现拥有的 `jwks_uri` 资源的传输。它必须只解析一次，拒绝 RFC 6890 特殊用途地址，为连接固定获准地址，并拒绝重定向。`isMetadataDocumentUrlAllowed` 仍可用于额外的应用策略。
  - 仅缓存有效且成功的元数据，并采用有界存储、HTTP 共享缓存新鲜度规则、ETag 和 Last-Modified 条件重新验证，以及失败关闭的刷新行为。`Cache-Control: private` 和 `Vary: *` 不可缓存，且无条件的 `304` 会被拒绝。
  - 将 `oauthClient.clientDiscoveryId` 持久化为可空的发现来源信息。发现 ID 全局唯一；当拥有客户端的匹配发现不可用时，将采取失败关闭策略。只有该发现可以刷新客户端，或为其元数据所属资源提供传输，因此托管客户端和 DCR HTTPS 客户端 ID 不会被接管。
  - 创建或刷新客户端时，保留自定义模型名称、资源链接和管理员控制的客户端标志。刷新通知现在会接收 `previousClient`。

  OAuth Provider 还为自定义的已验证客户端解析插件公开了 `clientDiscovery`。发现机制可以提供 `fetchClientMetadataResource`，并且其稳定的 `id` 会作为客户端来源信息持久化。

  预发布版本的使用者必须将 `createCimdResolver` 或 `cimdClientDiscovery` 重命名为 `createCimdClientDiscovery`，将 `ClientIdMetadataDocumentResult` 重命名为 `CimdMetadataValidationResult`，将 `ValidateCimdMetadataOptions` 重命名为 `CimdMetadataValidationOptions`，将 `isUrlClientId` 重命名为 `isCimdClientIdUrlCandidate`，并将 `MetadataDocumentFetch` 重命名为 `ClientMetadataResourceFetch`。将 `refreshRate` 重命名为 `metadataRevalidationInterval`；没有兼容性回退。数字类型的重新验证间隔和 `minimumFetchInterval` 值均以秒为单位。

  生命周期回调现在会接收命名的 `CimdClientCreatedEvent` 和 `CimdClientRefreshedEvent` 值。从 `clientMetadataDocument` 而不是 `metadata` 读取已验证的元数据；从 `context` 而不是 `ctx` 读取端点上下文。现在必须提供 `CimdOptions`，因为 `fetchClientMetadataResource` 是必需的。移除预发布版本中的 `allowFetch`、`fetchMetadataDocument` 和 `allowLoopback` 选项。

  采用 CIMD 时，请移除 `allowUnauthenticatedClientRegistration`，除非授权服务器有意将动态客户端注册作为单独的回退方式支持。

## 1.7.0-rc.6

## 1.7.0-rc.5

## 1.7.0-rc.4

## 1.7.0-rc.3

### 次要变更

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- OAuth 客户端现在会存储 `applicationType`，并在 OAuth 元数据中将其作为 `application_type` 暴露。只有 `tokenEndpointAuthMethod` 决定身份验证方式：`"none"` 表示公开客户端，其他所有方式都表示机密客户端。旧版 `type` 和 `public` 字段已移除。

  `OAuthClient` 不再包含兜底字符串索引。请使用命名交叉类型（例如 `OAuthClient & YourExtensionMetadata`）显式建模自定义线格式扩展；旧版 `type` 和 `public` 字段不再能作为未知附带字段通过类型检查。
  - 动态、管理和用户管理的注册在未提供 `application_type` 时，默认值为 `web`。客户端 ID 元数据文档会将未提供的值保留为 `null`。
  - Web 重定向要求使用非环回主机上的 HTTPS。原生重定向接受已声明的 HTTPS URL、精确的 HTTP 环回主机，或反向域名私有使用方案。
  - 注册资源选项控制资源链接。`mcp()` 默认会添加其受保护资源，因此符合标准的客户端不再需要 `resources` 扩展。
  - `mcp()` 不再启用未经身份验证的动态客户端注册。要使用客户端 ID 元数据文档，请将 `mcp()` 与 `cimd()` 组合使用；或者显式启用两个 DCR 标志。

  此版本需要数据库迁移。添加 `applicationType` 和可空的 `clientDiscoveryId`；将旧版 `web` 和 `native` 值直接映射，将 `user-agent-based` 映射为 `NULL` 以便手动重新分类，且绝不要从 `public` 推导该值。仅根据已知的发现来源设置 `clientDiscoveryId`，绝不要通过检查 HTTPS 客户端 ID 来设置。在添加新的复合唯一索引之前，先对现有的 `(clientId, resourceId)` 链接去重，然后删除旧列。使用自定义架构映射的部署必须手动应用此回填。

  机器间范围权限现在单独存储在可空的 `oauthClient.clientCredentialsScopes` 中。缺失、`NULL` 和空值都会拒绝签发 `client_credentials` 令牌。只有管理端创建和更新端点会公开 `client_credentials_scopes`，并且分配非空值时需要 `clientPrivileges` 批准新的 `configure-client-credentials-scopes` 操作。DCR、CIMD 和用户管理的注册不能分配此字段；CIMD 刷新会保留现有的管理员所有值。移除 `clientCredentialGrantDefaultScopes`，将每个现有客户端回填为 `[]`，将新行的默认值配置为 `[]`，然后在审核客户端后，明确分配每个获批的机器范围。

- [#10577](https://github.com/better-auth/better-auth/pull/10577) [`5c45abc`](https://github.com/better-auth/better-auth/commit/5c45abcd2094d4a430cc84af6f9719fa0515ad71) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 客户端 ID 元数据文档现在遵循共享缓存的新鲜度规则，并在新鲜度存在歧义时采取失败关闭策略。插件优先使用 `s-maxage` 而非 `max-age` 和 `Expires`，遵循 `s-maxage=0`，通过 ETag 或 Last-Modified 有条件地重新验证，并将无效或重复的新鲜度指令视为立即过期。并发刷新会汇聚到同一个客户端-资源链接，而不会因其唯一约束而失败。

  共享 OAuth 元数据验证现在会拒绝空白的 `client_name`，但不会裁剪有效的显示名称。原生私有使用重定向要求采用 RFC 8252 单斜杠形式，例如 `com.example.app:/callback`。原生 HTTP 重定向只接受精确的 `localhost`、`127.0.0.1` 或 `[::1]` 主机；其他 `127.0.0.0/8` 地址和 localhost 子域名均会被拒绝。

  CIMD 现在通过 `metadataFetchPolicy` 限制元数据请求放大：同一客户端的获取请求会合并；超出每客户端节流限制以及全局/每来源并发限制时会立即拒绝；滚动 60 秒预算会限制针对唯一客户端的请求喷洒。HTTP `no-store`、`private` 和 `Vary: *` 行为保持不变，且不会将元数据或验证器提供给流量控制器。

  Node.js 部署可以从 `@better-auth/cimd/node` 导入 `fetchClientMetadataResource`。该传输只解析一次，拒绝任何非公共 DNS 答案，不使用全局 HTTPS 连接池来固定获准的连接，保留 Host 和 TLS 证书身份，并在不缓冲的情况下返回重定向和响应正文。其他运行时仍需负责提供等效的安全传输。

  现在会忽略未知的 draft-02 元数据成员，且绝不会持久化这些成员。已识别的密钥、权限字段和服务器控制字段仍会导致致命错误，而通用内部别名和非标准客户端凭据权限拼写会被剥除。

## 1.7.0-rc.2

## 1.7.0-rc.1

## 1.7.0-rc.0

## 1.7.0-beta.10

## 1.7.0-beta.9

### 补丁变更

- 已更新依赖项 [[`132e293`](https://github.com/better-auth/better-auth/commit/132e293d7a82db30d7d1a63fb32c28df863204ae)、[`267229b`](https://github.com/better-auth/better-auth/commit/267229bd24d5f918ac4c9c7eca7507e8c603e310)、[`e3125e8`](https://github.com/better-auth/better-auth/commit/e3125e872d40cdd6588cbcb65d8ca0d640bae15b)、[`508d8d6`](https://github.com/better-auth/better-auth/commit/508d8d6f06488d33a44d11059c873fcb8721d7a1)、[`a8200b2`](https://github.com/better-auth/better-auth/commit/a8200b297c4092cb51397a9285ef4d1f024dea75)、[`335cda7`](https://github.com/better-auth/better-auth/commit/335cda702ef8e2aecad4b26a427f16953e3aabd2)、[`7d1288e`](https://github.com/better-auth/better-auth/commit/7d1288e7c56a2385713cbcc232a376a7fe228be4)、[`d368217`](https://github.com/better-auth/better-auth/commit/d368217efc1265996460d96c539b2ca669e33d49)、[`dd42701`](https://github.com/better-auth/better-auth/commit/dd42701af4b8aa56287c6890a8217a270249571f)、[`6f9a188`](https://github.com/better-auth/better-auth/commit/6f9a188bbb2665e56be1f1fb566eb1f5f919e1c8)、[`5ac6249`](https://github.com/better-auth/better-auth/commit/5ac62493ef7296b4ac89359d257a0a99305ac189)]：
  - @better-auth/oauth-provider@1.7.0-beta.9
  - better-auth@1.7.0-beta.9
  - @better-auth/core@1.7.0-beta.9

## 1.7.0-beta.8

### 补丁变更

- 已更新依赖项 [[`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d)、[`06daf70`](https://github.com/better-auth/better-auth/commit/06daf7011e548ef5a7d513c96e3a440331977a7d)、[`a83152e`](https://github.com/better-auth/better-auth/commit/a83152e2e884b1ac1724f95cea2056795d60e5cc)、[`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0)、[`3a79aff`](https://github.com/better-auth/better-auth/commit/3a79aff58ed82e45caf04c2ee4acaf0f4d09a86c)]：
  - better-auth@1.7.0-beta.8
  - @better-auth/core@1.7.0-beta.8
  - @better-auth/oauth-provider@1.7.0-beta.8

## 1.7.0-beta.7

### 补丁变更

- 已更新依赖项 [[`4fe730a`](https://github.com/better-auth/better-auth/commit/4fe730a9c12f2ff68ca84523817b550adc7b2982)、[`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3)、[`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0)]：
  - @better-auth/oauth-provider@1.7.0-beta.7
  - better-auth@1.7.0-beta.7
  - @better-auth/core@1.7.0-beta.7

## 1.7.0-beta.6

### 补丁变更

- 已更新依赖项 [[`b36c38f`](https://github.com/better-auth/better-auth/commit/b36c38f9842d3416689340552989449a32007819), [`73541c1`](https://github.com/better-auth/better-auth/commit/73541c119041113b1909fe244ff4b8210618b5b5), [`bf39cbf`](https://github.com/better-auth/better-auth/commit/bf39cbf13f3b934f728cde72b1e7ebdc4c85f641), [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222), [`2fd3d58`](https://github.com/better-auth/better-auth/commit/2fd3d5850006d164317d4f53a81ac95f2d1f549a), [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9), [`050ef2d`](https://github.com/better-auth/better-auth/commit/050ef2dfcf22429135b49804de195f945f59f3c1), [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627), [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734), [`0143d69`](https://github.com/better-auth/better-auth/commit/0143d69195870ea6550a40add8618361dbbc3b8f), [`652fa53`](https://github.com/better-auth/better-auth/commit/652fa53e4912837fe234651e7c7705fb35abe188), [`6fe9faa`](https://github.com/better-auth/better-auth/commit/6fe9faab65eb640dbe9bb762954a068586e8661c), [`ad35ead`](https://github.com/better-auth/better-auth/commit/ad35eadd130162565a1b93c27f3a66910dca0b0e), [`6d97c47`](https://github.com/better-auth/better-auth/commit/6d97c4754c80010524b922c39b28a7afd4012457)]：
  - better-auth@1.7.0-beta.6
  - @better-auth/oauth-provider@1.7.0-beta.6
  - @better-auth/core@1.7.0-beta.6

## 1.7.0-beta.5

### 补丁更改

- 已更新依赖项 [[`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5), [`e014029`](https://github.com/better-auth/better-auth/commit/e0140297a59ddb59cccbcb4ba46c513de8cb86a7), [`ec8a38c`](https://github.com/better-auth/better-auth/commit/ec8a38c08f5cfe2d922be0f8a49f2d0fa84de799), [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2), [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f), [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f), [`0e1770a`](https://github.com/better-auth/better-auth/commit/0e1770ac7563a27b1daab96d5d571657b3a45f75), [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b), [`3e852a2`](https://github.com/better-auth/better-auth/commit/3e852a26500446b2c4ad608933c71b616ceddba5), [`76a3342`](https://github.com/better-auth/better-auth/commit/76a33429fc2a3edcc85307bf81b9d92a95f9de6c), [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f)]：
  - better-auth@1.7.0-beta.5
  - @better-auth/oauth-provider@1.7.0-beta.5
  - @better-auth/core@1.7.0-beta.5

## 1.7.0-beta.4

### 补丁更改

- 已更新依赖项 [[`b4b0867`](https://github.com/better-auth/better-auth/commit/b4b086722c2da179f885ad2680e10ed3410ad849), [`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8), [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2), [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a), [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - @better-auth/oauth-provider@1.7.0-beta.4
  - better-auth@1.7.0-beta.4
  - @better-auth/core@1.7.0-beta.4

## 1.7.0-beta.3

### 补丁更改

- 已更新依赖项 [[`4e8e4c7`](https://github.com/better-auth/better-auth/commit/4e8e4c7fc5fb2723144cbf41c4a1bfa28de8d671), [`523f95c`](https://github.com/better-auth/better-auth/commit/523f95c10db24b790bbd75fe85c86c34d3465267), [`729c00d`](https://github.com/better-auth/better-auth/commit/729c00d74c94f558893da1e3a9ee86451d1b23da)]：
  - better-auth@1.7.0-beta.3
  - @better-auth/oauth-provider@1.7.0-beta.3
  - @better-auth/core@1.7.0-beta.3

## 1.7.0-beta.2

### 补丁更改

- 已更新依赖项 [[`5c6de4e`](https://github.com/better-auth/better-auth/commit/5c6de4ed265e7aa30e7e42a0e493386cf3ad6c96), [`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4), [`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09), [`954b664`](https://github.com/better-auth/better-auth/commit/954b664f4f251f8dd028451dab3ab43067dbf890), [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - @better-auth/oauth-provider@1.7.0-beta.2
  - better-auth@1.7.0-beta.2
  - @better-auth/core@1.7.0-beta.2
