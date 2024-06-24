// @ts-check

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'fluid-colors.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'colors.fluid-design.io',
      },
      {
        hostname: 'fluid-colors.vercel.app',
      },
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
    ],
  },
  experimental: {
    reactCompiler: true,
  },
  transpilePackages: ['ui'],
  typescript: {
    ignoreBuildErrors: true,
  },
}
