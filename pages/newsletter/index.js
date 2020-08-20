import Head from 'next/head'
import Link from "next/link"
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'

export default function Newsletter() {

    return (
        <Layout newsletter>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}><a href="https://ericlee.substack.com/">Savvy Saturdays</a></h2>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}