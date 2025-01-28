"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ClientProvider } from "@/components/providers/client-provider"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ClientProvider>
      <NextThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </NextThemeProvider>
    </ClientProvider>
  )
} 