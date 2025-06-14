import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';
import { Movie } from './definitions';

export function loadMovies(): Movie[] {
    const filePath = path.join(process.cwd(), "public/dataset", "film_dataset_with_scaled_features.csv");
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data } = Papa.parse(fileContent, {
        header: true,
        dynamicTyping: true,
    });

    return data.map((row) => ({
        id: row.id,
        title: row.title,
        poster: row.poster,
        year: row.year,
        genre: row.genre,
        rating: row.rating,
        features: [
            row.rating_float_scaled, row.users_rating_scaled, row.votes_scaled, row.runtime_scaled, row.genre_Action_scaled, 
            row.genre_Adventure_scaled, row.genre_Animation_scaled, row.genre_Biography_scaled, row.genre_Comedy_scaled, row.genre_Crime_scaled, 
            row.genre_Drama_scaled, row.genre_History_scaled, row.genre_Horror_scaled, row.genre_Romance_scaled, row.genre_Thriller_scaled, 
            row.languages_Dutch_scaled, row.languages_English_scaled, row.languages_Indonesian_scaled, row.languages_Minangkabau_scaled
        ],
    }));
}