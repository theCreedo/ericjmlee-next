import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsData } from '../../lib/posts'

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
    const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
    return (
        <Layout about>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>About</h2>
                <p>Hello, Eric here! 👋</p>
                <p>I'm a {getAge('1996-12-21')} year old UT Austin grad (🤘'19) with a Computer Science (CS) major and an Entrepreneurship minor.</p>
                <p>I’ve lived in Texas all my life and have a totally normal amount of Dallas pride ✊, but Taiwan will always be special to me because it symbolizes my heritage and family 🇹🇼. Michigan also holds a piece of my heart since my favorite mission trips were at Ann Arbor and Detroit.</p>
                <p>Currently I work in ATX as a Software Engineer @ <a href='https://www.retailmenot.com/'>RetailMeNot</a>, working on full stack web development.</p>
                <p>In my free time, I serve in my church called <a href="https://austin.hmcc.net/">HMCC Austin</a>, work on my personal newsletter <a href="https://ericlee.substack.com/">Savvy Saturdays</a>, and provide consulting & mentorship for startups & creative ventures like YouTube, Etsy, & Instagram.</p>
                <h2 className={utilStyles.headingLg}>Interests</h2>
                <p>My hobbies include biking, writing, reading webtoons & manga, consuming a lot of YouTube, playing basketball, and perusing newsletters as well as stress baking, practicing guitar, working out, and enjoying the occasional video game.</p>
                <p>I'm not too much of a travel freak since it takes up a lot of energy to explore, but friends can usually coerce me into a trip. In general, I like to tell people that as long as I have internet and a laptop, I can be entertained for a while.</p>
                <h2 className={utilStyles.headingLg}>Contact Me</h2>
                <p>I love meeting new people. Sharing about life, helping people on their startups and creative ventures, as well as providing (or receiving) perspective are all life's joys.</p>
                <p>Please reach out if you want to chat! Email me @ <a href="mailto:heyericjmlee@gmail.com">heyericjmlee@gmail.com</a>
                or message me through any social media.</p>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}