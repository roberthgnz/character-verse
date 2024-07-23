import Link from "next/link"
import { auth } from "@/auth"
import { characters } from "@/constants"

import { CharacterCard } from "@/components/character-card"
import { SignInForm } from "@/components/login-form"

export const metadata = {
  title: "CharacterVerse",
}

export default async function Home() {
  const session = await auth()

  return (
    <div className="container mx-auto max-w-screen-xl flex-1 space-y-8 px-4 py-8">
      <div className="space-y-1 rounded-lg border p-3 text-center">
        <h2 className="text-2xl font-bold">Welcome to CharacterVerse</h2>
        <p>
          Chat with legends, create new personalities, and explore endless
          worlds. Your next great conversation is just a click away.
        </p>
        <p className="text-muted-foreground">
          Open source built with{" "}
          <Link
            href={"https://nextjs.org/"}
            className="hover:underline"
            target="_blank"
          >
            Next.js
          </Link>{" "}
          and{" "}
          <Link
            href={"https://github.com/vercel/ai"}
            className="hover:underline"
            target="_blank"
          >
            Vercel AI SDK
          </Link>
          .
        </p>
        {!session && (
          <div className="mx-auto !mt-6 w-1/2">
            <SignInForm />
          </div>
        )}
      </div>
      <div className="grid w-full gap-8 md:grid-cols-4">
        {characters.map((character) => (
          <CharacterCard key={character.name} character={character} />
        ))}
      </div>
    </div>
  )
}
