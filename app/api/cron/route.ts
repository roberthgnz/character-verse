import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({
      status: 401,
      statusText: "Unauthorized",
    })
  }
  return NextResponse.json({ ok: true })
}
