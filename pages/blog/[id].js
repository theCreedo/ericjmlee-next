import Layout, { siteTitle, base_url } from '../../components/layout'
import Date from '../../components/date'
import Link from "next/link"
import Head from 'next/head'
import utilStyles from '../../styles/utils.module.css'
import { getAdjacentPosts, getAllPostIds, getPostData } from '../../lib/posts'
import NewsletterForm from '../../components/newsletter'

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)

    const adjacentPostsData = await getAdjacentPosts(params.id)
    console.log(adjacentPostsData);
    return {
        props: {
            postData,
            adjacentPostsData
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

export default function Post({ postData, adjacentPostsData }) {
    console.log(adjacentPostsData.previousPost);
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
                {postData.image_link ?
                    <img src={postData.image_link} alt={postData.image_alt}></img>
                    : <></>}
                <br></br>
                <div className={utilStyles.lightText}><Date dateString={postData.date} isPost={true} /></div>
                <br></br>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <div>
                    {Math.floor(Math.random() * 10) > 5 && <NewsletterForm />}
                    <hr />
                    {adjacentPostsData.previousPost &&
                        <Link href={'/blog/' + adjacentPostsData.previousPost.id}>
                            <a className={`${utilStyles.blogLink} ${utilStyles.alignleft}`}>Previous: {adjacentPostsData.previousPost.title}</a>
                        </Link>}
                    {adjacentPostsData.nextPost &&
                        <Link href={'/blog/' + adjacentPostsData.nextPost.id}>
                            <a className={`${utilStyles.blogLink} ${utilStyles.alignright}`}>Next: {adjacentPostsData.nextPost.title}</a>
                        </Link>}
                </div>
            </article>
        </Layout>
    )
}