import Image from "next/image"
import Link from "next/link"
import type { Character } from "@/types"

import { MessageAudioPlayer } from "@/components/message-audio-player"

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Link
      href={`/chat/new?character=${character.name}`}
      key={character.name}
      className="bg-background flex cursor-pointer overflow-hidden rounded-lg border shadow transition-transform hover:scale-105"
    >
      <Image
        src={`/img/character/${character.name}.jpeg`}
        alt={character.name}
        className="aspect-[9/16] max-h-[200px] w-full max-w-[50%] object-cover"
        width={300}
        height={200}
      />
      <div className="p-4">
        <h3 className="flex items-center justify-between text-xl font-bold">
          <span>{character.name}</span>
          <MessageAudioPlayer
            content={character.defaultMessage}
            character={character.name}
          />
        </h3>
        <p className="text-foreground mt-2 text-xs">
          {character.defaultMessage}
        </p>
      </div>
    </Link>
  )
}
