import { useCallback, useEffect, useState } from "react"

interface SpeechToTextProps {
  language?: string
  onTranscriptChange: (transcript: string) => void
  onTranscriptEnd?: () => void
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  start: () => void
  stop: () => void
  onresult: (event: SpeechRecognitionEvent) => void
  onend: () => void
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult
  length: number
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative
  length: number
}

interface SpeechRecognitionAlternative {
  transcript: string
}

export const useSpeechToText = ({
  language = "en-US",
  onTranscriptChange,
  onTranscriptEnd,
}: SpeechToTextProps) => {
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null)

  const getSpeechRecognition = () => {
    let instance = null
    if (
      (typeof window !== "undefined" && "SpeechRecognition" in window) ||
      "webkitSpeechRecognition" in window
    ) {
      instance = (new (window as any).webkitSpeechRecognition() ||
        new (window as any).SpeechRecognition()) as SpeechRecognition
    }
    return instance
  }

  useEffect(() => {
    const recognitionInstance = getSpeechRecognition()

    if (!recognitionInstance) {
      return
    }

    recognitionInstance.continuous = true
    recognitionInstance.interimResults = true
    recognitionInstance.lang = language

    recognitionInstance.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("")
      onTranscriptChange(currentTranscript)
    }

    setRecognition(recognitionInstance)
  }, [language, onTranscriptChange, onTranscriptEnd])

  const startListening = useCallback(() => {
    if (recognition) {
      recognition.start()
      setIsListening(true)
    }
  }, [recognition])

  const stopListening = useCallback(() => {
    if (recognition) {
      recognition.stop()
      setIsListening(false)
      if (onTranscriptEnd && typeof onTranscriptEnd === "function") {
        onTranscriptEnd()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recognition])

  return {
    isListening,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  }
}
