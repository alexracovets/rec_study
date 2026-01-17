import { useMemo } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { Separator, Label } from "@atoms"

import { cn } from "@utils"

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
    return (
        <fieldset
            data-slot="field-set"
            className={cn(
                "flex flex-col gap-[16px] [&>legend]:mb-[16px]",
                className
            )}
            {...props}
        />
    )
}

function FieldLegend({
    className,
    variant = "legend",
    ...props
}: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
    return (
        <legend
            data-slot="field-legend"
            data-variant={variant}
            className={cn(
                "font-[800] font-nunito",
                "data-[variant=legend]:text-[48px]",
                "data-[variant=label]:text-[20px]",
                className
            )}
            {...props}
        />
    )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-group"
            className={cn(
                "group/field-group @container/field-group flex w-full flex-col gap-[32px] data-[slot=checkbox-group]:gap-[8px] [&>[data-slot=field-group]]:gap-[8px]",
                className
            )}
            {...props}
        />
    )
}

const fieldVariants = cva(
    "flex w-full gap-[8px] data-[invalid=true]:text-destructive",
    {
        variants: {
            orientation: {
                vertical: ["flex-col"],
                horizontal: [
                    "flex-row items-center",
                ],
                responsive: [
                    "flex-col",
                ],
            },
        },
        defaultVariants: {
            orientation: "vertical",
        },
    }
)

function Field({
    className,
    orientation = "vertical",
    ...props
}: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
    return (
        <div
            role="group"
            data-slot="field"
            data-orientation={orientation}
            className={cn(fieldVariants({ orientation }), className)}
            {...props}
        />
    )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-content"
            className={cn(
                "group/field-content flex flex-1 flex-col gap-1.5 leading-snug",
                className
            )}
            {...props}
        />
    )
}

function FieldLabel({
    className,
    ...props
}: React.ComponentProps<typeof Label>) {
    return (
        <Label
            data-slot="field-label"
            className={cn(
                "text-[18px] font-[600] block w-fit cursor-pointer",
                "group/field-label peer/field-label flex w-fit gap-[8px] leading-snug group-data-[disabled=true]/field:opacity-50",
                "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4",
                "has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10",
                className
            )}
            {...props}
        />
    )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            data-slot="field-label"
            className={cn(
                "flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50",
                className
            )}
            {...props}
        />
    )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
    return (
        <p
            data-slot="field-description"
            className={cn(
                "text-[20px] font-[400] font-nunito",
                "text-muted-foreground leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance",
                "[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
                className
            )}
            {...props}
        />
    )
}

function FieldSeparator({
    children,
    className,
    ...props
}: React.ComponentProps<"div"> & {
    children?: React.ReactNode
}) {
    return (
        <div
            data-slot="field-separator"
            data-content={!!children}
            className={cn(
                "relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2",
                className
            )}
            {...props}
        >
            <Separator className="absolute inset-0 top-1/2" />
            {children && (
                <span
                    className="bg-background text-muted-foreground relative mx-auto block w-fit px-2"
                    data-slot="field-separator-content"
                >
                    {children}
                </span>
            )}
        </div>
    )
}

function FieldError({
    className,
    children,
    errors,
    ...props
}: React.ComponentProps<"div"> & {
    errors?: Array<{ message?: string } | undefined>
}) {
    const content = useMemo(() => {
        if (children) {
            return children
        }

        if (!errors?.length) {
            return null
        }

        const uniqueErrors = [
            ...new Map(errors.map((error) => [error?.message, error])).values(),
        ]

        if (uniqueErrors?.length == 1) {
            return uniqueErrors[0]?.message
        }

        return (
            <ul className="ml-4 flex list-disc flex-col gap-1">
                {uniqueErrors.map(
                    (error, index) =>
                        error?.message && <li key={index}>{error.message}</li>
                )}
            </ul>
        )
    }, [children, errors])

    if (!content) {
        return null
    }

    return (
        <div
            role="alert"
            data-slot="field-error"
            className={cn("text-destructive text-sm font-normal", className)}
            {...props}
        >
            {content}
        </div>
    )
}

export {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldContent,
    FieldTitle,
}
