import fs from 'fs'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import styles from './extras.module.css'
import photoStyles from '../../styles/domain.module.css'

const PERSONALITY = [
  { label: 'MBTI', value: 'ENFP' },
  { label: 'Enneagram', value: '2w3' },
  { label: 'Clifton Strengths', value: 'Ideation · Connectedness · Futuristic · Empathy · Learner' },
  { label: 'DISC', value: 'I/S' },
  { label: 'APEST', value: 'Apostle' },
]

const HOBBIES = [
  { label: 'Bouldering' },
  { label: 'Running' },
  { label: 'Worship music (keys)' },
  { label: 'Video games' },
  { label: 'Anime' },
  { label: 'Flesh and Blood TCG', url: 'https://fabtcg.com' },
  { label: 'Watching shows & movies' },
]

const RECS_SOURCE = [
  {
    category: 'Shows & movies',
    items: [
      { label: 'Breaking Bad',  url: 'https://www.imdb.com/title/tt0903747/', tmdbId: '1396', tmdbType: 'tv' },
      { label: 'The Godfather', url: 'https://www.imdb.com/title/tt0068646/', tmdbId: '238',  tmdbType: 'movie' },
      { label: 'Pulp Fiction',  url: 'https://www.imdb.com/title/tt0110912/', tmdbId: '680',  tmdbType: 'movie' },
    ],
  },
  {
    category: 'Video games',
    items: [
      { label: 'Omori',            url: 'https://www.omori-game.com/en',                                  steamAppId: '1150690' },
      { label: 'Undertale',        url: 'https://undertale.com/',                                         steamAppId: '391540' },
      { label: 'Deltarune',        url: 'https://deltarune.com/',                                         steamAppId: '1671210' },
      { label: 'Inscryption',      url: 'https://www.inscryption.com',                                    steamAppId: '1092790' },
      { label: 'Slay the Spire',   url: 'https://store.steampowered.com/app/646570/Slay_the_Spire/',      steamAppId: '646570' },
      { label: 'Slay the Spire 2', url: 'https://store.steampowered.com/app/2868840/Slay_the_Spire_2/',  steamAppId: '2868840' },
    ],
  },
  {
    category: 'Anime',
    items: [
      { label: 'Dandadan',              url: 'https://www.imdb.com/title/tt30217403/',  tmdbId: null,     tmdbType: 'tv' },
      { label: 'One Piece',             url: 'https://www.imdb.com/title/tt0388629/',   tmdbId: '37854',  tmdbType: 'tv' },
      { label: 'Apothecary Diaries',    url: 'https://www.imdb.com/title/tt26743760/',  tmdbId: '220542', tmdbType: 'tv' },
      { label: "Howl's Moving Castle",  url: 'https://www.themoviedb.org/movie/4935',   tmdbId: '4935',   tmdbType: 'movie' },
      { label: 'The Wind Rises',        url: 'https://www.themoviedb.org/movie/149870', tmdbId: '149870', tmdbType: 'movie' },
    ],
  },
  {
    category: 'Reading',
    items: [
      { label: 'GoodReads', url: 'https://www.goodreads.com/user/show/127464751-eric-lee' },
    ],
  },
]

const QUOTES = [
  {
    text: 'You shall love the Lord your God with all your heart and with all your soul and with all your mind. This is the great and first commandment. And a second is like it: You shall love your neighbor as yourself.',
    source: 'Matthew 22:37-39 ESV',
  },
  {
    text: 'For where your treasure is, there your heart will be also.',
    source: 'Matthew 6:21',
  },
  {
    text: 'There is only one way to eat an elephant: one bite at a time.',
    source: 'Desmond Tutu',
  },
  {
    text: "I'm gonna make him an offer he can't refuse.",
    source: 'The Godfather',
  },
  {
    text: 'Murder your darlings.',
    source: 'Anonymous',
  },
  {
    text: 'For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord.',
    source: 'Romans 8:38-39',
  },
]

