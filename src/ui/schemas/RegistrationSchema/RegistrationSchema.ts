"use client"

import { z } from "zod"

export const RegistrationSchema = z
    .object({
        name: z.string().min(1, { message: "Ім'я є обов'язковим" }),
        email: z.string().email({ message: "Неправильний email" }),
        password: z.string().min(8, { message: "Пароль повинен містити мінімум 8 символів" }),
        confirmPassword: z.string().min(8, { message: "Пароль повинен містити мінімум 8 символів" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Паролі не співпадають",
        path: ["confirmPassword"],
    })