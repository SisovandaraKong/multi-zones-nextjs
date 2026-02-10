import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/card',
  assetPrefix: '/card/',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@repo/ui'],
  /* config options here */
};

export default nextConfig;
