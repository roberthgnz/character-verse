import { characters } from "@/constants"

export async function POST(req: Request) {
  const { text, character }: { text: string; character: string } =
    await req.json()

  const characterData = characters.find((c) => c.name === character)

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
