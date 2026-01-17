"use client"

import { Header, Footer } from '@organisms'
import { ToastProvider } from '@providers'
interface DefaultLayoutProps {
    children: React.ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
    return (
        <ToastProvider>
            <Header />
            <main className='py-[64px]'>
                {children}
            </main>
            <Footer />
        </ToastProvider>
    )
}