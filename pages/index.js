import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
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
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.divContainer}>
        <div className={styles.hero}>
          <p>Welcome to the front-end part of my life.</p>
          <p>
            Developer advocate · L2 judge · church leader · writer<br />
            Austin, TX · UT '19 · 🇺🇸🇹🇼
          </p>
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
          {/* TODO: contact email — use JS-assembled rendering to block scrapers */}
        </section>
      </section>
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}
