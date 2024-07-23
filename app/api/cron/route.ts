import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"

import prisma from "@/lib/prisma"

export async function GET(req: NextRequest) {
  const getHostOrigin = () => {
    return process.env.NODE_ENV === "development"
      ? "localhost:3000"
      : "character-verse.vercel.app"
  }

  const isSameOrigin = req.headers.get("host") === getHostOrigin()

  if (!isSameOrigin) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  const session = await auth()

  if (!session) {
    return NextResponse.json("Unauthorized", { status: 401 })
  }

  try {
    // Use deleteMany to prevent throwing an error if the user doesn't exist
    const result = await prisma.user.deleteMany({
      where: {
        email: session!.user!.email as string,
        isAnonymous: true,
        // Delete if the created date is older than 1 day
        createdAt: {
          lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
        },
      },
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Failed to delete anonymous user:", error)
    return NextResponse.json("An error occurred", { status: 500 })
  }
}
