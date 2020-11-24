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
        <p>Living out my faith, exemplifying leadership, and hustling to be better, I aspire to be 1% better every day by creating & impacting wherever I can.</p>
        <p>Currently I work in ATX as a Software Engineer @ <a href='https://www.retailmenot.com/'>RetailMeNot</a>, working on full stack web development.</p>
        <p>In my free time, I focus on:</p>
        <ul>
          <li>Working on my <a href="https://ericlee.substack.com/">weekly newsletter</a> on my learnings, faith, leadership, & productivity.</li>
          <li>Writing thoughts out on faith, struggles, & life through my <a href='/blog'>blog</a>.</li>
          <li>Serving in my church, <a href="https://austin.hmcc.net/">HMCC Austin</a>, as a leader.</li>
          <li>Designing and building <a href="https://github.com/theCreedo/nextjs-blog/issues">new features</a> for this website.</li>
          <li>Collaborating with college students and entrepreneurs on their creative ventures (YouTube, Instagram, startups).</li>
        </ul>
        {/* TODO: add latest blog post */}
        <NewsletterForm />
      </section>
    </Layout >
  )
}