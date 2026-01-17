"use client"

import { Authorization, Navigation } from '@molecules'
import { Container } from '@atoms'

export const Header = () => {
    return (
        <header className='bg-primary py-[16px]'>
            <Container>
                <div className='flex justify-between items-center'>
                    <Navigation />
                    <Authorization />
                </div>
            </Container>
        </header>
    )
}