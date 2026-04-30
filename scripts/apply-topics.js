/**
 * apply-topics.js
 *
 * Applies the 10-topic taxonomy to all post frontmatter by:
 *   1. Remapping old taxonomy tags to their 10-topic equivalents
 *   2. Merging with catalog-inferred topics (from catalog/post-inventory.json)
 *   3. Adding 'college' to any post with era: 'early'
 *   4. Filtering out any tags not in the valid 10-topic set
 *
 * Usage:
 *   node scripts/apply-topics.js           # dry run — shows changes, no writes
 *   node scripts/apply-topics.js --apply   # writes topics to frontmatter
 *
 * Run generate-catalog.js before this script to ensure the catalog is fresh.
 * Run generate-catalog.js again after --apply to refresh the catalog output.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const CATALOG_FILE = path.join(__dirname, '..', 'catalog', 'post-inventory.json');

const APPLY = process.argv.includes('--apply');

const VALID_TOPICS = new Set([
  'faith', 'leadership', 'reflection', 'practice',
  'relationships', 'purpose', 'craft',
  'college', 'career', 'health',
]);

// Old taxonomy → 10-topic mapping. null = drop the tag entirely.
const REMAP = {
  college: 'college',
  career: 'career',
  reflection: 'reflection',
  faith: 'faith',
  purpose: 'purpose',
  practice: 'practice',
  craft: 'craft',
  hackathons: 'craft',
  hackathon: 'craft',
  programming: 'craft',
  python: 'craft',
  java: 'craft',
  'mental-health': 'reflection',
  entrepreneurship: 'career',
  community: 'relationships',
  startups: 'career',
};

const catalog = JSON.parse(fs.readFileSync(CATALOG_FILE, 'utf8'));
const catalogBySlug = {};
catalog.forEach((entry) => { catalogBySlug[entry.slug] = entry; });

const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).sort();

let changed = 0;
let unchanged = 0;
const noTopics = [];

files.forEach((file) => {
  const slug = file.replace(/\.md$/, '');
  const filePath = path.join(POSTS_DIR, file);
  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);
  const data = parsed.data;

  if (!data.title) return;

  // 1. Remap existing frontmatter topics
  const existing = Array.isArray(data.topics) ? data.topics : [];
  const remapped = existing
    .map((t) => {
      if (REMAP[t] !== undefined) return REMAP[t];
      return VALID_TOPICS.has(t) ? t : null;
    })
    .filter(Boolean);

  // 2. Merge with catalog-inferred topics (already filtered to valid set by catalog script)
  const catalogEntry = catalogBySlug[slug];
  const inferred = catalogEntry
    ? (catalogEntry.topics || []).filter((t) => VALID_TOPICS.has(t))
    : [];

  // 3. era: early → always include college
  const eraTopics = data.era === 'early' ? ['college'] : [];

  // 4. Merge, filter to valid, deduplicate, sort
  const merged = [...new Set([...remapped, ...inferred, ...eraTopics])]
    .filter((t) => VALID_TOPICS.has(t))
    .sort();

  const oldSorted = JSON.stringify(existing.slice().sort());
  const newSorted = JSON.stringify(merged);

  if (oldSorted === newSorted) {
    unchanged++;
    return;
  }

  if (merged.length === 0) {
    noTopics.push({ slug, source: catalogEntry?.source || 'unknown' });
  }

  if (!APPLY) {
    console.log(`${slug}`);
    if (existing.length) console.log(`  old: [${existing.join(', ')}]`);
    console.log(`  new: [${merged.join(', ')}]`);
    changed++;
    return;
  }

  parsed.data.topics = merged;
  const updated = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(filePath, updated);
  changed++;
});

console.log('');
if (APPLY) {
  console.log(`Updated:   ${changed} posts`);
  console.log(`Unchanged: ${unchanged} posts`);
} else {
  console.log(`Would update: ${changed} posts`);
  console.log(`Unchanged:    ${unchanged} posts`);
  console.log('');
  console.log('Run with --apply to write changes.');
}

if (noTopics.length > 0) {
  console.log(`\nPosts still with no topics (${noTopics.length}):`);
  noTopics.forEach((p) => console.log(`  ${p.slug} (${p.source})`));
}
