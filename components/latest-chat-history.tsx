import type { Character } from "@/types"

import { ChatHistoryList } from "./chat-history-list"

export const LatestChatHistory = async ({
  chats,
  character,
}: {
  chats: any[]
  character: Character
}) => {
  return (
    <>
      <p>Your chat history with {character.name} </p>
      <ChatHistoryList chats={chats} direction="horizontal" />
    </>
  )
}
