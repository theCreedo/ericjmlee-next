import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import styles from './index.module.css'
import { useDarkMode } from './_app'

const domains = [
  { label: 'Work',   href: '/work',   description: 'Developer Advocate at Global Payments — helping developers integrate, build, and ship.' },
  { label: 'Cards',  href: '/cards',  description: 'L2 judge, card business, and Austin community in Flesh and Blood TCG.' },
  { label: 'Faith',  href: '/faith',  description: 'Love God, Love Others.' },
  { label: 'Studio', href: '/studio', description: 'A creative space for writing, making, and everything built along the way.' },
]

export default function Home() {
  const [avatarPop, setAvatarPop] = useState(false)
  const { toggleDarkMode } = useDarkMode()

  function handleAvatarClick() {
    setAvatarPop(true)
    setTimeout(() => setAvatarPop(false), 300)
    toggleDarkMode()
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Developer advocate, L2 TCG judge, church leader, and writer based in Austin, TX." />
      </Head>
      <section>
        <div className={styles.heroRow}>
          <div
            className={`${styles.avatar}${avatarPop ? ' ' + styles.avatarPop : ''}`}
            onClick={handleAvatarClick}
            role="button"
            aria-label="Toggle dark mode"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleAvatarClick()}
          >
            <Image
              src="/images/profile/transparent-profile.png"
              alt="Eric Lee"
              width={68}
              height={68}
            />
          </div>
          <div className={styles.heroText}>
            <p className={styles.heroGreeting}><span className={styles.wave}>👋</span> Welcome to the front-end part of my life.</p>
            <p className={styles.heroCredentials}>Developer advocate · L2 judge · church leader · writer</p>
            <p className={styles.heroMeta}>Austin, TX · UT &rsquo;19 · 🇺🇸🇹🇼</p>
          </div>
        </div>

        <div className={styles.domainGrid}>
          {domains.map(({ label, href, description }) => (
            <a key={label} href={href} className={styles.domainCard}>
              <h3>{label}</h3>
              <p>{description}</p>
            </a>
          ))}
        </div>

        <section id="about" className={styles.about}>
          <p>I grew up in Plano, studied CS at UT Austin, and stayed in Austin. I work in developer advocacy, judge trading card game tournaments, lead at my church, and write. Four domains, one person.</p>
        </section>
      </section>
    </Layout>
  )
}
