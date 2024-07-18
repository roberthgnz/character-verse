import { characters } from "@/constants"
import type { Character } from "@/types"

import { ChatPanel } from "@/components/chat-panel"
import { ChatSettings } from "@/components/chat-settings"

export default function Page({ params }: { params: { character: string } }) {
  const character = characters.find((c) => c.name === params.character) as
    | Character
    | undefined

  if (!character) {
    return <div>Character not found</div>
  }

  return (
    <div className="bg-background flex h-screen flex-col">
      <div className="grid size-full grid-cols-[80%_auto] gap-4">
        <ChatPanel character={character} />
        <div className="h-full border-l">
          <ChatSettings character={character} />
        </div>
      </div>
    </div>
  )
}
