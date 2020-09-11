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
        <br></br>
        <p>Currently I work in ATX as a Software Engineer @ <a href='https://www.retailmenot.com/'>RetailMeNot</a>, working on full stack web development.</p>
        <p>In my free time, I focus on:</p>
        <ul>
          <li>Serving in my church, <a href="https://austin.hmcc.net/">HMCC Austin</a>, as a leader.</li>
          <li>Working on <a href="https://ericlee.substack.com/">Savvy Saturdays</a>, a weekly newsletter bringing the best resources on faith, entrepreneurship, & productivity to people's mailbox.</li>
          <li>Consulting & mentorship for startups & creative ventures like YouTube, Etsy, & Instagram.</li>
        </ul>
        <p><b><i>Learning is my passion. Empowering is my mission.</i></b></p>
      </section>
    </Layout >
  )
}