export const runtime = 'edge';

// src/app/admin/designer/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

export default function DesignerPage() {
    const [loading, setLoading] = useState(true);

    // Load existing config
    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch('/api/admin/designer');
                if (!res.ok) throw new Error('Failed to load config');
                // 简化实现，不使用form�?
            } catch (e) {
                console.error('加载失败:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchConfig();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 space-y-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">系统设计�?/h1>
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
                <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">站点信息</h2>
                <p className="text-gray-600 dark:text-gray-400">系统设计器功能正在开发中...</p>
            </div>
            <Button disabled className="bg-blue-600 hover:bg-blue-700 text-white px-6">
                保存配置
            </Button>
        </div>
    );
}

