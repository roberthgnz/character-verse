import { NextResponse } from "next/server"

import prisma from "@/lib/prisma"

export async function GET() {
  try {
    // Use deleteMany to prevent throwing an error if the user doesn't exist
    const result = await prisma.user.deleteMany({
      where: {
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
