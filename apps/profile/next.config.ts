import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/profile',
  assetPrefix: '/profile/',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@repo/ui'],
  /* config options here */
};

export default nextConfig;
