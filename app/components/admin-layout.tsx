import { Link, Form, useLoaderData } from "react-router";
import {
  User,
  Shield,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  LineChart,
  FileText,
  FolderOpen,
  MessageSquare,
  Calendar,
  BellRing,
  UserCog,
  UsersRound,
  ShieldCheck,
  HelpCircle,
  ChevronLeft,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { User as AuthUser } from "../lib/mock/auth";
import CommandPalette from "./command-palette";
import { useTheme } from "./theme-provider";
import { QuickSettings } from "./layout/quick-settings";
import { TabBar } from "./layout/tab-bar";
import { Footer } from "./layout/footer";
import { useUiSettingsStore } from "~/stores/ui-settings-store";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";

export interface AdminLayoutProps {
  children: React.ReactNode;
  user?: AuthUser;
}

export function AdminLayout({ children, user: propUser }: AdminLayoutProps) {
  const loaderData = useLoaderData() as { user?: AuthUser } | null;
  const user = propUser || loaderData?.user;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    // 使用懒初始化从 localStorage 恢复状态
    if (typeof window !== "undefined") {
      return localStorage.getItem("sidebar-collapsed") === "true";
    }
    return false;
  });
  const { resolvedTheme, setTheme } = useTheme();
  const { skin, showFooter, mobileHeaderFixed } = useUiSettingsStore();

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  // 应用皮肤到 HTML 元素
  useEffect(() => {
    const root = document.documentElement;
    if (skin && skin !== "default") {
      root.setAttribute("data-skin", skin);
    } else {
      root.removeAttribute("data-skin");
    }
  }, [skin]);

  // 保存侧边栏状态
  const handleSidebarCollapse = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
    localStorage.setItem("sidebar-collapsed", String(collapsed));
  };

  if (!user) {
    return <div className="p-8">用户未登录</div>;
  }

  const navigation = [
    { name: "仪表盘", href: "/", icon: BarChart3 },
    { name: "数据分析", href: "/analytics", icon: LineChart },
    { name: "用户管理", href: "/users", icon: Users },
    { name: "文档管理", href: "/documents", icon: FileText },
    { name: "文件存储", href: "/files", icon: FolderOpen },
    { name: "消息中心", href: "/messages", icon: MessageSquare },
    { name: "日程安排", href: "/calendar", icon: Calendar },
    { name: "通知中心", href: "/notifications", icon: BellRing },
    { name: "账号权限", href: "/accounts", icon: UserCog },
    { name: "团队设置", href: "/settings/teams", icon: UsersRound },
    { name: "角色管理", href: "/settings/teams/roles", icon: ShieldCheck },
    { name: "系统设置", href: "/settings", icon: Settings },
    { name: "帮助文档", href: "/docs", icon: HelpCircle },
  ];

  const userNavigation = [
    { name: "个人设置", href: "/profile" },
    { name: "账户安全", href: "/security" },
  ];

  const sidebarWidth = sidebarCollapsed ? 72 : 220;

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* 移动端侧边栏遮罩 */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* 侧边栏 */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarWidth }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className={cn(
          "fixed inset-y-0 left-0 z-50 border-r border-border bg-sidebar flex flex-col",
          "lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ width: sidebarWidth }}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <AnimatePresence mode="wait">
            {!sidebarCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <Shield className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-sidebar-foreground">
                  HaloLight
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          {sidebarCollapsed && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary mx-auto">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
          )}
          <button
            type="button"
            className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 导航菜单 */}
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  sidebarCollapsed && "justify-center px-2"
                )}
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <AnimatePresence mode="wait">
                  {!sidebarCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="truncate"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        {/* 折叠按钮 */}
        <div className="border-t border-border p-2 hidden lg:block">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSidebarCollapse(!sidebarCollapsed)}
            className="w-full justify-center"
          >
            <motion.div
              animate={{ rotate: sidebarCollapsed ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="ml-2"
                >
                  收起菜单
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>

        {/* 用户信息 */}
        <div className="border-t border-border p-4">
          <div className={cn("flex items-center", sidebarCollapsed && "justify-center")}>
            <img
              className="h-8 w-8 rounded-full"
              src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"}
              alt={user.name}
            />
            <AnimatePresence mode="wait">
              {!sidebarCollapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-3 flex-1"
                >
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* 主要内容区域 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* 顶部导航栏 */}
        <motion.header
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "z-50 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60",
            mobileHeaderFixed ? "fixed inset-x-0 top-0 lg:sticky lg:top-0" : "sticky top-0"
          )}
          style={{ marginLeft: mobileHeaderFixed ? 0 : undefined }}
        >
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="hidden sm:block">
              <CommandPalette onThemeToggle={handleThemeToggle} currentTheme={resolvedTheme} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* 通知 */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
                3
              </span>
            </Button>

            {/* 界面设置 */}
            <QuickSettings />

            {/* 用户菜单 */}
            <div className="relative group">
              <button className="flex items-center space-x-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted">
                <User className="h-5 w-5" />
                <span className="hidden md:block text-sm">{user.name}</span>
              </button>

              <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="py-1">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t border-border my-1"></div>
                  <Form method="post" action="/logout">
                    <button
                      type="submit"
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted flex items-center"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      退出登录
                    </button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* 多标签栏 */}
        <TabBar />

        {/* 主要内容区域 - 填满剩余空间 */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* 可滚动内容 */}
          <main className={cn(
            "flex-1 overflow-y-auto p-4 lg:p-8",
            mobileHeaderFixed && "pt-20 lg:pt-4"
          )}>
            {children}
          </main>

          {/* 页脚 - 固定在底部 */}
          {showFooter && <Footer />}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
