import fs from 'fs'
import path from 'path'
import { useState, useEffect, useCallback } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout, { siteTitle, base_url } from '../../components/layout'
import JsonLd from '../../components/JsonLd'
import { useDarkMode } from '../_app'
import styles from '../../styles/domain.module.css'

const LOGOS = [
  { file: 'fab-logo.png',             alt: 'Flesh and Blood TCG', url: 'https://fabtcg.com' },
  { file: 'judges-of-rathe-logo.png', alt: 'Judges of Rathe',    url: 'https://judge.fabtcg.com/judges/ericjmlee' },
  { file: 'tcgplayer-logo.png',       alt: 'TCGplayer',          url: 'https://www.tcgplayer.com/search/all/product?seller=c32f5ae7&view=grid' },
]

const CARDS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Cards — Eric Lee',
  url: `${base_url}/cards`,
  description: 'Playing, collecting, selling, and judging in Flesh & Blood TCG. L2 Certified Judge and JCR for USA South Central.',
  about: {
    '@type': 'Person',
    name: 'Eric Lee',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Level 2 Certified Judge, Flesh and Blood TCG',
    },
  },
}

export async function getStaticProps() {
  const photosDir = path.join(process.cwd(), 'public/images/cards/photos')
  const metaPath = path.join(photosDir, 'photos.json')
  const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, 'utf-8')) : {}
  const photos = fs.readdirSync(photosDir)
    .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
    .sort()
    .map((f) => ({ file: f, caption: meta[f] || null }))
  return { props: { photos } }
}

