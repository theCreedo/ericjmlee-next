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

export default function Project({ allPostsData }) {
    return (
        <Layout project>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Projects</h2>
                <p>I am obsessed with <b>writing</b>, <b>entrepreneurship</b>, and <b>coding</b>. I am also interested in marketing, branding, and UX.</p>
                <ul className={utilStyles.list}>
                    {/* {allPostsData.map(({ id, date, title }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <a>{title}</a>
                            </Link>
                            <br />
                        </li>
                    ))} */}
                </ul>
            </section>
        </Layout >
    )
}