"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/40 dark:border-border-dark/40 bg-white/50 dark:bg-black/50 backdrop-blur-xl">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-foreground dark:bg-white rounded-xl flex items-center justify-center text-background dark:text-black shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight">Cloudflare Blog</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              分享技术、创意与生活。
              <br />
              保持简洁、快速与安全。
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2">
            <h4 className="font-semibold mb-6 text-foreground">导航</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/posts" className="hover:text-primary transition-colors">文章</Link></li>
              <li><Link href="/tags" className="hover:text-primary transition-colors">标签</Link></li>
              <li><Link href="/categories" className="hover:text-primary transition-colors">分类</Link></li>
              <li><Link href="/archive" className="hover:text-primary transition-colors">归档</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-semibold mb-6 text-foreground">关于</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">关于我</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
              <li><Link href="/rss.xml" className="hover:text-primary transition-colors">RSS 订阅</Link></li>
            </ul>
          </div>

          {/* Subscription Section */}
          <div className="md:col-span-4">
            <h4 className="font-semibold mb-6 text-foreground">订阅更新</h4>
            <p className="text-sm text-muted-foreground mb-4">
              获取最新的文章和技术分享，直接发送到您的邮箱。
            </p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="您的邮箱地址"
                className="bg-white dark:bg-surface-dark"
              />
              <Button className="w-full" variant="default">
                订阅
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section - 不包含admin链接 */}
        <div className="mt-16 pt-8 border-t border-border/40 dark:border-border-dark/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Cloudflare Blog. All rights reserved.
            </span>
            <div className="flex items-center gap-6 text-xs">
              <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                隐私政策
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                服务条款
              </Link>
              <Link href="/sitemap.xml" className="text-muted-foreground hover:text-foreground transition-colors">
                站点地图
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}