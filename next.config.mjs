/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

import NextCors from 'nextjs-cors';

export default {
  reactStrictMode: true, // Enable strict mode for React
  // Your other Next.js configuration options go here
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Accept' },
        ],
      },
    ];
  },
  async serverMiddleware() {
    // Enable CORS for all routes
    this.nuxt.options.serverMiddleware.push(NextCors());
  },
};

export default nextConfig;
