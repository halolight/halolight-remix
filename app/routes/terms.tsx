import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import Footer from "../components/footer";
import { generateMeta } from "../lib/meta";

export function meta() {
  return generateMeta("/terms");
}

export default function TermsPage() {
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

          <h1 className="text-3xl font-bold text-foreground mb-8">服务条款</h1>

          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
            <p className="text-sm text-muted-foreground">
              最后更新日期：2024年1月1日
            </p>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">1. 服务说明</h2>
              <p>
                HaloLight 提供企业级后台管理系统解决方案。通过使用我们的服务，您同意遵守以下条款。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">2. 账户注册</h2>
              <p>
                使用某些服务功能需要注册账户。注册时，您需要：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>提供真实、准确的信息</li>
                <li>保护账户密码安全</li>
                <li>对账户下的所有活动负责</li>
                <li>及时更新账户信息</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">3. 使用规范</h2>
              <p>
                您同意不会使用本服务进行以下行为：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>违反任何适用的法律法规</li>
                <li>侵犯他人的知识产权或其他合法权益</li>
                <li>传播恶意软件或进行网络攻击</li>
                <li>发送垃圾邮件或进行欺诈活动</li>
                <li>干扰或破坏服务的正常运行</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">4. 知识产权</h2>
              <p>
                服务中的所有内容，包括但不限于：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>软件代码和文档</li>
                <li>设计和用户界面</li>
                <li>商标和品牌标识</li>
                <li>文字、图片和其他媒体内容</li>
              </ul>
              <p>
                均受知识产权法律保护，未经授权不得复制、修改或分发。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">5. 服务变更</h2>
              <p>
                我们保留以下权利：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>随时修改、暂停或终止服务</li>
                <li>更新服务功能和定价</li>
                <li>修改这些服务条款</li>
              </ul>
              <p>
                重大变更将通过电子邮件或服务内通知提前告知用户。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">6. 免责声明</h2>
              <p>
                服务按"现状"提供，我们不对以下事项作出保证：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>服务将不间断、及时、安全或无错误</li>
                <li>服务将满足您的特定需求</li>
                <li>任何缺陷或错误将被纠正</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">7. 责任限制</h2>
              <p>
                在法律允许的最大范围内，HaloLight 及其管理人员、员工和合作伙伴不对以下损失承担责任：
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>间接、附带或后果性损失</li>
                <li>利润损失或业务中断</li>
                <li>数据丢失或损坏</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">8. 争议解决</h2>
              <p>
                因本条款引起的任何争议，应首先通过友好协商解决。
                如协商不成，应提交至服务提供商所在地有管辖权的法院解决。
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">9. 联系方式</h2>
              <p>
                如果您对本服务条款有任何疑问，请联系我们：
              </p>
              <p>
                电子邮件：legal@halolight.dev
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
