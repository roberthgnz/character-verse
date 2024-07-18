import type { Character } from "@/types"
import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ChatMessageSkeleton } from "./chat-message-skeleton"
import { MessageAudioPlayer } from "./message-audio-player"

interface ChatMessageProps {
  content: string
  role: string
  character: Character
  loading?: boolean
}

export const ChatMessage = ({
  role,
  content,
  character,
  loading,
}: ChatMessageProps) => {
  const isAssistant = role === "assistant"

  return (
    <div
      className={cn("flex items-start gap-3", {
        "justify-end": !isAssistant,
      })}
    >
      {isAssistant && (
        <Avatar>
          <AvatarImage
            src={`/img/character/${character.name}.jpeg`}
            alt={character.name}
          />
          <AvatarFallback>{character.name.at(0)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn("max-w-[80%] rounded-lg p-3", {
          "bg-muted": isAssistant,
          "bg-primary text-primary-foreground": !isAssistant,
        })}
      >
        {!loading ? content : <ChatMessageSkeleton />}
      </div>
      {isAssistant && !loading && (
        <MessageAudioPlayer content={content} character={character.name} />
      )}
    </div>
  )
}
