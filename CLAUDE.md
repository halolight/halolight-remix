# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Halolight Remix 是一个基于 React Router 7 (原 Remix) 的现代化中文后台管理系统，具备全栈路由、服务端渲染和渐进增强能力。

- **在线预览**: https://halolight-remix.h7ml.cn
- **文档地址**: https://halolight.docs.h7ml.cn
- **GitHub**: https://github.com/halolight/halolight-remix

## 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 核心框架 | React Router + React | 7.x + 19.x |
| 构建工具 | Vite | 7.x |
| 类型系统 | TypeScript | 5.9 |
| 样式方案 | Tailwind CSS | 4.x |
| 状态管理 | Zustand | 5.x |
| UI 组件 | Radix UI | latest |
| 图表 | Recharts | 3.x |
| 测试 | Vitest + Testing Library | 4.x |
| 部署 | Cloudflare Pages | - |

## 常用命令

```bash
pnpm dev          # 启动开发服务器 (http://localhost:5173)
pnpm build        # 生产构建
pnpm start        # 启动生产服务器
pnpm typecheck    # 类型检查 (react-router typegen && tsc)
pnpm lint         # ESLint 检查
pnpm lint:fix     # ESLint 自动修复
pnpm test         # 运行测试 (监视模式)
pnpm test:run     # 运行测试 (单次)
pnpm test:coverage # 测试覆盖率报告
pnpm preview      # 本地预览 Cloudflare 部署
pnpm deploy       # 部署到 Cloudflare Pages
```

## 目录结构

```
app/
├── components/              # 组件库
│   ├── ui/                  # 基础 UI 组件
│   │   ├── button.tsx       # 按钮 (cva variants)
│   │   ├── card.tsx         # 卡片
│   │   ├── dialog.tsx       # 对话框
│   │   ├── dropdown-menu.tsx # 下拉菜单
│   │   ├── input.tsx        # 输入框
│   │   ├── select.tsx       # 选择器
│   │   ├── table.tsx        # 表格
│   │   ├── tabs.tsx         # 标签页
│   │   └── ...              # 更多 Radix UI 封装
│   ├── layout/              # 布局组件
│   │   ├── footer.tsx       # 页脚
│   │   ├── tab-bar.tsx      # 标签栏
│   │   └── quick-settings.tsx # 快捷设置面板
│   ├── auth/                # 认证组件
│   │   └── auth-shell.tsx   # 认证页面外壳
│   ├── admin-layout.tsx     # 后台布局
│   └── theme-provider.tsx   # 主题提供者
├── hooks/                   # React Hooks
│   └── use-chart-palette.ts # 图表调色板
├── lib/                     # 工具库
│   ├── utils.ts             # cn() 类名合并 (clsx + tailwind-merge)
│   ├── meta.ts              # TDK 元信息生成
│   └── project-info.ts      # 项目基本信息
├── routes/                  # 文件路由
│   ├── _index.tsx           # 首页 (仪表盘)
│   ├── login.tsx            # 登录
│   ├── register.tsx         # 注册
│   ├── forgot-password.tsx  # 忘记密码
│   ├── reset-password.tsx   # 重置密码
│   ├── users.tsx            # 用户管理
│   ├── settings.tsx         # 系统设置
│   ├── profile.tsx          # 个人中心
│   ├── analytics.tsx        # 数据分析
│   └── +types/              # 自动生成的路由类型
├── stores/                  # Zustand 状态管理
│   ├── tabs-store.ts        # 标签页状态 (persist)
│   └── ui-settings-store.ts # UI 设置状态 (皮肤/布局)
├── root.tsx                 # 应用根组件
├── routes.ts                # 路由配置
└── app.css                  # 全局样式 (OKLch 主题变量)

tests/                       # 测试文件
├── setup.ts                 # 测试环境配置
├── lib/                     # 工具函数测试
│   ├── utils.test.ts
│   ├── meta.test.ts
│   └── project-info.test.ts
├── stores/                  # Store 测试
│   ├── tabs-store.test.ts
│   └── ui-settings-store.test.ts
└── components/              # 组件测试
    ├── button.test.tsx
    └── footer.test.tsx

.github/workflows/ci.yml     # GitHub Actions CI
wrangler.json                # Cloudflare 配置
vitest.config.ts             # Vitest 配置
eslint.config.js             # ESLint 配置
```

## React Router 7 核心概念

### 路由文件约定

```
_index.tsx        → /          (索引路由)
about.tsx         → /about     (静态路由)
users.tsx         → /users     (静态路由)
users.$id.tsx     → /users/:id (动态路由)
_layout.tsx       → 布局路由 (下划线前缀)
$.tsx             → 通配符路由
```

### Loader/Action 模式

