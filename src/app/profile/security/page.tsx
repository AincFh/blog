export const runtime = 'edge';

"use client";

import React, { useState } from 'react';
import ScrollReveal from '@/shared/components/ScrollReveal';
import Link from 'next/link';

export default function SecurityPage() {
  // 安全设置状�?  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong'>('weak');
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  // 计算密码强度
  const calculatePasswordStrength = (password: string) => {
    if (password.length < 8) {
      setPasswordStrength('weak');
    } else if (password.length < 12 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  // 密码变更处理
  const handlePasswordChange = () => {
    // 这里可以添加实际的密码变更逻辑和验�?    // 直接执行密码变更
    setPasswordChanged(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  // 双因素认证切换处�?  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <main className="py-12 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900 min-h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              账户安全
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              管理您的账户安全设置，保护您的个人信�?            </p>
          </div>
        </ScrollReveal>

        {/* 返回链接 */}
        <div className="mb-8">
          <Link href="/profile" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回个人资料
          </Link>
        </div>

        {/* 密码设置卡片 */}
        <ScrollReveal delay={200}>
          <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8 shadow-lg mb-8 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">密码设置</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">当前密码</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">新密�?/label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    calculatePasswordStrength(e.target.value);
                  }}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />

                {/* 密码强度指示�?*/}
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">密码强度</span>
                      <span className={`text-xs font-medium ${passwordStrength === 'weak' ? 'text-red-500' : passwordStrength === 'medium' ? 'text-amber-500' : 'text-green-500'}`}>
                        {passwordStrength === 'weak' ? '�? : passwordStrength === 'medium' ? '�? : '�?}
                      </span>
                    </div>
                    <div className="h-1 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength === 'weak' ? 'w-1/3 bg-red-500' : passwordStrength === 'medium' ? 'w-2/3 bg-amber-500' : 'w-full bg-green-500'}`}
                        style={{ transition: 'width 0.3s ease' }}
                      ></div>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      建议使用至少12位字符，包含大小写字母、数字和特殊字符
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">确认新密�?/label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              {confirmPassword && newPassword && confirmPassword !== newPassword && (
                <p className="text-red-500 text-sm">两次输入的密码不一�?/p>
              )}

              {(() => {
                const isSubmitDisabled = !currentPassword || !newPassword || newPassword !== confirmPassword || passwordStrength === 'weak';
                return (
                  <button
                    onClick={handlePasswordChange}
                    disabled={isSubmitDisabled}
                    className={`mt-4 px-4 py-2 rounded-lg font-medium transition-colors ${isSubmitDisabled ? 'bg-neutral-300 dark:bg-neutral-700 text-neutral-500 dark:text-neutral-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
                  >
                    {passwordChanged ? '密码已更�? : '更新密码'}
                  </button>
                );
              })()}
            </div>
          </div>
        </ScrollReveal>

        {/* 双因素认证卡�?*/}
        <ScrollReveal delay={300}>
          <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8 shadow-lg mb-8 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">双因素认�?/h2>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-neutral-700 dark:text-neutral-300 font-medium">启用双因素认�?/p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">登录时需要输入额外的验证码，提高账户安全�?/p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={toggleTwoFactor}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-200 dark:bg-neutral-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            {twoFactorEnabled && (
              <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-750 rounded-lg">
                <p className="text-sm text-neutral-700 dark:text-neutral-300 mb-3">
                  双因素认证已启用。请使用认证应用扫描下方二维码，并输入验证码完成设置�?                </p>
                <div className="flex justify-center mb-4">
                  {/* 这里应该是一个实际的二维码图片，现在使用占位�?*/}
                  <div className="w-32 h-32 bg-neutral-200 dark:bg-neutral-700 rounded-lg flex items-center justify-center">
                    <span className="text-xs text-neutral-500">二维码占�?/span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="输入验证�?
                    className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap">
                    验证
                  </button>
                </div>
              </div>
            )}
          </div>
        </ScrollReveal>

        {/* 账户绑定卡片 */}
        <ScrollReveal delay={400}>
          <div className="bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-200 dark:border-neutral-700 p-6 sm:p-8 shadow-lg mb-8 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-100">第三方账号绑�?/h2>
            </div>

            <div className="space-y-4">
              {/* GitHub 绑定 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-750">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">GitHub</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">未绑�?/p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors">
                  绑定
                </button>
              </div>

              {/* Google 绑定 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-750">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">Google</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">未绑�?/p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-medium transition-colors">
                  绑定
                </button>
              </div>

              {/* 邮箱验证 */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-neutral-50 dark:bg-neutral-750">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-neutral-700 dark:text-neutral-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-neutral-700 dark:text-neutral-300 font-medium">邮箱验证</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">user@example.com</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm font-medium transition-colors">
                  已验�?                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </main>
  );
}
