import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedProjectsData } from '../../lib/projects'
import Date from '../../components/date'

export async function getStaticProps() {
    const allProjectsData = getSortedProjectsData()
    return {
        props: {
            allProjectsData
        }
    }
}

export default function Project({ allProjectsData }) {
    return (
        <Layout project>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Projects</h2>
                <p>I am obsessed with <b>writing</b>, <b>entrepreneurship</b>, and <b>coding</b>. I am also interested in marketing, branding, and UX.</p>
                <ul className={utilStyles.list}>
                    {allProjectsData.map(({ id, start_date, title, one_liner, tech, youtube_embed_link, footer_image, footer_image_alt_txt }) => (
                        <li className={utilStyles.listItem} key={id}>
                            {youtube_embed_link ? (
                                <div>
                                    <Link href="/projects/[id]" as={`/projects/${id}`}>
                                        <h4>
                                            <a href=''>
                                                {title}
                                            </a>
                                        </h4>
                                    </Link>
                                    <Date dateString={start_date} isPost={false} />
                                    <br />
                                    <div className={utilStyles.iframeVideo}>
                                        <iframe width="560" height="315" src={youtube_embed_link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                    <br />
                                </div>
                            ) : (
                                    <div>
                                        <div className={utilStyles.image}>
                                            <img src={footer_image} alt={footer_image_alt_txt}></img>
                                        </div>
                                        <Link href="/projects/[id]" as={`/projects/${id}`}>
                                            <h4>
                                                <a href=''>
                                                    {title}
                                                </a>
                                            </h4>
                                        </Link>
                                        <Date dateString={start_date} isPost={false} />
                                    </div>
                                )}
                            <p>
                                <b>{one_liner}</b>
                                <br />
                                Used: <i>{tech}</i>
                            </p>
                        </li>
                    ))}
                </ul>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}