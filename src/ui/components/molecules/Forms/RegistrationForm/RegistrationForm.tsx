"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { RegistrationSchema } from "@schemas"

import { FieldGroup, FieldSet, FieldLegend, FieldDescription, Field, FieldLabel, Input, FieldError, Button } from "@atoms"

export const RegistrationForm = () => {
    const router = useRouter()

    const form = useForm({
        resolver: zodResolver(RegistrationSchema),
    })

    const onSubmit = (data: z.infer<typeof RegistrationSchema>) => {
        console.log(data)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-[32px] bg-base-separator rounded-[12px]">
            <FieldGroup>
                <FieldSet>
                    <FieldLegend>Форма реєстрації</FieldLegend>
                    <FieldDescription>
                        Швидве заповнюй поля і приєднуйся до незабньої подорожі!
                    </FieldDescription>
                </FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">
                            Ім'я :
                        </FieldLabel>
                        <Input
                            {...form.register('name')}
                            id="name"
                            placeholder="Ім'я"
                            required
                            type="text"
                            autoComplete="name"
                        />
                        <FieldError errors={[{ message: form.formState.errors.name?.message }]} />
                    </Field>
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
                    <Field>
                        <FieldLabel htmlFor="confirmPassword">
                            Підтвердіть пароль :
                        </FieldLabel>
                        <Input
                            {...form.register('confirmPassword')}
                            id="confirmPassword"
                            placeholder="Підтвердіть пароль"
                            required
                            type="password"
                            autoComplete="confirm-password"
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
        </form>
    )
}