"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import {
    FieldDescription,
    FieldLegend,
    FieldGroup,
    FieldLabel,
    Container,
    FieldSet,
    Button,
    Field,
    Input,
    FieldError,
} from "@atoms"

const formSchema = z
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

export default function RegistrationPage() {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
    })

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }
    console.log(form.formState.errors)
    return (
        <Container>
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
        </Container>
    )
}