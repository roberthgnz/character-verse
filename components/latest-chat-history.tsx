import { getChatRooms } from "@/app/chat/actions"

import { ChatHistoryList } from "./chat-history-list"

export const LatestChatHistory = async ({
  userId,
  character,
}: {
  userId: string
  character: any
}) => {
  const chats = await getChatRooms(userId, character.name, 6)

  if (!chats.length) {
    return <p>No chat history found</p>
  }

  return (
    <>
      <p>Your chat history with {character.name} </p>
      <ChatHistoryList chats={chats} direction="horizontal" />
    </>
  )
}
