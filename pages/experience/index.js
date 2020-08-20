import Head from 'next/head'
import Link from "next/link"
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedExperiencesData } from '../../lib/experiences'
import Date from '../../components/date'

export async function getStaticProps() {
    const allExperiencesData = getSortedExperiencesData()
    return {
        props: {
            allExperiencesData
        }
    }
}

export default function Experience({ allExperiencesData }) {
    return (
        <Layout experience>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Experience</h2>
                <ul className={utilStyles.list}>
                    {allExperiencesData.map(({ id, start_date, end_date, location, job_title, link, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <h1 className={utilStyles.headingMd}><a href={link}>{title}</a> @ {location}</h1>
                            <small className={utilStyles.lightText}>
                                <p>{job_title}</p>
                                <Date dateString={start_date} /> to <Date dateString={end_date} />
                            </small>
                        </li>
                    ))}
                </ul>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}