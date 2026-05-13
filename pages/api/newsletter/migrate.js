import { neon } from '@neondatabase/serverless'

// One-shot migration endpoint. Hit once, then delete this file.
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const secret = req.headers['x-send-secret'] || req.query.secret
  if (!secret || secret !== process.env.NEWSLETTER_SEND_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const sql = neon(process.env.POSTGRES_URL)

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS subscribers (
        id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email       TEXT UNIQUE NOT NULL,
        domains     TEXT[] NOT NULL DEFAULT '{general}',
        confirmed   BOOLEAN NOT NULL DEFAULT false,
        token       TEXT UNIQUE NOT NULL,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
      )
    `
    await sql`CREATE INDEX IF NOT EXISTS idx_subscribers_token ON subscribers(token)`
    await sql`CREATE INDEX IF NOT EXISTS idx_subscribers_confirmed ON subscribers(confirmed)`
    return res.status(200).json({ ok: true, message: 'subscribers table ready' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
