"use client"

import { User } from '@payload-types'

export const UserProfile = ({ user }: { user: User }) => {
 
    return (
        <div>
            <h1>{user.email}</h1>
        </div>
    )
}