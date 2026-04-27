import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import styles from '../../styles/domain.module.css'

export default function Newsletter() {
  return (
    <Layout canonicalPath="/newsletter">
      <Head>
        <title>{`Newsletter | ${siteTitle}`}</title>
        <meta name="description" content="Savvy Saturdays — archived newsletter by Eric Lee, 2020–2021." />
      </Head>
      <div className={styles.page}>
        <h1>Savvy Saturdays — Archived</h1>
        <p className={styles.lead}>Savvy Saturdays ran from 2020–2021. New issues are no longer published.</p>
        <p>Past issues are available on <a href="https://ericlee.substack.com/archive" target="_blank" rel="noopener noreferrer">Substack</a>.</p>
        <p style={{ marginTop: 'var(--space-6, 24px)' }}>
          <Link href="/">← Back to Home</Link>
        </p>
      </div>
    </Layout>
  )
}
