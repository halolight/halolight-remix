import type { Route } from "./+types/files"
import { redirect } from "react-router"
import {
  Upload,
  Grid,
  List,
  Search,
  Filter,
  MoreVertical,
  Download,
  Trash2,
  Eye,
  Share2,
  File,
  Image,
  FileVideo,
  FileAudio,
  FileArchive,
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
interface FileItem {
  id: string
  name: string
  type: "image" | "video" | "audio" | "archive" | "file"
  size: string
  uploadedAt: string
}

// 模拟文件数据
const files: FileItem[] = [
  {
    id: "1",
    name: "项目截图.png",
    type: "image",
    size: "2.4 MB",
    uploadedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "演示视频.mp4",
    type: "video",
    size: "156 MB",
    uploadedAt: "2024-01-14",
  },
  {
    id: "3",
    name: "数据备份.zip",
    type: "archive",
    size: "45.8 MB",
    uploadedAt: "2024-01-13",
  },
  {
    id: "4",
    name: "会议录音.mp3",
    type: "audio",
    size: "12.3 MB",
    uploadedAt: "2024-01-12",
  },
  {
    id: "5",
    name: "设计稿.psd",
    type: "file",
    size: "89.5 MB",
    uploadedAt: "2024-01-11",
  },
  {
    id: "6",
    name: "产品图片.jpg",
    type: "image",
    size: "3.1 MB",
    uploadedAt: "2024-01-10",
  },
]

const fileIcons = {
  image: Image,
  video: FileVideo,
  audio: FileAudio,
  archive: FileArchive,
  file: File,
}

const fileColors = {
  image: "text-emerald-500",
  video: "text-purple-500",
  audio: "text-amber-500",
  archive: "text-rose-500",
  file: "text-blue-500",
}

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    return { user, files }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/files")
}

export default function FilesPage({ loaderData }: Route.ComponentProps) {
  const { user, files } = loaderData

  return (
    <AdminLayout user={user}>
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">文件存储</h1>
            <p className="text-muted-foreground mt-1">
              管理您上传的所有文件和媒体资源
            </p>
          </div>
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            上传文件
          </Button>
        </div>

        {/* 工具栏 */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="搜索文件..." className="pl-9" />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              筛选
            </Button>
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon-sm" className="rounded-r-none">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon-sm" className="rounded-l-none">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 存储统计 */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>总存储空间</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">100 GB</div>
              <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "45%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                已使用 45 GB
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>图片</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-500">1,284</div>
              <p className="text-xs text-muted-foreground mt-1">
                共 12.5 GB
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>视频</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-500">86</div>
              <p className="text-xs text-muted-foreground mt-1">
                共 25.8 GB
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>其他</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">456</div>
              <p className="text-xs text-muted-foreground mt-1">
                共 6.7 GB
              </p>
            </CardContent>
          </Card>
        </div>

        {/* 文件网格 */}
        <Card>
          <CardHeader>
            <CardTitle>最近上传</CardTitle>
            <CardDescription>您最近上传的文件</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {files.map((file: FileItem) => {
                const IconComponent =
                  fileIcons[file.type as keyof typeof fileIcons]
                const colorClass =
                  fileColors[file.type as keyof typeof fileColors]
                return (
                  <div
                    key={file.id}
                    className="group relative border rounded-lg p-4 hover:border-primary/50 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex flex-col items-center text-center">
                      <IconComponent className={`h-12 w-12 ${colorClass}`} />
                      <p className="mt-2 font-medium text-sm truncate w-full">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {file.size}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {file.uploadedAt}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          预览
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          下载
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Share2 className="mr-2 h-4 w-4" />
                          分享
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          删除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
