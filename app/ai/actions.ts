"use server"

import type { Character } from "@/types"
import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

const getAIText = async (prompt: string) => {
  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt,
    })

    return text
  } catch (error) {
    console.error("Error generating text:", error)
    return null
  }
}

export const generateTitle = async (messages: string[]) => {
  const prompt = `Given the following list of messages from a chat conversation, generate a short, engaging title that captures the main topic or theme:

${messages.join("\n")}

The title should be:
- No more than 5-7 words long
- Informative and reflective of the conversation's content
- Engaging and interesting to potential readers
- Do not include quotation marks

Please provide only the generated title, without any additional explanation.`

  return getAIText(prompt)
}

export const generateInitialAIMessage = async (characterData: Character) => {
  const { voiceEmbedding, defaultMessage, ...character } = characterData

  const prompt = `Given the following character information, create an initial message for an AI character:

  Character structure:
  ${JSON.stringify(character, null, 2)}

  The message should:
  1. Be concise (1-3 sentences at most)
  2. Reflect the character's personality and motivation
  3. Use a passionate and articulate tone
  4. Include an inspiring metaphor if appropriate
  5. Be slightly exaggerated or cartoonish, but not absurd or nonsensical
  6. Engaging and interesting to potential readers
  7. Do not include quotation marks

  Please provide only the generated message, without any additional explanation or description.`

  return getAIText(prompt)
}
