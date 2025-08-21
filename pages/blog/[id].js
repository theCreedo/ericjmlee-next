import Layout, { siteTitle, base_url } from '../../components/layout'
import Date from '../../components/date'
import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import utilStyles from '../../styles/utils.module.css'
import { getAdjacentPosts, getAllPostIds, getPostData } from '../../lib/posts'
import NewsletterForm from '../../components/newsletter'

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)

    const adjacentPostsData = await getAdjacentPosts(params.id)
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
    return (
        <Layout postData={postData}>
            <Head>
                <title>{`${postData.title} | ${siteTitle}`}</title>
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
                {postData.image_link && (
                    <Image 
                        className={utilStyles.blogPostImage} 
                        src={postData.image_link} 
                        alt={postData.image_alt || 'Blog post image'}
                        width={800}
                        height={400}
                        style={{
                            objectFit: 'cover',
                            borderRadius: '8px',
                            maxWidth: '100%',
                            height: 'auto'
                        }}
                    />
                )}
                <br></br>
                <div className={utilStyles.lightText}><Date dateString={postData.date} isPost={true} /></div>
                <br></br>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <hr />
                {/* Add a profile section with info on self? */}
            </article>
            <NewsletterForm />
            <div className={utilStyles.blogLinkPadding}>
                {adjacentPostsData.previousPost ?
                    <div>
                        <Link href={'/blog/' + adjacentPostsData.previousPost.id} className={`${utilStyles.blogLink} ${utilStyles.alignleft}`}>
                            Previous: {adjacentPostsData.previousPost.title}
                        </Link>
                    </div> : <div className={`${utilStyles.alignleft}`}></div>}
                {adjacentPostsData.nextPost &&
                    <div>
                        <Link href={'/blog/' + adjacentPostsData.nextPost.id} className={`${utilStyles.blogLink} ${utilStyles.alignright}`}>
                            Next: {adjacentPostsData.nextPost.title}
                        </Link>
                    </div>}
            </div>
        </Layout>
    )
}