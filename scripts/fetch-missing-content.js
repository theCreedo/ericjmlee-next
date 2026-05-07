/**
 * fetch-missing-content.js
 *
 * Fetches post body content from original URLs and writes it into the local .md files.
 * Only updates posts whose body is empty (< 50 chars after frontmatter).
 *
 * Usage:
 *   node scripts/fetch-missing-content.js --dry-run           # list what would be fetched
 *   node scripts/fetch-missing-content.js --source=substack   # only substack posts
 *   node scripts/fetch-missing-content.js --source=utblog     # only UT CS blog (Wayback)
 *   node scripts/fetch-missing-content.js --source=wordpress  # only WordPress posts
 *   node scripts/fetch-missing-content.js                     # all sources
 */

'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const cheerio = require('cheerio');
const TurndownService = require('turndown');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const DRY_RUN = process.argv.includes('--dry-run');
const SOURCE_ARG = (process.argv.find((a) => a.startsWith('--source=')) || '').replace('--source=', '') || 'all';

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
td.remove(['script', 'style', 'noscript', 'iframe', 'figure > figcaption']);

// ─── helpers ───────────────────────────────────────────────────────────────

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ericjmlee-content-fetcher/1.0)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ericjmlee-content-fetcher/1.0)' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function htmlToMarkdown(html) {
  return td.turndown(html).trim();
}

function writeContent(filePath, parsed, markdown) {
  const updated = matter.stringify('\n' + markdown + '\n', parsed.data);
  fs.writeFileSync(filePath, updated);
}

// ─── find empty posts ───────────────────────────────────────────────────────

function getEmptyPosts() {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  return files.reduce((acc, file) => {
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    if (parsed.content.trim().length >= 50) return acc;
    const link = parsed.data.original_link || '';
    if (!link) return acc;

    let source;
    if (link.includes('substack.com')) source = 'substack';
    else if (link.includes('outsidethe9to5life.wordpress.com')) source = 'wordpress';
    else if (link.includes('web.archive.org') || link.includes('cs.utexas.edu')) source = 'utblog';
    else return acc;

    acc.push({ slug: file.replace('.md', ''), filePath, parsed, link, source });
    return acc;
  }, []);
}

// ─── substack ───────────────────────────────────────────────────────────────

async function fetchSubstackAll(subdomain) {
  const posts = [];
  let offset = 0;
  while (true) {
    const url = `https://${subdomain}.substack.com/api/v1/posts?limit=50&offset=${offset}`;
    console.log(`  Fetching Substack API: ${url}`);
    const data = await fetchJson(url);
    if (!Array.isArray(data) || data.length === 0) break;
    posts.push(...data);
    if (data.length < 50) break;
    offset += 50;
  }
  return posts;
}

