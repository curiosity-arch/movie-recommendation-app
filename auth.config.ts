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
            const isOnDashboard = nextUrl.pathname.startsWith('/home');
            // const isOnHome = nextUrl.pathname.startsWith('/home');

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/home', nextUrl));
            }

            // if (isOnHome) {
            //     if (isLoggedIn) return true;
            //     return false; // Redirect unauthenticated users to login page
            // } else if (isLoggedIn) {
            //     return Response.redirect(new URL('/home', nextUrl));
            // }

            return true;
        },
    },
    providers: [
        
    ], // Add providers with an empty array for now
} satisfies NextAuthConfig;