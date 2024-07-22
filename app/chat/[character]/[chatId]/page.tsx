import { characters } from "@/constants"
import type { Character } from "@/types"

import { ChatPanel } from "@/components/chat-panel"
import { ChatSettings } from "@/components/chat-settings"

export default async function Chat({
  params,
}: {
  params: { character: string }
}) {
  const character = characters.find((c) => c.name === params.character) as
    | Character
    | undefined

  if (!character) {
    return (
      <div className="bg-background flex h-[calc(100vh_-_8rem)] flex-col items-center justify-center">
        <span className="text-2xl">Character not found</span>
      </div>
    )
  }

  return (
    <div className="bg-background flex h-[calc(100vh_-_8rem)] flex-col">
      <div className="grid size-full grid-cols-[20%_auto_20%] gap-4 overflow-hidden">
        <div className="h-full border-r"></div>
        <ChatPanel character={character} />
        <div className="h-full border-l">
          <ChatSettings character={character} />
        </div>
      </div>
    </div>
  )
}
