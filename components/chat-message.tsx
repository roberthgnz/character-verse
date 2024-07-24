import type { Character } from "@/types"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { ChatMessageActions } from "./chat-message-actions"
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
        className={cn("relative max-w-[80%] rounded-lg p-3", {
          "bg-muted": !isAssistant,
          "border text-primary-foreground": isAssistant,
        })}
      >
        {!loading ? content : <ChatMessageSkeleton />}
        {!loading && isAssistant && <ChatMessageActions content={content} />}
      </div>
      {isAssistant && !loading && (
        <MessageAudioPlayer content={content} character={character.name} />
      )}
    </div>
  )
}
