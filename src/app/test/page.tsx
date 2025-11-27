export const runtime = 'edge';

"use client";

import { useState } from "react";
import NavBar from "@/frontend/components/NavBar";
import ThemeFloat from "@/frontend/components/ThemeFloat";
import AIPanel from "@/shared/components/AIPanel";
import AvatarMenu from "@/frontend/components/AvatarMenu";

export default function TestPage() {
  const [aiOpen, setAiOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user] = useState<null | { id: string; name: string; email: string; avatar: string; role: "admin" | "user" }>({
    id: "1",
    name: "测试用户",
    email: "test@example.com",
    avatar: "https://api.dicebear.com/9.x/identicon/svg",
    role: "user"
  });
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchOpen(true);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      <NavBar onSearch={handleSearch} user={user} onOpenLogin={() => {}} />
      
      <main className="mx-auto max-w-5xl px-4 pt-20 pb-20">
        <h1 className="text-3xl font-bold mb-6">UI 交互测试页面</h1>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">搜索框测�?/h2>
            <p>点击右上角的搜索图标，应该会展开搜索框�?/p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">用户头像测试</h2>
            <p>点击右上角的用户头像，应该会展开下拉菜单。鼠标悬停时应该有缩放效果�?/p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">AI助手测试</h2>
            <p>1. 点击右下角的AI助手按钮，应该会打开AI助手面板�?/p>
            <p>2. 点击用户头像菜单中的"AI助手"选项，也应该会打开AI助手面板�?/p>
            <p>3. AI助手按钮应该有悬停效果�?/p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">主题切换测试</h2>
            <p>点击右下角的太阳/月亮图标，应该会切换主题�?/p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">页面宽度测试</h2>
            <p>页面内容宽度应该比之前更窄（从max-w-6xl改为max-w-5xl）�?/p>
          </section>
        </div>
        
        <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
          <h3 className="text-lg font-medium mb-2">测试内容区域</h3>
          <p>这是一个测试内容区域，用于验证页面宽度的变化。页面内容宽度应该比之前更窄�?/p>
        </div>
      </main>
      
      <ThemeFloat onOpenAI={() => setAiOpen(true)} />
      <AIPanel open={aiOpen} onClose={() => setAiOpen(false)} loggedIn={!!user} />
    </div>
  );
}
