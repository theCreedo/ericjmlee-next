import utilStyles from '../styles/utils.module.css'

export default function NewsletterForm() {
    return (
        <div className={utilStyles.newsletterForm}>
            <iframe src="https://ericlee.substack.com/embed" width="480" height="320" frameBorder="0" scrolling="no"></iframe>
        </div>);
}

