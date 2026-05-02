import fs from 'fs'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle, base_url } from '../../components/layout'
import JsonLd from '../../components/JsonLd'
import { useDarkMode } from '../_app'
import styles from '../../styles/domain.module.css'

const VALUES = [
  {
    label: 'Love God, Love Others',
    description: 'The two greatest commandments, as hard as they are, are worth living out.',
    verse: 'We love because he first loved us.',
    verseRef: '1 John 4:19',
  },
  {
    label: 'Community',
    description: 'I believe people were made for each other. Community is where faith actually happens, by living life on life with one another.',
    verse: 'For where two or three are gathered in my name, there am I among them.',
    verseRef: 'Matthew 18:20',
  },
  {
    label: 'Discipleship',
    description: 'A deep joy to experience being able to walk, equip, and grow with others.',
    verse: 'Iron sharpens iron, and one man sharpens another.',
    verseRef: 'Proverbs 27:17',
  },
  {
    label: 'Living Missionally',
    description: 'Missions is not confined to location. Missions is every day. In all spheres of influences.',
    verse: 'Declare his glory among the nations, his marvelous works among all the peoples!',
    verseRef: 'Psalm 96:3',
  },
  {
    label: 'Salt & Light',
    description: 'We are called to be salt and light everywhere.',
    verse: 'In the same way, let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven.',
    verseRef: 'Matthew 5:16',
  },
  {
    label: 'Redemptive Ministry',
    description: 'Meeting people where they are and believing restoration is always still possible.',
    verse: 'I have blotted out your transgressions like a cloud and your sins like mist; return to me, for I have redeemed you.',
    verseRef: 'Isaiah 44:22',
  },
]

const SONGS = [
  {
    title: 'Do It Again',
    artist: 'Elevation Worship',
    note: 'What I listened to in difficult times back in college.',
    spotifyId: '3iOpiHDobxZO7S4p9Y2Fgu',
  },
  {
    title: 'Promises',
    artist: 'Maverick City Music',
    note: "A good reminder of God's promises and being reminded of it.",
    spotifyId: '0aZFEiDKLK2B4gzPaGCZVm',
  },
  {
    title: 'Highlands (Song of Ascent)',
    artist: 'Hillsong UNITED',
    note: 'A song of genuine worship even in the darkest moments.',
    spotifyId: '5FcFZktWaHhg0BjXEtlhIf',
  },
  {
    title: 'Reckless Love / Even If',
    artist: 'Mass Anthem',
    note: "A reminder of God's reckless love for us no matter what.",
    spotifyId: '71jqd6lELdjeahZWbh4faC',
  },
  {
    title: 'Let It Echo (Heaven Fall)',
    artist: 'Jesus Culture',
    note: "A desire for God's presence and glory to be known in the city and in the nations.",
    spotifyId: '4bGs53t6K3XQUPsg80RomL',
  },
  {
    title: 'Graves Into Gardens',
    artist: 'Elevation Worship',
    note: 'A call for revival in faith in heart and in so many other ways.',
    spotifyId: '0pNizrRmvu5S16fH6ccm0v',
  },
]

export async function getStaticProps() {
  const photosDir = path.join(process.cwd(), 'public/images/faith/photos')
  const metaPath = path.join(photosDir, 'photos.json')
  const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf-8')) : {}
  const photos = fs.readdirSync(photosDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map((f) => ({ file: f, caption: meta[f] || null }))
  return { props: { photos } }
}

const FAITH_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Faith — Eric Lee',
  url: `${base_url}/faith`,
  description: 'Faith, community, and church involvement at HMCC Austin. Worship (keys) and small group leadership for working adults.',
}

