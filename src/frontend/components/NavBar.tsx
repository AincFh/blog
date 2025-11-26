"use client";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import AvatarMenu from "./AvatarMenu";


interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "user";
}

interface NavBarProps {
  onSearch: (query: string) => void;
  user: User | null;
  onOpenLogin: () => void;
  onOpenAI?: () => void;
}

export default function NavBar({ onSearch, user, onOpenLogin, onOpenAI }: NavBarProps) {
  const [open, setOpen] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchFormRef = useRef<HTMLFormElement>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery("");
    }
  };

  // 处理点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchExpanded &&
        searchFormRef.current &&
        !searchFormRef.current.contains(event.target as Node)
      ) {
        setSearchExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchExpanded]);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur bg-white/60 dark:bg-black/40 border-b border-neutral-200/40 dark:border-neutral-800/60 transition-all duration-300">
      <nav className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-semibold text-lg transition-colors hover:text-blue-600 dark:hover:text-blue-400">Blog</Link>
          <button aria-label="Toggle menu" className="md:hidden p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors" onClick={() => setOpen(!open)}>☰</button>
        </div>
        <ul className="hidden md:flex items-center gap-6 text-sm">
          <li><Link href="/posts" className="px-2 py-1 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">文章</Link></li>
          <li><Link href="/categories" className="px-2 py-1 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">分类</Link></li>
          <li><Link href="/tags" className="px-2 py-1 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">标签</Link></li>
          <li><Link href="/archive" className="px-2 py-1 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">归档</Link></li>
          <li><Link href="/about" className="px-2 py-1 rounded-md transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">关于</Link></li>
          <li className="flex items-center">
            <form 
              ref={searchFormRef}
              onSubmit={handleSearch} 
              className={`relative flex items-center transition-all duration-300 ${searchExpanded ? "w-64" : "w-10"} overflow-hidden`}
            >
              <div className={`absolute inset-y-0 left-0 flex items-center justify-center w-10 h-10 ${searchExpanded ? "bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-l-md" : ""} transition-colors duration-300`}>
                <button 
                  type="button"
                  aria-label="Search" 
                  onClick={() => {
                    setSearchExpanded(true);
                    // 如果有搜索查询，立即触发搜索
                    if (searchQuery.trim()) {
                      onSearch(searchQuery.trim());
                    }
                  }} 
                  className="rounded-full w-8 h-8 flex items-center justify-center transition-all p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch(e);
                  }
                }}
                onFocus={() => setSearchExpanded(true)}
                placeholder="搜索文章、标签..."
                className={`bg-neutral-100/80 dark:bg-neutral-800/80 backdrop-blur-sm outline-none pl-10 pr-2 py-2 rounded-md ${searchExpanded ? "w-56 opacity-100 border border-neutral-200/50 dark:border-neutral-700/50" : "w-0 opacity-0 border-0"} transition-all duration-300`}
              />
            </form>
          </li>

          <li>
            {user ? (
              <AvatarMenu user={user} onOpenLogin={onOpenLogin} onOpenAI={onOpenAI} />
            ) : (
              <button
                onClick={onOpenLogin}
                className="group relative w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 transform hover:scale-110"
                aria-label="用户账户"
              >
                <img
                  src="https://picsum.photos/seed/default-avatar/200/200.jpg"
                  alt="用户头像"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
            )}
          </li>
        </ul>
      </nav>
      {open && (
        <div className="md:hidden border-t border-neutral-200/40 dark:border-neutral-800/60">
          <ul className="px-4 py-3 flex flex-col gap-3">
            <li><Link href="/posts" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">文章</Link></li>
            <li><Link href="/categories" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">分类</Link></li>
            <li><Link href="/tags" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">标签</Link></li>
            <li><Link href="/archive" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">归档</Link></li>
            <li><Link href="/about" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">关于</Link></li>
            <li>
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="搜索文章、标签..."
                  className="flex-1 bg-transparent border border-neutral-200 dark:border-neutral-800 rounded-md px-3 py-2 outline-none"
                />
                <button type="submit" className="rounded-md px-3 py-2 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors">搜索</button>
              </form>
            </li>
            <li>
              {user ? (
                <AvatarMenu user={user} isMobile onOpenLogin={onOpenLogin} onOpenAI={onOpenAI} />
              ) : (
                <button
                  onClick={() => { onOpenLogin(); setOpen(false); }}
                  className="group relative w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-200 transform hover:scale-110"
                  aria-label="用户账户"
                >
                  <img
                    src="https://picsum.photos/seed/default-avatar/200/200.jpg"
                    alt="用户头像"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                </button>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
