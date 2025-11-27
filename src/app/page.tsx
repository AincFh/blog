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
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
  };

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section - Mesh Gradient & Glass */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden pt-16">
        {/* Dynamic Mesh Gradient Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-[120px] animate-blob mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-multiply dark:mix-blend-screen" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] bg-indigo-400/20 dark:bg-indigo-600/10 rounded-full blur-[120px] animate-blob animation-delay-4000 mix-blend-multiply dark:mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 dark:ring-white/10"
          >
            <Image
              src="https://picsum.photos/seed/avatar/200/200.jpg"
              alt="Avatar"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="space-y-6">
            <div className="h-24 md:h-32 flex items-center justify-center overflow-hidden">
              <motion.h1
                key={headlineIndex}
                initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -40, filter: "blur(10px)" }}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance text-foreground"
              >
                {headlines[headlineIndex]}
              </motion.h1>
            </div>

            <motion.p
              {...fadeInUp}
              transition={{ delay: 0.2, duration: 1 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light"
            >
              在这里，我分享关于前端开发、UI 设计以及生活感悟的点滴。
              <br className="hidden md:block" />
              希望这些内容能给你带来启发。
            </motion.p>
          </div>

          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4"
          >
            <Link href="/posts">
              <Button size="lg" className="rounded-full px-10 text-lg h-14 shadow-apple hover:shadow-apple-hover transition-all duration-300" rightIcon={<ArrowRight className="w-5 h-5" />}>
                开始阅读
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="glass" size="lg" className="rounded-full px-10 text-lg h-14 hover:bg-white/50 dark:hover:bg-white/10 transition-all duration-300">
                关于我
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </motion.div>
      </section>

      {/* Features Grid - Apple Style Cards */}
      <section className="container mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Code className="w-8 h-8 text-blue-500" />,
              title: "技术深度",
              desc: "深入探讨 React, Next.js 等前沿技术栈的最佳实践。",
              bg: "bg-blue-50 dark:bg-blue-500/10"
            },
            {
              icon: <Palette className="w-8 h-8 text-purple-500" />,
              title: "设计美学",
              desc: "追求极致的用户体验，分享 UI/UX 设计心得。",
              bg: "bg-purple-50 dark:bg-purple-500/10"
            },
            {
              icon: <BookOpen className="w-8 h-8 text-green-500" />,
              title: "持续学习",
              desc: "记录学习过程中的思考，构建完整的知识体系。",
              bg: "bg-green-50 dark:bg-green-500/10"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="p-10 rounded-[2rem] bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-apple hover:shadow-apple-hover transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl ${feature.bg} flex items-center justify-center mb-8`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-[17px]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Latest Posts */}
      <section className="container mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-3 tracking-tight">最新文章</h2>
            <p className="text-lg text-muted-foreground">探索最新的技术动态与思考</p>
          </div>
          <Link href="/posts">
            <Button variant="ghost" className="text-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full px-6" rightIcon={<ArrowRight className="w-5 h-5" />}>
              查看全部
            </Button>
          </Link>
        </div>
        <ArticleListWithPreload />
      </section>
    </main>
  );
}
