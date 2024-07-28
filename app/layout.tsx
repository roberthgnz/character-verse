import "./globals.css"

import { Inter as FontSans } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
import { MainFooter } from "@/components/main-footer"
import { MainNav } from "@/components/main-nav"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "bg-background flex min-h-screen flex-col font-sans antialiased",
          fontSans.variable
        )}
      >
        <MainNav />
        {children}
        <MainFooter />
        <Toaster duration={2500} richColors />
        <Analytics />
      </body>
    </html>
  )
}
