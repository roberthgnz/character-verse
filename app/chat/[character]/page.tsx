import { redirect } from "next/navigation"
import { auth, getUser } from "@/auth"
import { characters } from "@/constants"
import type { Character } from "@/types"

import { createChatRoom } from "@/app/actions"

export default async function Page({
  params,
}: {
  params: { character: string }
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

  const user = await getUser(session!.user!.email as string)

  if (!user) {
    return redirect("/login")
  }

  const chat = await createChatRoom({
    title: "Chat with " + character.name,
    character: character.name,
    userId: user!.id,
  })

  return redirect(`/chat/${params.character}/${chat.id}`)
}
