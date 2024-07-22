import { PrismaAdapter } from "@auth/prisma-adapter"
import type { User } from "@prisma/client"
import NextAuth from "next-auth"

import authConfig from "./auth.config"
import prisma from "./lib/prisma"

export const { handlers, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})

export const getUser = (email: string): Promise<User | null> => {
  try {
    return prisma.user.findUnique({ where: { email } })
  } catch (error) {
    console.error("Failed to fetch user:", error)
    throw new Error("Failed to fetch user.")
  }
}
