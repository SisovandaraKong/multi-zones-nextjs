import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/mac',
  assetPrefix: '/mac/',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@repo/ui'],
};

export default nextConfig;
