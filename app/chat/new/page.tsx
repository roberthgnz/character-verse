import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { auth, getUser } from "@/auth"
import { characters } from "@/constants"
import { InitialCharacterMessageProvider } from "@/context/message-context"
import type { Character } from "@/types"

import { ChatForm } from "@/components/chat-form"
import { InitialCharacterMessage } from "@/components/initial-character-message"

interface PageProps {
  searchParams: { character: string }
}

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const character = characters.find(
    (c) => c.name === searchParams.character
  ) as Character | undefined

  return {
    title: character?.name ? `${character?.name} Chat` : "Chat",
  }
}

export default async function Page({ searchParams }: PageProps) {
  const character = characters.find(
    (c) => c.name === searchParams.character
  ) as Character | undefined

  if (!character) {
    return (
      <div className="bg-background flex h-[calc(100vh_-_8rem)] flex-col items-center justify-center">
        <span className="text-2xl">Character not found</span>
      </div>
    )
  }

  const session = await auth()

  const redirectUrl = `/login?character=${character.name}`

  if (!session) {
    return redirect(redirectUrl)
  }

  const user = await getUser(session!.user!.email as string)

  if (!user) {
    return redirect(redirectUrl)
  }

  return (
    <div className="bg-background flex h-[calc(100vh_-_8rem)] flex-col items-center justify-center">
      <div className="w-full max-w-screen-md">
        <div className="flex flex-col items-center gap-8">
          <video className="size-64 rounded-full" muted loop autoPlay>
            <source
              src={`/video/character/${character.name}.mp4`}
              type="video/mp4"
            />
          </video>
          <p className="text-lg font-semibold">{character.name}</p>
          <InitialCharacterMessageProvider
            defaultMessage={character.defaultMessage}
          >
            <InitialCharacterMessage character={character} />
            <ChatForm userId={user.id} character={character} />
          </InitialCharacterMessageProvider>
        </div>
      </div>
    </div>
  )
}
