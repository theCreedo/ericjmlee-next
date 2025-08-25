import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'
import { getSortedPostsData } from '../../lib/posts'
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
                <title>{`About | ${siteTitle}`}</title>
            </Head>
            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <br />
                <blockquote><b><i>Learning is my passion. Empowering is my mission.</i></b></blockquote>
                <p>I'm a {getAge('1996-12-21')} year old Austinite with an abnormal amount of hobbies.</p>
                <p>I love personality tests:</p>
                <ul>
                    <li>My Myers-Briggs is <a href="https://www.16personalities.com/enfp-personality">ENFP</a> - (<a href="https://www.16personalities.com/free-personality-test">Test here</a>)</li>
                    <li>My Enneagram type is <a href="https://www.crystalknows.com/enneagram/type-2-wing-3">2w3</a> - (<a href="https://www.eclecticenergies.com/enneagram/test">Test here</a>)</li>
                    <li>My Clifton Strengths is <a href="https://www.gallup.com/cliftonstrengths/en/252278/input-theme.aspx">Input</a>, <a href="https://www.gallup.com/cliftonstrengths/en/252197/connectedness-theme.aspx">Connectedness</a>, <a href="https://www.gallup.com/cliftonstrengths/en/252284/intellection-theme.aspx">Intellection</a>, <a href="https://www.gallup.com/cliftonstrengths/en/252323/restorative-theme.aspx">Restorative</a>, and <a href="https://www.gallup.com/cliftonstrengths/en/252224/developer-theme.aspx">Developer</a> - (<a href="https://www.gallup.com/cliftonstrengths/en/253715/34-cliftonstrengths-themes.aspx">Test here</a>)</li>
                    <li>My DISC is <a href="https://www.discprofile.com/what-is-disc/disc-styles/influence">Influence</a> - (<a href="https://www.eclecticenergies.com/enneagram/test">Test here</a>)</li>
                    <li>My Kingdom Strengths from APEST is <a href="https://www.alanhirsch.org/faq">Apostle</a> - (<a href="https://fivefoldministry.com/">Test here</a>)</li>
                </ul>
                <h2 className={utilStyles.headingLg}>Interests</h2>
                <p>My hobbies include running, bouldering, weight-lifting, writing, listening & playing worship music, watching a lot of Youtube, bingeing the occasional TV show or movie, and enjoying the occasional video game.</p>
                <p>I love to travel to Asia, though I get the opportunity to go to many different cities because of the trading card I play, Flesh and Blood.</p>

                <h2 className={utilStyles.headingLg}>Keep in Touch</h2>
                <p>You can always reach me on <a href="https://www.instagram.com/solothecreedo/">Instagram</a>.</p>
                <br />
                <Link href='/'>← Back to Home</Link>
            </section>
        </Layout >
    )
}