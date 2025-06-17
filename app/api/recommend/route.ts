import { NextResponse } from "next/server";
import { getRecommendations } from "@/app/lib/recommendation";
// import { loadMovies } from "@/app/lib/dataLoader";

export async function GET(req: Request) {
    // Ambil ID film dari query param
    const url = new URL(req.url);
    const movieId = Number(url.searchParams.get("movieId"));

    // Versi lama
    // const movies = loadMovies();
    // const userMovie = movies.find((m) => m.id === movieId);

    // Versi update
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

    const recommendations = getRecommendations(movies, userMovie);
    return NextResponse.json(recommendations);
}