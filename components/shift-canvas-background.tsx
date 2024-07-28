"use client"

import React, { useEffect, useRef } from "react"
import { createNoise3D } from "simplex-noise"

// Helper functions
const rand = (max: number) => Math.random() * max
const fadeInOut = (t: number, m: number) => {
  let hm = 0.5 * m
  return Math.abs(((t + hm) % m) - hm) / hm
}

export const ShiftCanvasBackground = () => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const circleCount = 150
    const circlePropCount = 8
    const circlePropsLength = circleCount * circlePropCount
    const baseSpeed = 0.1
    const rangeSpeed = 1
    const baseTTL = 150
    const rangeTTL = 200
    const baseRadius = 100
    const rangeRadius = 200
    const rangeHue = 60
    const xOff = 0.0015
    const yOff = 0.0015
    const zOff = 0.0015
    const backgroundColor = "hsla(0,0%,5%,1)"

    let canvas: HTMLCanvasElement,
      ctx: CanvasRenderingContext2D,
      circleProps: Float32Array,
      baseHue: number

    const initCircles = () => {
      circleProps = new Float32Array(circlePropsLength)
      baseHue = 220

      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        initCircle(i)
      }
    }

    const initCircle = (i: number) => {
      const x = rand(canvas.width)
      const y = rand(canvas.height)
      const n = createNoise3D()(x * xOff, y * yOff, baseHue * zOff)
      const t = rand(Math.PI * 2)
      const speed = baseSpeed + rand(rangeSpeed)
      const vx = speed * Math.cos(t)
      const vy = speed * Math.sin(t)
      const life = 0
      const ttl = baseTTL + rand(rangeTTL)
      const radius = baseRadius + rand(rangeRadius)
      const hue = baseHue + n * rangeHue

      circleProps.set([x, y, vx, vy, life, ttl, radius, hue], i)
    }

    const updateCircles = () => {
      baseHue++

      for (let i = 0; i < circlePropsLength; i += circlePropCount) {
        updateCircle(i)
      }
    }

    const updateCircle = (i: number) => {
      let x = circleProps[i]
      let y = circleProps[i + 1]
      const vx = circleProps[i + 2]
      const vy = circleProps[i + 3]
      let life = circleProps[i + 4]
      const ttl = circleProps[i + 5]
      const radius = circleProps[i + 6]
      const hue = circleProps[i + 7]

      drawCircle(x, y, life, ttl, radius, hue)

      life++

      circleProps[i] = x + vx
      circleProps[i + 1] = y + vy
      circleProps[i + 4] = life
      ;(checkBounds(x, y, radius) || life > ttl) && initCircle(i)
    }

    const drawCircle = (
      x: number,
      y: number,
      life: number,
      ttl: number,
      radius: number,
      hue: number
    ) => {
      ctx.save()
      ctx.fillStyle = `hsla(${hue},60%,30%,${fadeInOut(life, ttl)})`
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fill()
      ctx.closePath()
      ctx.restore()
    }

    const checkBounds = (x: number, y: number, radius: number) => {
      return (
        x < -radius ||
        x > canvas.width + radius ||
        y < -radius ||
        y > canvas.height + radius
      )
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const render = () => {
      ctx.save()
      ctx.filter = "blur(50px)"
      ctx.drawImage(canvas, 0, 0)
      ctx.restore()
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = backgroundColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      updateCircles()
      render()
      window.requestAnimationFrame(draw)
    }

    if (canvasRef.current) {
      canvas = canvasRef.current
      ctx = canvas.getContext("2d") as CanvasRenderingContext2D

      resize()
      initCircles()
      draw()
    }

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[-1] h-screen w-full"
      style={{ width: "100%", height: "100vh" }}
    >
      <canvas ref={canvasRef} className="size-full" />
    </div>
  )
}
