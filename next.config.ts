import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        domains: [
            "resizing.flixster.com", 
            "m.media-amazon.com"
        ],
    }
}

module.exports = nextConfig;