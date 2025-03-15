import { NextResponse } from "next/server";
import { loadMovies } from "@/app/lib/dataLoader";
import { getRecommendations } from "@/app/lib/recommendation";

export async function GET(req: Request) {
    const url = new URL(req.url);
    const movieId = Number(url.searchParams.get("movieId"));

    const movies = loadMovies();
    const userMovie = movies.find((m) => m.id === movieId);

    if (!userMovie) return NextResponse.json({ error: "Movie not found"}, { status: 404 });

    const recommendations = getRecommendations(movies, userMovie);
    return NextResponse.json(recommendations);
}