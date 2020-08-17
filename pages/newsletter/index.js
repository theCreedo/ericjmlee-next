import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsData } from '../../lib/posts'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Newsletter({ allPostsData }) {

    return (
        <Layout newsletter>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}><a href="https://ericlee.substack.com/">Savvy Saturdays</a></h2>
            </section>
        </Layout >
    )
}