import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import { getAllSeries } from '../../lib/posts'
import Date from '../../components/date'
import styles from './series.module.css'

function titleFromSlug(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function SeriesPage({ slug, posts, title }) {
  const total = posts.length

  return (
    <Layout canonicalPath={`/series/${slug}`}>
      <Head>
        <title>{`${title} | ${siteTitle}`}</title>
        <meta name="description" content={`A ${total}-part series by Eric Lee.`} />
      </Head>

      <div className={styles.header}>
        <span className={styles.sectionLabel}>SERIES</span>
        <h1 className={styles.seriesName}>{title}</h1>
        <p className={styles.count}>{total} {total === 1 ? 'part' : 'parts'}</p>
      </div>

      <ul className={styles.list}>
        {posts.map((post, i) => (
          <li key={post.id} className={styles.listItem}>
            <div className={styles.orderBadge}>{i + 1}</div>
            <div className={styles.content}>
              <Link href={`/blog/${post.id}`} className={styles.postTitle}>
                {post.title}
              </Link>
              {post.description && (
                <p className={styles.postDescription}>{post.description}</p>
              )}
              <div className={styles.meta}>
                <Date dateString={post.date} isPost />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const seriesMap = getAllSeries()
  const rawPosts = seriesMap[slug] || []
  const title = titleFromSlug(slug)

  const posts = rawPosts.map((p) => ({
    id: p.id,
    title: p.title,
    date: p.date ? String(p.date).slice(0, 10) : '',
    description: p.description || '',
    series_order: p.series_order || null,
  }))

  return { props: { slug, posts, title } }
}

export async function getStaticPaths() {
  const seriesMap = getAllSeries()
  const paths = Object.keys(seriesMap).map((slug) => ({ params: { slug } }))
  return { paths, fallback: false }
}
