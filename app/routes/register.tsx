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
  Phone,
  Sparkles,
  User,
} from "lucide-react"

import { mockRegister } from "~/lib/mock/auth"
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

// 注册页背景配置
const registerBackground = {
  gridSize: 28,
  halos: [
    {
      from: "from-purple-400/30",
      to: "to-pink-400/30",
      className: "absolute -top-36 -left-32 w-96 h-96 rounded-full blur-3xl",
      animate: { scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] },
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
    },
    {
      from: "from-fuchsia-400/25",
      to: "to-amber-400/25",
      className: "absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl",
      animate: { scale: [1.1, 0.95, 1.1], opacity: [0.35, 0.6, 0.35] },
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
    },
  ],
}

// 服务端处理注册逻辑
export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const name = formData.get("name") as string

  if (password !== confirmPassword) {
    return { error: "两次输入的密码不一致" }
  }

  if (password.length < 6) {
    return { error: "密码长度至少为6位" }
  }

  try {
    const { user, token } = await mockRegister({ email, password, name })

    const headers = new Headers()
    const maxAge = 60 * 60 * 24 * 7
    headers.append("Set-Cookie", `auth_token=${token}; Path=/; HttpOnly; Max-Age=${maxAge}`)
    headers.append("Set-Cookie", `user_data=${encodeURIComponent(JSON.stringify(user))}; Path=/; Max-Age=${maxAge}`)

    return redirect("/", { headers })
  } catch (error) {
    return { error: error instanceof Error ? error.message : "注册失败" }
  }
}

const SOCIAL_LINKS = {
  github: "https://github.com/halolight/halolight-remix",
  google: "https://halolight-docs.h7ml.cn",
  wechat: "https://github.com/halolight",
}

export function meta() {
  return generateMeta("/register")
}

