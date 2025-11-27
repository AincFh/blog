export const runtime = 'edge';

"use client";

import { useState } from 'react';
import { Plus, Edit, Trash2, GripVertical, FolderOpen, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from "@/shared/components/ui/Button";

interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    postCount: number;
    color: string;
}

interface Tag {
    id: string;
    name: string;
    slug: string;
    postCount: number;
}

const mockCategories: Category[] = [
    { id: '1', name: '技�?, slug: 'tech', description: '技术相关文�?, postCount: 45, color: 'blue' },
    { id: '2', name: '设计', slug: 'design', description: '设计相关内容', postCount: 23, color: 'purple' },
    { id: '3', name: '生活', slug: 'life', description: '生活随笔', postCount: 18, color: 'green' },
];

const mockTags: Tag[] = [
    { id: '1', name: 'React', slug: 'react', postCount: 25 },
    { id: '2', name: 'JavaScript', slug: 'javascript', postCount: 30 },
    { id: '3', name: 'TypeScript', slug: 'typescript', postCount: 20 },
    { id: '4', name: 'CSS', slug: 'css', postCount: 15 },
];

export default function CategoriesTagsPage() {
    const [categories, setCategories] = useState<Category[]>(mockCategories);
    const [tags, setTags] = useState<Tag[]>(mockTags);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showTagModal, setShowTagModal] = useState(false);

    const deleteCategory = (id: string) => {
        if (confirm('确定要删除这个分类吗�?)) {
            setCategories(categories.filter(c => c.id !== id));
        }
    };

    const deleteTag = (id: string) => {
        if (confirm('确定要删除这个标签吗�?)) {
            setTags(tags.filter(t => t.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">分类与标�?/h1>
                <p className="text-neutral-400">管理文章的分类和标签系统</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Categories */}
                <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                                <FolderOpen className="w-5 h-5 text-blue-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">分类</h2>
                        </div>
                        <Button
                            size="sm"
                            leftIcon={<Plus className="w-4 h-4" />}
                            onClick={() => setShowCategoryModal(true)}
                        >
                            新建分类
                        </Button>
                    </div>

                    <div className="space-y-2">
                        {categories.map((category) => (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="group p-4 rounded-xl bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 hover:border-neutral-700 transition-all cursor-move"
                            >
                                <div className="flex items-center gap-3">
                                    <GripVertical className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400" />
                                    <div className={`w-3 h-3 rounded-full bg-${category.color}-500`} />
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-white">{category.name}</h3>
                                        <p className="text-xs text-neutral-500 truncate">{category.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-1 rounded-lg bg-neutral-700/50 text-xs text-neutral-400">
                                            {category.postCount} �?
                                        </span>
                                        <button className="p-2 rounded-lg hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Edit className="w-4 h-4 text-neutral-400" />
                                        </button>
                                        <button
                                            onClick={() => deleteCategory(category.id)}
                                            className="p-2 rounded-lg hover:bg-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 className="w-4 h-4 text-neutral-400 hover:text-red-400" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {showCategoryModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCategoryModal(false)}>
                            <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md border border-neutral-800" onClick={(e) => e.stopPropagation()}>
                                <h3 className="text-xl font-bold text-white mb-4">新建分类</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">分类名称</label>
                                        <input type="text" className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">URL别名</label>
                                        <input type="text" className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">描述</label>
                                        <textarea rows={3} className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <Button onClick={() => setShowCategoryModal(false)} variant="outline" className="flex-1">取消</Button>
                                        <Button className="flex-1">创建</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Tags */}
                <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center">
                                <Hash className="w-5 h-5 text-purple-400" />
                            </div>
                            <h2 className="text-xl font-bold text-white">标签</h2>
                        </div>
                        <Button
                            size="sm"
                            leftIcon={<Plus className="w-4 h-4" />}
                            onClick={() => setShowTagModal(true)}
                        >
                            新建标签
                        </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <motion.div
                                key={tag.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="group inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-800/50 hover:bg-neutral-800 border border-neutral-700/50 hover:border-neutral-700 transition-all"
                            >
                                <span className="text-sm text-white">#{tag.name}</span>
                                <span className="text-xs text-neutral-500">({tag.postCount})</span>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-1 rounded hover:bg-neutral-700">
                                        <Edit className="w-3 h-3 text-neutral-400" />
                                    </button>
                                    <button
                                        onClick={() => deleteTag(tag.id)}
                                        className="p-1 rounded hover:bg-neutral-700"
                                    >
                                        <Trash2 className="w-3 h-3 text-neutral-400 hover:text-red-400" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {showTagModal && (
                        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowTagModal(false)}>
                            <div className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md border border-neutral-800" onClick={(e) => e.stopPropagation()}>
                                <h3 className="text-xl font-bold text-white mb-4">新建标签</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">标签名称</label>
                                        <input type="text" className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-400 mb-2">URL别名</label>
                                        <input type="text" className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div className="flex gap-3 pt-2">
                                        <Button onClick={() => setShowTagModal(false)} variant="outline" className="flex-1">取消</Button>
                                        <Button className="flex-1">创建</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

