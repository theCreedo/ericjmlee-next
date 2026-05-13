import { upsertSubscriber, sanitizeDomains, sendConfirmationEmail } from '../../../lib/newsletter'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()

  const { email, domains } = req.body

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' })
  }

  const selectedDomains = sanitizeDomains(domains)

  let subscriber
  try {
    subscriber = await upsertSubscriber(email.toLowerCase().trim(), selectedDomains)
  } catch (err) {
    console.error('[newsletter/subscribe] db', err)
    return res.status(500).json({ error: 'Could not subscribe. Try again.' })
  }

  try {
    await sendConfirmationEmail(email.toLowerCase().trim(), subscriber.token)
  } catch (err) {
    console.error('[newsletter/subscribe] email', err)
  }

  return res.status(200).json({ ok: true })
}
