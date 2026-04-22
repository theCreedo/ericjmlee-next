import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import ExploreFooter from '../../components/ExploreFooter'
import { getSortedPostsData } from '../../lib/posts'
import styles from '../../styles/domain.module.css'

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
      </Head>
      {/* Page: /cards | Person: Eric Lee | Topic: Flesh and Blood TCG, judging, card business, community */}
      <div className={styles.page}>
        <h1>Cards</h1>
        <p className={styles.lead}>[TODO: Eric to write framing paragraph — judging, community, selling. Flesh and Blood TCG.]</p>

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
              <span className={styles.linkLabel}>Judge profile</span>
              <span className={styles.linkValue}>
                <a href="https://fabtcg.com/judges/ericjmlee/" target="_blank" rel="noopener noreferrer">
                  fabtcg.com/judges/ericjmlee
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Store</span>
              <span className={styles.linkValue}>
                <a href="https://www.tcgplayer.com/search/all/product?sellerName=fabcreedo" target="_blank" rel="noopener noreferrer">
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
