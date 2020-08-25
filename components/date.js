import { parseISO, format } from 'date-fns'

export default function Date({ dateString, isPost }) {
    const dateFormat = isPost ? 'LLLL d, yyyy' : 'LLLL yyyy'
    const date = parseISO(dateString)
    return <time dateTime={dateString}>{format(date, dateFormat)}</time>
}