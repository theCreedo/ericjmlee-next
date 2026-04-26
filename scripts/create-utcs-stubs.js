#!/usr/bin/env node
/**
 * Fetches each UT CS Blog post from the Wayback Machine and creates stub .md files.
 * Post slugs collected from Eric's author page (blog/13307, pages 1-3).
 *
 * Stubs have unpublished: true until titles/dates/descriptions are confirmed.
 * Run this after verifying the slugs belong to Eric.
 *
 * Usage:
 *   node scripts/create-utcs-stubs.js          (dry run)
 *   node scripts/create-utcs-stubs.js --write  (write files to posts/)
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const POSTS_DIR = path.join(__dirname, '..', 'posts')
const DRY_RUN = !process.argv.includes('--write')
const WAYBACK_TS = '20190921213508'
const BASE = `https://web.archive.org/web/${WAYBACK_TS}/https://www.cs.utexas.edu/blog`

const SLUGS = [
  '3-reasons-why-python-java',
  'busy-reflection',
  'ending-happy-note',
  'entrepreneurship-life-update',
  'final-lessons-thoughts',
  'finishing-sophomore-slump',
  'food-and-swag-matters',
  'free-food',
  'hack-life',
  'hack-tech-organizer-life',
  'hackathon-craze-0',
  'hackathon-transformation',
  'help-i-can-do-it-myself',
  'how-hackathon',
  'importance-mental-health',
  'intentional-recruiting',
  'interview-shenanigans',
  'it-gets-better-part-2',
  'learned-teaching',
  'letter-yourself-take-break',
  'new-season-new-me',
  'not-my-problem',
  'out-my-field',
  'overloaded-decisions',
  'perfect-language',
  'procrastinationthoughts',
  'reflection',
  'run-strong',
  'software-crisis',
  'stress-free-or-free-stress',
  'whats-doc',
  'whats-your-vision',
]

if (DRY_RUN) console.log('DRY RUN — pass --write to save files\n')

function fetch(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 15000 }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject)
      }
      let body = ''
      res.on('data', (c) => (body += c))
      res.on('end', () => resolve({ status: res.statusCode, body }))
      res.on('error', reject)
    })
    req.on('error', reject)
    req.on('timeout', () => { req.destroy(); reject(new Error('timeout')) })
  })
}

function extractTitle(html) {
  const patterns = [
    /<h1[^>]*class="[^"]*page-header[^"]*"[^>]*>([\s\S]*?)<\/h1>/i,
    /<h1[^>]*>([\s\S]*?)<\/h1>/i,
    /<title>([^<]+)<\/title>/i,
  ]
  for (const re of patterns) {
    const m = html.match(re)
    if (m) {
      return m[1].replace(/<[^>]+>/g, '').replace(/\s*[|–—].*$/, '').trim()
    }
  }
  return ''
}

function extractDate(html) {
  // Drupal-style: <span class="date-display-single">October 14, 2016</span>
  const m = html.match(/<span[^>]*class="[^"]*date[^"]*"[^>]*>([^<]+)<\/span>/)
    || html.match(/(\w+ \d+,\s*\d{4})/)
  if (!m) return ''
  const d = new Date(m[1])
  if (isNaN(d)) return ''
  return d.toISOString().slice(0, 10)
}

function slugToId(slug) {
  return 'utcs-blog-' + slug
}

function escapeFm(str) {
  return str.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
}

async function run() {
  let written = 0
  let skipped = 0

  for (const slug of SLUGS) {
    const waybackUrl = `${BASE}/${slug}`
    let title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    let date = ''

    try {
      const { status, body } = await fetch(waybackUrl)
      if (status === 200) {
        const extracted = extractTitle(body)
        if (extracted) title = extracted
        date = extractDate(body)
      } else {
        console.warn(`  HTTP ${status}: ${slug}`)
      }
    } catch (e) {
      console.warn(`  Fetch error (${e.message}): ${slug}`)
      skipped++
    }

    if (!date) {
      // Fall back to a placeholder — user will fill in during catalog review
      date = '2017-01-01'
      console.warn(`  No date found for ${slug}, using placeholder`)
    }

    const id = slugToId(slug)
    const frontmatter = [
      '---',
      `title: "${escapeFm(title)}"`,
      `date: '${date}'`,
      `era: early`,
      `original_link: "${waybackUrl}"`,
      `description: ""`,
      `topics: []`,
      `unpublished: true`,
      '---',
    ].join('\n')

    const outPath = path.join(POSTS_DIR, `${id}.md`)

    if (DRY_RUN) {
      console.log(`  [dry] ${id}.md`)
      console.log(`         "${title}" — ${date}`)
      console.log(`         ${waybackUrl}`)
    } else {
      fs.writeFileSync(outPath, frontmatter + '\n', 'utf8')
      console.log(`  wrote ${id}.md — "${title}"`)
      written++
    }
  }

  console.log(`\nDone. ${DRY_RUN ? `${SLUGS.length} stubs (dry run)` : `${written} written, ${skipped} skipped`}`)
}

run().catch((err) => { console.error(err); process.exit(1) })
