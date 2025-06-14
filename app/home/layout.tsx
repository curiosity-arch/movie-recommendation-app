import TopNav from "@/app/ui/on-top-nav";
import styles from "@/public/styles/layoutHome.module.css";

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
      <html lang="en">
        <body>
          <div className={styles.layoutHome}>
            <div className={styles.nav}>
              <TopNav />
            </div>
            <main>
              {children}  
            </main>
          </div>
        </body>
      </html>
    )
}