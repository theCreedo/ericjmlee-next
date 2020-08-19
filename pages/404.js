import Link from "next/link"

import Layout from '../components/layout'

export default function Custom404() {
    return (
        <Layout>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h1>404 - Page Not Available Now</h1>
                {/* <Link href='/'><a>Back to Home</a></Link> */}
            </section>
        </Layout>
    )
}