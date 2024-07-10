"use client"

import type { Character } from "@/types"
import { ShareIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ChatSettingsProps {
  character: Character
}

export const ChatSettings = ({ character }: ChatSettingsProps) => {
  const shareCharacter = () => {
    navigator.share({
      title: character.name,
      text: "Check out this character",
      url: window.location.href,
    })
  }

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage
            src={`/img/character/${character.name}.jpeg`}
            alt={character.name}
          />
          <AvatarFallback>{character.name.at(0)}</AvatarFallback>
        </Avatar>
        <span>{character.name}</span>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => shareCharacter()}
        >
          <ShareIcon size={16} />
        </Button>
      </div>
    </div>
  )
}
