import Head from 'next/head'
import Link from "next/link"
import Layout, { siteTitle } from '../../components/layout'
import NewsletterForm from '../../components/newsletter'
import utilStyles from '../../styles/utils.module.css'

export default function Newsletter() {

    return (
        <Layout newsletter>
            <Head>
                <title>Newsletter | {siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <br />
                <p>Hey there!</p>
                <p>As a Christian, I've struggled to find ways to live out my faith while doing good work effectively & efficiently. I've learned that being a light requires being equipped well, both spiritually and practically.</p>
                <p>Perusing newsletters, I couldn't find any that addressed these things well, so I decided to make my own.</p>
                <p><a href="https://ericlee.substack.com">Savvy Saturdays</a> is my weekly email newsletter where I share learnings, a curated collection of articles on faith, leadership, & productivity, as well as tidbits of thoughts, verses, and quotes to chew on.</p>
                <p>If you want to learn and be inspired practically, spiritually, effectively, or efficiently, sign up for my free newsletter below!</p>
                <NewsletterForm />
                <br />
                <p>(<a href="https://ericlee.substack.com/feed">RSS Feed</a>)</p>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}