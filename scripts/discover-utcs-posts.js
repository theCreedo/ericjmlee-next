#!/usr/bin/env node
/**
 * Queries the Wayback Machine CDX API for all archived cs.utexas.edu/blog/* pages
 * and filters to a candidate list for manual review.
 *
 * Author page: https://web.archive.org/web/20190921213508/https://www.cs.utexas.edu/blog/13307
 * (blog/13307 is the author profile — post IDs will be different numbers)
 *
 * Usage: node scripts/discover-utcs-posts.js
 * Output: catalog/utcs-blog-candidates.json + console summary
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const CDX_URL =
  'https://web.archive.org/cdx/search/cdx' +
  '?url=cs.utexas.edu/blog/*' +
  '&output=json' +
  '&matchType=prefix' +
  '&filter=statuscode:200' +
  '&collapse=urlkey' +
  '&fl=original,timestamp,statuscode' +
  '&limit=500'

const OUT_PATH = path.join(__dirname, '..', 'catalog', 'utcs-blog-candidates.json')

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let body = ''
      res.on('data', (c) => (body += c))
      res.on('end', () => resolve(body))
      res.on('error', reject)
    }).on('error', reject)
  })
}

async function run() {
  console.log('Querying CDX API…')
  const raw = await fetch(CDX_URL)
  const rows = JSON.parse(raw)

  if (!rows || rows.length < 2) {
    console.error('No results returned. Check CDX API URL.')
    process.exit(1)
  }

  const [header, ...data] = rows
  const origIdx = header.indexOf('original')
  const tsIdx = header.indexOf('timestamp')

  const candidates = data
    .map((row) => ({
      original: row[origIdx],
      timestamp: row[tsIdx],
      wayback: `https://web.archive.org/web/${row[tsIdx]}/${row[origIdx]}`,
    }))
    // blog post URLs are numeric IDs: /blog/12345
    .filter((r) => /\/blog\/\d+$/.test(r.original))
    // exclude the author profile page itself
    .filter((r) => !r.original.includes('/blog/13307'))

  console.log(`\nTotal blog/* entries: ${data.length}`)
  console.log(`Candidate post URLs (numeric IDs, excl. author page): ${candidates.length}`)
  console.log('\nSample (first 10):')
  candidates.slice(0, 10).forEach((c) => console.log(' ', c.wayback))

  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true })
  fs.writeFileSync(OUT_PATH, JSON.stringify(candidates, null, 2), 'utf8')
  console.log(`\nWrote ${candidates.length} candidates to ${path.relative(process.cwd(), OUT_PATH)}`)
  console.log('\nNext step: cross-reference with the author page to identify which are Eric\'s posts,')
  console.log('then run scripts/create-utcs-stubs.js with the confirmed IDs.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
