"use client"

import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"

export default function SignInForm() {
  async function SignInWithGitHub() {
    await signIn("github", { callbackUrl: "/" })
  }

  return (
    <form action={SignInWithGitHub}>
      <Button type="submit" className="mt-4 w-full">
        Login with GitHub
      </Button>
    </form>
  )
}
