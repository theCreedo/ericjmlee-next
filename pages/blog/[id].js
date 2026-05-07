import Layout, { siteTitle, base_url } from '../../components/layout'
import Date from '../../components/date'
import Link from "next/link"
import Head from 'next/head'
import Image from 'next/image'
import utilStyles from '../../styles/utils.module.css'
import styles from './post.module.css'
import { getAdjacentPosts, getAllPostIds, getPostData } from '../../lib/posts'
import { getRelatedPosts } from '../../lib/related'
import JsonLd from '../../components/JsonLd'

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    const adjacentPostsData = await getAdjacentPosts(params.id)
    const relatedPosts = getRelatedPosts(params.id)
    return {
        props: {
            postData,
            adjacentPostsData,
            relatedPosts,
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

export default function Post({ postData, adjacentPostsData, relatedPosts }) {
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

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: base_url },
            { '@type': 'ListItem', position: 2, name: 'Archive', item: `${base_url}/archive` },
            { '@type': 'ListItem', position: 3, name: postData.title, item: `${base_url}/blog/${postData.id}` },
        ],
    }

    const faqSchema = postData.faq && postData.faq.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: postData.faq.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: {
                '@type': 'Answer',
                text: a,
            },
        })),
    } : null

    return (
        <Layout postData={postData} canonicalPath={`/blog/${postData.id}`} ogType="article">
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
                <JsonLd data={breadcrumbSchema} />
                {faqSchema && <JsonLd data={faqSchema} />}
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
            {postData.topics && postData.topics.length > 0 && (
                <div className={styles.postTopics}>
                    <span className={styles.postTopicsLabel}>TOPICS</span>
                    <div className={styles.postTopicChips}>
                        {postData.topics.map((t) => (
                            <Link key={t} href={`/topic/${t}`} className={styles.postTopicChip}>
                                {t}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {relatedPosts && relatedPosts.length > 0 && (
                <div className={styles.relatedSection}>
                    <span className={styles.relatedLabel}>RELATED</span>
                    <ul className={styles.relatedList}>
                        {relatedPosts.map((post) => (
                            <li key={post.id} className={styles.relatedItem}>
                                <Link href={`/blog/${post.id}`} className={styles.relatedTitle}>
                                    {post.title}
                                </Link>
                                <div className={styles.relatedMeta}>
                                    <Date dateString={post.date} isPost />
                                    {post.topics && post.topics.length > 0 && (
                                        <span className={styles.relatedTopics}>
                                            {post.topics.map((t) => (
                                                <Link key={t} href={`/topic/${t}`} className={styles.relatedTopicChip}>
                                                    {t}
                                                </Link>
                                            ))}
                                        </span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
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
