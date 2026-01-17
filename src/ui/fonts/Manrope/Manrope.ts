import { Manrope } from 'next/font/google'


export const manrope = Manrope({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-manrope',
    display: 'swap',
    preload: true,
    adjustFontFallback: true,
    fallback: ['system-ui', 'sans-serif'],
})