async function fillSubstack(emptyPosts) {
  const substackPosts = emptyPosts.filter((p) => p.source === 'substack');
  if (substackPosts.length === 0) return;

  const subdomainMatch = substackPosts[0].link.match(/https?:\/\/([^.]+)\.substack\.com/);
  if (!subdomainMatch) { console.log('  Could not determine Substack subdomain'); return; }
  const subdomain = subdomainMatch[1];

  let apiPosts;
  try {
    apiPosts = await fetchSubstackAll(subdomain);
  } catch (err) {
    console.log(`  Substack API failed: ${err.message}`);
    return;
  }

  const bySlug = {};
  apiPosts.forEach((p) => { if (p.slug) bySlug[p.slug] = p; });

  let filled = 0, skipped = 0, failed = 0;
  for (const post of substackPosts) {
    const slugMatch = post.link.match(/\/p\/([^/?#]+)/);
    if (!slugMatch) { skipped++; continue; }
    const substackSlug = slugMatch[1];
    const apiPost = bySlug[substackSlug];

    if (!apiPost) {
      console.log(`  [SKIP] ${post.slug} — not found in API (slug: ${substackSlug})`);
      skipped++;
      continue;
    }

    const html = apiPost.body_html || '';
    if (!html.trim()) { console.log(`  [SKIP] ${post.slug} — empty body_html`); skipped++; continue; }

    const markdown = htmlToMarkdown(html);
    if (DRY_RUN) {
      console.log(`  [DRY] ${post.slug} — ${markdown.length} chars from Substack API`);
    } else {
      writeContent(post.filePath, post.parsed, markdown);
      console.log(`  [OK]  ${post.slug} — ${markdown.length} chars`);
    }
    filled++;
  }
  console.log(`  Substack: ${filled} filled, ${skipped} skipped, ${failed} failed`);
}

// ─── wordpress ───────────────────────────────────────────────────────────────

async function fillWordPress(emptyPosts) {
  const wpPosts = emptyPosts.filter((p) => p.source === 'wordpress');
  if (wpPosts.length === 0) return;

  const siteMatch = wpPosts[0].link.match(/https?:\/\/([^/]+)/);
  if (!siteMatch) return;
  const site = siteMatch[1];

  let filled = 0, skipped = 0, failed = 0;
  let page = 1;
  const apiPosts = [];

  while (true) {
    try {
      const url = `https://public-api.wordpress.com/rest/v1.1/sites/${site}/posts/?number=100&page=${page}`;
      console.log(`  Fetching WP API page ${page}: ${url}`);
      const data = await fetchJson(url);
      if (!data.posts || data.posts.length === 0) break;
      apiPosts.push(...data.posts);
      if (data.posts.length < 100) break;
      page++;
    } catch (err) {
      console.log(`  WP API page ${page} failed: ${err.message}`);
      break;
    }
  }

  const bySlug = {};
  apiPosts.forEach((p) => { if (p.slug) bySlug[p.slug] = p; });

  for (const post of wpPosts) {
    const slugMatch = post.link.match(/\/([^/?#]+)\/?$/);
    if (!slugMatch) { skipped++; continue; }
    const wpSlug = slugMatch[1];
    const apiPost = bySlug[wpSlug];

    if (!apiPost) {
      console.log(`  [SKIP] ${post.slug} — not found (slug: ${wpSlug})`);
      skipped++;
      continue;
    }

    const html = apiPost.content || '';
    if (!html.trim()) { skipped++; continue; }

    const markdown = htmlToMarkdown(html);
    if (DRY_RUN) {
      console.log(`  [DRY] ${post.slug} — ${markdown.length} chars from WP API`);
    } else {
      writeContent(post.filePath, post.parsed, markdown);
      console.log(`  [OK]  ${post.slug} — ${markdown.length} chars`);
    }
    filled++;
  }
  console.log(`  WordPress: ${filled} filled, ${skipped} skipped, ${failed} failed`);
}

// ─── ut blog (wayback machine) ───────────────────────────────────────────────

const WAYBACK_SELECTORS = [
  '.field-name-body .field-item',
  '.field-items .field-item',
  'article .node-content',
  '.node-content',
  'article',
  'main',
];

async function fillUtBlog(emptyPosts) {
  const utPosts = emptyPosts.filter((p) => p.source === 'utblog');
  if (utPosts.length === 0) return;

  let filled = 0, skipped = 0, failed = 0;

  for (const post of utPosts) {
    await sleep(1200);
    try {
      console.log(`  Fetching: ${post.link}`);
      const html = await fetchText(post.link);
      const $ = cheerio.load(html);

      // Remove Wayback Machine toolbar
      $('#wm-ipp-base, #wm-ipp, .wb-autocomplete-suggestion').remove();

      let content = '';
      for (const sel of WAYBACK_SELECTORS) {
        const el = $(sel).first();
        if (el.length && el.text().trim().length > 100) {
          content = el.html() || '';
          break;
        }
      }

      if (!content) {
        console.log(`  [SKIP] ${post.slug} — could not find content element`);
        skipped++;
        continue;
      }

      const markdown = htmlToMarkdown(content);
      if (DRY_RUN) {
        console.log(`  [DRY] ${post.slug} — ${markdown.length} chars from Wayback`);
      } else {
        writeContent(post.filePath, post.parsed, markdown);
        console.log(`  [OK]  ${post.slug} — ${markdown.length} chars`);
      }
      filled++;
    } catch (err) {
      console.log(`  [FAIL] ${post.slug} — ${err.message}`);
      failed++;
    }
  }
  console.log(`  UT Blog: ${filled} filled, ${skipped} skipped, ${failed} failed`);
}

// ─── main ───────────────────────────────────────────────────────────────────

async function main() {
  const all = getEmptyPosts();
  const bySource = { substack: 0, wordpress: 0, utblog: 0 };
  all.forEach((p) => { bySource[p.source] = (bySource[p.source] || 0) + 1; });

  console.log(`\nEmpty posts found: ${all.length}`);
  console.log(`  substack: ${bySource.substack}  wordpress: ${bySource.wordpress}  utblog: ${bySource.utblog}`);
  if (DRY_RUN) console.log('  (dry run — no files will be written)\n');
  else console.log('');

  const toFetch = SOURCE_ARG === 'all'
    ? all
    : all.filter((p) => p.source === SOURCE_ARG);

  if (toFetch.length === 0) {
    console.log('Nothing to fetch for the given --source filter.');
    return;
  }

  if (SOURCE_ARG === 'all' || SOURCE_ARG === 'substack') {
    console.log('── Substack ──');
    await fillSubstack(toFetch);
    console.log('');
  }

  if (SOURCE_ARG === 'all' || SOURCE_ARG === 'wordpress') {
    console.log('── WordPress ──');
    await fillWordPress(toFetch);
    console.log('');
  }

  if (SOURCE_ARG === 'all' || SOURCE_ARG === 'utblog') {
    console.log('── UT Blog (Wayback) ──');
    await fillUtBlog(toFetch);
    console.log('');
  }

  console.log('Done.');
}

main().catch((err) => { console.error(err); process.exit(1); });
