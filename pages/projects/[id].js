import Layout from '../../components/layout'
import Date from '../../components/date'
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { getAllProjectIds, getProjectData } from '../../lib/projects'

export async function getStaticProps({ params }) {
    const projectData = await getProjectData(params.id)
    return {
        props: {
            projectData
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllProjectIds()
    return {
        paths,
        fallback: false
    }
}

export default function Project({ projectData }) {
    return (
        <Layout>
            <Head>
                <title>{projectData.title}</title>
            </Head>
            <article className={utilStyles.divContainer}>
                <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={projectData.start_date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
            </article>
        </Layout>
    )
}