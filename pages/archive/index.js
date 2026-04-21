import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getArchiveData, getArchiveTopics, getArchiveYears } from '../../lib/archive'
import Date from '../../components/date'
import styles from './archive.module.css'

const SOURCE_LABELS = {
  medium: 'Medium',
  'ut-blog': 'UT CS Blog',
  substack: 'Substack',
  internal: null,
  external: 'External',
}

export default function Archive({ posts, topics, years }) {
  const router = useRouter()
  const { topic, year } = router.query

  const filtered = posts.filter((post) => {
    if (topic && !post.topics.includes(topic)) return false
    if (year && !post.date.startsWith(year)) return false
    return true
  })

  function filterHref(key, value) {
    const q = { ...router.query }
    if (q[key] === value) {
      delete q[key]
    } else {
      q[key] = value
    }
    return { pathname: '/archive', query: q }
  }

  return (
    <Layout>
      <Head>
        <title>Archive | {siteTitle}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>Archive</h1>

      {topics.length > 0 && (
        <div className={styles.filters}>
          {topics.map((t) => (
            <Link
              key={t}
              href={filterHref('topic', t)}
              className={`${styles.filterBtn} ${topic === t ? styles.filterBtnActive : ''}`}
            >
              {t}
            </Link>
          ))}
        </div>
      )}

      {years.length > 0 && (
        <div className={styles.filters}>
          {years.map((y) => (
            <Link
              key={y}
              href={filterHref('year', y)}
              className={`${styles.filterBtn} ${year === y ? styles.filterBtnActive : ''}`}
            >
              {y}
            </Link>
          ))}
        </div>
      )}

      <ul className={styles.list}>
        {filtered.map((post) => {
          const sourceLabel = SOURCE_LABELS[post.source]
          const href = post.source === 'internal'
            ? `/blog/${post.id}`
            : post.original_link

          return (
            <li key={post.id} className={styles.listItem}>
              <a
                href={href}
                {...(post.source !== 'internal' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={styles.postTitle}
              >
                {post.title}
              </a>
              <div className={styles.meta}>
                <span className={utilStyles.lightText}>
                  <Date dateString={post.date} isPost />
                </span>
                {sourceLabel && (
                  <span className={styles.sourceBadge}>
                    Originally on {sourceLabel}
                  </span>
                )}
              </div>
            </li>
          )
        })}
      </ul>

      {filtered.length === 0 && (
        <p className={utilStyles.lightText}>No posts match the selected filters.</p>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getArchiveData()
  const topics = getArchiveTopics(posts)
  const years = getArchiveYears(posts)
  return { props: { posts, topics, years } }
}
