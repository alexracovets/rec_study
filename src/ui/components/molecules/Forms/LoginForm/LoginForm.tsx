"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { z } from "zod"


import { LoginSchema } from "@schemas"

import { FieldGroup, FieldSet, FieldLegend, FieldDescription, Field, FieldLabel, Input, FieldError, Button } from "@atoms"

export const LoginForm = () => {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(LoginSchema),
    })

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        console.log(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-[32px] bg-base-separator rounded-[12px]">
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Форма входу</FieldLegend>
                    <FieldDescription>
                        Введіть свої дані для входу в систему
                    </FieldDescription>
                </FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">
                            Email :
                        </FieldLabel>
                        <Input
                            {...form.register('email')}
                            id="email"
                            placeholder="Email"
                            required
                            type="email"
                            autoComplete="email"
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="password">
                            Пароль:
                        </FieldLabel>
                        <Input
                            {...form.register('password')}
                            id="password"
                            placeholder="Пароль"
                            required
                            type="password"
                            autoComplete="new-password"
                        />
                    </Field>
                </FieldGroup>
                <div className="flex justify-between items-center gap-x-[16px]">
                    <Button type="submit">Підтвердити</Button>
                    <Button type="button" onClick={() => router.back()}>
                        Назад
                    </Button>
                </div>
            </FieldGroup>
            <div>
                Або авторизуйтесь через:
                <a href="/api/users/oauth/authorize">
                    <FaGoogle />
                </a>
            </div>
        </form>
    )
}