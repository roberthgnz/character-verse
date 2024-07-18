"use client"

import { useRef, useState } from "react"
import { getState } from "@/stores/use-character-store"
import { Character } from "@/types"
import { useChat } from "ai/react"
import { LoaderIcon, SendIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ChatMessage } from "./chat-message"
import { SpeechToTextButton } from "./speech-to-text-button"

interface ChatProps {
  character: Character
}

export const ChatPanel = ({ character }: ChatProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const characterState = getState()

  const { messages, handleSubmit, handleInputChange } = useChat({
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
      setInput("")
      setIsLoading(false)
    },
  })

  const onTranscriptChange = (transcript: string) => {
    setInput(transcript)
  }

  const onTranscriptEnd = () => {
    handleInputChange({ target: { value: input } } as any)
  }

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
          handleSubmit(e, {
            data: JSON.stringify({ characterContext: characterState }),
          })
          setIsLoading(true)
        }}
        className="absolute bottom-2 left-1/2 flex w-2/3 -translate-x-1/2 items-center gap-2 p-4"
      >
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
      </form>
    </div>
  )
}
