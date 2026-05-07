import { getArchiveData } from './archive'

function jaccardSimilarity(a, b) {
  if (a.length === 0 && b.length === 0) return 0
  const setA = new Set(a)
  const setB = new Set(b)
  let intersection = 0
  setA.forEach((t) => { if (setB.has(t)) intersection++ })
  return intersection / new Set([...setA, ...setB]).size
}

export function getRelatedPosts(slug, count = 3) {
  const allPosts = getArchiveData()
  const current = allPosts.find((p) => p.id === slug)
  if (!current || current.topics.length === 0) return []

  return allPosts
    .filter((p) => p.id !== slug && p.topics.length > 0)
    .map((p) => ({ ...p, score: jaccardSimilarity(current.topics, p.topics) }))
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score || b.date.localeCompare(a.date))
    .slice(0, count)
    .map(({ score: _score, ...p }) => p)
}
