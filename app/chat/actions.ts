"use server"

import prisma from "@/lib/prisma"

export const createChatRoom = async ({ title, character, userId }: any) => {
  const chat = await prisma.chat.create({
    data: {
      title,
      character,
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

export const getChatRooms = async (userId: string, character: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      userId,
      character,
    },
  })

  return chats
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
