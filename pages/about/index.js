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
        <meta name="description" content="About Eric Lee — developer advocate, L2 judge, church leader, and writer based in Austin, TX." />
      </Head>
      <div className={styles.page}>
        <h1>About</h1>
        <p className={styles.lead}>
          Raised in Plano 🇺🇸, Taiwanese roots 🇹🇼, Texas all my life. I studied computer science
          at UT Austin ({"'"}19) 🤘 and Austin kept me. I work in developer advocacy —
          currently at Global Payments — judge and play Flesh and Blood TCG, serve at HMCC Austin, and write & tinker on many projects on the side.
        </p>
        <p className={styles.lead}>
          I love to learn, am constantly challenged to grow in my faith, and aspire
          to be real in everything I do.
        </p>
        <p className={styles.lead} style={{ fontSize: '16px', marginTop: 0 }}>
          Reach me at{' '}
          <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          <Link href="/extras">More about me →</Link>
        </p>
      </div>
    </Layout>
  )
}
