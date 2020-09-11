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
                <br />
                <ul className={utilStyles.list}>
                    {allProjectsData.map(({ id, start_date, title, one_liner, tech, header_link, youtube_embed_link, image_link, image_alt_text }) => (
                        <li className={utilStyles.listItem} key={id}>
                            <div>

                                {youtube_embed_link ?
                                    (<div className={utilStyles.iframeVideo}>
                                        <iframe width="560" height="315" src={youtube_embed_link} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>) :
                                    (<a href={header_link}><img src={image_link} alt={image_alt_text}></img></a>
                                    )}
                                <h4 className={utilStyles.headingLgProjects} >
                                    <a href={header_link}>
                                        {title}
                                    </a>
                                </h4>
                                <small className={utilStyles.lightText}>
                                    <Date dateString={start_date} isPost={false} />
                                </small>
                            </div>
                            <>{one_liner}</>
                            <br />
                            <small><p>Used: <i>{tech}</i></p></small>
                        </li>
                    ))}
                </ul>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}