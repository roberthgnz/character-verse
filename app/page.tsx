import { CharacterCard } from "@/components/character-card"
import { characters } from "@/constants"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen">
      <h1 className="text-4xl font-bold mb-16">CharacterVerse</h1>
      <div className="grid grid-cols-3 gap-8 max-w-5xl w-full">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
    </div>
  )
}