import { redirect } from "next/navigation"
import { auth } from "@/auth"

import { SignInForm } from "@/components/login-form"

export const metadata = {
  title: "Login - CharacterVerse",
}

export default async function LoginPage() {
  const session = await auth()

  if (session) {
    return redirect("/")
  }

  return (
    <main className="bg-background flex h-[calc(100vh_-_8rem)] flex-col items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <SignInForm />
      </div>
    </main>
  )
}
