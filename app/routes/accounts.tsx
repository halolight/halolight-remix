import type { Route } from "./+types/accounts"
import { redirect } from "react-router"
import {
  UserCog,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Shield,
  Key,
  Ban,
  CheckCircle,
  Clock,
} from "lucide-react"

import { requireAuth } from "~/lib/auth.server"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Badge } from "~/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
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
interface Account {
  id: string
  name: string
  email: string
  avatar: string
  role: string
  permissions: string[]
  status: "active" | "inactive" | "pending"
  lastLogin: string
}

// 模拟账号数据
const accounts: Account[] = [
  {
    id: "1",
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    role: "管理员",
    permissions: ["全部权限"],
    status: "active",
    lastLogin: "2024-01-15 14:30",
  },
  {
    id: "2",
    name: "李四",
    email: "lisi@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
    role: "编辑",
    permissions: ["内容管理", "文件上传"],
    status: "active",
    lastLogin: "2024-01-15 10:15",
  },
  {
    id: "3",
    name: "王五",
    email: "wangwu@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    role: "访客",
    permissions: ["只读"],
    status: "inactive",
    lastLogin: "2024-01-10 16:45",
  },
  {
    id: "4",
    name: "赵六",
    email: "zhaoliu@example.com",
    avatar: "",
    role: "编辑",
    permissions: ["内容管理"],
    status: "pending",
    lastLogin: "从未登录",
  },
  {
    id: "5",
    name: "孙七",
    email: "sunqi@example.com",
    avatar: "",
    role: "管理员",
    permissions: ["全部权限"],
    status: "active",
    lastLogin: "2024-01-14 08:00",
  },
]

const statusMap = {
  active: { label: "已激活", variant: "success" as const, icon: CheckCircle },
  inactive: { label: "已禁用", variant: "secondary" as const, icon: Ban },
  pending: { label: "待激活", variant: "warning" as const, icon: Clock },
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    return { user, accounts }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/accounts")
}

export default function AccountsPage({ loaderData }: Route.ComponentProps) {
  const { user, accounts } = loaderData

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">账号与权限</h1>
            <p className="text-muted-foreground mt-1">
              管理系统用户账号和访问权限
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            添加账号
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索账号..." className="pl-9" />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
        </div>

        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>总账号数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{accounts.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>已激活</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">
                {accounts.filter((a: Account) => a.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>待激活</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">
                {accounts.filter((a: Account) => a.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>已禁用</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">
                {accounts.filter((a: Account) => a.status === "inactive").length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 账号列表 */}
        <Card>
          <CardHeader>
            <CardTitle>账号列表</CardTitle>
            <CardDescription>系统中所有注册的用户账号</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>用户</TableHead>
                  <TableHead>角色</TableHead>
                  <TableHead>权限</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead>最后登录</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {accounts.map((account: Account) => {
                  const status = statusMap[account.status as keyof typeof statusMap]
                  const StatusIcon = status.icon
                  return (
                    <TableRow key={account.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            {account.avatar && (
                              <AvatarImage
                                src={account.avatar}
                                alt={account.name}
                              />
                            )}
                            <AvatarFallback>
                              {account.name.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{account.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {account.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{account.role}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {account.permissions.map((perm: string) => (
                            <Badge key={perm} variant="secondary" className="text-xs">
                              {perm}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={status.variant}>
                          <StatusIcon className="mr-1 h-3 w-3" />
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {account.lastLogin}
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
                              <UserCog className="mr-2 h-4 w-4" />
                              编辑信息
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Shield className="mr-2 h-4 w-4" />
                              修改权限
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Key className="mr-2 h-4 w-4" />
                              重置密码
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem variant="destructive">
                              <Ban className="mr-2 h-4 w-4" />
                              禁用账号
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
