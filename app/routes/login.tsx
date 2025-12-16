import { Form, Link, redirect, useActionData, useNavigation } from "react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  Chrome,
  Eye,
  EyeOff,
  Github,
  Loader2,
  Lock,
  Mail,
  MessageCircle,
  Sparkles,
  User,
} from "lucide-react"

import { mockLogin } from "~/lib/mock/auth"
import { generateMeta } from "~/lib/meta"
import { AuthShell } from "~/components/auth/auth-shell"
import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Separator } from "~/components/ui/separator"

// 环境变量配置（服务端安全）
const config = {
  appTitle: "Admin Pro",
  brandName: "Halolight",
  demoEmail: "admin@halolight.h7ml.cn",
  demoPassword: "123456",
  showDemoHint: true,
}

// 服务端处理登录逻辑
export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const remember = formData.get("remember") === "on"

  try {
    const { user, token } = await mockLogin({ email, password, remember })

    // 使用Headers对象设置cookie
    const headers = new Headers()
    const maxAge = remember ? 60 * 60 * 24 * 7 : 60 * 60 * 24
    headers.append("Set-Cookie", `auth_token=${token}; Path=/; HttpOnly; Max-Age=${maxAge}`)
    headers.append("Set-Cookie", `user_data=${encodeURIComponent(JSON.stringify(user))}; Path=/; Max-Age=${maxAge}`)

    // 使用 redirect 函数
    return redirect("/", { headers })
  } catch (error) {
    return { error: error instanceof Error ? error.message : "登录失败" }
  }
}

export function meta() {
  return generateMeta("/login")
}

export default function Login() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState(config.showDemoHint ? config.demoEmail : "")
  const [password, setPassword] = useState(config.showDemoHint ? config.demoPassword : "")
  const error = actionData?.error
  const isSubmitting = navigation.state === "submitting"

  const fillDemoCredentials = () => {
    setEmail(config.demoEmail)
    setPassword(config.demoPassword)
  }

  const SOCIAL_LINKS = {
    github: "https://github.com/halolight/halolight-remix",
    google: "https://halolight-docs.h7ml.cn",
    wechat: "https://github.com/halolight",
  }

  return (
    <AuthShell
      rightPaddingClassName="p-3 sm:p-4 lg:px-10 lg:py-6"
      left={
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <motion.div
            className="flex items-center gap-3 mb-12"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <div className="relative h-14 w-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
              <Sparkles className="h-7 w-7" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Admin Pro</h2>
              <p className="text-xs text-white/60">企业级管理系统</p>
            </div>
          </motion.div>

          <h1 className="text-5xl xl:text-6xl font-bold mb-6 leading-tight">
            欢迎回来
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block ml-2"
            >
              👋
            </motion.span>
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed mb-12">
            登录您的账户，开始管理您的业务数据和团队协作，体验高效的工作流程。
          </p>

          <div className="space-y-4">
            {[
              { icon: "🚀", text: "快速部署，即刻启动" },
              { icon: "📊", text: "实时数据分析与可视化" },
              { icon: "🔒", text: "企业级安全保障" },
              { icon: "⚡", text: "极致性能体验" },
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-white/90">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      }
      right={
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-5 lg:hidden text-center"
          >
            <div className="inline-flex items-center gap-3 mb-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-xl">
              <Sparkles className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Admin Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">欢迎回来，请登录您的账户</p>
          </motion.div>

          <Card className="border border-border/50 shadow-2xl backdrop-blur-xl bg-card/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <CardHeader className="space-y-1 text-center pb-3 sm:pb-5 pt-4 sm:pt-7">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  登录账户
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-2">
                  输入您的邮箱和密码登录
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {[
                  { icon: Github, name: "github", label: "GitHub" },
                  { icon: Chrome, name: "google", label: "Google" },
                  { icon: MessageCircle, name: "wechat", label: "微信" },
                ].map((provider, index) => (
                  <motion.div
                    key={provider.name}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <a
                      href={SOCIAL_LINKS[provider.name as keyof typeof SOCIAL_LINKS]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-11 sm:h-12 border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group inline-flex items-center justify-center border rounded-lg"
                    >
                      <provider.icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </a>
                  </motion.div>
                ))}
              </div>

              <div className="relative py-3">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground font-medium">
                    或使用邮箱登录
                  </span>
                </div>
              </div>

              <Form method="post" className="space-y-3 sm:space-y-4">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs sm:text-sm"
                  >
                    {error}
                  </motion.div>
                )}

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-medium text-muted-foreground">邮箱地址</label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                    <Input
                      type="email"
                      name="email"
                      placeholder="your@email.h7ml.cn"
                      className="pl-10 h-12 text-sm border-border/50 focus:border-primary/50 rounded-xl transition-all"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <label className="text-xs font-medium text-muted-foreground">密码</label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 text-sm border-border/50 focus:border-primary/50 rounded-xl transition-all"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-between text-xs sm:text-sm"
                >
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="remember"
                      className="rounded border-gray-300 w-4 h-4 text-primary focus:ring-primary"
                    />
                    <span className="text-muted-foreground group-hover:text-foreground transition-colors">记住我</span>
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    忘记密码？
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-center gap-2 py-2"
                >
                  <div className="flex-1 h-px bg-border/50" />
                  {config.showDemoHint && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={fillDemoCredentials}
                      className="h-7 px-3 text-xs text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg"
                    >
                      <User className="h-3 w-3 mr-1.5" />
                      测试账号
                    </Button>
                  )}
                  <div className="flex-1 h-px bg-border/50" />
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Button
                    type="submit"
                    className="w-full h-12 text-sm font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        登录中...
                      </>
                    ) : (
                      <>
                        登录
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </>
                    )}
                  </Button>
                </motion.div>
              </Form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 sm:space-y-4 px-4 sm:px-6 pb-5 sm:pb-8 pt-2">
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground text-center">
                还没有账户？{" "}
                <Link to="/register" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                  立即注册
                </Link>
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground/70 text-center leading-relaxed">
                阅读我们的{" "}
                <Link
                  to="/terms"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  服务条款
                </Link>{" "}
                和{" "}
                <Link
                  to="/privacy"
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  隐私政策
                </Link>{" "}
                了解更多信息。
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      }
    />
  )
}
