import type { NextConfig } from "next";

const nextConfig: NextConfig = {
reactStrictMode: true,

images: {
formats: ["image/avif", "image/webp"],
},

experimental: {
optimizePackageImports: [
"react",
"react-dom"
]
}
};

export default nextConfig;
