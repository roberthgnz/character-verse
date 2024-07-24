"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { MessageSquareText, MoreHorizontal, PlusCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { removeChatRoom } from "@/app/chat/actions"

export const ChatHistory = ({
  character,
  chats,
}: {
  character: any
  chats: any[]
}) => {
  const [history, setHistory] = useState<any[]>(chats || [])

  const router = useRouter()
  const pathname = usePathname()

  const isLinkActive = (href: string) => {
    return pathname === href
  }

  const onDeleteChat = async (chatId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this chat?")
    if (confirm) {
      await removeChatRoom(chatId)
      setHistory((prev) => prev.filter((chat) => chat.id !== chatId))
      if (pathname === `/chat/${chatId}`) {
        router.push(`/chat/new?character=${character.name}`)
      }
    }
  }

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
      <div className="flex-1 space-y-1 overflow-y-auto">
        {history.map((chat) => (
          <Button
            key={chat.id}
            variant={"ghost"}
            className="relative w-full flex-1 select-none overflow-hidden text-ellipsis break-all"
            title={chat.title}
            asChild
          >
            <Link
              href={`/chat/${chat.id}`}
              className={cn("flex items-center justify-between", {
                "bg-accent text-accent-foreground": isLinkActive(
                  `/chat/${chat.id}`
                ),
              })}
            >
              <MessageSquareText className="mr-2 size-3" />
              <span className="whitespace-nowrap">{chat.title}</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="size-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={async (e) => {
                      // Preven bubbling up to the parent DropdownMenuTrigger
                      e.stopPropagation()
                      onDeleteChat(chat.id)
                    }}
                  >
                    Delete chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
