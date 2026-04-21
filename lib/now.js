import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const nowFile = path.join(process.cwd(), 'content', 'now.md')

export async function getNowData() {
  const fileContents = fs.readFileSync(nowFile, 'utf8')
  const { data, content } = matter(fileContents)
  const processedContent = await remark().use(remarkHtml).process(content)
  return {
    updatedAt: data.updated_at || '',
    contentHtml: processedContent.toString(),
  }
}
