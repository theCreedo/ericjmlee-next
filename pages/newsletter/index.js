import Head from 'next/head'
import Link from "next/link"
import Layout, { siteTitle } from '../../components/layout'
import utilStyles from '../../styles/utils.module.css'

export default function Newsletter() {

    return (
        <Layout newsletter>
            <Head>
                <title>{siteTitle}</title>
            </Head>

            <section className={`${utilStyles.divContainer} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}><a href="https://ericlee.substack.com/">Savvy Saturdays</a></h2>
                <div class="subscribe-widget ">
                    <form action="https://ericlee.substack.com/api/v1/free?nojs=true" method="post" class="form " noValidate="">
                        <input type="hidden" name="first_url" value="https://ericlee.substack.com/" />
                        <input type="hidden" name="first_referrer" value="https://substack.com/signup?oauth_token=1-MpKwAAAAAA8W84AAABb-6Z3GY" />
                        <input type="hidden" name="current_url" value="https://ericlee.substack.com/embed" />
                        <input type="hidden" name="current_referrer" value="http://localhost:3000/newsletter" />
                        <input type="hidden" name="referral_code" />
                        <input type="hidden" name="source" value="embed" />
                        <div class="sideBySideWrap">
                            <input type="email" name="email" placeholder="Type your email…" />
                            <button class="button rightButton primary subscribe-btn " type="submit" tabIndex="0">
                                <b>Subscribe</b>
                            </button>
                        </div>
                        <div id="error-container">
                        </div>
                        <div class="subtle-help-text below-input">
                        </div>
                    </form>
                </div>

                <Link href='/'><a>← Back to Home</a></Link>
            </section>
        </Layout >
    )
}