/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

import withCors from 'nextjs-cors';

export default withCors({
  // Your Next.js configuration options go here
  // For example:
  async headers() {
    return [
      {
        source: 'src/pages/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Accept' },
        ],
      },
    ];
  },
});

export default nextConfig;
