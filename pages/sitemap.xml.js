import { getSortedPostsData, getAllSeries } from '../lib/posts'

const BASE = 'https://ericjmlee.com'

const ALL_TOPICS = [
  'faith', 'leadership', 'reflection', 'practice', 'relationships',
  'purpose', 'craft', 'college', 'career', 'health',
]

const STATIC_PAGES = [
  { loc: '/',        priority: '1.0', changefreq: 'weekly' },
  { loc: '/work',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/cards',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/faith',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/studio',  priority: '0.7', changefreq: 'monthly' },
  { loc: '/archive', priority: '0.7', changefreq: 'weekly' },
  { loc: '/extras',  priority: '0.5', changefreq: 'monthly' },
  { loc: '/projects',priority: '0.5', changefreq: 'monthly' },
  { loc: '/now',     priority: '0.6', changefreq: 'monthly' },
]

function buildXml(entries) {
  const urls = entries.map(({ loc, lastmod, priority, changefreq }) => `  <url>
    <loc>${loc}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`
}

export default function Sitemap() {
  return null
}

export async function getServerSideProps({ res }) {
  const posts = getSortedPostsData().filter((p) => p.title && p.date)

  const staticEntries = STATIC_PAGES.map((p) => ({
    loc: BASE + p.loc,
    priority: p.priority,
    changefreq: p.changefreq,
  }))

  const postEntries = posts.map((p) => ({
    loc: `${BASE}/blog/${p.id}`,
    lastmod: String(p.date).slice(0, 10),
    priority: '0.5',
    changefreq: 'never',
  }))

  const topicEntries = ALL_TOPICS.map((t) => ({
    loc: `${BASE}/topic/${t}`,
    priority: '0.6',
    changefreq: 'weekly',
  }))

  const seriesMap = getAllSeries()
  const seriesEntries = Object.keys(seriesMap).map((slug) => ({
    loc: `${BASE}/series/${slug}`,
    priority: '0.6',
    changefreq: 'weekly',
  }))

  const xml = buildXml([...staticEntries, ...topicEntries, ...seriesEntries, ...postEntries])

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()

  return { props: {} }
}
