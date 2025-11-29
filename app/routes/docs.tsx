import type { Route } from "./+types/docs"
import { redirect } from "react-router"
import {
  HelpCircle,
  Search,
  Book,
  Code,
  Settings,
  Users,
  Shield,
  Zap,
  ExternalLink,
  ChevronRight,
} from "lucide-react"

import { requireAuth } from "~/lib/auth.server"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
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
interface DocArticle {
  title: string
  href: string
}

interface DocCategory {
  id: string
  title: string
  description: string
  icon: typeof Zap
  color: string
  articles: DocArticle[]
}

interface FAQ {
  question: string
  answer: string
}

// 文档分类
const categories: DocCategory[] = [
  {
    id: "1",
    title: "快速开始",
    description: "了解系统基础功能和操作流程",
    icon: Zap,
    color: "text-amber-500",
    articles: [
      { title: "系统介绍", href: "#" },
      { title: "首次登录", href: "#" },
      { title: "界面概览", href: "#" },
    ],
  },
  {
    id: "2",
    title: "用户指南",
    description: "详细的功能使用说明",
    icon: Book,
    color: "text-blue-500",
    articles: [
      { title: "用户管理", href: "#" },
      { title: "权限配置", href: "#" },
      { title: "数据分析", href: "#" },
    ],
  },
  {
    id: "3",
    title: "开发文档",
    description: "API 接口和技术文档",
    icon: Code,
    color: "text-emerald-500",
    articles: [
      { title: "API 概述", href: "#" },
      { title: "认证授权", href: "#" },
      { title: "错误处理", href: "#" },
    ],
  },
  {
    id: "4",
    title: "系统配置",
    description: "系统参数和配置说明",
    icon: Settings,
    color: "text-purple-500",
    articles: [
      { title: "基础配置", href: "#" },
      { title: "邮件设置", href: "#" },
      { title: "存储配置", href: "#" },
    ],
  },
  {
    id: "5",
    title: "团队协作",
    description: "团队管理和协作功能",
    icon: Users,
    color: "text-rose-500",
    articles: [
      { title: "创建团队", href: "#" },
      { title: "成员管理", href: "#" },
      { title: "角色权限", href: "#" },
    ],
  },
  {
    id: "6",
    title: "安全指南",
    description: "账号安全和数据保护",
    icon: Shield,
    color: "text-indigo-500",
    articles: [
      { title: "密码策略", href: "#" },
      { title: "双因素认证", href: "#" },
      { title: "数据备份", href: "#" },
    ],
  },
]

// 常见问题
const faqs: FAQ[] = [
  {
    question: "如何重置密码？",
    answer: "点击登录页面的「忘记密码」链接，输入注册邮箱即可收到重置密码的邮件。",
  },
  {
    question: "如何修改个人信息？",
    answer: "登录后点击右上角头像，选择「个人设置」即可修改您的个人信息。",
  },
  {
    question: "如何联系技术支持？",
    answer: "您可以通过页面底部的联系方式或发送邮件至 support@example.com 联系我们。",
  },
  {
    question: "数据如何备份？",
    answer: "系统每天自动进行数据备份，您也可以在设置中手动导出数据。",
  },
]

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    return { user }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/docs")
}

export default function DocsPage({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold tracking-tight">帮助文档</h1>
          <p className="text-muted-foreground mt-2">
            查找您需要的帮助信息，了解如何使用系统的各项功能
          </p>
          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索文档..."
              className="pl-9 h-12 text-base"
            />
          </div>
        </div>

        {/* 文档分类 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div
                    className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${category.color}`}
                  >
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-base">{category.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {category.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {category.articles.map((article) => (
                    <li key={article.title}>
                      <a
                        href={article.href}
                        className="flex items-center justify-between text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {article.title}
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 常见问题 */}
        <Card>
          <CardHeader>
            <CardTitle>常见问题</CardTitle>
            <CardDescription>用户最常问的问题和解答</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                  <h4 className="font-medium flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-primary" />
                    {faq.question}
                  </h4>
                  <p className="text-sm text-muted-foreground mt-2 ml-6">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 更多帮助 */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Book className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">完整文档</h3>
                <p className="text-sm text-muted-foreground">
                  访问在线文档获取更详细的信息
                </p>
              </div>
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                访问
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <div className="h-12 w-12 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                <Code className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">开发者中心</h3>
                <p className="text-sm text-muted-foreground">
                  API 文档、SDK 和开发指南
                </p>
              </div>
              <Button variant="outline">
                <ExternalLink className="mr-2 h-4 w-4" />
                访问
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
