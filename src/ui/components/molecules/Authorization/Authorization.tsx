"use client"

import { useRouter } from "next/navigation";

import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";
import { Button } from '@atoms'

export const Authorization = () => {
    const router = useRouter();

    return (
        <div className="flex items-center gap-x-[16px]">
            <Button variant="login" onClick={() => router.push('/registration')}>
                <FaRegUser />
                Зареєструватися
            </Button>
            <Button variant="login" onClick={() => router.push('/login')}>
                <FaArrowRightToBracket />
                Увійти
            </Button>
        </div>
    )
}