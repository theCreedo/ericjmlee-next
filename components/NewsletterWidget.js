import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import styles from './NewsletterWidget.module.css'

const HIDDEN_PREFIXES = ['/newsletter', '/about', '/extras', '/archive', '/series', '/topic', '/now', '/projects']

const DOMAINS = [
  { key: 'work',   label: 'WORK' },
  { key: 'cards',  label: 'CARDS' },
  { key: 'faith',  label: 'FAITH' },
  { key: 'studio', label: 'STUDIO' },
]

const DISMISS_KEY = 'nlDismissed'
const DISMISS_DAYS = 30
const TRIGGER_DELAY_MS = 30000
const TRIGGER_SCROLL_PCT = 0.40

function isDismissed() {
  try {
    const ts = localStorage.getItem(DISMISS_KEY)
    if (!ts) return false
    return Date.now() - Number(ts) < DISMISS_DAYS * 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

function setDismissed() {
  try { localStorage.setItem(DISMISS_KEY, String(Date.now())) } catch {}
}

export default function NewsletterWidget() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [closed, setClosed] = useState(false)
  const [email, setEmail] = useState('')
  const [selected, setSelected] = useState(['general'])
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const triggered = useRef(false)

  const shouldShow = !HIDDEN_PREFIXES.some(p => router.pathname.startsWith(p))

  useEffect(() => {
    if (!shouldShow || isDismissed()) return

    function trigger() {
      if (triggered.current) return
      triggered.current = true
      setVisible(true)
    }

    const timer = setTimeout(trigger, TRIGGER_DELAY_MS)

    function handleScroll() {
      const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (pct >= TRIGGER_SCROLL_PCT) trigger()
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [shouldShow])

  function handleClose() {
    setDismissed()
    setClosed(true)
  }

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
      setTimeout(() => setClosed(true), 6000)
    } catch {
      setError('Network error. Try again.')
      setStatus('idle')
    }
  }

  if (!shouldShow || closed) return null

  return (
    <div
      className={`${styles.widget} ${visible ? styles.visible : ''}`}
      role="complementary"
      aria-label="Subscribe to updates"
    >
      <div className={styles.header}>
        <p className={styles.eyebrow}>Updates</p>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Dismiss">✕</button>
      </div>

      {status === 'success' ? (
        <div className={styles.success}>
          <p className={styles.successText}>Check your inbox to confirm.</p>
          <p className={styles.successSub}>Nothing goes out until you do.</p>
        </div>
      ) : (
        <>
          <p className={styles.heading}>Follow what I&apos;m making.</p>

          <div className={styles.domainsLabel}>Topics</div>
          <div className={styles.domainChips}>
            <button
              type="button"
              className={`${styles.chip} ${selected.includes('general') ? styles.chipActive : ''}`}
              onClick={() => toggleDomain('general')}
            >
              All
            </button>
            {DOMAINS.map(d => (
              <button
                key={d.key}
                type="button"
                className={`${styles.chip} ${selected.includes(d.key) ? styles.chipActive : ''}`}
                onClick={() => toggleDomain(d.key)}
              >
                {d.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className={styles.emailRow}>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={styles.emailInput}
                disabled={status === 'loading'}
              />
              <button
                type="submit"
                disabled={status === 'loading' || !email}
                className={styles.submitBtn}
              >
                {status === 'loading' ? '...' : 'Go'}
              </button>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
          </form>

          <p className={styles.hint}>Confirm via email. No spam.</p>
        </>
      )}
    </div>
  )
}
