import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { characters } from "@/constants"
import type { Character } from "@/types"

import { ChatPanel } from "@/components/chat-panel"
import { ChatSettings } from "@/components/chat-settings"
import { getChatRoom } from "@/app/actions"

export default async function Chat({
  params,
}: {
  params: { character: string; chatId: string }
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

  const session = await auth()

  if (!session) {
    return redirect("/login")
  }

  const chat = await getChatRoom(params.chatId)

  if (!chat) {
    return redirect("/")
  }

  if (chat.user.email !== session!.user!.email) {
    return redirect("/")
  }

  const initialMessages = [
    {
      id: "assistant-0",
      role: "assistant",
      content: character.defaultMessage,
    },
    ...(chat.messages as any[]),
  ]

  return (
    <div className="bg-background flex h-[calc(100vh_-_8rem)] flex-col">
      <div className="grid size-full grid-cols-[20%_auto_20%] gap-4 overflow-hidden">
        <div className="h-full border-r"></div>
        <ChatPanel
          chatId={params.chatId}
          character={character}
          initialMessages={initialMessages}
        />
        <div className="h-full border-l">
          <ChatSettings character={character} />
        </div>
      </div>
    </div>
  )
}