export default function Cards({ photos }) {
  const { toggleDarkMode } = useDarkMode()
  const [avatarPop, setAvatarPop] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(null)

  function handleAvatarClick() {
    setAvatarPop(true)
    setTimeout(() => setAvatarPop(false), 300)
    toggleDarkMode()
  }

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
        <title>{`Cards | ${siteTitle}`}</title>
        <meta name="description" content="Eric Lee in Flesh and Blood TCG — playing, collecting, selling, and judging. FAB L2 judge and JCR for USA South Central." />
        <meta property="og:title" content={`Cards | ${siteTitle}`} />
        <meta property="og:description" content="Playing, collecting, selling, and judging in Flesh & Blood TCG. FAB L2 judge and TCG seller." />
        <JsonLd data={CARDS_SCHEMA} />
      </Head>
      {/* Page: /cards | Person: Eric Lee | Topic: Flesh and Blood TCG, playing, collecting, selling, judging, community */}
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
              src="/images/profile/cards-profile.jpg"
              alt="Eric Lee"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h1>Cards</h1>
        </div>
        <p className={styles.lead}>I&apos;ve been in <a href="https://fabtcg.com" target="_blank" rel="noopener noreferrer">Flesh and Blood</a> since the end of 2021. Started off as a player, then a collector and a seller, and now a judge. For my locals, I try to be involved and connect players with one another in the community, as well as inform about regional and national events. As a judge, I help write content for the judge blog and am involved in the community as JCR (Judge Community Representative) for USA South Central.</p>

        <div className={styles.logoStrip}>
          {LOGOS.map((logo) => (
            <a
              key={logo.file}
              href={logo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.logoWrapper}
              aria-label={logo.alt}
            >
              <Image
                src={`/images/cards/${logo.file}`}
                alt={logo.alt}
                fill
                className={styles.logoImg}
                style={{ objectFit: 'contain', objectPosition: 'left center' }}
              />
            </a>
          ))}
        </div>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Writing</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Apr 2026</span>
              <span className={styles.linkValue}>
                <a href="https://blog.judge.fabtcg.com/blog/2026/04/13/judge-projects-policy/" target="_blank" rel="noopener noreferrer">
                  Behind the Scenes: The Policy Team – Shaping How We Judge Flesh and Blood
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Nov 2025</span>
              <span className={styles.linkValue}>
                <a href="https://blog.judge.fabtcg.com/blog/2025/11/11/what-is-a-wrangler-part-2/" target="_blank" rel="noopener noreferrer">
                  Wrangling at Gen Con: How Outreach Filled Every Demo Seat in 15 Minutes
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Nov 2025</span>
              <span className={styles.linkValue}>
                <a href="https://blog.judge.fabtcg.com/blog/2025/11/08/what-is-a-wrangler-part-1/" target="_blank" rel="noopener noreferrer">
                  What is a Wrangler? Understanding the L2P Role (Part 1)
                </a>
              </span>
            </li>
          </ul>
          <p style={{ marginTop: '12px', fontFamily: 'var(--f-ui)', fontSize: '13px' }}>
            Topics span policy and rules, personal stories from events, and interviews with judges on their experiences.{' '}
            <a href="https://blog.judge.fabtcg.com/blog/author/eric-lee/" target="_blank" rel="noopener noreferrer">
              All judge writing →
            </a>
          </p>
        </section>

        {photos.length > 0 && (
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Community</p>
            <div className={styles.photoGrid}>
              {photos.map(({ file, caption }, i) => (
                <button
                  key={file}
                  className={styles.photoItem}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={caption || `Open photo ${i + 1} of ${photos.length}`}
                >
                  <Image
                    src={`/images/cards/photos/${file}`}
                    alt={caption || 'Flesh and Blood community'}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 720px) 50vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </button>
              ))}
            </div>
            <p style={{ marginTop: '12px', fontFamily: 'var(--f-ui)', fontSize: '13px' }}>
              <a href="https://www.instagram.com/fabcreedo/" target="_blank" rel="noopener noreferrer">
                Follow @fabcreedo →
              </a>
            </p>
          </section>
        )}

        {lightboxIndex !== null && (
          <div className={styles.lightbox} onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Photo lightbox">
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">✕</button>
            {photos.length > 1 && (
              <button className={`${styles.lightboxNav} ${styles.lightboxPrev}`} onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous photo">‹</button>
            )}
            <Image
              src={`/images/cards/photos/${photos[lightboxIndex].file}`}
              alt={photos[lightboxIndex].caption || `Flesh and Blood community photo ${lightboxIndex + 1}`}
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

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Store</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Selling since</span>
              <span className={styles.linkValue}>February 2024 · Creedo&apos;s Emporio</span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Shop</span>
              <span className={styles.linkValue}>
                <a href="https://www.tcgplayer.com/search/all/product?seller=c32f5ae7&view=grid" target="_blank" rel="noopener noreferrer">
                  TCGplayer listings
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Feedback</span>
              <span className={styles.linkValue}>
                <a href="https://www.tcgplayer.com/sellers/Creedo%27s-Emporio/c32f5ae7/feedback" target="_blank" rel="noopener noreferrer">
                  Buyer ratings
                </a>
              </span>
            </li>
          </ul>
          <ul className={styles.reviewList}>
            <li className={styles.reviewItem}>
              <p className={styles.reviewText}>&ldquo;Had an issue with shipping, but the store made it more than right. Wasn&apos;t the store&apos;s fault, issue with USPS. Great communication.&rdquo;</p>
              <p className={styles.reviewMeta}>t****5 &middot; Nov 2025</p>
            </li>
            <li className={styles.reviewItem}>
              <p className={styles.reviewText}>&ldquo;Even though there was a problem where I was sent the wrong version of the card I ordered, the seller was diligent and corrected the issue. Would order again.&rdquo;</p>
              <p className={styles.reviewMeta}>c****9 &middot; May 2025</p>
            </li>
            <li className={styles.reviewItem}>
              <p className={styles.reviewText}>&ldquo;Amazing seller, quick shipping, great communication 10/10 would buy anytime&rdquo;</p>
              <p className={styles.reviewMeta}>p****9 &middot; Jul 2025</p>
            </li>
          </ul>
        </section>

        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Elsewhere in this site</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/work">Work →</Link>
            <Link href="/studio">Studio →</Link>
            <Link href="/archive">Archive →</Link>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
