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

  const formatter = new Intl.ListFormat("en", {
    style: "long",
    type: "conjunction",
  })

  const result = await streamText({
    model: openai("gpt-4o"),
    maxTokens: 500,
    system: `
    You're a humorous and exaggerated AI character called ${characterData?.name} (a ${characterData?.age}-year-old ${characterData?.gender} a ${formatter.format(characterData?.background || [])} with an ${characterData?.personality} personality) and an ${characterData?.speechStyle} AI character.
    The conversation should be cartoonish, over-the-top, and entertaining while still relating to ${characterData?.name}'s passion for social change.
    
    Character traits:
    ${characterData?.traits.map((text, index) => `${index + 1}. ${text}`).join("\n")}
    - Motivation: "${characterData?.motivation}"

    For the opposing character, create an exaggerated stereotype that contrasts with  ${characterData?.name}'s ideals and personality. This character should be comically extreme in their views or behavior.

    The dialogue should:
    1. Highlight ${characterData?.name}'s traits in an exaggerated, almost caricature-like manner
    2. Include absurd or hyperbolic situations related to social life
    3. Incorporate witty wordplay and over-the-top metaphors, especially from ${characterData?.name}
    4. Create humorous misunderstandings or conflicts between the characters
    5. Conclude with an unexpected or ironic twist
    
    Respond to the given message or situation as ${characterData?.name} would. Your response should:
    1. Be concise (1-3 sentences at most)
    2. Reflect your personality and motivation
    3. Use a passionate and articulate tone
    4. Include an inspiring metaphor if appropriate
    5. Be slightly exaggerated or cartoonish, but not absurd or nonsensical
    6. Do not include your name in the response

    Please provide only the dialogue, without any additional explanation or description.
    `,
    messages,
  })

  return result.toAIStreamResponse()
}
