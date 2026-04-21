import '../styles/global.css'
import '../styles/tokens.css'
import '../styles/transitions.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Cormorant_Garamond, Crimson_Pro, Space_Grotesk, DM_Mono } from 'next/font/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/next'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--f-display',
  display: 'swap',
})

const crimson = Crimson_Pro({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--f-body',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--f-ui',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--f-mono',
  display: 'swap',
})

const fontClasses = [
  cormorant.variable,
  crimson.variable,
  spaceGrotesk.variable,
  dmMono.variable,
].join(' ')

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => document.body.classList.add('page-fading')
    const handleComplete = () => setTimeout(() => document.body.classList.remove('page-fading'), 0)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router.events])

  return (
    <div className={fontClasses}>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </div>
  )
}
