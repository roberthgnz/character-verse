"use client"

import { useRef, useState } from "react"
import { getState } from "@/stores/use-character-store"
import { Character } from "@/types"
import { useChat, type Message } from "ai/react"
import { LoaderIcon, SendIcon } from "lucide-react"
import { nanoid } from "nanoid"

import { useScrollAnchor } from "@/hooks/use-scroll-anchor"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ButtonScrollToBottom } from "@/components/button-scroll-to-bottom"
import { generateTitle } from "@/app/ai/actions"
import { saveChatMessage, updateChatRoom } from "@/app/chat/actions"

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

  const { scrollRef, messagesRef, visibilityRef, isAtBottom, scrollToBottom } =
    useScrollAnchor()

  const formRef = useRef<HTMLFormElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const {
    messages,
    handleInputChange,
    append,
    isLoading: isCalling,
  } = useChat({
    headers: {
      "X-Character": character.name,
    },
    initialMessages,
    onResponse() {
      setInput("")
      setIsLoading(false)
    },
    onFinish(message) {
      // Save the message from the assistant
      saveChatMessage({ ...message, chatId })
      // Generate title for the chat
      if (messages.length - 1 === 4) {
        generateTitle(messages as any[]).then((title) => {
          title && updateChatRoom(chatId, title)
        })
      }
    },
  })

  const onTranscriptChange = (transcript: string) => {
    setInput(transcript)
  }

  const onTranscriptEnd = () => {
    handleInputChange({ target: { value: input } } as any)
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const message = {
      role: "user",
      content: input,
    }

    setIsLoading(true)
    scrollToBottom()

    // Save the message from the user
    await saveChatMessage({ ...message, id: nanoid(7), chatId })

    await append(message as Message, {
      data: JSON.stringify({ characterContext: characterState }),
    })

    setInput("")
    setIsLoading(false)
    scrollToBottom()
  }

  const initChat = async () => {
    const last = messages[messages.length - 1]
    if (last.role === "user" && !isCalling) {
      messages.pop()
      setIsLoading(true)

      await append(last)

      setIsLoading(false)
    }
  }

  initChat()

  return (
    <div className="relative flex h-[calc(100vh_-_8rem)] flex-col">
      <ButtonScrollToBottom
        isAtBottom={isAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <div ref={scrollRef} className="h-full overflow-y-auto">
        {messages.length !== 0 && (
          <div ref={messagesRef} className="mx-auto w-2/3 space-y-4 p-4 pb-20">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                {...message}
                character={character}
              />
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
      </div>
      <div className="h-px w-full" ref={visibilityRef} />
      <form ref={formRef} onSubmit={onSubmit} className="pb-4">
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
            required
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
