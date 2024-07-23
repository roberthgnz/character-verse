"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import type { Character } from "@/types"
import { ForwardIcon, LoaderIcon } from "lucide-react"
import mergeRefs from "merge-refs"
import { nanoid } from "nanoid"
import { useHotkeys } from "react-hotkeys-hook"
import { useResizeObserver } from "usehooks-ts"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { createChatRoom } from "@/app/chat/actions"

interface ChatFormProps {
  userId: string
  character: Character
}

const TEXTAREA_HEIGHT = 80

export const ChatForm = ({ userId, character }: ChatFormProps) => {
  const router = useRouter()

  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)

  const heightRef = useRef<HTMLTextAreaElement>(null)

  const { height = TEXTAREA_HEIGHT } = useResizeObserver({
    ref: heightRef,
    box: "border-box",
  })

  const handleSubmit = async () => {
    const isValid = formRef.current?.checkValidity()
    if (isValid) {
      setIsLoading(true)

      const { data } = await createChatRoom({
        userId,
        title: "Chat with " + character.name,
        character: character.name,
        initialMessages: [
          {
            id: nanoid(7),
            role: "assistant",
            content: character.defaultMessage,
          },
          {
            id: nanoid(7),
            role: "user",
            content: message,
          },
        ],
      })

      setIsLoading(false)

      data && router.push(`/chat/${data.id}`)
    }
  }

  const hotkeyRef = useHotkeys<HTMLTextAreaElement>(
    "enter, shift+enter",
    (_, handler) => {
      const enter = handler?.keys?.includes("enter")
      if (enter && !handler.shift) {
        formRef.current && handleSubmit()
      }
      if (enter && handler.shift) {
        setMessage((prev) => `${prev}\n`)
      }
    },
    { enableOnFormTags: true }
  )

  return (
    <form
      ref={formRef}
      className="relative w-full"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <Textarea
        ref={mergeRefs(heightRef, hotkeyRef)}
        name="message"
        placeholder={`Let's chat with ${character.name}`}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
          }
        }}
        tabIndex={-1}
        disabled={isLoading}
        required
      />
      <Button
        variant={"secondary"}
        className={cn("absolute right-3", [
          height > TEXTAREA_HEIGHT ? "bottom-2" : "top-1/2 -translate-y-1/2",
        ])}
        disabled={!message.length || isLoading}
      >
        {!isLoading ? (
          <ForwardIcon className="size-6" />
        ) : (
          <LoaderIcon className="size-4 animate-spin" />
        )}
      </Button>
    </form>
  )
}
