import type { Route } from "./+types/documents"
import { redirect } from "react-router"
import {
  FileText,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Download,
  Trash2,
  Eye,
  Edit,
  Clock,
  User,
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
interface Document {
  id: string
  title: string
  type: string
  size: string
  author: string
  updatedAt: string
  status: "published" | "draft" | "review"
}

// 模拟文档数据
const documents: Document[] = [
  {
    id: "1",
    title: "项目需求文档",
    type: "Word",
    size: "2.4 MB",
    author: "张三",
    updatedAt: "2024-01-15 14:30",
    status: "published",
  },
  {
    id: "2",
    title: "系统设计方案",
    type: "PDF",
    size: "5.1 MB",
    author: "李四",
    updatedAt: "2024-01-14 09:15",
    status: "draft",
  },
  {
    id: "3",
    title: "用户手册 v2.0",
    type: "Word",
    size: "1.8 MB",
    author: "王五",
    updatedAt: "2024-01-13 16:45",
    status: "published",
  },
  {
    id: "4",
    title: "API 接口文档",
    type: "Markdown",
    size: "456 KB",
    author: "赵六",
    updatedAt: "2024-01-12 11:20",
    status: "review",
  },
  {
    id: "5",
    title: "测试报告",
    type: "Excel",
    size: "3.2 MB",
    author: "孙七",
    updatedAt: "2024-01-11 08:00",
    status: "published",
  },
]

const statusMap = {
  published: { label: "已发布", variant: "success" as const },
  draft: { label: "草稿", variant: "secondary" as const },
  review: { label: "审核中", variant: "warning" as const },
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    return { user, documents }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/documents")
}

export default function DocumentsPage({ loaderData }: Route.ComponentProps) {
  const { user, documents } = loaderData

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">文档管理</h1>
            <p className="text-muted-foreground mt-1">
              管理和组织您的所有文档资料
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            新建文档
          </Button>
        </div>

        {/* 搜索和筛选 */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索文档..." className="pl-9" />
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
              <CardDescription>总文档数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>已发布</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">96</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>草稿</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-muted-foreground">24</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>审核中</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-500">8</div>
            </CardContent>
          </Card>
        </div>

        {/* 文档列表 */}
        <Card>
          <CardHeader>
            <CardTitle>文档列表</CardTitle>
            <CardDescription>所有文档的详细信息</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>文档名称</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>大小</TableHead>
                  <TableHead>作者</TableHead>
                  <TableHead>更新时间</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc: Document) => (
                  <TableRow key={doc.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{doc.title}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doc.type}</TableCell>
                    <TableCell>{doc.size}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {doc.author}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {doc.updatedAt}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          statusMap[doc.status as keyof typeof statusMap]
                            .variant
                        }
                      >
                        {
                          statusMap[doc.status as keyof typeof statusMap]
                            .label
                        }
                      </Badge>
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
                            <Eye className="mr-2 h-4 w-4" />
                            查看
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            编辑
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            下载
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            删除
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
      </div>
    </AdminLayout>
  )
}
