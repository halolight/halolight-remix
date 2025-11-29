import type { JSX } from "react";
import type { Route } from "./+types/_index";
import { redirect } from "react-router";
import {
  announcements,
  metricHighlights,
  productPerformance,
  quickActions,
  revenueTrend,
  securityTimeline,
  tasks,
  teams,
  type MetricDatum,
  type RevenuePoint,
} from "../lib/mock/dashboard";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  GrowthIcon,
  ShieldIcon,
  SparkIcon,
  UsersIcon,
} from "../components/icons";
import { requireAuth } from "../lib/auth.server";
import { generateMeta } from "../lib/meta";
import AdminLayout from "../components/admin-layout";

// 加载器函数 - 验证用户认证状态
export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request);
    return { user };
  } catch {
    return redirect("/login");
  }
}

export function meta() {
  return generateMeta("/");
}

const iconMap: Record<MetricDatum["icon"], JSX.Element> = {
  revenue: <GrowthIcon size={18} />,
  users: <UsersIcon size={18} />,
  retention: <SparkIcon size={18} />,
  security: <ShieldIcon size={18} />,
};

const height = 220;

const buildPath = (data: RevenuePoint[], key: keyof RevenuePoint) => {
  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.baseline));
  const range = max - min || 1;
  const dataLength = data.length;

  return data
    .map((point, index) => {
      const divisor = Math.max(dataLength - 1, 1) as number;
      const x = ((index as number) / divisor) * 100;
      const normalized = ((point[key] as number) - min) / range;
      const y = height - (normalized * height);
      return `${index === 0 ? "M" : "L"} ${x},${y}`;
    })
    .join(" ");
};

