"use client"

import { Slot } from "@radix-ui/react-slot";

interface ContainerProps {
    children: React.ReactNode
    asChild?: boolean
}

export const Container = ({ children, asChild = false }: ContainerProps) => {
    const Component = asChild ? Slot : "section";
    return (
        <Component className='max-w-[1400px] px-[20px] mx-auto'>
            {children}
        </Component>
    )
}