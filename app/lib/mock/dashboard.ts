export type TrendDirection = "up" | "down";

export type MetricDatum = {
  label: string;
  value: string;
  helper: string;
  change: string;
  trend: TrendDirection;
  icon: "revenue" | "users" | "retention" | "security";
};

export const metricHighlights: MetricDatum[] = [
  {
    label: "月度经常性收入",
    value: "￥1.82M",
    helper: "vs 上月",
    change: "+18.4%",
    trend: "up",
    icon: "revenue",
  },
  {
    label: "新增企业客户",
    value: "326",
    helper: "活跃试用 72%",
    change: "+11.2%",
    trend: "up",
    icon: "users",
  },
  {
    label: "留存率",
    value: "97.6%",
    helper: "Rolling 90 天",
    change: "+2.1%",
    trend: "up",
    icon: "retention",
  },
  {
    label: "安全拦截",
    value: "1,284",
    helper: "实时风控",
    change: "-6.7%",
    trend: "down",
    icon: "security",
  },
];

export type RevenuePoint = {
  month: string;
  value: number;
  baseline: number;
};

export const revenueTrend: RevenuePoint[] = [
  { month: "Jan", value: 64, baseline: 40 },
  { month: "Feb", value: 72, baseline: 43 },
  { month: "Mar", value: 78, baseline: 45 },
  { month: "Apr", value: 74, baseline: 47 },
  { month: "May", value: 81, baseline: 50 },
  { month: "Jun", value: 88, baseline: 53 },
  { month: "Jul", value: 96, baseline: 55 },
  { month: "Aug", value: 92, baseline: 56 },
  { month: "Sep", value: 98, baseline: 57 },
  { month: "Oct", value: 102, baseline: 58 },
  { month: "Nov", value: 110, baseline: 60 },
  { month: "Dec", value: 123, baseline: 61 },
];

export const productPerformance = [
  {
    name: "AI Copilot Suite",
    revenue: "￥420K",
    contribution: "38%",
    change: "+12.6%",
  },
  {
    name: "Realtime Analytics",
    revenue: "￥310K",
    contribution: "27%",
    change: "+6.9%",
  },
  {
    name: "Workflow Automation",
    revenue: "￥215K",
    contribution: "19%",
    change: "+4.2%",
  },
  {
    name: "Global Edge Shield",
    revenue: "￥158K",
    contribution: "16%",
    change: "+1.4%",
  },
];

export type ActivityItem = {
  time: string;
  title: string;
  channel: string;
  description: string;
  severity: "info" | "warning" | "critical";
};

export const securityTimeline: ActivityItem[] = [
  {
    time: "09:24",
    title: "风控拦截 · 异地高频登录",
    channel: "Zero Trust",
    description: "组织 ID #2891，14 分钟内 27 次失败尝试，已触发自动 MFA。",
    severity: "warning",
  },
  {
    time: "11:08",
    title: "数据导出 · 财务总账",
    channel: "Audit Stream",
    description: "审批链完成，自动生成脱敏报表投递至安全共享盘。",
    severity: "info",
  },
  {
    time: "13:42",
    title: "攻击面监控 · Bot 流量",
    channel: "Edge Shield",
    description: "Bot Score≥85 的可疑流量下降 37%，延迟保持在 42ms。",
    severity: "info",
  },
  {
    time: "16:17",
    title: "合规巡检 · CN-ISMS",
    channel: "Compliance",
    description: "12 项整改建议已闭环，证据包同步至审计工作台。",
    severity: "critical",
  },
];

export const teams = [
  {
    name: "产品体验团队",
    owner: "Hailey",
    completion: 82,
    change: "+4.1%",
    members: 18,
  },
  {
    name: "全球商用团队",
    owner: "Miguel",
    completion: 74,
    change: "+2.6%",
    members: 24,
  },
  {
    name: "安全响应团队",
    owner: "Zhang Wei",
    completion: 91,
    change: "+6.8%",
    members: 11,
  },
  {
    name: "数据智能团队",
    owner: "Aiko",
    completion: 67,
    change: "+1.3%",
    members: 15,
  },
];

export const tasks = [
  {
    title: "北美商机池 · 精准线索回流",
    owner: "Revenue Ops",
    due: "12/12",
    status: "in-progress",
    priority: "high",
  },
  {
    title: "AI Copilot · 体验可视化埋点",
    owner: "Product Intelligence",
    due: "12/15",
    status: "blocked",
    priority: "medium",
  },
  {
    title: "供应链仪表盘 · 视图权限下沉",
    owner: "Platform",
    due: "12/18",
    status: "in-review",
    priority: "low",
  },
  {
    title: "Edge Shield · L4 自动编排",
    owner: "SRE",
    due: "12/21",
    status: "in-progress",
    priority: "high",
  },
];

export const announcements = [
  {
    title: "12 月版本窗口",
    detail: "双活发布冻结 12/20-12/26，紧急变更需通过统一变更中心。",
    tag: "发布管控",
  },
  {
    title: "AI Copilot 北极星指标更新",
    detail: "新增高阶激活率与自动化关闭率，纳入周会复盘。",
    tag: "产品运营",
  },
  {
    title: "全球合规检查",
    detail: "ISO27001 年度再认证资料需 12/30 前提交。",
    tag: "合规",
  },
];

export const quickActions = [
  { label: "创建智能报表", helper: "3 mins", icon: "report" },
  { label: "邀请成员", helper: "RBAC 即时同步", icon: "invite" },
  { label: "自动化规则", helper: "拖拽编排", icon: "automation" },
  { label: "安全审计", helper: "导出证据链", icon: "shield" },
];
