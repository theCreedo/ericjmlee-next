import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'
import NewsletterForm from '../components/newsletter'
import Link from 'next/link'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Home({ allPostsData }) {
  const dayInMs = 86400000
  const getFrom30000Days = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / dayInMs)
  const daysAlive = getFrom30000Days('1996-12-21')
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.divContainer}>
        <br></br>
        <p>Welcome to the front-end part of my life!</p>
        <p>Currently I work in ATX as a Software Engineer @ <a href='https://www.retailmenot.com/'>RetailMeNot</a>.</p>
        <p>In my free time, I focus on:</p>
        <ul>
          <li>Exercising & listening to Audible books (tracked on <Link href="https://www.goodreads.com/user/show/127464751-eric-lee">GoodReads</Link>).</li>
          <li>Working on my <a href="https://ericlee.substack.com/">newsletter</a>, sharing practical learnings & resources weekly.</li>
          <li>Writing faith thoughts and other ponderings on <a href='https://thecreedo.medium.com'>Medium</a>.</li>
          <li>Serving in my church, <a href="https://austin.hmcc.net/">HMCC Austin</a>.</li>
          <li>Designing & building <a href="https://github.com/theCreedo/ericjmlee-next/issues">new features</a> for this website when in the coding zone.</li>
        </ul>
        <NewsletterForm />
      </section>
    </Layout >
  )
}