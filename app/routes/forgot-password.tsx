import { Form, Link, useActionData, useNavigation } from "react-router"
import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Mail,
  Shield,
  Sparkles,
} from "lucide-react"

import { mockForgotPassword } from "~/lib/mock/auth"
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

// 忘记密码页背景配置
const forgotBackground = {
  gridSize: 26,
  halos: [
    {
      from: "from-sky-400/30",
      to: "to-cyan-400/30",
      className: "absolute -top-36 -left-32 w-96 h-96 rounded-full blur-3xl",
      animate: { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] },
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
    },
    {
      from: "from-emerald-400/25",
      to: "to-teal-400/25",
      className: "absolute top-1/3 -right-24 w-80 h-80 rounded-full blur-3xl",
      animate: { scale: [1.15, 0.95, 1.15], opacity: [0.35, 0.55, 0.35] },
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
    },
  ],
}

// 服务端处理忘记密码逻辑
export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const email = formData.get("email") as string

  if (!email) {
    return { error: "请输入邮箱地址" }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "请输入有效的邮箱地址" }
  }

  try {
    await mockForgotPassword({ email })
    return { success: true, email }
  } catch (error) {
    return { error: error instanceof Error ? error.message : "发送失败" }
  }
}

export function meta() {
  return generateMeta("/forgot-password")
}

export default function ForgotPassword() {
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()
  const [email, setEmail] = useState("")
  const [hasReset, setHasReset] = useState(false)
  const error = actionData?.error
  const isSubmitting = navigation.state === "submitting"
  // 成功状态：来自 actionData，但可被用户重置
  const isSubmitted = !hasReset && (actionData?.success ?? false)

  const handleResend = () => {
    setHasReset(true)
    setEmail("")
  }

  return (
    <AuthShell
      leftGradientClassName="bg-gradient-to-br from-sky-600 via-cyan-600 to-emerald-600"
      backgroundOptions={forgotBackground}
      floatingDots={{ count: 5, colorClassName: "bg-white/25" }}
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
            找回密码
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block ml-2"
            >
              🔐
            </motion.span>
          </h1>
          <p className="text-lg text-white/70 max-w-md leading-relaxed mb-12">
            别担心，我们会帮助您重新获得账户访问权限。只需几个简单的步骤即可完成。
          </p>

          <div className="space-y-4">
            {[
              { icon: "📧", text: "输入注册邮箱地址" },
              { icon: "🔗", text: "接收安全重置链接" },
              { icon: "🔐", text: "设置新的安全密码" },
              { icon: "✅", text: "重新登录您的账户" },
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
            <div className="inline-flex items-center gap-3 mb-3 px-6 py-3 rounded-2xl bg-gradient-to-br from-sky-600 to-emerald-600 shadow-xl">
              <Sparkles className="h-6 w-6 text-white" />
              <span className="text-xl font-bold text-white">Admin Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">找回您的账户密码</p>
          </motion.div>

          <Card className="border border-border/50 shadow-2xl backdrop-blur-xl bg-card/80 overflow-hidden">
            {!isSubmitted ? (
              <>
                <div className="h-1 bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-600" />

                <CardHeader className="space-y-1 text-center pb-3 sm:pb-5 pt-4 sm:pt-7">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="mx-auto relative mb-5"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-600 flex items-center justify-center shadow-2xl">
                      <Mail className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                      <motion.div
                        className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 to-transparent"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <motion.div
                      className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-lg"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="h-4 w-4 text-yellow-900" />
                    </motion.div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-sky-600 to-cyan-600 bg-clip-text text-transparent">
                      忘记密码？
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm mt-2 leading-relaxed">
                      别担心，输入您的邮箱地址
                      <br />
                      我们将发送密码重置链接
                    </CardDescription>
                  </motion.div>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6 pb-5 sm:pb-7">
                  <Form method="post" className="space-y-4">
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
                      transition={{ delay: 0.4 }}
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
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        type="submit"
                        className="w-full h-11 sm:h-12 text-sm font-medium bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            发送中...
                          </>
                        ) : (
                          <>
                            发送重置链接
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

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="flex items-start gap-3 p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-800/50"
                    >
                      <Shield className="h-5 w-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        <p className="font-medium text-foreground mb-1">安全提示</p>
                        重置链接将在15分钟后过期，请及时查收邮件并完成密码重置。
                      </div>
                    </motion.div>
                  </Form>
                </CardContent>
              </>
            ) : (
              <>
                <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

                <CardHeader className="space-y-1 text-center pb-3 sm:pb-5 pt-4 sm:pt-7">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="mx-auto relative mb-5"
                  >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                      <CheckCircle2 className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(34, 197, 94, 0.4)",
                            "0 0 0 20px rgba(34, 197, 94, 0)",
                          ],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <CardTitle className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                      邮件已发送
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm leading-relaxed">
                      我们已向 <span className="font-semibold text-foreground">{actionData?.email || email}</span> 发送了密码重置链接
                    </CardDescription>
                  </motion.div>
                </CardHeader>

                <CardContent className="space-y-4 px-4 sm:px-6 pb-5 sm:pb-7">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="p-4 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/50 dark:border-sky-800/50">
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        📧 请检查您的邮箱并点击链接重置密码
                        <br />
                        📁 如果没有收到，请检查垃圾邮件文件夹
                        <br />
                        ⏰ 链接将在15分钟后过期
                      </p>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full h-11 text-sm border-border/50 hover:border-primary/50 hover:bg-primary/5 rounded-xl transition-all"
                      onClick={handleResend}
                    >
                      重新发送
                    </Button>
                  </motion.div>
                </CardContent>
              </>
            )}

            <CardFooter className="px-4 sm:px-6 pb-5 sm:pb-7 pt-2">
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-primary font-medium transition-colors w-full group"
              >
                <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                返回登录
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      }
    />
  )
}
