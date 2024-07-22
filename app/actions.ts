"use server"

import prisma from "@/lib/prisma"

export const createChatRoom = async ({ title, userId }: any) => {
  const chat = await prisma.chat.create({
    data: {
      title,
      userId,
    },
  })

  return chat
}
