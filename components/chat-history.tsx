import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { getChatRooms } from "@/app/chat/actions"

import { ChatHistoryList } from "./chat-history-list"

export const ChatHistory = async ({
  userId,
  character,
}: {
  userId: string
  character: any
}) => {
  const chats = await getChatRooms(userId, character.name)

  return (
    <div className="bg-accent h-full space-y-4 rounded-lg border p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Chat History</span>
      </div>
      <Button variant={"outline"} className="w-full" asChild>
        <Link href={`/chat/new?character=${character.name}`}>
          <PlusCircle className="mr-2 size-3" />
          New Chat
        </Link>
      </Button>
      <ChatHistoryList chats={chats} character={character} />
    </div>
  )
}
