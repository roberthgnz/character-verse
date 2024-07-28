import { characters } from "@/constants"

import { CharacterCard } from "@/components/character-card"
import { ShiftCanvasBackground } from "@/components/shift-canvas-background"

export const metadata = {
  title: "CharacterVerse",
}

export default function Home() {
  return (
    <div className="container mx-auto max-w-screen-xl flex-1 space-y-8 px-4 py-8">
      <ShiftCanvasBackground />
      <div className="grid w-full gap-8 md:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
    </div>
  )
}
