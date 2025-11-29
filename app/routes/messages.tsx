import type { Route } from "./+types/messages"
import { redirect } from "react-router"
import {
  MessageSquare,
  Search,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Circle,
} from "lucide-react"

import { requireAuth } from "~/lib/auth.server"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Badge } from "~/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { ScrollArea } from "~/components/ui/scroll-area"
import { AdminLayout } from "~/components/admin-layout"
import { generateMeta } from "~/lib/meta"

// 类型定义
interface Conversation {
  id: string
  name: string
  avatar: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  isGroup?: boolean
}

interface Message {
  id: string
  sender: string
  content: string
  time: string
  isMe: boolean
  status: "read" | "delivered" | "sent"
}

// 模拟对话数据
const conversations: Conversation[] = [
  {
    id: "1",
    name: "张三",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    lastMessage: "好的，我马上处理",
    time: "刚刚",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "李四",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop&crop=face",
    lastMessage: "明天的会议改到下午三点",
    time: "5分钟前",
    unread: 0,
    online: true,
  },
  {
    id: "3",
    name: "王五",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    lastMessage: "文档已经更新了",
    time: "1小时前",
    unread: 0,
    online: false,
  },
  {
    id: "4",
    name: "产品组",
    avatar: "",
    lastMessage: "赵六: 新功能已上线",
    time: "昨天",
    unread: 5,
    online: false,
    isGroup: true,
  },
  {
    id: "5",
    name: "技术组",
    avatar: "",
    lastMessage: "孙七: 部署完成",
    time: "昨天",
    unread: 0,
    online: false,
    isGroup: true,
  },
]

// 模拟消息数据
const messages: Message[] = [
  {
    id: "1",
    sender: "张三",
    content: "你好，项目进度怎么样了？",
    time: "10:30",
    isMe: false,
    status: "read",
  },
  {
    id: "2",
    sender: "我",
    content: "进度正常，预计明天可以完成",
    time: "10:32",
    isMe: true,
    status: "read",
  },
  {
    id: "3",
    sender: "张三",
    content: "太好了，有什么需要协助的吗？",
    time: "10:33",
    isMe: false,
    status: "read",
  },
  {
    id: "4",
    sender: "我",
    content: "暂时没有，如果有问题我会及时反馈",
    time: "10:35",
    isMe: true,
    status: "read",
  },
  {
    id: "5",
    sender: "张三",
    content: "好的，我马上处理",
    time: "10:36",
    isMe: false,
    status: "delivered",
  },
]

export async function loader({ request }: Route.LoaderArgs) {
  try {
    const user = await requireAuth(request)
    return { user, conversations, messages }
  } catch {
    return redirect("/login")
  }
}

export function meta() {
  return generateMeta("/messages")
}

export default function MessagesPage({ loaderData }: Route.ComponentProps) {
  const { user, conversations, messages } = loaderData

  return (
    <AdminLayout user={user}>
      <div className="flex h-[calc(100vh-8rem)] border rounded-lg overflow-hidden bg-card">
        {/* 对话列表 */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold mb-3">消息</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="搜索对话..." className="pl-9" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2">
              {conversations.map((conv: Conversation) => (
                <div
                  key={conv.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                >
                  <div className="relative">
                    <Avatar>
                      {conv.avatar ? (
                        <AvatarImage src={conv.avatar} alt={conv.name} />
                      ) : null}
                      <AvatarFallback>
                        {conv.isGroup ? (
                          <MessageSquare className="h-4 w-4" />
                        ) : (
                          conv.name.slice(0, 1)
                        )}
                      </AvatarFallback>
                    </Avatar>
                    {conv.online && (
                      <Circle className="absolute bottom-0 right-0 h-3 w-3 fill-emerald-500 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium truncate">{conv.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge variant="default" className="rounded-full h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {conv.unread}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* 消息区域 */}
        <div className="flex-1 flex flex-col">
          {/* 对话头部 */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  alt="张三"
                />
                <AvatarFallback>张</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">张三</h3>
                <p className="text-xs text-emerald-500">在线</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          {/* 消息列表 */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg: Message) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.isMe
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 ${
                        msg.isMe ? "text-primary-foreground/70" : "text-muted-foreground"
                      }`}
                    >
                      <span className="text-xs">{msg.time}</span>
                      {msg.isMe && (
                        msg.status === "read" ? (
                          <CheckCheck className="h-3 w-3" />
                        ) : (
                          <Check className="h-3 w-3" />
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* 输入区域 */}
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="输入消息..." className="flex-1" />
              <Button variant="ghost" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
