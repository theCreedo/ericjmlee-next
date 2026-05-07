import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import { getArchiveData, getAdjacentTopics } from '../../lib/archive'
import { TOPIC_DESCRIPTIONS } from '../../lib/topics'
import Date from '../../components/date'
import styles from './topic.module.css'

const ALL_TOPICS = [
  'faith', 'leadership', 'reflection', 'practice', 'relationships',
  'purpose', 'craft', 'college', 'career', 'health',
]

const SOURCE_LABELS = {
  medium: 'Medium',
  'ut-blog': 'UT CS Blog',
  'ut-blog-archived': 'UT CS Blog (archived)',
  substack: 'Substack',
  'wordpress-o9to5': 'Outside the 9 to 5',
  internal: null,
  external: 'External',
  'cs371p': 'CS371p Fall 2016',
  'cs373': 'CS373 Spring 2017',
  'github-blog': 'GitHub Blog',
}

const INTERNAL_SOURCES = new Set(['internal', 'cs371p', 'cs373', 'github-blog'])

export default function TopicPage({ slug, posts, description, adjacentTopics }) {
  const label = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <Layout canonicalPath={`/topic/${slug}`}>
      <Head>
        <title>{`${label} | ${siteTitle}`}</title>
        <meta name="description" content={description} />
      </Head>

      <div className={styles.header}>
        <span className={styles.sectionLabel}>TOPIC</span>
        <h1 className={styles.topicName}>{label}</h1>
        {description && <p className={styles.blurb}>{description}</p>}
      </div>

      <ul className={styles.list}>
        {posts.map((post) => {
          const sourceLabel = SOURCE_LABELS[post.source]
          const isInternal = INTERNAL_SOURCES.has(post.source)
          const href = isInternal ? `/blog/${post.id}` : post.original_link

          return (
            <li key={post.id} className={styles.listItem}>
              <a
                href={href}
                {...(!isInternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={styles.postTitle}
              >
                {post.title}
              </a>
              {post.description && (
                <p className={styles.postDescription}>{post.description}</p>
              )}
              <div className={styles.meta}>
                <span className={styles.postDate}>
                  <Date dateString={post.date} isPost />
                </span>
                {sourceLabel && (
                  <span className={styles.sourceBadge}>{sourceLabel}</span>
                )}
              </div>
              {post.topics && post.topics.length > 1 && (
                <div className={styles.topicTags}>
                  {post.topics.filter((t) => t !== slug).map((t) => (
                    <Link
                      key={t}
                      href={`/topic/${t}`}
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

      {adjacentTopics.length > 0 && (
        <div className={styles.adjacentSection}>
          <span className={styles.sectionLabel}>RELATED TOPICS</span>
          <div className={styles.adjacentChips}>
            {adjacentTopics.map((t) => (
              <Link key={t} href={`/topic/${t}`} className={styles.adjacentChip}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const { slug } = params
  const allPosts = getArchiveData()
  const posts = allPosts.filter((p) => p.topics.includes(slug))
  const description = TOPIC_DESCRIPTIONS[slug] || ''
  const adjacentTopics = getAdjacentTopics(slug, allPosts)

  return {
    props: { slug, posts, description, adjacentTopics },
  }
}

export async function getStaticPaths() {
  return {
    paths: ALL_TOPICS.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
