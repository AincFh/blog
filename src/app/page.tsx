"use client";

import ArticleListWithPreload from "@/frontend/components/ArticleListWithPreload";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/shared/components/ui/Button";
import { ArrowRight, Code, Palette, BookOpen } from "lucide-react";

export default function Home() {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const headlines = ["欢迎来到我的博客", "探索技术与创意", "记录成长与灵感"];

  useEffect(() => {
    const t = setInterval(() => setHeadlineIndex((i) => (i + 1) % headlines.length), 3000);
    return () => clearInterval(t);
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }
  };

  return (
    <main className="space-y-24 pb-20">
      {/* Hero Section - 极简大气 */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* 背景光晕 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] opacity-50 animate-pulse" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/50 dark:border-white/10 shadow-2xl"
          >
            <Image
              src="https://picsum.photos/seed/avatar/200/200.jpg"
              alt="Avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.h1
            key={headlineIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/60 dark:from-white dark:to-white/60 h-24"
          >
            {headlines[headlineIndex]}
          </motion.h1>

          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            在这里，我分享关于前端开发、UI 设计以及生活感悟的点滴。
            <br />
            希望这些内容能给你带来启发。
          </motion.p>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/posts">
              <Button size="lg" className="rounded-full px-8 text-lg h-14" rightIcon={<ArrowRight className="w-5 h-5" />}>
                开始阅读
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="glass" size="lg" className="rounded-full px-8 text-lg h-14">
                关于我
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Grid - 玻璃拟态卡片 */}
      <section className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Code className="w-8 h-8 text-blue-500" />,
              title: "技术深度",
              desc: "深入探讨 React, Next.js 等前沿技术栈的最佳实践。",
              bg: "bg-blue-500/10"
            },
            {
              icon: <Palette className="w-8 h-8 text-purple-500" />,
              title: "设计美学",
              desc: "追求极致的用户体验，分享 UI/UX 设计心得。",
              bg: "bg-purple-500/10"
            },
            {
              icon: <BookOpen className="w-8 h-8 text-green-500" />,
              title: "持续学习",
              desc: "记录学习过程中的思考，构建完整的知识体系。",
              bg: "bg-green-500/10"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground dark:text-white">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest Posts */}
      <section className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-foreground dark:text-white mb-2">最新文章</h2>
            <p className="text-muted-foreground">探索最新的技术动态与思考</p>
          </div>
          <Link href="/posts">
            <Button variant="ghost" rightIcon={<ArrowRight className="w-4 h-4" />}>
              查看全部
            </Button>
          </Link>
        </div>
        <ArticleListWithPreload />
      </section>
    </main>
  );
}
