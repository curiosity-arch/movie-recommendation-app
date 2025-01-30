import SideNav from "@/app/ui/side-nav";
import styles from "@/public/styles/LayoutDashboard.module.css"

export default function RootLayout({children,}: {children: React.ReactNode}) {
    return (
      <html lang="en">
        <body>
          <div className={styles.layoutDashboard}>
            <div className={styles.sideNav}><SideNav /></div>
            <main className={styles.main}>
            {children}
            </main>
          </div>
        </body>
      </html>
    )
}