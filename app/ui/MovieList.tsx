import MovieCard from "./MovieCard";
import { Movie } from "../lib/definitions";

export default function MovieList({ movies }: { movies: Movie[] }) {
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
    );
}