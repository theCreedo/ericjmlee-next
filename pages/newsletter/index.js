import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Layout, { siteTitle } from '../../components/layout'
import styles from '../../styles/domain.module.css'
import formStyles from '../../styles/newsletter.module.css'

const DOMAINS = [
  { key: 'work',   label: 'WORK',   desc: 'Developer advocacy, software, AI enablement.' },
  { key: 'cards',  label: 'CARDS',  desc: 'Flesh and Blood: judging, community, the card game world.' },
  { key: 'faith',  label: 'FAITH',  desc: 'What faith looks like in practice — community, service, meaning.' },
  { key: 'studio', label: 'STUDIO', desc: 'Writing, early projects, things I made.' },
]

function SubscribeForm({ preselect }) {
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState(preselect ? [preselect] : ['general'])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  function toggleDomain(key) {
    if (key === 'general') {
      setSelected(['general'])
      return
    }
    setSelected(prev => {
      const without = prev.filter(d => d !== 'general')
      const next = without.includes(key) ? without.filter(d => d !== key) : [...without, key]
      return next.length === 0 ? ['general'] : next
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    setError('')
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), domains: selected }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Something went wrong.')
        setStatus('idle')
        return
      }
      setStatus('success')
    } catch {
      setError('Network error. Try again.')
      setStatus('idle')
    }
  }

  if (status === 'success') {
    return (
      <div className={formStyles.successBlock}>
        <p className={formStyles.successHeading}>Check your inbox.</p>
        <p className={formStyles.successBody}>
          I sent a confirmation link to <strong>{email}</strong>. Click it to finish — nothing goes out until you do.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={formStyles.form}>
      <div className={formStyles.domainsLabel}>What do you want to hear about?</div>
      <div className={formStyles.chips}>
        <button
          type="button"
          className={`${formStyles.chip} ${selected.includes('general') ? formStyles.chipActive : ''}`}
          onClick={() => toggleDomain('general')}
        >
          Everything
        </button>
        {DOMAINS.map(d => (
          <button
            key={d.key}
            type="button"
            className={`${formStyles.chip} ${selected.includes(d.key) ? formStyles.chipActive : ''}`}
            onClick={() => toggleDomain(d.key)}
          >
            {d.label}
          </button>
        ))}
      </div>
      <div className={formStyles.emailRow}>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={formStyles.emailInput}
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={formStyles.submitBtn}
        >
          {status === 'loading' ? 'Sending...' : 'Subscribe'}
        </button>
      </div>
      {error && <p className={formStyles.errorText}>{error}</p>}
      <p className={formStyles.hint}>One email per update. No schedule. No spam.</p>
    </form>
  )
}

export default function Newsletter() {
  const router = useRouter()
  const { confirmed, unsubscribed, error, domain } = router.query

  return (
    <Layout canonicalPath="/newsletter">
      <Head>
        <title>{`Updates | ${siteTitle}`}</title>
        <meta name="description" content="Subscribe to updates from Eric Lee — developer advocacy, FAB judging, faith, and writing." />
        <meta property="og:title" content={`Updates | ${siteTitle}`} />
        <meta property="og:description" content="One place for everything Eric is making. Choose what you want to hear about." />
      </Head>

      <div className={styles.page}>
        <h1>Updates</h1>
        <p className={styles.lead}>
          One place to follow what I&apos;m making — writing, judging, building. Choose the areas that matter to you.
        </p>

        {confirmed === '1' && (
          <div className={formStyles.banner} data-type="success">
            You&apos;re confirmed. You&apos;ll hear from me when something ships.
          </div>
        )}
        {unsubscribed === '1' && (
          <div className={formStyles.banner} data-type="neutral">
            Unsubscribed. You won&apos;t hear from me again.
          </div>
        )}
        {error === 'invalid' && (
          <div className={formStyles.banner} data-type="error">
            That link has already been used or expired.{' '}
            <Link href="/newsletter">Subscribe again →</Link>
          </div>
        )}
        {error === 'server' && (
          <div className={formStyles.banner} data-type="error">
            Something went wrong. Try again or email me directly.
          </div>
        )}

        <section className={formStyles.formSection}>
          <SubscribeForm preselect={domain} />
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>What each area covers</p>
          <ul className={formStyles.domainList}>
            {DOMAINS.map(d => (
              <li key={d.key} className={formStyles.domainItem}>
                <span className={formStyles.domainChip}>{d.label}</span>
                <span className={formStyles.domainDesc}>{d.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Past newsletters</p>
          <p style={{ fontFamily: 'var(--f-body), Georgia, serif', fontSize: '15px', color: 'var(--text)', margin: 0 }}>
            Savvy Saturdays ran 2020–2021.{' '}
            <a href="https://ericlee.substack.com/archive" target="_blank" rel="noopener noreferrer">
              Browse the archive on Substack →
            </a>
          </p>
        </section>

        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Explore</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/archive">Archive →</Link>
            <Link href="/work">Work →</Link>
            <Link href="/cards">Cards →</Link>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
