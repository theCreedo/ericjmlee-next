import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle, base_url } from '../../components/layout'
import ExploreFooter from '../../components/ExploreFooter'
import JsonLd from '../../components/JsonLd'
import { getSortedPostsData } from '../../lib/posts'
import styles from '../../styles/domain.module.css'

const CARDS_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Cards — Eric Lee',
  url: `${base_url}/cards`,
  description: 'L2 Certified Judge and Judge Community Representative for Flesh and Blood TCG. Runs a card business on TCGplayer.',
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
  const recentPosts = getSortedPostsData().slice(0, 3)
  return { props: { recentPosts } }
}

export default function Cards({ recentPosts }) {
  return (
    <Layout>
      <Head>
        <title>{`Cards | ${siteTitle}`}</title>
        <meta name="description" content="Eric Lee's work in Flesh and Blood TCG — judging, community, and card business." />
        <meta property="og:title" content={`Cards | ${siteTitle}`} />
        <meta property="og:description" content="L2 Certified Judge and JCR for Flesh and Blood TCG. Card business, community, and judging." />
        <JsonLd data={CARDS_SCHEMA} />
      </Head>
      {/* Page: /cards | Person: Eric Lee | Topic: Flesh and Blood TCG, judging, card business, community */}
      <div className={styles.page}>
        <h1>Cards</h1>
        <p className={styles.lead}>I&apos;ve been in Flesh and Blood TCG since the early days — as a player, then a judge, now an L2 Certified Judge and Judge Community Representative for USA South Central. The Austin FAB community is home base: local events, tournaments, and the people who show up week after week. I also run a card business and write for the judge blog about what it means to judge well.</p>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Credentials</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Certification</span>
              <span className={styles.linkValue}>Level 2 Certified Judge — Flesh and Blood TCG</span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Role</span>
              <span className={styles.linkValue}>
                Judge Community Representative, USA South Central
                <br />
                <span style={{ fontFamily: 'var(--f-ui)', fontSize: '11px', color: 'var(--faint)' }}>
                  18-month term · October 2025
                </span>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Business</span>
              <span className={styles.linkValue}>I run a Flesh and Blood card business.</span>
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Find me</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Game</span>
              <span className={styles.linkValue}>
                <a href="https://fabtcg.com" target="_blank" rel="noopener noreferrer">
                  fabtcg.com
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Judge profile</span>
              <span className={styles.linkValue}>
                <a href="https://judge.fabtcg.com/judges/ericjmlee/" target="_blank" rel="noopener noreferrer">
                  judge.fabtcg.com/judges/ericjmlee
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Judge resources</span>
              <span className={styles.linkValue}>
                <a href="https://blog.judge.fabtcg.com" target="_blank" rel="noopener noreferrer">
                  blog.judge.fabtcg.com
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Store</span>
              <span className={styles.linkValue}>
                <a href="https://www.tcgplayer.com/search/all/product?seller=c32f5ae7&view=grid" target="_blank" rel="noopener noreferrer">
                  TCGplayer — fabcreedo
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Instagram</span>
              <span className={styles.linkValue}>
                <a href="https://www.instagram.com/fabcreedo/" target="_blank" rel="noopener noreferrer">
                  @fabcreedo
                </a>
              </span>
            </li>
          </ul>
        </section>

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
            <a href="https://blog.judge.fabtcg.com/blog/author/eric-lee/" target="_blank" rel="noopener noreferrer">
              All judge writing →
            </a>
          </p>
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
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}
