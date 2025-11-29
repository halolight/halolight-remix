import { redirect } from "react-router";
import { Bell, Globe, Palette, Lock } from "lucide-react";
import { requireAuth } from "../lib/auth.server";
import { generateMeta } from "../lib/meta";
import AdminLayout from "../components/admin-layout";

export async function loader({ request }: { request: Request }) {
  try {
    const user = await requireAuth(request);
    return { user };
  } catch {
    return redirect("/login");
  }
}

export function meta() {
  return generateMeta("/settings");
}

export default function SettingsPage() {
  return (
    <AdminLayout>
      <SettingsContent />
    </AdminLayout>
  );
}

const settingsSections = [
  {
    title: "通知设置",
    description: "管理系统通知和提醒方式",
    icon: Bell,
    items: [
      { label: "邮件通知", description: "接收重要事件的邮件提醒", enabled: true },
      { label: "浏览器推送", description: "允许浏览器推送通知", enabled: false },
      { label: "短信通知", description: "接收短信提醒（仅限紧急事件）", enabled: false },
    ],
  },
  {
    title: "语言和地区",
    description: "设置显示语言和时区",
    icon: Globe,
    items: [
      { label: "界面语言", description: "选择系统显示语言", value: "简体中文" },
      { label: "时区", description: "设置您的本地时区", value: "Asia/Shanghai (UTC+8)" },
      { label: "日期格式", description: "选择日期显示格式", value: "YYYY-MM-DD" },
    ],
  },
  {
    title: "外观设置",
    description: "自定义界面外观",
    icon: Palette,
    items: [
      { label: "主题模式", description: "选择深色或浅色主题", value: "跟随系统" },
      { label: "紧凑模式", description: "减少界面间距", enabled: false },
      { label: "动画效果", description: "启用界面动画", enabled: true },
    ],
  },
];

function SettingsContent() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">系统设置</h1>
        <p className="text-sm text-muted-foreground">配置系统参数和偏好</p>
      </div>

      {/* 设置区块 */}
      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="glass-panel">
            <div className="border-b border-border px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="font-medium text-foreground">{section.title}</h2>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                </div>
              </div>
            </div>
            <div className="divide-y divide-border">
              {section.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  {'enabled' in item ? (
                    <button
                      className={`relative h-6 w-11 rounded-full transition-colors ${
                        item.enabled ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          item.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  ) : (
                    <span className="text-sm text-muted-foreground">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 危险区域 */}
      <div className="glass-panel border-destructive/20">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-destructive/10 p-2">
              <Lock className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="font-medium text-foreground">危险区域</h2>
              <p className="text-sm text-muted-foreground">这些操作不可逆，请谨慎操作</p>
            </div>
          </div>
        </div>
        <div className="space-y-4 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">清除缓存</p>
              <p className="text-sm text-muted-foreground">清除所有本地缓存数据</p>
            </div>
            <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
              清除缓存
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">重置设置</p>
              <p className="text-sm text-muted-foreground">将所有设置恢复为默认值</p>
            </div>
            <button className="rounded-lg border border-destructive/50 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive hover:text-destructive-foreground">
              重置设置
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
