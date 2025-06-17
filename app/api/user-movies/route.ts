import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import fs from "fs";
import path from "path";
import Papa from "papaparse";
import postgres from "postgres";
import { Movie } from "@/app/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET(req: Request) {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });

    if (!token?.name) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Ambil tahun lahir user
    const result = await sql`SELECT tahun_lahir FROM users WHERE username = ${token.name}`;
    if (result.length === 0) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const tahunLahir = result[0].tahun_lahir;
    const umur = new Date().getFullYear() - parseInt(tahunLahir);

    // Ambil film dari CSV
    const filePath = path.join(process.cwd(), "public/dataset", "film_dataset_with_scaled_features.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data } = Papa.parse(fileContent, {
        header: true,
        dynamicTyping: true,
    });

    const movies: Movie[] = data.map((row) => ({
        id: row.id,
        title: row.title,
        poster: row.poster,
        year: row.year,
        genre: row.genre,
        rating: row.rating,
        description: row.description,
        language: row.languages,
        director: row.directors,
        actors: row.actors,
        rating_float: row.rating_float,
        features: [
            row.rating_float_scaled, row.users_rating_scaled, row.votes_scaled, row.runtime_scaled, row.genre_Action_scaled, 
            row.genre_Adventure_scaled, row.genre_Animation_scaled, row.genre_Biography_scaled, row.genre_Comedy_scaled, row.genre_Crime_scaled, 
            row.genre_Drama_scaled, row.genre_History_scaled, row.genre_Horror_scaled, row.genre_Romance_scaled, row.genre_Thriller_scaled, 
            row.languages_Dutch_scaled, row.languages_English_scaled, row.languages_Indonesian_scaled, row.languages_Minangkabau_scaled
        ],
    }))
    .filter((movieFilter) => umur >= movieFilter.rating_float);

    return NextResponse.json(movies);
}