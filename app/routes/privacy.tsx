import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/footer";
import { generateMeta } from "../lib/meta";

export function meta() {
  return generateMeta("/privacy");
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            返回首页
          </Link>

          <h1 className="text-3xl font-bold text-foreground mb-8">隐私政策</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              最后更新日期：2024年1月1日
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. 信息收集</h2>
              <p>
                我们收集您在使用服务时主动提供的信息，包括但不限于：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>账户信息：电子邮件地址、用户名、密码</li>
                <li>个人资料：姓名、公司名称、联系方式</li>
                <li>使用数据：访问日志、功能使用情况</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. 信息使用</h2>
              <p>
                我们使用收集的信息用于：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>提供和维护我们的服务</li>
                <li>改进和个性化用户体验</li>
                <li>与您沟通，包括发送服务通知</li>
                <li>防止欺诈和滥用行为</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. 信息共享</h2>
              <p>
                我们不会出售您的个人信息。我们可能在以下情况下共享您的信息：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>经您同意</li>
                <li>与服务提供商合作（如云存储服务）</li>
                <li>遵守法律要求</li>
                <li>保护我们的权利和安全</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. 数据安全</h2>
              <p>
                我们采取适当的技术和组织措施来保护您的个人信息，包括：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>数据传输加密（HTTPS/TLS）</li>
                <li>密码哈希存储</li>
                <li>定期安全审计</li>
                <li>访问控制和权限管理</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. Cookie 使用</h2>
              <p>
                我们使用 Cookie 和类似技术来：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>维持您的登录状态</li>
                <li>记住您的偏好设置</li>
                <li>分析服务使用情况</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. 您的权利</h2>
              <p>
                您有权：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>访问和获取您的个人数据副本</li>
                <li>更正不准确的个人数据</li>
                <li>请求删除您的个人数据</li>
                <li>撤回对数据处理的同意</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. 联系我们</h2>
              <p>
                如果您对本隐私政策有任何疑问，请通过以下方式联系我们：
              </p>
              <p>
                电子邮件：privacy@halolight.dev
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
