# @better-auth/drizzle-adapter

## 1.7.6

### 补丁更新

- [#11333](https://github.com/better-auth/better-auth/pull/11333) [`631ac29`](https://github.com/better-auth/better-auth/commit/631ac296a55ccecf51a7995e89a3e528a5f782da) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当自定义模型名称与另一个 schema 键匹配时，保留逻辑模型标识。

## 1.7.5

### 补丁更新

- [#11263](https://github.com/better-auth/better-auth/pull/11263) [`e18bc83`](https://github.com/better-auth/better-auth/commit/e18bc83172dca1804f0c5c3eff41d65e2849c557) 感谢 [@bytaesu](https://github.com/bytaesu)！- 将 Drizzle 关系元数据的访问推迟到执行关系查询时，从而在应用构建期间保留数据库的延迟初始化。

## 1.7.4

### 补丁更新

- [#11213](https://github.com/better-auth/better-auth/pull/11213) [`b905bfe`](https://github.com/better-auth/better-auth/commit/b905bfe3d97de3c88fc31f7f2820531702df583e) 感谢 [@bytaesu](https://github.com/bytaesu)！- 为 Drizzle Relations v2 适配器运行 schema 验证，包括仅提供 relations 的配置，以便在初始化期间报告 schema 不匹配。

## 1.7.3

### 补丁更新

- [#11179](https://github.com/better-auth/better-auth/pull/11179) [`352d012`](https://github.com/better-auth/better-auth/commit/352d012bd54e613782bf4af22aae24443541c77c) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在初始化期间验证 Drizzle schema 对象和生成的 Prisma 客户端模型，包括在生产环境中，并提供修复指南以报告不匹配项。这些检查不会查询数据库，也无法检测尚未应用的迁移。

  对于模型元数据不包含可空性信息的 Prisma 客户端，`auth generate` 会读取现有的 Prisma schema，并报告 Better Auth 从不写入的必填字段。设置 `advanced.database.validateSchema: false` 可禁用运行时验证。

## 1.7.2

### 补丁更新

- [#10859](https://github.com/better-auth/better-auth/pull/10859) [`ea77118`](https://github.com/better-auth/better-auth/commit/ea77118d4e00f69ddffed4fb42dfedc08594ea9e) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在构建复合 `where` 子句前拒绝缺失的 Drizzle schema 字段，从而在应用 schema 过期时避免生成错误的 SQL。

- [#10941](https://github.com/better-auth/better-auth/pull/10941) [`5aea9f7`](https://github.com/better-auth/better-auth/commit/5aea9f77284dfb7b187e8e7bec0cebd4b8834123) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在启用 `usePlural` 时，避免 Drizzle Relations v1 和 v2 中的一对一连接失败。通过 Drizzle 运行时元数据解析生成的和旧版关系键，包括没有适配器 schema 的 Relations v2 配置。

## 1.7.1

## 1.7.0

### 次要更新

- [#10402](https://github.com/better-auth/better-auth/pull/10402) [`763a267`](https://github.com/better-auth/better-auth/commit/763a2671c5372d88c291881977c8a1c2e29034b1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 插件数据库 schema 现在可以在多个字段上定义具名或自动生成的表级索引。SQL 迁移以及生成的 Drizzle 或 Prisma schema 会一致地解析配置的表名和列名，而 MongoDB 适配器会在首次强制索引的写入操作前创建相同的索引。

- [#7169](https://github.com/better-auth/better-auth/pull/7169) [`5d38b13`](https://github.com/better-auth/better-auth/commit/5d38b138c3c73eb06fe247ef6631c66e86ccc92b) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 在 Drizzle Relations v2 适配器配置中添加 `schemaName` 选项。在 PostgreSQL 上设置该选项后，schema 生成会输出 `pgSchema("...")` 命名空间，并使用带命名空间的表定义（例如 `authSchema.user(...)`），与 v1 CLI 生成器的行为保持一致。

- [#9489](https://github.com/better-auth/better-auth/pull/9489) [`ea06c5a`](https://github.com/better-auth/better-auth/commit/ea06c5a71f448dfc600f1c2f7b0de732730c79cd) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 为使用 Drizzle Relations v2 的项目新增 `@better-auth/drizzle-adapter/relations-v2` 入口。schema 生成器现在使用 `defineRelationsPart` 输出关系，因此生成的 auth schema 可以与应用的 relations 合并，而无需更改数据库结构。

- [#10359](https://github.com/better-auth/better-auth/pull/10359) [`8784c1c`](https://github.com/better-auth/better-auth/commit/8784c1c1f4301acf96d980e5bf81ff56435e2545) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 数据库连接已从 `experimental` 移至稳定选项 `advanced.database.joins`（默认值：`false`）。

  如果你之前设置了 `experimental: { joins: true }`，请将配置更新为：

  ```ts
  advanced: {
    database: {
      joins: true,
    },
  }
  ```

  启用后，支持原生连接的适配器会使用原生连接。如果适配器无法为查询返回连接后的数据，Better Auth 会回退到额外查询并合并结果。Drizzle 和 Prisma 用户应确保其 schema 包含所需的关系（`npx auth@latest generate`）。

### 补丁更新

- [#10770](https://github.com/better-auth/better-auth/pull/10770) [`692b22c`](https://github.com/better-auth/better-auth/commit/692b22c517011444f812fe21c206e399e35e8417) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 导出生成的 `pgSchema` 绑定，以便 drizzle-kit 为自定义 PostgreSQL 命名空间输出 `CREATE SCHEMA`。

## 1.7.0-rc.6

### 补丁更新

- [#10770](https://github.com/better-auth/better-auth/pull/10770) [`692b22c`](https://github.com/better-auth/better-auth/commit/692b22c517011444f812fe21c206e399e35e8417) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 导出生成的 `pgSchema` 绑定，以便 drizzle-kit 为自定义 PostgreSQL 命名空间输出 `CREATE SCHEMA`。

## 1.7.0-rc.5

## 1.7.0-rc.4

## 1.7.0-rc.3

## 1.7.0-rc.2

### 次要更新

- [#10402](https://github.com/better-auth/better-auth/pull/10402) [`763a267`](https://github.com/better-auth/better-auth/commit/763a2671c5372d88c291881977c8a1c2e29034b1) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 插件数据库 schema 现在可以在多个字段上定义具名或自动生成的表级索引。SQL 迁移以及生成的 Drizzle 或 Prisma schema 会一致地解析配置的表名和列名，而 MongoDB 适配器会在首次强制索引的写入操作前创建相同的索引。

- [#7169](https://github.com/better-auth/better-auth/pull/7169) [`5d38b13`](https://github.com/better-auth/better-auth/commit/5d38b138c3c73eb06fe247ef6631c66e86ccc92b) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 在 Drizzle Relations v2 适配器配置中添加 `schemaName` 选项。在 PostgreSQL 上设置该选项后，schema 生成会输出 `pgSchema("...")` 命名空间，并使用带命名空间的表定义（例如 `authSchema.user(...)`），与 v1 CLI 生成器的行为保持一致。

- [#10359](https://github.com/better-auth/better-auth/pull/10359) [`8784c1c`](https://github.com/better-auth/better-auth/commit/8784c1c1f4301acf96d980e5bf81ff56435e2545) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 数据库连接已从 `experimental` 移至稳定选项 `advanced.database.joins`（默认值：`false`）。

  如果你之前设置了 `experimental: { joins: true }`，请将配置更新为：

  ```ts
  advanced: {
    database: {
      joins: true,
    },
  }
  ```

  启用后，支持原生连接的适配器会使用原生连接。如果适配器无法为查询返回连接后的数据，Better Auth 会回退到额外查询并合并结果。Drizzle 和 Prisma 用户应确保其 schema 包含所需的关系（`npx auth@latest generate`）。

## 1.7.0-rc.1

## 1.7.0-rc.0

## 1.7.0-beta.10

### 补丁更新

- [#9489](https://github.com/better-auth/better-auth/pull/9489) [`ea06c5a`](https://github.com/better-auth/better-auth/commit/ea06c5a71f448dfc600f1c2f7b0de732730c79cd) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 为使用 Drizzle Relations v2 的项目新增 `@better-auth/drizzle-adapter/relations-v2` 入口。schema 生成器现在使用 `defineRelationsPart` 输出关系，因此生成的 auth schema 可以与应用的 relations 合并，而无需更改数据库结构。

## 1.7.0-beta.9

### 补丁更新

- 更新的依赖项 []：
  - @better-auth/core@1.7.0-beta.9

## 1.7.0-beta.8

### 补丁更新

- 更新的依赖项 [[`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d), [`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0), [`3a79aff`](https://github.com/better-auth/better-auth/commit/3a79aff58ed82e45caf04c2ee4acaf0f4d09a86c)]：
  - @better-auth/core@1.7.0-beta.8

## 1.7.0-beta.7

### 补丁更新

- 更新的依赖项 [[`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3), [`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0)]：
  - @better-auth/core@1.7.0-beta.7

## 1.7.0-beta.6

### 补丁更新

- 更新的依赖项 [[`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725), [`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9)]：
  - @better-auth/core@1.7.0-beta.6

## 1.7.0-beta.5

### 补丁更新

- 更新的依赖项 [[`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2), [`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f), [`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b), [`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f)]：
  - @better-auth/core@1.7.0-beta.5

## 1.7.0-beta.4

## 1.6.30

### 补丁更新

- 更新的依赖项 [[`07c1718`](https://github.com/better-auth/better-auth/commit/07c17189f58502bf038e5f22766f8a99df60ac99)]：
  - @better-auth/core@1.6.30

## 1.6.29

### 补丁更新

- 更新的依赖项 []：
  - @better-auth/core@1.6.29

## 1.6.28

### 补丁更新

- 更新的依赖项 []：
  - @better-auth/core@1.6.28

## 1.6.27

### 补丁更新

- 更新的依赖项 [[`2ae491e`](https://github.com/better-auth/better-auth/commit/2ae491eac3ece50839a0eb2d4f868c4deedac67b)]：
  - @better-auth/core@1.6.27

## 1.6.26

### 补丁更新

- 更新的依赖项 [[`a30e274`](https://github.com/better-auth/better-auth/commit/a30e274b5daed6057086d76b91d17abfa02196d7)]：
  - @better-auth/core@1.6.26

## 1.6.25

### 补丁更新

- 更新的依赖项 [[`0ffd1fb`](https://github.com/better-auth/better-auth/commit/0ffd1fb28d44a8266d62791cd4c97e263444d03b)]：
  - @better-auth/core@1.6.25

## 1.6.24

### 补丁更新

- 更新的依赖项 [[`6758231`](https://github.com/better-auth/better-auth/commit/6758231905d2e86a7b3f058dd05c17ba739aa80f), [`54fab08`](https://github.com/better-auth/better-auth/commit/54fab084469a27257e66a0814523ebac7145ef5d), [`c4d1dda`](https://github.com/better-auth/better-auth/commit/c4d1ddaa952eab7edfec942fab223f35798518ab)]：
  - @better-auth/core@1.6.24

## 1.6.23

### 补丁更新

- [#10257](https://github.com/better-auth/better-auth/pull/10257) [`930b260`](https://github.com/better-auth/better-auth/commit/930b260cfd402e9f8886719a3ced503b9ceff7f6) 感谢 [@bytaesu](https://github.com/bytaesu)！- 修复 `updateMany` 和 `deleteMany` 在 Cloudflare D1 以及 postgres-js / bun-sql 驱动中报告受影响行数为 0 的问题。

- 更新的依赖项 []：
  - @better-auth/core@1.6.23

## 1.6.22

### 补丁更新

- 更新的依赖项 [[`8bd43d9`](https://github.com/better-auth/better-auth/commit/8bd43d9d8312fd9ddbfb8fb5c827cf0a0e55132d)]：
  - @better-auth/core@1.6.22

## 1.6.21

### 补丁更新

- 更新的依赖项 [[`90d509e`](https://github.com/better-auth/better-auth/commit/90d509e0b9f72614170ad7124ae9d3a7a97d7d3a), [`816d7f9`](https://github.com/better-auth/better-auth/commit/816d7f92522518e90d437c2a366d75db56690f86), [`570267c`](https://github.com/better-auth/better-auth/commit/570267cd5e782f018933ce3af4f51dbd250bf7de), [`5953157`](https://github.com/better-auth/better-auth/commit/5953157acf619bcb8233c91952b1e4072202f055)]：
  - @better-auth/core@1.6.21

## 1.6.20

### 补丁更新

- 更新的依赖项 []：
  - @better-auth/core@1.6.20

## 1.6.19

### 补丁更新

- [#10081](https://github.com/better-auth/better-auth/pull/10081) [`0895993`](https://github.com/better-auth/better-auth/commit/08959936d29de8a37d469e42d9077859b643d6b3) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 密码重置令牌在被重置流程使用后，现在可与 Drizzle MySQL 适配器正常配合使用。

  适配器身份验证流程测试现在涵盖密码重置和重放拒绝；包装后的适配器会在可用时测试其原生单次使用消费和受保护的递增行为。

- 更新的依赖项 [[`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63), [`a787e0b`](https://github.com/better-auth/better-auth/commit/a787e0b66b368a1af0b4ba17c9750c2839668246)]：
  - @better-auth/core@1.6.19

## 1.6.18

### 补丁更新

- 更新的依赖项 [[`b21a5f7`](https://github.com/better-auth/better-auth/commit/b21a5f7f6ca1f63c6b69666a498b4227b15e316c)]：
  - @better-auth/core@1.6.18

## 1.6.17

### 补丁更新

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在默认配置（未启用适配器事务）下，memory、Kysely、Drizzle、Prisma 和 MongoDB 适配器中的计数器更新（用于速率限制和 API 密钥使用量限制）现在是原子的。每个适配器都将 `incrementOne` 实现为单条语句。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- `updateMany` 现在会按照适配器契约的规定，返回受影响的行数。

- 更新的依赖项 [[`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7), [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc), [`1dbf5bb`](https://github.com/better-auth/better-auth/commit/1dbf5bb59de5d628f0d07d5e846eba8287b831d7), [`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7)]：
  - @better-auth/core@1.6.17

## 1.6.16

### 补丁更新

- 已更新依赖项 [[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15), [`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)]：
  - @better-auth/core@1.6.16

## 1.6.15

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.6.15

## 1.6.14

### 补丁变更

- 已更新依赖项 [[`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - @better-auth/core@1.6.14

## 1.6.13

### 补丁变更

- 已更新依赖项 [[`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8), [`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2), [`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a), [`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - @better-auth/core@1.7.0-beta.4

## 1.7.0-beta.3

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-beta.3

## 1.7.0-beta.2

### 补丁变更

- [#9165](https://github.com/better-auth/better-auth/pull/9165) [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- chore(adapters)：要求使用已修补的 `drizzle-orm` 和 `kysely` 对等依赖版本

  将 `drizzle-orm` 对等依赖的版本范围收窄至 `^0.45.2`，将 `kysely` 对等依赖的版本范围收窄至 `^0.28.14`。这两个新范围都锁定在包含漏洞修复的小版本线，不包含更高版本，因此适配器仅声明支持经过实际测试的版本。使用较旧 ORM 版本的用户会在安装时收到警告，并可与适配器一起升级；该对等依赖标记为可选，因此安装不会失败。

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-beta.2

## 1.7.0-beta.1

## 1.6.10

### 补丁变更

- 已更新依赖项 [[`2220a6d`](https://github.com/better-auth/better-auth/commit/2220a6d6c25ebd24c8568131636389dc0c12f82b)]：
  - @better-auth/core@1.6.10

## 1.6.9

### 补丁变更

- 已更新依赖项 [[`815ecf6`](https://github.com/better-auth/better-auth/commit/815ecf62b6f6c5bf656ab55da393ce63d7eed0a6)]：
  - @better-auth/core@1.6.9

## 1.6.8

### 补丁变更

- 已更新依赖项 [[`9aa8e63`](https://github.com/better-auth/better-auth/commit/9aa8e63de84549634216e13e407cf6d8aa61acc3)]：
  - @better-auth/core@1.6.8

## 1.6.7

### 补丁变更

- 已更新依赖项 [[`307196a`](https://github.com/better-auth/better-auth/commit/307196a405e067f4a863de2ed68528e8d4bdc162), [`4a180f0`](https://github.com/better-auth/better-auth/commit/4a180f0b0c084c59e7b006058d3fdbd8542face5), [`4f373ee`](https://github.com/better-auth/better-auth/commit/4f373eed8a42e02460dbd2ee9973b9493cea04eb)]：
  - @better-auth/core@1.6.7

## 1.6.6

### 补丁变更

- 已更新依赖项 [[`b5742f9`](https://github.com/better-auth/better-auth/commit/b5742f9d08d7c6ae0848279b79c8bcc0a09082d7), [`a844c7d`](https://github.com/better-auth/better-auth/commit/a844c7dd087715678787cb10bf9670fad46e535b), [`e64ff72`](https://github.com/better-auth/better-auth/commit/e64ff720fb8514cb78aedd1660223d8b948284da)]：
  - @better-auth/core@1.6.6

## 1.6.5

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-beta.1

## 1.7.0-beta.0

### 补丁变更

- 已更新依赖项 [[`93d3871`](https://github.com/better-auth/better-auth/commit/93d3871bd2f7c2fdd423c4c88a22a50b6333e656)]：
  - @better-auth/core@1.7.0-beta.0
  - @better-auth/core@1.6.5

## 1.6.4

### 补丁变更

- [#9165](https://github.com/better-auth/better-auth/pull/9165) [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- chore(adapters)：要求使用已修补的 `drizzle-orm` 和 `kysely` 对等依赖版本

  将 `drizzle-orm` 对等依赖的版本范围收窄至 `^0.45.2`，将 `kysely` 对等依赖的版本范围收窄至 `^0.28.14`。这两个新范围都锁定在包含漏洞修复的小版本线，不包含更高版本，因此适配器仅声明支持经过实际测试的版本。使用较旧 ORM 版本的用户会在安装时收到警告，并可与适配器一起升级；该对等依赖标记为可选，因此安装不会失败。

- 已更新依赖项 []：
  - @better-auth/core@1.6.4

## 1.6.3

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.6.3

## 1.6.2

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.6.2

## 1.6.1

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.6.1

## 1.6.0

### 次要变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为数据库适配器添加不区分大小写的查询支持

### 补丁变更

- 已更新依赖项 [[`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33)]：
  - @better-auth/core@1.6.0

## 1.6.0-beta.0

### 次要变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 为数据库适配器添加不区分大小写的查询支持

### 补丁变更

- 已更新依赖项 [[`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b)]：
  - @better-auth/core@1.6.0-beta.0
