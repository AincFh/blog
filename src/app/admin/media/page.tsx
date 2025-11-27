export const runtime = 'edge';

"use client";

import { useState } from 'react';
import { Upload, Image as ImageIcon, Video, File, Search, Trash2, Copy, Download, Grid, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/shared/components/ui/Button";

interface MediaFile {
    id: string;
    name: string;
    type: 'image' | 'video' | 'document';
    url: string;
    size: string;
    uploadedAt: string;
}

const mockMedia: MediaFile[] = [
    {
        id: '1',
        name: 'hero-banner.jpg',
        type: 'image',
        url: '/placeholder-image.jpg',
        size: '2.4 MB',
        uploadedAt: '2024-01-15'
    },
    {
        id: '2',
        name: 'article-cover.png',
        type: 'image',
        url: '/placeholder-image.jpg',
        size: '1.8 MB',
        uploadedAt: '2024-01-14'
    },
    // Add more mock data...
];

export default function MediaPage() {
    const [media, setMedia] = useState<MediaFile[]>(mockMedia);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
    const [dragOver, setDragOver] = useState(false);

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        // Handle file upload logic here
        console.log('Uploading files:', files);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const files = e.dataTransfer.files;
        console.log('Dropped files:', files);
    };

    const handleDelete = (id: string) => {
        if (confirm('确定要删除这个文件吗�?)) {
            setMedia(media.filter(m => m.id !== id));
        }
    };

    const copyUrl = (url: string) => {
        navigator.clipboard.writeText(url);
        alert('链接已复制到剪贴�?);
    };

    const getFileIcon = (type: string) => {
        switch (type) {
            case 'image': return ImageIcon;
            case 'video': return Video;
            default: return File;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">媒体�?/h1>
                    <p className="text-neutral-400">管理图片、视频和文件</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-neutral-900 rounded-lg p-1 border border-neutral-800">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
                        >
                            <Grid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-neutral-800 text-white' : 'text-neutral-400'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Upload Area */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${dragOver
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-neutral-700 bg-neutral-900/50'
                    }`}
            >
                <Upload className={`w-12 h-12 mx-auto mb-4 ${dragOver ? 'text-blue-400' : 'text-neutral-500'}`} />
                <h3 className="text-lg font-semibold text-white mb-2">拖拽文件到这里上�?/h3>
                <p className="text-sm text-neutral-400 mb-4">或者点击下方按钮选择文件</p>
                <label>
                    <input
                        type="file"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <Button
                        as="span"
                        leftIcon={<Upload className="w-4 h-4" />}
                        className="cursor-pointer"
                    >
                        选择文件
                    </Button>
                </label>
                <p className="text-xs text-neutral-500 mt-4">支持: JPG, PNG, GIF, MP4, MOV (最�?10MB)</p>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                    type="text"
                    placeholder="搜索文件�?.."
                    className="w-full pl-10 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Media Grid/List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {media.map((file) => {
                        const Icon = getFileIcon(file.type);
                        return (
                            <motion.div
                                key={file.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden group hover:border-neutral-700 transition-all"
                            >
                                {/* Thumbnail */}
                                <div className="aspect-square bg-neutral-800 flex items-center justify-center relative">
                                    {file.type === 'image' ? (
                                        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Icon className="w-12 h-12 text-neutral-600" />
                                    )}
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => copyUrl(file.url)}
                                            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white"
                                            title="复制链接"
                                        >
                                            <Copy className="w-4 h-4" />
                                        </button>
                                        <button
                                            className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white"
                                            title="下载"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(file.id)}
                                            className="p-2 rounded-lg bg-neutral-800 hover:bg-red-900 text-white hover:text-red-400"
                                            title="删除"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                {/* Info */}
                                <div className="p-3">
                                    <p className="text-sm text-white truncate font-medium">{file.name}</p>
                                    <p className="text-xs text-neutral-500 mt-1">{file.size} · {file.uploadedAt}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            ) : (
                <div className="bg-neutral-900 rounded-2xl border border-neutral-800 overflow-hidden">
                    <table className="w-full">
                        <thead className="border-b border-neutral-800 bg-neutral-800/50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase">文件�?/th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase">类型</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase">大小</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase">上传时间</th>
                                <th className="px-4 py-3 text-right text-xs font-medium text-neutral-400 uppercase">操作</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                            {media.map((file) => {
                                const Icon = getFileIcon(file.type);
                                return (
                                    <tr key={file.id} className="hover:bg-neutral-800/50">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-neutral-800 flex items-center justify-center">
                                                    <Icon className="w-5 h-5 text-neutral-500" />
                                                </div>
                                                <span className="text-sm text-white">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-neutral-400">{file.type}</td>
                                        <td className="px-4 py-3 text-sm text-neutral-400">{file.size}</td>
                                        <td className="px-4 py-3 text-sm text-neutral-400">{file.uploadedAt}</td>
                                        <td className="px-4 py-3 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => copyUrl(file.url)} className="p-2 hover:bg-neutral-800 rounded" title="复制链接">
                                                    <Copy className="w-4 h-4 text-neutral-400" />
                                                </button>
                                                <button className="p-2 hover:bg-neutral-800 rounded" title="下载">
                                                    <Download className="w-4 h-4 text-neutral-400" />
                                                </button>
                                                <button onClick={() => handleDelete(file.id)} className="p-2 hover:bg-neutral-800 rounded" title="删除">
                                                    <Trash2 className="w-4 h-4 text-neutral-400 hover:text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

