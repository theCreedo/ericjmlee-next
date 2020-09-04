import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsData } from '../../lib/posts'
import Date from '../../components/date'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function Blog({ allPostsData }) {
    return (
        <Layout blog>
            <Head>
                <title>Blog | {siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Blog</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({ id, date, title, description, image_link }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/blog/[id]" as={`/blog/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                            <small className={utilStyles.lightText}>
                                <Date dateString={date} isPost={true} />
                            </small>
                            {image_link ?
                                <Link href="/blog/[id]" as={`/blog/${id}`}>
                                    <img src={image_link}></img>
                                </Link>
                                : <></>}
                            <br />
                            {description}
                            <br />
                            <small><Link href="/blog/[id]" as={`/blog/${id}`}>
                                <a>Read More</a>
                            </Link></small>
                        </li>
                    ))}
                </ul>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}