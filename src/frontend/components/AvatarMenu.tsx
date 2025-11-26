"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: "admin" | "user";
}

interface AvatarMenuProps {
  user?: User | null;
  isMobile?: boolean;
  onOpenLogin?: () => void;
  onOpenAI?: () => void;
}

export default function AvatarMenu({ user: propUser, isMobile = false, onOpenLogin, onOpenAI }: AvatarMenuProps) {
  const [user, setUser] = useState<User | null>(propUser || null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 初始化时设置为未登录状态
  useEffect(() => {
    // 检查本地存储是否有用户信息，如果没有则保持未登录状态
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    // 不再自动设置测试用户
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    if (!user) {
      // 如果没有登录，触发登录模态框
      if (onOpenLogin) {
        onOpenLogin();
      }
    } else {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  // 处理点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // 默认头像
  const defaultAvatar = "https://picsum.photos/seed/default-avatar/100/100.jpg";

  return (
    <>
      <div className="relative">
        <button
          ref={buttonRef}
          onClick={toggleMenu}
          className="group rounded-full w-10 h-10 overflow-hidden border-2 border-transparent hover:border-blue-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 bg-neutral-100 dark:bg-neutral-800 hover:shadow-lg hover:scale-105 transform"
        >
          <Image
            src={user && user.avatar && user.avatar.trim() !== '' ? user.avatar : defaultAvatar}
            alt={user ? user.name : "用户头像"}
            width={40}
            height={40}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // 处理头像加载失败的情况
              const target = e.target as HTMLImageElement;
              target.src = defaultAvatar;
            }}
          />
        </button>

        {/* 用户菜单 */}
        {isMenuOpen && user && (
          <div 
            ref={menuRef}
            className={`absolute ${isMobile ? "right-auto left-0" : "right-0"} mt-2 z-50 w-56 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl p-2 animate-in fade-in slide-in-from-top-5 duration-200`}
          >
            <div className="px-2 py-2 text-sm">
              <div className="font-medium">{user.name}</div>
              <div className="text-neutral-500 dark:text-neutral-400">
                {user.role === "admin" ? "管理员" : "普通用户"}
              </div>
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-800 my-2" />
            <ul className="text-sm">
              <li>
                <button onClick={() => { if (onOpenAI) onOpenAI(); setIsMenuOpen(false); }} className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all duration-200 flex items-center space-x-2 hover:translate-x-1 transform">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>AI 助手</span>
                </button>
              </li>
              <li>
                <Link href="/profile" className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>修改资料</span>
                </Link>
              </li>
              <li>
                <Link href="/settings" className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>设置</span>
                </Link>
              </li>
              {user.role === "admin" && (
                <li>
                  <Link href="/admin" className="block px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>进入后台</span>
                  </Link>
                </li>
              )}
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors duration-200 flex items-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>退出登录</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
