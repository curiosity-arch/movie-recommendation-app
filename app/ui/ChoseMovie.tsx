"use client"

import { useState, useEffect } from "react"
// import { loadMovies } from "../lib/dataLoader" // mengganti loadMovies dengan API movies
import { Movie } from "../lib/definitions"
import RecommendationSection from "../ui/RecommendationSection"

export default function ChoseMovie() {
    // const movies = loadMovies();
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    useEffect(() => {
        fetch("/api/movies")
        .then((res) => res.json())
        .then((data) => setMovies(data));
    }, []);

    return (
        <>
        <h2>Temukan Film Favoritmu !</h2>
        {/* Daftar Film */}
        <p>Pilih film untuk mendapatkan rekomendasi:</p>
                <div>
                    {movies.map((movie) => (
                        <button key={movie.id} onClick={() => setSelectedMovie(movie)}>
                            <div>
                                <img src={movie.poster} alt={movie.title} />
                                <h3>{movie.title}</h3>
                                <p>{movie.genre}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Tampilkan Rekomendasi Jika Ada Film yang Dipilih */}
                <p>Rekomendasi untukmu:</p>
                {selectedMovie && (
                    <div>
                        <h2>Rekomendasi Berdasarkan: {selectedMovie.title}</h2>
                        <RecommendationSection selectedMovie={selectedMovie} />
                    </div>
                )}
        </>
    );
}