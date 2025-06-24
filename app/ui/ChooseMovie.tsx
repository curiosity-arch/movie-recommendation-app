"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { Histories, Movie } from "../lib/definitions";
import RecommendationSection from "./RecommendationSection";
import SuggestionIcon from "@/public/icons/suggestion.png";
import styles from "@/public/styles/layoutHome.module.css";

export default function ChooseMovie() {
    // Digunakan untuk merekomendasikan film berdasarkan film yang dipilih
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [histories, setHistories] = useState<Histories[]>([]);

    // Digunakan untuk popup setelah memilih film
    const [isOpen, setIsOpen] = useState(false);
    const handleShow = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    // API untuk menghasilkan daftar film yang dimiliki
    // Versi lama
    // useEffect(() => {
    //     fetch("/api/movies")
    //     .then((res) => res.json())
    //     .then((data) => setMovies(data));
    // }, []);

    // Versi update
    useEffect(() => {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        
        const query = new URLSearchParams();
        if (selectedGenre) query.append("genre", selectedGenre);
        if (selectedLanguage) query.append("language", selectedLanguage);

        const url = `${baseUrl}/api/user-movies?${query.toString()}`;

        fetch(url, { credentials: "include" })
        .then((res) => {
            if (!res.ok) throw new Error("Unauthorized");
            return res.json();
        })
        .then((data) => setMovies(data))
        .catch((err) => console.error("Error:", err));
    }, [selectedGenre, selectedLanguage]);

    useEffect(() => {
        fetch("/api/histories", { credentials: "include" })
        .then((res) => res.json())
        .then((data) => setHistories(data))
        .catch((err) => console.error("Error loading history:", err));
    }, []);

    return (
        <div>
            <div>
                {histories.length > 0 && (
                    <div className={styles.histories_container}>
                        <div className={styles.histories_caption}>
                            <Image src={SuggestionIcon} alt="Suggestion Icon" width={20} height={20} />
                            <span>Pilihan Film Kamu Sebelumnya</span>
                        </div>
                        <div className={styles.histories_items}>
                            {histories.map((item) => (
                                <div 
                                    key={item.id}
                                    className={styles.histories_item}
                                >
                                    <Image src={item.poster} alt={item.movie_title} width={110} height={150}/>
                                    <p>{item.movie_title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <h2 id="film">Temukan Film Favoritmu !</h2>
                <div className={styles.suggestion}>
                    <Image src={SuggestionIcon} alt="Suggestion Icon" width={20} height={20} />
                    <span>Pilih film untuk mendapatkan rekomendasi !</span>
                </div>
                {/* Daftar Genre */}
                <select value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                    className={styles.genreFilter}
                >
                    <option value="">Semua Genre</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    <option value="Thriller">Thriller</option>
                    <option value="Horror">Horror</option>
                </select>

                {/* Daftar Bahasa */}
                <select value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className={styles.languageFilter}
                >
                    <option value="">Semua Bahasa</option>
                    <option value="Indonesian">Indonesia</option>
                    <option value="Minangkabau">Minangkabau</option>
                    <option value="Dutch">Belanda</option>
                    <option value="English">Inggris</option>
                </select>

                {/* Daftar Film */}
                <div className={styles.overflow}>
                    <div className={styles.filmSection}>
                        {movies.map((movie) => (
                            <button
                                key={movie.id}
                                onClick={() => {
                                    setSelectedMovie(movie);
                                    handleShow();

                                    // Simpan histori ke server
                                    fetch("/api/history", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({
                                            movieId: movie.id,
                                            movieTitle: movie.title,
                                        }),
                                    }).catch((err) => console.error("Gagal menyimpan histori:", err));
                                }}
                                className={styles.film}
                            >
                                <div>
                                    <Image
                                        src={movie.poster}
                                        alt={movie.title}
                                        width={150}
                                        height={220}
                                        className={styles.imageMovies}
                                    />
                                    <h3>{movie.title}</h3>
                                    <p>{movie.genre}</p>
                                    <p>{movie.rating}</p>
                                </div>
                            </button>
                        ))}

                        {/* Tampilkan Rekomendasi Jika Ada Film yang Dipilih */}
                        {selectedMovie && isOpen && (
                            <>
                                <div
                                    onClick={handleClose}
                                    className={styles.divPopup}
                                />
                                <div className={styles.divPopupContent} onClick={handleClose}>
                                    <div className={styles.selectedFilm}>
                                        <section>
                                            <Image
                                                src={selectedMovie.poster}
                                                alt={selectedMovie.title}
                                                width={150}
                                                height={220}
                                                className={styles.selectedImageFilm}
                                            />
                                        </section>
                                        <section>
                                            <h2>{selectedMovie.title}</h2>
                                            <p>{selectedMovie.year} | {selectedMovie.genre} | {selectedMovie.rating} | {selectedMovie.language}</p>
                                            <p>{selectedMovie.description}</p>
                                            <hr />
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th className={styles.description}>Director</th>
                                                        <td>:</td>
                                                        <td>{selectedMovie.director}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className={styles.description}>Aktor</th>
                                                        <td>:</td>
                                                        <td>{selectedMovie.actors.slice(1,-1)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </section>
                                    </div>
                                    <h2>Hasil rekomendasi untukmu:</h2>
                                    <div className={styles.suggestion}>
                                        <Image src={SuggestionIcon} alt="Suggestion Icon" width={20} height={20} />
                                        <span>
                                            Rekomendasi berdasarkan: <span className={styles.selectedMovie}>{selectedMovie.title}</span>
                                        </span>
                                    </div>
                                    <div className={styles.overflowRecommendation}>
                                        <RecommendationSection selectedMovie={selectedMovie} />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}