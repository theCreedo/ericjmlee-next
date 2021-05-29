import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { SocialIcon } from 'react-social-icons';
import { slide as Menu } from 'react-burger-menu'


const name = 'Eric Lee'
export const siteTitle = "ERIC LEE"
export const base_url = "https://www.ericjmlee.com"

function HeaderItem({ imageUrl, imageAlt, title, home }) {
    const headerText = title.substr(3);
    const headerEmojiText = title.toLowerCase().substr(0, 2);
    return (<div className={styles.swapFigure}>
        {!home && <img
            className={`${styles.swapOnHoverFrontImage} ${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            src="/images/profile/transparent-profile.png"
            alt={imageAlt}
        />}
        <img
            className={`${styles.swapOnHoverBackImage} ${styles.headerHomeImage} ${utilStyles.borderCircle}`}
            src={imageUrl}
            alt={imageAlt}
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
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossOrigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossOrigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossOrigin="anonymous"></script>
            </Head>
            <div className={styles.pageContainer}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        <img
                            className={styles.navImage}
                            src="/images/profile/favicon.png"
                            alt="profile-header"
                        />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            {tabs.map((item) => {
                                const tabText = item.toLowerCase().substr(3);
                                const tabEmojiText = item.toLowerCase().substr(0, 2);
                                var href = '/' + tabText;
                                if (href.includes("sav")) {
                                    href = 'newsletter';
                                }
                                return (
                                    <li className="nav-item">
                                        <Link href={href}><a className="nav-link">{tabEmojiText + " " + tabText}</a></Link>
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
                                <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={medium_url} />
                                <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={github_url} />
                                <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={linkedin_url} />
                                <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={twitter_url} />
                                {/* <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={email_url} /> */}
                            </div>
                        </div>
                    </footer>
                ) : (
                        <footer className="pageFooter font-small blue pt-4">
                            <div className="footer-copyright text-center py-3">
                                <div className={styles.navContainer}>
                                    <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={medium_url} />
                                    <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={github_url} />
                                    <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={linkedin_url} />
                                    <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={twitter_url} />
                                    {/* <SocialIcon className={styles.social} style={{ height: 40, width: 40 }} url={email_url} /> */}
                                </div>
                                <div className="footer-copyright text-center py-3">
                                    <small>Copyright © Eric Lee <span id="year">{new Date().getFullYear()}</span></small>
                                </div>
                            </div>
                        </footer>
                    )}
            </div>
        </div >
    )
}