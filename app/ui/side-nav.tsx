import styles from '@/public/styles/side-nav.module.css';
import { SideBar } from './nav-links';

export default function SideNav() {
    return (
        <div className={styles.sidenav}>
            <header className={styles.header}>
                <p>Selamat Datang di Halaman Admin !</p>
                <p>...</p>
            </header>
            <nav className={styles.nav}>
                <SideBar />
            </nav>
        </div>
    )
}