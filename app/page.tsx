import { characters } from "@/constants"

import { CharacterCard } from "@/components/character-card"

export default function Home() {
  return (
    <div className="container mx-auto max-w-screen-xl p-4">
      <h1 className="mb-16 text-center text-4xl font-bold">CharacterVerse</h1>
      <div className="grid w-full max-w-5xl grid-cols-3 gap-8">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
    </div>
  )
}
