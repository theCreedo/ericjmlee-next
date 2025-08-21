import utilStyles from '../styles/utils.module.css'
import Date from './date'
import Link from 'next/link'
import Image from 'next/image'

export default function BlogItem({ id, date, title, description, image_link, image_alt, unpublished }) {
    return (unpublished ? <></> :
        <li className={utilStyles.listItem} key={id}>
            <Link href="/blog/[id]" as={`/blog/${id}`}>
                {title}
            </Link>
            <br />
            <small className={utilStyles.lightText}>
                <Date dateString={date} isPost={true} />
            </small>
            <Link href="/blog/[id]" as={`/blog/${id}`}>
                <Image 
                    src={image_link || 'https://picsum.photos/400/200'} 
                    alt={image_alt || 'Blog post image'} 
                    width={400} 
                    height={200}
                    style={{
                        objectFit: 'cover',
                        borderRadius: '8px'
                    }}
                />
            </Link>
            <br />
            {description}
            <br />
            <small><Link href="/blog/[id]" as={`/blog/${id}`}>
                Read More
            </Link></small>
        </li>)
}

