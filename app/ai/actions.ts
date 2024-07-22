"use server"

import { openai } from "@ai-sdk/openai"
import { generateText } from "ai"

export const generateTitle = async (messages: string[]): Promise<string> => {
  const prompt = `Given the following list of messages from a chat conversation, generate a short, engaging title that captures the main topic or theme:

${messages.join("\n")}

The title should be:
- No more than 5-7 words long
- Informative and reflective of the conversation's content
- Engaging and interesting to potential readers

Please provide only the generated title, without any additional explanation.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4-turbo"),
      prompt,
    })

    return text
  } catch (error) {
    console.error("Error generating title:", error)
    return "Error generating title"
  }
}
