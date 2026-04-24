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

export default function About({ recentPosts }) {
  const email = 'eric' + '.lee1@' + 'e-hps.com'

  return (
    <Layout>
      <Head>
        <title>{`About | ${siteTitle}`}</title>
        <meta name="description" content="About Eric Lee — developer advocate, L2 judge, church leader, and writer based in Austin, TX." />
      </Head>
      <div className={styles.page}>
        <h1>About</h1>
        <p className={styles.lead}>
          I grew up in Plano, TX and studied computer science at UT Austin, graduating in 2019.
          Austin kept me. I work in developer advocacy — currently at Global Payments — play and judge Flesh
          and Blood TCG tournaments, play keys and lead a small group at HMCC Austin,
          and write. Welcome to the front end part of my life.
        </p>
        <p className={styles.lead} style={{ fontSize: '16px', marginTop: 0 }}>
          Reach me at{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          <Link href="/extras">More about me →</Link>
        </p>
      </div>
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}
