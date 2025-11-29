import type { Route } from "./+types/settings.teams.roles"
import { redirect } from "react-router"
import {
  ShieldCheck,
  Plus,
  Search,
  MoreVertical,
  Edit,
  Copy,
  Trash2,
  Users,
  Check,
  X,
} from "lucide-react"

import { requireAuth } from "~/lib/auth.server"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { AdminLayout } from "~/components/admin-layout"
import { generateMeta } from "~/lib/meta"

// 类型定义
interface RolePermissions {
  dashboard: boolean
  users: boolean
  content: boolean
  settings: boolean
  analytics: boolean
  files: boolean
}

interface Role {
  id: string
  name: string
  description: string
  userCount: number
  isSystem: boolean
  permissions: RolePermissions
}

// 模拟角色数据
const roles: Role[] = [
  {
    id: "1",
    name: "超级管理员",
    description: "拥有系统所有权限",
    userCount: 2,
    isSystem: true,
    permissions: {
      dashboard: true,
      users: true,
      content: true,
      settings: true,
      analytics: true,
      files: true,
    },
  },
  {
    id: "2",
    name: "管理员",
    description: "拥有大部分管理权限",
    userCount: 5,
    isSystem: true,
    permissions: {
      dashboard: true,
      users: true,
      content: true,
      settings: false,
      analytics: true,
      files: true,
    },
  },
  {
    id: "3",
    name: "编辑",
    description: "可以管理内容和文件",
    userCount: 12,
    isSystem: false,
    permissions: {
      dashboard: true,
      users: false,
      content: true,
      settings: false,
      analytics: false,
      files: true,
    },
  },
  {
    id: "4",
    name: "访客",
    description: "只读权限",
    userCount: 28,
    isSystem: false,
    permissions: {
      dashboard: true,
      users: false,
      content: false,
      settings: false,
      analytics: false,
      files: false,
    },
  },
]

const permissionLabels = {
  dashboard: "仪表盘",
  users: "用户管理",
  content: "内容管理",
  settings: "系统设置",
  analytics: "数据分析",
  files: "文件管理",
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    return { user, roles }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/settings/teams/roles")
}

export default function RolesPage({ loaderData }: Route.ComponentProps) {
  const { user, roles } = loaderData

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">角色管理</h1>
            <p className="text-muted-foreground mt-1">
              定义和管理系统角色权限
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建角色
          </Button>
        </div>

        {/* 搜索 */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索角色..." className="pl-9" />
        </div>

        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>角色总数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{roles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>系统角色</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {roles.filter((r: Role) => r.isSystem).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>自定义角色</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">
                {roles.filter((r: Role) => !r.isSystem).length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>用户总数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">
                {roles.reduce((acc: number, r: Role) => acc + r.userCount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 角色列表 */}
        <Card>
          <CardHeader>
            <CardTitle>角色列表</CardTitle>
            <CardDescription>系统中定义的所有角色及其权限</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>角色名称</TableHead>
                  <TableHead>描述</TableHead>
                  <TableHead>用户数</TableHead>
                  <TableHead>权限</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role: Role) => (
                  <TableRow key={role.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-primary" />
                        <span className="font-medium">{role.name}</span>
                        {role.isSystem && (
                          <Badge variant="secondary" className="text-xs">
                            系统
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {role.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        {role.userCount}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(role.permissions).map(
                          ([key, value]) => (
                            <Badge
                              key={key}
                              variant={value ? "default" : "outline"}
                              className="text-xs gap-1"
                            >
                              {value ? (
                                <Check className="h-3 w-3" />
                              ) : (
                                <X className="h-3 w-3" />
                              )}
                              {
                                permissionLabels[
                                  key as keyof typeof permissionLabels
                                ]
                              }
                            </Badge>
                          )
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon-sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            编辑角色
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="mr-2 h-4 w-4" />
                            复制角色
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            disabled={role.isSystem}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除角色
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* 权限说明 */}
        <Card>
          <CardHeader>
            <CardTitle>权限说明</CardTitle>
            <CardDescription>各权限模块的功能范围</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(permissionLabels).map(([key, label]) => (
                <div key={key} className="p-4 border rounded-lg">
                  <h4 className="font-medium">{label}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {key === "dashboard" && "查看仪表盘和统计数据"}
                    {key === "users" && "管理用户账号和权限"}
                    {key === "content" && "创建和编辑内容"}
                    {key === "settings" && "修改系统配置"}
                    {key === "analytics" && "查看数据分析报表"}
                    {key === "files" && "上传和管理文件"}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
