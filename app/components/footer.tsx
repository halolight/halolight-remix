import { Link } from "react-router";
import { Shield, Github, Twitter } from "lucide-react";

interface FooterProps {
  className?: string;
}

export default function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const links = {
    product: [
      { label: "功能特性", href: "#" },
      { label: "定价方案", href: "#" },
      { label: "更新日志", href: "#" },
      { label: "路线图", href: "#" },
    ],
    company: [
      { label: "关于我们", href: "#" },
      { label: "联系我们", href: "#" },
      { label: "加入我们", href: "#" },
      { label: "博客", href: "#" },
    ],
    legal: [
      { label: "隐私政策", href: "/privacy" },
      { label: "服务条款", href: "/terms" },
      { label: "Cookie 政策", href: "#" },
    ],
    social: [
      { label: "GitHub", href: "https://github.com/halolight", icon: Github },
      { label: "Twitter", href: "#", icon: Twitter },
    ],
  };

  return (
    <footer className={`border-t border-border bg-card ${className}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* 品牌区域 */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-foreground">Halolight</span>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              现代化的后台管理系统模板，支持多种前端框架。
            </p>
            <div className="mt-4 flex space-x-4">
              {links.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 产品 */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">产品</h3>
            <ul className="mt-4 space-y-3">
              {links.product.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 公司 */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">公司</h3>
            <ul className="mt-4 space-y-3">
              {links.company.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 法律 */}
          <div>
            <h3 className="text-sm font-semibold text-foreground">法律</h3>
            <ul className="mt-4 space-y-3">
              {links.legal.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Halolight. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
