import { nanoid } from "nanoid"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"

import prisma from "./lib/prisma"

const createAnonymousUser = async () => {
  try {
    const user = `anonymous-${nanoid(7)}`
    return prisma.user.create({
      data: {
        name: user,
        email: `${user}@example.com`,
        isAnonymous: true,
      },
    })
  } catch (error) {
    console.error("Failed to create anonymous user:", error)
    throw new Error("Failed to create anonymous user.")
  }
}

export default {
  providers: [
    CredentialsProvider({
      name: "anonymous",
      credentials: {},
      async authorize() {
        return createAnonymousUser()
      },
    }),
    GitHub,
  ],
} satisfies NextAuthConfig
