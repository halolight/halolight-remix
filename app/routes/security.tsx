import { redirect } from "react-router";
import { Shield, Key, Smartphone, History, AlertTriangle, CheckCircle } from "lucide-react";
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
  return generateMeta("/security");
}

export default function SecurityPage() {
  return (
    <AdminLayout>
      <SecurityContent />
    </AdminLayout>
  );
}

const loginHistory = [
  { device: "Chrome on macOS", location: "上海, 中国", time: "刚刚", current: true },
  { device: "Safari on iPhone", location: "上海, 中国", time: "2小时前", current: false },
  { device: "Chrome on Windows", location: "北京, 中国", time: "昨天 14:30", current: false },
];

function SecurityContent() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">账户安全</h1>
        <p className="text-sm text-muted-foreground">管理您的密码和安全设置</p>
      </div>

      {/* 安全状态 */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-4">
          <div className="rounded-full bg-success/10 p-3">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">账户安全状态良好</h2>
            <p className="text-sm text-muted-foreground">您的账户已启用基本安全保护</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-foreground">密码强度: 强</span>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-warning-foreground" />
              <span className="text-foreground">双因素认证: 未启用</span>
            </div>
          </div>
          <div className="rounded-lg border border-border p-4">
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-success" />
              <span className="text-foreground">登录保护: 已启用</span>
            </div>
          </div>
        </div>
      </div>

      {/* 修改密码 */}
      <div className="glass-panel">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-medium text-foreground">修改密码</h2>
              <p className="text-sm text-muted-foreground">定期更换密码以保护账户安全</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">当前密码</label>
              <input
                type="password"
                placeholder="请输入当前密码"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">新密码</label>
              <input
                type="password"
                placeholder="请输入新密码"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">确认新密码</label>
              <input
                type="password"
                placeholder="请再次输入新密码"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              更新密码
            </button>
          </div>
        </div>
      </div>

      {/* 双因素认证 */}
      <div className="glass-panel">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-primary" />
              <div>
                <h2 className="font-medium text-foreground">双因素认证</h2>
                <p className="text-sm text-muted-foreground">添加额外的安全保护层</p>
              </div>
            </div>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              启用
            </button>
          </div>
        </div>
        <div className="p-6">
          <p className="text-sm text-muted-foreground">
            启用双因素认证后，登录时除了密码，还需要输入手机验证码或验证器应用生成的动态码。
            这可以有效防止密码泄露后的未授权访问。
          </p>
        </div>
      </div>

      {/* 登录历史 */}
      <div className="glass-panel">
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <History className="h-5 w-5 text-primary" />
            <div>
              <h2 className="font-medium text-foreground">登录历史</h2>
              <p className="text-sm text-muted-foreground">查看最近的登录活动</p>
            </div>
          </div>
        </div>
        <div className="divide-y divide-border">
          {loginHistory.map((item, index) => (
            <div key={index} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <div className={`rounded-full p-2 ${item.current ? 'bg-success/10' : 'bg-muted'}`}>
                  <Shield className={`h-4 w-4 ${item.current ? 'text-success' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {item.device}
                    {item.current && (
                      <span className="ml-2 rounded bg-success/10 px-2 py-0.5 text-xs text-success">
                        当前设备
                      </span>
                    )}
                  </p>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{item.time}</p>
                {!item.current && (
                  <button className="text-xs text-destructive hover:underline">撤销访问</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
