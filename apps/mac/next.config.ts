// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   basePath: '/mac',
//   assetPrefix: '/mac/',
//   images: {
//     unoptimized: true,
//   },
//   transpilePackages: ['@repo/ui'],
// };

// export default nextConfig;
import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // Only use basePath in local development
  ...(isProd ? {} : {
    basePath: '/mac',
    assetPrefix: '/mac/',
  }),
  images: {
    unoptimized: true,
  },
  transpilePackages: ['@repo/ui'],
};

export default nextConfig;
