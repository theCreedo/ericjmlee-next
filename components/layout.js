import Head from 'next/head'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'


const name = 'Eric Lee'
export const siteTitle = 'ERIC LEE'

export default function Layout({ children, home, project, experience, blog, about, newsletter }) {
    const tabs = ['Experience', 'Projects', 'Blog', 'Newsletter', 'About']
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous" />
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="/">ERIC LEE</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav">
                        {tabs.map((item) => {
                            const href = '/' + item.toLowerCase()
                            return (
                                <li class="nav-item">
                                    <a class="nav-link"><Link href={href}><a>{item}</a></Link></a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </nav>
            <header className={styles.header}>
                {/* <div className={styles.nav}>
                    {tabs.map((item) => {
                        const href = '/' + item.toLowerCase()
                        return (
                            <div>
                                <a>| <Link href={href}><a>{item}</a></Link> | </a>
                            </div>
                        )
                    })}
                </div> */}
                {home ? (
                    <>
                        <img
                            src="/images/profile.jpg"
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            alt={name}
                        />
                        {/* <h1 className={utilStyles.heading2Xl}>{name}</h1> */}
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