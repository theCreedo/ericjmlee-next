import { getSortedPostsData } from './posts'

function inferSource(link) {
  if (!link) return 'internal'
  if (link.includes('medium.com')) return 'medium'
  if (link.includes('cs.utexas.edu')) {
    return link.includes('web.archive.org') ? 'ut-blog-archived' : 'ut-blog'
  }
  if (link.includes('substack.com')) return 'substack'
  return 'external'
}

export function getArchiveData({ topic, year } = {}) {
  const posts = getSortedPostsData()
    .filter((post) => post.title)
    .map((post) => ({
      id: post.id,
      title: post.title,
      date: post.date ? String(post.date).slice(0, 10) : '',
      source: inferSource(post.original_link),
      original_link: post.original_link || '',
      topics: post.topics || [],
      evergreen: post.evergreen || false,
      era: post.era || null,
    }))

  return posts.filter((post) => {
    if (topic && !post.topics.includes(topic)) return false
    if (year && !post.date.startsWith(year)) return false
    return true
  })
}

export function getArchiveYears(posts) {
  const yearSet = new Set()
  posts.forEach((p) => {
    const year = p.date ? p.date.slice(0, 4) : null
    if (year) yearSet.add(year)
  })
  return Array.from(yearSet).sort((a, b) => b.localeCompare(a))
}
