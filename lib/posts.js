import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import remarkHtml from 'remark-html'
import { suggestTopics } from './topics'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const allPostsData = fileNames.map(fileName => {
        // Remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Merge explicit frontmatter topics with inferred topics
        const explicit = matterResult.data.topics ?? []
        const inferred = suggestTopics(matterResult.data.title || '', matterResult.data.description || '')
        const topics = [...new Set([...explicit, ...inferred])]

        // Combine the data with the id
        return {
            id,
            ...matterResult.data,
            topics,
        }
    })
    // Sort posts by date, exclude unpublished drafts
    return allPostsData
        .filter((post) => !post.unpublished)
        .sort((a, b) => {
            if (a.date < b.date) {
                return 1
            } else {
                return -1
            }
        })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory)

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getAdjacentPosts(id) {
    const sortedPosts = await getSortedPostsData();
    const currentPostIndex = sortedPosts.findIndex((element) => element.id == id);

    if (currentPostIndex === -1) {
        return { previousPost: null, nextPost: null }
    }

    const previousPost = currentPostIndex < sortedPosts.length - 1 ? sortedPosts[currentPostIndex + 1] : null;
    const nextPost = currentPostIndex > 0 ? sortedPosts[currentPostIndex - 1] : null;

    return { previousPost: previousPost || null, nextPost: nextPost || null }
}

export async function getPostData(id) {
    const fullPath = path.join(postsDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(remarkHtml)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Combine the data with the id and contentHtml
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}