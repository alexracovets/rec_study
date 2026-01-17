import React from 'react'

import { DefaultLayout } from '@templates'
import { manrope, nunito } from '@fonts'
import { cn } from '@utils'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

import '@styles/styles.css'

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout(props: RootLayoutProps) {
  const { children } = props

  return (
    <html lang="en">
      <body className={cn(manrope.className, nunito.variable, 'grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-screen')}>
        <DefaultLayout>
          {children}
        </DefaultLayout>
      </body>
    </html>
  )
}
