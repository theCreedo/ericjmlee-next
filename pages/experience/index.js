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
                <title>Experience | {siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Experience</h2>
                <ul className={utilStyles.list}>
                    {allExperiencesData.map(({ id, title, start_date, end_date, location, job_title, company_url, logo_url, current }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <h1 className={utilStyles.headingMd}><a href={company_url}>{title}</a></h1>
                            <small className={utilStyles.lightText}>
                                <p>{current ? <><b>Current:</b></> : <></>} {job_title} @ {location}</p>
                            </small>
                        </li>
                    ))}
                </ul>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}