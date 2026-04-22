import Link from "next/link"
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import ExploreFooter from '../components/ExploreFooter'
import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
    const recentPosts = getSortedPostsData().slice(0, 3)
    return { props: { recentPosts } }
}

export default function Custom404({ recentPosts }) {
    return (
        <Layout>
            <Head>
                <title>{`404 | ${siteTitle}`}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h1>404 — Page Not Found</h1>
                <p style={{ color: 'var(--text)' }}>This page doesn&apos;t exist.</p>
                <Link href='/'>← Back to Home</Link>
            </section>
            <ExploreFooter posts={recentPosts} />
        </Layout>
    )
}
