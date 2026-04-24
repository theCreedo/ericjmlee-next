#!/usr/bin/env node
/**
 * Imports posts from theCreedo/theCreedo.github.io by fetching raw Markdown
 * from the _posts/ directory via the GitHub API. No HTML scraping needed.
 *
 * Two class blogs at UT Austin (same professor, Dr. Downing):
 *   CS371p — OOP in C++    (Fall 2016, files starting 2016-08 through 2016-12)
 *   CS373 — SWE in Python  (Spring 2017, files starting 2017-01 through 2017-05)
 *   Personal continuation  (2017-08, one post after the semester)
 *
 * Usage:
 *   node scripts/import-github-blog.js          (dry run)
 *   node scripts/import-github-blog.js --write  (writes to posts/)
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const POSTS_DIR = path.join(__dirname, '..', 'posts')
const DRY_RUN = !process.argv.includes('--write')
const API_LIST = 'https://api.github.com/repos/theCreedo/theCreedo.github.io/contents/_posts'

if (DRY_RUN) console.log('DRY RUN — pass --write to save files\n')

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'import-script/1.0', 'Accept': 'application/vnd.github.v3+json' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject)
      }
      let body = ''
      res.on('data', (c) => (body += c))
      res.on('end', () => resolve(body))
      res.on('error', reject)
    }).on('error', reject)
  })
}

function parseDateFromFilename(filename) {
  // Format: YYYY-M-D-Title.md (M and D can be 1 or 2 digits)
  const m = filename.match(/^(\d{4})-(\d{1,2})-(\d{1,2})-/)
  if (!m) return ''
  const [, year, month, day] = m
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

function parseJekyllFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/)
  if (!m) return { title: '', body: raw }
  const fm = m[1]
  const body = m[2].trim()
  const titleMatch = fm.match(/^title:\s*["']?(.+?)["']?\s*$/m)
  const title = titleMatch ? titleMatch[1].trim() : ''
  return { title, body }
}

function classContext(dateStr) {
  const [year, month] = dateStr.split('-').map(Number)
  if (year === 2016) return 'CS371p — Object-Oriented Programming in C++ (Fall 2016), UT Austin, taught by Professor Downing'
  if (year === 2017 && month <= 5) return 'CS373 — Software Engineering in Python (Spring 2017), UT Austin, taught by Professor Downing'
  return 'Continuation of the CS371p/CS373 class blog, UT Austin'
}

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 55)
}

function escapeFm(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

function liveUrl(filename) {
  // Jekyll Now slugifies: Title-Words → title-words, strips extension
  const base = filename.replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '').replace(/\.md$/, '')
  return `https://thecreedo.github.io/${base}/`
}

async function run() {
  console.log('Fetching file list from GitHub API…')
  const listJson = await fetch(API_LIST)
  const files = JSON.parse(listJson)
  console.log(`Found ${files.length} files\n`)

  // Fetch all raw content in parallel
  console.log('Fetching all post files…')
  const rawFiles = await Promise.all(
    files.map(async (file) => {
      const content = await fetch(file.download_url)
      return { filename: file.name, content }
    })
  )

  let written = 0
  for (const { filename, content } of rawFiles) {
    const date = parseDateFromFilename(filename)
    if (!date) {
      console.warn(`  SKIP (no date in filename): ${filename}`)
      continue
    }

    const { title: fmTitle, body } = parseJekyllFrontmatter(content)
    const titleFromFilename = filename
      .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
      .replace(/\.md$/, '')
      .replace(/-/g, ' ')
    const title = fmTitle || titleFromFilename

    const context = classContext(date)
    const sourceUrl = liveUrl(filename)
    const slug = `github-blog-${date}-${slugify(title)}`

    const frontmatter = [
      '---',
      `title: "${escapeFm(title)}"`,
      `date: '${date}'`,
      `era: early`,
      `unpublished: true`,
      '---',
    ].join('\n')

    const fullBody = `${frontmatter}\n\n> ${context}. First published at [thecreedo.github.io](${sourceUrl}).\n\n${body}`
    const outPath = path.join(POSTS_DIR, `${slug}.md`)

    if (DRY_RUN) {
      console.log(`  [dry] ${slug}.md`)
      console.log(`         "${title}" — ${date}`)
    } else {
      fs.writeFileSync(outPath, fullBody, 'utf8')
      console.log(`  wrote ${slug}.md`)
      written++
    }
  }

  console.log(`\nDone. ${DRY_RUN ? `${rawFiles.length} posts (dry run)` : `${written} files written`}`)
}

run().catch((err) => { console.error(err); process.exit(1) })
