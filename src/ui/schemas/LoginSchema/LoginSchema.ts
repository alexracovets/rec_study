"use client"

import { z } from "zod"

export const LoginSchema = z
    .object({
        email: z.string().email({ message: "Неправильний email" }),
        password: z.string().min(8, { message: "Пароль повинен містити мінімум 8 символів" }),
    })