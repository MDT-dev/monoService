"use client"

import {  useState } from "react"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") return false
    return document.documentElement.classList.contains("dark")
  })

  const toggleTheme = () => {
    const html = document.documentElement
    const newIsDark = !isDark

    if (newIsDark) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }

    setIsDark(newIsDark)
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      title={isDark ? "Mudar para modo claro" : "Mudar para modo escuro"}
      className="h-10 w-10 bg-transparent"
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      <span className="sr-only">{isDark ? "Light mode" : "Dark mode"}</span>
    </Button>
  )
}
