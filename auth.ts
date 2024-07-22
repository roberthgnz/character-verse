import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"

import authConfig from "./auth.config"
import prisma from "./lib/prisma"

export const { handlers, auth } = NextAuth({
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})
