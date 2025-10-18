# Agent Benchmark 前端工程

该项目基于 Next.js App Router + TypeScript + TailwindCSS，提供 Agent Benchmark 平台的交互层实现，并内置多语言、主题 Token 与组件封装规范。

## 快速上手

```bash
pnpm install                # 安装依赖
pnpm dev                    # 启动本地开发（默认端口 3000）
pnpm lint                   # 执行 ESLint 规范校验
pnpm build && pnpm start    # 生产构建与预览

pnpm storybook              # 启动组件联调环境（端口 6006）
pnpm storybook:build        # 生成静态 Storybook 用于 CI/CD 发布
pnpm test:visual            # Storybook 测试占位脚本，接入视觉回归后执行
```

> 推荐使用 Node.js 20+ 与 pnpm 10+。

## 技术栈与核心库

- Next.js 14（App Router）+ React 18
- TailwindCSS 3 自定义 Token，配合 `src/theme/tokens.ts` 暴露的 `useThemeTokens`
- 国际化：`next-intl`，多语言文案位于 `src/messages/*`
- 数据与状态：`@tanstack/react-query`、`zustand`
- Web3 能力：`wagmi`、`viem`、`@rainbow-me/rainbowkit`
- UI：`@ant-design/pro-components` 以及定制的基础组件库（`src/components/ui`）

## 设计与工程规范速查

- **版心宽度**：桌面端 1440px，移动端默认单列滚动；使用 `.layout-container` 保持左右 24px 内边距。
- **文字层级**：H1 28px/700、H2 24px/600、H3 20px/600、正文 16px/400；对应样式已在 `globals.css` 统一设置。
- **按钮高度**：40/48/56px（sm/md/lg），圆角 `rounded-full`，禁用态统一灰度。
- **卡片规范**：统一使用 `.card` 工具类提供的圆角、描边与阴影，避免在组件内重复定义。
- **色板与间距**：详见 `tailwind.config.ts`，严禁在业务组件中随意引入未定义的颜色或自定义像素值。
- **国际化**：所有可见文案从 `useTranslations` 读取；新增 key 后需同步更新中英文 JSON。

## 目录结构

```
src/
  app/               # App Router 入口、全局样式与页面
  components/        # 公共组件（layout / navigation / ui）
  i18n/              # 多语言设置与工具
  messages/          # 多语言资源文件
  theme/             # 主题 Token 与相关工具函数
```

## 后续待办

1. Storybook 场景与视觉回归（Chromatic / Loki）落地后，补充 CI 说明并更新 `pnpm test:visual` 执行逻辑。
2. 引入 React Query、Zustand、Web3 相关模块的实际业务封装，完成状态管理基建。
3. 结合文档沉淀的设计约束，持续扩充 `@/components/ui` 复用组件。
