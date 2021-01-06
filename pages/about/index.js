import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsData } from '../../lib/posts'
import LazyLoad from 'react-lazyload'
import NewsletterForm from '../../components/newsletter'

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}

export default function About({ allPostsData }) {
    const yearInMs = 3.15576e+10 // Using a year of 365.25 days (because leap years)
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)
    return (
        <Layout about>
            <Head>
                <title>About | {siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <br />
                <blockquote><b><i>Learning is my passion. Empowering is my mission.</i></b></blockquote>
                <p>I'm a {getAge('1996-12-21')} year old UT Austin grad (🤘'19) with a Computer Science (CS) major and an Entrepreneurship minor.</p>
                <p>I’ve lived in Texas all my life and have a totally normal amount of Dallas pride ✊, but Taiwan will always be special to me because it symbolizes my heritage and family 🇹🇼. Michigan also holds a piece of my heart since my favorite mission trips were at Ann Arbor and Detroit.</p>
                <p>My Myers-Briggs is <a href="https://www.16personalities.com/enfp-personality">ENFP</a>, and my Enneagram type is <a href="https://www.crystalknows.com/enneagram/type-2-wing-3">2w3</a>.</p>

                <h2 className={utilStyles.headingLg}>Interests</h2>
                <p>My hobbies include biking, writing, reading webtoons & manga, consuming a lot of YouTube, playing basketball, and perusing newsletters as well as stress baking, practicing guitar, working out, and enjoying the occasional video game.</p>
                <p>I'm not too much of a travel freak since it takes up a lot of energy to explore, but friends can usually coerce me into a trip. In general, I like to tell people that as long as I have internet and a laptop, I can be entertained for a while.</p>

                <h2 className={utilStyles.headingLg}>Keep in Touch</h2>
                <p>My DMs are always open on <a href="https://twitter.com/ericjmlee">Twitter</a>.</p>
                <p>You can also join my newsletter to stay in touch. 👇</p>
                <NewsletterForm />
                <br />
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}