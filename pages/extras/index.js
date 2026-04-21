import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import styles from './extras.module.css'

const PERSONALITY = [
  { label: 'MBTI', value: 'ENFP' },
  { label: 'Enneagram', value: '2w3' },
  { label: 'Clifton Strengths', value: 'Ideation · Connectedness · Futuristic · Empathy · Learner' },
  { label: 'DISC', value: 'I/S' },
  { label: 'APEST', value: 'Prophet · Evangelist' },
]

const HOBBIES = [
  'Bouldering',
  'Running',
  'Worship music (keys)',
  'Video games',
  'Anime',
]

const SITE_HISTORY = [
  { year: 'Origin', url: 'https://origin.ericjmlee.com', label: 'origin.ericjmlee.com' },
  { year: '2021', url: 'https://2021.ericjmlee.com', label: '2021.ericjmlee.com' },
  { year: '2022', url: 'https://2022.ericjmlee.com', label: '2022.ericjmlee.com' },
  { year: '2025', url: 'https://2025.ericjmlee.com', label: '2025.ericjmlee.com' },
  { year: 'Now', url: 'https://ericjmlee.com', label: 'ericjmlee.com' },
]

export default function Extras() {
  return (
    <Layout>
      <Head>
        <title>Extras | {siteTitle}</title>
      </Head>

      <h1 className={utilStyles.headingXl}>Extras</h1>
      <p className={utilStyles.lightText}>The stuff that doesn&apos;t fit neatly anywhere else.</p>

      <section className={styles.section}>
        <h2 className={utilStyles.headingLg}>Personality</h2>
        <dl className={styles.dl}>
          {PERSONALITY.map(({ label, value }) => (
            <div key={label} className={styles.dlRow}>
              <dt className={styles.dt}>{label}</dt>
              <dd className={styles.dd}>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={styles.section}>
        <h2 className={utilStyles.headingLg}>Hobbies</h2>
        <ul className={styles.plainList}>
          {HOBBIES.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={utilStyles.headingLg}>Recommendations</h2>
        <p className={utilStyles.lightText}>Eric to fill in — shows, movies, games, books.</p>
      </section>

      <section className={styles.section}>
        <h2 className={utilStyles.headingLg}>Quotes &amp; Verses</h2>
        <p className={utilStyles.lightText}>Eric to fill in — favorite quotes and scripture.</p>
      </section>

      <section className={styles.section}>
        <h2 className={utilStyles.headingLg}>Site History</h2>
        <p>This site has gone through a few eras.</p>
        <ul className={styles.historyList}>
          {SITE_HISTORY.map(({ year, url, label }) => (
            <li key={year}>
              <span className={styles.historyYear}>{year}</span>
              <a href={url} target="_blank" rel="noopener noreferrer">{label}</a>
            </li>
          ))}
        </ul>
      </section>

      <p className={styles.backLink}>
        <Link href="/about">← Back to About</Link>
      </p>
    </Layout>
  )
}
