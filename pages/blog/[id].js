import Layout, { siteTitle, base_url } from '../../components/layout'
import Date from '../../components/date'
import Link from "next/link"
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { getAllPostIds, getPostData } from '../../lib/posts'

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export default function Post({ postData }) {
    return (
        <Layout postData={postData}>
            <Head>
                <title>{postData.title} | {siteTitle}</title>
                <meta
                    property="og:description" content={postData.description ? postData.description : 'Inspiration Hub'}
                />
                <meta
                    property="og:title" content={postData.title + " | " + siteTitle}
                />
                <meta
                    property="og:image"
                    content={postData.image_link ? postData.image_link : base_url + '/images/blog-profile-191x100.jpg'}
                />
            </Head>
            <article className={utilStyles.divContainer}>
                <br></br>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <Link href='/blog'><a>← Back to Blog</a></Link>
            </article>
        </Layout>
    )
}