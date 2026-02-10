// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   basePath: '/profile',
//   assetPrefix: '/profile/',
//   images: {
//     unoptimized: true,
//   },
//   transpilePackages: ['@repo/ui'],
//   /* config options here */
// };

// export default nextConfig;
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Only use basePath in local development
  ...(isProd ? {} : {
    basePath: '/profile',
    assetPrefix: '/profile/',
  }),
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@repo/ui'],
};

export default nextConfig;
