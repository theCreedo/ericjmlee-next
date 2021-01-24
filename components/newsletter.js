import utilStyles from '../styles/utils.module.css'

export default function NewsletterForm() {
    return (
        <div className={utilStyles.newsletterForm}>
            <h2 className={utilStyles.headingLg}><b>💌 Join the "Savvy Saturdays" Mailing List</b></h2>
            <div className="">
                <p>Every Saturday, I send out an issue on self-improvement, a curated collection of insightful fun resources, and tidbits of learnings, verses & quotes to chew on.</p>
                <form action="https://ericlee.substack.com/api/v1/free?nojs=true" method="post" className="form " noValidate="">
                    <input type="hidden" name="first_url" value="https://ericlee.substack.com/" />
                    <input type="hidden" name="first_referrer" value="https://substack.com/signup?oauth_token=1-MpKwAAAAAA8W84AAABb-6Z3GY" />
                    <input type="hidden" name="current_url" value="https://ericlee.substack.com/embed" />
                    <input type="hidden" name="current_referrer" value="https:///www.ericjmlee.com/newsletter" />
                    <input type="hidden" name="referral_code" />
                    <input type="hidden" name="source" value="embed" />
                    <div className={utilStyles.inputEmail}>
                        <input type="email" name="email" placeholder="Type your email..." />
                        <br />
                        <br />
                        <button className={utilStyles.buttonSubscribe} type="submit" tabIndex="0">
                            <b>Subscribe</b>
                        </button>
                    </div>
                    <div id="error-container">
                    </div>
                    <div className="subtle-help-text below-input">
                    </div>
                </form>
            </div>
        </div>);
}

