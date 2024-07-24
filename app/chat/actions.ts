"use server"

import type { Message } from "@prisma/client"

import prisma from "@/lib/prisma"

export const createChatRoom = async ({
  title,
  character,
  userId,
  initialMessages,
}: {
  title: string
  character: string
  userId: string
  initialMessages?: Partial<Message>[]
}) => {
  try {
    const data: any = {
      title,
      character,
      userId,
    }

    if (initialMessages?.length) {
      data.messages = {
        createMany: {
          data: initialMessages,
        },
      }
    }

    const chat = await prisma.chat.create({
      data,
    })

    return {
      data: chat,
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

export const removeChatRoom = async (chatId: string) => {
  try {
    await prisma.chat.delete({
      where: {
        id: chatId,
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

export const saveChatMessage = async ({
  id,
  chatId,
  role,
  content,
}: Omit<Message, "createdAt">) => {
  try {
    await prisma.message.create({
      data: {
        id,
        role,
        content,
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
