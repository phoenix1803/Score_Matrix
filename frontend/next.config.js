// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: "standalone", // explicitly tell Next.js to build for server
};

module.exports = nextConfig;
