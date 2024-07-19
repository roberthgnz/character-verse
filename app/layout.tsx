import "./globals.css"

import { Inter as FontSans } from "next/font/google"
import Link from "next/link"

import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/toaster"
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
        <footer className="flex h-16 w-full shrink-0 items-center justify-center border-t bg-gradient-to-b px-4">
          <p className="text-muted-foreground text-center text-sm">
            Open source built with
            <Link href={"https://nextjs.org/"} target="_blank">
              Next.js
            </Link>
            and{" "}
            <Link href={"https://github.com/vercel/ai"} target="_blank">
              Vercel AI SDK
            </Link>
            .
          </p>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
