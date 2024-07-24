// Copy from: https://github.com/vercel/ai-chatbot/blob/main/components/button-scroll-to-bottom.tsx
"use client"

import { ArrowDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ButtonScrollToBottomProps {
  isAtBottom: boolean
  scrollToBottom: () => void
}

export const ButtonScrollToBottom = ({
  isAtBottom,
  scrollToBottom,
}: ButtonScrollToBottomProps) => {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        "bg-background absolute bottom-4 right-4 z-50 transition-opacity duration-300",
        isAtBottom ? "opacity-0" : "opacity-100"
      )}
      onClick={() => scrollToBottom()}
    >
      <ArrowDown />
      <span className="sr-only">Scroll to bottom</span>
    </Button>
  )
}
