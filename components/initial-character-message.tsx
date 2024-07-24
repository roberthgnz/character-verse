"use client"

import { useState } from "react"
import { useInitialCharacterMessage } from "@/context/message-context"
import { LoaderIcon, RefreshCcw } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { generateInitialAIMessage } from "@/app/ai/actions"

export const InitialCharacterMessage = ({ character }: any) => {
  const { initialCharacterMessage, updateInitialCharacterMessage } =
    useInitialCharacterMessage()
  const [isLoading, setIsLoading] = useState(false)

  const generate = async () => {
    setIsLoading(true)

    const generatedMessage = await generateInitialAIMessage(character)
    generatedMessage && updateInitialCharacterMessage(generatedMessage)

    setIsLoading(false)
  }

  return (
    <div className="bg-muted relative mx-auto max-w-[80%] rounded-lg p-3">
      {initialCharacterMessage}
      <TooltipProvider delayDuration={50}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute bottom-0 right-0 translate-x-[7px] translate-y-[7px]"
              onClick={generate}
              disabled={isLoading}
              size={"icon"}
            >
              {!isLoading ? (
                <RefreshCcw size={14} />
              ) : (
                <LoaderIcon size={14} className="animate-spin" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Generate a new initial message</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
