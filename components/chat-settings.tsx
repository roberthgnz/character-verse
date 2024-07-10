"use client"

import { useEffect, useState } from "react"
import { setState as setCharacterState } from "@/stores/use-character-store"
import type { Character } from "@/types"
import { ShareIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"

interface ChatSettingsProps {
  character: Character
}

export const ChatSettings = ({ character }: ChatSettingsProps) => {
  const [hasChanged, setHasChanged] = useState(false)
  const [state, setState] = useState({ motivation: "", speechStyle: "" })

  const shareCharacter = () => {
    navigator.share({
      title: character.name,
      text: "Check out this character",
      url: window.location.href,
    })
  }

  const saveChanges = () => {
    setCharacterState(() => ({
      motivation: state.motivation,
      speechStyle: state.speechStyle,
    }))
  }

  useEffect(() => {
    setState({
      motivation: character.motivation,
      speechStyle: character.speechStyle,
    })
  }, [character])

  useEffect(() => {
    setHasChanged(
      state.motivation !== character.motivation ||
        state.speechStyle !== character.speechStyle
    )
  }, [
    state.motivation,
    state.speechStyle,
    character.motivation,
    character.speechStyle,
  ])

  return (
    <div className="space-y-4 p-4">
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
      <Separator />
      <div className="space-y-2">
        <Label>Motivation</Label>
        <Textarea
          value={state.motivation}
          onChange={(event) => {
            setState((prev) => ({ ...prev, motivation: event.target.value }))
          }}
        />
      </div>
      <div className="space-y-2">
        <Label>Speech Style</Label>
        <Textarea
          value={state.speechStyle}
          onChange={(event) => {
            setState((prev) => ({ ...prev, speechStyle: event.target.value }))
          }}
        />
      </div>
      {hasChanged && (
        <Button onClick={() => saveChanges()}>Save Changes</Button>
      )}
    </div>
  )
}
