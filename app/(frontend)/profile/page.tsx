
'use client'

import { useEffect, useState } from 'react'
import { redirect } from 'next/navigation'
type MeResponse =
    | { user: { email?: string; name?: string; picture?: string } | null }
    | { email?: string; name?: string; picture?: string }
    | null

export default function ProfilePage() {
    const [user, setUser] = useState<{ email?: string; name?: string; picture?: string } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const load = async () => {
            try {
                const res = await fetch('/api/users/me', { credentials: 'include' })
                if (!res.ok) {
                    throw new Error('Не вдалося отримати користувача')
                }

                const data = (await res.json()) as MeResponse
                const resolvedUser = data && 'user' in data ? data.user : data
                setUser(resolvedUser ?? null)
            } catch (err) {
                redirect('/login')
            } finally {
                setLoading(false)
            }
        }

        void load()
    }, [])

    if (loading) return <div>Завантаження...</div>

    return (
        <div>
            <h1>Профіль</h1>
            {user?.picture ? <img src={user.picture} alt="" width={64} height={64} /> : null}
            <div>Імʼя: {user?.name || '-'}</div>
            <div>Email: {user?.email || '-'}</div>
        </div>
    )
}