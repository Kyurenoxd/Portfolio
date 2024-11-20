/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://kyureno.dev/api/:path*',
      },
    ];
  },
  images: {
    domains: ['kyureno.dev'],
  }
}

module.exports = nextConfig 