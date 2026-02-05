"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { useRef, useState } from "react"

interface SpotlightProps {
  children: React.ReactNode
  className?: string
}

export function Spotlight({ children, className }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setOpacity(0)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300" style={{ opacity }}>
        <div
          className="absolute inset-0 z-10 bg-gradient-to-r from-primary/20 to-transparent opacity-0 blur-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.15 : 0,
            transform: `translate(${position.x}px, ${position.y}px)`,
            width: "50%",
            height: "50%",
            left: "-25%",
            top: "-25%",
          }}
        />
        <div
          className="absolute left-0 top-0 h-40 w-40 rounded-full bg-primary/25 blur-3xl"
          style={{
            opacity: isHovered ? 0.3 : 0,
            transform: `translate(${position.x}px, ${position.y}px)`,
            left: "-20px",
            top: "-20px",
          }}
        />
      </div>
      {children}
    </div>
  )
}