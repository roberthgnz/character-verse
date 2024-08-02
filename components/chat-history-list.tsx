"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { TrashIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { removeChatRoom } from "@/app/chat/actions"

export const ChatHistoryList = ({
  chats,
  character,
}: {
  chats: any[]
  character: any
}) => {
  const router = useRouter()
  const pathname = usePathname()

  const isLinkActive = (href: string) => {
    return pathname === href
  }

  const onDeleteChat = async (chatId: string) => {
    const confirm = window.confirm("Are you sure you want to delete this chat?")
    if (confirm) {
      await removeChatRoom(chatId)
      if (pathname === `/chat/${chatId}`) {
        router.push(`/chat/new?character=${character.name}`)
      }
    }
  }

  return (
    <div className="flex-1 space-y-1 overflow-y-auto">
      {chats.map((chat) => (
        <Button
          key={chat.id}
          variant={"ghost"}
          className="group relative flex w-full items-center justify-between gap-1"
          title={chat.title as string}
          asChild
        >
          <Link
            href={`/chat/${chat.id}`}
            className={cn({
              "bg-background hover:bg-background": isLinkActive(
                `/chat/${chat.id}`
              ),
            })}
          >
            <span className="overflow-hidden text-ellipsis break-all">
              <span className="whitespace-nowrap text-xs">{chat.title}</span>
            </span>
            <Button
              className="hover:text-destructive opacity-0 transition-opacity duration-200 hover:bg-transparent group-hover:opacity-100"
              variant={"ghost"}
              size={"icon"}
              title="Delete chat"
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
  )
}
