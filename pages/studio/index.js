import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle, base_url } from '../../components/layout'
import JsonLd from '../../components/JsonLd'
import styles from '../../styles/domain.module.css'
import { useDarkMode } from '../_app'

const STUDIO_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'CreativeWork',
  name: 'Studio — Eric Lee',
  url: `${base_url}/studio`,
  creator: {
    '@type': 'Person',
    name: 'Eric Lee',
    url: base_url,
  },
  description: 'Project shelf: writing archive, early projects, newsletter, and past platforms.',
}

export default function Studio() {
  const { toggleDarkMode } = useDarkMode()
  const [avatarPop, setAvatarPop] = useState(false)

  function handleAvatarClick() {
    setAvatarPop(true)
    setTimeout(() => setAvatarPop(false), 300)
    toggleDarkMode()
  }

  return (
    <Layout canonicalPath="/studio">
      <Head>
        <title>{`Studio | ${siteTitle}`}</title>
        <meta name="description" content="Eric Lee's project shelf — writing, early projects, and archived work." />
        <meta property="og:title" content={`Studio | ${siteTitle}`} />
        <meta property="og:description" content="Eric Lee's project shelf — writing, early projects, and archived work." />
        <JsonLd data={STUDIO_SCHEMA} />
      </Head>
      {/* Page: /studio | Person: Eric Lee | Topic: Creative output, writing, projects */}
      {/* TODO: /studio content direction needs rethinking — archive now has all writing from Medium, WordPress, Substack, UT CS Blog. Consider photo grid similar to /cards community section. */}
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
              src="/images/profile/studio-profile.jpg"
              alt="Eric Lee"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h1>Studio</h1>
        </div>
        <p className={styles.lead}>Studio is a creative space — where the writing lives, where early experiments were built, and where the work that doesn&apos;t fit neatly elsewhere still has a home. A newsletter that ran for two years. Blog posts across different corners of the internet. Hackathon projects from the years of figuring out what to build. It&apos;s all here, made and kept.</p>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Writing</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Archive</span>
              <span className={styles.linkValue}>
                <Link href="/archive">All writing →</Link>
              </span>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Projects</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Early work</span>
              <span className={styles.linkValue}>
                <Link href="/projects">Hackathon and early projects →</Link>
              </span>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Newsletter</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Savvy Saturdays</span>
              <span className={styles.linkValue}>
                Weekly newsletter, 2020–2021, now archived.{' '}
                <a href="https://ericlee.substack.com/archive" target="_blank" rel="noopener noreferrer">
                  Substack archive →
                </a>
              </span>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Past platforms</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Medium</span>
              <span className={styles.linkValue}>
                <a href="https://medium.com/@ericjmlee" target="_blank" rel="noopener noreferrer">
                  medium.com/@ericjmlee
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>UT CS Blog</span>
              <span className={styles.linkValue}>University of Texas at Austin, Computer Science</span>
            </li>
          </ul>
        </section>

        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Elsewhere in this site</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/work">Work →</Link>
            <Link href="/faith">Faith →</Link>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
