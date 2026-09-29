# @better-auth/scim

## 1.7.6

## 1.7.5

## 1.7.4

## 1.7.3

## 1.7.2

## 1.7.1

## 1.7.0

### 次要变更

- [#10474](https://github.com/better-auth/better-auth/pull/10474) [`dec763e`](https://github.com/better-auth/better-auth/commit/dec763ef2c5af1217888a4d7f3e8b6815cd0df52) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加 `acquireActiveSCIMUserLink`，用于以事务安全的方式对已配置用户进行身份验证。该辅助函数会将精确的 SCIM 连接 ID 和 `externalId` 映射到活跃的 Better Auth User，同时防止并发主体变更、停用、删除和连接停用造成影响。

  将此辅助函数与 SSO `resolveUser` 组合使用，即可关联已配置的 User，而无需通过 email 或 `userName` 进行匹配。

- [#10390](https://github.com/better-auth/better-auth/pull/10390) [`0de88f5`](https://github.com/better-auth/better-auth/commit/0de88f5e61d96f460e02b8a526e58acb16455d15) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SCIM 连接现在无需 organization 或 SSO 插件，即可将 Users、Groups 和直接成员关系配置到应用程序定义的配置域中。应用程序可以通过投影将 Group 成员关系映射到经过验证的自定义角色。该服务还支持 SCIM 2.0 发现、筛选、分页、响应属性选择、原子 PATCH 操作，以及 Microsoft Entra ID 和 Okta 使用的常见请求模式。

  这取代了之前的 SCIM 配置、客户端 API、数据库架构和基于 organization 的 Group 模型。现有 SCIM 安装无法原地迁移配置状态。恢复流量前，请遵循 1.7 升级指南中的 SCIM 切换步骤，包括完整重新配置目录。

  延迟的数据库副作用现在只会在事务成功后执行。回滚的 User 更新不再刷新其缓存配置文件，回滚的批量会话撤销也不再使会话失效。

- [#10592](https://github.com/better-auth/better-auth/pull/10592) [`26b1949`](https://github.com/better-auth/better-auth/commit/26b194960fe539d2189cb1b7554c16d9f5318906) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许 SCIM bearer 验证在请求时解析由应用程序拥有的连接。动态连接使用与代码定义连接相同的范围强制、不可变配置域绑定、停用和请求围栏机制；配置了验证器时，也支持静态连接列表为空。

- [#10620](https://github.com/better-auth/better-auth/pull/10620) [`b7683b8`](https://github.com/better-auth/better-auth/commit/b7683b82be4048263c667d97004a47701d58793a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加标准 Enterprise User 扩展（`employeeNumber`、`costCenter`、`organization`、`division`、`department`、`manager`）以及经典的 `title`、`userType`、`preferredLanguage`、`locale`、`timezone`、`phoneNumbers`、`addresses`、`roles` 和 `entitlements` User 属性，并添加 `name.middleName`、`name.honorificPrefix` 和 `name.honorificSuffix`。这些属性均可读取、按 `type` 或 `primary` 筛选，并可通过 PATCH 写入；还包括经典的 Microsoft Entra `manager` 路径别名。

  添加 `compatibility.microsoftEntra.acceptLegacyGroupSchema`，以便在 `POST /Groups` 上接受 Microsoft Entra 旧版的不含属性的 Group 架构标记，而不存储或返回该标记。

  Microsoft Entra 互操作性修复：
  - Enterprise User 子属性的裸 `attributes`/`excludedAttributes` 名称（例如 `?attributes=manager`）不再导致整个扩展从响应中被丢弃。
  - 在 `emails`、`phoneNumbers`、`addresses`、`roles` 和 `entitlements` 上，多操作 PATCH 路径现在支持使用 `[primary eq true]`（或 `[primary eq "true"]`）筛选并以子属性为目标的操作。
  - 对 User 标量、Enterprise User 字段以及 Group `displayName` 和 `externalId`，现在会展开包裹标量 PATCH replace 值的单元素数组，而不再拒绝该请求。
  - 删除复杂属性的最后一个子属性（例如 `manager.value`）时，现在会清除已变空的 Enterprise User 扩展，而不是保留其声明。
  - 将 `manager` 替换为空字符串时会清除该属性，与 Microsoft Entra 移除 manager 的行为一致。
  - 对 Users 和 Groups，含有空 `Operations` 数组的 PATCH 现在是有效的空操作，不再报错。
  - `PATCH /Users/:id` 和 `PATCH /Groups/:id` 现在返回 `200 OK` 和更新后的资源，而不是 `204 No Content`。

- [#10682](https://github.com/better-auth/better-auth/pull/10682) [`8b96573`](https://github.com/better-auth/better-auth/commit/8b96573d78b8d114b83d2484ba94bb1f608e15e0) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 针对经过筛选的多值属性（`phoneNumbers`、`addresses`、`roles`、`entitlements`、`emails`）的 SCIM PATCH 操作，现在在筛选条件无匹配项时会创建相应值，而不是以 `noTarget` 错误拒绝请求。Microsoft Entra ID 会针对尚未填充的属性发送这些操作；此前的拒绝还会丢弃同一 PATCH 请求中包含的所有其他操作。

- [#10018](https://github.com/better-auth/better-auth/pull/10018) [`445b034`](https://github.com/better-auth/better-auth/commit/445b0343ec4d5ba819e29e9ef585cc6662f1d0a1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加持久化 SCIM Group 资源，支持按连接隔离的成员关系、投影回调、元数据和 Group 生命周期端点。Groups 隶属于 SCIM 连接，而非 Better Auth Organizations。

- [#10592](https://github.com/better-auth/better-auth/pull/10592) [`26b1949`](https://github.com/better-auth/better-auth/commit/26b194960fe539d2189cb1b7554c16d9f5318906) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加可选的 SCIM 自有连接和凭据目录。配置 `managedConnections`，即可让受信任的服务器代码创建运行时租户连接，并通过仅限服务器端的 `auth.api` 方法签发、轮换和撤销其 bearer 凭据，无需代码定义的连接或应用程序自有的验证器。

### 补丁变更

- [#10620](https://github.com/better-auth/better-auth/pull/10620) [`b7683b8`](https://github.com/better-auth/better-auth/commit/b7683b82be4048263c667d97004a47701d58793a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为实现与 Microsoft Entra 的互操作性，在 HTTP 入口处接受 SCIM User `active` 以及 `emails`、`phoneNumbers`、`addresses`、`roles` 和 `entitlements` 的 `primary` 子属性的精确、不区分大小写的字符串布尔值。

- [#10592](https://github.com/better-auth/better-auth/pull/10592) [`26b1949`](https://github.com/better-auth/better-auth/commit/26b194960fe539d2189cb1b7554c16d9f5318906) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许受信任的服务器代码在动态 SCIM 连接发起首次经过身份验证的请求前，通过在停用连接时提供其配置域，保留终止状态的连接绑定。

- [#9864](https://github.com/better-auth/better-auth/pull/9864) [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 添加 `user.validateUserInfo` 配置门，允许应用程序在创建用户或关联新账户前拒绝某个身份。对于所有会配置用户的方法（OAuth、SSO/SAML、email/password、magic link、email OTP、anonymous、SIWE、phone number、管理员创建用户以及 SCIM），该配置门都会在创建步骤执行一次，包括没有持久化数据库的无状态设置。

  当现有 OAuth 或 SSO 用户再次登录时（`source.action` 为 `"sign-in"`），该配置门也会重新执行，并接收最新的 provider email 和 profile，以便域或组织策略拒绝 provider 身份已超出范围的用户。非 provider 的回访登录不会重新验证。

  回调会接收映射后的 `user`，以及描述 `action`（`create-user`、`link-account` 或 `sign-in`）、`method` 和 provider 元数据的 `source`：OAuth providers 的元数据位于 `source.oauth`，OIDC/SAML SSO providers 的元数据位于 `source.sso`。返回 `{ error, errorDescription }` 即可拒绝：浏览器流程会重定向到错误 URL，程序化流程则返回 `403`。

## 1.7.0-rc.6

## 1.7.0-rc.5

## 1.7.0-rc.4

### 次要变更

- [#10682](https://github.com/better-auth/better-auth/pull/10682) [`8b96573`](https://github.com/better-auth/better-auth/commit/8b96573d78b8d114b83d2484ba94bb1f608e15e0) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 针对经过筛选的多值属性（`phoneNumbers`、`addresses`、`roles`、`entitlements`、`emails`）的 SCIM PATCH 操作，现在在筛选条件无匹配项时会创建相应值，而不是以 `noTarget` 错误拒绝请求。Microsoft Entra ID 会针对尚未填充的属性发送这些操作；此前的拒绝还会丢弃同一 PATCH 请求中包含的所有其他操作。

## 1.7.0-rc.3

### 次要变更

- [#10592](https://github.com/better-auth/better-auth/pull/10592) [`26b1949`](https://github.com/better-auth/better-auth/commit/26b194960fe539d2189cb1b7554c16d9f5318906) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许 SCIM bearer 验证在请求时解析由应用程序拥有的连接。动态连接使用与代码定义连接相同的范围强制、不可变配置域绑定、停用和请求围栏机制；配置了验证器时，也支持静态连接列表为空。

- [#10620](https://github.com/better-auth/better-auth/pull/10620) [`b7683b8`](https://github.com/better-auth/better-auth/commit/b7683b82be4048263c667d97004a47701d58793a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加标准 Enterprise User 扩展（`employeeNumber`、`costCenter`、`organization`、`division`、`department`、`manager`）以及经典的 `title`、`userType`、`preferredLanguage`、`locale`、`timezone`、`phoneNumbers`、`addresses`、`roles` 和 `entitlements` User 属性，并添加 `name.middleName`、`name.honorificPrefix` 和 `name.honorificSuffix`。这些属性均可读取、按 `type` 或 `primary` 筛选，并可通过 PATCH 写入；还包括经典的 Microsoft Entra `manager` 路径别名。

  添加 `compatibility.microsoftEntra.acceptLegacyGroupSchema`，以便在 `POST /Groups` 上接受 Microsoft Entra 旧版的不含属性的 Group 架构标记，而不存储或返回该标记。

  Microsoft Entra 互操作性修复：
  - Enterprise User 子属性的裸 `attributes`/`excludedAttributes` 名称（例如 `?attributes=manager`）不再导致整个扩展从响应中被丢弃。
  - 在 `emails`、`phoneNumbers`、`addresses`、`roles` 和 `entitlements` 上，多操作 PATCH 路径现在支持使用 `[primary eq true]`（或 `[primary eq "true"]`）筛选并以子属性为目标的操作。
  - 对 User 标量、Enterprise User 字段以及 Group `displayName` 和 `externalId`，现在会展开包裹标量 PATCH replace 值的单元素数组，而不再拒绝该请求。
  - 删除复杂属性的最后一个子属性（例如 `manager.value`）时，现在会清除已变空的 Enterprise User 扩展，而不是保留其声明。
  - 将 `manager` 替换为空字符串时会清除该属性，与 Microsoft Entra 移除 manager 的行为一致。
  - 对 Users 和 Groups，含有空 `Operations` 数组的 PATCH 现在是有效的空操作，不再报错。
  - `PATCH /Users/:id` 和 `PATCH /Groups/:id` 现在返回 `200 OK` 和更新后的资源，而不是 `204 No Content`。

- [#10592](https://github.com/better-auth/better-auth/pull/10592) [`26b1949`](https://github.com/better-auth/better-auth/commit/26b194960fe539d2189cb1b7554c16d9f5318906) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加可选的 SCIM 自有连接和凭据目录。配置 `managedConnections`，即可让受信任的服务器代码创建运行时租户连接，并通过仅限服务器端的 `auth.api` 方法签发、轮换和撤销其 bearer 凭据，无需代码定义的连接或应用程序自有的验证器。

### 补丁变更

- [#10620](https://github.com/better-auth/better-auth/pull/10620) [`b7683b8`](https://github.com/better-auth/better-auth/commit/b7683b82be4048263c667d97004a47701d58793a) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为实现与 Microsoft Entra 的互操作性，在 HTTP 入口处接受 SCIM User `active` 以及 `emails`、`phoneNumbers`、`addresses`、`roles` 和 `entitlements` 的 `primary` 子属性的精确、不区分大小写的字符串布尔值。

- [#10592](https://github.com/better-auth/better-auth/pull/10592) [`26b1949`](https://github.com/better-auth/better-auth/commit/26b194960fe539d2189cb1b7554c16d9f5318906) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 允许受信任的服务器代码在动态 SCIM 连接发起首次经过身份验证的请求前，通过在停用连接时提供其配置域，保留终止状态的连接绑定。

## 1.7.0-rc.2

### 次要变更

- [#10474](https://github.com/better-auth/better-auth/pull/10474) [`dec763e`](https://github.com/better-auth/better-auth/commit/dec763ef2c5af1217888a4d7f3e8b6815cd0df52) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加 `acquireActiveSCIMUserLink`，用于以事务安全的方式对已配置用户进行身份验证。该辅助函数会将精确的 SCIM 连接 ID 和 `externalId` 映射到活跃的 Better Auth User，同时防止并发主体变更、停用、删除和连接停用造成影响。

  将此辅助函数与 SSO `resolveUser` 组合使用，即可关联已配置的 User，而无需通过 email 或 `userName` 进行匹配。

- [#10390](https://github.com/better-auth/better-auth/pull/10390) [`0de88f5`](https://github.com/better-auth/better-auth/commit/0de88f5e61d96f460e02b8a526e58acb16455d15) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- SCIM 连接现在无需 organization 或 SSO 插件，即可将 Users、Groups 和直接成员关系配置到应用程序定义的配置域中。应用程序可以通过投影将 Group 成员关系映射到经过验证的自定义角色。该服务还支持 SCIM 2.0 发现、筛选、分页、响应属性选择、原子 PATCH 操作，以及 Microsoft Entra ID 和 Okta 使用的常见请求模式。

  这取代了之前的 SCIM 配置、客户端 API、数据库架构和基于 organization 的 Group 模型。现有 SCIM 安装无法原地迁移配置状态。恢复流量前，请遵循 1.7 升级指南中的 SCIM 切换步骤，包括完整重新配置目录。

  延迟的数据库副作用现在只会在事务成功后执行。回滚的 User 更新不再刷新其缓存配置文件，回滚的批量会话撤销也不再使会话失效。

## 1.7.0-rc.1

## 1.7.0-rc.0

### 次要变更

- [#10249](https://github.com/better-auth/better-auth/pull/10249) [`dfecb48`](https://github.com/better-auth/better-auth/commit/dfecb481fa0453c65cdc582adbaf3b69329a6580) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 运行时 SCIM 令牌现在要求提供 `organizationId`；应用级 SCIM 请使用 `staticProviders`。

  SCIM 管理的账户现在使用带命名空间的 provider ID（`scim:{organizationId}:{providerId}`，或应用级静态 providers 使用 `scim:{providerId}`）。升级前，只迁移已知由 SCIM 管理的账户行；即使非 SCIM 账户与其共享 provider ID，也保持不变。

  organization 范围内的 `active: false` 现在会使用户在该 organization 中处于非活跃状态，同时保留 SCIM group 和 team 关联，以便重新激活。使用 `DELETE` 可彻底取消配置 organization 范围的 SCIM 状态。

  `defaultSCIM` 已替换为 `staticProviders`。`linkExistingUsers.trustedDomains` 已移除；请改用 `requireExistingOrgMembership`、`shouldLinkUser` 或显式的 `true`。

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

- [#10018](https://github.com/better-auth/better-auth/pull/10018) [`445b034`](https://github.com/better-auth/better-auth/commit/445b0343ec4d5ba819e29e9ef585cc6662f1d0a1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 添加持久化 SCIM Group 资源，支持按 organization 隔离的成员关系、角色投影、元数据和 Group 生命周期端点。

### 补丁变更

- 已更新依赖 [[`b36c38f`](https://github.com/better-auth/better-auth/commit/b36c38f9842d3416689340552989449a32007819), [`73541c1`](https://github.com/better-auth/better-auth/commit/73541c119041113b1909fe244ff4b8210618b5b5), [`bf39cbf`](https://github.com/better-auth/better-auth/commit/bf39cbf13f3b934f728cde72b1e7ebdc4c85f641), [`e53582c`](https://github.com/better-auth/better-auth/commit/e53582ce55a0ddbca62f52efeb3459523816f222), [`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9), [`d2a79ba`](https://github.com/better-auth/better-auth/commit/d2a79bae79b88e2b28cb678f5eefd9759239b627), [`34558bc`](https://github.com/better-auth/better-auth/commit/34558bc52b0e043021a1072f78de5f5439ae1734), [`652fa53`](https://github.com/better-auth/better-auth/commit/652fa53e4912837fe234651e7c7705fb35abe188), [`6fe9faa`](https://github.com/better-auth/better-auth/commit/6fe9faab65eb640dbe9bb762954a068586e8661c), [`ad35ead`](https://github.com/better-auth/better-auth/commit/ad35eadd130162565a1b93c27f3a66910dca0b0e)]：
  - better-auth@1.7.0-beta.6
  - @better-auth/core@1.7.0-beta.6

## 1.7.0-beta.5

### 补丁变更

- [#9864](https://github.com/better-auth/better-auth/pull/9864) [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f) 感谢 [@GautamBytes](https://github.com/GautamBytes)！- 添加了 `user.validateUserInfo` 配置门，允许应用在创建用户或关联新账户之前拒绝某个身份。对于所有会创建用户的方法（OAuth、SSO/SAML、邮箱/密码、魔法链接、邮箱 OTP、匿名、SIWE、电话号码、管理员创建用户和 SCIM），该配置门都会在创建步骤运行一次，包括没有持久化数据库的无状态配置。

  当现有 OAuth 或 SSO 用户再次登录时（`source.action` 为 `"sign-in"`），该配置门也会重新运行；此时它会收到最新的提供方邮箱和个人资料，以便域名或组织策略可以拒绝提供方身份已超出允许范围的用户。非提供方的回访登录不会重新验证。

  回调会接收映射后的 `user`，以及描述 `action`（`create-user`、`link-account` 或 `sign-in`）、`method` 和提供方元数据的 `source`：OAuth 提供方使用 `source.oauth`，OIDC/SAML SSO 提供方使用 `source.sso`。返回 `{ error, errorDescription }` 即可拒绝：浏览器流程会重定向到错误 URL，程序化流程会返回 `403`。

- 已更新依赖 [[`0cbaf81`](https://github.com/better-auth/better-auth/commit/0cbaf81bed9dec4c56880ee78a532262386e1ec5), [`e014029`](https://github.com/better-auth/better-auth/commit/e0140297a59ddb59cccbcb4ba46c513de8cb86a7), [`ec8a38c`](https://github.com/better-auth/better-auth/commit/ec8a38c08f5cfe2d922be0f8a49f2d0fa84de799), [`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2), [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f), [`e0d2b9e`](https://github.com/better-auth/better-auth/commit/e0d2b9eb9b4a515e1b73be71e1e3681faaa9b55f), [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b), [`76a3342`](https://github.com/better-auth/better-auth/commit/76a33429fc2a3edcc85307bf81b9d92a95f9de6c), [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f)]：
  - better-auth@1.7.0-beta.5
  - @better-auth/core@1.7.0-beta.5

## 1.7.0-beta.4

### 次要变更

- [#9840](https://github.com/better-auth/better-auth/pull/9840) [`a8ea86e`](https://github.com/better-auth/better-auth/commit/a8ea86e25e4f4e9aa98530b9f53cc73cf2fc8cfd) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 个人（非组织）SCIM 连接现在始终归创建者所有。过去，所有者绑定可以通过 `providerOwnership` 选项选择性启用，该选项默认关闭。关闭时，个人连接不会存储所有者；管理端点仅在存储的所有者与调用者不同时才拒绝访问。没有所有者的连接对任何已登录用户都会通过该检查，因此用户可以读取连接、列出连接、重新生成令牌或删除连接。重新生成令牌会轮换密钥并使原密钥失效。

  `generateSCIMToken` 现在会在每个个人连接上记录创建者的 `userId`。`generate-token`、`list-provider-connections`、`get-provider-connection` 和 `delete-provider-connection` 端点仅允许所有者访问。组织范围的连接保持现有行为，继续使用组织成员身份和配置的 `requiredRole` 检查。

  此版本存在破坏性变更。它移除了 `providerOwnership` 选项，且无法再禁用所有者绑定。`scimProvider.userId` 列现在是架构的永久组成部分，因此升级后请运行迁移：`npx auth migrate` 或 `npx auth generate`。

  此版本之前创建的连接没有所有者。现在访问会默认拒绝，因此这些连接无法再通过管理端点访问，包括令牌重新生成。请在数据库层面重新认领这些连接：删除既没有 `organizationId` 也没有 `userId` 的 `scimProvider` 行，或者将 `userId` 设置为预期所有者，然后按需重新生成令牌。组织范围的连接不受影响。

## 1.6.30

### 补丁变更

- 已更新依赖 [[`07c1718`](https://github.com/better-auth/better-auth/commit/07c17189f58502bf038e5f22766f8a99df60ac99)]：
  - @better-auth/core@1.6.30
  - better-auth@1.6.30

## 1.6.29

### 补丁变更

- 已更新依赖 [[`e6e1b4e`](https://github.com/better-auth/better-auth/commit/e6e1b4e8146a84d2a2c5fe2c497c81d03dfc2ad3)]：
  - better-auth@1.6.29
  - @better-auth/core@1.6.29

## 1.6.28

### 补丁变更

- 已更新依赖 [[`773de54`](https://github.com/better-auth/better-auth/commit/773de54b18c0e920a3542bdecaf8b42fffc0dc4b), [`2ad2928`](https://github.com/better-auth/better-auth/commit/2ad2928f967afa9f9858caecd01466ecb8686982)]：
  - better-auth@1.6.28
  - @better-auth/core@1.6.28

## 1.6.27

### 补丁变更

- 已更新依赖 [[`2ae491e`](https://github.com/better-auth/better-auth/commit/2ae491eac3ece50839a0eb2d4f868c4deedac67b), [`90b5093`](https://github.com/better-auth/better-auth/commit/90b509344794b8064700371cbc04b985d0519839)]：
  - @better-auth/core@1.6.27
  - better-auth@1.6.27

## 1.6.26

### 补丁变更

- 已更新依赖 [[`9ede805`](https://github.com/better-auth/better-auth/commit/9ede8059b56e1415c1e8cfdd93ff72691b848bbf), [`5a811f1`](https://github.com/better-auth/better-auth/commit/5a811f1b4314b8bcf6f21c0b72de5cb67d552d97), [`d8327f1`](https://github.com/better-auth/better-auth/commit/d8327f1fea92243b6fea1b0ab183e2a989792c0c), [`e2c73fb`](https://github.com/better-auth/better-auth/commit/e2c73fbec87f5e19f6a2b5ac371bc5bba9bd49ff), [`af50c45`](https://github.com/better-auth/better-auth/commit/af50c45553a62cfb6cdcdede86828731ca00c22c), [`701cd43`](https://github.com/better-auth/better-auth/commit/701cd43babac52784d855291a6adc0cf3fba7970), [`a30e274`](https://github.com/better-auth/better-auth/commit/a30e274b5daed6057086d76b91d17abfa02196d7), [`e7b0eba`](https://github.com/better-auth/better-auth/commit/e7b0eba327e050f50764802e21484c6cabb56600), [`2b4a14f`](https://github.com/better-auth/better-auth/commit/2b4a14f180ed2eeb9692d6933064b001f66ec52c), [`7552a3b`](https://github.com/better-auth/better-auth/commit/7552a3b563fe1ae922fb65db12d005c38a12614d), [`ea38fca`](https://github.com/better-auth/better-auth/commit/ea38fcac7435137604e9b3ba2fe149a1848d0eeb), [`a03e4c1`](https://github.com/better-auth/better-auth/commit/a03e4c18677e2dc01a9b47b2a8017b92dbf9ece7)]：
  - better-auth@1.6.26
  - @better-auth/core@1.6.26

## 1.6.25

### 补丁变更

- 已更新依赖 [[`5124c34`](https://github.com/better-auth/better-auth/commit/5124c3487903e96223bb3f54347724bb0204bb95), [`0ffd1fb`](https://github.com/better-auth/better-auth/commit/0ffd1fb28d44a8266d62791cd4c97e263444d03b), [`7439359`](https://github.com/better-auth/better-auth/commit/743935991f9991e8243d6c3d14773b9cfca462e8)]：
  - better-auth@1.6.25
  - @better-auth/core@1.6.25

## 1.6.24

### 补丁变更

- 已更新依赖 [[`03dc5a0`](https://github.com/better-auth/better-auth/commit/03dc5a046f536994950800ea557b8e2e2e0cdfdd), [`7508940`](https://github.com/better-auth/better-auth/commit/750894037639c4158472cc1d4994b0e07bf1f59a), [`bae7198`](https://github.com/better-auth/better-auth/commit/bae71988ab79aeb4f19f245ceabac9eca8706a50), [`ef4d273`](https://github.com/better-auth/better-auth/commit/ef4d27360cec8a0bc11a94e135ea4a3dd32b1969), [`6758231`](https://github.com/better-auth/better-auth/commit/6758231905d2e86a7b3f058dd05c17ba739aa80f), [`99dbdd7`](https://github.com/better-auth/better-auth/commit/99dbdd7ea98740d11689394220a718dfb9579276), [`086ca91`](https://github.com/better-auth/better-auth/commit/086ca91f51dd8158aff6cbf54c4f9c7ce220914d), [`8f2dedd`](https://github.com/better-auth/better-auth/commit/8f2dedd89301da9fb52c1a64df6a9683f9be55fd), [`4e685ee`](https://github.com/better-auth/better-auth/commit/4e685eef420b5576913b9803b58c7e7ee7342203), [`3bf0e49`](https://github.com/better-auth/better-auth/commit/3bf0e4981e025ba9af684013a27b0102a04f7c56), [`f59a0ee`](https://github.com/better-auth/better-auth/commit/f59a0ee7895a024ddd4c5c387344173888e17be4), [`54fab08`](https://github.com/better-auth/better-auth/commit/54fab084469a27257e66a0814523ebac7145ef5d), [`0f2cc1b`](https://github.com/better-auth/better-auth/commit/0f2cc1b33b77850948dac4d889e5f46bba41e8d5), [`ae78109`](https://github.com/better-auth/better-auth/commit/ae781091186f321b4e4ec9e84f64b6e4d5ea1043), [`46d2bf0`](https://github.com/better-auth/better-auth/commit/46d2bf02c98902da7b344753372d48cfe0e5ebb3), [`29a373e`](https://github.com/better-auth/better-auth/commit/29a373eaf1778820061a9380c29831c2de2ce704), [`f6d18fa`](https://github.com/better-auth/better-auth/commit/f6d18fa8f79b9323e10b50f72e2b1a088844e4bb), [`f23ce50`](https://github.com/better-auth/better-auth/commit/f23ce5012ea47fac1a69b1dad203dfdef3830fd0), [`c4d1dda`](https://github.com/better-auth/better-auth/commit/c4d1ddaa952eab7edfec942fab223f35798518ab)]：
  - better-auth@1.6.24
  - @better-auth/core@1.6.24

## 1.6.23

### 补丁变更

- 已更新依赖 [[`8581f97`](https://github.com/better-auth/better-auth/commit/8581f97ea0000e03edd6aa7911efabf694a9ff95)]：
  - better-auth@1.6.23
  - @better-auth/core@1.6.23

## 1.6.22

### 补丁变更

- [#10242](https://github.com/better-auth/better-auth/pull/10242) [`7c126dc`](https://github.com/better-auth/better-auth/commit/7c126dcd1aad24468ec37e876545c1d083d8acca) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 收紧 SCIM 用户写入流程，并遵循 `active` 属性。

  非组织 SCIM `DELETE` 现在会在用户关联了其他身份时解除提供方自身账户的关联；只有当 SCIM 账户是该用户唯一身份时，才会删除全局用户。`PUT` 和 `PATCH` 在尝试将用户邮箱更改为另一用户已使用的邮箱时，会以 `409` 冲突拒绝，并在邮箱更改时清除 `emailVerified`。

  SCIM `active` 属性在创建、更新和修补时均会生效。`active: false` 会通过 admin 插件的封禁状态停用用户，并撤销其会话；`active: true` 则会重新激活用户。用户资源会报告实际状态，而不是始终报告为 active。要遵循 `active` 属性，必须使用 admin 插件。

- 已更新依赖 [[`c06a56d`](https://github.com/better-auth/better-auth/commit/c06a56d83a40bbaeac12d3a8b8b67e59f92a9110), [`8bd43d9`](https://github.com/better-auth/better-auth/commit/8bd43d9d8312fd9ddbfb8fb5c827cf0a0e55132d), [`3a035e9`](https://github.com/better-auth/better-auth/commit/3a035e968e27bfdee1e53ad857e5569090d9f2d1)]：
  - better-auth@1.6.22
  - @better-auth/core@1.6.22

## 1.6.21

### 补丁变更

- [#10224](https://github.com/better-auth/better-auth/pull/10224) [`7a7a7b3`](https://github.com/better-auth/better-auth/commit/7a7a7b311aa8f546bd8d3301e1cbd37a9a5a30f1) 感谢 [@Bekacru](https://github.com/Bekacru)！- 删除 SSO 提供商不再会遗留关联账户，之后具有相同提供商 ID 的提供商也无法复用这些账户。

  SSO 和 SCIM 提供商设置现在会拒绝已被其他账户提供商使用的提供商 ID。

  账户关联后，SSO 提供商更新现在会拒绝更改身份定义信息，例如 issuer、登录端点、客户端 ID、SAML 元数据或用户 ID 映射。轮换密钥和更新为相同值仍然可行。

- 已更新依赖项 [[`e0762a1`](https://github.com/better-auth/better-auth/commit/e0762a127ce351a96614e60866b3455e6eddffa1), [`882cf9e`](https://github.com/better-auth/better-auth/commit/882cf9e592d1d305b5b78cadbb10aaeee7acd6dc), [`f52e1ab`](https://github.com/better-auth/better-auth/commit/f52e1ab50b60d289b64d6b06f1bff5a4358cdfd0), [`90d509e`](https://github.com/better-auth/better-auth/commit/90d509e0b9f72614170ad7124ae9d3a7a97d7d3a), [`b5bec19`](https://github.com/better-auth/better-auth/commit/b5bec193a56cec2f7b71c84d71dacb632f0b96a0), [`816d7f9`](https://github.com/better-auth/better-auth/commit/816d7f92522518e90d437c2a366d75db56690f86), [`239bcc8`](https://github.com/better-auth/better-auth/commit/239bcc836cf39c4fb409a15333be45134f9e9e65), [`1bc370a`](https://github.com/better-auth/better-auth/commit/1bc370aef5c249e82127cb9d35972101087ecde6), [`570267c`](https://github.com/better-auth/better-auth/commit/570267cd5e782f018933ce3af4f51dbd250bf7de), [`461ca6f`](https://github.com/better-auth/better-auth/commit/461ca6fd2453a2e145fa18a1df543e435e884701), [`88409b0`](https://github.com/better-auth/better-auth/commit/88409b0078c2bfddcc6503031fff333bfa045cd2), [`5953157`](https://github.com/better-auth/better-auth/commit/5953157acf619bcb8233c91952b1e4072202f055), [`b046f9e`](https://github.com/better-auth/better-auth/commit/b046f9ec112b2cf547efea8dc870a4895602c53b), [`ae647b4`](https://github.com/better-auth/better-auth/commit/ae647b4abe5a4d606c326f1ce0ffa2500b5424d1)]：
  - better-auth@1.6.21
  - @better-auth/core@1.6.21

## 1.6.20

### 补丁变更

- 已更新依赖项 [[`21448b1`](https://github.com/better-auth/better-auth/commit/21448b1b77681e71e80ae0728d8658c936c18eb8), [`8ecf238`](https://github.com/better-auth/better-auth/commit/8ecf23817f5e501bdd8ab63ad5fdf2554ff1dff5), [`930f534`](https://github.com/better-auth/better-auth/commit/930f5341d956bf3075f43758392a5c7f50947104)]：
  - better-auth@1.6.20
  - @better-auth/core@1.6.20

## 1.6.19

### 补丁变更

- [#10087](https://github.com/better-auth/better-auth/pull/10087) [`f3e1a40`](https://github.com/better-auth/better-auth/commit/f3e1a405cdc3939d2472d6891ddb181aeb1d3959) 感谢 [@bytaesu](https://github.com/bytaesu)！- 列出用户时停止记录 SCIM 用户筛选值。

- 已更新依赖项 [[`de4aa52`](https://github.com/better-auth/better-auth/commit/de4aa52e991f0a56786300af3e0d9ac8331f1996), [`b4b0266`](https://github.com/better-auth/better-auth/commit/b4b02660c760fe4c8889d1311a3dbf3165f88d0b), [`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63), [`581f827`](https://github.com/better-auth/better-auth/commit/581f8271fb911cea2ce74810e086709909457cd3), [`8407885`](https://github.com/better-auth/better-auth/commit/840788502a13d6fa4aa4540b930ddb4a99dc1ed6), [`c1a8a64`](https://github.com/better-auth/better-auth/commit/c1a8a64c146fab20c7ad0076ffdf12eff9adc17a), [`635f190`](https://github.com/better-auth/better-auth/commit/635f1908702d0c63cf66b4e5f054e9d527a3c8f7), [`a787e0b`](https://github.com/better-auth/better-auth/commit/a787e0b66b368a1af0b4ba17c9750c2839668246), [`c2f718f`](https://github.com/better-auth/better-auth/commit/c2f718fcdeec0c1767bb8acd5fefdd3810863b0a), [`7d18175`](https://github.com/better-auth/better-auth/commit/7d18175637a0b95a501fde0cf3db080879367a9d)]：
  - better-auth@1.6.19
  - @better-auth/core@1.6.19

## 1.6.18

### 补丁变更

- 已更新依赖项 [[`9ef7240`](https://github.com/better-auth/better-auth/commit/9ef7240fec4a9d8469dd5ed24249949d3400e732), [`b21a5f7`](https://github.com/better-auth/better-auth/commit/b21a5f7f6ca1f63c6b69666a498b4227b15e316c)]：
  - better-auth@1.6.18
  - @better-auth/core@1.6.18

## 1.6.17

### 补丁变更

- [#9987](https://github.com/better-auth/better-auth/pull/9987) [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8) 感谢 [@bytaesu](https://github.com/bytaesu)！- 组织范围内的 SCIM 删除现在会通过组织适配器移除用户的组织成员身份，从而应用相关的团队成员关系和成员移除钩子。

- [#10002](https://github.com/better-auth/better-auth/pull/10002) [`ed7b6c9`](https://github.com/better-auth/better-auth/commit/ed7b6c9ac0fa2bb7f246f552b41046302ef8138c) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 请求身份验证期间，现在会以恒定时间比较 SCIM bearer token，消除了可能帮助攻击者恢复有效 token 的计时侧信道。此更改适用于所有存储模式：纯文本、哈希、加密和自定义。

- 已更新依赖项 [[`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`3e99e6c`](https://github.com/better-auth/better-auth/commit/3e99e6c77ef788377a3ddb7abe790c7dc3df1493), [`96c78c3`](https://github.com/better-auth/better-auth/commit/96c78c3e983ab3a2d914780fcc5d66d90537f9ac), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`ed7b6c9`](https://github.com/better-auth/better-auth/commit/ed7b6c9ac0fa2bb7f246f552b41046302ef8138c), [`e0a768c`](https://github.com/better-auth/better-auth/commit/e0a768c973f9d9ccd4aee959efcbe1fbcc2e608d), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`d9c526b`](https://github.com/better-auth/better-auth/commit/d9c526b2a57afe9e01ff25da400f1d634b4c1ac7), [`0c3856f`](https://github.com/better-auth/better-auth/commit/0c3856f098f4a130abc49e9003ebc285824b0ba7), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`8960f5f`](https://github.com/better-auth/better-auth/commit/8960f5f3bd2f0dccbfb768d69737d8a24d793a9e), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`5c289b5`](https://github.com/better-auth/better-auth/commit/5c289b52bc166be3a36ec3c112b04195dc7621d8), [`1dbf5bb`](https://github.com/better-auth/better-auth/commit/1dbf5bb59de5d628f0d07d5e846eba8287b831d7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`59e0ccb`](https://github.com/better-auth/better-auth/commit/59e0ccbedc6c336b1e77f71c62484d654fd2fca3), [`b803c61`](https://github.com/better-auth/better-auth/commit/b803c61fdcfc64be4e26bf6fa10953621f0070cc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7)]：
  - better-auth@1.6.17
  - @better-auth/core@1.6.17

## 1.6.16

### 补丁变更

- [#9974](https://github.com/better-auth/better-auth/pull/9974) [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15) 感谢 [@Bekacru](https://github.com/Bekacru)！- SCIM 用户配置不再仅通过匹配电子邮件关联已有用户。若已有用户使用相同电子邮件，除非通过新的 `linkExistingUsers` 选项明确选择启用（设置为 `true`、`trustedDomains`、`requireExistingOrgMembership` 或 `shouldLinkUser` 回调），否则 `createSCIMUser` 现在会返回 `409`（唯一性冲突）。此外，组织范围内的 SCIM `DELETE` 现在会取消配置该用户——移除其组织成员身份和 SCIM 账户关联——而不是删除全局 Better Auth 用户。新增的 `canGenerateToken` 选项允许应用对 SCIM token 创建进行授权，包括限制个人（非组织）token。

- 已更新依赖项 [[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`87e7aa5`](https://github.com/better-auth/better-auth/commit/87e7aa5e0fd8f19b326beb5bec409a9ed1f245ca), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`893cf6c`](https://github.com/better-auth/better-auth/commit/893cf6cb3f1f2669b39f6ac8d3d49cf830e5732e), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`5e49c56`](https://github.com/better-auth/better-auth/commit/5e49c56a9e12a9b6b3fd1202bbc7a2fc97aeeafd), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)]：
  - better-auth@1.6.16
  - @better-auth/core@1.6.16

## 1.6.15

### 补丁变更

- 已更新依赖项 [[`1012b69`](https://github.com/better-auth/better-auth/commit/1012b690466ccd7078441dbfb406eef166fca805), [`ad60333`](https://github.com/better-auth/better-auth/commit/ad60333d1517142d688c61b6ccee14b4c30864ae), [`0933c05`](https://github.com/better-auth/better-auth/commit/0933c050ff8735466a273347c9aab0fdd8cd38ff), [`b0ddfd3`](https://github.com/better-auth/better-auth/commit/b0ddfd3433cafac312ee99ec5fb7dbb9a240da35)]：
  - better-auth@1.6.15
  - @better-auth/core@1.6.15

## 1.6.14

### 补丁变更

- 已更新依赖项 [[`2d9781a`](https://github.com/better-auth/better-auth/commit/2d9781a83ddc7b51ecffbd7d24c28e4b917e2323), [`5a2d642`](https://github.com/better-auth/better-auth/commit/5a2d642bc7d940f4242df9b304818a8653ea2a10), [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f), [`9d3450a`](https://github.com/better-auth/better-auth/commit/9d3450ae23e8387d24adfb7bb1cb24cc6965b6e3)]：
  - better-auth@1.6.14
  - @better-auth/core@1.6.14

## 1.6.13

### 补丁变更

- 更新了依赖项 [[`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8), [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2), [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a), [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - better-auth@1.7.0-beta.4
  - @better-auth/core@1.7.0-beta.4

## 1.7.0-beta.3

### 补丁变更

- 更新了依赖项 [[`4e8e4c7`](https://github.com/better-auth/better-auth/commit/4e8e4c7fc5fb2723144cbf41c4a1bfa28de8d671), [`523f95c`](https://github.com/better-auth/better-auth/commit/523f95c10db24b790bbd75fe85c86c34d3465267), [`729c00d`](https://github.com/better-auth/better-auth/commit/729c00d74c94f558893da1e3a9ee86451d1b23da)]：
  - better-auth@1.7.0-beta.3
  - @better-auth/core@1.7.0-beta.3

## 1.7.0-beta.2

### 补丁变更

- 更新了依赖项 [[`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4), [`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09), [`954b664`](https://github.com/better-auth/better-auth/commit/954b664f4f251f8dd028451dab3ab43067dbf890), [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - better-auth@1.7.0-beta.2
  - @better-auth/core@1.7.0-beta.2

## 1.7.0-beta.1

### 补丁变更

- 更新了依赖项 [[`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45), [`484ce6a`](https://github.com/better-auth/better-auth/commit/484ce6a262c39b9c1be91d37774a2a13de3a5a1f), [`f875897`](https://github.com/better-auth/better-auth/commit/f8758975ae475429d56b34aa6067e304ee973c8f), [`c7d2253`](https://github.com/better-auth/better-auth/commit/c7d22539ec4f7322d9625ae2953d397c3863d097), [`9a6d475`](https://github.com/better-auth/better-auth/commit/9a6d4759cd4451f0535d53f171bcfc8891c41db7), [`513dabb`](https://github.com/better-auth/better-auth/commit/513dabb132e2c08a5b6d3b7e88dd397fcd66c1af), [`6f2948e`](https://github.com/better-auth/better-auth/commit/6f2948e87bb5fa14bd2174a91f7143e1eced1b87)]：
  - better-auth@1.7.0-beta.1
  - @better-auth/core@1.7.0-beta.1

## 1.7.0-beta.0

### 补丁变更

- 更新了依赖项 [[`6ce30cf`](https://github.com/better-auth/better-auth/commit/6ce30cf13853619b9022e93bd6ecb956bc32482d), [`f6428d0`](https://github.com/better-auth/better-auth/commit/f6428d02fcabc2e628f39b0e402f1a6eb0602649), [`c5066fe`](https://github.com/better-auth/better-auth/commit/c5066fe5d68babf2376cfc63d813de5542eca463), [`5f84335`](https://github.com/better-auth/better-auth/commit/5f84335815d75410320bdfa665a6712d3416b04f), [`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656), [`544f1c6`](https://github.com/better-auth/better-auth/commit/544f1c63c9826831d96a126fbe568d8a8a8fde68)]：
  - better-auth@1.7.0-beta.0
  - @better-auth/core@1.7.0-beta.0

## 1.6.10

### 补丁变更

- 更新了依赖项 [[`1e0f26d`](https://github.com/better-auth/better-auth/commit/1e0f26d4c83608d14a533f33458ade0f8504fd16), [`8c1e917`](https://github.com/better-auth/better-auth/commit/8c1e91757d91d103c332e90201c39ce5892c37e8), [`b2d655c`](https://github.com/better-auth/better-auth/commit/b2d655c77c7c627ada17456d1de106fdce6fa18e), [`09f1327`](https://github.com/better-auth/better-auth/commit/09f1327acb9c6bbfeb272dc62c7013172cf33153), [`906b7b3`](https://github.com/better-auth/better-auth/commit/906b7b34a710d49798e166395da2bcd2be13ef46), [`e9c978e`](https://github.com/better-auth/better-auth/commit/e9c978e2af9e61d35f50fd040305cbb8fdda32ba), [`e71aad3`](https://github.com/better-auth/better-auth/commit/e71aad3b6d67502cfb770fa8890f3ab58c537114), [`80a655d`](https://github.com/better-auth/better-auth/commit/80a655d271dcae5f785a70f13be60f80fb828cf1), [`15ff28a`](https://github.com/better-auth/better-auth/commit/15ff28a957a18df8ecd2aa08d66b94c91ae9a6a4), [`88a7c67`](https://github.com/better-auth/better-auth/commit/88a7c678f4db3f7da580d53071b2595b92354a45), [`9a7b51d`](https://github.com/better-auth/better-auth/commit/9a7b51d0d3dfbc6b2697fe5f9edd0bb480bdf89b), [`1b25902`](https://github.com/better-auth/better-auth/commit/1b259024dcd1bbbc08559ee057f22c01929a72a7), [`cf59136`](https://github.com/better-auth/better-auth/commit/cf591360e72a8d01741618cd61cdeea84cf8398a), [`a597ee0`](https://github.com/better-auth/better-auth/commit/a597ee01ed4e6d85aba5ee9f15100acc578390d9), [`fc02ced`](https://github.com/better-auth/better-auth/commit/fc02cedb708e2b5987a177539a903cc35155a426), [`9f1ef1f`](https://github.com/better-auth/better-auth/commit/9f1ef1f7e5500e0b3dbe2a18e25e3519847cd7a9), [`36ef808`](https://github.com/better-auth/better-auth/commit/36ef808c6cedec6eeb9a3a4e6790e0ab46d96ff3), [`c1336c5`](https://github.com/better-auth/better-auth/commit/c1336c563d45f93ca3fd4da4e6c767fc267d86d0), [`3a9a2c3`](https://github.com/better-auth/better-auth/commit/3a9a2c37eeab1d0c98845a47642d4dc27fe54ceb), [`fde0432`](https://github.com/better-auth/better-auth/commit/fde043207ef3d5a5e1f74aa5ddabf77d523d52d4), [`2220a6d`](https://github.com/better-auth/better-auth/commit/2220a6d6c25ebd24c8568131636389dc0c12f82b)]：
  - better-auth@1.6.10
  - @better-auth/core@1.6.10

## 1.6.9

### 补丁变更

- 更新了依赖项 [[`815ecf6`](https://github.com/better-auth/better-auth/commit/815ecf62b6f6c5bf656ab55da393ce63d7eed0a6)]：
  - @better-auth/core@1.6.9
  - better-auth@1.6.9

## 1.6.8

### 补丁变更

- 更新了依赖项 [[`856ab24`](https://github.com/better-auth/better-auth/commit/856ab2426c0dce7377ee1ca26dbb7d9e52fb6429), [`9aa8e63`](https://github.com/better-auth/better-auth/commit/9aa8e63de84549634216e13e407cf6d8aa61acc3)]：
  - better-auth@1.6.8
  - @better-auth/core@1.6.8

## 1.6.7

### 补丁变更

- 更新了依赖项 [[`307196a`](https://github.com/better-auth/better-auth/commit/307196a405e067f4a863de2ed68528e8d4bdc162), [`4a180f0`](https://github.com/better-auth/better-auth/commit/4a180f0b0c084c59e7b006058d3fdbd8542face5), [`4f373ee`](https://github.com/better-auth/better-auth/commit/4f373eed8a42e02460dbd2ee9973b9493cea04eb), [`e1b1cfc`](https://github.com/better-auth/better-auth/commit/e1b1cfc7a262c8bf0c383a7b2b1d140472d33e56), [`d053a45`](https://github.com/better-auth/better-auth/commit/d053a4583e0db9132e52a100ae33e13d040a6bae)]：
  - better-auth@1.6.7
  - @better-auth/core@1.6.7

## 1.6.6

### 补丁变更

- 更新了依赖项 [[`b5742f9`](https://github.com/better-auth/better-auth/commit/b5742f9d08d7c6ae0848279b79c8bcc0a09082d7), [`4debfb6`](https://github.com/better-auth/better-auth/commit/4debfb600ff448f3e63ed242a2fb5a2c41654be1), [`9ea7eb1`](https://github.com/better-auth/better-auth/commit/9ea7eb1eab28d50d40836ab4e2cbe5a81c4da1aa), [`a844c7d`](https://github.com/better-auth/better-auth/commit/a844c7dd087715678787cb10bf9670fad46e535b), [`ab4c10f`](https://github.com/better-auth/better-auth/commit/ab4c10fbc09defcd851d614acecc111cc114b543), [`a61083e`](https://github.com/better-auth/better-auth/commit/a61083e023163d0a14d9e886ce556ba459677428), [`e64ff72`](https://github.com/better-auth/better-auth/commit/e64ff720fb8514cb78aedd1660223d8b948284da)]：
  - @better-auth/core@1.6.6
  - better-auth@1.6.6

## 1.6.5

### 补丁变更

- 更新了依赖项 [[`938dd80`](https://github.com/better-auth/better-auth/commit/938dd80e2debfab7f7ef480792a5e63876e779d9), [`0538627`](https://github.com/better-auth/better-auth/commit/05386271ca143d07416297611d3b31e6c20e2f2a)]：
  - better-auth@1.6.5
  - @better-auth/core@1.6.5

## 1.6.4

### 补丁变更

- 更新了依赖项 [[`9aed910`](https://github.com/better-auth/better-auth/commit/9aed910499eb4cbc3dd0c395ff5534893daab7a4), [`acbd6ef`](https://github.com/better-auth/better-auth/commit/acbd6ef69f88ea54174446ac0465a426bad7ca09), [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9)]：
  - better-auth@1.6.4
  - @better-auth/core@1.6.4

## 1.6.3

### 补丁变更

- 更新了依赖项 [[`5142e9c`](https://github.com/better-auth/better-auth/commit/5142e9cec55825eb14da0f14022ae02d3c9dfd45), [`484ce6a`](https://github.com/better-auth/better-auth/commit/484ce6a262c39b9c1be91d37774a2a13de3a5a1f), [`f875897`](https://github.com/better-auth/better-auth/commit/f8758975ae475429d56b34aa6067e304ee973c8f), [`6ce30cf`](https://github.com/better-auth/better-auth/commit/6ce30cf13853619b9022e93bd6ecb956bc32482d), [`f6428d0`](https://github.com/better-auth/better-auth/commit/f6428d02fcabc2e628f39b0e402f1a6eb0602649), [`9a6d475`](https://github.com/better-auth/better-auth/commit/9a6d4759cd4451f0535d53f171bcfc8891c41db7), [`513dabb`](https://github.com/better-auth/better-auth/commit/513dabb132e2c08a5b6d3b7e88dd397fcd66c1af), [`c5066fe`](https://github.com/better-auth/better-auth/commit/c5066fe5d68babf2376cfc63d813de5542eca463), [`5f84335`](https://github.com/better-auth/better-auth/commit/5f84335815d75410320bdfa665a6712d3416b04f)]：
  - better-auth@1.6.3
  - @better-auth/core@1.6.3

## 1.6.2

### 补丁变更

- 更新了依赖项 [[`9deb793`](https://github.com/better-auth/better-auth/commit/9deb7936aba7931f2db4b460141f476508f11bfd), [`2cbcb9b`](https://github.com/better-auth/better-auth/commit/2cbcb9baacdd8e6fa1ed605e9b788f8922f0a8c2), [`b20fa42`](https://github.com/better-auth/better-auth/commit/b20fa424c379396f0b86f94fbac1604e4a17fe19), [`608d8c3`](https://github.com/better-auth/better-auth/commit/608d8c3082c2d6e52c6ca6a8f38348619869b1ae), [`8409843`](https://github.com/better-auth/better-auth/commit/84098432ad8432fe33b3134d933e574259f3430a), [`e78a7b1`](https://github.com/better-auth/better-auth/commit/e78a7b120d56b7320cc8d818270e20057963a7b2)]：
  - better-auth@1.6.2
  - @better-auth/core@1.6.2

## 1.6.1

### 补丁变更

- 更新了依赖项 [[`2e537df`](https://github.com/better-auth/better-auth/commit/2e537df5f7f2a4263f52cce74d7a64a0a947792b), [`f61ad1c`](https://github.com/better-auth/better-auth/commit/f61ad1cab7360e4460e6450904e97498298a79d5), [`7495830`](https://github.com/better-auth/better-auth/commit/749583065958e8a310badaa5ea3acc8382dc0ca2)]：
  - better-auth@1.6.1
  - @better-auth/core@1.6.1

## 1.6.0

### 次要变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在插件接口中添加可选的 version 字段，并公开所有内置插件的版本

### 补丁变更

- 更新了依赖项 [[`dd537cb`](https://github.com/better-auth/better-auth/commit/dd537cbdeb618abe9e274129f1670d0c03e89ae5), [`bd9bd58`](https://github.com/better-auth/better-auth/commit/bd9bd58f8768b2512f211c98c227148769d533c5), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33), [`469eee6`](https://github.com/better-auth/better-auth/commit/469eee6d846b32a43f36b418868e6a4c916382dc), [`560230f`](https://github.com/better-auth/better-auth/commit/560230f751dfc5d6efc8f7f3f12e5970c9ba09ea)]：
  - better-auth@1.6.0
  - @better-auth/core@1.6.0

## 1.6.0-beta.0

### 次要变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为插件接口添加可选的 version 字段，并公开所有内置插件的 version

### 修补变更

- 更新了依赖项 [[`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b), [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b)]：
  - better-auth@1.6.0-beta.0
  - @better-auth/core@1.6.0-beta.0
