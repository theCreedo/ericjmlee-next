import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle, base_url } from '../../components/layout'
import JsonLd from '../../components/JsonLd'
import styles from '../../styles/domain.module.css'
import { useDarkMode } from '../_app'

const FAITH_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Faith — Eric Lee',
  url: `${base_url}/faith`,
  description: 'Faith, community, and church involvement at HMCC Austin. Worship (keys) and small group leadership for working adults.',
}

export default function Faith() {
  const { toggleDarkMode } = useDarkMode()
  const [avatarPop, setAvatarPop] = useState(false)

  function handleAvatarClick() {
    setAvatarPop(true)
    setTimeout(() => setAvatarPop(false), 300)
    toggleDarkMode()
  }

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
          <ul className={styles.linkList}>
            {[
              'Love God, Love Others',
              'Community',
              'Discipleship',
              'Living Missionally',
              'Salt & Light',
              'Redemptive Ministry',
              'Ministry of Presence',
            ].map((v) => (
              <li key={v} className={styles.linkItem}>
                <span className={styles.linkValue}>{v}</span>
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
              <span className={styles.linkLabel}>Missions</span>
              <span className={styles.linkValue}>
                Participated in short-term missions across the US, Latin America, and Asia.
              </span>
            </li>
          </ul>
        </section>

        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Elsewhere in this site</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/studio">Studio →</Link>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
