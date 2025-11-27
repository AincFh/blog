export const runtime = 'edge';

"use client";

import { useState, useEffect } from 'react';
import {
    Check,
    X,
    Trash2,
    MessageSquare,
    User,
    Calendar,
    MoreHorizontal
} from 'lucide-react';
import { useAdminTheme } from '@/admin/contexts/ThemeContext';
import DataTable from '@/admin/components/ui/DataTable';

interface Comment {
    id: string;
    postTitle: string;
    author: string;
    authorEmail: string;
    content: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: string;
    parentId?: string;
}

// Mock Data
const MOCK_COMMENTS: Comment[] = Array.from({ length: 20 }).map((_, i) => ({
    id: `comment-${i + 1}`,
    postTitle: `文章标题 ${Math.floor(Math.random() * 10) + 1}`,
    author: `用户${i + 1}`,
    authorEmail: `user${i + 1}@example.com`,
    content: `这是一条评论内容示�?${i + 1},包含了用户的想法和反馈。`,
    status: i % 3 === 0 ? 'pending' : i % 3 === 1 ? 'approved' : 'rejected',
    createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
}));

export default function CommentsPage() {
    const { theme } = useAdminTheme();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<Comment[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        setData(MOCK_COMMENTS);
        setLoading(false);
    }, []);

    const filteredData = data.filter(comment => {
        const matchesSearch =
            comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || comment.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleApprove = (id: string) => {
        setData(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'approved' as const } : c
        ));
    };

    const handleReject = (id: string) => {
        setData(prev => prev.map(c =>
            c.id === id ? { ...c, status: 'rejected' as const } : c
        ));
    };

    const handleDelete = (id: string) => {
        if (confirm('确定要删除这条评论吗�?)) {
            setData(prev => prev.filter(c => c.id !== id));
        }
    };

    const columns = [
        {
            key: 'author',
            header: '评论�?,
            width: '15%',
            render: (comment: Comment) => (
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 text-purple-400' : 'bg-purple-50 text-purple-600'
                        }`}>
                        <User className="w-4 h-4" />
                    </div>
                    <div>
                        <div className="font-medium">{comment.author}</div>
                        <div className="text-xs opacity-60">{comment.authorEmail}</div>
                    </div>
                </div>
            )
        },
        {
            key: 'content',
            header: '评论内容',
            width: '35%',
            render: (comment: Comment) => (
                <div>
                    <p className="text-sm line-clamp-2 mb-1">{comment.content}</p>
                    <p className="text-xs opacity-60">文章: {comment.postTitle}</p>
                </div>
            )
        },
        {
            key: 'status',
            header: '状�?,
            width: '12%',
            render: (comment: Comment) => (
                <span className={`flex items-center gap-1.5 text-xs font-medium ${comment.status === 'approved' ? 'text-green-600 dark:text-green-400' :
                        comment.status === 'pending' ? 'text-amber-600 dark:text-amber-400' :
                            'text-red-600 dark:text-red-400'
                    }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${comment.status === 'approved' ? 'bg-green-500' :
                            comment.status === 'pending' ? 'bg-amber-500' :
                                'bg-red-500'
                        }`} />
                    {comment.status === 'approved' ? '已批�? :
                        comment.status === 'pending' ? '待审�? : '已拒�?}
                </span>
            ),
            sortable: true
        },
        {
            key: 'createdAt',
            header: '评论时间',
            width: '13%',
            render: (comment: Comment) => (
                <div className="flex items-center gap-2 text-sm opacity-70">
                    <Calendar className="w-3 h-3" />
                    {comment.createdAt}
                </div>
            ),
            sortable: true
        },
        {
            key: 'actions',
            header: '操作',
            width: '25%',
            render: (comment: Comment) => (
                <div className="flex items-center gap-2">
                    {comment.status !== 'approved' && (
                        <button
                            className="px-3 py-1.5 flex items-center gap-1 bg-green-600/10 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-600/20 transition-colors text-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(comment.id);
                            }}
                        >
                            <Check className="w-3 h-3" />
                            批准
                        </button>
                    )}
                    {comment.status !== 'rejected' && (
                        <button
                            className="px-3 py-1.5 flex items-center gap-1 bg-red-600/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-600/20 transition-colors text-sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleReject(comment.id);
                            }}
                        >
                            <X className="w-3 h-3" />
                            拒绝
                        </button>
                    )}
                    <button
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors text-red-600 dark:text-red-400"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(comment.id);
                        }}
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            )
        }
    ];

    const pendingCount = data.filter(c => c.status === 'pending').length;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold mb-1" style={{ color: theme === 'dark' ? '#fff' : '#212529' }}>
                        评论管理
                    </h1>
                    <p className="text-sm" style={{ color: theme === 'dark' ? '#a0a0a0' : '#6c757d' }}>
                        审核和管理用户评�?
                        {pendingCount > 0 && (
                            <span className="ml-2 px-2 py-0.5 bg-amber-600/20 text-amber-600 dark:text-amber-400 rounded-full text-xs">
                                {pendingCount} 条待审核
                            </span>
                        )}
                    </p>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={filteredData}
                loading={loading}
                onSearch={setSearchQuery}
                filters={[
                    {
                        label: '状�?,
                        value: statusFilter,
                        onChange: setStatusFilter,
                        options: [
                            { value: 'all', label: '全部' },
                            { value: 'pending', label: '待审�? },
                            { value: 'approved', label: '已批�? },
                            { value: 'rejected', label: '已拒�? },
                        ]
                    }
                ]}
            />
        </div>
    );
}

