/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  exportTrailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
