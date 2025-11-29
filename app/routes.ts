import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // 首页/仪表盘
  index("routes/_index.tsx"),

  // 认证相关
  route("login", "routes/login.tsx"),
  route("register", "routes/register.tsx"),
  route("forgot-password", "routes/forgot-password.tsx"),
  route("reset-password", "routes/reset-password.tsx"),
  route("logout", "routes/logout.tsx"),

  // 管理页面
  route("users", "routes/users.tsx"),
  route("settings", "routes/settings.tsx"),
  route("profile", "routes/profile.tsx"),
  route("security", "routes/security.tsx"),

  // 新增管理页面
  route("analytics", "routes/analytics.tsx"),
  route("documents", "routes/documents.tsx"),
  route("files", "routes/files.tsx"),
  route("messages", "routes/messages.tsx"),
  route("calendar", "routes/calendar.tsx"),
  route("notifications", "routes/notifications.tsx"),
  route("accounts", "routes/accounts.tsx"),
  route("settings/teams", "routes/settings.teams.tsx"),
  route("settings/teams/roles", "routes/settings.teams.roles.tsx"),
  route("docs", "routes/docs.tsx"),

  // 法律页面
  route("privacy", "routes/privacy.tsx"),
  route("terms", "routes/terms.tsx"),

  // 404 通配符路由（必须放在最后）
  route("*", "routes/$.tsx"),
] satisfies RouteConfig;
