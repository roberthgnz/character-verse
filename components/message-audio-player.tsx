"use client"

import { useEffect, useState } from "react"
import { LoaderIcon, Volume2 } from "lucide-react"

import { useAudioPlayer } from "@/hooks/use-audio-player"

import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"

export const MessageAudioPlayer = ({
  content,
  character,
}: {
  content: string
  character: string
}) => {
  const { toast } = useToast()
  const player = useAudioPlayer()

  const [generatingAudio, setGeneratingAudio] = useState(false)

  const textToSpeech = async (text: string) => {
    try {
      setGeneratingAudio(true)
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, character }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message)
      }

      player.play(response.body as any)
    } catch (error: any) {
      console.error(error)
      toast({
        title: "Failed to generate audio",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setGeneratingAudio(false)
    }
  }

  useEffect(() => {
    return () => {
      player.isPlaying && player.stop()
    }
  }, [player])

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          player.isPlaying ? player.stop() : textToSpeech(content)
        }}
        size={"icon"}
        disabled={generatingAudio}
      >
        {!generatingAudio ? (
          player.isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              width="24"
              height="24"
            >
              <rect x="5" y="45" width="10" height="10" fill="#fff">
                <animate
                  attributeName="height"
                  values="10;20;10"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="45;40;45"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="20" y="40" width="10" height="20" fill="#fff">
                <animate
                  attributeName="height"
                  values="20;30;20"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="40;35;40"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="35" y="30" width="10" height="40" fill="#fff">
                <animate
                  attributeName="height"
                  values="40;60;40"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="30;20;30"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="50" y="10" width="10" height="80" fill="#fff">
                <animate
                  attributeName="height"
                  values="80;90;80"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="10;5;10"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="65" y="10" width="10" height="80" fill="#fff">
                <animate
                  attributeName="height"
                  values="80;90;80"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="10;5;10"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="80" y="30" width="10" height="40" fill="#fff">
                <animate
                  attributeName="height"
                  values="40;60;40"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="30;20;30"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="95" y="45" width="10" height="10" fill="#fff">
                <animate
                  attributeName="height"
                  values="10;20;10"
                  dur="1s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="45;40;45"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          ) : (
            <Volume2 size={16} />
          )
        ) : (
          <LoaderIcon size={16} className="animate-spin" />
        )}
      </Button>
    </>
  )
}
