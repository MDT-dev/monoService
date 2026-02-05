"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Pause, Play, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
const heroImages = [
  {
    src: "/carousel/c1.jpg",
    alt: "Materiais de construção para obras residenciais e comerciais",
    title: "Materiais de Construção de Qualidade",
    subtitle: "Tudo para a sua obra: cimento, blocos, areia, brita e muito mais",
    cta: "Ver Materiais de Construção",
    stats: { value: "10.000+", label: "Produtos Disponíveis" },
  },
  {
    src: "/carousel/c2.jpg",
    alt: "Materiais elétricos profissionais para instalações seguras",
    title: "Materiais Elétricos Certificados",
    subtitle: "Cabos, disjuntores, quadros elétricos e acessórios de alta segurança",
    cta: "Comprar Material Elétrico",
    stats: { value: "100%", label: "Produtos Certificados" },
  },
  {
    src: "/carousel/c3.jpg",
    alt: "Ferramentas e equipamentos para construção civil",
    title: "Ferramentas para Profissionais",
    subtitle: "Equipamentos resistentes para obras, reformas e manutenção",
    cta: "Explorar Ferramentas",
    stats: { value: "500+", label: "Ferramentas em Stock" },
  },
  {
    src: "/carousel/c4.jpg",
    alt: "Tintas e acabamentos para construção e decoração",
    title: "Tintas e Acabamentos",
    subtitle: "Tintas, vernizes e revestimentos para um acabamento perfeito",
    cta: "Ver Tintas e Acabamentos",
    stats: { value: "1.000+", label: "Cores Disponíveis" },
  },
  {
    src: "/carousel/c5.jpg",
    alt: "Materiais hidráulicos para canalização e saneamento",
    title: "Materiais Hidráulicos",
    subtitle: "Tubos, conexões, torneiras e soluções completas de canalização",
    cta: "Comprar Material Hidráulico",
    stats: { value: "2.500+", label: "Itens Hidráulicos" },
  },
  {
    src: "/carousel/c6.jpg",
    alt: "Equipamentos de proteção individual para construção",
    title: "Equipamentos de Segurança",
    subtitle: "Capacetes, luvas, botas e EPIs para proteção no trabalho",
    cta: "Ver Equipamentos de Segurança",
    stats: { value: "99%", label: "Conformidade com Normas" },
  },
  {
    src: "/carousel/c7.jpg",
    alt: "Loja online de materiais de construção e elétricos",
    title: "Tudo para a Sua Obra num Só Lugar",
    subtitle: "Compra rápida, preços competitivos e entrega confiável",
    cta: "Comprar Agora",
    stats: { value: "24/7", label: "Compras Online" },
  },
]


export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length)
    setProgress(0)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + heroImages.length) % heroImages.length)
    setProgress(0)
  }, [])

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index)
    setProgress(0)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }, [])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
    setProgress(0)
  }

  useEffect(() => {
    if (!isPlaying || isPaused) return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide()
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(interval)
  }, [isPlaying, isPaused, nextSlide])

  const handleManualNavigation = (action: () => void) => {
    action()
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden mt-1">
      {/* Imagens */}
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {heroImages.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <Image
              src={image.src || "/placeholder.svg"}
              alt={image.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

            {/* Sobreposição de Conteúdo */}
            <div className="absolute inset-0 flex items-center">
              <div className="container">
                <div className="max-w-3xl text-white">
                  {/* Selo de Estatísticas */}
                  <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-6 py-2 mb-6">
                    <span className="text-2xl font-bold text-green-400">{image.stats.value}</span>
                    <span className="ml-2 text-sm opacity-90">{image.stats.label}</span>
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">{image.title}</h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90 leading-relaxed max-w-2xl">{image.subtitle}</p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-4 h-auto">
                      {image.cta}
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-green-600 text-lg px-8 py-4 h-auto bg-transparent"
                    >
                      Ver Demonstração
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controles de Navegação */}
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md border-0 text-white h-14 w-14 shadow-xl"
        onClick={() => handleManualNavigation(prevSlide)}
        aria-label="Imagem anterior"
      >
        <ChevronLeft className="h-7 w-7" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-md border-0 text-white h-14 w-14 shadow-xl"
        onClick={() => handleManualNavigation(nextSlide)}
        aria-label="Próxima imagem"
      >
        <ChevronRight className="h-7 w-7" />
      </Button>

      <Button
        variant="secondary"
        size="icon"
        className="absolute top-6 right-6 bg-white/20 hover:bg-white/30 backdrop-blur-md border-0 text-white h-12 w-12 shadow-xl"
        onClick={togglePlayPause}
        aria-label={isPlaying ? "Pausar slideshow" : "Iniciar slideshow"}
      >
        {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
      </Button>

      {/* Indicadores com Progresso */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`relative w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para slide ${index + 1}`}
          >
            {index === currentIndex && isPlaying && !isPaused && (
              <div
                className="absolute inset-0 rounded-full border-2 border-green-400"
                style={{
                  background: `conic-gradient(from 0deg, #10b981 ${progress * 3.6}deg, transparent ${progress * 3.6}deg)`,
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Indicador de Rolagem */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2 opacity-75">Role para explorar</span>
          <ArrowDown className="h-6 w-6" />
        </div>
      </div>

      {/* Informação Lateral */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:block">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-white">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">{String(currentIndex + 1).padStart(2, "0")}</div>
            <div className="text-sm opacity-75">de {String(heroImages.length).padStart(2, "0")}</div>
          </div>
        </div>
      </div>
    </section>
  )
}