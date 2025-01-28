import styles from "@/public/styles/dashboard-styles.module.css"
import SideNav from "@/app/ui/side-nav"

export default async function Page() {
    return (
        <div className={styles.dashboard}>
            <div className={styles.sidenav}>
                <SideNav />
            </div>
            <div className={styles.content}>
                <p>This is for content</p>
            </div>
        </div>
    )
}