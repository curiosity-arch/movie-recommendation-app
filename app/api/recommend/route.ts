import { NextResponse } from "next/server";
import postgres from "postgres";
import { auth } from "@/app/auth/auth";
import { getRecommendations } from "@/app/lib/recommendation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(req: Request) {
    // Ambil ID film dari query param
    const url = new URL(req.url);
    const movieId = Number(url.searchParams.get("movieId"));
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user-movies`, {
        headers: {
            Cookie: req.headers.get("cookie") || "",
        },
    });
    
    if (!res.ok) {
        return NextResponse.json({ error: "Failed to load user movies" }, { status: res.status });
    }
    
    const movies = await res.json();
    const userMovie = movies.find((m) => m.id === movieId);
    
    if (!userMovie) {
        return NextResponse.json({ error: "Movie not found or not allowed by age" }, { status: 404 });
    }
    
    // Ammbil session user
    const session = await auth();
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "Unauthorized"}, { status: 401 });
    }

    // Simpan histori ke database
    await sql`
        INSERT INTO histories (user_id, movie_id, movie_title, poster) 
        VALUES (${session.user.id}, ${userMovie.id}, ${userMovie.title}, ${userMovie.poster})
    `;

    const recommendations = getRecommendations(movies, userMovie);
    return NextResponse.json(recommendations);
}