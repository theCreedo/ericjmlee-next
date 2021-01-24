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
                <p>I consume a lot of content and love to share my findings with others. Whether it’s inspiring articles, deep analytical books, compelling stories, (or even hilarious memes), I find my learnings have been timely for others.</p>
                <p>Many newsletters I followed that impacted my life shared in a similar way I did (except in a scaled manner).</p>
                <p>Inspired, I decided to create my own.</p>
                <p>If you want to learn, grow, and be inspired to be savvier each week, feel free to sign up for the newsletter below!</p>
                <NewsletterForm />
                <br />
                <p>(<a href="https://ericlee.substack.com/feed">RSS Feed</a>)</p>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}