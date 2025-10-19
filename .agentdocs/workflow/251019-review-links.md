# Dashboard 子页与 Profile 页面补齐（2025-10-19）

## 背景
- 导航 CTA 指向的 `dashboard` 子路径与 `profile` 页面尚未实现，用户会遇到 404 或空白锚点。
- 需要在 App Router 下提供最小可用页面骨架，方便后续接入真实业务。

## 结论
- 新增路由：`/[locale]/dashboard/submissions|invites|security|audit` 与 `/[locale]/profile`，确保所有导航链路可达。
- `Dashboard` 主页面补充 `#treasury` 板块，匹配“资金台账”入口锚点。
- 国际化文案扩展 `dashboard.pages.*` 与 `profile` 节点，中英文保持同步。

## TODO
- [x] 创建子页组件并复用通用 `PageHero`/`Section`/`EmptyState` 结构。
- [x] 补充 i18n 文案及示例数据。
- [x] 更新导航与文档索引，执行 `pnpm run build` 验证。
