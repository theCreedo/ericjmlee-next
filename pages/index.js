import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Layout, { siteTitle } from '../components/layout'
import styles from './index.module.css'
import { getSortedPostsData } from '../lib/posts'
import ExploreFooter from '../components/ExploreFooter'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

const domains = [
  { label: 'Work', href: '/work', description: '[TODO: one-liner ~15 words]' },
  { label: 'Cards', href: '/cards', description: '[TODO: one-liner ~15 words]' },
  { label: 'Faith', href: '/faith', description: '[TODO: one-liner ~15 words]' },
  { label: 'Studio', href: '/studio', description: '[TODO: one-liner ~15 words]' },
]

export default function Home({ allPostsData }) {
  const recentPosts = allPostsData.slice(0, 3)
  const [avatarPop, setAvatarPop] = useState(false)

  function handleAvatarClick() {
    setAvatarPop(true)
    setTimeout(() => setAvatarPop(false), 300)
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
            role="presentation"
          >
            <Image
              src="/images/profile/transparent-profile.png"
              alt="Eric Lee"
              width={68}
              height={68}
            />
          </div>
          <div className={styles.heroText}>
            <p className={styles.heroGreeting}>Welcome to the front-end part of my life.</p>
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
          <p>[TODO: about paragraph — Plano origin, UT Austin CS 2019, Austin, four domains]</p>
        </section>
      </section>
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}
