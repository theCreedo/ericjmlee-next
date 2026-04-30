import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export default function RawPost() {
  return null
}

export async function getServerSideProps({ params, res }) {
  const { id } = params
  const fullPath = path.join(postsDirectory, `${id}.md`)

  if (!fs.existsSync(fullPath)) {
    return { notFound: true }
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  if (data.unpublished) {
    return { notFound: true }
  }

  const lines = []
  lines.push(`# ${data.title || id}`)
  if (data.date) lines.push(`\nDate: ${String(data.date).slice(0, 10)}`)
  if (data.description) lines.push(`\n> ${data.description}`)
  lines.push('\n---\n')
  lines.push(content.trim())

  res.setHeader('Content-Type', 'text/markdown; charset=utf-8')
  res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
  res.write(lines.join('\n'))
  res.end()

  return { props: {} }
}
