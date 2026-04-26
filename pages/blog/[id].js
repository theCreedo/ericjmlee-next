import Layout, { siteTitle, base_url } from '../../components/layout'
import Date from '../../components/date'
import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import utilStyles from '../../styles/utils.module.css'
import { getAdjacentPosts, getAllPostIds, getPostData } from '../../lib/posts'
import JsonLd from '../../components/JsonLd'

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    const adjacentPostsData = await getAdjacentPosts(params.id)
    return {
        props: {
            postData,
            adjacentPostsData,
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
    const postSchema = {
        '@context': 'https://schema.org',
        '@type': postData.evergreen ? 'Article' : 'BlogPosting',
        headline: postData.title,
        datePublished: postData.date ? String(postData.date).slice(0, 10) : undefined,
        author: {
            '@type': 'Person',
            name: 'Eric Lee',
            url: base_url,
        },
        publisher: {
            '@type': 'Person',
            name: 'Eric Lee',
            url: base_url,
        },
        url: `${base_url}/blog/${postData.id}`,
        ...(postData.description && { description: postData.description }),
        ...(postData.image_link && { image: postData.image_link }),
    }

    return (
        <Layout postData={postData}>
            <Head>
                <title>{`${postData.title} | ${siteTitle}`}</title>
                <meta name="description" content={postData.description || DEFAULT_DESCRIPTION} />
                <meta property="og:title" content={`${postData.title} | ${siteTitle}`} />
                <meta property="og:description" content={postData.description || 'A post by Eric Lee.'} />
                <meta
                    property="og:image"
                    content={postData.image_link || `${base_url}/images/profile/blue-profile-191x100.jpg`}
                />
                <JsonLd data={postSchema} />
            </Head>
            <article className={utilStyles.divContainer}>
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
                            height: 'auto',
                            marginBottom: 'var(--space-6)'
                        }}
                    />
                )}
                <div className={utilStyles.lightText} style={{ marginBottom: 'var(--space-6)' }}>
                    <Date dateString={postData.date} isPost={true} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <hr style={{ borderColor: 'var(--border)', margin: 'var(--space-8) 0 0' }} />
            </article>
            <div className={utilStyles.blogLinkPadding}>
                {adjacentPostsData.previousPost ? (
                    <div>
                        <Link href={'/blog/' + adjacentPostsData.previousPost.id} className={`${utilStyles.blogLink} ${utilStyles.alignleft}`}>
                            ← {adjacentPostsData.previousPost.title}
                        </Link>
                    </div>
                ) : <div />}
                {adjacentPostsData.nextPost && (
                    <div>
                        <Link href={'/blog/' + adjacentPostsData.nextPost.id} className={`${utilStyles.blogLink} ${utilStyles.alignright}`}>
                            {adjacentPostsData.nextPost.title} →
                        </Link>
                    </div>
                )}
            </div>
        </Layout>
    )
}

const DEFAULT_DESCRIPTION = 'A post by Eric Lee — developer advocate, writer, and multi-domain operator based in Austin, TX.'
