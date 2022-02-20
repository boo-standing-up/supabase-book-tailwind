/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["thumbnail.image.takuten.co.jp", "cover.openbd.jp"],
  },
};

module.exports = nextConfig;
