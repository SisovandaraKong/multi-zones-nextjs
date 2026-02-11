import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  assetPrefix: "/card",
  basePath: "/card",
};

export default nextConfig;


// import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === 'production';

// const nextConfig: NextConfig = {
//   // Only use basePath in local development
//   ...(isProd ? {} : {
//     basePath: '/card',
//     assetPrefix: '/card/',
//   }),
//   images: {
//     unoptimized: true,
//   },
//   transpilePackages: ['@repo/ui'],
// };

// export default nextConfig;