import type { Route } from "./+types/notifications"
import { redirect } from "react-router"
import {
  Check,
  CheckCheck,
  Trash2,
  Settings,
  MessageSquare,
  UserPlus,
  AlertCircle,
  Info,
  CheckCircle,
} from "lucide-react"

import { requireAuth } from "~/lib/auth.server"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { AdminLayout } from "~/components/admin-layout"
import { generateMeta } from "~/lib/meta"

// 类型定义
interface Notification {
  id: string
  title: string
  description: string
  time: string
  type: "user" | "system" | "message" | "success" | "warning"
  read: boolean
}

// 模拟通知数据
const notifications: Notification[] = [
  {
    id: "1",
    title: "新用户注册",
    description: "用户 张三 已完成注册并激活账号",
    time: "5分钟前",
    type: "user",
    read: false,
  },
  {
    id: "2",
    title: "系统更新提醒",
    description: "系统将于今晚 22:00 进行维护升级，预计耗时 2 小时",
    time: "1小时前",
    type: "system",
    read: false,
  },
  {
    id: "3",
    title: "新消息",
    description: "李四 给您发送了一条消息",
    time: "2小时前",
    type: "message",
    read: true,
  },
  {
    id: "4",
    title: "任务完成",
    description: "项目 A 的需求分析任务已完成",
    time: "3小时前",
    type: "success",
    read: true,
  },
  {
    id: "5",
    title: "异常告警",
    description: "检测到服务器 CPU 使用率超过 90%",
    time: "5小时前",
    type: "warning",
    read: true,
  },
  {
    id: "6",
    title: "团队邀请",
    description: "王五 邀请您加入 产品团队",
    time: "1天前",
    type: "user",
    read: true,
  },
]

const typeIcons = {
  user: UserPlus,
  system: Info,
  message: MessageSquare,
  success: CheckCircle,
  warning: AlertCircle,
}

const typeColors = {
  user: "text-blue-500",
  system: "text-indigo-500",
  message: "text-emerald-500",
  success: "text-emerald-500",
  warning: "text-amber-500",
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    return { user, notifications }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/notifications")
}

export default function NotificationsPage({ loaderData }: Route.ComponentProps) {
  const { user, notifications } = loaderData
  const unreadCount = notifications.filter((n: Notification) => !n.read).length

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">通知中心</h1>
            <p className="text-muted-foreground mt-1">
              查看和管理所有系统通知
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <CheckCheck className="mr-2 h-4 w-4" />
              全部已读
            </Button>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>全部通知</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{notifications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>未读</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-rose-500">
                {unreadCount}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>今日新增</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">5</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>本周</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">23</div>
            </CardContent>
          </Card>
        </div>

        {/* 通知列表 */}
        <Card>
          <CardHeader>
            <CardTitle>通知列表</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">
                  全部
                  <Badge variant="secondary" className="ml-2">
                    {notifications.length}
                  </Badge>
                </TabsTrigger>
                <TabsTrigger value="unread">
                  未读
                  {unreadCount > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
                <TabsTrigger value="system">系统</TabsTrigger>
                <TabsTrigger value="message">消息</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4">
                <div className="space-y-2">
                  {notifications.map((notification: Notification) => {
                    const IconComponent =
                      typeIcons[notification.type as keyof typeof typeIcons]
                    const colorClass =
                      typeColors[notification.type as keyof typeof typeColors]
                    return (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-4 p-4 rounded-lg border ${
                          !notification.read ? "bg-muted/50" : ""
                        }`}
                      >
                        <div className={`mt-1 ${colorClass}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            {!notification.read && (
                              <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {notification.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-2">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          {!notification.read && (
                            <Button variant="ghost" size="icon-sm">
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button variant="ghost" size="icon-sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="mt-4">
                <div className="space-y-2">
                  {notifications
                    .filter((n: Notification) => !n.read)
                    .map((notification: Notification) => {
                      const IconComponent =
                        typeIcons[notification.type as keyof typeof typeIcons]
                      const colorClass =
                        typeColors[notification.type as keyof typeof typeColors]
                      return (
                        <div
                          key={notification.id}
                          className="flex items-start gap-4 p-4 rounded-lg border bg-muted/50"
                        >
                          <div className={`mt-1 ${colorClass}`}>
                            <IconComponent className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{notification.title}</h4>
                              <Badge variant="default" className="h-2 w-2 p-0 rounded-full" />
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {notification.description}
                            </p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {notification.time}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button variant="ghost" size="icon-sm">
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon-sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                </div>
              </TabsContent>

              <TabsContent value="system" className="mt-4">
                <div className="text-center py-8 text-muted-foreground">
                  暂无系统通知
                </div>
              </TabsContent>

              <TabsContent value="message" className="mt-4">
                <div className="text-center py-8 text-muted-foreground">
                  暂无消息通知
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
