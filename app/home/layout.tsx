import Nav from "@/app/ui/on-Top-Bar"
import styles from "@/public/styles/layoutHome.module.css"

export default function RootLayout({children,}: {children: React.ReactNode}) {
    return (
      <html lang="en">
        <body>
          <div className={styles.layoutHome}>
            <div><Nav /></div>
            <main>
            {children}  
            </main>
          </div>
        </body>
      </html>
    )
}