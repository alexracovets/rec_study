"use client";

import { Toaster } from "@atoms";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
};