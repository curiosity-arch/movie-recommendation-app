import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt"; // Gunakan getToken dari NextAuth

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isProtectedPage = req.nextUrl.pathname.startsWith("/home");

    if (!token && isProtectedPage) {
        return NextResponse.redirect(new URL("/auth", req.url)); // Redirect ke login
    }

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL("/home", req.url)); // Redirect ke home jika sudah login
    }

    return NextResponse.next();
}

// Tentukan halaman yang diproteksi
export const config = {
    matcher: ["/home"], // Tambahkan halaman lain jika perlu
};
