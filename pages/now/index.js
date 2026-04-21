import Layout, { siteTitle } from '../../components/layout'
import Head from 'next/head'
import { getNowData } from '../../lib/now'
import utilStyles from '../../styles/utils.module.css'

export default function Now({ nowData }) {
  return (
    <Layout>
      <Head>
        <title>Now | {siteTitle}</title>
      </Head>
      <h1 className={utilStyles.headingXl}>Now</h1>
      <p className={utilStyles.lightText}>Last updated: {nowData.updatedAt}</p>
      <div dangerouslySetInnerHTML={{ __html: nowData.contentHtml }} />
    </Layout>
  )
}

export async function getStaticProps() {
  const nowData = await getNowData()
  return { props: { nowData } }
}
