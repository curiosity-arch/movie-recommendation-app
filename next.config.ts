import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */

    // Versi lama
    // images: {
    //     domains: [
    //         "resizing.flixster.com", 
    //         "m.media-amazon.com"
    //     ],
    // }

    // Versi update Next.js v13+
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'resizing.flixster.com',
            },
            {
                protocol: 'https',
                hostname: 'm.media-amazon.com',
            },
        ],
    },
};

module.exports = nextConfig;