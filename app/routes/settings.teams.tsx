import type { Route } from "./+types/settings.teams"
import { redirect } from "react-router"
import {
  UsersRound,
  Plus,
  Search,
  MoreVertical,
  Settings,
  UserPlus,
  Trash2,
  Mail,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { AdminLayout } from "~/components/admin-layout"
import { generateMeta } from "~/lib/meta"

// 类型定义
interface TeamMember {
  id: string
  name: string
  avatar: string
  role: string
}

interface Team {
  id: string
  name: string
  description: string
  members: TeamMember[]
  createdAt: string
}

// 模拟团队数据
const teams: Team[] = [
  {
    id: "1",
    name: "产品团队",
    description: "负责产品规划和设计",
    members: [
      {
        id: "1",
        name: "张三",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        role: "负责人",
      },
      {
        id: "2",
        name: "李四",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
        role: "成员",
      },
      {
        id: "3",
        name: "王五",
        avatar: "",
        role: "成员",
      },
    ],
    createdAt: "2024-01-01",
  },
  {
    id: "2",
    name: "技术团队",
    description: "负责系统开发和维护",
    members: [
      {
        id: "4",
        name: "赵六",
        avatar: "",
        role: "负责人",
      },
      {
        id: "5",
        name: "孙七",
        avatar: "",
        role: "成员",
      },
    ],
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    name: "运营团队",
    description: "负责用户运营和增长",
    members: [
      {
        id: "6",
        name: "周八",
        avatar: "",
        role: "负责人",
      },
    ],
    createdAt: "2024-01-10",
  },
]

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    return { user, teams }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/settings/teams")
}

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  const { user, teams } = loaderData

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">团队设置</h1>
            <p className="text-muted-foreground mt-1">
              管理团队和团队成员
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            创建团队
          </Button>
        </div>

        {/* 搜索 */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="搜索团队..." className="pl-9" />
        </div>

        {/* 统计卡片 */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>团队总数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{teams.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>成员总数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">
                {teams.reduce((acc: number, team: Team) => acc + team.members.length, 0)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>本月新增</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">2</div>
            </CardContent>
          </Card>
        </div>

        {/* 团队列表 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team: Team) => (
            <Card key={team.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <UsersRound className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{team.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {team.description}
                      </CardDescription>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        团队设置
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        添加成员
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        发送邀请
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem variant="destructive">
                        <Trash2 className="mr-2 h-4 w-4" />
                        解散团队
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* 成员头像 */}
                  <div className="flex items-center">
                    <div className="flex -space-x-2">
                      {team.members.slice(0, 4).map((member: TeamMember) => (
                        <Avatar
                          key={member.id}
                          className="h-8 w-8 border-2 border-background"
                        >
                          {member.avatar && (
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                          )}
                          <AvatarFallback className="text-xs">
                            {member.name.slice(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {team.members.length > 4 && (
                        <div className="h-8 w-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                          +{team.members.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="ml-3 text-sm text-muted-foreground">
                      {team.members.length} 名成员
                    </span>
                  </div>

                  {/* 成员列表 */}
                  <div className="space-y-2">
                    {team.members.slice(0, 3).map((member: TeamMember) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            {member.avatar && (
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                            )}
                            <AvatarFallback className="text-xs">
                              {member.name.slice(0, 1)}
                            </AvatarFallback>
                          </Avatar>
                          <span>{member.name}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {member.role}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* 创建新团队卡片 */}
          <Card className="border-dashed flex items-center justify-center min-h-[200px]">
            <Button variant="ghost" className="h-full w-full flex-col gap-2">
              <Plus className="h-8 w-8 text-muted-foreground" />
              <span className="text-muted-foreground">创建新团队</span>
            </Button>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
