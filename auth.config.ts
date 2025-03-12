import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            // auth: contains the user's session
            // request: contains the incoming request

            const isLoggedIn = !!auth?.user;
            const isOnHome = nextUrl.pathname.startsWith('/home');

            if (isOnHome) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/home', nextUrl));
            }

            return true;
        },
    },
    providers: [
        
    ], // Add providers with an empty array for now
} satisfies NextAuthConfig;