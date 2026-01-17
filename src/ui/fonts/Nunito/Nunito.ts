import { Nunito } from 'next/font/google'

export const nunito = Nunito({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700', '800', '900'],
    variable: '--font-nunito',
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
    fallback: ['system-ui', 'sans-serif'],
})