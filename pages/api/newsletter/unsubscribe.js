import { unsubscribeByToken } from '../../../lib/newsletter'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { token } = req.query
  if (!token) return res.redirect(302, '/newsletter?error=invalid')

  try {
    await unsubscribeByToken(token)
    return res.redirect(302, '/newsletter?unsubscribed=1')
  } catch (err) {
    console.error('[newsletter/unsubscribe]', err)
    return res.redirect(302, '/newsletter?error=server')
  }
}
