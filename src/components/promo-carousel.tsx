/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

interface PromoSlide {
  id: string
  title: string
  description: string
  discount: string
  badge: string
  gradient: string
  textColor: string
  ctaText: string
  ctaLink: string
  image?: string
}

const promoData: PromoSlide[] = [
  {
    id: "1",
    title: "Desconto de Verão",
    description: "Aproveite até 50% de desconto em produtos selecionados",
    discount: "-50%",
    badge: "OFERTA LIMITADA",
    gradient: "from-green-500 via-green-400 to-cyan-400",
    textColor: "text-white",
    ctaText: "Comprar Agora",
    ctaLink: "/produtos",
    image: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 400\"><rect fill=\"%230ea5e9\" width=\"600\" height=\"400\"/><circle cx=\"150\" cy=\"100\" r=\"80\" fill=\"%2306b6d4\" opacity=\"0.5\"/><circle cx=\"500\" cy=\"300\" r=\"120\" fill=\"%232563eb\" opacity=\"0.5\"/><path d=\"M 100 250 Q 300 100 500 250\" stroke=\"%23fff\" strokeWidth=\"3\" fill=\"none\" opacity=\"0.3\"/></svg>')",
  },
  {
    id: "2",
    title: "Novo em Stock",
    description: "Conheça a nossa nova coleção de produtos premium",
    discount: "NOVO",
    badge: "LANÇAMENTO",
    gradient: "from-purple-500 via-pink-400 to-red-400",
    textColor: "text-white",
    ctaText: "Explorar",
    ctaLink: "/produtos",
    image: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 400\"><rect fill=\"%23a855f7\" width=\"600\" height=\"400\"/><circle cx=\"300\" cy=\"200\" r=\"100\" fill=\"%23ec4899\" opacity=\"0.6\"/><rect x=\"50\" y=\"50\" width=\"500\" height=\"300\" fill=\"none\" stroke=\"%23fff\" strokeWidth=\"2\" opacity=\"0.3\" rx=\"20\"/></svg>')",
  },
  {
    id: "3",
    title: "Frete Grátis",
    description: "Compre agora e receba frete grátis em todo o país",
    discount: "GRÁTIS",
    badge: "ENVIO INCLUÍDO",
    gradient: "from-green-500 via-emerald-400 to-teal-400",
    textColor: "text-white",
    ctaText: "Ver Catálogo",
    ctaLink: "/produtos",
    image: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 400\"><rect fill=\"%2310b981\" width=\"600\" height=\"400\"/><path d=\"M 100 200 L 200 100 L 300 200 L 400 100 L 500 200 L 600 100\" stroke=\"%23fff\" strokeWidth=\"3\" fill=\"none\" opacity=\"0.4\"/><circle cx=\"300\" cy=\"250\" r=\"60\" fill=\"%231f2937\" opacity=\"0.3\"/></svg>')",
  },
  {
    id: "4",
    title: "Black Friday",
    description: "Mega promoção chegando em breve, fique atento!",
    discount: "EM BREVE",
    badge: "FIQUE LIGADO",
    gradient: "from-slate-800 via-slate-700 to-slate-600",
    textColor: "text-yellow-300",
    ctaText: "Notificar",
    ctaLink: "/contacto",
    image: "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 600 400\"><rect fill=\"%231e293b\" width=\"600\" height=\"400\"/><text x=\"300\" y=\"200\" fontSize=\"80\" fontWeight=\"bold\" fill=\"%23fbbf24\" textAnchor=\"middle\" opacity=\"0.2\">50%</text></svg>')",
  },
]

export function PromoCarousel() {
  const { t } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % promoData.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + promoData.length) % promoData.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  useEffect(() => {
    if (!autoPlay) return

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoData.length)
    }, 6000)

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [autoPlay])

  const handleMouseEnter = () => {
    setAutoPlay(false)
  }

  const handleMouseLeave = () => {
    setAutoPlay(true)
  }

  const slide = promoData[currentSlide]

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Carousel Container */}
        <div
          className="relative rounded-xl overflow-hidden group"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Carousel Slides */}
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
            {promoData.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.gradient}`}
                  style={{
                    backgroundImage: item.image,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 sm:p-8 lg:p-12">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className={`w-4 h-4 ${item.textColor}`} />
                    <span className={`text-xs sm:text-sm font-bold tracking-widest ${item.textColor}`}>
                      {item.badge}
                    </span>
                  </div>

                  {/* Title and Description */}
                  <div className="max-w-md">
                    <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${item.textColor} mb-3 leading-tight`}>
                      {item.title}
                    </h2>
                    <p className={`text-base sm:text-lg ${item.textColor} opacity-90 mb-6`}>{item.description}</p>
                  </div>

                  {/* Discount and CTA */}
                  <div className="flex items-center gap-6">
                    <div className={`text-3xl sm:text-4xl font-black ${item.textColor}`}>{item.discount}</div>
                    <Link href={item.ctaLink}>
                      <Button
                        size="lg"
                        className="bg-white hover:bg-gray-100 text-slate-900 font-semibold shadow-lg hover:shadow-xl transition-all"
                      >
                        {item.ctaText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 transition-all duration-300 opacity-0 group-hover:opacity-100 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
            {promoData.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSlide
                    ? "w-8 h-3 bg-white"
                    : "w-3 h-3 bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Autoplay Indicator */}
          <div className="absolute top-6 right-6 z-10 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            {autoPlay ? "Auto-play" : "Pausado"}
          </div>
        </div>

        {/* Slide Counter */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          {currentSlide + 1} / {promoData.length}
        </div>
      </div>
    </section>
  )
}
