import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsData } from '../../lib/posts'
import BlogItem from '../../components/blog'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return { props: { allPostsData } }
}

export default function Blog({ allPostsData }) {
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
        </Layout>
    )
}
