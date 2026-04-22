import Layout, { siteTitle } from '../../components/layout'
import Date from '../../components/date'
import Link from "next/link"
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import ExploreFooter from '../../components/ExploreFooter'
import { getAllProjectIds, getProjectData } from '../../lib/projects'
import { getSortedPostsData } from '../../lib/posts'

export async function getStaticProps({ params }) {
    const projectData = await getProjectData(params.id)
    const recentPosts = getSortedPostsData().slice(0, 3)
    return {
        props: {
            projectData,
            recentPosts
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

export default function Project({ projectData, recentPosts }) {
    return (
        <Layout>
            <Head>
                <title>{`${projectData.title} | ${siteTitle}`}</title>
            </Head>
            <article className={utilStyles.divContainer}>
                <h1 className={utilStyles.headingXl}>{projectData.title}</h1>
                <div className={utilStyles.lightText} style={{ marginBottom: 'var(--space-6)' }}>
                    <Date dateString={projectData.start_date} isPost={false} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: projectData.contentHtml }} />
                <Link href='/projects'>← Back to Projects</Link>
            </article>
            <ExploreFooter posts={recentPosts} />
        </Layout>
    )
}
