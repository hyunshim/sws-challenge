/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    experimental: {
        appDir: true
    },
    async rewrites() {
        return [
            {
                source: "/company/:path*",
                destination: "http://127.0.0.1:5000/company/:path*",
            },
            {
                source: "/company/summaries/:path*",
                destination: "http://127.0.0.1:5000/company/summaries/:path*"
            }
        ]
    }
}
