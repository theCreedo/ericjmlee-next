import Layout, { siteTitle } from '../../components/layout'
import Head from 'next/head'
import { getNowData } from '../../lib/now'
import utilStyles from '../../styles/utils.module.css'
import styles from '../../styles/domain.module.css'

export default function Now({ nowData }) {
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
    </Layout>
  )
}

export async function getStaticProps() {
  const nowData = await getNowData()
  return { props: { nowData } }
}
