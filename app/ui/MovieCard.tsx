import Image from "next/image";
import { Movie } from "../lib/definitions";
import styles from "@/public/styles/layoutHome.module.css";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div className={styles.movieCard}>
            <Image
                src={movie.poster}
                alt={movie.title}
                width={150}
                height={220}
                className={styles.imageMovies}
            />
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
        </div>
    );
}