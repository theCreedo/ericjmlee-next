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
                <p>Hey, Eric here 👋</p>
                <p>I'm a {getAge('1996-12-21')}-year-old UT Austin grad (🤘'19) with a Computer Science (CS) major and an Entrepreneurship minor.</p>
                <p>As a Dallas-born, Plano Suburb child with Taiwanese roots 🇹🇼, I've lived in Texas all my life, but a part of my heart will always be in Taiwan & Michigan.</p>
                <p>Currently I work in ATX as a Software Engineer @ <a href='https://www.retailmenot.com/'>RetailMeNot</a>, working on full stack web development.</p>
                <p>In my free time, I serve in my church, <a href="https://austin.hmcc.net/">HMCC Austin</a>, work on my personal newsletter <a href="https://ericlee.substack.com/">Savvy Saturdays</a>, and provide consulting & mentorship for startups & creative ventures like YouTube, Etsy, & Instagram.</p>
                <h2 className={utilStyles.headingLg}>Interests</h2>
                <p>My hobbies include biking, writing, reading Webtoons & Manga, consuming a lot of YouTube, basketball, perusing newsletters, and applying methods of productivity as well as stress baking, guitar, working out, and the occasional video game.</p>
                <p>I'm not too much of a travel freak, as it takes a lot of activation energy to explore (though I'm down when empowered by friends), and I like to tell people that as long as I have internet and a laptop, I can be entertained for a while (e.g. YouTube Recommended, personal projects, and articles).</p>
                <p>My favorite YouTubers include <a href="https://www.youtube.com/c/OfflineTVgg">Offline TV</a> & their <a href="https://www.youtube.com/channel/UCuaIy5fmf85DkOnUUdn4ihQ">Podcast</a>, <a href="https://www.youtube.com/c/Ludwigahgren">Ludwig</a>, <a href="https://www.youtube.com/c/ph1lza">Ph1LzA</a>, <a href="https://www.youtube.com/user/Psych2GoTv">Psych2Go</a>, <a href="https://www.youtube.com/channel/UCKUnB5P0cdfnufPCKkGecqQ">ParashockX</a>, <a href="https://www.youtube.com/user/SethEverman">SethEverman</a>, and <a href="https://www.youtube.com/channel/UCZ1fbizRtEOC3dbiFsVUaCQ">Devin Nash</a>.</p>

                <h2 className={utilStyles.headingLg}>Contact Me</h2>
                <p>I love meeting new people, whether it's sharing in life, helping people on their startups and creative ventures, as well as providing (or receiving) perspective.</p>
                <p>Please reach out if you want to chat! Email me @ <a href="mailto:heyericjmlee@gmail.com">heyericjmlee@gmail.com</a> or message me through any social media.</p>
                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}