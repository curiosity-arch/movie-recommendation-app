import MovieCard from "./MovieCard";
import { Movie } from "../lib/definitions";
import styles from "@/public/styles/layoutHome.module.css";

export default function MovieList({ movies }: { movies: Movie[] }) {
    return (
        <div className={styles.filmRecommendSection}>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                />
            ))}
        </div>
    );
}