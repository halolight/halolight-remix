import { redirect, useLoaderData } from "react-router";
import { User, Camera, Mail, Building, MapPin, Calendar } from "lucide-react";
import { requireAuth } from "../lib/auth.server";
import { generateMeta } from "../lib/meta";
import AdminLayout from "../components/admin-layout";
import type { User as AuthUser } from "../lib/mock/auth";

export async function loader({ request }: { request: Request }) {
  try {
    const user = await requireAuth(request);
    return { user };
  } catch {
    return redirect("/login");
  }
}

export function meta() {
  return generateMeta("/profile");
}

export default function ProfilePage() {
  return (
    <AdminLayout>
      <ProfileContent />
    </AdminLayout>
  );
}

function ProfileContent() {
  const { user } = useLoaderData() as { user: AuthUser };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">个人设置</h1>
        <p className="text-sm text-muted-foreground">管理您的个人资料和账户信息</p>
      </div>

      {/* 头像区域 */}
      <div className="glass-panel p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              className="h-24 w-24 rounded-full object-cover"
              src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"}
              alt={user.name}
            />
            <button className="absolute bottom-0 right-0 rounded-full bg-primary p-2 text-primary-foreground shadow-lg hover:bg-primary/90">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <span className={`mt-2 inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
              user.role === 'admin' ? 'bg-primary/10 text-primary' :
              user.role === 'manager' ? 'bg-warning/10 text-warning-foreground' :
              'bg-muted text-muted-foreground'
            }`}>
              {user.role === 'admin' ? '管理员' : user.role === 'manager' ? '经理' : '用户'}
            </span>
          </div>
        </div>
      </div>

      {/* 基本信息表单 */}
      <div className="glass-panel">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-medium text-foreground">基本信息</h2>
          <p className="text-sm text-muted-foreground">更新您的个人资料信息</p>
        </div>
        <div className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <User className="inline-block h-4 w-4 mr-2" />
                姓名
              </label>
              <input
                type="text"
                defaultValue={user.name}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Mail className="inline-block h-4 w-4 mr-2" />
                邮箱
              </label>
              <input
                type="email"
                defaultValue={user.email}
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Building className="inline-block h-4 w-4 mr-2" />
                公司
              </label>
              <input
                type="text"
                placeholder="请输入公司名称"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <MapPin className="inline-block h-4 w-4 mr-2" />
                地址
              </label>
              <input
                type="text"
                placeholder="请输入地址"
                className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium text-foreground mb-2">个人简介</label>
            <textarea
              rows={4}
              placeholder="介绍一下自己..."
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
              取消
            </button>
            <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              保存更改
            </button>
          </div>
        </div>
      </div>

      {/* 账户信息 */}
      <div className="glass-panel">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-medium text-foreground">账户信息</h2>
          <p className="text-sm text-muted-foreground">查看您的账户详情</p>
        </div>
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">注册时间</p>
                <p className="text-sm text-muted-foreground">2024年1月15日</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-medium text-foreground">用户 ID</p>
              <p className="text-sm text-muted-foreground font-mono">{user.id}</p>
            </div>
          </div>
          <div className="flex items-center justify-between px-6 py-4">
            <div>
              <p className="font-medium text-foreground">权限</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {user.permissions.map((perm) => (
                  <span key={perm} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