const severityClass = (severity: string) => {
  switch (severity) {
    case "critical":
      return "bg-destructive/15 text-destructive";
    case "warning":
      return "bg-warning/15 text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const statusClass = (status: string) => {
  switch (status) {
    case "in-progress":
      return "bg-primary/15 text-primary";
    case "blocked":
      return "bg-destructive/15 text-destructive";
    case "in-review":
      return "bg-success/15 text-success";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const priorityClass = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground";
    case "medium":
      return "bg-warning text-warning-foreground";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export default function Index() {
  return (
    <AdminLayout>
      <DashboardContent />
    </AdminLayout>
  );
}

function DashboardContent() {
  return (
    <main className="space-y-8 px-4 pb-10 pt-8 lg:px-8">
      <section className="glass-panel p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="section-title mb-1">Executive Control</p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
              实时运营驾驶舱
            </h1>
            <p className="text-sm text-muted-foreground">
              多区域部署 · 智能风控 · 自定义仪表盘
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="rounded-2xl border border-border/70 px-4 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              导出快照
            </button>
            <button className="rounded-2xl bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90">
              发布到 Workspace
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel lg:col-span-2">
          <div className="border-b border-border/60 px-6 py-4">
            <p className="section-title">核心指标</p>
          </div>
          <div className="grid gap-4 px-6 py-6 md:grid-cols-2">
            {metricHighlights.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
          <div className="border-t border-border/60 px-6 pb-6">
            <RevenueChart data={revenueTrend} />
          </div>
        </div>

        <div className="glass-panel flex flex-col">
          <div className="border-b border-border/60 px-6 py-4">
            <p className="section-title">智能快照</p>
          </div>
          <div className="space-y-4 px-6 py-6">
            {quickActions.map((action) => (
              <div
                key={action.label}
                className="flex items-center justify-between rounded-2xl border border-border/60 px-4 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-foreground">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.helper}</p>
                </div>
                <span className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  →
                </span>
              </div>
            ))}
          </div>
          <div className="divider" />
          <div className="px-6 py-6">
            <p className="section-title mb-4">公告</p>
            <div className="space-y-4">
              {announcements.map((item) => (
                <div
                  key={item.title}
                  className="space-y-1 rounded-2xl border border-border/60 px-4 py-3"
                >
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{item.tag}</span>
                    <span>24h 内更新</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="glass-panel space-y-4 px-6 py-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-title mb-2">产品线表现</p>
              <p className="text-sm text-muted-foreground">
                统一看板 · 支持 Drill-down 与维度切换
              </p>
            </div>
            <button className="rounded-2xl border border-border/70 px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground">
              下载 CSV
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {productPerformance.map((product) => (
              <div key={product.name} className="rounded-2xl border border-border/60 p-4">
                <p className="text-sm font-semibold text-foreground">{product.name}</p>
                <p className="mt-2 text-2xl font-bold">{product.revenue}</p>
                <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                  <span>贡献度 {product.contribution}</span>
                  <span className="text-success">{product.change}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/60"
                    style={{ width: product.contribution }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="divider" />
          <p className="text-xs text-muted-foreground">
            数据来源：Mock.js · 仓库 `halolight/src/mock`
          </p>
        </div>

        <div className="glass-panel px-6 py-6">
          <p className="section-title mb-4">实时审计</p>
          <div className="space-y-5">
            {securityTimeline.map((item) => (
              <div key={item.title} className="rounded-2xl border border-border/60 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{item.time}</p>
                  <span
                    className={`rounded-full px-2 text-xs font-medium ${severityClass(item.severity)}`}
                  >
                    {item.channel}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-foreground">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="glass-panel px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-title mb-2">团队进度</p>
              <p className="text-sm text-muted-foreground">自动聚合项目健康度</p>
            </div>
            <button className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
              管理成员
            </button>
          </div>
          <div className="mt-4 space-y-4">
            {teams.map((team) => (
              <div key={team.name} className="rounded-2xl border border-border/60 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{team.name}</p>
                    <p className="text-xs text-muted-foreground">Owner · {team.owner}</p>
                  </div>
                  <p className="text-xs text-success">{team.change}</p>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-2xl font-bold">{team.completion}%</div>
                  <p className="text-xs text-muted-foreground">{team.members} 人在执行</p>
                </div>
                <div className="mt-3 h-2 rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${team.completion}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="section-title mb-2">任务流</p>
              <p className="text-sm text-muted-foreground">跨团队任务实时进度</p>
            </div>
            <button className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline">
              查看全部
            </button>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="pb-3">任务</th>
                  <th className="pb-3">Owner</th>
                  <th className="pb-3">状态</th>
                  <th className="pb-3 text-right">优先级</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {tasks.map((task) => (
                  <tr key={task.title} className="text-sm">
                    <td className="py-3 font-medium text-foreground">{task.title}</td>
                    <td className="py-3 text-muted-foreground">{task.owner}</td>
                    <td className="py-3">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span
                        className={`rounded-full px-2 py-1 text-xs uppercase tracking-[0.2em] ${priorityClass(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({ metric }: { metric: MetricDatum }) {
  return (
    <div className="rounded-2xl border border-border/60 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{metric.label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{metric.value}</p>
          <p className="text-xs text-muted-foreground">{metric.helper}</p>
        </div>
        <div className="rounded-2xl bg-muted p-3 text-primary">{iconMap[metric.icon]}</div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        {metric.trend === "up" ? (
          <ArrowUpIcon className="text-success" size={16} />
        ) : (
          <ArrowDownIcon className="text-destructive" size={16} />
        )}
        <span
          className={
            metric.trend === "up" ? "text-success font-semibold" : "text-destructive font-semibold"
          }
        >
          {metric.change}
        </span>
        <span className="text-muted-foreground text-xs">vs 30d</span>
      </div>
    </div>
  );
}

function RevenueChart({ data }: { data: RevenuePoint[] }) {
  const primaryPath = buildPath(data, "value");
  const baselinePath = buildPath(data, "baseline");

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-foreground">收入趋势</p>
          <p className="text-xs text-muted-foreground">同比增长 32.4%</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-primary" /> 当前计划
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-muted-foreground" /> 基准线
          </span>
        </div>
      </div>
      <div className="mt-4">
        <svg viewBox={`0 0 100 ${height}`} className="h-[260px] w-full">
          <defs>
            <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--color-primary) / 0.6)" />
              <stop offset="100%" stopColor="rgb(var(--color-primary) / 0.05)" />
            </linearGradient>
          </defs>
          <path d={`${primaryPath} L 100,${height} L 0,${height} Z`} fill="url(#areaFill)" />
          <path d={primaryPath} fill="none" stroke="rgb(var(--color-primary))" strokeWidth="1.5" />
          <path
            d={baselinePath}
            fill="none"
            stroke="rgb(var(--color-muted-foreground))"
            strokeDasharray="4 4"
            strokeWidth="1.2"
          />
        </svg>
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {data.map((point) => (
            <span key={point.month}>{point.month}</span>
          ))}
        </div>
      </div>
    </div>
  );
}