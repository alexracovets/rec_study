"use client"

import { Authorization, Logo, Navigation, UserProfile } from '@molecules'
import { Container } from '@atoms'

import { User } from '@payload-types'

export const Header = ({ user }: { user: User }) => {
    console.log(user)
    return (
        <header className='bg-primary py-[16px]'>
            <Container>
                <div className='flex justify-between items-center'>
                    <Logo />
                    <Navigation />
                    {user ? <UserProfile user={user} /> : <Authorization />}
                </div>
            </Container>
        </header>
    )
}