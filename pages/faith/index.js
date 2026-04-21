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

export default function Faith({ recentPosts }) {
  return (
    <Layout>
      <Head>
        <title>{`Faith | ${siteTitle}`}</title>
        <meta name="description" content="Eric Lee's faith — what it means to how he lives." />
      </Head>
      <div className={styles.page}>
        <h1>Faith</h1>
        <p className={styles.lead}>[TODO: Eric to write framing statement — what faith means to how I live.]</p>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Community</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Church</span>
              <span className={styles.linkValue}>
                <a href="https://austin.hmcc.net" target="_blank" rel="noopener noreferrer">
                  HMCC Austin
                </a>
              </span>
            </li>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Roles</span>
              <span className={styles.linkValue}>
                Worship (keys) · Small group leadership for working adults
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
            <Link href="/archive?topic=faith">Writing on faith →</Link>
            <Link href="/studio">Studio →</Link>
          </nav>
        </div>
      </div>
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}
