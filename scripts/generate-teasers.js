/**
 * generate-teasers.js
 *
 * Phase 1 (default): Reads all posts/*.md with an empty description field,
 * calls Claude API to generate a 1-2 sentence teaser per post, and writes
 * results to catalog/teasers-draft.json for manual review.
 *
 * Phase 2 (--apply): Reads catalog/teasers-draft.json and writes approved
 * teasers back into each post's frontmatter. Only touches posts whose
 * description is still empty — never overwrites a description you've set.
 *
 * Setup (one-time):
 *   npm install @anthropic-ai/sdk
 *   export ANTHROPIC_API_KEY=sk-ant-...
 *
 * Usage:
 *   node scripts/generate-teasers.js            # generate draft
 *   node scripts/generate-teasers.js --dry-run  # preview without API calls
 *   # review catalog/teasers-draft.json, edit any teasers you want to change
 *   node scripts/generate-teasers.js --apply    # write to frontmatter
 */

'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const CATALOG_DIR = path.join(__dirname, '..', 'catalog');
const DRAFT_FILE = path.join(CATALOG_DIR, 'teasers-draft.json');

const APPLY = process.argv.includes('--apply');
const DRY_RUN = process.argv.includes('--dry-run');
const DELAY_MS = 400;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function readPosts() {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(POSTS_DIR, file);
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(raw);
      return { file, filePath, data: parsed.data, content: parsed.content };
    });
}

function needsTeaser(post) {
  const desc = post.data.description;
  return desc === '' || desc === undefined || desc === null;
}

function buildPrompt(post) {
  const { title, original_link, topics } = post.data;
  const body = post.content.trim();
  const topicLine = topics && topics.length ? `Topics: ${topics.join(', ')}` : '';

  if (body.length > 100) {
    return `Write a 1-2 sentence teaser for this blog post. Be specific to the content — not generic. Do not start with "This post" or "In this post". Return only the teaser, no quotes, no explanation.

Title: ${title}
${topicLine}

---
${body.slice(0, 3000)}
---`;
  }

  return `Write a 1-2 sentence teaser for a blog post based only on its title and metadata. Be specific — not generic. Do not start with "This post" or "In this post". Return only the teaser, no quotes, no explanation.

Title: ${title}
${topicLine}
${original_link ? `Originally published at: ${original_link}` : ''}`;
}

async function generateTeasers() {
  let AnthropicModule;
  try {
    AnthropicModule = require('@anthropic-ai/sdk');
  } catch {
    console.error('Missing dependency. Run: npm install @anthropic-ai/sdk');
    process.exit(1);
  }

  const Anthropic = AnthropicModule.default ?? AnthropicModule;
  const client = new Anthropic();

  const posts = readPosts();
  const pending = posts.filter(needsTeaser);

  console.log(`Total posts: ${posts.length}`);
  console.log(`Posts needing teasers: ${pending.length}`);
  if (DRY_RUN) console.log('(dry-run mode — no API calls)');
  console.log('');

  if (pending.length === 0) {
    console.log('Nothing to do — all posts already have descriptions.');
    return;
  }

  if (!fs.existsSync(CATALOG_DIR)) {
    fs.mkdirSync(CATALOG_DIR, { recursive: true });
  }

  const draft = [];

  for (let i = 0; i < pending.length; i++) {
    const post = pending[i];
    const slug = post.file.replace(/\.md$/, '');
    process.stdout.write(`[${i + 1}/${pending.length}] ${slug} ... `);

    if (DRY_RUN) {
      console.log('[skip]');
      draft.push({ file: post.file, slug, teaser: '' });
      continue;
    }

    try {
      const response = await client.messages.create({
        model: 'claude-haiku-4-5',
        max_tokens: 150,
        messages: [{ role: 'user', content: buildPrompt(post) }],
      });

      const teaser = response.content[0].text.trim();
      draft.push({ file: post.file, slug, teaser });
      console.log('done');
      console.log(`  ${teaser}`);
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
      draft.push({ file: post.file, slug, teaser: '', error: err.message });
    }

    if (i < pending.length - 1) await sleep(DELAY_MS);
  }

  fs.writeFileSync(DRAFT_FILE, JSON.stringify(draft, null, 2));
  console.log(`\nDraft written to catalog/teasers-draft.json`);
  console.log('Review the file, edit any teasers you want to change,');
  console.log('then run: node scripts/generate-teasers.js --apply');
}

async function applyTeasers() {
  if (!fs.existsSync(DRAFT_FILE)) {
    console.error(`Draft not found: ${DRAFT_FILE}`);
    console.error('Run without --apply first to generate the draft.');
    process.exit(1);
  }

  const draft = JSON.parse(fs.readFileSync(DRAFT_FILE, 'utf8'));
  const eligible = draft.filter((entry) => entry.teaser && !entry.error);

  console.log(`Applying ${eligible.length} teasers...`);
  if (DRY_RUN) console.log('(dry-run — no files will be written)');
  console.log('');

  let applied = 0;
  let skipped = 0;

  for (const entry of eligible) {
    const filePath = path.join(POSTS_DIR, entry.file);

    if (!fs.existsSync(filePath)) {
      console.warn(`  SKIP (file not found): ${entry.file}`);
      skipped++;
      continue;
    }

    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const currentDesc = parsed.data.description;

    if (currentDesc !== '' && currentDesc !== undefined && currentDesc !== null) {
      console.log(`  SKIP (already set): ${entry.slug}`);
      skipped++;
      continue;
    }

    parsed.data.description = entry.teaser;
    const updated = matter.stringify(parsed.content, parsed.data);

    if (!DRY_RUN) {
      fs.writeFileSync(filePath, updated);
    }

    console.log(`  ${DRY_RUN ? '[dry-run] ' : ''}APPLIED: ${entry.slug}`);
    applied++;
  }

  console.log(`\nDone. Applied: ${applied}  Skipped: ${skipped}`);
}

if (APPLY) {
  applyTeasers().catch((err) => { console.error(err); process.exit(1); });
} else {
  generateTeasers().catch((err) => { console.error(err); process.exit(1); });
}
