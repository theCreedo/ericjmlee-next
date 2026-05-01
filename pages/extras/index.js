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
  'Bouldering',
  'Running',
  'Worship music (keys)',
  'Video games',
  'Anime',
  'Flesh and Blood TCG',
  'Watching shows & movies',
]

const RECS = [
  {
    category: 'Shows & movies',
    items: [
      { label: 'Dandadan',      url: 'https://www.imdb.com/title/tt30217403/' },
      { label: 'Breaking Bad',  url: 'https://www.imdb.com/title/tt0903747/' },
      { label: 'The Godfather', url: 'https://www.imdb.com/title/tt0068646/' },
    ],
  },
  {
    category: 'Video games',
    items: [
      { label: 'Omori',       url: 'https://www.omori-game.com/en' },
      { label: 'Undertale',   url: 'https://undertale.com/' },
      { label: 'Deltarune',   url: 'https://deltarune.com/' },
      { label: 'Inscryption', url: 'https://www.inscryption.com' },
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
  return { props: { photos } }
}

export default function Extras({ photos }) {
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
    <Layout>
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
          {HOBBIES.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </section>

      {photos.length > 0 && (
        <section className={styles.section}>
          <h2>Activity</h2>
          <div className={photoStyles.photoGrid}>
            {photos.map(({ file, caption }, i) => (
              <button
                key={file}
                className={photoStyles.photoItem}
                style={{ aspectRatio: '3 / 4' }}
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
        </section>
      )}

      <section className={styles.section}>
        <h2>Recommendations</h2>
        <dl className={styles.dl}>
          {RECS.map(({ category, items }) => (
            <div key={category} className={styles.dlRow}>
              <dt className={styles.dt}>{category}</dt>
              <dd className={styles.dd}>
                {items.map((item, i) => (
                  <span key={item.label}>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">{item.label}</a>
                    {i < items.length - 1 && ' · '}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
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

      <p className={styles.backLink}>
        <Link href="/about">← Back to About</Link>
      </p>

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