```tsx
// app/routes/dashboard.tsx
import type { Route } from "./+types/dashboard";

// loader: 服务端数据加载 (GET)
export async function loader({ request }: Route.LoaderArgs) {
  return { user: await getUser(request) };
}

// action: 处理表单提交 (POST/PUT/DELETE)
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  return await updateUser(formData);
}

// meta: TDK 元信息
export function meta(): Route.MetaDescriptors {
  return generateMeta("/dashboard");
}

// 默认导出: 页面组件
export default function Dashboard({ loaderData }: Route.ComponentProps) {
  return <main>Welcome, {loaderData.user.name}</main>;
}
```

### 数据使用

```tsx
import { useLoaderData, useActionData, Form } from "react-router";

export default function Page() {
  const { data } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  return (
    <Form method="post">
      <input name="title" defaultValue={data.title} />
      {actionData?.error && <p>{actionData.error}</p>}
      <button type="submit">保存</button>
    </Form>
  );
}
```

## 状态管理

### Tabs Store (标签页)

```tsx
import { useTabsStore } from "~/stores/tabs-store";

// 添加标签
const tabId = useTabsStore.getState().addTab({
  title: "用户管理",
  path: "/users",
});

// 移除标签
useTabsStore.getState().removeTab(tabId);

// 切换活动标签
useTabsStore.getState().setActiveTab(tabId);
```

### UI Settings Store (皮肤/布局)

```tsx
import { useUiSettingsStore } from "~/stores/ui-settings-store";

// 切换皮肤 (11 种预设)
useUiSettingsStore.getState().setSkin("ocean");

// 切换页脚/标签栏显示
useUiSettingsStore.getState().setShowFooter(false);
useUiSettingsStore.getState().setShowTabBar(true);
```

## 主题系统

### 皮肤预设

11 种内置皮肤：`default`, `blue`, `emerald`, `amber`, `violet`, `rose`, `teal`, `slate`, `ocean`, `sunset`, `aurora`

### CSS 变量 (OKLch)

```css
/* app/app.css */
:root {
  --background: 100% 0 0;           /* oklch(100% 0 0) */
  --foreground: 14.9% 0.017 285.75; /* oklch(14.9% 0.017 285.75) */
  --primary: 51.1% 0.262 276.97;    /* 主色调 */
  --primary-foreground: 100% 0 0;
  /* ... */
}

[data-skin="ocean"] {
  --primary: 54.3% 0.195 240.03;    /* 海洋蓝 */
}
```

## 测试

### 运行测试

```bash
pnpm test:run      # 单次运行
pnpm test          # 监视模式
pnpm test:coverage # 覆盖率报告
```

### 测试示例

```tsx
// tests/stores/tabs-store.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { useTabsStore } from "~/stores/tabs-store";

describe("useTabsStore", () => {
  beforeEach(() => {
    useTabsStore.getState().clearTabs();
  });

  it("应该添加新标签", () => {
    const { addTab } = useTabsStore.getState();
    addTab({ title: "用户管理", path: "/users" });

    const { tabs } = useTabsStore.getState();
    expect(tabs).toHaveLength(2); // home + users
  });
});
```

## 代码规范

- **类型安全**: 使用 `Route.LoaderArgs`、`Route.ActionArgs` 等自动生成类型
- **路径别名**: 使用 `~/` 导入 app 目录下的模块
- **样式工具**: 使用 `cn()` 合并 Tailwind 类名
- **组件导出**: UI 组件使用命名导出，页面组件使用默认导出
- **状态持久化**: Zustand store 使用 `persist` 中间件

## 新增功能开发指南

### 添加新页面

1. 在 `app/routes/` 下创建文件
2. 在 `app/lib/meta.ts` 的 `pageMetas` 中添加 TDK 配置
3. 如需新组件，在 `app/components/` 下创建

```tsx
// app/routes/example.tsx
import type { Route } from "./+types/example";
import { generateMeta } from "~/lib/meta";

export function meta(): Route.MetaDescriptors {
  return generateMeta("/example");
}

export default function ExamplePage() {
  return (
    <div className="p-4">
      <h1>示例页面</h1>
    </div>
  );
}
```

### 添加新 UI 组件

```tsx
// app/components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "~/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: React.ReactNode;
}

export function Badge({ className, variant, children }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  );
}
```

## CI/CD

GitHub Actions 自动执行：
- ESLint 代码检查
- TypeScript 类型检查
- Vitest 单元测试
- 生产构建验证
- 依赖安全审计

## 注意事项

- **服务端优先**: loader/action 在服务端执行，不要使用 `window`/`document`
- **类型生成**: 运行 `pnpm typecheck` 自动生成路由类型到 `+types/`
- **渐进增强**: Form 组件在 JS 禁用时仍可通过原生表单提交
- **皮肤切换**: 通过 `data-skin` 属性应用不同主题变量
