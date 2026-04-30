// Canonical topic taxonomy for ericjmlee.com.
// Ten topics inferred from post title + description at build time.
// generate-catalog.js mirrors this list (can't share directly due to CJS/ESM boundary).
// If keywords change, update BOTH files.

export const TOPIC_KEYWORDS = {
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
    'low regard', 'perceived lie', 'breaking out', 'fashion', 'journey',
  ],
  practice: [
    'habit', 'routine', 'practice', 'process', 'skill', 'simple', 'reps',
    'productivity', 'decision', 'time management', 'know your time', 'mapping',
    'tool', 'tools', 'system', 'busy', 'quantify', 'results',
    'batch', 'batching', 'root cause', 'time block', 'capacity',
  ],
  relationships: [
    'relationship', 'friend', 'community', 'people', 'connection', 'helping',
    'give', 'giver', 'kindness', 'family', 'communication', 'social',
    'loneliness', 'lonely', 'vulnerability', 'humility', 'asking for help',
    'speak', 'isolated', 'alone', 'unity', 'enneagram',
  ],
  purpose: [
    'purpose', 'calling', 'meaning', 'direction', 'design your life', 'dream',
    'vision', 'aspiration', 'infinite', 'mindset', 'end in mind', 'values',
    'priorities', 'rest', 'advantage', 'dip', 'talent', 'heart is',
    'world seems to go', 'unfinished', 'the power of why', 'freedom to learn', '3920',
  ],
  craft: [
    'write', 'writing', 'writer', "writer's block", 'build', 'create',
    'creative', 'code', 'coding', 'website', 'hackathon', 'blog', 'project',
    'work in progress',
  ],
  college: [
    'sophomore', 'junior', 'senior year', 'cs371', 'cs373', 'professor downing',
    'utcs', 'hackutd', 'hack texas',
  ],
  career: [
    'career', 'internship', 'intern', 'hiring', 'interview', 'resume',
    'job search', 'developer advocate', 'advocacy', 'startup',
    'entrepreneur', 'entrepreneurship', 'venture',
  ],
  health: [
    'health', 'fitness', 'running', 'bouldering', 'exercise', 'workout',
    'physical', 'climb', 'climbing', 'marathon', 'sport', 'athletic',
    'mental health', 'burnout',
  ],
}

export function suggestTopics(title, description) {
  const text = `${title} ${description ?? ''}`.toLowerCase()
  return Object.entries(TOPIC_KEYWORDS)
    .filter(([, keywords]) => keywords.some((kw) => text.includes(kw)))
    .map(([topic]) => topic)
}
