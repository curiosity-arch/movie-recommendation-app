import Image from "next/image"
import iconMovie from "@/public/icons/movie.png"
import styles from "@/public/styles/layoutHome.module.css"

export default function HomePage() {
    return (
        <div className={styles.home}>
            <h2 className={styles.movieIcon}>Selamat Datang di Sistem Rekomendasi Film</h2> <Image src={iconMovie} alt="Icon Movie"></Image>
            <section id="home" className={styles.card}>
                <div>
                    <p>
                        <q>A different language is a different vision of life.</q>
                        <hr />
                        <q>Bahasa yang berbeda adalah cara pandang yang berbeda tentang kehidupan.</q>
                        <p>- Federico Fellini</p>
                    </p>
                </div>
                <div>
                    <p>
                        <q>Cinematography is a language. It can be as varied and as subtle as written language.</q>
                        <hr />
                        <q>Sinematografi adalah sebuah bahasa. Ia bisa sevariatif dan sehalus bahasa tulisan.</q>
                        <p>- Sergei Einstein</p>
                    </p>
                </div>
            </section>
            <section id="film" className={styles.card}>
                <h2>Rekomendasi Film</h2>
                <p>...</p>
            </section>
        </div>
    )
}