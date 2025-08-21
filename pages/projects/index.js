import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedProjectsData } from '../../lib/projects'
import ProjectItem from '../../components/project'

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
                <title>{`Projects | ${siteTitle}`}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <br />
                <ul className={utilStyles.list}>
                    {allProjectsData.map((projectData) => (
                        <ProjectItem key={projectData.id} {...projectData} />
                    ))}
                </ul>
                <Link href='/'>← Back to Home</Link>
            </section>
        </Layout >
    )
}