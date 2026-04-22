import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import ExploreFooter from '../../components/ExploreFooter'
import { getSortedPostsData } from '../../lib/posts'
import BlogItem from '../../components/blog'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    const recentPosts = allPostsData.slice(0, 3)
    return {
        props: {
            allPostsData,
            recentPosts
        }
    }
}

export default function Blog({ allPostsData, recentPosts }) {
    return (
        <Layout blog>
            <Head>
                <title>{`Blog | ${siteTitle}`}</title>
                <meta name="description" content="All posts by Eric Lee." />
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h1>Blog</h1>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {allPostsData.map((postData) => (
                        <BlogItem key={postData.id} {...postData} />
                    ))}
                </ul>
                <Link href='/'>← Back to Home</Link>
            </section>
            <ExploreFooter posts={recentPosts} />
        </Layout>
    )
}
