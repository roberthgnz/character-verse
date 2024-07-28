import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { characters } from "@/constants"
import type { Character } from "@/types"

import { ChatHistory } from "@/components/chat-history"
import { ChatPanel } from "@/components/chat-panel"
import { ChatSettings } from "@/components/chat-settings"
import { getChatRoom, getChatRooms } from "@/app/chat/actions"

export default async function Chat({ params }: { params: { chatId: string } }) {
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

  const character = characters.find(
    (c) => c.name === chat.character
  ) as Character

  const chats = await getChatRooms(chat.user.id, character.name)

  return (
    <div className="bg-background flex h-[calc(100vh_-_8rem)] flex-col">
      <div className="mx-auto grid h-full max-w-screen-2xl grid-cols-[15%_auto_20%] gap-4 overflow-hidden">
        <ChatHistory character={character} chats={chats} />
        <ChatPanel
          chatId={params.chatId}
          character={character}
          initialMessages={chat.messages as any[]}
        />
        <ChatSettings character={character} />
      </div>
    </div>
  )
}
