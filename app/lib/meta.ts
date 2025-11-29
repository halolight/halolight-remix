import { projectInfo } from "./project-info"

/**
 * TDK 元数据配置
 * Title, Description, Keywords
 */

export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
}

// 站点默认配置
export const siteMeta = {
  siteName: "HaloLight",
  separator: " · ",
  defaultKeywords: [
    "后台管理系统",
    "React Router 7",
    "Remix",
    "TypeScript",
    "Tailwind CSS",
    "管理后台",
    "Admin Dashboard",
    "中文后台",
  ],
  author: projectInfo.author,
  homepage: projectInfo.homepage,
}

// 页面 TDK 配置映射
export const pageMetas: Record<string, PageMeta> = {
  // 首页/仪表盘
  "/": {
    title: "仪表盘",
    description: "HaloLight 实时运营驾驶舱，多区域部署、智能风控、自定义仪表盘",
    keywords: ["仪表盘", "数据看板", "运营驾驶舱", "实时监控"],
  },
  // 数据分析
  "/analytics": {
    title: "数据分析",
    description: "多维度数据分析，支持趋势图、饼图、柱状图等可视化展示",
    keywords: ["数据分析", "数据可视化", "图表", "趋势分析"],
  },
  // 用户管理
  "/users": {
    title: "用户管理",
    description: "管理系统用户，支持用户增删改查、角色分配、权限管理",
    keywords: ["用户管理", "用户列表", "角色分配", "权限管理"],
  },
  // 文档管理
  "/documents": {
    title: "文档管理",
    description: "企业文档管理中心，支持文档上传、分类、搜索、版本控制",
    keywords: ["文档管理", "文件管理", "知识库", "文档中心"],
  },
  // 文件存储
  "/files": {
    title: "文件存储",
    description: "云端文件存储服务，支持多种格式文件上传、预览、下载",
    keywords: ["文件存储", "云存储", "文件上传", "文件管理"],
  },
  // 消息中心
  "/messages": {
    title: "消息中心",
    description: "站内消息管理，支持消息发送、接收、已读状态跟踪",
    keywords: ["消息中心", "站内信", "通知消息", "消息管理"],
  },
  // 日程安排
  "/calendar": {
    title: "日程安排",
    description: "日程管理与日历视图，支持事件创建、提醒、团队协作",
    keywords: ["日程安排", "日历", "事件管理", "时间管理"],
  },
  // 通知中心
  "/notifications": {
    title: "通知中心",
    description: "系统通知管理，支持通知推送、订阅设置、消息归档",
    keywords: ["通知中心", "系统通知", "消息推送", "通知管理"],
  },
  // 账号权限
  "/accounts": {
    title: "账号权限",
    description: "账号与权限管理，支持多级权限、角色配置、访问控制",
    keywords: ["账号权限", "权限管理", "访问控制", "角色配置"],
  },
  // 团队设置
  "/settings/teams": {
    title: "团队设置",
    description: "团队管理与成员配置，支持团队创建、成员邀请、权限分配",
    keywords: ["团队设置", "团队管理", "成员管理", "协作配置"],
  },
  // 角色管理
  "/settings/teams/roles": {
    title: "角色管理",
    description: "系统角色配置，支持角色创建、权限分配、角色继承",
    keywords: ["角色管理", "角色配置", "权限角色", "RBAC"],
  },
  // 系统设置
  "/settings": {
    title: "系统设置",
    description: "系统配置中心，支持主题设置、语言设置、通知设置等",
    keywords: ["系统设置", "配置中心", "主题设置", "个性化"],
  },
  // 帮助文档
  "/docs": {
    title: "帮助文档",
    description: "HaloLight 使用指南与帮助文档，快速上手后台管理系统",
    keywords: ["帮助文档", "使用指南", "FAQ", "文档中心"],
  },
  // 个人资料
  "/profile": {
    title: "个人资料",
    description: "个人信息管理，支持头像、昵称、联系方式等信息修改",
    keywords: ["个人资料", "个人信息", "账户设置", "用户中心"],
  },
  // 账户安全
  "/security": {
    title: "账户安全",
    description: "账户安全设置，支持密码修改、两步验证、登录日志",
    keywords: ["账户安全", "密码修改", "两步验证", "安全设置"],
  },
  // 登录
  "/login": {
    title: "登录",
    description: "登录 HaloLight 后台管理系统，安全便捷的企业级管理平台",
    keywords: ["登录", "用户登录", "系统登录"],
  },
  // 注册
  "/register": {
    title: "注册",
    description: "注册 HaloLight 账号，开启企业级后台管理体验",
    keywords: ["注册", "用户注册", "创建账号"],
  },
  // 忘记密码
  "/forgot-password": {
    title: "忘记密码",
    description: "找回您的 HaloLight 账号密码",
    keywords: ["忘记密码", "找回密码", "密码重置"],
  },
  // 重置密码
  "/reset-password": {
    title: "重置密码",
    description: "重置您的 HaloLight 账号密码",
    keywords: ["重置密码", "修改密码", "密码更新"],
  },
  // 隐私政策
  "/privacy": {
    title: "隐私政策",
    description: "HaloLight 隐私政策，了解我们如何收集、使用和保护您的数据",
    keywords: ["隐私政策", "隐私保护", "数据安全"],
  },
  // 服务条款
  "/terms": {
    title: "服务条款",
    description: "HaloLight 服务条款，了解使用本服务的条款和条件",
    keywords: ["服务条款", "使用条款", "用户协议"],
  },
}

/**
 * 生成页面完整标题
 */
export function getPageTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return siteMeta.siteName
  }
  return `${pageTitle}${siteMeta.separator}${siteMeta.siteName}`
}

/**
 * 生成页面 meta 标签数组（用于 React Router meta 函数）
 */
export function generateMeta(path: string, overrides?: Partial<PageMeta>) {
  const pageMeta = pageMetas[path] || {
    title: "页面",
    description: projectInfo.desc,
  }

  const title = overrides?.title || pageMeta.title
  const description = overrides?.description || pageMeta.description
  const keywords = [
    ...(overrides?.keywords || pageMeta.keywords || []),
    ...siteMeta.defaultKeywords,
  ]

  return [
    { title: getPageTitle(title) },
    { name: "description", content: description },
    { name: "keywords", content: keywords.join(", ") },
    // Open Graph
    { property: "og:title", content: getPageTitle(title) },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: siteMeta.siteName },
    { property: "og:url", content: `${siteMeta.homepage}${path}` },
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: getPageTitle(title) },
    { name: "twitter:description", content: description },
    // 其他
    { name: "author", content: siteMeta.author },
    { name: "robots", content: "index, follow" },
  ]
}

/**
 * 快捷方法：根据路径获取 meta
 */
export function getMetaForPath(path: string) {
  return generateMeta(path)
}
