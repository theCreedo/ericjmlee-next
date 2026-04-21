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
          [TODO: Eric to write — Plano origin, UT Austin CS 2019, Austin, four domains.]
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
