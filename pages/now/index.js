import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle, base_url } from '../../components/layout'
import JsonLd from '../../components/JsonLd'
import styles from '../../styles/domain.module.css'

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'content', 'now.json')
  const nowData = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  return { props: { nowData } }
}

const SECTIONS = [
  { key: 'work',  label: 'Work',  href: '/work' },
  { key: 'faith', label: 'Faith', href: '/faith' },
  { key: 'cards', label: 'Cards', href: '/cards' },
]

const NOW_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Now',
  url: `${base_url}/now`,
  description: 'What Eric Lee is focused on right now across work, faith, and cards.',
}

function formatUpdated(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function Now({ nowData }) {
  return (
    <Layout>
      <Head>
        <title>{`Now | ${siteTitle}`}</title>
        <meta name="description" content="What Eric Lee is focused on right now — work, faith, and cards." />
        <link rel="canonical" href={`${base_url}/now`} />
        <meta property="og:title" content={`Now | ${siteTitle}`} />
        <meta property="og:url" content={`${base_url}/now`} />
        <meta property="og:type" content="website" />
        <JsonLd data={NOW_SCHEMA} />
      </Head>
      <div className={styles.page}>
        <h1>Now</h1>
        <p className={styles.lead}>What I&apos;m focused on across the things I do. Inspired by <a href="https://nownownow.com/about" target="_blank" rel="noopener noreferrer">nownownow.com</a>.</p>

        {SECTIONS.map(({ key, label, href }) => {
          const items = nowData[key] || []
          if (items.length === 0) return null
          return (
            <section key={key} className={styles.section}>
              <p className={styles.sectionLabel}>
                <Link href={href}>{label}</Link>
              </p>
              <ul className={styles.linkList}>
                {items.map(({ label: itemLabel, value }) => (
                  <li key={itemLabel} className={styles.linkItem}>
                    <span className={styles.linkLabel}>{itemLabel}</span>
                    <span className={styles.linkValue}>{value}</span>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}

        {nowData.updated_at && (
          <p style={{ fontFamily: 'var(--f-ui)', fontSize: '11px', color: 'var(--faint)', marginTop: 'var(--space-12, 48px)' }}>
            Last updated: {formatUpdated(nowData.updated_at)}
          </p>
        )}
      </div>
    </Layout>
  )
}
