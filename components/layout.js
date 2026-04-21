import Head from 'next/head'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import JsonLd from './JsonLd'

const name = 'Eric Lee'
export const siteTitle = "Eric Lee"
export const base_url = "https://ericjmlee.com"

const DEFAULT_OG_IMAGE = base_url + '/images/profile/blue-profile-191x100.jpg'
const DEFAULT_DESCRIPTION = 'Developer advocate, L2 TCG judge, church leader, and writer based in Austin, TX.'

const PERSON_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Eric Lee',
  url: base_url,
  jobTitle: 'Developer Advocate',
  worksFor: {
    '@type': 'Organization',
    name: 'Global Payments',
    url: 'https://www.globalpayments.com',
  },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'University of Texas at Austin',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Austin',
    addressRegion: 'TX',
    addressCountry: 'US',
  },
  knowsAbout: [
    'Developer Advocacy',
    'Software Engineering',
    'API Integration',
    'Technical Community Building',
    'Flesh and Blood TCG',
    'Trading Card Game Judging',
  ],
  sameAs: [
    'https://fabtcg.com/judges/ericjmlee/',
    'https://www.instagram.com/fabcreedo/',
    'https://github.com/theCreedo',
  ],
}

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

export default function Layout({ children, home, project, experience, blog, newsletter, postData }) {
    const [navOpen, setNavOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved === 'true') {
            setDarkMode(true);
            document.body.classList.add('dark');
        }
    }, []);

    function toggleDarkMode() {
        const next = !darkMode;
        setDarkMode(next);
        document.body.classList.toggle('dark', next);
        localStorage.setItem('darkMode', String(next));
    }

    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                {/* Sitewide defaults — pages override with their own <Head> tags */}
                <meta key="og:image" property="og:image" content={DEFAULT_OG_IMAGE} />
                <meta key="og:description" property="og:description" content={DEFAULT_DESCRIPTION} />
                <meta property="twitter:card" content="summary_large_image" />
                {home && (
                    <meta key="og:title" property="og:title" content={siteTitle} />
                )}
                {project && (
                    <meta key="og:title" property="og:title" content={`Projects | ${siteTitle}`} />
                )}
                {experience && (
                    <meta key="og:title" property="og:title" content={`Experience | ${siteTitle}`} />
                )}
                {blog && (
                    <meta key="og:title" property="og:title" content={`Blog | ${siteTitle}`} />
                )}
                {newsletter && (
                    <meta key="og:title" property="og:title" content={`Newsletter | ${siteTitle}`} />
                )}
                <JsonLd data={PERSON_SCHEMA} />
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
                    <button
                        className={styles.navThemeToggle}
                        onClick={toggleDarkMode}
                        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </nav>
                {!home && (
                    <header className={`${styles.header}`}>
                        {postData && (
                            <>
                                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                                <br></br>
                                <div className={utilStyles.lightText}>
                                    {postData.reading_time} min read
                                </div>
                            </>
                        )}
                    </header>
                )}
                <main className={styles.contentContainer}>{children}</main>
                {!home && (
                    <footer className={styles.pageFooter}>
                        <small>© Eric Lee {new Date().getFullYear()}</small>
                    </footer>
                )}
            </div>
        </div>
    )
}
