# Halolight Remix

[![CI](https://github.com/halolight/halolight-remix/actions/workflows/ci.yml/badge.svg)](https://github.com/halolight/halolight-remix/actions/workflows/ci.yml)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/halolight/halolight-remix/blob/main/LICENSE)
[![React Router](https://img.shields.io/badge/React%20Router-7-%23CA4245.svg)](https://reactrouter.com/)
[![React](https://img.shields.io/badge/React-19-%2361DAFB.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-%233178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-%2306B6D4.svg)](https://tailwindcss.com/)

基于 React Router 7 (原 Remix) 的现代化中文后台管理系统，具备全栈路由、服务端渲染和渐进增强能力。

- **在线预览**：<https://halolight-remix.h7ml.cn>
- **文档地址**：<https://halolight.docs.h7ml.cn>
- **GitHub**：<https://github.com/halolight/halolight-remix>

## 功能特性

- **全栈路由** - 统一的路由层处理数据加载和表单提交
- **服务端渲染** - 开箱即用的 SSR 支持，SEO 友好
- **渐进增强** - JS 禁用时表单仍可工作
- **类型安全** - 自动生成的路由类型定义
- **主题系统** - 11 种皮肤预设 + 深色模式
- **多标签页** - 标签栏 + 右键菜单管理
- **响应式布局** - 移动端适配 + 侧边栏折叠
- **完整认证** - 登录/注册/忘记密码/重置密码

## 技术栈

| 类别 | 技术 |
|------|------|
| 核心框架 | React Router 7 + React 19 |
| 类型系统 | TypeScript 5.9 |
| 构建工具 | Vite 7 |
| 样式方案 | Tailwind CSS 4 + OKLch 色彩 |
| 状态管理 | Zustand 5 |
| UI 组件 | Radix UI + shadcn/ui 风格 |
| 图表可视化 | Recharts |
| 测试框架 | Vitest + Testing Library |
| 部署平台 | Cloudflare Pages |

## 目录结构

```
app/
├── components/           # 组件库
│   ├── ui/              # 基础 UI 组件 (Button, Card, Dialog...)
│   ├── layout/          # 布局组件 (Footer, TabBar, QuickSettings)
│   └── auth/            # 认证组件
├── hooks/               # React Hooks
├── lib/                 # 工具库
│   ├── utils.ts         # 通用工具 (cn 类名合并)
│   ├── meta.ts          # TDK 元信息
│   └── project-info.ts  # 项目信息
├── routes/              # 文件路由
│   ├── _index.tsx       # 首页 (仪表盘)
│   ├── login.tsx        # 登录
│   ├── register.tsx     # 注册
│   ├── users.tsx        # 用户管理
│   └── +types/          # 自动生成类型
├── stores/              # Zustand 状态
│   ├── tabs-store.ts    # 标签页状态
│   └── ui-settings-store.ts # UI 设置状态
├── root.tsx             # 应用根
└── app.css              # 全局样式 (OKLch 主题变量)

tests/                   # 测试文件
├── lib/                 # 工具函数测试
├── stores/              # Store 测试
└── components/          # 组件测试
```

## 快速开始

```bash
# 克隆项目
git clone https://github.com/halolight/halolight-remix.git
cd halolight-remix

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 访问 http://localhost:5173
```

## 可用命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 生产构建
pnpm start        # 启动生产服务器
pnpm typecheck    # 类型检查
pnpm lint         # ESLint 检查
pnpm lint:fix     # ESLint 自动修复
pnpm test         # 运行测试 (监视模式)
pnpm test:run     # 运行测试 (单次)
pnpm test:coverage # 测试覆盖率
pnpm preview      # 本地预览 Cloudflare 部署
pnpm deploy       # 部署到 Cloudflare
```

## 主题皮肤

支持 11 种预设皮肤，通过 Quick Settings 面板切换：

| 皮肤 | 主色调 |
|------|--------|
| Default | 紫色 |
| Blue | 蓝色 |
| Emerald | 翠绿色 |
| Amber | 琥珀色 |
| Violet | 紫罗兰 |
| Rose | 玫瑰色 |
| Teal | 青色 |
| Slate | 石板灰 |
| Ocean | 海洋蓝 |
| Sunset | 日落橙 |
| Aurora | 极光色 |

## CI/CD

项目配置了完整的 GitHub Actions CI 流程：

- **Lint & Type Check** - ESLint + TypeScript 检查
- **Unit Tests** - Vitest 单元测试 + Codecov 覆盖率
- **Build** - 生产构建验证
- **Security Audit** - 依赖安全审计
- **Dependency Review** - PR 依赖变更审查

## 部署

### Cloudflare Pages

```bash
# 构建并部署
pnpm deploy
```

需要配置以下 GitHub Secrets：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

### Node.js 服务器

```bash
pnpm build
pnpm start
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json .
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
```

## 页面路由

| 路径 | 页面 | 说明 |
|------|------|------|
| `/` | 仪表盘 | 数据概览 + 图表 |
| `/login` | 登录 | 用户登录 |
| `/register` | 注册 | 用户注册 |
| `/forgot-password` | 忘记密码 | 发送重置邮件 |
| `/reset-password` | 重置密码 | 设置新密码 |
| `/users` | 用户管理 | 用户列表 CRUD |
| `/settings` | 系统设置 | 应用配置 |
| `/profile` | 个人中心 | 用户资料 |
| `/security` | 安全设置 | 密码修改等 |
| `/analytics` | 数据分析 | 图表展示 |
| `/notifications` | 通知中心 | 消息列表 |
| `/documents` | 文档管理 | 文件列表 |
| `/calendar` | 日历 | 日程管理 |

## 测试

```bash
# 运行所有测试
pnpm test:run

# 查看覆盖率报告
pnpm test:coverage
```

测试覆盖：
- 工具函数：`cn`, `generateMeta`, `projectInfo`
- 状态管理：`useTabsStore`, `useUiSettingsStore`
- UI 组件：`Button`, `Footer`

## 相关项目

- [halolight](https://github.com/halolight/halolight) - Next.js 14 版本
- [halolight-vue](https://github.com/halolight/halolight-vue) - Vue 3.5 版本
- [halolight-angular](https://github.com/halolight/halolight-angular) - Angular 21 版本
- [halolight/docs](https://github.com/halolight/docs) - 文档站点

## 许可证

[MIT](LICENSE) © [h7ml](https://github.com/h7ml)