const PRINCIPLES = [
  { text: 'Joy in all things. In every moment. Every morning.', source: '1 Thessalonians 5:16-18' },
  { text: 'Love in all you do, even when hard.', source: '1 Corinthians 13' },
  { text: 'Glorify God in everything you do.', source: '' },
  { text: 'Testimony of Grace.', source: 'Matthew 5:14-16' },
  { text: 'Each day is not guaranteed, so live for the day.', source: '' },
  { text: "Learn to think for yourself — don't blindly follow.", source: '' },
]

const SITE_HISTORY = [
  { year: 'Origin', url: 'https://origin.ericjmlee.com', label: 'origin.ericjmlee.com' },
  { year: '2021', url: 'https://2021.ericjmlee.com', label: '2021.ericjmlee.com' },
  { year: '2022', url: 'https://2022.ericjmlee.com', label: '2022.ericjmlee.com' },
  { year: '2025', url: 'https://2025.ericjmlee.com', label: '2025.ericjmlee.com' },
  { year: 'Now', url: 'https://ericjmlee.com', label: 'ericjmlee.com' },
]

export async function getStaticProps() {
  const photosDir = path.join(process.cwd(), 'public/images/extras/photos')
  const metaPath = path.join(photosDir, 'photos.json')
  const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf-8')) : {}
  const photos = fs.readdirSync(photosDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map((f) => ({ file: f, caption: meta[f] || null }))

  const TMDB_KEY = process.env.TMDB_API_KEY

  async function fetchTmdbPoster(tmdbId, tmdbType) {
    if (!TMDB_KEY || !tmdbId) return null
    try {
      const res = await fetch(`https://api.themoviedb.org/3/${tmdbType}/${tmdbId}?api_key=${TMDB_KEY}`)
      if (!res.ok) return null
      const data = await res.json()
      return data.poster_path ? `https://image.tmdb.org/t/p/w300${data.poster_path}` : null
    } catch {
      return null
    }
  }

  const recs = await Promise.all(
    RECS_SOURCE.map(async (cat) => ({
      ...cat,
      items: await Promise.all(
        cat.items.map(async (item) => {
          let image = null
          if (item.tmdbId) {
            image = await fetchTmdbPoster(item.tmdbId, item.tmdbType)
          } else if (item.steamAppId) {
            image = `https://cdn.akamai.steamstatic.com/steam/apps/${item.steamAppId}/library_600x900.jpg`
          }
          return { label: item.label, url: item.url || null, image }
        })
      ),
    }))
  )

  return { props: { photos, recs } }
}

export default function Extras({ photos, recs }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % photos.length), [photos.length])

  useEffect(() => {
    if (lightboxIndex === null) return
    function onKey(e) {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxIndex, closeLightbox, prev, next])

  return (
    <Layout canonicalPath="/extras">
      <Head>
        <title>{`Extras | ${siteTitle}`}</title>
        <meta name="description" content="The extras — personality, hobbies, recommendations, and site history." />
      </Head>

      <h1>Extras</h1>
      <p style={{ fontFamily: 'var(--f-ui)', fontSize: '13px', color: 'var(--faint)', marginTop: 0 }}>
        The stuff that doesn&apos;t fit neatly anywhere else.
      </p>

      <section className={styles.section}>
        <h2>Personality</h2>
        <dl className={styles.dl}>
          {PERSONALITY.map(({ label, value }) => (
            <div key={label} className={styles.dlRow}>
              <dt className={styles.dt}>{label}</dt>
              <dd className={styles.dd}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section}>
        <h2>Hobbies</h2>
        <ul className={styles.plainList}>
          {HOBBIES.map((h) => (
            <li key={h.label}>
              {h.url
                ? <a href={h.url} target="_blank" rel="noopener noreferrer">{h.label}</a>
                : h.label}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Recommendations</h2>
        <dl className={styles.dl}>
          {recs.map(({ category, items }) => {
            const hasImages = items.some((item) => item.image)
            return (
              <div key={category} className={styles.dlRow}>
                <dt className={styles.dt}>{category}</dt>
                <dd className={styles.dd}>
                  {hasImages ? (
                    <div className={styles.recsGrid}>
                      {items.map((item) =>
                        item.image ? (
                          <a
                            key={item.label}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.recsCard}
                          >
                            <Image
                              src={item.image}
                              alt={item.label}
                              fill
                              sizes="(max-width: 480px) 33vw, 150px"
                              style={{ objectFit: 'cover' }}
                            />
                            <span className={styles.recsCardTitle}>{item.label}</span>
                          </a>
                        ) : (
                          <a
                            key={item.label}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${styles.recsCard} ${styles.recsCardNoImage}`}
                          >
                            <span className={styles.recsCardTitle}>{item.label}</span>
                          </a>
                        )
                      )}
                    </div>
                  ) : (
                    items.map((item, i) => (
                      <span key={item.label}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a>
                        {i < items.length - 1 && ' · '}
                      </span>
                    ))
                  )}
                </dd>
              </div>
            )
          })}
        </dl>
      </section>

      {photos.length > 0 && (
        <section className={styles.section}>
          <h2>Activity</h2>
          <div className={photoStyles.photoGrid}>
            {photos.map(({ file, caption }, i) => (
              <button
                key={file}
                className={photoStyles.photoItem}
                style={{ aspectRatio: '1 / 1' }}
                onClick={() => setLightboxIndex(i)}
                aria-label={caption || `Open photo ${i + 1} of ${photos.length}`}
              >
                <Image
                  src={`/images/extras/photos/${file}`}
                  alt={caption || 'Eric Lee — activity'}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 720px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>
          <p style={{ marginTop: '12px', fontFamily: 'var(--f-ui)', fontSize: '13px' }}>
            <a href="https://www.instagram.com/solothecreedo/" target="_blank" rel="noopener noreferrer">
              Follow @solothecreedo →
            </a>
          </p>
        </section>
      )}

      <section className={styles.section}>
        <h2>Principles</h2>
        <ul className={styles.quoteList}>
          {PRINCIPLES.map(({ text, source }) => (
            <li key={text} className={styles.quoteItem}>
              <p className={styles.quoteText}>{text}</p>
              {source && <p className={styles.quoteSource}>— {source}</p>}
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Quotes &amp; Verses</h2>
        <ul className={styles.quoteList}>
          {QUOTES.map(({ text, source }) => (
            <li key={source} className={styles.quoteItem}>
              <p className={styles.quoteText}>&ldquo;{text}&rdquo;</p>
              <p className={styles.quoteSource}>— {source}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Site History</h2>
        <p>This site has gone through a few eras.</p>
        <ul className={styles.historyList}>
          {SITE_HISTORY.map(({ year, url, label }) => (
            <li key={year}>
              <span className={styles.historyYear}>{year}</span>
              <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
            </li>
          ))}
        </ul>
      </section>

      <div className={photoStyles.crossLinks}>
        <p className={photoStyles.sectionLabel}>Elsewhere in this site</p>
        <nav className={photoStyles.crossLinkNav}>
          <Link href="/about">About →</Link>
        </nav>
      </div>

      {lightboxIndex !== null && (
        <div className={photoStyles.lightbox} onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Photo lightbox">
          <button className={photoStyles.lightboxClose} onClick={closeLightbox} aria-label="Close">✕</button>
          {photos.length > 1 && (
            <button className={`${photoStyles.lightboxNav} ${photoStyles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo">‹</button>
          )}
          <Image
            src={`/images/extras/photos/${photos[lightboxIndex].file}`}
            alt={photos[lightboxIndex].caption || `Activity photo ${lightboxIndex + 1}`}
            className={photoStyles.lightboxImg}
            width={1200}
            height={800}
            style={{ objectFit: 'contain' }}
            onClick={(e) => e.stopPropagation()}
          />
          {photos.length > 1 && (
            <button className={`${photoStyles.lightboxNav} ${photoStyles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next photo">›</button>
          )}
          <p className={photoStyles.lightboxCounter}>{lightboxIndex + 1} / {photos.length}</p>
          {photos[lightboxIndex].caption && (
            <p className={photoStyles.lightboxCaption}>{photos[lightboxIndex].caption}</p>
          )}
        </div>
      )}
    </Layout>
  )
}
