import Link from 'next/link'
import styles from './SiteFooter.module.css'

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <p className={styles.colLabel}>Pages</p>
            <nav className={styles.colLinks}>
              <Link href="/work">Work</Link>
              <Link href="/cards">Cards</Link>
              <Link href="/faith">Faith</Link>
              <Link href="/studio">Studio</Link>
              <Link href="/archive">Archive</Link>
            </nav>
          </div>

          <div className={styles.column}>
            <p className={styles.colLabel}>Connect</p>
            <nav className={styles.colLinks}>
              <a href="http://linkedin.com/in/ericjmlee" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/theCreedo" target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
          </div>
        </div>

        <p className={styles.colophon}>
          Built with ❤️ in ATX &nbsp;·&nbsp; © {new Date().getFullYear()} Eric Lee
        </p>
      </div>
    </footer>
  )
}
