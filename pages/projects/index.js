import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import ExploreFooter from '../../components/ExploreFooter'
import { getSortedProjectsData } from '../../lib/projects'
import { getSortedPostsData } from '../../lib/posts'
import ProjectItem from '../../components/project'

export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData()
    const recentPosts = getSortedPostsData().slice(0, 3)
    return {
        props: {
            allProjectsData,
            recentPosts
        }
    }
}

export default function Projects({ allProjectsData, recentPosts }) {
    return (
        <Layout project>
            <Head>
                <title>{`Projects | ${siteTitle}`}</title>
                <meta name="description" content="Hackathon projects and early work by Eric Lee." />
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h1>Projects</h1>
                <ul className={utilStyles.list}>
                    {allProjectsData.map((projectData) => (
                        <ProjectItem key={projectData.id} {...projectData} />
                    ))}
                </ul>
                <Link href='/'>← Back to Home</Link>
            </section>
            <ExploreFooter posts={recentPosts} />
        </Layout>
    )
}
