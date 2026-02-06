"use client"

import { Header, Footer } from '@organisms'
import { ToastProvider } from '@providers'
import { User } from '@payload-types'

interface DefaultLayoutProps {
    children: React.ReactNode
    user: User
}

export const DefaultLayout = ({ children, user }: DefaultLayoutProps) => {
    return (
        <ToastProvider>
            <Header user={user} />
            <main className='py-[64px]'>
                {children}
            </main>
            <Footer />
        </ToastProvider>
    )
}