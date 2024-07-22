"use client"

import { useRef, useState } from "react"
import { getState } from "@/stores/use-character-store"
import { Character } from "@/types"
import { useChat, type Message } from "ai/react"
import { LoaderIcon, SendIcon } from "lucide-react"
import { nanoid } from "nanoid"

import { useScrollToBottom } from "@/hooks/use-scroll-to-bottom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { saveChatMessage } from "@/app/chat/actions"

import { ChatMessage } from "./chat-message"
import { SpeechToTextButton } from "./speech-to-text-button"

interface ChatProps {
  chatId: string
  character: Character
  initialMessages: Message[]
}

export const ChatPanel = ({
  chatId,
  character,
  initialMessages,
}: ChatProps) => {
  const characterState = getState()

  const inputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { ref: scrollRef, scrollToBottom } = useScrollToBottom<HTMLDivElement>()

  const { messages, handleSubmit, handleInputChange } = useChat({
    headers: {
      "X-Character": character.name,
    },
    initialMessages,
    onResponse() {
      setInput("")
      setIsLoading(false)
    },
    onFinish(message) {
      scrollToBottom()
      saveChatMessage({ ...message, chatId })
    },
  })

  const onTranscriptChange = (transcript: string) => {
    setInput(transcript)
  }

  const onTranscriptEnd = () => {
    handleInputChange({ target: { value: input } } as any)
  }

  return (
    <div ref={scrollRef} className="flex h-full flex-col overflow-y-auto p-4">
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
        <div className="mx-auto w-2/3 space-y-4 p-4 pb-20">
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
          handleSubmit(e, {
            data: JSON.stringify({ characterContext: characterState }),
          })

          const message = {
            chatId,
            id: nanoid(7),
            role: "user",
            content: input,
            createdAt: new Date().toISOString(),
          }

          saveChatMessage(message)

          setIsLoading(true)
        }}
        className="bg-background absolute bottom-16  left-0 w-[calc(80%_+_1rem)] p-4"
      >
        <div className="mx-auto flex w-2/3 items-center gap-2">
          <Input
            ref={inputRef}
            id="input"
            name="prompt"
            value={input}
            onChange={(e) => {
              handleInputChange(e)
              setInput(e.target.value)
            }}
            disabled={isLoading}
            placeholder={`Message to ${character.name}...`}
          />
          <SpeechToTextButton
            onTranscriptChange={onTranscriptChange}
            onTranscriptEnd={onTranscriptEnd}
          />
          <Button type="submit" size={"icon"} disabled={isLoading}>
            {!isLoading ? (
              <SendIcon size={16} />
            ) : (
              <LoaderIcon size={16} className="animate-spin" />
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
