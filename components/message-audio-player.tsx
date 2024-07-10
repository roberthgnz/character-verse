"use client"

import { useEffect, useState } from "react"
import { LoaderIcon, PlayIcon, StopCircleIcon } from "lucide-react"

import { useAudioPlayer } from "@/hooks/use-audio-player"

import { Button } from "./ui/button"

export const MessageAudioPlayer = ({
  content,
  character,
}: {
  content: string
  character: string
}) => {
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
      player.play(response.body as any)
    } catch (error) {
      console.error(error)
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
        onClick={() => {
          player.isPlaying ? player.stop() : textToSpeech(content)
        }}
        size={"icon"}
        disabled={generatingAudio}
      >
        {!generatingAudio ? (
          player.isPlaying ? (
            <StopCircleIcon size={16} />
          ) : (
            <PlayIcon size={16} />
          )
        ) : (
          <LoaderIcon size={16} className="animate-spin" />
        )}
      </Button>
    </>
  )
}
