import Image from "next/image"
import iconMovie from "@/public/icons/movie.png"

export default function HomePage() {
    return (
        <main>
            <div>
                <div>
                    <p>Selamat datang di aplikasi <strong>Sistem Rekomendasi Film</strong> <Image src={iconMovie} alt="Movie Icon" width={15} height={15} /> !</p>
                    <p>Temukan rekomendasi film yang sesuai dengan selera Anda menggunakan teknologi canggih K-Means Clustering.
                        Mulai jelajahi sekarang dan biarkan kami membantu Anda menemukan tontonan terbaik untuk hari ini.
                    </p>
                </div>
                <div>
                    
                </div>
            </div>
        </main>
    )
}