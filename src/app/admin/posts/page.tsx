export const runtime = 'edge';

"use client";

import { useState, useEffect } from 'react';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    MoreHorizontal,
    FileText,
    AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import DataTable from '@/admin/components/ui/DataTable';
import { useAdminTheme } from '@/admin/contexts/ThemeContext';
import { Button } from "@/shared/components/ui/Button";

interface Post {
    id: string;
    title: string;
    author: string;
    category: string;
    status: 'published' | 'draft' | 'archived';
    views: number;
    comments: number;
    publishedAt: string;
}

// Mock Data
const MOCK_POSTS: Post[] = Array.from({ length: 25 }).map((_, i) => ({
    id: `post-${i + 1}`,
    title: `Next.js 14 全栈开发实战指�?(�?${i + 1} 部分)`,
    author: 'Admin',
    category: i % 3 === 0 ? '技�? : i % 3 === 1 ? '生活' : '随笔',
    status: i % 5 === 0 ? 'draft' : 'published',
    views: Math.floor(Math.random() * 10000),
    comments: Math.floor(Math.random() * 100),
    publishedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

export default function PostsPage() {
    const { theme } = useAdminTheme();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Post[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // 直接加载数据，无延迟
        setData(MOCK_POSTS);
        setLoading(false);
    }, []);

    const filteredData = data.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const columns = [
        {
            key: 'title',
            header: '文章标题',
            width: '40%',
            render: (post: Post) => (
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-50 text-blue-600'
                        }`}>
                        <FileText className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-medium mb-0.5 line-clamp-1">{post.title}</div>
                        <div className="text-xs opacity-60">ID: {post.id}</div>
                    </div>
                </div>
            ),
            sortable: true
        },
        {
            key: 'category',
            header: '分类',
            width: '10%',
            render: (post: Post) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${post.category === '技�? ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        post.category === '生活' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    }`}>
                    {post.category}
                </span>
            )
        },
        {
            key: 'status',
            header: '状�?,
            width: '10%',
            render: (post: Post) => (
                <span className={`flex items-center gap-1.5 text-xs font-medium ${post.status === 'published' ? 'text-green-600 dark:text-green-400' :
                        post.status === 'draft' ? 'text-amber-600 dark:text-amber-400' :
                            'text-gray-600 dark:text-gray-400'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-green-500' :
                            post.status === 'draft' ? 'bg-amber-500' :
                                'bg-gray-500'
                        }`} />
                    {post.status === 'published' ? '已发�? :
                        post.status === 'draft' ? '草稿' : '已归�?}
                </span>
            ),
            sortable: true
        },
        {
            key: 'stats',
            header: '数据',
            width: '15%',
            render: (post: Post) => (
                <div className="flex items-center gap-4 text-xs opacity-70">
                    <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> {post.views}
                    </span>
                    <span className="flex items-center gap-1">
                        <MoreHorizontal className="w-3 h-3" /> {post.comments}
                    </span>
                </div>
            ),
            sortable: true
        },
        {
            key: 'publishedAt',
            header: '发布时间',
            width: '15%',
            sortable: true
        },
        {
            key: 'actions',
            header: '操作',
            width: '10%',
            render: (post: Post) => (
                <div className="flex items-center gap-2">
                    <button
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-blue-600 dark:text-blue-400"
                        title="编辑"
                        onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/admin/posts/${post.id}/edit`);
                        }}
                    >
                        <Edit className="w-4 h-4" />
                    </button>
                    <button
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-red-600 dark:text-red-400"
                        title="删除"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('确定要删除这篇文章吗�?)) {
                                // Delete logic
                            }
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1" style={{ color: theme === 'dark' ? '#fff' : '#212529' }}>
                        文章管理
                    </h1>
                    <p className="text-sm" style={{ color: theme === 'dark' ? '#a0a0a0' : '#6c757d' }}>
                        管理您的博客文章，支持发布、编辑和删除
                    </p>
                </div>
                <Button
                    onClick={() => router.push('/admin/posts/new')}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                >
                    <Plus className="w-4 h-4" />
                    写文�?
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                loading={loading}
                onSearch={setSearchQuery}
                onRowClick={(post) => router.push(`/admin/posts/${post.id}`)}
            />
        </div>
    );
}

