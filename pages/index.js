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
        
        {/* <img className={utilStyles.gridImage} src="/images/profile/pose-profile.jpg" alt="Profile of Eric posing."></img> */}

        <p>Things about me:</p>
        <ul>
          <li>Taiwanese 🇹🇼</li>
          <li>ATX tech guy 🧑‍💻</li>
          <li>Faith-driven leader ⛪️</li>
          <li>Love product & content strategy 🎧</li>
          <li>Big heart for entrepreneurship and hustle 🚀</li>
          <li>Passionate about mentorship and equipping others 🛠</li>
        </ul>
        <p>In my free time, I focus on:</p>
        <ul>
          <li>Co-leading Product & Marketing for <a href="https://fiesta.community/">FIESTA</a>, an Austin tech community.</li>
          <li>Helping with content strategy for <a href="https://idserve.us/">Indigitous Serve</a>.</li>
          <li>Meeting cool ambitious people on <a href="https://lunchclub.com/?invite_code=ericl39">Lunchclub.ai</a>.</li>
          <li>Playing a trading card game, <a href="https://fabtcg.com/">Flesh and Blood</a>.</li>
          <li>Playing video games (recently <a href="https://www.megacrit.com/">Slay the Spire</a>).</li>
          <li>Serving in my church, <a href="https://austin.hmcc.net/">HMCC Austin</a>.</li>
          <li>Writing faith thoughts and other ponderings on <a href='https://thecreedo.medium.com'>Medium</a>.</li>
          <li>Exercising & listening to Audible books (tracked on <Link href="https://www.goodreads.com/user/show/127464751-eric-lee">GoodReads</Link>).</li>
          <li>Working on my <a href="https://ericlee.substack.com/">newsletter</a>, sharing practical learnings & resources weekly.</li>
          <li>Designing & building <a href="https://github.com/theCreedo/ericjmlee-next/issues">new features</a> for this website when in the coding zone.</li>
        </ul>
        <NewsletterForm />
      </section>
    </Layout >
  )
}