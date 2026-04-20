import Link from 'next/link'
import Date from './date'
import styles from './ExploreFooter.module.css'

export default function ExploreFooter({ posts }) {
  return (
    <div className={styles.footer}>
      <hr className={styles.rule} />
      <p className={styles.sectionLabel}>Recent writing</p>
      <div className={styles.recentPosts}>
        {posts.map(({ id, date, title }) => (
          <div key={id} className={styles.postLine}>
            <Link href={`/blog/${id}`}>{title}</Link>
            <span className={styles.date}> — <Date dateString={date} isPost={false} /></span>
          </div>
        ))}
      </div>
      <nav className={styles.nav}>
        <Link href="/about">About</Link>
        {' · '}
        <Link href="/now">Now</Link>
        {' · '}
        <Link href="/archive">Archive</Link>
      </nav>
    </div>
  )
}
