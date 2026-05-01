import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle, base_url } from '../../components/layout'
import JsonLd from '../../components/JsonLd'
import { getSortedExperiencesData } from '../../lib/experiences'
import { useDarkMode } from '../_app'
import styles from '../../styles/domain.module.css'

const WORK_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: 'Work — Eric Lee',
  url: `${base_url}/work`,
  description: 'Developer advocacy, software engineering background, and career history.',
  mainEntity: {
    '@type': 'Person',
    name: 'Eric Lee',
    jobTitle: 'Developer Advocate',
    worksFor: { '@type': 'Organization', name: 'Global Payments' },
  },
}

function formatPeriod(start, end, current) {
  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return current ? `${fmt(start)} – Present` : `${fmt(start)} – ${fmt(end)}`
}

export async function getStaticProps() {
  const experiences = getSortedExperiencesData()
  return { props: { experiences } }
}

function ExpItem({ exp, styles }) {
  return (
    <li className={styles.expItem}>
      <Image
        src={exp.logo_url}
        alt={exp.company}
        width={44}
        height={44}
        className={styles.expLogo}
      />
      <div className={styles.expMeta}>
        <p className={styles.expRole}>{exp.job_title}</p>
        <p className={styles.expCompany}>
          <a href={exp.company_url} target="_blank" rel="noopener noreferrer">
            {exp.company}
          </a>
          {exp.location ? ` · ${exp.location}` : ''}
        </p>
        <p className={styles.expPeriod}>{formatPeriod(exp.start_date, exp.end_date, exp.current)}</p>
        {exp.bullets && exp.bullets.length > 0 && (
          <ul className={styles.expBullets}>
            {exp.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
      </div>
    </li>
  )
}

export default function Work({ experiences }) {
  const { toggleDarkMode } = useDarkMode()
  const [avatarPop, setAvatarPop] = useState(false)
  const currentExp = experiences.filter((e) => e.current)
  const previousExp = experiences.filter((e) => !e.current)

  function handleAvatarClick() {
    setAvatarPop(true)
    setTimeout(() => setAvatarPop(false), 300)
    toggleDarkMode()
  }

  return (
    <Layout>
      <Head>
        <title>{`Work | ${siteTitle}`}</title>
        <meta name="description" content="Eric Lee's work in developer advocacy, software engineering, and technical community building." />
        <meta property="og:title" content={`Work | ${siteTitle}`} />
        <meta property="og:description" content="Developer Advocate @ Global Payments. Software engineering background. Austin, TX." />
        <JsonLd data={WORK_SCHEMA} />
      </Head>
      {/* Page: /work | Person: Eric Lee | Topic: Professional background, developer advocacy, software engineering */}
      <div className={styles.page}>
        <div className={styles.domainHeader}>
          <div
            className={`${styles.domainProfile}${avatarPop ? ' ' + styles.domainProfilePop : ''}`}
            onClick={handleAvatarClick}
            role="button"
            aria-label="Toggle dark mode"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleAvatarClick()}
          >
            <Image
              src="/images/profile/work-profile.jpg"
              alt="Eric Lee"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <h1>Work</h1>
        </div>
        <p className={styles.lead}>I work at the intersection of software and community — helping developers understand tools, build integrations, and ship. As a Developer Advocate @ Global Payments, that means getting close to the SDKs, writing samples and guides, and showing up where developers are. I&apos;m interested in how AI is changing that work: how it accelerates integration, reshapes what documentation looks like, and shifts what &ldquo;enablement&rdquo; actually means.</p>

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Content</p>
          <ul className={styles.linkList}>
            <li className={styles.linkItem}>
              <span className={styles.linkLabel}>Talk</span>
              <span className={styles.linkValue}>
                <a href="https://shane.logsdon.io/speaking/strategic-insights/from-shopping-carts-to-custom-builds/" target="_blank" rel="noopener noreferrer">
                  From Shopping Carts to Custom Builds
                </a>
                {' '}· Strategic Insights, Global Payments
              </span>
            </li>
          </ul>
        </section>

        {currentExp.length > 0 && (
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Current Experience</p>
            <ul className={styles.expList}>
              {currentExp.map((exp) => <ExpItem key={exp.id} exp={exp} styles={styles} />)}
            </ul>
          </section>
        )}

        {previousExp.length > 0 && (
          <section className={styles.section}>
            <p className={styles.sectionLabel}>Past Experience</p>
            <ul className={styles.expList}>
              {previousExp.map((exp) => <ExpItem key={exp.id} exp={exp} styles={styles} />)}
            </ul>
          </section>
        )}

        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Elsewhere in this site</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/cards">Cards →</Link>
            <Link href="/studio">Studio →</Link>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
