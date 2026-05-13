#!/usr/bin/env node
/**
 * One-time migration: creates the subscribers table.
 * Run once after provisioning Neon Postgres in the Vercel dashboard.
 *
 * Usage:
 *   POSTGRES_URL="postgresql://..." node scripts/migrate-newsletter.js
 *
 * Or with .env.local loaded (requires dotenv):
 *   npx dotenv -e .env.local -- node scripts/migrate-newsletter.js
 */

import { neon } from '@neondatabase/serverless'

const url = process.env.POSTGRES_URL
if (!url) {
  console.error('POSTGRES_URL is not set')
  process.exit(1)
}

const sql = neon(url)

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

console.log('Migration complete: subscribers table is ready.')
