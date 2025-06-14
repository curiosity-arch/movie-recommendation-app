"use client";

import { useState, useEffect } from "react";
import MovieList from "./MovieList";
import { Movie } from "../lib/definitions";

export default function RecommendationSection({ selectedMovie }: { selectedMovie: Movie }) {
    const [recommendations, setRecommendations] = useState<Movie[]>([]);

    useEffect(() => {
        fetch(`/api/recommend?movieId=${selectedMovie.id}`)
        .then((res) => res.json())
        .then((data) => setRecommendations(data));
    }, [selectedMovie]);

    return (
        <div>
            <MovieList movies={recommendations}/>
        </div>
    );
}