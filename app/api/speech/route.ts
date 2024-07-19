import { headers } from "next/headers"
import { characters } from "@/constants"
import { Ratelimit } from "@upstash/ratelimit"

import kv from "@/lib/kv"

// Create a new ratelimiter, that allows 5 requests per 24 hours
const ratelimit = kv
  ? new Ratelimit({
      redis: kv,
      limiter: Ratelimit.fixedWindow(5, "24h"),
      analytics: true,
    })
  : undefined

export async function POST(req: Request) {
  const { text, character }: { text: string; character: string } =
    await req.json()

  const characterData = characters.find((c) => c.name === character)

  if (!characterData) {
    return new Response("Character not found", { status: 404 })
  }

  if (ratelimit) {
    const headersList = headers()

    const ipIdentifier = headersList.get("x-real-ip")

    const result = await ratelimit.limit(ipIdentifier ?? "")

    if (!result.success) {
      return new Response("Limit reached. Please try again in 24 hours.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": result.limit,
          "X-RateLimit-Remaining": result.remaining,
        } as any,
      })
    }
  }

  const voice = await fetch("https://api.cartesia.ai/tts/bytes", {
    method: "POST",
    headers: {
      "Cartesia-Version": "2024-06-30",
      "Content-Type": "application/json",
      "X-API-Key": process.env.CARTESIA_API_KEY!,
    },
    body: JSON.stringify({
      model_id: "sonic-english",
      transcript: text,
      voice: {
        mode: "embedding",
        embedding: characterData?.voiceEmbedding,
      },
      output_format: {
        container: "raw",
        encoding: "pcm_f32le",
        sample_rate: 24000,
      },
    }),
  })

  return new Response(voice.body)
}
