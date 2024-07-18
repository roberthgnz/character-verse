import React from "react"
import { Mic, MicOff } from "lucide-react"

import { cn } from "@/lib/utils"
import { useSpeechToText } from "@/hooks/use-speech-to-text"

import { Button } from "./ui/button"

interface SpeechToTextProps {
  onTranscriptChange: (transcript: string) => void
  onTranscriptEnd?: () => void
}

export const SpeechToTextButton = ({
  onTranscriptChange,
  onTranscriptEnd,
}: SpeechToTextProps) => {
  const { isListening, startListening, stopListening, hasRecognitionSupport } =
    useSpeechToText({ onTranscriptChange, onTranscriptEnd })

  if (!hasRecognitionSupport) {
    return null
  }

  return (
    <Button
      type="button"
      variant={"outline"}
      size={"icon"}
      onClick={isListening ? stopListening : startListening}
      className={cn(isListening && "bg-red-500 hover:bg-red-600")}
    >
      {isListening ? (
        <span className="flex items-center justify-center">
          <MicOff size={16} />
        </span>
      ) : (
        <span className="flex items-center justify-center">
          <Mic size={16} />
        </span>
      )}
    </Button>
  )
}
