import { confirmSubscriber } from '../../../lib/newsletter'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()

  const { token } = req.query
  if (!token) return res.redirect(302, '/newsletter?error=invalid')

  try {
    const subscriber = await confirmSubscriber(token)
    if (!subscriber) return res.redirect(302, '/newsletter?error=invalid')
    return res.redirect(302, '/newsletter?confirmed=1')
  } catch (err) {
    console.error('[newsletter/confirm]', err)
    return res.redirect(302, '/newsletter?error=server')
  }
}
