"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { PlusCircle, TrashIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
      <div className="flex-1 space-y-1 overflow-y-auto">
        {history.map((chat) => (
          <Button
            key={chat.id}
            variant={"ghost"}
            size={"icon"}
            className="group relative w-full !justify-start"
            title={chat.title}
            asChild
          >
            <Link
              href={`/chat/${chat.id}`}
              className={cn("flex items-center gap-1", {
                "bg-accent text-accent-foreground": isLinkActive(
                  `/chat/${chat.id}`
                ),
              })}
            >
              <span className="overflow-hidden text-ellipsis break-all">
                <span className="whitespace-nowrap text-xs">{chat.title}</span>
              </span>
              <Button
                className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                variant={"ghost"}
                size={"icon"}
                onClick={(e) => {
                  // Preven bubbling up to the parent DropdownMenuTrigger
                  e.stopPropagation()
                  e.preventDefault()
                  onDeleteChat(chat.id)
                }}
              >
                <TrashIcon className="size-3" />
              </Button>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
