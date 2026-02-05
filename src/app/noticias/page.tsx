import type { Metadata } from "next";
import HeroSection from "@/components/contacto/hero-section";
import NewsSection from "@/components/news/news-section";
import { Newsletter } from "@/components/news/newslatter";


// SEO metadata
export const metadata: Metadata = {
  title: "Notícias | Mundo Saudável",
  description:
    "Fique por dentro das últimas notícias e atualizações do setor agrícola, pecuário, apícola, avícola e de piscicultura em Angola. Acompanhe dicas, tendências e novidades da Mundo Saudável.",
  keywords:
    "notícias agricultura Angola, novidades pecuária, atualizações apicultura, tendências avicultura, piscicultura Angola, Mundo Saudável, produtos agrícolas, Angola",
  openGraph: {
    title: "Notícias | Mundo Saudável",
    description:
      "Confira as últimas notícias, dicas e tendências sobre agricultura, pecuária, apicultura, avicultura e piscicultura com a Mundo Saudável.",
    url: "https://mundosaudavel.ao/noticias",
    siteName: "Mundo Saudável",
    locale: "pt_AO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Notícias | Mundo Saudável",
    description:
      "As últimas notícias e atualizações sobre agricultura, pecuária, apicultura, avicultura e piscicultura em Angola.",
    images: ["https://opengraph.b-cdn.net/production/images/42b035f1-c9e1-4041-ba45-ad274b2f58e8.png?token=NPY16yJUvjjGPLWMa5s6FkCuBed9PcL3OW3ar14SU_A&height=111&width=282&expires=33288571292"],
  },
};


export default function ContactoPage() {
  return (
    <main className="flex flex-col min-h-screen ">
      {/* Hero Section */}

      <HeroSection
        Description="Fique informado sobre os avanços mais recentes em tecnologia agrícola e novidades do setor"
        StaticImage={"/assets/logoPreto.png"}
        message="Estamos aqui para te informar"
        title="Últimas Notícias & Atualizações"
      />

      <NewsSection />
      <Newsletter/>
    </main>
  );
}