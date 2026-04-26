import Head from 'next/head'
import Link from "next/link"
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'

export default function Newsletter() {
    return (
        <Layout newsletter>
            <Head>
                <title>{`Newsletter | ${siteTitle}`}</title>
                <meta name="description" content="Savvy Saturdays — archived newsletter by Eric Lee, 2020–2021." />
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h1>Savvy Saturdays — Archived</h1>
                <p>Savvy Saturdays ran from 2020–2021. New issues are no longer published.</p>
                <p>Past issues are available on <a href="https://ericlee.substack.com/archive">Substack</a>.</p>
                <Link href='/'>← Back to Home</Link>
            </section>
        </Layout>
    )
}
