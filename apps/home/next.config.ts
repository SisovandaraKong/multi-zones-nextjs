import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,  
  },
  transpilePackages: ['@repo/ui'],
  async rewrites() {
    return [
      {
        source: '/mac/:path*',
        destination: process.env.NEXT_PUBLIC_URL_MAC + '/mac/:path*',
      },
            {
        source: '/store/:path*',
        destination: process.env.NEXT_PUBLIC_URL_STORE + '/store/:path*',
      },
      {
        source: '/profile/:path*',
        destination: 'http://localhost:3003/profile/:path*',
      },
      {
        source: '/card/:path*',
        destination: 'http://localhost:3004/card/:path*',
      },
    ];
  },
};

export default nextConfig;