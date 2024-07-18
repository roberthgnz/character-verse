"use client"

import { useState } from "react"
import { Character } from "@/types"
import { useChat } from "ai/react"
import { LoaderIcon, SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ChatMessage } from "./chat-message"

interface ChatProps {
  character: Character
}

export const Chat = ({ character }: ChatProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    headers: {
      "X-Character": character.name,
    },
    initialMessages: [
      {
        id: "assistant-0",
        role: "assistant",
        content: character.defaultMessage,
      },
    ],
    onResponse() {
      setIsLoading(false)
    },
  })

  return (
    <div className="relative flex h-full flex-col p-4">
      <div className="mx-auto flex w-2/3 flex-col items-center justify-between gap-2">
        <video className="size-32 rounded-full" muted loop autoPlay>
          <source
            src={`/video/character/${character.name}.mp4`}
            type="video/mp4"
          />
        </video>
        <p className="text-lg font-semibold">{character.name}</p>
      </div>
      {messages.length !== 0 && (
        <div className="mx-auto w-2/3 space-y-4 overflow-auto p-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} {...message} character={character} />
          ))}
          {isLoading && (
            <ChatMessage
              role="assistant"
              content=""
              character={character}
              loading
            />
          )}
        </div>
      )}
      <form
        onSubmit={(e) => {
          handleSubmit(e)
          setIsLoading(true)
        }}
        className="absolute bottom-2 left-1/2 flex w-2/3 -translate-x-1/2 items-center gap-2 p-4"
      >
        <Input
          id="input"
          name="prompt"
          value={input}
          onChange={handleInputChange}
          disabled={isLoading}
          placeholder={`Message to ${character.name}...`}
        />
        <Button type="submit" size={"icon"} disabled={isLoading}>
          {!isLoading ? (
            <SendIcon size={16} />
          ) : (
            <LoaderIcon size={16} className="animate-spin" />
          )}
        </Button>
      </form>
    </div>
  )
}
