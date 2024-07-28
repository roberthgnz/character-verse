import { characters } from "@/constants"

import { CharacterCard } from "@/components/character-card"
import { ShiftCanvasBackground } from "@/components/shift-canvas-background"

export const metadata = {
  title: "CharacterVerse",
}

export default function Home() {
  return (
    <div className="mx-auto max-w-screen-2xl flex-1 py-8">
      <ShiftCanvasBackground />
      <div className="mx-auto space-y-8 px-4">
        <div className="space-y-2 py-12">
          <h1 className="font-heading flex-1 shrink-0 text-6xl font-bold tracking-tight text-white lg:text-7xl xl:text-8xl">
            Run <span className="">AI</span> <br />
            with an <span className="">API</span>.
          </h1>{" "}
          <p className="max-w-2xl text-2xl text-white">
            Run and fine-tune open-source models. Deploy custom models at scale.
            All with one line of code.
          </p>
        </div>
        <div className="space-y-6 rounded-lg bg-white p-6">
          <p className="text-background text-2xl">Choose your character</p>
          <p className="text-background flex items-center text-lg">
            Select a character to start chat with AI
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M205.66,181.66l-48,48a8,8,0,0,1-11.32,0l-48-48A8,8,0,0,1,104,168h40V128A88.1,88.1,0,0,0,56,40a8,8,0,0,1,0-16A104.11,104.11,0,0,1,160,128v40h40a8,8,0,0,1,5.66,13.66Z"></path>
            </svg>
          </p>
          <div className="grid w-full gap-8 md:grid-cols-4">
            {characters.map((character) => (
              <CharacterCard key={character.name} character={character} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
