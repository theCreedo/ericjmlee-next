import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle, base_url } from '../../components/layout'
import ExploreFooter from '../../components/ExploreFooter'
import JsonLd from '../../components/JsonLd'
import { getSortedPostsData } from '../../lib/posts'
import styles from '../../styles/domain.module.css'

export async function getStaticProps() {
  const recentPosts = getSortedPostsData().slice(0, 3)
  return { props: { recentPosts } }
}

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

export default function Studio({ recentPosts }) {
  return (
    <Layout>
      <Head>
        <title>{`Studio | ${siteTitle}`}</title>
        <meta name="description" content="Eric Lee's project shelf — writing, early projects, and archived work." />
        <meta property="og:title" content={`Studio | ${siteTitle}`} />
        <meta property="og:description" content="Eric Lee's project shelf — writing, early projects, and archived work." />
        <JsonLd data={STUDIO_SCHEMA} />
      </Head>
      {/* Page: /studio | Person: Eric Lee | Topic: Creative output, writing, projects */}
      <div className={styles.page}>
        <h1>Studio</h1>
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
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Evergreen</span>
              <span className={styles.linkValue}>
                <Link href="/writing">Writing worth returning to →</Link>
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
                <a href="https://savvysaturdays.substack.com" target="_blank" rel="noopener noreferrer">
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
              <span className={styles.linkLabel}>WordPress</span>
              <span className={styles.linkValue}>
                <a href="https://ericjmlee.wordpress.com" target="_blank" rel="noopener noreferrer">
                  ericjmlee.wordpress.com
                </a>
              </span>
            </li>
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
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}
