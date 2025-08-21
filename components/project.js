import Image from 'next/image';
import utilStyles from '../styles/utils.module.css'
import Date from './date'

export function YoutubeItem({ youtube_embed_link }) {
    return (<div className={utilStyles.iframeVideo}>
        <iframe width="560" height="315" src={youtube_embed_link} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
    </div>)
}

export default function ProjectItem({ id, start_date, title, one_liner, tech, header_link, youtube_embed_link, image_link, image_alt_text }) {
    return (<li className={utilStyles.listItem} key={id}>
        <div>
            {youtube_embed_link ?
                <YoutubeItem youtube_embed_link={youtube_embed_link} /> :
                (<a href={header_link}>
                    <Image 
                        className={utilStyles.gridImage} 
                        src={image_link || 'https://picsum.photos/500/300'} 
                        alt={image_alt_text || 'Project image'} 
                        width={500} 
                        height={300}
                        style={{
                            objectFit: 'cover',
                            borderRadius: '8px'
                        }}
                    />
                </a>)}
            <h4 className={utilStyles.headingLgProjects} >
                <a href={header_link}>
                    {title}
                </a>
            </h4>
            <small className={utilStyles.lightText}>
                <Date dateString={start_date} isPost={false} />
            </small>
        </div>
        <>{one_liner}</>
        <br />
        <small><p>Used: <i>{tech}</i></p></small>
    </li>);
}