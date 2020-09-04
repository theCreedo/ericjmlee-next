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
                <title>Projects | {siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Projects</h2>
                <p>I am obsessed with <b>writing</b>, <b>entrepreneurship</b>, and <b>coding</b>.</p>
                <br />
                <ul className={utilStyles.list}>
                    {allProjectsData.map(({ id, start_date, title, one_liner, tech, header_link, youtube_embed_link, image_link, image_alt_text }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <div>
                                <h4>
                                    <a href={header_link}>
                                        {title}
                                    </a>
                                    <br />
                                </h4>

                                {youtube_embed_link ?
                                    (<div className={utilStyles.iframeVideo}>
                                        <iframe width="560" height="315" src={youtube_embed_link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>) :
                                    (<img src={image_link} alt={image_alt_text}></img>
                                    )}
                                < br />
                                <Date dateString={start_date} isPost={false} />
                            </div>
                            <small><b>{one_liner}</b></small>
                            <br />
                            <small><p>Used: <i>{tech}</i></p></small>
                            <br />
                        </li>
                    ))}
                </ul>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}