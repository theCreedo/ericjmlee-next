import {
  getConfirmedSubscribersByDomains,
  sanitizeDomains,
  buildNewsletterHtml,
  sendNewsletterToSubscriber,
  generateEmailDraft,
} from '../../../lib/newsletter'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const secret = req.headers['x-send-secret'] || req.body?.secret
  if (!secret || secret !== process.env.NEWSLETTER_SEND_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { domains, subject, body, readUrl, dryRun, generateDraft, post } = req.body

  // Draft generation only — returns the draft without sending
  if (generateDraft && post) {
    try {
      const draft = await generateEmailDraft(post)
      return res.status(200).json({ draft })
    } catch (err) {
      console.error('[newsletter/send] draft generation', err)
      return res.status(500).json({ error: 'Draft generation failed' })
    }
  }

  if (!subject || !body) {
    return res.status(400).json({ error: 'subject and body are required' })
  }

  const selectedDomains = sanitizeDomains(domains || ['general'])
  const domainLabel = selectedDomains.map(d =>
    ({ work: 'WORK', cards: 'CARDS', faith: 'FAITH', studio: 'STUDIO', general: 'General' }[d] || d.toUpperCase())
  ).join(' · ')

  const html = buildNewsletterHtml({
    domainLabel,
    subject,
    body,
    readUrl: readUrl || null,
    unsubUrl: '{{UNSUBSCRIBE_URL}}',
  })

  if (dryRun) {
    return res.status(200).json({ dryRun: true, subject, domainLabel, html })
  }

  try {
    const subscribers = await getConfirmedSubscribersByDomains(selectedDomains)
    let sent = 0
    let failed = 0

    for (const sub of subscribers) {
      try {
        await sendNewsletterToSubscriber({ email: sub.email, token: sub.token, subject, html })
        sent++
      } catch (err) {
        console.error('[newsletter/send] failed for', sub.email, err)
        failed++
      }
    }

    return res.status(200).json({ sent, failed, total: subscribers.length })
  } catch (err) {
    console.error('[newsletter/send]', err)
    return res.status(500).json({ error: 'Send failed' })
  }
}
