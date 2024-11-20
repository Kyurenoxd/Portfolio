/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'production'
          ? 'https://api.kyureno.dev/api/:path*'  // Продакшен URL для API
          : 'http://localhost:8080/api/:path*'     // Локальный URL для разработки
      },
    ];
  },
  images: {
    domains: ['kyureno.dev', 'api.kyureno.dev'],
  }
}

module.exports = nextConfig 