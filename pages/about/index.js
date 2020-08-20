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

export default function About({ allPostsData }) {
    return (
        <Layout about>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>About</h2>
                <p>Hey there, Eric here!</p>
                <p>Dallas-born, Plano Suburb child with Taiwanese roots 🇹🇼, I have lived in Texas all my life, graduated from UT Austin🤘, and currently work as a software engineer @ <a href='https://www.retailmenot.com/'>RetailMeNot</a>.</p>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}