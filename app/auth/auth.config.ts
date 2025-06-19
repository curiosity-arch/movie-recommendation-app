import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/',
    },
    // Tidak dipakai karena sudah pakai middleware.ts untuk mengecek login
    // callbacks.authroized() hanya diperlukan jika pakai withAuth()
    // callbacks: {
    //     async authorized({ auth }) {
    //         return !!auth?.user; // Gunakan auth.user untuk mengecek login
    //     },
    // },
    providers: [], 
} satisfies NextAuthConfig;
