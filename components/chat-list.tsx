import Link from "next/link"
import { MessageSquareText, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

export const ChatList = ({
  character,
  chats,
}: {
  character: any
  chats: any[]
}) => {
  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">Chat History</span>
      </div>
      <Button variant={"outline"} className="w-full" asChild>
        <Link href={`/chat/new?character=${character.name}`}>
          <PlusCircle className="mr-2 size-3" />
          New Chat
        </Link>
      </Button>
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <Button
            key={chat.id}
            variant={"ghost"}
            className="relative w-full flex-1 select-none overflow-hidden text-ellipsis break-all"
            title={chat.title}
            asChild
          >
            <Link href={`/chat/${chat.id}`} className="flex items-center">
              <MessageSquareText className="mr-2 size-3" />
              <span className="whitespace-nowrap">{chat.title}</span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
