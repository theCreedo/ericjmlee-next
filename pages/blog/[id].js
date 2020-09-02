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
        <Layout post>
            <Head>
                <title>{postData.title} | {siteTitle}</title>
                <meta
                    property="og:image"
                    content={postData.image_link ? postData.image_link : base_url + '/images/blog-profile-191x100.jpg'}
                />
            </Head>
            <article className={utilStyles.divContainer}>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} isPost={true} />
                </div>
                <br></br>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <Link href='/blog'><a>← Back to Blog</a></Link>
            </article>
        </Layout>
    )
}