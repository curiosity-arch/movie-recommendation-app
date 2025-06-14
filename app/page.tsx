import { Metadata } from 'next';
import styles from '@/public/styles/styles.module.css';
import LoginPage from './auth/page';

export const metadata: Metadata = {
    title: 'Login Sistem Rekomendasi Film',
}

export default function Page() {
    return (
        <main className={styles.main}>
            <div className={styles.h1}>
                <h1>Selamat datang di aplikasi Sistem Rekomendasi Film!</h1>
            </div>
            <div className={styles.content}>
                <div className={styles.introduction}>
                    <p>Temukan film favorit Anda dengan mudah menggunakan sistem rekomendasi pintar kami. 
                        Dengan algoritma K-Means Clustering, kami menganalisis preferensi Anda dan memberikan 
                        rekomendasi film berdasarkan genre, rating, dan kesamaan lainnya.</p>
                </div>
                <div className={styles.login}>
                    <LoginPage />
                </div>
            </div>
            <div className={styles.footer}>
                <p>Sistem Rekomendasi Film &copy; 2025 Fahril Ilham Pangestu</p>
            </div>
        </main>
    );
}