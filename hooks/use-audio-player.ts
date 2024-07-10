import { RefObject, useEffect, useState } from "react"

export const useAudioPlayer = (audioRef: RefObject<HTMLAudioElement>) => {
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current

    const handleEnded = () => {
      setIsPlaying(false)
    }

    audio?.addEventListener("ended", handleEnded)

    return () => {
      audio?.removeEventListener("ended", handleEnded)
    }
  }, [audioRef])

  const play = () => {
    audioRef.current?.play()
    setIsPlaying(true)
  }

  const pause = () => {
    audioRef.current?.pause()
    setIsPlaying(false)
  }

  const stop = () => {
    if (!audioRef.current) return
    audioRef.current.pause()
    audioRef.current.currentTime = 0
    setIsPlaying(false)
  }

  return {
    isPlaying,
    play,
    pause,
    stop,
  }
}
