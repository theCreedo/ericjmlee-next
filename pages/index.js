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
          <li>Love brand & content strategy 🎧</li>
          <li>Big heart for entrepreneurship 🚀</li>
          <li>Passionate about mentorship and equipping others 🛠</li>
        </ul>
        <p>In my free time, I focus on:</p>
        <ul>
          <li>✝️ Serving in my church, <a href="https://austin.hmcc.net/">HMCC Austin</a>.</li>
          <li>🧑‍🤝‍🧑 Meeting cool ambitious people on <a href="https://lunchclub.com/?invite_code=ericl39">Lunchclub</a>.</li>
          <li>😅 Procrastinating on my <a href="https://ericlee.substack.com/">newsletter</a> since 11/27/21.</li>
          <li>🐊 Playing video games (King K. Rool Main on Smash).</li>
          <li>🤔 Writing faith thoughts and other ponderings on <a href='https://thecreedo.medium.com'>Medium</a>.</li>
          <li>🍿 Watching Netflix (recs: <a href="https://www.imdb.com/title/tt10231312/">Inside Job</a> and <a href="https://www.imdb.com/title/tt9561862/">Love, Death, & Robots</a>).</li>
          <li>🏃‍♂️ Exercising & listening to Audible books (tracked on <Link href="https://www.goodreads.com/user/show/127464751-eric-lee">GoodReads</Link>).</li>
          <li>🎲 Playing and growing the community in <a href="https://fabtcg.com/">Flesh and Blood</a>. (<a href="https://judge.fabtcg.com/judges/ericjmlee1/">official L1 Judge</a>).</li>
          <li>👷‍♂️ Designing & building <a href="https://github.com/theCreedo/ericjmlee-next/issues">new features</a> for this website when in the coding zone.</li>
        </ul>
        <NewsletterForm />
      </section>
    </Layout >
  )
}