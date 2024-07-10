import type { Character } from "@/types"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { MessageAudioPlayer } from "./message-audio-player"

interface ChatMessageProps {
  content: string
  role: string
  character: Character
}

export const ChatMessage = ({ role, content, character }: ChatMessageProps) => {
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
        {content}
      </div>
      {isAssistant && (
        <MessageAudioPlayer content={content} character={character.name} />
      )}
    </div>
  )
}
