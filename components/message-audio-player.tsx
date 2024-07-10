"use client"

import { useEffect, useRef, useState } from "react"
import { LoaderIcon, PauseIcon, PlayIcon } from "lucide-react"

import { useAudioPlayer } from "@/hooks/use-audio-player"

import { Button } from "./ui/button"

export const MessageAudioPlayer = ({ content }: { content: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [generatingAudio, setGeneratingAudio] = useState(false)

  const audioPlayer = useAudioPlayer(audioRef)

  const textToSpeech = async (text: string) => {
    try {
      setGeneratingAudio(true)
      const response = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setAudioUrl(url)
    } catch (error) {
      console.error(error)
    } finally {
      setGeneratingAudio(false)
    }
  }

  useEffect(() => {
    if (audioUrl) {
      audioPlayer.play()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl])

  return (
    <>
      <Button
        onClick={() => {
          if (audioUrl) {
            audioPlayer.isPlaying ? audioPlayer.pause() : audioPlayer.play()
          } else {
            textToSpeech(content)
          }
        }}
        size={"icon"}
        disabled={generatingAudio}
      >
        {!generatingAudio ? (
          audioPlayer.isPlaying ? (
            <PauseIcon size={16} />
          ) : (
            <PlayIcon size={16} />
          )
        ) : (
          <LoaderIcon size={16} className="animate-spin" />
        )}
      </Button>
      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} controls className="hidden" />
      )}
    </>
  )
}
