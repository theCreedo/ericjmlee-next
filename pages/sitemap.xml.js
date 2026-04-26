import { getSortedPostsData } from '../lib/posts'

const BASE = 'https://ericjmlee.com'

const STATIC_PAGES = [
  { loc: '/',        priority: '1.0', changefreq: 'weekly' },
  { loc: '/work',    priority: '0.8', changefreq: 'monthly' },
  { loc: '/cards',   priority: '0.8', changefreq: 'monthly' },
  { loc: '/faith',   priority: '0.7', changefreq: 'monthly' },
  { loc: '/studio',  priority: '0.7', changefreq: 'monthly' },
  { loc: '/archive', priority: '0.7', changefreq: 'weekly' },
  { loc: '/extras',  priority: '0.5', changefreq: 'monthly' },
  { loc: '/projects',priority: '0.5', changefreq: 'monthly' },
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

  const xml = buildXml([...staticEntries, ...postEntries])

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()

  return { props: {} }
}
