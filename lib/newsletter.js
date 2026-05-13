import { neon } from '@neondatabase/serverless'
import { Resend } from 'resend'
import Anthropic from '@anthropic-ai/sdk'
import { randomUUID } from 'crypto'

const SITE_URL = 'https://ericjmlee.com'
const FROM_EMAIL = 'Eric Lee <hello@ericjmlee.com>'

const DOMAIN_LABELS = {
  work: 'WORK',
  cards: 'CARDS',
  faith: 'FAITH',
  studio: 'STUDIO',
  general: 'General',
}

const VALID_DOMAINS = ['work', 'cards', 'faith', 'studio', 'general']

export function sanitizeDomains(raw) {
  const selected = (Array.isArray(raw) ? raw : [raw]).filter(d => VALID_DOMAINS.includes(d))
  return selected.length ? selected : ['general']
}

function db() {
  return neon(process.env.POSTGRES_URL)
}

function resend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function upsertSubscriber(email, domains) {
  const sql = db()
  const token = randomUUID()
  const result = await sql`
    INSERT INTO subscribers (email, domains, token, confirmed)
    VALUES (${email}, ${domains}, ${token}, false)
    ON CONFLICT (email) DO UPDATE
      SET domains = EXCLUDED.domains,
          token = EXCLUDED.token,
          confirmed = false
    RETURNING id, token
  `
  return result[0]
}

export async function confirmSubscriber(token) {
  const sql = db()
  const newToken = randomUUID()
  const result = await sql`
    UPDATE subscribers
    SET confirmed = true, token = ${newToken}
    WHERE token = ${token} AND confirmed = false
    RETURNING id, email, domains, token
  `
  return result[0] || null
}

export async function unsubscribeByToken(token) {
  const sql = db()
  const result = await sql`
    DELETE FROM subscribers WHERE token = ${token} RETURNING email
  `
  return result[0] || null
}

export async function getConfirmedSubscribersByDomains(domains) {
  const sql = db()
  if (domains.includes('general')) {
    return sql`SELECT email, token FROM subscribers WHERE confirmed = true`
  }
  return sql`
    SELECT email, token FROM subscribers
    WHERE confirmed = true
    AND (domains && ${domains}::text[] OR 'general' = ANY(domains))
  `
}

function confirmationHtml(confirmUrl) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F4;">
  <div style="max-width:600px;margin:0 auto;padding:48px 24px;">
    <p style="font-family:system-ui,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#A8A29E;margin:0 0 32px;">ericjmlee.com</p>
    <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:400;color:#1C1917;margin:0 0 16px;letter-spacing:-0.01em;">One more step.</h1>
    <p style="font-family:Georgia,serif;font-size:16px;color:#57534E;line-height:1.7;margin:0 0 32px;">Confirm your subscription below. You won't hear from me until you do.</p>
    <a href="${confirmUrl}" style="display:inline-block;background:#B8860B;color:#fff;font-family:system-ui,sans-serif;font-size:13px;font-weight:600;letter-spacing:0.05em;text-decoration:none;padding:12px 24px;border-radius:3px;">Confirm subscription &rarr;</a>
    <p style="font-family:system-ui,sans-serif;font-size:11px;color:#A8A29E;margin:48px 0 0;line-height:1.6;">Didn't sign up? Ignore this — nothing will happen.</p>
  </div>
</body>
</html>`
}

export function buildNewsletterHtml({ domainLabel, subject, body, readUrl, unsubUrl }) {
  const bodyHtml = body.split('\n\n').map(p => `<p style="font-family:Georgia,serif;font-size:16px;color:#57534E;line-height:1.75;margin:0 0 20px;">${p.trim()}</p>`).join('')

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#FAF8F4;">
  <div style="max-width:600px;margin:0 auto;padding:48px 24px;">
    <p style="font-family:system-ui,sans-serif;font-size:10px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#B8860B;margin:0 0 8px;">${domainLabel}</p>
    <h1 style="font-family:Georgia,serif;font-size:26px;font-weight:400;color:#1C1917;margin:0 0 24px;letter-spacing:-0.01em;">${subject}</h1>
    ${bodyHtml}
    ${readUrl ? `<p style="margin:0 0 48px;"><a href="${readUrl}" style="font-family:Georgia,serif;font-size:16px;color:#B8860B;text-decoration:none;border-bottom:1px solid #B8860B;">Read &rarr;</a></p>` : ''}
    <hr style="border:none;border-top:1px solid #E7E5E4;margin:0 0 24px;">
    <p style="font-family:system-ui,sans-serif;font-size:11px;color:#A8A29E;margin:0;line-height:1.65;">
      You subscribed to ${domainLabel} updates on <a href="${SITE_URL}" style="color:#A8A29E;">${SITE_URL}</a>.&nbsp;&nbsp;
      <a href="${unsubUrl}" style="color:#A8A29E;">Unsubscribe &rarr;</a>
    </p>
  </div>
</body>
</html>`
}

export async function sendConfirmationEmail(email, token) {
  const confirmUrl = `${SITE_URL}/api/newsletter/confirm?token=${token}`
  return resend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Confirm your subscription — Eric Lee',
    html: confirmationHtml(confirmUrl),
  })
}

export async function sendNewsletterToSubscriber({ email, token, subject, html }) {
  const unsubUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${token}`
  const finalHtml = html.replace('{{UNSUBSCRIBE_URL}}', unsubUrl)
  return resend().emails.send({
    from: FROM_EMAIL,
    to: email,
    subject,
    html: finalHtml,
  })
}

export async function generateEmailDraft(post) {
  const client = new Anthropic()
  const topics = post.topics || []
  const domainLabel = topics.map(d => DOMAIN_LABELS[d] || d.toUpperCase()).join(' · ') || 'General'

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{
      role: 'user',
      content: `Write a short newsletter email from Eric Lee about a new post.

Post title: ${post.title}
Domain: ${domainLabel}
Description: ${post.description || '(none)'}
Topics: ${topics.join(', ') || 'general'}

Tone: warm, honest, first-person. Not marketing. 2-3 short paragraphs.
End with "[READ_LINK]" as the read-more placeholder.

Respond with JSON only: { "subject": "...", "body": "..." }
Subject under 60 chars. Body is plain text with paragraph breaks (\\n\\n between paragraphs).`,
    }],
  })

  try {
    const text = message.content[0].text
    const match = text.match(/\{[\s\S]*\}/)
    return match ? JSON.parse(match[0]) : { subject: post.title, body: text }
  } catch {
    return { subject: post.title, body: message.content[0].text }
  }
}
