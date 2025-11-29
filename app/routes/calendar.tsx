import type { Route } from "./+types/calendar"
import { redirect } from "react-router"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  MapPin,
  Users,
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
import { AdminLayout } from "~/components/admin-layout"
import { generateMeta } from "~/lib/meta"

// 类型定义
interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  location: string
  attendees: number
  type: "meeting" | "milestone" | "interview" | "deadline"
}

interface CalendarDay {
  day: number
  isCurrentMonth: boolean
  isToday: boolean
  date: string
}

// 模拟日历事件
const events: CalendarEvent[] = [
  {
    id: "1",
    title: "产品评审会议",
    date: "2024-01-15",
    time: "10:00 - 11:30",
    location: "会议室 A",
    attendees: 8,
    type: "meeting",
  },
  {
    id: "2",
    title: "项目里程碑",
    date: "2024-01-15",
    time: "14:00",
    location: "",
    attendees: 0,
    type: "milestone",
  },
  {
    id: "3",
    title: "团队周会",
    date: "2024-01-16",
    time: "09:00 - 10:00",
    location: "线上",
    attendees: 12,
    type: "meeting",
  },
  {
    id: "4",
    title: "用户访谈",
    date: "2024-01-17",
    time: "15:00 - 16:00",
    location: "客户办公室",
    attendees: 3,
    type: "interview",
  },
  {
    id: "5",
    title: "系统上线",
    date: "2024-01-20",
    time: "全天",
    location: "",
    attendees: 0,
    type: "deadline",
  },
]

const typeColors = {
  meeting: "bg-blue-500",
  milestone: "bg-purple-500",
  interview: "bg-emerald-500",
  deadline: "bg-rose-500",
}

const typeLabels = {
  meeting: "会议",
  milestone: "里程碑",
  interview: "访谈",
  deadline: "截止日期",
}

// 生成当月日历数据
function generateCalendarDays(): CalendarDay[] {
  const days: CalendarDay[] = []
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth()

  // 获取本月第一天是星期几
  const firstDay = new Date(year, month, 1).getDay()
  // 获取本月天数
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  // 获取上月天数
  const daysInPrevMonth = new Date(year, month, 0).getDate()

  // 上月的日期
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({
      day: daysInPrevMonth - i,
      isCurrentMonth: false,
      isToday: false,
      date: `${year}-${String(month).padStart(2, "0")}-${String(daysInPrevMonth - i).padStart(2, "0")}`,
    })
  }

  // 本月的日期
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({
      day: i,
      isCurrentMonth: true,
      isToday: i === today.getDate(),
      date: `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
    })
  }

  // 下月的日期（补齐到42天）
  const remaining = 42 - days.length
  for (let i = 1; i <= remaining; i++) {
    days.push({
      day: i,
      isCurrentMonth: false,
      isToday: false,
      date: `${year}-${String(month + 2).padStart(2, "0")}-${String(i).padStart(2, "0")}`,
    })
  }

  return days
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    const calendarDays = generateCalendarDays()
    return { user, events, calendarDays }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/calendar")
}

export default function CalendarPage({ loaderData }: Route.ComponentProps) {
  const { user, events, calendarDays } = loaderData
  const today = new Date()
  const monthNames = [
    "一月", "二月", "三月", "四月", "五月", "六月",
    "七月", "八月", "九月", "十月", "十一月", "十二月"
  ]
  const weekDays = ["日", "一", "二", "三", "四", "五", "六"]

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">日程安排</h1>
            <p className="text-muted-foreground mt-1">
              管理您的日程和重要事件
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建事件
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 日历 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {monthNames[today.getMonth()]} {today.getFullYear()}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon-sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    今天
                  </Button>
                  <Button variant="outline" size="icon-sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-px bg-muted rounded-lg overflow-hidden">
                {/* 星期头部 */}
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="bg-background p-2 text-center text-sm font-medium text-muted-foreground"
                  >
                    {day}
                  </div>
                ))}
                {/* 日期格子 */}
                {calendarDays.map((day: CalendarDay, index: number) => (
                  <div
                    key={index}
                    className={`bg-background p-2 min-h-[80px] ${
                      !day.isCurrentMonth ? "text-muted-foreground/50" : ""
                    }`}
                  >
                    <span
                      className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-sm ${
                        day.isToday
                          ? "bg-primary text-primary-foreground"
                          : ""
                      }`}
                    >
                      {day.day}
                    </span>
                    {/* 显示当天事件 */}
                    <div className="mt-1 space-y-1">
                      {events
                        .filter((e: CalendarEvent) => e.date === day.date)
                        .slice(0, 2)
                        .map((event: CalendarEvent) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded truncate text-white ${
                              typeColors[event.type as keyof typeof typeColors]
                            }`}
                          >
                            {event.title}
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 今日事件 */}
          <Card>
            <CardHeader>
              <CardTitle>今日事件</CardTitle>
              <CardDescription>
                {today.getMonth() + 1}月{today.getDate()}日
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.slice(0, 3).map((event: CalendarEvent) => (
                  <div
                    key={event.id}
                    className="flex gap-3 p-3 border rounded-lg"
                  >
                    <div
                      className={`w-1 rounded-full ${
                        typeColors[event.type as keyof typeof typeColors]
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium truncate">{event.title}</h4>
                        <Badge variant="outline" className="shrink-0">
                          {typeLabels[event.type as keyof typeof typeLabels]}
                        </Badge>
                      </div>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3 w-3" />
                            {event.location}
                          </div>
                        )}
                        {event.attendees > 0 && (
                          <div className="flex items-center gap-2">
                            <Users className="h-3 w-3" />
                            {event.attendees} 人参与
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
