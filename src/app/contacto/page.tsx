import type { Metadata } from "next";
import FaqSection from "@/components/contacto/faq-section";
import HeroSection from "@/components/contacto/hero-section";
import ContactSection from "@/components/contacto/contactSolution/Contact-New";


// SEO metadata
export const metadata: Metadata = {
  title: "Contacte-nos | Mundo Saudável",
  description:
    "Entre em contacto com a Mundo Saudável para serviços e produtos de agricultura, pecuária, apicultura, avicultura e piscicultura. Estamos disponíveis para responder a todas as suas questões.",
  keywords:
    "contacto, agricultura Angola, pecuária Angola, apicultura, avicultura, piscicultura, fornecedores agrícolas, Angola, Luanda, Mundo Saudável",
  openGraph: {
    title: "Contacte-nos | Mundo Saudável",
    description:
      "Fale com a Mundo Saudável e descubra como podemos fornecer produtos agrícolas frescos e serviços de pecuária, apicultura, avicultura e piscicultura.",
    url: "https://mundosaudavel.ao/contacto",
    siteName: "Mundo Saudável",
    locale: "pt_AO",
    type: "website",
  },
};

export default function ContactoPage() {
  return (
    <main className="flex flex-col min-h-screen ">
      {/* Hero Section */}

      <HeroSection
        Description="Entre em contato com nossa equipe de especialistas em agricultura. Estamos aqui para ajudar você a crescer."
        StaticImage={"/assets/logo2.png"}
        message="Estamos aqui para ajudar"
        title="Contacte-nos"
      />

      <ContactSection />

      {/* FAQ Section */}
      <FaqSection />
    </main>
  );
}