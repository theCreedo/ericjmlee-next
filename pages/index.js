import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.divContainer}>
        <p>SWE @ <a href='https://www.retailmenot.com/'>RetailMeNot</a> | entrepreneur, mentor, coder, and blogger</p>
        <p><b><i>Learning is my passion. Empowering is my mission.</i></b></p>
      </section>
    </Layout >
  )
}