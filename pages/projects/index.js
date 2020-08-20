import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedProjectsData } from '../../lib/projects'
import Date from '../../components/date'

export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData()
    return {
        props: {
            allProjectsData
        }
    }
}

export default function Project({ allProjectsData }) {
    return (
        <Layout project>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Projects</h2>
                <p>I am obsessed with <b>writing</b>, <b>entrepreneurship</b>, and <b>coding</b>. I am also interested in marketing, branding, and UX.</p>
                <ul className={utilStyles.list}>
                    {allProjectsData.map(({ id, start_date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/projects/[id]" as={`/projects/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={start_date} />
                            </small>
                        </li>
                    ))}
                </ul>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}