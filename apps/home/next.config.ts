// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     unoptimized: true,  
//   },
//   transpilePackages: ['@repo/ui'],
//   async rewrites() {
//     return [
//       {
//         source: '/mac/:path*',
//         destination: process.env.NEXT_PUBLIC_URL_MAC + '/mac/:path*',
//       },
//             {
//         source: '/store/:path*',
//         destination: process.env.NEXT_PUBLIC_URL_STORE + '/store/:path*',
//       },
//       {
//         source: '/profile/:path*',
//         destination: 'http://localhost:3003/profile/:path*',
//       },
//       {
//         source: '/card/:path*',
//         destination: 'http://localhost:3004/card/:path*',
//       },
//     ];
//   },
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     unoptimized: true,  
//   },
//   transpilePackages: ['@repo/ui'],
//   async rewrites() {
//     return [
//       {
//         source: '/mac/:path*',
//         destination: `${process.env.NEXT_PUBLIC_URL_MAC}/mac/:path*`,
//       },
//       {
//         source: '/store/:path*',
//         destination: `${process.env.NEXT_PUBLIC_URL_STORE}/store/:path*`,
//       },
//       {
//         source: '/card/:path*',
//         destination: `${process.env.NEXT_PUBLIC_URL_CARD}/card/:path*`,
//       },
//       {
//         source: '/profile/:path*',
//         destination: `${process.env.NEXT_PUBLIC_URL_PROFILE}/profile/:path*`,
//       },
//     ];
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,  
  },
  transpilePackages: ['@repo/ui'],
  async rewrites() {
    if (isDev) {
      // Local development - rewrite to other ports
      return [
        { source: '/mac/:path*', destination: 'http://localhost:3001/mac/:path*' },
        { source: '/store/:path*', destination: 'http://localhost:3002/store/:path*' },
        { source: '/card/:path*', destination: 'http://localhost:3004/card/:path*' },
        { source: '/profile/:path*', destination: 'http://localhost:3003/profile/:path*' },
      ];
    } else {
      // Production - rewrite to deployed zones WITHOUT /basePath in destination
      return [
        { 
          source: '/mac/:path*', 
          destination: 'https://multi-zones-nextjs-mac.vercel.app/:path*'  // No /mac here!
        },
        { 
          source: '/store/:path*', 
          destination: 'https://multi-zones-nextjs-store.vercel.app/:path*'  // No /store here!
        },
        { 
          source: '/card/:path*', 
          destination: 'https://multi-zones-nextjs-card.vercel.app/:path*'  // No /card here!
        },
        { 
          source: '/profile/:path*', 
          destination: 'https://multi-zones-nextjs-profile.vercel.app/:path*'  // No /profile here!
        },
      ];
    }
  },
};

export default nextConfig;