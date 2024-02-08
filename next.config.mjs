/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  reactStrictMode: true, // Enable strict mode for React
  images: {
    domains: ['livestronger.net'], // Allow images from this domain
  },
  async redirects() {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true, // 301 redirection
      },
    ];
  },
  async headers() {
    return [
      {
        source: 'src/pages/api/:path*', // CORS headers for API routes
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Accept' },
        ],
      },
    ];
  },
};

export default nextConfig;
