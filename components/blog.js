import utilStyles from '../styles/utils.module.css'
import Date from './date'
import Link from 'next/link'
import LazyLoad from 'react-lazyload';

export default function BlogItem({ id, date, title, description, image_link, image_alt, unpublished }) {
    return (unpublished ? <></> :
        <li className={utilStyles.listItem} key={id}>
            <Link href="/blog/[id]" as={`/blog/${id}`}>
                <a>{title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
                <Date dateString={date} isPost={true} />
            </small>
            {image_link ?
                <LazyLoad>
                    <Link href="/blog/[id]" as={`/blog/${id}`}>
                        <a><img src={image_link} alt={image_alt}></img></a>
                    </Link>
                </LazyLoad>
                : <></>}
            <br />
            {description}
            <br />
            <small><Link href="/blog/[id]" as={`/blog/${id}`}>
                <a>Read More</a>
            </Link></small>
        </li>)
}

