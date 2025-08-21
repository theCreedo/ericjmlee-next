import Head from 'next/head'
import Link from "next/link"
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedExperiencesData } from '../../lib/experiences'
import ExperienceItem from '../../components/experience'


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
                <title>{`Experience | ${siteTitle}`}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <br />
                <ul className={utilStyles.list}>
                    {allExperiencesData.map((experienceData) => (
                        <ExperienceItem key={experienceData.id} {...experienceData} />
                    ))}
                </ul>
                {/* TODO ADD SKILLS */}
                {/* <p>Currently a full stack web developer in React that gets dirty in PHP & Java at times.</p>
                <p>Worked in Ruby on Rails, Scala, Flask, & Java.</p> */}
                <Link href='/'>← Back to Home</Link>
            </section>
        </Layout >
    )
}