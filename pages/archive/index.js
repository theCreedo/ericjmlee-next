import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef, useState, useEffect, useCallback } from 'react'
import MiniSearch from 'minisearch'
import Layout, { siteTitle } from '../../components/layout'
import { getArchiveData, getArchiveYears } from '../../lib/archive'
import Date from '../../components/date'
import styles from './archive.module.css'

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

const ALL_TOPICS = [
  'faith', 'leadership', 'reflection', 'practice', 'relationships',
  'purpose', 'craft', 'college', 'career', 'health',
]

export default function Archive({ posts, years }) {
  const router = useRouter()
  const { year } = router.query
  const activeTopics = router.query.topic
    ? router.query.topic.split(',').filter(Boolean)
    : []

  const searchRef = useRef(null)
  if (!searchRef.current) {
    const ms = new MiniSearch({
      fields: ['title', 'description'],
      storeFields: ['id'],
      searchOptions: { boost: { title: 2 }, fuzzy: 0.2, prefix: true },
    })
    ms.addAll(posts.map((p) => ({ id: p.id, title: p.title || '', description: p.description || '' })))
    searchRef.current = ms
  }

  const [query, setQuery] = useState(() => router.query.q || '')
  const debounceRef = useRef(null)

  useEffect(() => {
    const q = router.query.q || ''
    setQuery(q)
  }, [router.query.q])

  const handleSearch = useCallback((e) => {
    const val = e.target.value
    setQuery(val)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const next = { ...router.query }
      if (val) { next.q = val } else { delete next.q }
      router.replace({ pathname: '/archive', query: next }, undefined, { scroll: false, shallow: true })
    }, 200)
  }, [router])

  const searchMatchIds = query.trim()
    ? new Set(searchRef.current.search(query).map((r) => r.id))
    : null

  const filtered = posts.filter((post) => {
    if (year && !post.date.startsWith(year)) return false
    if (activeTopics.length > 0 && !activeTopics.some((t) => post.topics.includes(t))) return false
    if (searchMatchIds && !searchMatchIds.has(post.id)) return false
    return true
  })

  function yearHref(y) {
    const q = { ...router.query }
    if (q.year === y) {
      delete q.year
    } else {
      q.year = y
    }
    return { pathname: '/archive', query: q }
  }

  function topicHref(t) {
    const q = { ...router.query }
    const current = q.topic ? q.topic.split(',').filter(Boolean) : []
    const next = current.includes(t)
      ? current.filter((x) => x !== t)
      : [...current, t]
    if (next.length === 0) {
      delete q.topic
    } else {
      q.topic = next.join(',')
    }
    return { pathname: '/archive', query: q }
  }

  return (
    <Layout canonicalPath="/archive">
      <Head>
        <title>{`Archive | ${siteTitle}`}</title>
        <meta name="description" content="All writing by Eric Lee — blog posts, essays, and published pieces." />
      </Head>
      <h1>Archive</h1>

      {years.length > 0 && (
        <div className={styles.filters}>
          {years.map((y) => (
            <Link
              key={y}
              href={yearHref(y)}
              scroll={false}
              className={`${styles.filterBtn} ${year === y ? styles.filterBtnActive : ''}`}
            >
              {y}
            </Link>
          ))}
        </div>
      )}

      <div className={styles.filterRow}>
        <div className={styles.topicFilters}>
          {ALL_TOPICS.map((t) => {
            const isActive = activeTopics.includes(t)
            return (
              <Link
                key={t}
                href={topicHref(t)}
                scroll={false}
                className={`${styles.topicFilterChip} ${isActive ? styles.topicFilterChipActive : ''}`}
              >
                {t}
              </Link>
            )
          })}
        </div>
        <input
          type="search"
          placeholder="Search posts…"
          value={query}
          onChange={handleSearch}
          className={styles.searchBox}
          aria-label="Search posts"
        />
      </div>

      <ul className={styles.list}>
        {filtered.map((post) => {
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
                  <span className={styles.sourceBadge}>
                    {sourceLabel}
                  </span>
                )}
              </div>
              {post.topics && post.topics.length > 0 && (
                <div className={styles.topicTags}>
                  {post.topics.map((t) => {
                    const isActive = activeTopics.includes(t)
                    return (
                      <Link
                        key={t}
                        href={topicHref(t)}
                        scroll={false}
                        className={`${styles.topicTag} ${isActive ? styles.topicTagActive : ''}`}
                      >
                        {t}
                      </Link>
                    )
                  })}
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
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getArchiveData()
  const years = getArchiveYears(posts)
  return { props: { posts, years } }
}
