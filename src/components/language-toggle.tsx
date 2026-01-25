"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { Languages } from "lucide-react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "pt" : "en")
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleLanguage} className="h-10 w-10 bg-transparent" title={language === "en" ? "Português" : "English"}>
      <Languages className="w-4 h-4" />
      <span className="sr-only">{language === "en" ? "Português" : "English"}</span>
    </Button>
  )
}
