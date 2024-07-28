import "./globals.css"

import { Inter as FontSans } from "next/font/google"
import Link from "next/link"
import { Analytics } from "@vercel/analytics/react"

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
        <footer className="border-foreground h-16 w-full border-t bg-gradient-to-b px-4">
          <div className="mx-auto flex h-full max-w-screen-2xl shrink-0 items-center justify-between">
            <p className="text-center text-sm">
              Built by{" "}
              <Link
                href={"https://x.com/roberthgnz"}
                className="hover:underline"
                target="_blank"
              >
                roberthgnz
              </Link>
              . The source code is available on{" "}
              <Link
                href={"https://github.com/roberthgnz/character-verse"}
                className="hover:underline"
                target="_blank"
              >
                GitHub
              </Link>
              .
            </p>
            <p className="text-center text-sm">
              Powered by{" "}
              <Link
                href={"https://nextjs.org/"}
                className="hover:underline"
                target="_blank"
              >
                Next.js
              </Link>{" "}
              and{" "}
              <Link
                href={"https://github.com/vercel/ai"}
                className="hover:underline"
                target="_blank"
              >
                Vercel AI SDK
              </Link>
              .
            </p>
          </div>
        </footer>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