export default function Register() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()

  // 读取注册开关环境变量，默认关闭
  const registrationEnabled = import.meta.env.VITE_ENABLE_REGISTRATION === 'true'

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const error = actionData?.error
  const isSubmitting = navigation.state === "submitting"

  return (
    <AuthShell
      leftGradientClassName="bg-gradient-to-br from-purple-600 via-fuchsia-600 to-indigo-600"
      backgroundOptions={registerBackground}
      floatingDots={{ count: 8, colorClassName: "bg-white/25" }}
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
            创建账户
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block ml-2"
            >
              ✨
            </motion.span>
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed mb-12">
            加入我们，开始体验强大的后台管理功能，提升您的工作效率。
          </p>

          <div className="space-y-4">
            {[
              { icon: "🎁", text: "完全免费的基础功能" },
              { icon: "📊", text: "实时数据分析和报告" },
              { icon: "👥", text: "团队协作和权限管理" },
              { icon: "💬", text: "7x24 小时技术支持" },
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
          className="w-full max-w-md my-1"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-4 lg:hidden text-center"
          >
            <div className="inline-flex items-center gap-3 mb-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-purple-600 to-fuchsia-600 shadow-xl">
              <Sparkles className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Admin Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">创建账户，开始您的旅程</p>
          </motion.div>

          <Card className="border border-border/50 shadow-2xl backdrop-blur-xl bg-card/80 overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600" />

            <CardHeader className="space-y-1 text-center pb-2 sm:pb-4 pt-3 sm:pt-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-fuchsia-600 bg-clip-text text-transparent">
                  创建账户
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm mt-2">
                  填写以下信息完成注册
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-2 sm:space-y-4 px-4 sm:px-6">
              {!registrationEnabled ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6 py-6"
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="relative"
                    >
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30">
                        <Lock className="h-10 w-10 text-amber-600 dark:text-amber-500" />
                      </div>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 rounded-full border-2 border-dashed border-amber-300/50 dark:border-amber-700/50"
                      />
                    </motion.div>

                    <div className="space-y-2 text-center">
                      <h3 className="text-xl font-semibold text-foreground sm:text-2xl">
                        注册已关闭
                      </h3>
                      <p className="max-w-sm text-sm text-muted-foreground">
                        系统管理员已暂时关闭新用户注册功能
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/50 p-4 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-muted/80"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30">
                        <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">联系管理员</p>
                        <p className="text-xs text-muted-foreground">
                          如需创建账号，请通过邮件联系系统管理员
                        </p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="flex items-start gap-3 rounded-lg border border-border/50 bg-muted/50 p-4 backdrop-blur-sm transition-colors hover:border-primary/20 hover:bg-muted/80"
                    >
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30">
                        <Phone className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium text-foreground">已有账号？</p>
                        <p className="text-xs text-muted-foreground">
                          如果您已有账号，请直接登录使用系统功能
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-card px-4 text-xs text-muted-foreground">感谢您的理解</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {[
                      { icon: Github, name: "github" },
                      { icon: Chrome, name: "google" },
                      { icon: MessageCircle, name: "wechat" },
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
                          className="w-full h-11 sm:h-12 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group inline-flex items-center justify-center rounded-md hover:bg-accent"
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
                        或使用邮箱注册
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
                      <label className="text-xs font-medium text-muted-foreground">您的姓名</label>
                      <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                        <Input
                          type="text"
                          name="name"
                          placeholder="张三"
                          className="pl-10 h-11 sm:h-12 text-sm border-border/50 focus:border-primary/50 rounded-xl transition-all"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.65 }}
                      className="space-y-2"
                    >
                      <label className="text-xs font-medium text-muted-foreground">邮箱地址</label>
                      <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors z-10" />
                        <Input
                          type="email"
                          name="email"
                          placeholder="your@email.com"
                          className="pl-10 h-11 sm:h-12 text-sm border-border/50 focus:border-primary/50 rounded-xl transition-all"
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.7 }}
                      className="space-y-2"
                    >
                      <label className="text-xs font-medium text-muted-foreground">设置密码</label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-11 sm:h-12 text-sm border-border/50 focus:border-primary/50 rounded-xl transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.75 }}
                      className="space-y-2"
                    >
                      <label className="text-xs font-medium text-muted-foreground">确认密码</label>
                      <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          name="confirmPassword"
                          placeholder="••••••••"
                          className="pl-10 pr-10 h-11 sm:h-12 text-sm border-border/50 focus:border-primary/50 rounded-xl transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <label className="flex items-start gap-2 cursor-pointer group text-xs sm:text-sm">
                        <input
                          type="checkbox"
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          className="rounded border-gray-300 mt-0.5 w-4 h-4 text-primary focus:ring-primary"
                        />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          我已阅读并同意{" "}
                          <Link to="/terms" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            服务条款
                          </Link>{" "}
                          和{" "}
                          <Link to="/privacy" className="text-primary hover:text-primary/80 font-medium transition-colors">
                            隐私政策
                          </Link>
                        </span>
                      </label>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.85 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-11 sm:h-12 text-sm font-medium bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isSubmitting || !agreedToTerms}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            注册中...
                          </>
                        ) : (
                          <>
                            创建账户
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
                </>
              )}
            </CardContent>

            <CardFooter className="flex flex-col space-y-3 sm:space-y-4 px-4 sm:px-6 pb-4 sm:pb-7 pt-2">
              {registrationEnabled ? (
                <>
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <Separator className="w-full" />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground text-center">
                    已有账户？{" "}
                    <Link to="/login" className="text-primary hover:text-primary/80 font-semibold transition-colors">
                      立即登录
                    </Link>
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full space-y-3"
                >
                  <Link to="/login" className="block w-full">
                    <Button
                      variant="default"
                      className="w-full bg-gradient-to-r from-purple-600 to-fuchsia-600 font-medium shadow-lg shadow-purple-500/30 transition-all hover:shadow-xl hover:shadow-purple-500/40"
                    >
                      <motion.span initial={{ x: 0 }} whileHover={{ x: -5 }} transition={{ duration: 0.2 }}>
                        ← 返回登录
                      </motion.span>
                    </Button>
                  </Link>
                  <p className="text-center text-xs text-muted-foreground">使用现有账号登录系统</p>
                </motion.div>
              )}
            </CardFooter>
          </Card>
        </motion.div>
      }
    />
  )
}
