import Head from 'next/head'
import Image from 'next/image'
import Script from 'next/script'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { FaMedium, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { slide as Menu } from 'react-burger-menu'


const name = 'Eric Lee'
export const siteTitle = "ERIC LEE"
export const base_url = "https://www.ericjmlee.com"

function HeaderItem({ imageUrl, imageAlt, title, home }) {
    const headerText = title.substr(3);
    const headerEmojiText = title.toLowerCase().substr(0, 2);
    return (<div className={styles.swapFigure}>
        {!home && <Image
            className={`${styles.swapOnHoverFrontImage} ${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            src="/images/profile/transparent-profile.png"
            alt={imageAlt}
            width={144}
            height={144}
        />}
        <Image
            className={`${styles.swapOnHoverBackImage} ${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            src={imageUrl}
            alt={imageAlt}
            width={144}
            height={144}
        />
        <h1 className={`${utilStyles.headingXl}`}>{<span className={home ? styles.wave : null}>{headerEmojiText}</span>} {headerText}</h1>
    </div >)

}

export default function Layout({ children, home, project, experience, blog, about, newsletter, postData }) {
    const tabs = ['🧠 Experience', '🚀 Projects', '📄 Blog', '💌 Savvy Saturdays', '🧐 About']
    const medium_url = "https://medium.com/@theCreedo"
    const github_url = "http://github.com/theCreedo"
    const linkedin_url = "https://linkedin.com/in/ericjmlee"
    const twitter_url = "https://twitter.com/ericjmlee"
    const color = 'blue';
    // const email_url = "mailto:heyericjmlee@gmail.com"
    return (
        <div>
            <Head>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=UA-176727335-1"
                />
                <script
                    async
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'UA-176727335-1');
                    `,
                    }}
                />
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                {home && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-profile-191x100.jpg"}
                    />
                    <meta
                        property="og:title" content={siteTitle}
                    />
                    <meta
                        property="og:description" content="Inspiration Hub"
                    />
                </>)}
                {project && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-projects-profile-191x100.jpg"}
                    />
                    <meta
                        property="og:title" content={"Projects | " + siteTitle}
                    /> &&
                    <meta
                        property="og:description" content="Caution: Entering Construction Zone"
                    />
                </>)}
                {experience && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-experience-profile-191x100.jpg"}
                    /> &&
                    <meta
                        property="og:title" content={"Experience | " + siteTitle}
                    /> &&
                    <meta
                        property="og:description" content="The Nine to Five Vibe"
                    />
                </>)}
                {blog && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-blog-profile-191x100.jpg"}
                    /> &&
                    <meta
                        property="og:title" content={"Blog | " + siteTitle}
                    /> &&
                    <meta
                        property="og:description" content="3AM Thoughts"
                    />
                </>)}
                {newsletter && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-newsletter-profile-191x100.jpg"}
                    /> &&
                    <meta
                        property="og:title" content={"Newsletter | " + siteTitle}
                    /> &&
                    <meta
                        property="og:description" content="Savvy Saturdays"
                    />
                </>)}
                {about && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-about-profile-191x100.jpg"}
                    /> &&
                    <meta
                        property="og:title" content={"About | " + siteTitle}
                    /> &&
                    <meta
                        property="og:description" content="New Phone, Who Dis?"
                    />
                </>)}
                <meta property="twitter:card" content="summary_large_image" />
            </Head>
            <div className={styles.pageContainer}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        <Image
                            className={styles.navImage}
                            src="/images/profile/favicon.png"
                            alt="profile-header"
                            width={32}
                            height={32}
                        />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {tabs.map((item, index) => {
                                const tabText = item.toLowerCase().substr(3);
                                const tabEmojiText = item.toLowerCase().substr(0, 2);
                                var href = '/' + tabText;
                                if (href.includes("sav")) {
                                    href = 'newsletter';
                                }
                                return (
                                    <li key={`nav-${index}`} className="nav-item">
                                        <Link href={href} className="nav-link">{tabEmojiText + " " + tabText}</Link>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
                <header className={`${styles.header}`}>
                    {home ? (
                        <>
                            <HeaderItem
                                imageUrl={"/images/profile/transparent-profile.png"}
                                imageAlt={name}
                                title={"👋 Hey, Eric here!"}
                                home={true}
                            />
                        </>
                    ) : (
                            <>
                                {experience && (
                                    <HeaderItem
                                        imageUrl={"/images/profile/transparent-experience-profile.png"}
                                        imageAlt={name}
                                        title={"🧠 Experience"} />
                                )}
                                {project && (
                                    <HeaderItem
                                        imageUrl={"/images/profile/transparent-projects-profile.png"}
                                        imageAlt={name}
                                        title={"🚀 Projects"} />
                                )}
                                {newsletter && (
                                    <HeaderItem
                                        imageUrl={"/images/profile/transparent-newsletter-profile.png"}
                                        imageAlt={name}
                                        title={"💌 Savvy Saturdays"} />
                                )}
                                {blog && (
                                    <HeaderItem
                                        imageUrl={"/images/profile/transparent-blog-profile.png"}
                                        imageAlt={name}
                                        title={"📄 Blog"} />
                                )}
                                {about && (
                                    <HeaderItem
                                        imageUrl={"/images/profile/transparent-about-profile.png"}
                                        imageAlt={name}
                                        title={"🧐 About"} />
                                )}
                                {postData && (
                                    <>
                                        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                                        <br></br>
                                        <div className={utilStyles.lightText}>
                                            {postData.reading_time}  min read
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                </header>
                <main className={styles.contentContainer}>{children}</main>
                {home ? (
                    <footer className="pageFooter font-small blue pt-4">
                        <div className="text-center py-3">
                            <div className={styles.navContainer}>
                                <a href={medium_url} className={styles.social}><FaMedium size={40} /></a>
                                <a href={github_url} className={styles.social}><FaGithub size={40} /></a>
                                <a href={linkedin_url} className={styles.social}><FaLinkedin size={40} /></a>
                                <a href={twitter_url} className={styles.social}><FaTwitter size={40} /></a>
                                {/* <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={email_url} /> */}
                            </div>
                        </div>
                    </footer>
                ) : (
                        <footer className="pageFooter font-small blue pt-4">
                            <div className="footer-copyright text-center py-3">
                                <div className={styles.navContainer}>
                                    <a href={medium_url} className={styles.social}><FaMedium size={40} /></a>
                                    <a href={github_url} className={styles.social}><FaGithub size={40} /></a>
                                    <a href={linkedin_url} className={styles.social}><FaLinkedin size={40} /></a>
                                    <a href={twitter_url} className={styles.social}><FaTwitter size={40} /></a>
                                    {/* <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={email_url} /> */}
                                </div>
                                <div className="footer-copyright text-center py-3">
                                    <small>Copyright © Eric Lee <span id="year">{new Date().getFullYear()}</span></small>
                                </div>
                            </div>
                        </footer>
                    )}
            </div>
            <Script 
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
                integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
                crossOrigin="anonymous"
                strategy="lazyOnload"
            />
        </div >
    )
}