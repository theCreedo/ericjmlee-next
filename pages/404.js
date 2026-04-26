import Link from "next/link"
import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'

export default function Custom404() {
    return (
        <Layout>
            <Head>
                <title>{`404 | ${siteTitle}`}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h1>404 — Page Not Found</h1>
                <p style={{ color: 'var(--text)' }}>This page doesn&apos;t exist.</p>
                <Link href='/'>← Back to Home</Link>
            </section>
        </Layout>
    )
}
