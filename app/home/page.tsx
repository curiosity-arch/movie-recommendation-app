import Image from "next/image";
import { OnAboutBar } from "@/app/ui/nav-links";
import ChooseMovie from "../ui/ChooseMovie";
import styles from "@/public/styles/layoutHome.module.css";
import FedericoFellini from "@/public/images/federico_fellini.jpg";
import SergeiEinstein from "@/public/images/sergei_einstein.jpeg";

export default function HomePage() {
    return (
        <div id="home" className={styles.home}>
            <section className={styles.section}>
                <div className={styles.quote}>
                    <div>
                        <Image
                            src={FedericoFellini}
                            alt="Federico Fellini"
                            width={150}
                            height={120}
                            className={styles.image}
                        />
                    </div>
                    <div>
                        <q>A different language is a different vision of life.</q>
                        <hr />
                        <q>Bahasa yang berbeda adalah cara pandang yang berbeda tentang kehidupan.</q>
                        <p>- Federico Fellini</p>
                    </div>
                </div>
                <div className={styles.quote}>
                    <div>
                        <q>Language is much closer to film than painting is.</q>
                        <hr />
                        <q>Bahasa lebih mirip dengan film daripada lukisan.</q>
                        <p>- Sergei Einstein</p>
                    </div>
                    <div>
                        <Image
                            src={SergeiEinstein}
                            alt="Sergei Einstein"
                            width={150}
                            height={120}
                            className={styles.image}
                        />
                    </div>
                </div>
            </section>
            <section className={styles.section}>
                    <ChooseMovie />
            </section>
            <section id="about" className={styles.section}>
                <div className={styles.aboutColumn}>
                    <div className={styles.aboutRow}>
                        <div>
                            <section className={styles.aboutSection}>
                                <h3>Tentang Sistem Rekomendasi Film</h3>
                                <p>Platform yang membantu pengguna menemukan film yang sesuai dengan minat dan usia mereka. 
                                    Kami menggunakan pendekatan berbasis data untuk menyajikan rekomendasi film yang relevan dan mudah diakses.</p>
                            </section>
                        </div>
                        <div>
                            <OnAboutBar />
                        </div>
                    </div>
                    <p>Sistem Rekomendasi Film &copy; 2025 Fahril Ilham Pangestu</p>
                </div>
            </section>
        </div>
    )
}