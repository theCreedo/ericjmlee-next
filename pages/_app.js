import '../styles/global.css'
import '../styles/tokens.css'
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
  return (
    <div className={fontClasses}>
      <Component {...pageProps} />
      <SpeedInsights />
      <Analytics />
    </div>
  )
}
