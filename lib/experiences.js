import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import remarkHtml from 'remark-html'

const experiencesDirectory = path.join(process.cwd(), 'experiences')

export function getSortedExperiencesData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(experiencesDirectory)
    const allExperiencesData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(experiencesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        const bullets = matterResult.content
            .split('\n')
            .filter(line => line.trim().startsWith('- '))
            .map(line => line.replace(/^-\s+/, '').trim())
            .filter(Boolean)

        return {
            id,
            ...matterResult.data,
            bullets,
        }
    })
    // Sort posts by date
    return allExperiencesData.sort((a, b) => {
        if (a.start_date < b.start_date) {
            return 1
        } else {
            return -1
        }
    })
}