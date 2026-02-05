"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface AnimatedGradientTextProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedGradientText({ children, className }: AnimatedGradientTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const textElement = textRef.current
    if (!textElement) return

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = textElement.getBoundingClientRect()
      const x = ((e.clientX - left) / width) * 100
      const y = ((e.clientY - top) / height) * 100

      textElement.style.setProperty("--x-position", `${x}%`)
      textElement.style.setProperty("--y-position", `${y}%`)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <h1
      ref={textRef}
      className={cn(
        "bg-gradient-to-br from-green-500 via-green-400 to-green-300 bg-clip-text text-transparent",
        "animate-gradient-text relative transition-all duration-300",
        "hover:from-green-600 hover:via-green-500 hover:to-green-300",
        "after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_var(--x-position,25%)_var(--y-position,25%),rgba(255,255,255,0.2),transparent_50%)]",
        "after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500",
        className,
      )}
    >
      {children}
    </h1>
  )
}