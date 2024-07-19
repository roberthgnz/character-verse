"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCheckIcon, Copy } from "lucide-react"
import { useCopyToClipboard } from "usehooks-ts"

export const ChatMessageActions = ({ content }: any) => {
  const timeoutId = useRef<number | null>(null)

  const [_, copy] = useCopyToClipboard()

  const [copying, setCopying] = useState(false)

  const handleCopy = async (text: string) => {
    setCopying(true)

    await copy(text)

    timeoutId.current = setTimeout(() => {
      setCopying(false)
    }, 500) as unknown as number
  }

  useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
    }
  }, [])

  return (
    <div className="border-input bg-background absolute bottom-0 right-0 flex translate-y-1/2 items-center rounded-lg border shadow-sm transition">
      <button
        type="button"
        className="hover:bg-accent flex flex-row items-center gap-1 rounded-md p-1 px-2 py-0.5 text-xs transition-opacity delay-100 "
        onClick={() => handleCopy(content)}
      >
        {copying ? <CheckCheckIcon size={12} /> : <Copy size={12} />}
        <span>Copy</span>
      </button>
    </div>
  )
}
