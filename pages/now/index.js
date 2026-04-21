import Layout, { siteTitle } from '../../components/layout'
import Head from 'next/head'
import ExploreFooter from '../../components/ExploreFooter'
import { getNowData } from '../../lib/now'
import { getSortedPostsData } from '../../lib/posts'
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/domain.module.css'

export default function Now({ nowData, recentPosts }) {
  return (
    <Layout>
      <Head>
        <title>{`Now | ${siteTitle}`}</title>
        <meta name="description" content="What Eric Lee is working on and thinking about right now." />
      </Head>
      <div className={styles.page}>
        <h1>Now</h1>
        <p className={utilStyles.lightText} style={{ fontFamily: 'var(--f-ui)', fontSize: '11px', marginTop: 0 }}>
          Last updated: {nowData.updatedAt}
        </p>
        <div dangerouslySetInnerHTML={{ __html: nowData.contentHtml }} />
      </div>
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}

export async function getStaticProps() {
  const nowData = await getNowData()
  const recentPosts = getSortedPostsData().slice(0, 3)
  return { props: { nowData, recentPosts } }
}
