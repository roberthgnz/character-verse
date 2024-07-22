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

export const getChatRoom = async (chatId: string) => {
  const chat = await prisma.chat.findUnique({
    where: {
      id: chatId,
    },
    include: {
      user: true,
      messages: true,
    },
  })

  return chat
}

export const saveChatMessage = async ({
  id,
  chatId,
  role,
  content,
  createdAt,
}: any) => {
  try {
    await prisma.message.create({
      data: {
        id,
        role,
        content,
        createdAt,
        chatId,
      },
    })

    return {
      data: {
        success: true,
      },
      error: null,
    }
  } catch (error: any) {
    console.error(error)
    return {
      data: null,
      error: error.message,
    }
  }
}
