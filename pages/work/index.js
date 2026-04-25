import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import ExploreFooter from '../../components/ExploreFooter'
import { getSortedExperiencesData } from '../../lib/experiences'
import { getSortedPostsData } from '../../lib/posts'
import styles from '../../styles/domain.module.css'

function formatPeriod(start, end, current) {
  const fmt = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return current ? `${fmt(start)} – Present` : `${fmt(start)} – ${fmt(end)}`
}

export async function getStaticProps() {
  const experiences = getSortedExperiencesData()
  const recentPosts = getSortedPostsData().slice(0, 3)
  return { props: { experiences, recentPosts } }
}

export default function Work({ experiences, recentPosts }) {
  return (
    <Layout>
      <Head>
        <title>{`Work | ${siteTitle}`}</title>
        <meta name="description" content="Eric Lee's work in developer advocacy, software engineering, and technical community building." />
        <meta property="og:title" content={`Work | ${siteTitle}`} />
        <meta property="og:description" content="Developer Advocate at Global Payments. Software engineering background. Austin, TX." />
      </Head>
      {/* Page: /work | Person: Eric Lee | Topic: Professional background, developer advocacy, software engineering */}
      <div className={styles.page}>
        <h1>Work</h1>
        <p className={styles.lead}>I work at the intersection of software and community — helping developers understand tools, build integrations, and ship. As a Developer Advocate at Global Payments, that means getting close to the API, writing samples and guides, and showing up where developers are. I&apos;m interested in how AI is changing that work: how it accelerates integration, reshapes what documentation looks like, and shifts what &ldquo;enablement&rdquo; actually means.</p>

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

        <section className={styles.section}>
          <p className={styles.sectionLabel}>Experience</p>
          <ul className={styles.expList}>
            {experiences.map((exp) => (
              <li key={exp.id} className={styles.expItem}>
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
                </div>
              </li>
            ))}
          </ul>
        </section>

        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Elsewhere in this site</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/cards">Cards →</Link>
            <Link href="/studio">Studio →</Link>
          </nav>
        </div>
      </div>
      <ExploreFooter posts={recentPosts} />
    </Layout>
  )
}
