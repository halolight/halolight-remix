import { Command } from "cmdk";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Home,
  Users,
  Settings,
  User,
  Shield,
  LogOut,
  Sun,
  Moon,
  FileText,
  Lock,
} from "lucide-react";
import { useAuthStore } from "~/stores/auth-store";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

interface CommandPaletteProps {
  onThemeToggle?: () => void;
  currentTheme?: "light" | "dark";
}

export default function CommandPalette({ onThemeToggle, currentTheme }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, accounts, switchAccount } = useAuthStore();

  // 监听键盘快捷键
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const navigationItems = [
    { icon: Home, label: "仪表盘", shortcut: "G D", href: "/" },
    { icon: Users, label: "用户管理", shortcut: "G U", href: "/users" },
    { icon: Settings, label: "系统设置", shortcut: "G S", href: "/settings" },
    { icon: User, label: "个人设置", shortcut: "G P", href: "/profile" },
    { icon: Shield, label: "账户安全", shortcut: "G A", href: "/security" },
  ];

  const pageItems = [
    { icon: FileText, label: "隐私政策", href: "/privacy" },
    { icon: Lock, label: "服务条款", href: "/terms" },
  ];

  return (
    <>
      {/* 触发按钮 */}
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-muted/50 border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Search className="h-4 w-4" />
        <span>搜索...</span>
        <kbd className="ml-2 pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* 命令面板 */}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="命令菜单"
        className="fixed inset-0 z-50"
      >
        {/* 遮罩层 */}
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setOpen(false)} />

        {/* 命令面板主体 */}
        <div className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg">
          <div className="bg-card border border-border rounded-xl shadow-2xl overflow-hidden">
            <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
              <div className="flex items-center border-b border-border px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input
                  placeholder="输入命令或搜索..."
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                  未找到结果
                </Command.Empty>

                <Command.Group heading="导航" className="text-xs text-muted-foreground px-2 py-1.5">
                  {navigationItems.map((item) => (
                    <Command.Item
                      key={item.href}
                      onSelect={() => runCommand(() => navigate(item.href))}
                      className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-muted"
                    >
                      <item.icon className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                          {item.shortcut}
                        </kbd>
                      )}
                    </Command.Item>
                  ))}
                </Command.Group>

                <Command.Group heading="页面" className="text-xs text-muted-foreground px-2 py-1.5">
                  {pageItems.map((item) => (
                    <Command.Item
                      key={item.href}
                      onSelect={() => runCommand(() => navigate(item.href))}
                      className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground hover:bg-muted"
                    >
                      <item.icon className="mr-3 h-4 w-4 text-muted-foreground" />
                      <span>{item.label}</span>
                    </Command.Item>
                  ))}
                </Command.Group>

                {accounts.length > 1 && (
                  <Command.Group heading="账号切换" className="text-xs text-muted-foreground px-2 py-1.5">
                    {accounts.map((account) => (
                      <Command.Item
                        key={account.id}
                        onSelect={() => runCommand(() => switchAccount(account.id))}
                        className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground hover:bg-muted"
                      >
                        <Avatar className="mr-3 h-6 w-6">
                          <AvatarImage src={account.avatar} alt={account.name} />
                          <AvatarFallback>{account.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-medium">{account.name}</span>
                          <span className="text-xs text-muted-foreground">{account.email}</span>
                        </div>
                        {user?.id === account.id && (
                          <span className="ml-auto text-xs text-primary">当前</span>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}

                <Command.Group heading="操作" className="text-xs text-muted-foreground px-2 py-1.5">
                  {onThemeToggle && (
                    <Command.Item
                      onSelect={() => runCommand(onThemeToggle)}
                      className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground hover:bg-muted"
                    >
                      {currentTheme === "dark" ? (
                        <Sun className="mr-3 h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Moon className="mr-3 h-4 w-4 text-muted-foreground" />
                      )}
                      <span>{currentTheme === "dark" ? "切换到亮色模式" : "切换到暗色模式"}</span>
                    </Command.Item>
                  )}
                  <Command.Item
                    onSelect={() => runCommand(() => navigate("/logout"))}
                    className="relative flex cursor-pointer select-none items-center rounded-lg px-2 py-2 text-sm outline-none aria-selected:bg-muted aria-selected:text-foreground hover:bg-muted text-destructive"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span>退出登录</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </Command>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
}
