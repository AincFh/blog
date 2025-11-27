/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000']
    }
  },
  // Cloudflare Pages 优化设置
  skipTrailingSlashRedirect: true,
  assetPrefix: undefined,
  trailingSlash: false,
  output: 'standalone',
};

export default nextConfig;