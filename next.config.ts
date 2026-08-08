// next.config.ts
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Allows production builds to successfully complete even if your project has type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Allows production builds to successfully complete even if your project has ESLint errors
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Remove or comment out the old option
    // allowedDevOrigins: ['http://localhost:3000'], 
  },
};

export default nextConfig;
