import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

const name = 'Eric Lee'
export const siteTitle = 'ERIC LEE'

export default function Layout({ children, home, project, experience, blog, about, newsletter }) {
    const tabs = ['Projects', 'Experience', 'Blog', 'About']
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                <div className={styles.nav}>
                    {tabs.map((item) => {
                        const href = '/' + item.toLowerCase()
                        return (
                            <div>
                                <a>| <Link href={href}>{item}</Link> | </a>
                            </div>
                        )
                    })}
                    <a href="http://ericlee.substack.com/">| Newsletter |</a>
                </div>
                {home ? (
                    <>
                        <img
                            src="/images/profile.jpg"
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        <h1 className={utilStyles.heading2Xl}>{name}</h1>
                    </>
                ) : (
                        <>
                            {project && (
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/images/projects-profile.jpg"
                                            className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                            alt={name}
                                        />
                                    </a>
                                </Link>
                            )}
                            {experience && (
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/images/experience-profile.jpg"
                                            className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                            alt={name}
                                        />
                                    </a>
                                </Link>
                            )}
                            {newsletter && (
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/images/newsletter-profile.jpg"
                                            className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                            alt={name}
                                        />
                                    </a>
                                </Link>
                            )}
                            {blog && (
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/images/newsletter-profile.jpg"
                                            className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                            alt={name}
                                        />
                                    </a>
                                </Link>
                            )}
                            {about && (
                                <Link href="/">
                                    <a>
                                        <img
                                            src="/images/about-profile.jpg"
                                            className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                                            alt={name}
                                        />
                                    </a>
                                </Link>
                            )}
                            <h2 className={utilStyles.headingLg}>
                                <Link href="/">
                                    <a className={utilStyles.colorInherit}>{name}</a>
                                </Link>
                            </h2>
                        </>
                    )}
            </header>
            <main>{children}</main>
            {!home && (
                <div className={styles.backToHome}>
                    <Link href="/">
                        <a>← Back to home</a>
                    </Link>
                </div>
            )}
        </div>
    )
}