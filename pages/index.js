import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import NewsletterForm from '../components/newsletter'

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
        <blockquote><b><i>Learning is my passion. Empowering is my mission.</i></b></blockquote>
        <p>Currently I work in ATX as a Software Engineer @ <a href='https://www.retailmenot.com/'>RetailMeNot</a>, working on full stack web development.</p>
        <p>In my free time, I focus on:</p>
        <ul>
          <li>Serving in my church, <a href="https://austin.hmcc.net/">HMCC Austin</a>, as a leader.</li>
          <li>Designing and building new features for this website.</li>
          <li>Writing thoughts out on faith, struggles, & life.</li>
          <li>Working on <a href="https://ericlee.substack.com/">Savvy Saturdays</a>, a weekly newsletter on faith, entrepreneurship, productivity, & inspiration.</li>
          <li>Consulting & mentoring startups & creative ventures like YouTube, Etsy, & Instagram.</li>
        </ul>
        {/* TODO: add latest blog post */}
        <NewsletterForm />
      </section>
    </Layout >
  )
}