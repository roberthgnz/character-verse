import Link from "next/link"
import type { Character } from "@/types"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getChatRooms } from "@/app/chat/actions"

import { ChatHistoryList } from "./chat-history-list"

export const ChatHistory = async ({
  userId,
  character,
}: {
  userId: string
  character: Character
}) => {
  const chats = await getChatRooms(userId, character.name)

  return (
    <div className="bg-accent h-full space-y-4 rounded-lg border p-4 shadow-sm">
      <h3 className="text-sm font-medium">Chat History</h3>
      <Button className="w-full" asChild>
        <Link href={`/chat/new?character=${character.name}`}>
          <PlusCircle className="mr-2 size-3" />
          New Chat
        </Link>
      </Button>
      <ChatHistoryList chats={chats} />
    </div>
  )
}
