/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "static.posters.cz",
                pathname: "/image/**"
            }
        ]
    }
}

module.exports = nextConfig
