# @better-auth/kysely-adapter

## 1.7.6

### 补丁变更

- [#11366](https://github.com/better-auth/better-auth/pull/11366) [`d41e2ca`](https://github.com/better-auth/better-auth/commit/d41e2caf1a5bf09afc916087b739e0a5d00ab5c5) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当 Kysely 方言无法内省 Cloudflare D1 时，使用针对性的 PRAGMA 查询。

- [#11333](https://github.com/better-auth/better-auth/pull/11333) [`631ac29`](https://github.com/better-auth/better-auth/commit/631ac296a55ccecf51a7995e89a3e528a5f782da) 感谢 [@bytaesu](https://github.com/bytaesu)！- 当自定义模型名称与另一个架构键匹配时，保留逻辑模型标识。

- [#11374](https://github.com/better-auth/better-auth/pull/11374) [`2b13e01`](https://github.com/better-auth/better-auth/commit/2b13e011b4a4f8be4e4c39573b9e962cbabb2094) 感谢 [@bytaesu](https://github.com/bytaesu)！- 在架构验证期间正确检测由数据库生成的 SQLite 主键，包括不带 `AUTOINCREMENT` 的 `INTEGER PRIMARY KEY` 列。

## 1.7.5

### 补丁变更

- [#11203](https://github.com/better-auth/better-auth/pull/11203) [`cb627eb`](https://github.com/better-auth/better-auth/commit/cb627ebeb174d9a35ccc79018110bbc7a50a6fb8) 感谢 [@dshukertjr](https://github.com/dshukertjr)！- 为直接 PostgreSQL 连接添加 `database.schemaName` 选项。设置后，适配器和 CLI 会在每条语句中限定该架构，因此 `auth generate` 会写入一份带架构限定的迁移，在创建表之前创建架构，而不是依赖连接的 `search_path`。

## 1.7.4

## 1.7.3

### 补丁变更

- [#11178](https://github.com/better-auth/better-auth/pull/11178) [`be0e007`](https://github.com/better-auth/better-auth/commit/be0e007e20ea310aa533acf49edfae34cfc797a9) 感谢 [@bytaesu](https://github.com/bytaesu)！- 报告缺失的表、缺失的列，以及初始化期间 Better Auth 从不写入的必需列，并提供修复指导。Kysely 会检查实时数据库架构。身份验证请求会等待同一项检查；如果架构不匹配，请求将被拒绝。

  默认启用验证，包括在生产环境中。设置 `advanced.database.validateSchema: false` 可禁用运行时验证。当必需但不会写入的列需要手动修复时，`auth migrate` 会拒绝应用变更。

## 1.7.2

### 补丁变更

- [#10875](https://github.com/better-auth/better-auth/pull/10875) [`d5d889b`](https://github.com/better-auth/better-auth/commit/d5d889bfd8708601d8f27526d35fb9568450b51e) 感谢 [@bytaesu](https://github.com/bytaesu)！- 修复 Cloudflare D1 上程序化迁移失败的问题，同时保留对受支持数据库中现有索引的验证。

## 1.7.1

## 1.7.0

### 次要变更

- [#10622](https://github.com/better-auth/better-auth/pull/10622) [`ecd83da`](https://github.com/better-auth/better-auth/commit/ecd83daa01ec482d31667019737cb6697f03da0b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 现在，直接作为 `database` 传入的原始数据库实例（better-sqlite3、`node:sqlite`、`bun:sqlite`、`mysql2`、`pg`）会自动使用原生适配器事务，与显式 `{ db }`/`{ dialect }` 配置形式的行为一致。当数据库以快速入门中的 `database: new Database(...)` 形式提供时，这让需要原生事务的插件（例如 `@better-auth/scim`）也能正常工作。

  Cloudflare D1 仍会报告不支持原生事务，因为 D1 不支持交互式事务。

### 补丁变更

- [#10377](https://github.com/better-auth/better-auth/pull/10377) [`e4818b5`](https://github.com/better-auth/better-auth/commit/e4818b545984dce99e3c798ead5691c5bf775a70) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 通过使用本地镜像的迁移表常量，修复 Kysely 0.29 下的 SQLite 方言打包问题。

## 1.7.0-rc.6

## 1.7.0-rc.5

## 1.7.0-rc.4

## 1.7.0-rc.3

### 次要变更

- [#10622](https://github.com/better-auth/better-auth/pull/10622) [`ecd83da`](https://github.com/better-auth/better-auth/commit/ecd83daa01ec482d31667019737cb6697f03da0b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 现在，直接作为 `database` 传入的原始数据库实例（better-sqlite3、`node:sqlite`、`bun:sqlite`、`mysql2`、`pg`）会自动使用原生适配器事务，与显式 `{ db }`/`{ dialect }` 配置形式的行为一致。当数据库以快速入门中的 `database: new Database(...)` 形式提供时，这让需要原生事务的插件（例如 `@better-auth/scim`）也能正常工作。

  Cloudflare D1 仍会报告不支持原生事务，因为 D1 不支持交互式事务。

## 1.7.0-rc.2

### 补丁变更

- [#10377](https://github.com/better-auth/better-auth/pull/10377) [`e4818b5`](https://github.com/better-auth/better-auth/commit/e4818b545984dce99e3c798ead5691c5bf775a70) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 通过使用本地镜像的迁移表常量，修复 Kysely 0.29 下的 SQLite 方言打包问题。

## 1.7.0-rc.1

## 1.7.0-rc.0

## 1.7.0-beta.10

## 1.7.0-beta.9

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-beta.9

## 1.7.0-beta.8

### 补丁变更

- 已更新依赖项 [[`7c7313c`](https://github.com/better-auth/better-auth/commit/7c7313c8189baabd11a2ecb681bd2b16eb40fa4d)、[`97903c9`](https://github.com/better-auth/better-auth/commit/97903c9cca47f5fa62cf1d2ab86f6228db04aff0)、[`3a79aff`](https://github.com/better-auth/better-auth/commit/3a79aff58ed82e45caf04c2ee4acaf0f4d09a86c)]：
  - @better-auth/core@1.7.0-beta.8

## 1.7.0-beta.7

### 补丁变更

- 已更新依赖项 [[`3d04fab`](https://github.com/better-auth/better-auth/commit/3d04fababbf3efd4c46a4012f46ed9397715c2e3)、[`de8394d`](https://github.com/better-auth/better-auth/commit/de8394de207bae2fe9d0b8d7e901a196c1dc08d0)]：
  - @better-auth/core@1.7.0-beta.7

## 1.7.0-beta.6

### 补丁变更

- 已更新依赖项 [[`aedcb97`](https://github.com/better-auth/better-auth/commit/aedcb974f055c3514fe0464dc53d71d45a8a1725)、[`2196ea6`](https://github.com/better-auth/better-auth/commit/2196ea65e724830d9f1066c6593210579de586b9)]：
  - @better-auth/core@1.7.0-beta.6

## 1.7.0-beta.5

### 补丁变更

- 已更新依赖项 [[`7fe0e2b`](https://github.com/better-auth/better-auth/commit/7fe0e2b165c17207a43863b0f1c12c401976d6b2)、[`4f53b61`](https://github.com/better-auth/better-auth/commit/4f53b61f49b470a40ccab18fe1fe4d80f225905f)、[`91f235f`](https://github.com/better-auth/better-auth/commit/91f235f8604cd432749adf18c7bd7d658aa1519b)、[`41cca60`](https://github.com/better-auth/better-auth/commit/41cca606d14e7b8a1d16da662d644ca39fe4281f)]：
  - @better-auth/core@1.7.0-beta.5

## 1.7.0-beta.4

## 1.6.30

### 补丁变更

- 已更新依赖项 [[`07c1718`](https://github.com/better-auth/better-auth/commit/07c17189f58502bf038e5f22766f8a99df60ac99)]：
  - @better-auth/core@1.6.30

## 1.6.29

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.6.29

## 1.6.28

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.6.28

## 1.6.27

### 补丁变更

- 已更新依赖项 [[`2ae491e`](https://github.com/better-auth/better-auth/commit/2ae491eac3ece50839a0eb2d4f868c4deedac67b)]：
  - @better-auth/core@1.6.27

## 1.6.26

### 补丁变更

- 已更新依赖项 [[`a30e274`](https://github.com/better-auth/better-auth/commit/a30e274b5daed6057086d76b91d17abfa02196d7)]：
  - @better-auth/core@1.6.26

## 1.6.25

### 补丁变更

- 已更新依赖项 [[`0ffd1fb`](https://github.com/better-auth/better-auth/commit/0ffd1fb28d44a8266d62791cd4c97e263444d03b)]：
  - @better-auth/core@1.6.25

## 1.6.24

### 补丁变更

- 已更新依赖项 [[`6758231`](https://github.com/better-auth/better-auth/commit/6758231905d2e86a7b3f058dd05c17ba739aa80f)、[`54fab08`](https://github.com/better-auth/better-auth/commit/54fab084469a27257e66a0814523ebac7145ef5d)、[`c4d1dda`](https://github.com/better-auth/better-auth/commit/c4d1ddaa952eab7edfec942fab223f35798518ab)]：
  - @better-auth/core@1.6.24

## 1.6.23

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.6.23

## 1.6.22

### 补丁变更

- 已更新依赖项 [[`8bd43d9`](https://github.com/better-auth/better-auth/commit/8bd43d9d8312fd9ddbfb8fb5c827cf0a0e55132d)]：
  - @better-auth/core@1.6.22

## 1.6.21

### 补丁变更

- [#10180](https://github.com/better-auth/better-auth/pull/10180) [`90d509e`](https://github.com/better-auth/better-auth/commit/90d509e0b9f72614170ad7124ae9d3a7a97d7d3a) 感谢 [@ping-maxwell](https://github.com/ping-maxwell)！- 当没有行匹配或调用时未提供谓词，`adapter.update` 现在会返回 `null`。如需有意执行批量更新，请使用 `updateMany`。

  Kysely MySQL 适配器在受保护的更新未命中时不再返回行。带有 `id` 守卫的更新即使 `id` 不是第一个谓词，也会返回目标行。请保持启用 MySQL 的匹配行语义；mysql2 默认通过 `FOUND_ROWS` 启用此语义，禁用它可能会让幂等更新看起来像未命中。

  当更新守卫排除了目标行时，Prisma 适配器现在会返回 `null`，而不是抛出 Prisma 的未找到异常。共享适配器测试套件现在也会断言适配器实现具有相同的失败关闭更新行为。

- 已更新依赖项 [[`90d509e`](https://github.com/better-auth/better-auth/commit/90d509e0b9f72614170ad7124ae9d3a7a97d7d3a)、[`816d7f9`](https://github.com/better-auth/better-auth/commit/816d7f92522518e90d437c2a366d75db56690f86)、[`570267c`](https://github.com/better-auth/better-auth/commit/570267cd5e782f018933ce3af4f51dbd250bf7de)、[`5953157`](https://github.com/better-auth/better-auth/commit/5953157acf619bcb8233c91952b1e4072202f055)]：
  - @better-auth/core@1.6.21

## 1.6.20

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.6.20

## 1.6.19

### 补丁变更

- 已更新依赖项 [[`5bd5e1c`](https://github.com/better-auth/better-auth/commit/5bd5e1cc73d2c9c38e69011f03038b61a4312a63)、[`a787e0b`](https://github.com/better-auth/better-auth/commit/a787e0b66b368a1af0b4ba17c9750c2839668246)]：
  - @better-auth/core@1.6.19

## 1.6.18

### 补丁变更

- 已更新依赖项 [[`b21a5f7`](https://github.com/better-auth/better-auth/commit/b21a5f7f6ca1f63c6b69666a498b4227b15e316c)]：
  - @better-auth/core@1.6.18

## 1.6.17

### 补丁变更

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 在默认配置下（未启用适配器事务），内存、Kysely、Drizzle、Prisma 和 MongoDB 适配器中的计数器更新（用于速率限制和 API 密钥使用限制）现在是原子的。每个适配器都会以单条语句原生实现 `incrementOne`。

- [#9993](https://github.com/better-auth/better-auth/pull/9993) [`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- 现在，使用 Bun 和 Node 驱动程序执行的 SQLite 变更会报告受影响行数和插入行 ID，因此写入不再被误认为影响了零行。Bun 驱动程序也能正确绑定多个查询参数。`consumeOne` 现在可用于没有 `LIMIT` 子句的 SQL Server。

- 已更新依赖项 [[`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc)、[`7343284`](https://github.com/better-auth/better-auth/commit/73432841493a2d99144786c986ee57c071d816d8)、[`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7)、[`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc)、[`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7)、[`baeaa00`](https://github.com/better-auth/better-auth/commit/baeaa00bc2a600c04f746c7cc2a07065b7691dcc)、[`1dbf5bb`](https://github.com/better-auth/better-auth/commit/1dbf5bb59de5d628f0d07d5e846eba8287b831d7)、[`fdef997`](https://github.com/better-auth/better-auth/commit/fdef997eb944d85254816f7a4b2d76c06e9b8ec7)]：
  - @better-auth/core@1.6.17

## 1.6.16

### 补丁变更

- 已更新依赖项 [[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)、[`cb1cbfa`](https://github.com/better-auth/better-auth/commit/cb1cbfa4ccba1ce13f7fea419a6fc37dcbdc2f15)]：
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

- 已更新依赖项 [[`e7eb45b`](https://github.com/better-auth/better-auth/commit/e7eb45b065903f5fccddae491696cb069814a3c8)、[`03e6c94`](https://github.com/better-auth/better-auth/commit/03e6c94e965a7e87c1d44074b8e90257cb1f1cd2)、[`1e5b808`](https://github.com/better-auth/better-auth/commit/1e5b80847208cf839c9d45363ca19b8eab41c68a)、[`13abc79`](https://github.com/better-auth/better-auth/commit/13abc7922b47f800da59ca212d364a64feeec91f)]：
  - @better-auth/core@1.7.0-beta.4

## 1.7.0-beta.3

### 补丁变更

- 已更新依赖项 []：
  - @better-auth/core@1.7.0-beta.3

## 1.7.0-beta.2

### 补丁变更

- [#9165](https://github.com/better-auth/better-auth/pull/9165) [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！- chore(adapters)：要求使用已修补的 `drizzle-orm` 和 `kysely` 对等版本

  将 `drizzle-orm` 对等依赖版本范围收窄至 `^0.45.2`，将 `kysely` 对等依赖版本范围收窄至 `^0.28.14`。两个新的版本范围都对应包含漏洞修复的次要版本系列，不包含更新的版本，因此适配器仅声明支持实际测试过的版本。使用较旧 ORM 版本的用户会在安装时收到警告，并可与适配器一同升级；该对等依赖标记为可选，因此安装不会硬性失败。

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

- [#9165](https://github.com/better-auth/better-auth/pull/9165) [`39d6af2`](https://github.com/better-auth/better-auth/commit/39d6af2a392dc41018a036d1d909dc48c09749c9) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - chore(adapters)：要求使用已修补的 `drizzle-orm` 和 `kysely` 对等依赖版本

  将 `drizzle-orm` 对等依赖版本范围缩小至 `^0.45.2`，并将 `kysely` 对等依赖版本范围缩小至 `^0.28.14`。这两个新的范围都限定在包含漏洞修复的次要版本系列，不包含更新的版本，因此适配器只声明支持实际经过测试的版本。使用较旧 ORM 版本的使用者会在安装时看到警告，可与适配器一同升级；该对等依赖项标记为可选，因此安装不会硬性失败。

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

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 为数据库适配器添加不区分大小写的查询支持

### 补丁变更

- [#8836](https://github.com/better-auth/better-auth/pull/8836) [`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 从 D1 方言中移除已弃用的 `numUpdatedOrDeletedRows`

- 已更新依赖项 [[`5dd9e44`](https://github.com/better-auth/better-auth/commit/5dd9e44c041839bf269056cb246fd617abe6cd33)]：
  - @better-auth/core@1.6.0

## 1.6.0-beta.0

### 次要变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 为数据库适配器添加不区分大小写的查询支持

### 补丁变更

- [`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b) 感谢 [@gustavovalverde](https://github.com/gustavovalverde)！ - 从 D1 方言中移除已弃用的 `numUpdatedOrDeletedRows`

- 已更新依赖项 [[`28b1291`](https://github.com/better-auth/better-auth/commit/28b1291a86d726b8f2602bf1f4898451cf7c195b)]：
  - @better-auth/core@1.6.0-beta.0
