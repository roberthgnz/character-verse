import Image from "next/image"
import Link from "next/link"
import type { Character } from "@/types"

export const CharacterCard = ({ character }: { character: Character }) => {
  return (
    <Link
      href={`/chat/new?character=${character.name}`}
      key={character.name}
      className="bg-background border-primary flex cursor-pointer overflow-hidden rounded-lg border shadow transition-transform hover:scale-105"
    >
      <Image
        src={`/img/character/${character.name}.jpeg`}
        alt={character.name}
        className="aspect-[9/16] w-full max-w-[50%] object-cover"
        width={300}
        height={200}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold">{character.name}</h3>
        <p className="text-foreground mt-2 text-xs">
          {character.background.join(", ")}
        </p>
        <p className="text-foreground mt-2 text-xs">
          {character.traits.join(", ")}
        </p>
      </div>
    </Link>
  )
}
