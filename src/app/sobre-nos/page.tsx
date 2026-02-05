import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {

  ArrowRight,
} from "lucide-react";
import PartnersSection from "./partners-section"; 
import HeroSection from "@/components/contacto/hero-section";
import AboutUs from "@/components/sobre-Nos/sobre";
import Meeting from "../../../public/switchMeeting.webp"


export default function SobrePage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        Description="Conheça a história, missão e valores da Mundo Saudável."
        StaticImage={ Meeting}
        message="Permita que nos apresentemos a si"
        title="Sobre Nós"
      />

      <AboutUs />


      {/* Partners Section with green Background */}
      <section className="">
        <PartnersSection />
      </section>

      {/* CTA Section */}
      <section className="py-24 ">
        <div className="container">
          <Card className="border-0 shadow-2xl overflow-hidden max-w-5xl mx-auto">
            <CardContent className="p-0 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F8A70]  to-green-600"></div>
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10 p-12 md:p-16 text-center text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-up">
                  Vamos trabalhar juntos?
                </h2>
                <p className="text-xl text-balance md:text-2xl mb-10 animate-fade-up delay-100 text-white/90 max-w-3xl mx-auto leading-relaxed">
                  Entre em contacto connosco para discutir como podemos ajudar o
                  seu negócio a crescer com as nossas soluções.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fade-up delay-200">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all duration-300 font-semibold"
                  >
                    <Link href="/contacto" className="inline-flex items-center">
                      Fale Connosco
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 font-semibold"
                  >
                    <Link href="/produtos" className="inline-flex items-center">
                      Ver Produtos
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}

