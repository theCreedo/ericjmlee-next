import Link from "next/link"
import utilStyles from '../styles/utils.module.css'
import Layout from '../components/layout'

export default function Custom404() {
    return (
        <Layout>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h1>404 - Page Not Available Now</h1>
                <Link href='/'>Back to Home</Link>
            </section>
        </Layout>
    )
}