import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'


const name = 'Eric Lee'
export const siteTitle = "Eric Lee"
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

const nav = [
  { label: 'About', href: '/about' },
  { label: 'Now', href: '/now' },
  {
    label: 'Domains',
    children: [
      { label: 'Work', href: '/work' },
      { label: 'Cards', href: '/cards' },
      { label: 'Faith', href: '/faith' },
      { label: 'Studio', href: '/studio' },
    ],
  },
  { label: 'Archive', href: '/archive' },
];

export default function Layout({ children, home, project, experience, blog, about, newsletter, postData }) {
    const [navOpen, setNavOpen] = useState(false);
    const color = 'blue';
    // const email_url = "mailto:heyericjmlee@gmail.com"
    return (
        <div>
            <Head>
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
                    />
                    <meta
                        property="og:description" content="Caution: Entering Construction Zone"
                    />
                </>)}
                {experience && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-experience-profile-191x100.jpg"}
                    />
                    <meta
                        property="og:title" content={"Experience | " + siteTitle}
                    />
                    <meta
                        property="og:description" content="The Nine to Five Vibe"
                    />
                </>)}
                {blog && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-blog-profile-191x100.jpg"}
                    />
                    <meta
                        property="og:title" content={"Blog | " + siteTitle}
                    />
                    <meta
                        property="og:description" content="3AM Thoughts"
                    />
                </>)}
                {newsletter && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-newsletter-profile-191x100.jpg"}
                    />
                    <meta
                        property="og:title" content={"Newsletter | " + siteTitle}
                    />
                    <meta
                        property="og:description" content="Savvy Saturdays"
                    />
                </>)}
                {about && (<>
                    <meta
                        property="og:image"
                        content={base_url + "/images/profile/" + color + "-about-profile-191x100.jpg"}
                    />
                    <meta
                        property="og:title" content={"About | " + siteTitle}
                    />
                    <meta
                        property="og:description" content="New Phone, Who Dis?"
                    />
                </>)}
                <meta property="twitter:card" content="summary_large_image" />
            </Head>
            <div className={styles.pageContainer}>
                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLogo}>
                        <Image
                            src="/images/profile/favicon.png"
                            alt="Eric Lee"
                            width={32}
                            height={32}
                        />
                    </Link>
                    <button
                        className={styles.navHamburger}
                        onClick={() => setNavOpen((o) => !o)}
                        aria-label="Toggle navigation"
                        aria-expanded={navOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <ul className={`${styles.navLinks} ${navOpen ? styles.navLinksOpen : ''}`}>
                        {nav.map((item) =>
                            item.children ? (
                                <li key={item.label} className={`${styles.navItem} ${styles.navItemDropdown}`}>
                                    <span className={styles.navLink}>{item.label}</span>
                                    <ul className={styles.navDropdownMenu}>
                                        {item.children.map((child) => (
                                            <li key={child.label}>
                                                <Link href={child.href} className={styles.navLink}>{child.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ) : (
                                <li key={item.label} className={styles.navItem}>
                                    <Link href={item.href} className={styles.navLink}>{item.label}</Link>
                                </li>
                            )
                        )}
                    </ul>
                </nav>
                <header className={`${styles.header}`}>
                    {home ? (
                        <Image
                            className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                            src="/images/profile/transparent-profile.png"
                            alt={name}
                            width={144}
                            height={144}
                        />
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
                {!home && (
                    <footer className={styles.pageFooter}>
                        <small>© Eric Lee {new Date().getFullYear()}</small>
                    </footer>
                )}
            </div>
        </div >
    )
}