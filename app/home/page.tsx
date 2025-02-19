import styles from "@/public/styles/layoutHome.module.css"
import { loadMovies } from "../lib/dataLoader"
import MovieList from "../ui/MovieList"
import ChoseMovie from "../ui/ChoseMovie";

export default function HomePage() {
    const movies = loadMovies();

    return (
        <div className={styles.home}>
            <section id="home" className={styles.card}>
                <div>
                    <q>A different language is a different vision of life.</q>
                    <hr />
                    <q>Bahasa yang berbeda adalah cara pandang yang berbeda tentang kehidupan.</q>
                    <p>- Federico Fellini</p>
                </div>
                <div>
                    <q>Language is much closer to film than painting is.</q>
                    <hr />
                    <q>Bahasa lebih mirip dengan film daripada lukisan.</q>
                    <p>- Sergei Einstein</p>
                </div>
            </section>
            <section className={styles.card}>
                <MovieList movies={movies}/>
            </section>
            <section id="film" className={styles.card}>
                <ChoseMovie />
            </section>
        </div>
    )
}