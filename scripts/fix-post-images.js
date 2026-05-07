'use strict';

/**
 * fix-post-images.js
 *
 * Task 1 — Substack/newsletter posts:
 *   - Unwrap images nested in link syntax: [\n\n![](url)\n\n](url) → ![alt](url)
 *   - Remove Savvy Saturdays branded images (600x200, 1200x81, 1500x500 in URL)
 *   - Update frontmatter image_link + image_alt with first stock image found
 *
 * Task 2 — UTCS blog posts (utcs-blog-*.md):
 *   - Remove "Submitted by Eric Lee on..." timestamp line
 *   - Remove everything from "Tags:" to end of file (tags, links, comments, form)
 *   - Update frontmatter image_link + image_alt from standalone image
 *
 * Usage:
 *   node scripts/fix-post-images.js            # dry run — shows changes, no writes
 *   node scripts/fix-post-images.js --apply    # writes changes to files
 */

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const APPLY = process.argv.includes('--apply');

// Savvy Saturdays branded image dimension patterns
const SAVVY_DIMS = ['_600x200.', '_1200x81.', '_1500x500.'];

function isSavvy(url) {
  return SAVVY_DIMS.some(d => url.includes(d));
}

// Regex: [ \n \n ![alt](inner-url) \n ... \n ](outer-url)
const WRAPPED_IMG_RE = /\[[ \t]*\n[ \t]*\n[ \t]*!\[([^\]]*)\]\(([^\n)]+)\)[ \t]*\n(?:[ \t]*\n)*[ \t]*\]\([^\n)]+\)/g;

// Photo attribution: "Photo by [Name](url) on [Unsplash](url)"
const ATTR_RE = /^\n{0,3}(Photo by \[([^\]]+)\][^\n]* on \[Unsplash\][^\n]*)\n?/;

function processSubstackPost(content, postTitle) {
  const matches = [...content.matchAll(WRAPPED_IMG_RE)];
  if (matches.length === 0) return { content, firstImageUrl: null, firstImageAlt: null };

  const ops = [];
  let firstImageUrl = null;
  let firstImageAlt = null;

  for (const match of matches) {
    const [fullMatch, , imgUrl] = match;
    const startIdx = match.index;
    const endIdx = startIdx + fullMatch.length;
    const afterBlock = content.slice(endIdx);

    if (isSavvy(imgUrl)) {
      ops.push({ start: startIdx, end: endIdx, replacement: '' });
    } else {
      const attrMatch = afterBlock.match(ATTR_RE);
      const altText = attrMatch ? `Photo by ${attrMatch[2]} on Unsplash` : postTitle;

      if (!firstImageUrl) {
        firstImageUrl = imgUrl;
        firstImageAlt = altText;
      }
      ops.push({ start: startIdx, end: endIdx, replacement: `![${altText}](${imgUrl})` });
    }
  }

  // Apply from end to start to preserve indices
  ops.sort((a, b) => b.start - a.start);
  let result = content;
  for (const op of ops) {
    result = result.slice(0, op.start) + op.replacement + result.slice(op.end);
  }

  // Collapse 3+ consecutive blank lines down to 2
  result = result.replace(/\n{4,}/g, '\n\n\n');

  return { content: result, firstImageUrl, firstImageAlt };
}

function processUtcsPost(content, postTitle) {
  let result = content;

  // Remove "Submitted by Eric Lee on ..." line (and following blank line)
  result = result.replace(/^Submitted by Eric Lee on [^\n]+\n(\n)?/m, '');

  // Remove from "Tags: " to end of file (Tags: may have non-breaking space U+00A0 after colon)
  const tagsIdx = result.search(/^Tags:/m);
  if (tagsIdx !== -1) {
    result = result.slice(0, tagsIdx).trimEnd() + '\n';
  }

  // Extract first image URL and alt text from standalone image
  // Matches: ![](url), ![alt](url), or ![](url "title")
  const imgMatch = result.match(/!\[([^\]]*)\]\(([^\n)"]+)(?:\s+"([^"]+)")?\)/);
  let firstImageUrl = null;
  let firstImageAlt = null;

  if (imgMatch) {
    firstImageUrl = imgMatch[2];
    const inlineTitle = imgMatch[3];
    if (inlineTitle) {
      firstImageAlt = inlineTitle;
    } else {
      // Check for blockquote caption on next line after the image
      const afterImg = result.slice(result.indexOf(imgMatch[0]) + imgMatch[0].length);
      const captionMatch = afterImg.match(/^\n{0,2}> ([^\n]+)/);
      firstImageAlt = captionMatch ? captionMatch[1] : postTitle;
    }
  }

  return { content: result, firstImageUrl, firstImageAlt };
}

function processFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const { data: fm, content } = parsed;

  const postTitle = fm.title || path.basename(filePath, '.md');
  const filename = path.basename(filePath);
  const isUtcs = filename.startsWith('utcs-blog-');

  let newContent, firstImageUrl, firstImageAlt;

  if (isUtcs) {
    ({ content: newContent, firstImageUrl, firstImageAlt } = processUtcsPost(content, postTitle));
  } else {
    ({ content: newContent, firstImageUrl, firstImageAlt } = processSubstackPost(content, postTitle));
  }

  const contentChanged = newContent !== content;

  // Update frontmatter only if currently empty
  const fmChanged =
    firstImageUrl &&
    (!fm.image_link || fm.image_link === '') &&
    (!fm.image_alt || fm.image_alt === '');

  if (!contentChanged && !fmChanged) return null;

  const newFm = { ...fm };
  if (fmChanged) {
    newFm.image_link = firstImageUrl;
    newFm.image_alt = firstImageAlt || postTitle;
  }

  const newRaw = matter.stringify(newContent, newFm);
  return { filePath, oldRaw: raw, newRaw, contentChanged, fmChanged, firstImageUrl, firstImageAlt };
}

function main() {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => path.join(POSTS_DIR, f));

  let changed = 0;
  let skipped = 0;

  for (const filePath of files) {
    const result = processFile(filePath);
    if (!result) { skipped++; continue; }

    const filename = path.basename(filePath);
    const changes = [];
    if (result.contentChanged) changes.push('content');
    if (result.fmChanged) changes.push(`image_link → ${result.firstImageUrl?.slice(0, 60)}...`);

    console.log(`[${APPLY ? 'WRITE' : 'DRY'}] ${filename} — ${changes.join(', ')}`);
    changed++;

    if (APPLY) {
      fs.writeFileSync(filePath, result.newRaw, 'utf8');
    }
  }

  console.log(`\n${changed} file(s) would be changed, ${skipped} unchanged.`);
  if (!APPLY) console.log('Run with --apply to write changes.');
}

main();
