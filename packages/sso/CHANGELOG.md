# @better-auth/sso

## 1.7.6

## 1.7.5

## 1.7.4

## 1.7.3

### 补丁变更

- [#11153](https://github.com/better-auth/better-auth/pull/11153) [`2220ee7`](https://github.com/better-auth/better-auth/commit/2220ee726934de3aa128d5b4114391be8e9570cc) 感谢 [@bytaesu](https://github.com/bytaesu)！- 通过使用 `(providerId, accountId)` 标识账户，并移除 1.7.0 中引入的 `issuer` 要求，恢复与 1.6 数据库的登录兼容性。从 1.6 升级不再需要账户架构迁移。重复的账户键会被拒绝，而不是随机选择某个账户

  如果你应用了 1.7.0 到 1.7.2 的账户架构，请在升级前移除其 issuer 唯一索引。对于 SQL 数据库，还需使 `issuer` 可为空或移除该列，以便注册和账户关联能够成功。`auth migrate` 不会执行此清理。请按照[升级指南](https://www.better-auth.com/docs/guides/1-7-upgrade-guide)中的数据库特定步骤操作

## 1.7.2

### 补丁变更

- [#10979](https://github.com/better-auth/better-auth/pull/10979) [`fced1a5`](https://github.com/better-auth/better-auth/commit/fced1a5d360c14e6358f88dedc9014ff862873f1) 感谢 [@bytaesu](https://github.com/bytaesu)！- 允许相对回调和重定向 URL 使用标准的路径、查询和片段语法，同时保留开放重定向保护

## 1.7.1

## 1.7.0

### 次要变更

- [#8805](https://github.com/better-auth/better-auth/pull/8805) [`602ec40`](https://github.com/better-auth/better-auth/commit/602ec40293dc141eab134ddb53ab34b44e11d103) 感谢 [@OscarCornish](https://github.com/OscarCornish)！- **滚动式证书轮换**

  SAML 签名证书现在接受 PEM 字符串数组，因此管理员可以在旧 IdP 证书仍有效时发布新证书，并完成轮换，而无需强制所有活动会话重新进行身份验证。由列表中任一证书签名的响应都会被接受

  ```ts
  samlConfig: {
      idpMetadata: {
          cert: [currentPem, nextPem],
      },
  }
  ```

  `samlConfig.cert` 和 `samlConfig.idpMetadata.cert` 都接受单个 PEM 字符串或数组。当两者同时设置时，`idpMetadata.cert` 优先

  **破坏性变更：响应结构**

  管理端点（`getSSOProvider`、`listSSOProviders`、`updateSSOProvider`）现在在所有情况下都将 `samlConfig.certificate` 返回为解析后的证书数组，即使只配置了一个证书也是如此。只有当证书位于 `idpMetadata.metadata` 中时，该字段才会缺失。请将使用方更新为读取数组；不再需要 `Array.isArray` 分支

  **验证**

  注册现在会拒绝未提供签名证书来源的 SAML 配置。samlify 需要 `idpMetadata.metadata` XML 文档（其中嵌入证书），或在 `cert` 或 `idpMetadata.cert` 下提供显式 PEM。两者都缺失的配置会失败并返回 `CERT_SOURCE_MISSING`

  **修复**

  SAML 单点注销可能无法解密加密的 `LogoutResponse` 负载，因为该代码路径构造 IdP 实体时没有设置 `privateKey`、`encPrivateKey` 或 `encPrivateKeyPass`。现在每次构造 IdP 时都会应用这三个字段

- [#10403](https://github.com/better-auth/better-auth/pull/10403) [`dbd302e`](https://github.com/better-auth/better-auth/commit/dbd302e422c66620cde391f6a80ab90ee34182f9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 按受信任的 issuer 而不是 provider 配置限定账户身份。账户现在使用唯一的 `(issuer, accountId)` 键，因此同一 OpenID Connect issuer 的别名会去重为一个外部身份，而不同 issuer 的相同 subject 仍保持独立。这种身份去重不会为别名引入独立的授权或 provider 生命周期记录

  此版本要求 `Account.issuer`，但保留 `Account.accountId` 作为 provider 分配的账户标识符。账户专用 API 通过 `accountId` 请求属性选择本地的 `Account.id`；令牌和 provider profile API 则可以通过 `useAccountCookie: true` 选择已签名的账户 cookie。凭据账户使用 `local:credential` 和关联用户稳定的 `id` 作为其 provider 身份

  OAuth provider 身份现在来自原始的已验证 profile。OpenID Connect discovery 使用 `sub`，普通 OAuth 使用 `id`，provider 可以通过 `accountSubject` 声明另一个不可变字段；Better Auth 不再在运行时在 `sub` 和 `id` 之间切换。`getUserInfo().user` 不再携带 provider 身份，`mapProfileToUser` 也不能返回 `id`。请从 `accountInfo.account.accountId` 读取选定的身份，而不是从 `accountInfo.user.id` 读取。通用的 `microsoftEntraId` helper 现在要求具体的租户 GUID；对于多租户 authority，请使用内置的 Microsoft provider

  SSO 账户 subject 现在由协议定义。OIDC 使用已验证的 `sub` claim，SAML 使用已签名的 `NameID`；两个配置中的 `mapping.id` 均已移除。不带 metadata XML 的手动 SAML 配置必须设置 `idpMetadata.entityID`，因为 `samlConfig.issuer` 标识 service provider，不再充当 IdP 身份

  在部署前，请按照 Better Auth 1.7 升级指南应用经过审核的账户身份回填。生成的架构迁移无法自动分配受信任的 issuer 或解决现有身份冲突

- [#9305](https://github.com/better-auth/better-auth/pull/9305) [`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth)：在 `signIn.social`、`linkSocial` 和 `signIn.sso` 之间提供按请求设置的 `additionalParams` 和 `loginHint` 对等支持

  用于按请求自定义 provider authorization URL 的统一扩展点。此前，Google 的 `access_type=offline` / `prompt=consent`、Cognito 的 `identity_provider=Google` 或 Microsoft 的 `domain_hint` 等动态参数，只能在服务器静态配置中设置

  ### 新功能
  - `signIn.social`、`linkSocial` 和 `signIn.sso` 接受 `additionalParams: Record<string, string>`。值会作为查询参数追加到 authorization URL
  - `linkSocial` 也接受 `loginHint`，与 `signIn.social` 和 `signIn.sso` 的接口保持一致
  - `OAuthProvider.createAuthorizationURL` 的输入契约新增 `additionalParams`；每个内置 provider 都会将其传递给共享 helper
  - 通用 OAuth provider 会将调用时的 `additionalParams` 与配置级别的 `authorizationUrlParams` 合并；发生键冲突时以调用时的值为准
  - Cognito 提供类型化的 `identityProvider?: string` 配置选项，将其映射到 `identity_provider` 查询参数，从而避免使用魔法字符串

  ### 安全性
  - 共享的 `createAuthorizationURL` helper 会静默丢弃调用方提供的、位于 `RESERVED_AUTHORIZATION_PARAMS` 中的任何键（`state`、`client_id`、`redirect_uri`、`response_type`、`code_challenge`、`code_challenge_method`、`nonce`、`scope`）。请求体 Zod schema 会以 400 拒绝相同的键，因此误用会在边缘处显式暴露，而不是静默覆盖关键安全参数。`nonce` 被保留，因此调用方无法替换 Better Auth 在将 discovery provider 的 `id_token` 绑定到 authorization request 时生成的 OIDC nonce
  - 使用非标准 client identifier 的 provider（`wechat` → `appid`、`tiktok` → `client_key`）还会额外过滤这些键，以防调用方替换已配置的 OAuth app
  - 集成正常运行所必需的 provider 协议常量（`atlassian` → `audience`、`notion` → `owner`）会最后合并，因此调用方提供的 `additionalParams` 无法覆盖它们。代表操作员意图的已配置默认值（例如 Google 的 `include_granted_scopes`、Cognito 的 `identityProvider`）仍可被调用方覆盖
  - 当解析出的 provider 为 SAML 时，`signIn.sso` 会以 400 拒绝 `additionalParams`；SAML AuthnRequest 已签名，无法携带调用方提供的查询参数，因此静默丢弃这些参数会误导集成方

  ### OpenAPI
  - 为 OpenAPI generator 添加 `ZodRecord` 处理，使 `z.record()` 字段生成带类型化 `additionalProperties` 的 `type: object`。同时修复了一个长期存在的问题：`additionalData` 曾被渲染为 `type: string`

  ### 重构
  - `discord`、`roblox`、`zoom` 和 `slack` provider 现在委托给共享的 `createAuthorizationURL` helper，并继承其 RFC 行为和保留键保护
  - `tiktok` 和 `wechat` 保留手动 URL 构造（因为存在非标准 OAuth2 参数名称和 URL fragment 要求），但使用相同的保留键过滤器传递 `additionalParams`

  关闭 [#2351](https://github.com/better-auth/better-auth/issues/2351)  
  关闭 [#5441](https://github.com/better-auth/better-auth/issues/5441)  
  关闭 [#5592](https://github.com/better-auth/better-auth/issues/5592)  
  关闭 [#5604](https://github.com/better-auth/better-auth/issues/5604)  
  取代 [#4992](https://github.com/better-auth/better-auth/issues/4992) 和 [#5443](https://github.com/better-auth/better-auth/issues/5443)

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为整个技术栈中向 token endpoint 发起的请求添加 client authentication 配置，包括 `private_key_jwt`（RFC 7523）

  通用 OAuth provider 现在接受用于 token endpoint client authentication 的 `tokenEndpointAuth`。使用 `tokenEndpointAuth: { method: "private_key_jwt", getClientAssertion }` 进行 JWT client assertion，使用 `{ method: "none" }` 进行 public client，或使用 `{ method: "client_secret_basic" }`、`{ method: "client_secret_post" }` 配合 `clientSecret` 进行显式的基于 secret 的 client authentication。现有的 `authentication: "basic" | "post"` 选项仍可用于基于 secret 的 token request

  使用 `createPrivateKeyJwtClientAssertionGetter()` 从 private key 对 RFC 7523 assertion 进行签名。assertion getter 接收 `{ clientId, tokenEndpoint, grantType }`，因此集成不必在 assertion helper 中重复 client ID 或 token endpoint 值。Core OAuth2 现在导出 private-key JWT 专用 helper 和类型：`signPrivateKeyJwtClientAssertion`、`createPrivateKeyJwtClientAssertionGetter`、`PrivateKeyJwtSigningAlgorithm` 和 `PRIVATE_KEY_JWT_SIGNING_ALGORITHMS`

  token endpoint client authentication 参数由 `clientId`、`clientSecret` 和 `tokenEndpointAuth` 派生。已配置的 token endpoint authentication 要求 `clientId`；基于 secret 的 token endpoint authentication 还要求 `clientSecret`。自定义 token 参数用于 provider 特定字段，不会替代已配置的 client authentication 值

  `refreshAccessToken()` 现在会将 `resource` 值传递给 refresh-token request，因此 RFC 8707 resource indicator 可通过高级 refresh helper 和 `refreshAccessTokenRequest()` 使用

  同步 OAuth2 request builder `createAuthorizationCodeRequest`、`createRefreshAccessTokenRequest` 和 `createClientCredentialsTokenRequest` 已移除。请改用异步的 `authorizationCodeRequest`、`refreshAccessTokenRequest` 和 `clientCredentialsTokenRequest` helper

  Server 会验证使用非对称密钥签名的 JWT client assertion，client 可以对 authorization code、refresh 和 client credentials token request 使用相同的 token endpoint authentication 契约

- [#9055](https://github.com/better-auth/better-auth/pull/9055) [`b790144`](https://github.com/better-auth/better-auth/commit/b790144a2e969f1f423c1226147edfb4e69664d1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- IdP 发起的 SSO 现在默认禁用；设置 `saml.allowIdpInitiated: true` 可启用。SP 发起的流程现在会正确验证 `InResponseTo`，SAML 单点注销会存储并比较实际的 `SessionIndex` 字符串

- [#10473](https://github.com/better-auth/better-auth/pull/10473) [`ed61b47`](https://github.com/better-auth/better-auth/commit/ed61b4798e0ccedadc3b0c0e0a2d08b5d4b7ed5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加事务性 OIDC 用户解析，使应用能够将已验证的 issuer 和 subject 对关联到准确的现有用户，同时保留或更新本地 profile

- [#9445](https://github.com/better-auth/better-auth/pull/9445) [`48070ad`](https://github.com/better-auth/better-auth/commit/48070ada8baf9f29dba4424099d34a98ea59b3d9) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 添加 `schema.ssoProvider.additionalFields` 支持，以存储和返回自定义 SSO provider 字段

- [#9117](https://github.com/better-auth/better-auth/pull/9117) [`b70f025`](https://github.com/better-auth/better-auth/commit/b70f025bfaad38c229305a25e87e08bc176f9503) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- ### 破坏性变更：SAML 配置变更

  **`callbackUrl` 不再配置 ACS URL**
  默认 ACS URL 由 `baseURL` 和 `providerId` 派生。使用 `callbackUrl`
  作为 provider 级别的认证后重定向，或为 SP 发起的 request
  将 `callbackURL` 传递给 `signIn.sso()`：

  ```ts
  await authClient.signIn.sso({
    providerId: "my-provider",
    callbackURL: "/dashboard",
  });
  ```

  **已移除 `/sso/saml2/callback/:providerId` endpoint**
  将 IdP 的 ACS URL 更新为 `/sso/saml2/sp/acs/:providerId`。该 endpoint 同时处理 GET 和 POST request

  **`spMetadata` 现在是可选的**
  注册 provider 时不再需要传递 `spMetadata: {}`。SP metadata 会根据你的配置自动生成

  **从 `SAMLConfig` 中移除未使用的字段：**
  `decryptionPvk`、`additionalParams`、`idpMetadata.entityURL`、`idpMetadata.redirectURL`。这些字段会被存储但从未读取。如果配置中存在，请移除它们

  ### Bug 修复
  - 修复 SLO `SessionIndex` 匹配：带有 `SessionIndex` 的 LogoutRequest 会静默失败，无法删除正确的 session
  - 当未配置 `audience` 时，audience 验证现在默认使用 SP entity ID，符合 SAML Core 第 2.5.1 节
  - 在 AuthnRequest 中恢复 `AllowCreate`，某些使用 JIT provisioning 的 IdP 需要该字段
  - SP metadata endpoint 现在会反映实际的 SP 能力（加密、签名、SLO）

- [#10621](https://github.com/better-auth/better-auth/pull/10621) [`59c4c83`](https://github.com/better-auth/better-auth/commit/59c4c832fc4eed813e98b5b2c45a91cf2d4ad9e7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将 `resolveUser` 扩展到 SAML sign-in。现在 callback 会接收一个带判别的 `protocol` 字段：OIDC input 保留 `verifiedIdTokenClaims` 和 `providerClaims`，而 SAML input 携带已验证 assertion 的 `providerAttributes`。两种变体都包含 `providerReference`，这是对已接受 provider 配置的不透明引用，用于检测 provider 替换或流程中途的配置变更

  添加 `guardProviderMutation`，该 callback 用于在 Better Auth 应用更新和删除持久化的 SSO provider 之前授权这些操作

### 补丁变更

- [#9930](https://github.com/better-auth/better-auth/pull/9930) [`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 Expo 和其他应用内浏览器中，OAuth 回调不返回会话 Cookie 时，社交登录和通用 OAuth 登录后现在也能关联匿名账户。`onLinkAccount` 会触发，匿名用户也会完成迁移；此前，这一过程会被静默跳过。

  插件现在可以通过新的 `addOAuthServerContext` API，在 OAuth 重定向过程中携带服务器信任的数据，并可在回调中通过 `getOAuthState().serverContext` 读取。与 `additionalData` 不同，这些数据无法通过请求体设置，因此适合存放服务器必须信任的值。

  对于 `@better-auth/oauth-provider`，登录后的授权查询现在通过这个仅限服务器的通道传递，因此无法再通过 `additionalData` 注入。

- [#9301](https://github.com/better-auth/better-auth/pull/9301) [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 `GenericOAuthConfig` 和 SSO `OIDCConfig` 中添加 `allowIdpInitiated`，以支持不带 `state` 参数发起 OAuth 的提供商（例如 Clever）。启用后，无状态回调会在服务器端使用新的 state 和 PKCE 重新启动 OAuth 流程，同时保留 CSRF 防护。还增强了 `parseState`，使其能够处理 GET 回调中未定义的请求体。

- [#9657](https://github.com/better-auth/better-auth/pull/9657) [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 加强 `private_key_jwt` 和令牌端点客户端身份验证，并添加使修复在结构上成立的辅助函数。

  `@better-auth/core/oauth2` 现在公开了 `encodeBasicCredentials` 和 `decodeBasicCredentials`，这对经过往返测试的辅助函数遵循 RFC 6749 §2.3.1（对每个值使用 `application/x-www-form-urlencoded` 编码，且仅在第一个 `:` 处分割）。解码器对方案名称不区分大小写，并按照 RFC 7235 §2.1 接受凭据前的一个或多个空格。客户端上的 `client_secret_basic` 和服务器端的 Better Auth OAuth 提供商都会使用这些辅助函数，因此包含保留字符的凭据可以在整个技术栈中正确往返，且 `basic xxx` 或 `Basic  xxx` 这类请求头也会被接受。

  `createPrivateKeyJwtClientAssertionGetter` 会立即验证选项。不支持的算法（`HS256`、`none`）、不包含密钥材料的 JWK，以及显式 `algorithm` 与 JWK 中嵌入的 `alg` 不一致，都会在构造时抛出错误，而不是等到首次令牌请求时才报错。`signPrivateKeyJwtClientAssertion` 也会对直接调用者执行相同检查。**破坏性变更：**以前，配置中如果 JWK `alg` 不受支持但显式 `algorithm` 不同，会静默使用显式选项进行签名；现在会在构造时失败。

  **破坏性变更：**`@better-auth/oauth-provider` 仅接受 RFC 7517 JWK Set 对象格式的客户端 `jwks` 元数据，且其中必须包含非空的 `keys` 数组。在 DCR 载荷、管理和用户端客户端创建、Client ID Metadata Documents、测试固件以及生成的客户端代码中，将 `jwks: [key]` 替换为 `jwks: { keys: [key] }`。远程获取的 `jwks_uri` 响应也必须使用相同的对象格式。EC 密钥必须使用 P-256、P-384 或 P-521；OKP 密钥必须使用 Ed25519。当密钥声明了 `alg` 时，该算法必须是受支持的 `private_key_jwt` 算法，并且必须与密钥类型和曲线匹配；如果客户端在其断言头中选择算法，则应省略 `alg`。此前通过 `oauthToSchema` 写入的 OAuth 客户端行已经以 JWK Set 对象的形式存储，因此这是请求、配置和类型迁移，而非再次进行数据库重写；请单独审查在 Better Auth 之外写入的记录。

  如果 `resolvePrivateKey` 回调未返回 `privateKeyJwk` 或 `privateKeyPem`，SSO `private_key_jwt` 流程现在会重定向并返回 `error_description=no_private_key_available`。此前，只有完全没有配置解析器时，重定向路径才会提前结束；解析器返回空值时会继续执行并导致内部签名错误。

  `better-auth/test` 新增了 `getHttpTestInstance`，作为 `getTestInstance` 的对应工具，它会在操作系统分配的端口上绑定真实 HTTP 监听器，并使用检测到的 URL 构建 auth 实例。它解决了各测试文件一直各自复制粘贴的“临时服务器再重新绑定”竞态问题。

- [#9864](https://github.com/better-auth/better-auth/pull/9864) [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 添加 `user.validateUserInfo` 配置门，使应用能够在创建用户或关联新账户之前拒绝某个身份。对于所有会创建用户的方法（OAuth、SSO/SAML、电子邮件/密码、魔法链接、电子邮件 OTP、匿名、SIWE、电话号码、管理员创建的用户和 SCIM），它都会在创建步骤执行一次，包括没有持久化数据库的无状态配置。

  当现有 OAuth 或 SSO 用户再次登录（`source.action` 为 `"sign-in"`）时，也会重新运行该配置门，并接收提供商提供的最新电子邮件和个人资料，使域名或组织策略可以拒绝提供商身份已超出范围的用户。非提供商的回访登录不会重新验证。

  回调会接收映射后的 `user`，以及描述 `action`（`create-user`、`link-account` 或 `sign-in`）、`method` 和提供商元数据的 `source`：OAuth 提供商的元数据位于 `source.oauth`，OIDC/SAML SSO 提供商的元数据位于 `source.sso`。返回 `{ error, errorDescription }` 即可拒绝：浏览器流程会重定向到错误 URL，程序化流程则返回 `403`。

- [#10072](https://github.com/better-auth/better-auth/pull/10072) [`4475f4a`](https://github.com/better-auth/better-auth/commit/4475f4a39b654f2ab7da90abd9222748ba51e3fe) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 启用 discovery 后，OIDC SSO 现在可以在 Cloudflare Workers 上运行。会重定向的 OIDC discovery、token、userinfo 和 JWKS 端点会被拒绝，并返回明确的配置错误；请改为配置最终端点 URL。

- [#10621](https://github.com/better-auth/better-auth/pull/10621) [`59c4c83`](https://github.com/better-auth/better-auth/commit/59c4c832fc4eed813e98b5b2c45a91cf2d4ad9e7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 直接验证 SAML 断言签名，而不是信任已解析的响应；同时对 SP 元数据实施签名策略和大小限制，与现有的 IdP 元数据限制一致。现在，`wantAssertionsSigned` 控制 SP 是否要求断言签名，而不是响应消息签名，这与 IdP 在实践中签署 SAML 响应的方式相符。

  现在，提供 RelayState 的 SAML 回调会无条件验证该值；即使禁用了 `enableInResponseToValidation`，格式错误或已过期的值也会被拒绝。ACS 位置包含 URL 片段的 Service Provider 元数据会被拒绝。

  在 SAML 和 OIDC 解析失败时，从日志输出中删去提供商声明和解析器抛出的错误。

- [#10592](https://github.com/better-auth/better-auth/pull/10592) [`26b1949`](https://github.com/better-auth/better-auth/commit/26b194960fe539d2189cb1b7554c16d9f5318906) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许 SSO 提供商注册复用 SCIM 连接 ID。SCIM 连接不再属于身份验证提供商命名空间。

- [#9121](https://github.com/better-auth/better-auth/pull/9121) [`9603043`](https://github.com/better-auth/better-auth/commit/960304354aebab2f03c0fadd0d7bfd02febfd246) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- ### 安全性：将 samlify 升级到 2.12.0

  将 SAML XML 处理库从 2.10.2 升级到 2.12.0：
  - **XPath 注入防护**：所有 XPath 表达式现在都使用值转义，而非字符串插值
  - **XXE 防护**：XML 解析器默认采用严格模式，拒绝实体引用
  - **减少依赖**：移除 `node-forge`、`pako`、`uuid` 和 `camelcase`，改用 Node 内置模块

  带有前导空白的 PEM 密钥和证书现在会在传递给 samlify 之前自动规范化。这可以避免从缩进的配置文件或环境变量复制密钥时出现 `DECODER routines::unsupported` 错误。

  要求 Node 20+

## 1.7.0-rc.6

## 1.7.0-rc.5

## 1.7.0-rc.4

## 1.7.0-rc.3

### 次要变更

- [#10621](https://github.com/better-auth/better-auth/pull/10621) [`59c4c83`](https://github.com/better-auth/better-auth/commit/59c4c832fc4eed813e98b5b2c45a91cf2d4ad9e7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将 `resolveUser` 扩展到 SAML 登录。回调现在会接收一个带判别字段 `protocol` 的对象：OIDC 输入仍包含 `verifiedIdTokenClaims` 和 `providerClaims`，而 SAML 输入则包含经过验证的断言中的 `providerAttributes`。两个变体都包含 `providerReference`，这是对已接受提供商配置的不透明引用，用于检测流程中途发生的提供商替换或配置变更。

  新增 `guardProviderMutation` 回调，用于在 Better Auth 应用对已持久化 SSO 提供商的更新和删除操作前进行授权。

### 补丁变更

- [#10621](https://github.com/better-auth/better-auth/pull/10621) [`59c4c83`](https://github.com/better-auth/better-auth/commit/59c4c832fc4eed813e98b5b2c45a91cf2d4ad9e7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 直接验证 SAML 断言签名，而不是信任已解析的响应；同时对 SP 元数据实施签名策略和大小限制，与现有的 IdP 元数据限制一致。现在，`wantAssertionsSigned` 控制 SP 是否要求断言签名，而不是响应消息签名，这与 IdP 在实践中签署 SAML 响应的方式相符。

  现在，提供 RelayState 的 SAML 回调会无条件验证该值；即使禁用了 `enableInResponseToValidation`，格式错误或已过期的值也会被拒绝。ACS 位置包含 URL 片段的 Service Provider 元数据会被拒绝。

  在 SAML 和 OIDC 解析失败时，从日志输出中删去提供商声明和解析器抛出的错误。

- [#10592](https://github.com/better-auth/better-auth/pull/10592) [`26b1949`](https://github.com/better-auth/better-auth/commit/26b194960fe539d2189cb1b7554c16d9f5318906) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许 SSO 提供商注册复用 SCIM 连接 ID。SCIM 连接不再属于身份验证提供商命名空间。

## 1.7.0-rc.2

### 次要变更

- [#10403](https://github.com/better-auth/better-auth/pull/10403) [`dbd302e`](https://github.com/better-auth/better-auth/commit/dbd302e422c66620cde391f6a80ab90ee34182f9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 根据受信任的 issuer（签发方）而非提供商配置限定账户身份。账户现在使用唯一的 `(issuer, providerAccountId)` 键，因此，同一个 OpenID Connect issuer 的别名会对同一外部身份去重，而不同 issuer 中相同的 subject 会保持独立。此身份去重不会为别名引入独立的授权或提供商生命周期记录。

  此版本包含破坏性变更。`Account.accountId` 重命名为 `Account.providerAccountId`，且 `Account.issuer` 变为必填项。账户专属 API 通过 `accountId` 选择本地 `Account.id`；令牌和提供商资料 API 则可以通过 `useAccountCookie: true` 选择已签名的账户 Cookie。凭据账户使用 `local:credential`，并将已关联用户的稳定 `id` 作为其提供商身份。

  OAuth 提供商身份现在来自原始且经过验证的资料。OpenID Connect discovery 使用 `sub`，普通 OAuth 使用 `id`，提供商可以通过 `accountSubject` 声明另一个不可变字段；Better Auth 不再在运行时于 `sub` 和 `id` 之间切换。`getUserInfo().user` 不再包含提供商身份，`mapProfileToUser` 也不能返回 `id`。请从 `accountInfo.account.providerAccountId` 而非 `accountInfo.user.id` 读取所选身份。通用 `microsoftEntraId` 辅助函数现在要求提供具体的租户 GUID；对于多租户 authority，请使用内置的 Microsoft 提供商。

  SSO 账户 subject 现在由协议定义。OIDC 使用经过验证的 `sub` 声明，SAML 使用已签名的 `NameID`；两种配置中的 `mapping.id` 均已移除。没有元数据 XML 的手动 SAML 配置必须设置 `idpMetadata.entityID`，因为 `samlConfig.issuer` 用于标识服务提供商，不再用于标识 IdP。

  部署前，请按照 Better Auth 1.7 升级指南应用经过审核的账户身份回填。生成的 schema 迁移无法自动分配受信任的 issuer，也无法自动解决现有身份冲突。

- [#10473](https://github.com/better-auth/better-auth/pull/10473) [`ed61b47`](https://github.com/better-auth/better-auth/commit/ed61b4798e0ccedadc3b0c0e0a2d08b5d4b7ed5a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 新增事务性 OIDC 用户解析，使应用能够将经过验证的 issuer 和 subject 配对关联到确切的现有用户，同时保留或更新本地资料。

## 1.7.0-rc.1

## 1.7.0-rc.0

## 1.7.0-beta.10

## 1.7.0-beta.9

### 补丁变更

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

- 已更新依赖项 [[`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3), [`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0)]：
  - better-auth@1.7.0-beta.7
  - @better-auth/core@1.7.0-beta.7

## 1.7.0-beta.6

### 次要变更

- [#9445](https://github.com/better-auth/better-auth/pull/9445) [`48070ad`](https://github.com/better-auth/better-auth/commit/48070ada8baf9f29dba4424099d34a98ea59b3d9) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 添加 `schema.ssoProvider.additionalFields` 支持，以存储并返回自定义 SSO 提供商字段。

### 补丁变更

- [#10072](https://github.com/better-auth/better-auth/pull/10072) [`4475f4a`](https://github.com/better-auth/better-auth/commit/4475f4a39b654f2ab7da90abd9222748ba51e3fe) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 启用 discovery 后，OIDC SSO 现在可以在 Cloudflare Workers 上运行。会重定向的 OIDC discovery、token、userinfo 和 JWKS 端点会被拒绝，并返回明确的配置错误；请改为配置最终端点 URL。

- 已更新依赖项 [[`b36c38f`](https://github.com/better-auth/better-auth/commit/b36c38f9842d3416689340552989449a32007819), [`73541c1`](https://github.com/better-auth/better-auth/commit/73541c119041113b1909fe244ff4b8210618b5b5), [`bf39cbf`](https://github.com/better-auth/better-auth/commit/bf39cbf13f3b934f728cde72b1e7ebdc4c85f641), [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222), [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9), [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627), [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734), [`652fa53`](https://github.com/better-auth/better-auth/commit/652fa53e4912837fe234651e7c7705fb35abe188), [`6fe9faa`](https://github.com/better-auth/better-auth/commit/6fe9faab65eb640dbe9bb762954a068586e8661c), [`ad35ead`](https://github.com/better-auth/better-auth/commit/ad35eadd130162565a1b93c27f3a66910dca0b0e)]：
  - better-auth@1.7.0-beta.6
  - @better-auth/core@1.7.0-beta.6

## 1.7.0-beta.5

### 补丁变更

- [#9930](https://github.com/better-auth/better-auth/pull/9930) [`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 Expo 和其他应用内浏览器中，社交和通用 OAuth 登录后现在可以关联匿名账户，即使 OAuth 回调没有返回会话 Cookie 也能正常工作。`onLinkAccount` 会触发，匿名用户也会迁移；之前这一步会被静默跳过。

  插件现在可以使用新的 `addOAuthServerContext` API，在 OAuth 重定向过程中携带服务器信任的数据，并在回调中通过 `getOAuthState().serverContext` 读取。与 `additionalData` 不同，它无法从请求正文设置，因此适合存放服务器必须信任的值。

  对于 `@better-auth/oauth-provider`，登录后的授权查询现在通过此服务器专用通道传递，因此无法再通过 `additionalData` 注入。

- [#9864](https://github.com/better-auth/better-auth/pull/9864) [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 新增 `user.validateUserInfo` 配置关卡，使应用能够在创建用户或关联新账户之前拒绝某个身份。对于所有会创建用户的方法（OAuth、SSO/SAML、邮箱/密码、魔法链接、邮箱 OTP、匿名、SIWE、电话号码、管理员创建用户以及 SCIM），该关卡都会在创建步骤运行一次，包括没有持久化数据库的无状态设置。

  当现有 OAuth 或 SSO 用户再次登录时，它也会重新运行（`source.action` 为 `"sign-in"`），此时会收到最新的提供商邮箱和个人资料，以便域名或组织策略拒绝提供商身份超出许可范围的用户。非提供商的回访登录不会重新验证。

  回调接收映射后的 `user`，以及描述 `action`（`create-user`、`link-account` 或 `sign-in`）、`method` 和提供商元数据的 `source`：OAuth 提供商使用 `source.oauth`，OIDC/SAML SSO 提供商使用 `source.sso`。返回 `{ error, errorDescription }` 即可拒绝：浏览器流程会重定向到错误 URL，程序化流程会返回 `403`。

- 已更新依赖项 [[`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5), [`e014029`](https://github.com/better-auth/better-auth/commit/e0140297a59ddb59cccbcb4ba46c513de8cb86a7), [`ec8a38c`](https://github.com/better-auth/better-auth/commit/ec8a38c08f5cfe2d922be0f8a49f2d0fa84de799), [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2), [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f), [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f), [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b), [`76a3342`](https://github.com/better-auth/better-auth/commit/76a33429fc2a3edcc85307bf81b9d92a95f9de6c), [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f)]：
  - better-auth@1.7.0-beta.5
  - @better-auth/core@1.7.0-beta.5

## 1.7.0-beta.4

### 次要变更

- [#8805](https://github.com/better-auth/better-auth/pull/8805) [`602ec40`](https://github.com/better-auth/better-auth/commit/602ec40293dc141eab134ddb53ab34b44e11d103) 感谢 [@OscarCornish](https://github.com/OscarCornish)！- **滚动证书轮换**

  SAML 签名证书现在接受 PEM 字符串数组，因此管理员可以在旧 IdP 证书仍有效时发布新证书，并完成轮换，而无需强制所有活动会话重新进行身份验证。任何列出的证书签署的响应都会被接受。

  ```ts
  samlConfig: {
      idpMetadata: {
          cert: [currentPem, nextPem],
      },
  }
  ```

  `samlConfig.cert` 和 `samlConfig.idpMetadata.cert` 都接受单个 PEM 字符串或数组。如果两者都设置，则以 `idpMetadata.cert` 为准。

  **破坏性变更：响应结构**

  管理端点（`getSSOProvider`、`listSSOProviders`、`updateSSOProvider`）现在在所有情况下都会将 `samlConfig.certificate` 作为已解析证书数组返回，即使配置的是单个证书也是如此。仅当证书位于 `idpMetadata.metadata` 中时，该字段才会缺失。请更新使用方以读取数组；不再需要使用 `Array.isArray` 进行分支判断。

  **验证**

  现在，注册时会拒绝未提供签名证书来源的 SAML 配置。samlify 需要 `idpMetadata.metadata` XML 文档（其中包含证书），或在 `cert` 或 `idpMetadata.cert` 下显式提供 PEM。两者都缺少的配置会以 `CERT_SOURCE_MISSING` 失败。

  **修复**

  由于在该代码路径中构造 IdP entity 时没有设置 `privateKey`、`encPrivateKey` 或 `encPrivateKeyPass`，SAML 单点登出可能无法解密加密的 `LogoutResponse` 负载。现在，每次构造 IdP 时都会应用这三项配置。

- [#9305](https://github.com/better-auth/better-auth/pull/9305) [`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- feat(oauth)：在 `signIn.social`、`linkSocial` 和 `signIn.sso` 中实现按请求设置 `additionalParams` 和 `loginHint` 的一致支持

  统一提供按请求自定义提供商授权 URL 的扩展接口。此前，Google 的 `access_type=offline` / `prompt=consent`、Cognito 的 `identity_provider=Google` 或 Microsoft 的 `domain_hint` 等动态参数只能通过静态服务器配置来设置。

  ### 新增功能
  - `signIn.social`、`linkSocial` 和 `signIn.sso` 接受 `additionalParams: Record<string, string>`。这些值会作为查询参数附加到授权 URL。
  - `linkSocial` 也接受 `loginHint`，与 `signIn.social` 和 `signIn.sso` 的接口保持一致。
  - `OAuthProvider.createAuthorizationURL` 的输入契约新增 `additionalParams`；所有内置提供商都会将其传递给共享 helper。
  - 通用 OAuth 提供商会将调用时的 `additionalParams` 与配置级别的 `authorizationUrlParams` 合并；键冲突时以调用时的值为准。
  - Cognito 提供带类型的 `identityProvider?: string` 配置选项，该选项会映射到 `identity_provider` 查询参数，避免使用魔法字符串。

  ### 安全性
  - 共享的 `createAuthorizationURL` helper 会静默丢弃调用方提供的 `RESERVED_AUTHORIZATION_PARAMS` 中的任何键（`state`、`client_id`、`redirect_uri`、`response_type`、`code_challenge`、`code_challenge_method`、`scope`）。请求正文的 Zod schema 也会以 400 拒绝相同的键，因此在边界处就能发现误用，而不会静默覆盖安全关键参数。
  - 使用非标准客户端标识符的提供商（`wechat` → `appid`、`tiktok` → `client_key`）还会过滤这些键，防止调用方替换已配置的 OAuth 应用。
  - 集成正常运行所必需的提供商协议常量（`atlassian` → `audience`、`notion` → `owner`）会在最后合并，因此调用方提供的 `additionalParams` 无法覆盖它们。表示运维人员意图的已配置默认值（例如 Google `include_granted_scopes`、Cognito `identityProvider`）仍可由调用方覆盖。
  - 如果解析出的提供商是 SAML，`signIn.sso` 会以 400 拒绝 `additionalParams`；SAML AuthnRequest 已签名，无法携带调用方提供的查询参数，因此静默丢弃这些参数会误导集成方。

  ### OpenAPI
  - 为 OpenAPI 生成器添加了 `ZodRecord` 处理逻辑，使 `z.record()` 字段生成带类型 `additionalProperties` 的 `type: object`。此外还修复了一个长期存在的问题：`additionalData` 被生成为 `type: string`。

  ### 重构
  - `discord`、`roblox`、`zoom` 和 `slack` 提供商现在委托给共享的 `createAuthorizationURL` helper，并沿用其 RFC 行为和保留键保护。
  - `tiktok` 和 `wechat` 保留手动 URL 构造（因为它们使用非标准 OAuth2 参数名称，并有 URL 片段要求），但会使用相同的保留键过滤器传递 `additionalParams`。

  关闭 [#2351](https://github.com/better-auth/better-auth/issues/2351)。
  关闭 [#5441](https://github.com/better-auth/better-auth/issues/5441)。
  关闭 [#5592](https://github.com/better-auth/better-auth/issues/5592)。
  关闭 [#5604](https://github.com/better-auth/better-auth/issues/5604)。
  取代 [#4992](https://github.com/better-auth/better-auth/issues/4992) 和 [#5443](https://github.com/better-auth/better-auth/issues/5443)。

## 1.6.30

### 补丁变更

- 已更新依赖项 [[`07c1718`](https://github.com/better-auth/better-auth/commit/07c17189f58502bf038e5f22766f8a99df60ac99)]：
  - @better-auth/core@1.6.30
  - better-auth@1.6.30

## 1.6.29

### 补丁变更

- 已更新依赖项 [[`e6e1b4e`](https://github.com/better-auth/better-auth/commit/e6e1b4e8146a84d2a2c5fe2c497c81d03dfc2ad3)]：
  - better-auth@1.6.29
  - @better-auth/core@1.6.29

## 1.6.28

### 补丁变更

- 已更新依赖项 [[`773de54`](https://github.com/better-auth/better-auth/commit/773de54b18c0e920a3542bdecaf8b42fffc0dc4b), [`2ad2928`](https://github.com/better-auth/better-auth/commit/2ad2928f967afa9f9858caecd01466ecb8686982)]：
  - better-auth@1.6.28
  - @better-auth/core@1.6.28

## 1.6.27

### 补丁变更

- [`999acbd`](https://github.com/better-auth/better-auth/commit/999acbd41d4d6bad81b24ce9edef063632ad22bf) 感谢 [@bytaesu](https://github.com/bytaesu)！- 域名验证现在仅适用于请求开始时提供商所持有的域名。如果 DNS 检查仍在运行时提供商发生变更，请求会返回带有 `SSO_PROVIDER_CHANGED` 代码的 `409`，而不是记录结果，这样调用方就可以重新加载提供商并重试。

- [`999acbd`](https://github.com/better-auth/better-auth/commit/999acbd41d4d6bad81b24ce9edef063632ad22bf) 感谢 [@bytaesu](https://github.com/bytaesu)！- 现在，基于邮箱域名自动分配组织要求提供商域名已验证，且存储的用户邮箱已验证，因此社交登录不会再让用户加入一个其 SSO 提供商仅声称拥有该域名的组织。显式绑定组织的 OIDC 和 SAML 配置流程不受影响。

- 已更新依赖项 [[`2ae491e`](https://github.com/better-auth/better-auth/commit/2ae491eac3ece50839a0eb2d4f868c4deedac67b), [`90b5093`](https://github.com/better-auth/better-auth/commit/90b509344794b8064700371cbc04b985d0519839)]：
  - @better-auth/core@1.6.27
  - better-auth@1.6.27

## 1.6.26

### 补丁变更

- 已更新依赖项 [[`9ede805`](https://github.com/better-auth/better-auth/commit/9ede8059b56e1415c1e8cfdd93ff72691b848bbf), [`5a811f1`](https://github.com/better-auth/better-auth/commit/5a811f1b4314b8bcf6f21c0b72de5cb67d552d97), [`d8327f1`](https://github.com/better-auth/better-auth/commit/d8327f1fea92243b6fea1b0ab183e2a989792c0c), [`e2c73fb`](https://github.com/better-auth/better-auth/commit/e2c73fbec87f5e19f6a2b5ac371bc5bba9bd49ff), [`af50c45`](https://github.com/better-auth/better-auth/commit/af50c45553a62cfb6cdcdede86828731ca00c22c), [`701cd43`](https://github.com/better-auth/better-auth/commit/701cd43babac52784d855291a6adc0cf3fba7970), [`a30e274`](https://github.com/better-auth/better-auth/commit/a30e274b5daed6057086d76b91d17abfa02196d7), [`e7b0eba`](https://github.com/better-auth/better-auth/commit/e7b0eba327e050f50764802e21484c6cabb56600), [`2b4a14f`](https://github.com/better-auth/better-auth/commit/2b4a14f180ed2eeb9692d6933064b001f66ec52c), [`7552a3b`](https://github.com/better-auth/better-auth/commit/7552a3b563fe1ae922fb65db12d005c38a12614d), [`ea38fca`](https://github.com/better-auth/better-auth/commit/ea38fcac7435137604e9b3ba2fe149a1848d0eeb), [`a03e4c1`](https://github.com/better-auth/better-auth/commit/a03e4c18677e2dc01a9b47b2a8017b92dbf9ece7)]：
  - better-auth@1.6.26
  - @better-auth/core@1.6.26

## 1.6.25

### 补丁变更

- 已更新依赖项 [[`5124c34`](https://github.com/better-auth/better-auth/commit/5124c3487903e96223bb3f54347724bb0204bb95), [`0ffd1fb`](https://github.com/better-auth/better-auth/commit/0ffd1fb28d44a8266d62791cd4c97e263444d03b), [`7439359`](https://github.com/better-auth/better-auth/commit/743935991f9991e8243d6c3d14773b9cfca462e8)]：
  - better-auth@1.6.25
  - @better-auth/core@1.6.25

## 1.6.24

### 补丁变更

- [#10388](https://github.com/better-auth/better-auth/pull/10388) [`c020a9d`](https://github.com/better-auth/better-auth/commit/c020a9d6a2e7782f388363a85fc0748ae8b3b0c9) 感谢 [@ayushman46](https://github.com/ayushman46)！- 在跨源部署中，由 IdP 发起的 SAML 登录现在可以在身份验证或验证错误后，将用户返回到已配置的应用 URL，而不是退回到身份验证服务器。可全局配置 `idpInitiatedCallbackUrl`，也可按提供商单独配置。

- 已更新依赖项 [[`03dc5a0`](https://github.com/better-auth/better-auth/commit/03dc5a046f536994950800ea557b8e2e2e0cdfdd), [`7508940`](https://github.com/better-auth/better-auth/commit/750894037639c4158472cc1d4994b0e07bf1f59a), [`bae7198`](https://github.com/better-auth/better-auth/commit/bae71988ab79aeb4f19f245ceabac9eca8706a50), [`ef4d273`](https://github.com/better-auth/better-auth/commit/ef4d27360cec8a0bc11a94e135ea4a3dd32b1969), [`6758231`](https://github.com/better-auth/better-auth/commit/6758231905d2e86a7b3f058dd05c17ba739aa80f), [`99dbdd7`](https://github.com/better-auth/better-auth/commit/99dbdd7ea98740d11689394220a718dfb9579276), [`086ca91`](https://github.com/better-auth/better-auth/commit/086ca91f51dd8158aff6cbf54c4f9c7ce220914d), [`8f2dedd`](https://github.com/better-auth/better-auth/commit/8f2dedd89301da9fb52c1a64df6a9683f9be55fd), [`4e685ee`](https://github.com/better-auth/better-auth/commit/4e685eef420b5576913b9803b58c7e7ee7342203), [`3bf0e49`](https://github.com/better-auth/better-auth/commit/3bf0e4981e025ba9af684013a27b0102a04f7c56), [`f59a0ee`](https://github.com/better-auth/better-auth/commit/f59a0ee7895a024ddd4c5c387344173888e17be4), [`54fab08`](https://github.com/better-auth/better-auth/commit/54fab084469a27257e66a0814523ebac7145ef5d), [`0f2cc1b`](https://github.com/better-auth/better-auth/commit/0f2cc1b33b77850948dac4d889e5f46bba41e8d5), [`ae78109`](https://github.com/better-auth/better-auth/commit/ae781091186f321b4e4ec9e84f64b6e4d5ea1043), [`46d2bf0`](https://github.com/better-auth/better-auth/commit/46d2bf02c98902da7b344753372d48cfe0e5ebb3), [`29a373e`](https://github.com/better-auth/better-auth/commit/29a373eaf1778820061a9380c29831c2de2ce704), [`f6d18fa`](https://github.com/better-auth/better-auth/commit/f6d18fa8f79b9323e10b50f72e2b1a088844e4bb), [`f23ce50`](https://github.com/better-auth/better-auth/commit/f23ce5012ea47fac1a69b1dad203dfdef3830fd0), [`c4d1dda`](https://github.com/better-auth/better-auth/commit/c4d1ddaa952eab7edfec942fab223f35798518ab)]：
  - better-auth@1.6.24
  - @better-auth/core@1.6.24

## 1.6.23

### 补丁变更

- 已更新依赖项 [[`8581f97`](https://github.com/better-auth/better-auth/commit/8581f97ea0000e03edd6aa7911efabf694a9ff95)]：
  - better-auth@1.6.23
  - @better-auth/core@1.6.23

## 1.6.22

### 补丁变更

- 已更新依赖项 [[`c06a56d`](https://github.com/better-auth/better-auth/commit/c06a56d83a40bbaeac12d3a8b8b67e59f92a9110), [`8bd43d9`](https://github.com/better-auth/better-auth/commit/8bd43d9d8312fd9ddbfb8fb5c827cf0a0e55132d), [`3a035e9`](https://github.com/better-auth/better-auth/commit/3a035e968e27bfdee1e53ad857e5569090d9f2d1)]：
  - better-auth@1.6.22
  - @better-auth/core@1.6.22

## 1.6.21

### 补丁变更

- [#10224](https://github.com/better-auth/better-auth/pull/10224) [`7a7a7b3`](https://github.com/better-auth/better-auth/commit/7a7a7b311aa8f546bd8d3301e1cbd37a9a5a30f1) 感谢 [@Bekacru](https://github.com/Bekacru)！- 删除 SSO 提供商后，不会再遗留关联账户，导致之后使用相同提供商 ID 的提供商可以复用这些账户。

  SSO 和 SCIM 提供商设置现在会拒绝使用了其他账户提供商 ID 的情况。

  账户关联后，SSO 提供商更新现在会拒绝更改定义身份的信息，例如 issuer、登录端点、client ID、SAML 元数据或用户 ID 映射。轮换密钥和更新为相同值仍然可行。

- [#10226](https://github.com/better-auth/better-auth/pull/10226) [`fa1e036`](https://github.com/better-auth/better-auth/commit/fa1e036ae7bd326920e7d797046d966a440f60bd) 感谢 [@Bekacru](https://github.com/Bekacru)！- SAML SSO 现在会拒绝 audience、bearer recipient 或 response destination 与已配置的 Service Provider 不匹配的响应，且不会创建会话。

- [#10225](https://github.com/better-auth/better-auth/pull/10225) [`1a8b7cc`](https://github.com/better-auth/better-auth/commit/1a8b7ccc8397922ec2fb51b10a92a12d58ea65c6) 感谢 [@Bekacru](https://github.com/Bekacru)！- SAML 单点注销现在会拒绝使用非 http(s) 方案的 IdP SLO POST URL，例如 `javascript:` 或 `data:`。

<!-- cspell:ignore fcabaaf -->

- [#10227](https://github.com/better-auth/better-auth/pull/10227) [`fcabaaf`](https://github.com/better-auth/better-auth/commit/fcabaaffcbe48adcbdcaf876a4f8404c6bf640d4) 感谢 [@Bekacru](https://github.com/Bekacru)！- SSO 域验证现在要求对提供商列出的每个域都进行证明。当提供商的 `domain` 包含多个以逗号分隔的域时，必须为每个列出的域发布验证 TXT 记录，提供商才会被标记为已验证。验证器接受与原始验证令牌完全匹配的 TXT 记录（与文档说明的设置流程一致），也接受现有的 `identifier=value` 格式。

- 更新的依赖项 [[`e0762a1`](https://github.com/better-auth/better-auth/commit/e0762a127ce351a96614e60866b3455e6eddffa1), [`882cf9e`](https://github.com/better-auth/better-auth/commit/882cf9e592d1d305b5b78cadbb10aaeee7acd6dc), [`f52e1ab`](https://github.com/better-auth/better-auth/commit/f52e1ab50b60d289b64d6b06f1bff5a4358cdfd0), [`90d509e`](https://github.com/better-auth/better-auth/commit/90d509e0b9f72614170ad7124ae9d3a7a97d7d3a), [`b5bec19`](https://github.com/better-auth/better-auth/commit/b5bec193a56cec2f7b71c84d71dacb632f0b96a0), [`816d7f9`](https://github.com/better-auth/better-auth/commit/816d7f92522518e90d437c2a366d75db56690f86), [`239bcc8`](https://github.com/better-auth/better-auth/commit/239bcc836cf39c4fb409a15333be45134f9e9e65), [`1bc370a`](https://github.com/better-auth/better-auth/commit/1bc370aef5c249e82127cb9d35972101087ecde6), [`570267c`](https://github.com/better-auth/better-auth/commit/570267cd5e782f018933ce3af4f51dbd250bf7de), [`461ca6f`](https://github.com/better-auth/better-auth/commit/461ca6fd2453a2e145fa18a1df543e435e884701), [`88409b0`](https://github.com/better-auth/better-auth/commit/88409b0078c2bfddcc6503031fff333bfa045cd2), [`5953157`](https://github.com/better-auth/better-auth/commit/5953157acf619bcb8233c91952b1e4072202f055), [`b046f9e`](https://github.com/better-auth/better-auth/commit/b046f9ec112b2cf547efea8dc870a4895602c53b), [`ae647b4`](https://github.com/better-auth/better-auth/commit/ae647b4abe5a4d606c326f1ce0ffa2500b5424d1)]：
  - better-auth@1.6.21
  - @better-auth/core@1.6.21

## 1.6.20

### 补丁变更

- 更新的依赖项 [[`21448b1`](https://github.com/better-auth/better-auth/commit/21448b1b77681e71e80ae0728d8658c936c18eb8), [`8ecf238`](https://github.com/better-auth/better-auth/commit/8ecf23817f5e501bdd8ab63ad5fdf2554ff1dff5), [`930f534`](https://github.com/better-auth/better-auth/commit/930f5341d956bf3075f43758392a5c7f50947104)]：
  - better-auth@1.6.20
  - @better-auth/core@1.6.20

## 1.6.19

### 补丁变更

- 更新的依赖项 [[`de4aa52`](https://github.com/better-auth/better-auth/commit/de4aa52e991f0a56786300af3e0d9ac8331f1996), [`b4b0266`](https://github.com/better-auth/better-auth/commit/b4b02660c760fe4c8889d1311a3dbf3165f88d0b), [`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63), [`581f827`](https://github.com/better-auth/better-auth/commit/581f8271fb911cea2ce74810e086709909457cd3), [`8407885`](https://github.com/better-auth/better-auth/commit/840788502a13d6fa4aa4540b930ddb4a99dc1ed6), [`c1a8a64`](https://github.com/better-auth/better-auth/commit/c1a8a64c146fab20c7ad0076ffdf12eff9adc17a), [`635f190`](https://github.com/better-auth/better-auth/commit/635f1908702d0c63cf66b4e5f054e9d527a3c8f7), [`a787e0b`](https://github.com/better-auth/better-auth/commit/a787e0b66b368a1af0b4ba17c9750c2839668246), [`c2f718f`](https://github.com/better-auth/better-auth/commit/c2f718fcdeec0c1767bb8acd5fefdd3810863b0a), [`7d18175`](https://github.com/better-auth/better-auth/commit/7d18175637a0b95a501fde0cf3db080879367a9d)]：
  - better-auth@1.6.19
  - @better-auth/core@1.6.19

## 1.6.18

### 补丁变更

- 更新的依赖项 [[`9ef7240`](https://github.com/better-auth/better-auth/commit/9ef7240fec4a9d8469dd5ed24249949d3400e732), [`b21a5f7`](https://github.com/better-auth/better-auth/commit/b21a5f7f6ca1f63c6b69666a498b4227b15e316c)]：
  - better-auth@1.6.18
  - @better-auth/core@1.6.18

## 1.6.17

### 补丁变更

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 同时提交两次的 SAML 断言现在不会再被接受多次；重放保护现在可在并发请求下正常生效。

- [#10003](https://github.com/better-auth/better-auth/pull/10003) [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 启用 `trustEmailVerified` 后，值为字符串 `"false"` 的 OIDC `email_verified` 声明或映射的 SAML 属性不再被视为已验证邮箱。只有布尔值 `true` 或字符串 `"true"` 才算已验证。

- [#10002](https://github.com/better-auth/better-auth/pull/10002) [`ed7b6c9`](https://github.com/better-auth/better-auth/commit/ed7b6c9ac0fa2bb7f246f552b41046302ef8138c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 组织管理员和所有者现在可以为其组织拥有的 SSO 提供商申请并验证域名所有权，即使该提供商由其他成员注册。此前只有创建该提供商的成员才能验证其域名。

- 更新的依赖项 [[`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`3e99e6c`](https://github.com/better-auth/better-auth/commit/3e99e6c77ef788377a3ddb7abe790c7dc3df1493), [`96c78c3`](https://github.com/better-auth/better-auth/commit/96c78c3e983ab3a2d914780fcc5d66d90537f9ac), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`ed7b6c9`](https://github.com/better-auth/better-auth/commit/ed7b6c9ac0fa2bb7f246f552b41046302ef8138c), [`e0a768c`](https://github.com/better-auth/better-auth/commit/e0a768c973f9d9ccd4aee959efcbe1fbcc2e608d), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`d9c526b`](https://github.com/better-auth/better-auth/commit/d9c526b2a57afe9e01ff25da400f1d634b4c1ac7), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`8960f5f`](https://github.com/better-auth/better-auth/commit/8960f5f3bd2f0dccbfb768d69737d8a24d793a9e), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`5c289b5`](https://github.com/better-auth/better-auth/commit/5c289b52bc166be3a36ec3c112b04195dc7621d8), [`1dbf5bb`](https://github.com/better-auth/better-auth/commit/1dbf5bb59de5d628f0d07d5e846eba8287b831d7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`59e0ccb`](https://github.com/better-auth/better-auth/commit/59e0ccbedc6c336b1e77f71c62484d654fd2fca3), [`b803c61`](https://github.com/better-auth/better-auth/commit/b803c61fdcfc64be4e26bf6fa10953621f0070cc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7)]：
  - better-auth@1.6.17
  - @better-auth/core@1.6.17

## 1.6.16

### 补丁变更

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 在请求时，通过解析主机名并拒绝解析到非公开可路由地址的任何主机，验证服务端获取的 OIDC 端点（token、userinfo、jwks）。Discovery 和 userinfo 请求不再自动跟随重定向到未经验证的主机。运营者加入允许列表的源（`trustedOrigins`）仍可豁免，供内部 IdP 使用。

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- 将 SSO 提供方 id 与用于社交/OAuth 提供方的账户关联提供方命名空间分开。此前，如果注册的 SSO 提供方 id 与配置的 `accountLinking.trustedProviders` 条目匹配（例如 `google`），就会被视为受信任的提供方，并可能隐式关联到具有相同邮箱的现有已验证账户。

  现在，SSO 注册会拒绝与已配置的社交提供方、`trustedProviders` 条目或保留的内置 id 冲突的提供方 id。此外，OIDC 和 SAML 回调不再根据名称匹配 `trustedProviders` 来推断信任——SSO 信任完全基于已验证的域名所有权（`domainVerified`）。`handleOAuthUserInfo` 新增了 `trustProviderByName` 选项（默认为 `true`，保留社交提供方行为），SSO 插件会将其设为 `false`。

- 已更新依赖项 [[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`87e7aa5`](https://github.com/better-auth/better-auth/commit/87e7aa5e0fd8f19b326beb5bec409a9ed1f245ca), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`893cf6c`](https://github.com/better-auth/better-auth/commit/893cf6cb3f1f2669b39f6ac8d3d49cf830e5732e), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`5e49c56`](https://github.com/better-auth/better-auth/commit/5e49c56a9e12a9b6b3fd1202bbc7a2fc97aeeafd), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)]：
  - better-auth@1.6.16
  - @better-auth/core@1.6.16

## 1.6.15

### 补丁更改

- [#9748](https://github.com/better-auth/better-auth/pull/9748) [`bff65fd`](https://github.com/better-auth/better-auth/commit/bff65fd620ac62d72c24c9ed79badf1e31cf1a39) 感谢 [@seebykilian](https://github.com/seebykilian)！- 在 SSO 插件的 SAML 选项中配置 `clockSkew` 时，它仅用于 better-auth 的内部验证，却没有传递给 samlify 的 ServiceProvider。因此，samlify 使用其默认的 [0, 0] 时钟偏差，导致只要 SP 和 IdP 之间存在任何时间差，即使 SAML 响应有效，也会出现 ERR_SUBJECT_UNCONFIRMED 错误。

  这会影响任何标准 IdP（Auth0、Keycloak、Okta 等），即使 SAML 响应完全有效且服务器时间处于 NotBefore/NotOnOrAfter 时间窗口内。

  此问题现已修复。

- 已更新依赖项 [[`1012b69`](https://github.com/better-auth/better-auth/commit/1012b690466ccd7078441dbfb406eef166fca805), [`ad60333`](https://github.com/better-auth/better-auth/commit/ad60333d1517142d688c61b6ccee14b4c30864ae), [`0933c05`](https://github.com/better-auth/better-auth/commit/0933c050ff8735466a273347c9aab0fdd8cd38ff), [`b0ddfd3`](https://github.com/better-auth/better-auth/commit/b0ddfd3433cafac312ee99ec5fb7dbb9a240da35)]：
  - better-auth@1.6.15
  - @better-auth/core@1.6.15

## 1.6.14

### 补丁更改

- 已更新依赖项 [[`2d9781a`](https://github.com/better-auth/better-auth/commit/2d9781a83ddc7b51ecffbd7d24c28e4b917e2323), [`5a2d642`](https://github.com/better-auth/better-auth/commit/5a2d642bc7d940f4242df9b304818a8653ea2a10), [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f), [`9d3450a`](https://github.com/better-auth/better-auth/commit/9d3450ae23e8387d24adfb7bb1cb24cc6965b6e3)]：
  - better-auth@1.6.14
  - @better-auth/core@1.6.14

## 1.6.13

### 补丁更改

- [#9301](https://github.com/better-auth/better-auth/pull/9301) [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在 `GenericOAuthConfig` 和 SSO `OIDCConfig` 中添加 `allowIdpInitiated`，以支持无需 `state` 参数便发起 OAuth 的提供方（例如 Clever）。启用后，无状态回调会在服务端使用新的 state 和 PKCE 重新启动 OAuth 流程，同时保留 CSRF 保护。还增强了 `parseState`，使其能处理 GET 回调中未定义的请求正文。

- [#9657](https://github.com/better-auth/better-auth/pull/9657) [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 增强 `private_key_jwt` 和 token 端点客户端身份验证，并添加使此修复在结构上得以实现的辅助函数。

  `@better-auth/core/oauth2` 现在公开了 `encodeBasicCredentials` 和 `decodeBasicCredentials`，这对经过往返测试的函数遵循 RFC 6749 §2.3.1（对每个值进行 `application/x-www-form-urlencoded` 编码，并且仅按第一个 `:` 分割）。解码器不区分大小写地接受方案，并按 RFC 7235 §2.1 容忍凭据前的一个或多个空格。客户端的 `client_secret_basic` 和服务端的 Better Auth OAuth 提供方都通过这些辅助函数处理，因此包含保留字符的凭据可以在整个调用链中正确往返，并且 `basic xxx` 或 `Basic  xxx` 这样的请求头也能被接受。

  `createPrivateKeyJwtClientAssertionGetter` 会立即验证选项。不支持的算法（`HS256`、`none`）、不包含密钥材料的 JWK，以及显式 `algorithm` 与 JWK 内嵌的 `alg` 不一致，都会在构造时抛出错误，而不是等到首次 token 请求时才报错。`signPrivateKeyJwtClientAssertion` 对直接调用者执行相同检查。**破坏性变更：**过去，当配置将不受支持的 JWK `alg` 与不同的显式 `algorithm` 配对时，会静默地使用显式选项进行签名；现在会在构造时失败。

  `@better-auth/oauth-provider` 会在 schema 层拒绝空的 `jwks` 负载（`jwks: []` 和 `jwks: { keys: [] }`），使文档中的客户端元数据契约与 `checkOAuthClient` 在运行时已执行的约束保持一致。schema 使用者（TypeScript、OpenAPI、生成的 SDK）现在也能看到此约束。

  如果 `resolvePrivateKey` 回调未返回 `privateKeyJwk` 或 `privateKeyPem`，SSO `private_key_jwt` 流程会通过 `error_description=no_private_key_available` 重定向。此前，重定向路径仅在解析器完全不存在时才会提前结束；解析器返回空值时会继续执行，最终导致内部签名错误。

  `better-auth/test` 新增了 `getHttpTestInstance`，它是 `getTestInstance` 的对应函数，会在操作系统分配的端口上绑定真实 HTTP 侦听器，并使用发现的 URL 构建 auth 实例。它消除了测试文件一直各自复制粘贴的“临时服务器后重新绑定”竞态问题。

- 已更新依赖项 [[`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8), [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2), [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a), [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - better-auth@1.7.0-beta.4
  - @better-auth/core@1.7.0-beta.4

## 1.7.0-beta.3

### 补丁更改

- 已更新依赖项 [[`4e8e4c7`](https://github.com/better-auth/better-auth/commit/4e8e4c7fc5fb2723144cbf41c4a1bfa28de8d671), [`523f95c`](https://github.com/better-auth/better-auth/commit/523f95c10db24b790bbd75fe85c86c34d3465267), [`729c00d`](https://github.com/better-auth/better-auth/commit/729c00d74c94f558893da1e3a9ee86451d1b23da)]：
  - better-auth@1.7.0-beta.3
  - @better-auth/core@1.7.0-beta.3

## 1.7.0-beta.2

### 补丁更改

- 已更新依赖项 [[`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4), [`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09), [`954b664`](https://github.com/better-auth/better-auth/commit/954b664f4f251f8dd028451dab3ab43067dbf890), [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - better-auth@1.7.0-beta.2
  - @better-auth/core@1.7.0-beta.2

## 1.7.0-beta.1

### 次要更改

- [#9117](https://github.com/better-auth/better-auth/pull/9117) [`b70f025`](https://github.com/better-auth/better-auth/commit/b70f025bfaad38c229305a25e87e08bc176f9503) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- ### 破坏性变更：SAML 配置更改

  **已从 `samlConfig` 中移除 `callbackUrl`。**
  ACS URL 现在始终根据你的 `baseURL` 和 `providerId` 派生。请从 SAML 提供方配置中移除 `callbackUrl`。登录后的重定向目标通过 `signIn.sso()` 中的 `callbackURL` 按每次登录单独设置：

  ```ts
  await authClient.signIn.sso({
    providerId: "my-provider",
    callbackURL: "/dashboard",
  });
  ```

  **已移除 `/sso/saml2/callback/:providerId` 端点。**
  请将 IdP 的 ACS URL 更新为 `/sso/saml2/sp/acs/:providerId`。此端点同时处理 GET 和 POST 请求。

  **`spMetadata` 现在为可选项。**
  注册提供方时不再需要传入 `spMetadata: {}`。SP 元数据会根据你的配置自动生成。

  **从 `SAMLConfig` 中移除了未使用的字段：**
  `decryptionPvk`、`additionalParams`、`idpMetadata.entityURL`、`idpMetadata.redirectURL`。这些字段之前虽有存储，但从未读取。如果配置中存在这些字段，请将其移除。

  ### Bug 修复
  - 修复 SLO SessionIndex 匹配问题：带有 SessionIndex 的 LogoutRequests 会悄无声息地无法删除正确的会话。
  - 如果未配置 `audience`，受众验证现在默认使用 SP entity ID，符合 SAML Core 第 2.5.1 节的规定。
  - 在 AuthnRequests 中恢复 `AllowCreate`，这是使用 JIT 配置的 IdP 所必需的。
  - SP 元数据端点现在会反映 SP 的实际能力（加密、签名、SLO）。

### 补丁更改

- [#9121](https://github.com/better-auth/better-auth/pull/9121) [`9603043`](https://github.com/better-auth/better-auth/commit/960304354aebab2f03c0fadd0d7bfd02febfd246) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- ### 安全：将 samlify 升级至 2.12.0

  将 SAML XML 处理库从 2.10.2 升级至 2.12.0：
  - **XPath 注入保护：**所有 XPath 表达式现在使用值转义，而不是字符串插值
  - **XXE 防护：**XML 解析器默认采用严格模式，拒绝实体引用
  - **减少依赖项：**改用 Node 内置模块，移除 `node-forge`、`pako`、`uuid` 和 `camelcase`

  在将带有前导空白的 PEM 密钥和证书传递给 samlify 之前，现在会自动对其进行规范化。这可以防止从缩进的配置文件或环境变量中复制密钥时出现 `DECODER routines::unsupported` 错误。

  需要 Node 20+。

- 已更新依赖项 [[`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45), [`484ce6a`](https://github.com/better-auth/better-auth/commit/484ce6a262c39b9c1be91d37774a2a13de3a5a1f), [`f875897`](https://github.com/better-auth/better-auth/commit/f8758975ae475429d56b34aa6067e304ee973c8f), [`c7d2253`](https://github.com/better-auth/better-auth/commit/c7d22539ec4f7322d9625ae2953d397c3863d097), [`9a6d475`](https://github.com/better-auth/better-auth/commit/9a6d4759cd4451f0535d53f171bcfc8891c41db7), [`513dabb`](https://github.com/better-auth/better-auth/commit/513dabb132e2c08a5b6d3b7e88dd397fcd66c1af), [`6f2948e`](https://github.com/better-auth/better-auth/commit/6f2948e87bb5fa14bd2174a91f7143e1eced1b87)]：
  - better-auth@1.7.0-beta.1
  - @better-auth/core@1.7.0-beta.1

## 1.7.0-beta.0

### 次要更改

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在整个调用链中添加 `private_key_jwt`（RFC 7523）客户端身份验证。服务器会验证使用非对称密钥签名的 JWT 客户端断言；客户端会在授权码、刷新令牌和客户端凭据流程中对其进行签名。

- [#9055](https://github.com/better-auth/better-auth/pull/9055) [`b790144`](https://github.com/better-auth/better-auth/commit/b790144a2e969f1f423c1226147edfb4e69664d1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- fix(sso)!：增强 SAML 响应验证（InResponseTo、Audience、SessionIndex）

  ### 破坏性变更
  - **`allowIdpInitiated` 现在默认值为 `false`** — 默认禁用由 IdP 发起的 SSO（主动发起的 SAML 响应）。设置 `saml.allowIdpInitiated: true` 可恢复之前的行为。这与 SAML2Int 互操作性配置文件保持一致；该配置文件不建议使用由 IdP 发起的 SSO，因为它容易受到注入攻击。

  ### Bug 修复
  - **InResponseTo 验证完全不起作用** — 代码读取的是 `extract.inResponseTo`（始终为 `undefined`），而不是 samlify 的实际路径 `extract.response.inResponseTo`。现在两个 ACS 处理程序中的 SP 发起 InResponseTo 验证均可按预期工作。
  - **从未验证 Audience Restriction** — 为不同服务提供方签发的 SAML 断言在未检查 `<AudienceRestriction>` 元素的情况下被接受。现在会根据 SAML 2.0 Core §2.5.1 验证 Audience 是否与配置的 `samlConfig.audience` 值匹配。
  - **SessionIndex 被存储为对象而不是字符串** — samlify 返回的登录响应中的 `sessionIndex` 格式为 `{ authnInstant, sessionNotOnOrAfter, sessionIndex }`，但代码存储了整个对象。SLO 会话索引比较因此总是悄无声息地失败。现在会提取正确的内部 `sessionIndex` 字符串。

  ### 改进
  - 将共享的 `validateInResponseTo()` 和 `validateAudience()` 提取到 `packages/sso/src/saml/response-validation.ts`，消除了两个 ACS 处理程序之间约 160 行重复的验证逻辑。
  - 修正 `SAMLAssertionExtract` 类型，使其与 samlify 实际提取器输出的结构一致。

## 1.6.10

### 补丁更改

- [#9398](https://github.com/better-auth/better-auth/pull/9398) [`006e809`](https://github.com/better-auth/better-auth/commit/006e809b92d4a933e52a4684b74419bc419530dc) 感谢 [@Craga89](https://github.com/Craga89)！ - 修复（sso）：在 spMetadata 中使用 findSAMLProvider，以便解析 defaultSSO 提供商

  `/sso/saml2/sp/metadata` 是唯一一个直接调用 `adapter.findOne` 的 SAML 端点，因此，通过 `defaultSSO` 配置的提供商（不会持久化到数据库）会导致其抛出 `NOT_FOUND`。现在该端点使用共享的 `findSAMLProvider` 辅助函数，与 `signInSSO`、SAML 回调处理程序和 `signOut` 保持一致。

- 已更新依赖项 [[`1e0f26d`](https://github.com/better-auth/better-auth/commit/1e0f26d4c83608d14a533f33458ade0f8504fd16), [`8c1e917`](https://github.com/better-auth/better-auth/commit/8c1e91757d91d103c332e90201c39ce5892c37e8), [`b2d655c`](https://github.com/better-auth/better-auth/commit/b2d655c77c7c627ada17456d1de106fdce6fa18e), [`09f1327`](https://github.com/better-auth/better-auth/commit/09f1327acb9c6bbfeb272dc62c7013172cf33153), [`906b7b3`](https://github.com/better-auth/better-auth/commit/906b7b34a710d49798e166395da2bcd2be13ef46), [`e9c978e`](https://github.com/better-auth/better-auth/commit/e9c978e2af9e61d35f50fd040305cbb8fdda32ba), [`e71aad3`](https://github.com/better-auth/better-auth/commit/e71aad3b6d67502cfb770fa8890f3ab58c537114), [`80a655d`](https://github.com/better-auth/better-auth/commit/80a655d271dcae5f785a70f13be60f80fb828cf1), [`15ff28a`](https://github.com/better-auth/better-auth/commit/15ff28a957a18df8ecd2aa08d66b94c91ae9a6a4), [`88a7c67`](https://github.com/better-auth/better-auth/commit/88a7c678f4db3f7da580d53071b2595b92354a45), [`9a7b51d`](https://github.com/better-auth/better-auth/commit/9a7b51d0d3dfbc6b2697fe5f9edd0bb480bdf89b), [`1b25902`](https://github.com/better-auth/better-auth/commit/1b259024dcd1bbbc08559ee057f22c01929a72a7), [`cf59136`](https://github.com/better-auth/better-auth/commit/cf591360e72a8d01741618cd61cdeea84cf8398a), [`a597ee0`](https://github.com/better-auth/better-auth/commit/a597ee01ed4e6d85aba5ee9f15100acc578390d9), [`fc02ced`](https://github.com/better-auth/better-auth/commit/fc02cedb708e2b5987a177539a903cc35155a426), [`9f1ef1f`](https://github.com/better-auth/better-auth/commit/9f1ef1f7e5500e0b3dbe2a18e25e3519847cd7a9), [`36ef808`](https://github.com/better-auth/better-auth/commit/36ef808c6cedec6eeb9a3a4e6790e0ab46d96ff3), [`c1336c5`](https://github.com/better-auth/better-auth/commit/c1336c563d45f93ca3fd4da4e6c767fc267d86d0), [`3a9a2c3`](https://github.com/better-auth/better-auth/commit/3a9a2c37eeab1d0c98845a47642d4dc27fe54ceb), [`fde0432`](https://github.com/better-auth/better-auth/commit/fde043207ef3d5a5e1f74aa5ddabf77d523d52d4), [`2220a6d`](https://github.com/better-auth/better-auth/commit/2220a6d6c25ebd24c8568131636389dc0c12f82b)]：
  - better-auth@1.6.10
  - @better-auth/core@1.6.10

## 1.6.9

### 补丁变更

- 已更新依赖项 [[`815ecf6`](https://github.com/better-auth/better-auth/commit/815ecf62b6f6c5bf656ab55da393ce63d7eed0a6)]：
  - @better-auth/core@1.6.9
  - better-auth@1.6.9

## 1.6.8

### 补丁变更

- 已更新依赖项 [[`856ab24`](https://github.com/better-auth/better-auth/commit/856ab2426c0dce7377ee1ca26dbb7d9e52fb6429), [`9aa8e63`](https://github.com/better-auth/better-auth/commit/9aa8e63de84549634216e13e407cf6d8aa61acc3)]：
  - better-auth@1.6.8
  - @better-auth/core@1.6.8

## 1.6.7

### 补丁变更

- 已更新依赖项 [[`307196a`](https://github.com/better-auth/better-auth/commit/307196a405e067f4a863de2ed68528e8d4bdc162), [`4a180f0`](https://github.com/better-auth/better-auth/commit/4a180f0b0c084c59e7b006058d3fdbd8542face5), [`4f373ee`](https://github.com/better-auth/better-auth/commit/4f373eed8a42e02460dbd2ee9973b9493cea04eb), [`e1b1cfc`](https://github.com/better-auth/better-auth/commit/e1b1cfc7a262c8bf0c383a7b2b1d140472d33e56), [`d053a45`](https://github.com/better-auth/better-auth/commit/d053a4583e0db9132e52a100ae33e13d040a6bae)]：
  - better-auth@1.6.7
  - @better-auth/core@1.6.7

## 1.6.6

### 补丁变更

- [#9262](https://github.com/better-auth/better-auth/pull/9262) [`fe5f36c`](https://github.com/better-auth/better-auth/commit/fe5f36c7e3630373d9b1765c28a8cd81e841eff8) 感谢 [@jonathansamines](https://github.com/jonathansamines)！ - 修复加载 samlify 时的 ESM/CJS 兼容性问题

- 已更新依赖项 [[`b5742f9`](https://github.com/better-auth/better-auth/commit/b5742f9d08d7c6ae0848279b79c8bcc0a09082d7), [`4debfb6`](https://github.com/better-auth/better-auth/commit/4debfb600ff448f3e63ed242a2fb5a2c41654be1), [`9ea7eb1`](https://github.com/better-auth/better-auth/commit/9ea7eb1eab28d50d40836ab4e2cbe5a81c4da1aa), [`a844c7d`](https://github.com/better-auth/better-auth/commit/a844c7dd087715678787cb10bf9670fad46e535b), [`ab4c10f`](https://github.com/better-auth/better-auth/commit/ab4c10fbc09defcd851d614acecc111cc114b543), [`a61083e`](https://github.com/better-auth/better-auth/commit/a61083e023163d0a14d9e886ce556ba459677428), [`e64ff72`](https://github.com/better-auth/better-auth/commit/e64ff720fb8514cb78aedd1660223d8b948284da)]：
  - @better-auth/core@1.6.6
  - better-auth@1.6.6

## 1.6.5

### 补丁变更

- 已更新依赖项 [[`938dd80`](https://github.com/better-auth/better-auth/commit/938dd80e2debfab7f7ef480792a5e63876e779d9), [`0538627`](https://github.com/better-auth/better-auth/commit/05386271ca143d07416297611d3b31e6c20e2f2a)]：
  - better-auth@1.6.5
  - @better-auth/core@1.6.5

## 1.6.4

### 补丁变更

- 已更新依赖项 [[`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4), [`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09), [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - better-auth@1.6.4
  - @better-auth/core@1.6.4

## 1.6.3

### 补丁变更

- [#9097](https://github.com/better-auth/better-auth/pull/9097) [`52c4751`](https://github.com/better-auth/better-auth/commit/52c47517a21600d40a3e82c427409083b4a0a9ec) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 修复（sso）：统一 SAML 响应处理并修复提供商/配置错误

  **错误修复：**
  - 修复 SP 元数据端点在 ACS URL 中使用内部行 ID 而非 `providerId` 的问题
  - 修复配置了 `defaultSSO` 时 `acsEndpoint` 跳过数据库提供商查找的问题
  - 修复 `acsEndpoint` 缺少加密字段（`isAssertionEncrypted`、`encPrivateKey）`的问题，该问题会导致解密静默失败
  - 修复回调路径中的 `defaultSSO` 配置解析问题（对已解析对象调用 `safeJsonParse`）
  - 修复 `createSP` 缺少 `callbackUrl` 回退至自动生成的 ACS URL 的问题
  - 完善 `createSP`/`createIdP` 辅助函数，添加所有加密和签名字段

  **行为变更：**
  - ACS 错误重定向查询参数现在使用大写错误代码（例如，`error=SAML_MULTIPLE_ASSERTIONS`，而不是 `error=multiple_assertions`）。如果你的应用从重定向 URL 中解析这些错误代码，请更新预期值。
  - SAML 提供商注册现在会拒绝没有可用 IdP 入口的配置（没有有效的 `entryPoint` URL、`idpMetadata.metadata` 或 `idpMetadata.singleSignOnService`）。此前这类配置可以成功注册，但在登录时会失败。
  - `entryPoint` 验证从 `startsWith("http")` 收紧为使用 `new URL()` 解析，拒绝 `http:evil` 或 `http//missing-colon` 等格式错误的 URL。

  **重构（无 API 变更）：**
  - 提取共享的 `processSAMLResponse` 流程，以消除 `callbackSSOSAML` 和 `acsEndpoint` 之间约 500 行的重复逻辑
  - 将 `validateSAMLTimestamp` 移至 `saml/timestamp.ts`（从原位置重新导出以保持兼容性）

- 已更新依赖项 [[`6ce30cf`](https://github.com/better-auth/better-auth/commit/6ce30cf13853619b9022e93bd6ecb956bc32482d), [`f6428d0`](https://github.com/better-auth/better-auth/commit/f6428d02fcabc2e628f39b0e402f1a6eb0602649), [`c5066fe`](https://github.com/better-auth/better-auth/commit/c5066fe5d68babf2376cfc63d813de5542eca463), [`5f84335`](https://github.com/better-auth/better-auth/commit/5f84335815d75410320bdfa665a6712d3416b04f), [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656), [`544f1c6`](https://github.com/better-auth/better-auth/commit/544f1c63c9826831d96a126fbe568d8a8a8fde68)]：
  - better-auth@1.7.0-beta.0
  - @better-auth/core@1.7.0-beta.0
- 已更新依赖项 [[`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45), [`484ce6a`](https://github.com/better-auth/better-auth/commit/484ce6a262c39b9c1be91d37774a2a13de3a5a1f), [`f875897`](https://github.com/better-auth/better-auth/commit/f8758975ae475429d56b34aa6067e304ee973c8f), [`6ce30cf`](https://github.com/better-auth/better-auth/commit/6ce30cf13853619b9022e93bd6ecb956bc32482d), [`f6428d0`](https://github.com/better-auth/better-auth/commit/f6428d02fcabc2e628f39b0e402f1a6eb0602649), [`9a6d475`](https://github.com/better-auth/better-auth/commit/9a6d4759cd4451f0535d53f171bcfc8891c41db7), [`513dabb`](https://github.com/better-auth/better-auth/commit/513dabb132e2c08a5b6d3b7e88dd397fcd66c1af), [`c5066fe`](https://github.com/better-auth/better-auth/commit/c5066fe5d68babf2376cfc63d813de5542eca463), [`5f84335`](https://github.com/better-auth/better-auth/commit/5f84335815d75410320bdfa665a6712d3416b04f)]：
  - better-auth@1.6.3
  - @better-auth/core@1.6.3

## 1.6.2

### 补丁变更

- [#8968](https://github.com/better-auth/better-auth/pull/8968) [`5e5d3f6`](https://github.com/better-auth/better-auth/commit/5e5d3f62fcf457a2717e5ed774122ab0fd39884d) 感谢 [@cyphercodes](https://github.com/cyphercodes)！ - 修复（sso）：在进行 Base64 解码前去除 SAMLResponse 中的空白字符

  一些 SAML IdP 会发送包含换行的 Base64 编码 SAMLResponse（符合 RFC 2045），这会导致解码失败。现在会在请求入口处、任何处理开始前去除空白字符。

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

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 默认在 SAML 流程中启用 InResponseTo 验证

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 为插件接口添加可选的 version 字段，并公开所有内置插件的 version

### 补丁变更

- [#8838](https://github.com/better-auth/better-auth/pull/8838) [`ee8b40d`](https://github.com/better-auth/better-auth/commit/ee8b40d502bb392bd56748ac48aadf0e6c71e929) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 将 `samlify` 固定为 `~2.10.2`，以避免 v2.11.0 中的破坏性变更，并修补传递依赖 `node-forge` 的漏洞（4 个高危 CVE：签名伪造、证书链绕过、DoS）

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复 OIDC 与 SAML 之间 `provisionUser` 的不一致问题，并添加 `provisionUserOnEveryLogin` 选项

- 更新的依赖项 [[`dd537cb`](https://github.com/better-auth/better-auth/commit/dd537cbdeb618abe9e274129f1670d0c03e89ae5), [`bd9bd58`](https://github.com/better-auth/better-auth/commit/bd9bd58f8768b2512f211c98c227148769d533c5), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`469eee6`](https://github.com/better-auth/better-auth/commit/469eee6d846b32a43f36b418868e6a4c916382dc), [`560230f`](https://github.com/better-auth/better-auth/commit/560230f751dfc5d6efc8f7f3f12e5970c9ba09ea)]：
  - better-auth@1.6.0
  - @better-auth/core@1.6.0

## 1.6.0-beta.0

### 次要变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 默认对 SAML 流程启用 InResponseTo 验证

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在插件接口中添加可选的 version 字段，并公开所有内置插件的 version

### 补丁变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 修复 OIDC 与 SAML 之间 `provisionUser` 的不一致问题，并添加 `provisionUserOnEveryLogin` 选项

- 更新的依赖项 [[`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b)]：
  - better-auth@1.6.0-beta.0
  - @better-auth/core@1.6.0-beta.0
