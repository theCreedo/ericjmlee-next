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
          <li>Creative at heart 🎨</li>
          <li>Faith-driven leader ⛪️</li>
          <li>Passionate about community 👥</li>
          <li>Love brand & content strategy 🎧</li>
          <li>Committed to mentorship and equipping others 🛠</li>
        </ul>
        <p>In my free time, I focus on:</p>
        <ul>
          <li>✝️ Serving in my church, <a href="https://austin.hmcc.net/">HMCC Austin</a>.</li>
          <li>😅 Procrastinating on my <a href="https://ericlee.substack.com/">newsletter</a> since 11/27/21.</li>
          <li>🤔 Writing faith thoughts & other ponderings on <a href='https://thecreedo.medium.com'>Medium</a>.</li>
          <li>🏃‍♂️ Exercising & listening to Audible books (tracked on <a href="https://www.goodreads.com/user/show/127464751-eric-lee">GoodReads</a>).</li>
          <li>👷‍♂️ Designing & building <a href="https://github.com/theCreedo/ericjmlee-next/issues">new features</a> for this website when in the coding zone.</li>
          <li>🎲 Playing & growing the TCG community in <a href="https://fabtcg.com/">Flesh and Blood</a>. (<a href="https://judge.fabtcg.com/judges/ericjmlee1/">official L2 Judge</a>).</li>
          <li>🍿 Watching shows & movies (recs: <a href="https://www.imdb.com/title/tt30217403/">Dandadan</a>, <a href="https://www.imdb.com/title/tt0903747/">Breaking Bad</a>, & <a href="https://www.imdb.com/title/tt0068646/">The Godfather</a>).</li>
          <li>🐊 Playing video games (King K. Rool Main on Smash - recs: <a href='https://www.omori-game.com/en'>Omori</a>, <a href='https://undertale.com/'>Undertale</a>/<a href='https://deltarune.com/'>Deltarune</a>, & <a href='https://www.inscryption.com'>Inscryption</a>).</li>
        </ul>
        <p>Verses & Quotes:</p>
        <ul>
          <li>"And he said to him, "You shall love the Lord your God with all your heart and with all your soul and with all your mind. This is the great and first commandment. And a second is like it: You shall love your neighbor as yourself."<br/>- Matthew 22:37-39 ESV</li>
          <br/>
          <li>"For where your treasure is, there your heart will be also."<br/>- Matthew 6:21</li>
          <br/>
          <li>"There is only one way to eat an elephant: one bite at a time"<br/>- Desmond Tutu</li>
          <br/>
          <li>"I'm gonna make him an offer he can't refuse"<br/>- The Godfather</li>
          <br/>
          <li>"Murder your darlings"<br/>- Anonymous</li>
        </ul>
        
        <NewsletterForm />
      </section>
    </Layout >
  )
}