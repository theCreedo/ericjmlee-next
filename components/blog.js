import utilStyles from '../styles/utils.module.css'
import Date from './date'
import Link from 'next/link'

export default function BlogItem({ id, date, title, unpublished }) {
    if (unpublished) return null
    return (
        <li className={utilStyles.listItem}>
            <Link href={`/blog/${id}`}>{title}</Link>
            <div className={utilStyles.lightText}>
                <Date dateString={date} isPost={true} />
            </div>
        </li>
    )
}
