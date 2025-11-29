import type { Route } from "./+types/analytics"
import { redirect } from "react-router"
import {
  Clock,
  Eye,
  MousePointerClick,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import { requireAuth } from "~/lib/auth.server"
import { generateMeta } from "~/lib/meta"
import { Badge } from "~/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { AdminLayout } from "~/components/admin-layout"

// 类型定义
interface WeeklyDataItem {
  day: string
  visitors: number
  pageViews: number
  bounceRate: number
}

interface Metric {
  title: string
  value: string
  change: number
  icon: typeof Eye
  color: string
}

interface HourlyDataItem {
  hour: string
  value: number
}

// 模拟数据
const weeklyData: WeeklyDataItem[] = [
  { day: "周一", visitors: 2400, pageViews: 4000, bounceRate: 35 },
  { day: "周二", visitors: 1398, pageViews: 3000, bounceRate: 42 },
  { day: "周三", visitors: 9800, pageViews: 2000, bounceRate: 28 },
  { day: "周四", visitors: 3908, pageViews: 2780, bounceRate: 38 },
  { day: "周五", visitors: 4800, pageViews: 1890, bounceRate: 31 },
  { day: "周六", visitors: 3800, pageViews: 2390, bounceRate: 45 },
  { day: "周日", visitors: 4300, pageViews: 3490, bounceRate: 40 },
]

const metrics: Metric[] = [
  {
    title: "页面访问量",
    value: "128,430",
    change: 12.5,
    icon: Eye,
    color: "text-indigo-500",
  },
  {
    title: "独立访客",
    value: "24,521",
    change: 8.2,
    icon: Users,
    color: "text-emerald-500",
  },
  {
    title: "平均停留时间",
    value: "4m 32s",
    change: -2.4,
    icon: Clock,
    color: "text-amber-500",
  },
  {
    title: "点击率",
    value: "3.24%",
    change: 4.1,
    icon: MousePointerClick,
    color: "text-rose-500",
  },
]

// 生成基于时间的模拟数据
function generateHourlyData(): HourlyDataItem[] {
  const basePattern = [
    120, 80, 50, 30, 25, 40, 150, 380, 620, 850, 920, 780, 650, 720, 810, 890,
    950, 880, 720, 580, 420, 350, 280, 180,
  ]
  return Array.from({ length: 24 }, (_, i) => ({
    hour: `${String(i).padStart(2, "0")}:00`,
    value:
      basePattern[i] + Math.floor(basePattern[i] * 0.2 * (Math.sin(i) + 1)),
  }))
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    const hourlyData = generateHourlyData()
    return { user, hourlyData }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/analytics")
}

export default function AnalyticsPage({ loaderData }: Route.ComponentProps) {
  const { user, hourlyData } = loaderData

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">数据分析</h1>
          <p className="text-muted-foreground mt-1">
            查看网站访问数据和用户行为分析
          </p>
        </div>

        {/* 指标卡片 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardDescription>{metric.title}</CardDescription>
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center gap-1 mt-1">
                  {metric.change > 0 ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-rose-500" />
                  )}
                  <span
                    className={
                      metric.change > 0 ? "text-emerald-500" : "text-rose-500"
                    }
                  >
                    {Math.abs(metric.change)}%
                  </span>
                  <span className="text-xs text-muted-foreground">较上周</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 图表 */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>访客趋势</CardTitle>
              <CardDescription>本周每日独立访客数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyData}>
                    <defs>
                      <linearGradient
                        id="colorVisitors"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="rgb(99, 102, 241)"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="rgb(99, 102, 241)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="day"
                      className="text-xs"
                      tick={{ fill: "rgb(var(--color-muted-foreground))" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "rgb(var(--color-muted-foreground))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(var(--color-popover))",
                        border: "1px solid rgb(var(--color-border))",
                        borderRadius: "0.5rem",
                        color: "rgb(var(--color-popover-foreground))",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="visitors"
                      stroke="rgb(99, 102, 241)"
                      fillOpacity={1}
                      fill="url(#colorVisitors)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>跳出率分析</CardTitle>
              <CardDescription>本周每日跳出率百分比</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-muted"
                    />
                    <XAxis
                      dataKey="day"
                      className="text-xs"
                      tick={{ fill: "rgb(var(--color-muted-foreground))" }}
                    />
                    <YAxis
                      className="text-xs"
                      tick={{ fill: "rgb(var(--color-muted-foreground))" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgb(var(--color-popover))",
                        border: "1px solid rgb(var(--color-border))",
                        borderRadius: "0.5rem",
                        color: "rgb(var(--color-popover-foreground))",
                      }}
                    />
                    <Bar
                      dataKey="bounceRate"
                      fill="rgb(16, 185, 129)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 实时流量 */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>24小时流量</CardTitle>
                <CardDescription>过去24小时的访问量分布</CardDescription>
              </div>
              <Badge variant="outline" className="animate-pulse">
                <span className="mr-1 h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                实时
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="hour"
                    className="text-xs"
                    interval={2}
                    tick={{ fontSize: 11, fill: "rgb(var(--color-muted-foreground))" }}
                  />
                  <YAxis
                    className="text-xs"
                    tick={{ fontSize: 11, fill: "rgb(var(--color-muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgb(var(--color-popover))",
                      border: "1px solid rgb(var(--color-border))",
                      borderRadius: "0.5rem",
                      color: "rgb(var(--color-popover-foreground))",
                    }}
                    labelFormatter={(label) => `时间: ${label}`}
                    formatter={(value: number) => [`${value} 次访问`, "访问量"]}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="rgb(234, 179, 8)"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
