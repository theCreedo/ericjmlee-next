import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Layout, { siteTitle } from '../../components/layout'
import ExploreFooter from '../../components/ExploreFooter'
import { getArchiveData, getArchiveTopics, getArchiveYears } from '../../lib/archive'
import { getSortedPostsData } from '../../lib/posts'
import Date from '../../components/date'
import styles from './archive.module.css'

const SOURCE_LABELS = {
  medium: 'Medium',
  'ut-blog': 'UT CS Blog',
  'ut-blog-archived': 'UT CS Blog (archived)',
  substack: 'Substack',
  internal: null,
  external: 'External',
}

export default function Archive({ posts, topics, years, recentPosts }) {
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
        <title>{`Archive | ${siteTitle}`}</title>
        <meta name="description" content="All writing by Eric Lee — blog posts, essays, and published pieces." />
      </Head>
      <h1>Archive</h1>

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
                <span className={styles.postDate}>
                  <Date dateString={post.date} isPost />
                </span>
                {sourceLabel && (
                  <span className={styles.sourceBadge}>
                    {sourceLabel}
                  </span>
                )}
                {post.era === 'early' && (
                  <span className={styles.eraBadge}>College era</span>
                )}
              </div>
              {post.topics && post.topics.length > 0 && (
                <div className={styles.topicTags}>
                  {post.topics.map((t) => (
                    <Link
                      key={t}
                      href={filterHref('topic', t)}
                      className={styles.topicTag}
                    >
                      {t}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>

      {filtered.length === 0 && (
        <p style={{ color: 'var(--faint)', fontFamily: 'var(--f-ui)', fontSize: '14px' }}>
          No posts match the selected filters.
        </p>
      )}
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getArchiveData()
  const topics = getArchiveTopics(posts)
  const years = getArchiveYears(posts)
  const recentPosts = getSortedPostsData().slice(0, 3)
  return { props: { posts, topics, years, recentPosts } }
}
