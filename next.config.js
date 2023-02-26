const withFonts = require('next-fonts');

/** @type {import('next').NextConfig} */
const nextConfig = withFonts({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['images.unsplash.com'],
  },
});

module.exports = nextConfig;
