import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: '/store',
  assetPrefix: '/store/',
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@repo/ui'],
  /* config options here */
};

export default nextConfig;
