import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import authConfig from "./auth.config"
import prisma from "./lib/prisma"

export const { handlers, auth, signOut } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})

export const getUser = (email: string) => {
  try {
    return prisma.user.findUnique({ where: { email } })
  } catch (error) {
    console.error(error)
    return null
  }
}
