import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import styles from '../../styles/domain.module.css'

export default function About() {
  const email = 'eric' + '.lee1@' + 'e-hps.com'

  return (
    <Layout canonicalPath="/about">
      <Head>
        <title>{`About | ${siteTitle}`}</title>
        <meta name="description" content="About Eric Lee — developer advocate, FAB L2 judge, TCG seller, church leader, and writer based in Austin, TX." />
      </Head>
      <div className={styles.page}>
        <h1>About</h1>
        <p className={styles.lead}>
          Raised in Plano 🇺🇸, Taiwanese roots 🇹🇼, Texas all my life. I studied computer science
          at <a href="https://www.utexas.edu" target="_blank" rel="noopener noreferrer">UT Austin</a> ({"'"}19) 🤘 and Austin kept me. I work in developer advocacy —
          currently at <a href="https://www.globalpayments.com" target="_blank" rel="noopener noreferrer">Global Payments</a> — judge and play <a href="https://fabtcg.com" target="_blank" rel="noopener noreferrer">Flesh and Blood TCG</a>, serve at <a href="https://atx.hmccglobal.org/" target="_blank" rel="noopener noreferrer">HMCC Austin</a>, and write &amp; tinker on many projects on the side.
        </p>
        <p className={styles.lead}>
          I love to learn, am constantly challenged to grow in my faith, and aspire
          to be real in everything I do.
        </p>
        <p className={styles.lead} style={{ fontSize: '16px', marginTop: 0 }}>
          Reach me at{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Elsewhere in this site</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/extras">Extras →</Link>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
