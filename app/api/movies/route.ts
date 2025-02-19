import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Movie } from "@/app/lib/definitions";

export function GET() {
    const filePath = path.join(process.cwd(), "public", "movies.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data } = Papa.parse(fileContent, {
        header: true,
        dynamicTyping: true,
    });

    const movies: Movie[] = data.map((row) => ({
        id: row.id,
        title: row.title,
        genre: row.genre,
        poster: row.poster,
        features: [row.feature1, row.feature2, row.feature3],
    }));

    return NextResponse.json(movies);
}