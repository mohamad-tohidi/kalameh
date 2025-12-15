/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/kalameh',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
