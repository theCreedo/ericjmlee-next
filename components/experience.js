import utilStyles from '../styles/utils.module.css'

export default function ExperienceItem({ id, title, start_date, end_date, location, job_title, company_url, logo_url, current }) {
    return (
        <li className={utilStyles.listItem} key={id}>
            <h1 className={utilStyles.headingMd}><a href={company_url}>{title}</a></h1>
            <small className={utilStyles.lightText}>
                <p>{current ? <><b>Current:</b></> : <></>} {job_title} @ {location}</p>
            </small>
            <img className={utilStyles.gridImage} src={logo_url} alt={title} />
        </li>);
}

