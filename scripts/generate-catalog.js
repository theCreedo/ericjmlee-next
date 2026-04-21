/**
 * generate-catalog.js
 *
 * Reads all posts in /posts/*.md, extracts frontmatter metadata,
 * and outputs catalog/post-inventory.json sorted by date descending.
 *
 * Candidate topic taxonomy:
 *   faith, leadership, reflection, practice, relationships, purpose, craft
 *
 * Usage: node scripts/generate-catalog.js
 */

'use strict';

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const POSTS_DIR = path.join(__dirname, '..', 'posts');
const CATALOG_DIR = path.join(__dirname, '..', 'catalog');
const OUTPUT_FILE = path.join(CATALOG_DIR, 'post-inventory.json');

const TOPIC_KEYWORDS = {
  faith: [
    'god', 'faith', 'prayer', 'pray', 'praying', 'church', 'mission',
    'spiritual', 'jesus', 'grace', 'biblical', 'worship', 'fasting', 'fast',
    'christian', 'scripture', 'holy', 'gospel', 'bible', 'lord', 'guilt',
    'testimony', 'heart for', 'easter', 'bunny', 'resurrection',
  ],
  leadership: [
    'leader', 'leadership', 'leading', 'impact', 'inspire', 'inspired',
    'influence', 'mentor', 'authority', 'manage', 'management', 'boss',
    'candor', 'ownership', 'extreme ownership', 'success', 'achieve',
    'stand out', 'step out', 'bold',
  ],
  reflection: [
    'reflection', 'reflect', 'memory', 'memories', 'story', 'looking back',
    'journal', 'hindsight', 'experience', 'perceived', 'shooting', 'zoom',
    'tennis', 'youtube', 'family', 'grew up', 'insecur', 'self-regard',
    'low regard', 'perceived lie',
  ],
  practice: [
    'habit', 'routine', 'practice', 'process', 'skill', 'simple', 'reps',
    'productivity', 'decision', 'time management', 'know your time', 'mapping',
    'tool', 'tools', 'system', 'busy', 'quantify', 'results',
  ],
  relationships: [
    'relationship', 'friend', 'community', 'people', 'connection', 'helping',
    'give', 'giver', 'kindness', 'family', 'communication', 'social',
    'loneliness', 'lonely', 'vulnerability', 'humility', 'asking for help',
    'speak', 'isolated', 'alone',
  ],
  purpose: [
    'purpose', 'calling', 'meaning', 'direction', 'design your life', 'dream',
    'vision', 'aspiration', 'infinite', 'mindset', 'end in mind', 'values',
    'priorities', 'rest', 'advantage', 'dip', 'talent', 'heart is',
    'world seems to go', 'unfinished',
  ],
  craft: [
    'write', 'writing', 'writer', "writer's block", 'build', 'create',
    'creative', 'code', 'coding', 'website', 'hackathon', 'blog', 'project',
  ],
};

function suggestTopics(title, description) {
  const text = `${title} ${description}`.toLowerCase();
  return Object.entries(TOPIC_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => text.includes(kw)))
    .map(([topic]) => topic);
}

// Ensure catalog/ directory exists
if (!fs.existsSync(CATALOG_DIR)) {
  fs.mkdirSync(CATALOG_DIR, { recursive: true });
}

// Read all .md files from posts/
const files = fs
  .readdirSync(POSTS_DIR)
  .filter((file) => file.endsWith('.md'));

function inferSource(originalLink) {
  if (!originalLink) return 'internal';
  if (originalLink.includes('medium.com')) return 'medium';
  if (originalLink.includes('cs.utexas.edu')) return 'ut-blog';
  if (originalLink.includes('substack.com')) return 'substack';
  return 'external';
}

const inventory = files
  .map((file) => {
    const slug = file.replace(/\.md$/, '');
    const filePath = path.join(POSTS_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(raw);

    const title = data.title || '';
    const description = data.description || '';
    const originalLink = data.original_link || '';

    return {
      slug,
      title,
      date: data.date ? String(data.date).slice(0, 10) : '',
      source: inferSource(originalLink),
      original_link: originalLink,
      description,
      suggested_topics: suggestTopics(title, description),
      evergreen: false,
    };
  })
  .filter((entry) => entry.title && entry.title !== '');

// Sort by date descending (most recent first); entries with no date go last
inventory.sort((a, b) => {
  if (!a.date && !b.date) return 0;
  if (!a.date) return 1;
  if (!b.date) return -1;
  return b.date.localeCompare(a.date);
});

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(inventory, null, 2));

console.log(`Processed ${inventory.length} posts.`);
console.log(`Output written to ${OUTPUT_FILE}`);
