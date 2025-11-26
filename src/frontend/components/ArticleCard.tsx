import Image from "next/image";
import Link from "next/link";

// 使用CSS变量预定义分类颜色，减少运行时计算
const CATEGORY_COLORS = {
  "技术": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  "设计": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  "生活": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
};

interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  imageUrl?: string;
  image?: string;
  tags?: string[];
  isPreloaded?: boolean;
}

export default function ArticleCard({
  id,
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  imageUrl,
  image,
  tags = [],
  isPreloaded = false
}: ArticleCardProps) {
  // 优先使用image属性，其次是imageUrl
  const safeImageUrl = (image || imageUrl) && (image || imageUrl)!.trim() !== '' ? (image || imageUrl)! : null;
  // 使用预定义的分类颜色，默认使用灰色系
  const categoryColor = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] ||
    "bg-secondary text-secondary-foreground";
  // 安全的头像URL
  const safeAvatarUrl = author.avatar && author.avatar.trim() !== '' ? author.avatar : "https://picsum.photos/seed/default-avatar/200/200.jpg";

  return (
    <article className="group relative bg-white dark:bg-surface-dark rounded-2xl overflow-hidden border border-border/50 dark:border-border-dark/50 hover:shadow-xl transition-all duration-500 ease-spring hover:-translate-y-1 flex flex-col h-full responsive-card content-visibility auto gpu-accelerated">
      {/* 文章封面 - 移除装饰性 blob, 保持干净 */}
      <div className="relative h-52 overflow-hidden responsive-card-image">
        {safeImageUrl ? (
          <div className="relative w-full h-full">
            <Image
              src={safeImageUrl}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-apple group-hover:scale-105"
              priority={isPreloaded}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.style.background = 'var(--secondary)';
                }
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-secondary dark:bg-surface-dark"></div>
        )}

        {/* 顶部标签栏 - 玻璃拟态 */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
          <Link href={`/categories/${encodeURIComponent(category)}`} className={`px-3 py-1.5 backdrop-blur-md bg-white/70 dark:bg-black/50 rounded-full text-xs font-medium shadow-sm hover:bg-white/90 dark:hover:bg-black/70 transition-colors duration-300 ${categoryColor}`}>
            {category}
          </Link>

          <span className="px-2.5 py-1 backdrop-blur-md bg-black/40 text-white rounded-full text-[10px] font-medium tracking-wide">
            {readTime}
          </span>
        </div>
      </div>

      {/* 文章内容 - 增加留白 */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-lg font-bold mb-3 text-foreground dark:text-text-dark group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
          {excerpt}
        </p>

        {/* 底部元数据 - 极简风格 */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30 dark:border-border-dark/30">
          <div className="flex items-center space-x-2.5">
            <div className="w-6 h-6 rounded-full overflow-hidden relative ring-1 ring-border dark:ring-border-dark">
              <Image
                src={safeAvatarUrl}
                alt={author.name}
                fill
                sizes="24px"
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-foreground dark:text-text-dark opacity-80">
              {author.name}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            {date}
          </span>
        </div>
      </div>
    </article>
  );
}