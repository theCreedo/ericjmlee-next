import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import { getSortedProjectsData } from '../../lib/projects'
import styles from '../../styles/domain.module.css'
import projectStyles from '../../styles/projects.module.css'

export async function getStaticProps() {
  const allProjectsData = getSortedProjectsData()
  return { props: { allProjectsData } }
}

function ProjectCard({ id, title, start_date, one_liner, tech, header_link, image_link, image_alt_text }) {
  const year = start_date ? new Date(start_date).getFullYear() : null
  return (
    <li className={projectStyles.projectItem}>
      {image_link && (
        <div className={projectStyles.projectImage}>
          {header_link ? (
            <a href={header_link} target="_blank" rel="noopener noreferrer">
              <Image
                src={image_link}
                alt={image_alt_text || title}
                fill
                style={{ objectFit: 'cover' }}
              />
            </a>
          ) : (
            <Image
              src={image_link}
              alt={image_alt_text || title}
              fill
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      )}
      <div className={projectStyles.projectMeta}>
        <p className={projectStyles.projectTitle}>
          {header_link ? (
            <a href={header_link} target="_blank" rel="noopener noreferrer">{title}</a>
          ) : title}
        </p>
        {one_liner && <p className={projectStyles.projectOneLiner}>{one_liner}</p>}
        <div className={projectStyles.projectFooter}>
          {tech && <span className={projectStyles.projectTech}>{tech}</span>}
          {year && <span className={projectStyles.projectYear}>{year}</span>}
        </div>
      </div>
    </li>
  )
}

export default function Projects({ allProjectsData }) {
  return (
    <Layout canonicalPath="/projects">
      <Head>
        <title>{`Projects | ${siteTitle}`}</title>
        <meta name="description" content="Hackathon projects and early work by Eric Lee." />
        <meta property="og:title" content={`Projects | ${siteTitle}`} />
      </Head>
      <div className={styles.page}>
        <h1>Projects</h1>
        <p className={styles.lead}>Hackathons and early builds — mostly from college.</p>
        <section className={styles.section}>
          <p className={styles.sectionLabel}>Early Work</p>
          <ul className={projectStyles.projectList}>
            {allProjectsData.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </ul>
        </section>
        <div className={styles.crossLinks}>
          <p className={styles.sectionLabel}>Elsewhere in this site</p>
          <nav className={styles.crossLinkNav}>
            <Link href="/studio">Studio →</Link>
            <Link href="/work">Work →</Link>
          </nav>
        </div>
      </div>
    </Layout>
  )
}
