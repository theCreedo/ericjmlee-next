import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle, base_url } from '../components/layout'
import JsonLd from '../components/JsonLd'
import styles from './index.module.css'
import { useDarkMode } from './_app'

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Eric Lee',
  url: base_url,
  description: 'Developer advocate, L2 TCG judge, church leader, and writer based in Austin, TX.',
  author: {
    '@type': 'Person',
    name: 'Eric Lee',
    url: base_url,
  },
}

const domains = [
  { label: 'Work',   href: '/work',   description: 'Developer Advocate @ Global Payments — helping developers integrate, build, and ship.' },
  { label: 'Cards',  href: '/cards',  description: 'Playing, collecting, selling, and judging in Flesh & Blood TCG.' },
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
    <Layout home canonicalPath="/">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="Eric Lee — developer advocate, FAB L2 judge, TCG seller, church leader, and writer based in Austin, TX." />
        <JsonLd data={WEBSITE_SCHEMA} />
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
              width={80}
              height={80}
            />
          </div>
          <div className={styles.heroText}>
            <p className={styles.heroGreeting}><span className={styles.wave}>👋</span> Welcome to the front-end part of my life.</p>
            <p className={styles.heroCredentials}>Developer advocate · FAB L2 judge · TCG seller · church leader · writer</p>
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
          <p>Raised in Plano 🇺🇸, Taiwanese roots 🇹🇼, Texas all my life. I studied CS at <a href="https://www.utexas.edu" target="_blank" rel="noopener noreferrer">UT Austin</a> 🤘 and stayed in Austin afterwards. I work in developer advocacy —
          currently at <a href="https://www.globalpayments.com" target="_blank" rel="noopener noreferrer">Global Payments</a> — judge and play <a href="https://fabtcg.com" target="_blank" rel="noopener noreferrer">Flesh and Blood TCG</a>, serve at <a href="https://atx.hmccglobal.org/" target="_blank" rel="noopener noreferrer">HMCC Austin</a>, and write &amp; tinker on many projects on the side.</p>
        </section>
      </section>
    </Layout>
  )
}
