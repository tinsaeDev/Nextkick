// next.config.mjs or with "type": "module"
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: ''
      },
      {
        protocol: 'https',
        hostname: 'api.slingacademy.com',
        port: ''
      }
    ],
    unoptimized: true
  },
  transpilePackages: ['geist'],
  devIndicators: false
};

export default nextConfig;
