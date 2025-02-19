import Image from "next/image";
import { Movie } from "../lib/definitions";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        <div>
            <Image src={movie.poster} alt={movie.title} width={200} height={300} />
            <h3>{ movie.title }</h3>
            <p>{movie.genre}</p>
        </div>
    );
}