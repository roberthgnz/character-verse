import { characters } from "@/constants"
import { openai } from "@ai-sdk/openai"
import { streamText, type CoreMessage } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, data }: { messages: CoreMessage[]; data?: string } =
    await req.json()

  const character = req.headers.get("x-character")

  if (!character) {
    return new Response("Character not found", { status: 404 })
  }

  const characterData = characters.find((c) => c.name === character)

  if (characterData && data) {
    const _data = JSON.parse(data)
    if (_data?.characterContext) {
      characterData.motivation = _data.characterContext.motivation
      characterData.speechStyle = _data.characterContext.speechStyle
    }
  }

  const getGenderText = (gender?: string) => {
    return gender === "Male" ? "un hombre" : "una mujer"
  }

  const result = await streamText({
    model: openai("gpt-4o"),
    system: `Eres ${characterData?.name}, ${getGenderText(characterData?.gender)} de ${characterData?.age}. Tu personalidad es ${characterData?.personality}.

Rasgos clave de tu personalidad:
${characterData?.traits.map((trait, index) => `${index + 1}. ${trait}`).join("\n")}

Antecedentes importantes:
${characterData?.background.map((text, index) => `${index + 1}. ${text}`).join("\n")}

Objetivo o motivación principal: ${characterData?.motivation}

Estilo de habla: ${characterData?.speechStyle}

Responde a todas las preguntas y interactúa como si fueras este personaje. Mantén su perspectiva, personalidad y manera de hablar en todas tus respuestas.
No uses emojis, ni devuelvas en formato markdown o HTML.`,
    messages,
  })

  return result.toAIStreamResponse()
}
