import * as React from "react"

import { cn } from "@utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "placeholder:text-placeholder",
                "selection:bg-primary selection:text-primary-foreground",
                "h-[36px] w-full min-w-0 shadow-xs",
                "border-primary border-[1px] rounded-[4px]",
                "px-[12px] py-[8px]",
                "bg-transparent transition-[color,box-shadow] outline-none",
                "focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[2px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        />
    )
}

export { Input }
