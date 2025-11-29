import { redirect } from "react-router";
import { Search, Plus, MoreHorizontal, Mail, Shield } from "lucide-react";
import { requireAuth } from "../lib/auth.server";
import AdminLayout from "../components/admin-layout";
import { mockUsers } from "../lib/mock/auth";

import { generateMeta } from "../lib/meta";

export async function loader({ request }: { request: Request }) {
  try {
    const user = await requireAuth(request);
    return { user, users: mockUsers };
  } catch {
    return redirect("/login");
  }
}

export function meta() {
  return generateMeta("/users");
}

export default function UsersPage() {
  return (
    <AdminLayout>
      <UsersContent />
    </AdminLayout>
  );
}

function UsersContent() {
  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">用户管理</h1>
          <p className="text-sm text-muted-foreground">管理系统用户和权限</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          添加用户
        </button>
      </div>

      {/* 搜索和筛选 */}
      <div className="glass-panel p-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="搜索用户..."
              className="w-full rounded-lg border border-border bg-background pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <select className="rounded-lg border border-border bg-background px-4 py-2 text-sm">
            <option value="">所有角色</option>
            <option value="admin">管理员</option>
            <option value="manager">经理</option>
            <option value="user">普通用户</option>
          </select>
        </div>
      </div>

      {/* 用户列表 */}
      <div className="glass-panel overflow-hidden">
        <table className="w-full">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">用户</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">邮箱</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">角色</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">权限</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-muted/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"}
                      alt={user.name}
                    />
                    <div>
                      <p className="font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {user.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    user.role === 'admin' ? 'bg-primary/10 text-primary' :
                    user.role === 'manager' ? 'bg-warning/10 text-warning-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <Shield className="h-3 w-3" />
                    {user.role === 'admin' ? '管理员' : user.role === 'manager' ? '经理' : '用户'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.permissions.slice(0, 2).map((perm) => (
                      <span key={perm} className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {perm}
                      </span>
                    ))}
                    {user.permissions.length > 2 && (
                      <span className="rounded bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        +{user.permissions.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
