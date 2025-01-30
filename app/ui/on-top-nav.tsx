import { OnTopBar } from "./nav-links";
import styles from "@/public/styles/on-top-nav.module.css";

export default function Nav() {
    return (
        <div className={styles.top_nav}>
            <header className={styles.header}>Sistem Rekomendasi Film</header>
            <nav className={styles.nav}>
                <OnTopBar />
            </nav>
        </div>
    )
}