export default function Faith({ photos }) {
  const { toggleDarkMode } = useDarkMode()
  const [avatarPop, setAvatarPop] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  function handleAvatarClick() {
    setAvatarPop(true)
    setTimeout(() => setAvatarPop(false), 300)
    toggleDarkMode()
  }

  const closeLightbox = useCallback(() => {
    if (typeof window !== 'undefined' && window.history.state?.lightboxOpen) {
      window.history.back()
    } else {
      setLightboxIndex(null)
    }
  }, [])
  const prev = useCallback(() => setLightboxIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length])
  const next = useCallback(() => setLightboxIndex((i) => (i + 1) % photos.length), [photos.length])

  const isLightboxOpen = lightboxIndex !== null

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

  useEffect(() => {
    if (!isLightboxOpen) return
    window.history.pushState({ lightboxOpen: true }, '')
    function onPop() { setLightboxIndex(null) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [isLightboxOpen])

  return (
    <Layout canonicalPath="/faith">
      <Head>
        <title>{`Faith | ${siteTitle}`}</title>
        <meta name="description" content="Eric Lee's faith — what it means to how he lives." />
        <meta property="og:title" content={`Faith | ${siteTitle}`} />
        <meta property="og:description" content="Faith as a way of life — HMCC Austin, worship, leadership, and missions." />
        <JsonLd data={FAITH_SCHEMA} />
      </Head>
      {/* Page: /faith | Person: Eric Lee | Topic: Faith, HMCC Austin, church leadership, worship, missions */}
      <div className={styles.page}>
        <div className={styles.domainHeader}>
          <div
            className={`${styles.domainProfile}${avatarPop ? ' ' + styles.domainProfilePop : ''}`}
            onClick={handleAvatarClick}
            role="button"
            aria-label="Toggle dark mode"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleAvatarClick()}
          >
            <Image
              src="/images/profile/faith-profile.jpg"
              alt="Eric Lee"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h1>Faith</h1>
        </div>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Values</p>
          <ul className={styles.valueList}>
            {VALUES.map(({ label, description, verse, verseRef }) => (
              <li key={label} className={styles.valueItem}>
                <span className={styles.valueName}>{label}</span>
                {description && <p className={styles.valueDescription}>{description}</p>}
                {verse && (
                  <p className={styles.valueVerse}>
                    &ldquo;{verse}&rdquo;<span className={styles.verseRef}> — {verseRef}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Community</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Church</span>
              <span className={styles.linkValue}>
                <a href="https://atx.hmccglobal.org/" target="_blank" rel="noopener noreferrer">
                  HMCC Austin
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Role</span>
              <span className={styles.linkValue}>Small group leader, Working Adults Ministry · Worship team (keys)</span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Missions</span>
              <span className={styles.linkValue}>
                US, Japan (2026), Latin America, and Asia.
              </span>
            </li>
          </ul>
          {photos.length > 0 && (
            <div className={styles.photoGrid} style={{ marginTop: 'var(--space-4, 16px)' }}>
              {photos.map(({ file, caption }, i) => (
                <button
                  key={file}
                  className={styles.photoItem}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={caption || `Open photo ${i + 1} of ${photos.length}`}
                >
                  <Image
                    src={`/images/faith/photos/${file}`}
                    alt={caption || 'Life at HMCC Austin'}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 720px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Songs</p>
          <ul className={styles.songList}>
            {SONGS.map(({ title, artist, note, spotifyId }) => (
              <li key={title} className={styles.songItem}>
                <iframe
                  src={`https://open.spotify.com/embed/track/${spotifyId}?utm_source=generator`}
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  allowTransparency
                  loading="lazy"
                  title={`${title} by ${artist}`}
                  className={styles.spotifyEmbed}
                />
                {note && <p className={styles.songNote}>{note}</p>}
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Elsewhere in this site</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/studio">Studio →</Link>
          </nav>
        </div>

        {lightboxIndex !== null && (
          <div className={styles.lightbox} onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Photo lightbox">
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">✕</button>
            {photos.length > 1 && (
              <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo">‹</button>
            )}
            <Image
              src={`/images/faith/photos/${photos[lightboxIndex].file}`}
              alt={photos[lightboxIndex].caption || `HMCC Austin community photo ${lightboxIndex + 1}`}
              className={styles.lightboxImg}
              width={1200}
              height={800}
              style={{ objectFit: 'contain' }}
              onClick={(e) => e.stopPropagation()}
            />
            {photos.length > 1 && (
              <button className={`${styles.lightboxNav} ${styles.lightboxNext}`} onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next photo">›</button>
            )}
            <p className={styles.lightboxCounter}>{lightboxIndex + 1} / {photos.length}</p>
            {photos[lightboxIndex].caption && (
              <p className={styles.lightboxCaption}>{photos[lightboxIndex].caption}</p>
            )}
          </div>
        )}
      </div>
    </Layout>
  )
}
