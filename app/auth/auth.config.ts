import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/',
    },
    callbacks: {
        async authorized({ auth }) {
            return !!auth?.user; // Gunakan auth.user untuk mengecek login
        },
    },
    providers: [], 
} satisfies NextAuthConfig;
