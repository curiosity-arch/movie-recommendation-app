'use client'

import styles from '@/public/styles/side-nav.module.css'

export default function SideNav() {
    return (
        <div className={styles.side_nav}>
            <header>
                <p>Selamat Datang di Halaman Admin !</p>
                <p>Admin 1</p>
            </header>
            <nav className={styles.nav}>
                <button><a href="">Home</a></button>
                <button><a href="">Film</a></button>
                <button><a href="">Admin</a></button>
                <button><a href="">User</a></button>
                <button><a href="">Rekomendasi</a></button>
            </nav>
        </div>
    )
}