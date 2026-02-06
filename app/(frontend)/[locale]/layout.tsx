import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@payload-config'
import React from 'react'

import { DefaultLocale } from '@constants';
import { DefaultLayout } from '@templates'
import { manrope, nunito } from '@fonts'
import { ChildrenProps } from '@types';
import { User } from '@payload-types'

import { cn } from '@utils'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

import '@styles/styles.css'

type LayoutProps = ChildrenProps & {
  params: Promise<{
    locale: DefaultLocale
  }>
}

export default async function RootLayout({ params, children }: LayoutProps) {
  const { locale } = await params
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  return (
    <html lang={locale} data-scroll-behavior={'smooth'}>
      <body className={cn(manrope.className, nunito.variable, 'grid grid-cols-1 grid-rows-[auto_1fr_auto] min-h-screen')}>
        <DefaultLayout user={user as User}>
          {children}
        </DefaultLayout>
      </body>
    </html>
  )
}
