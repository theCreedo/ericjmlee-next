import { getSortedPostsData } from '../lib/posts'

const BASE = 'https://ericjmlee.com'

function escapeXml(str) {
  if (!str) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function toPubDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr + 'T00:00:00Z').toUTCString()
}

export default function Rss() {
  return null
}

export async function getServerSideProps({ res }) {
  const posts = getSortedPostsData().filter((p) => p.title && p.date)

  const items = posts.map((p) => `  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${BASE}/blog/${p.id}</link>
    <guid isPermaLink="true">${BASE}/blog/${p.id}</guid>
    <pubDate>${toPubDate(p.date)}</pubDate>${p.description ? `\n    <description>${escapeXml(p.description)}</description>` : ''}
  </item>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Eric Lee</title>
    <link>${BASE}</link>
    <description>Writing by Eric Lee — developer advocate, TCG judge, church leader, and writer.</description>
    <language>en-us</language>
    <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

  res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  res.write(xml)
  res.end()

  return { props: {} }
}
