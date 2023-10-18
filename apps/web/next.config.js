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
        hostname: 'fluid-colors.vercel.app',
      },
    ]
  },
  transpilePackages: ["ui"],
  typescript: {
    ignoreBuildErrors: true
  }
};
