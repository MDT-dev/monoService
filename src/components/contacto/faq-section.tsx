"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// FAQ data with structured data for SEO
const faqData = [
  {
    question: "Quais são os métodos de pagamento aceites?",
    answer:
      "Aceitamos pagamentos por transferência bancária, depósito e pagamento em numerário. Para projetos maiores, oferecemos planos de pagamento flexíveis adaptados às necessidades do cliente.",
  },
  {
    question: "Quanto tempo demora a implementação de um software?",
    answer:
      "O tempo de implementação varia de acordo com a complexidade do projeto. Geralmente, projetos simples podem levar de 1 a 2 semanas, enquanto projetos mais complexos podem levar de 1 a 3 meses. Fornecemos sempre um cronograma detalhado antes de iniciar qualquer projeto.",
  },
  {
    question: "Oferecem suporte técnico após a implementação?",
    answer:
      "Sim, oferecemos suporte técnico contínuo para todos os nossos produtos e serviços. Temos diferentes planos de suporte para atender às necessidades específicas de cada cliente, incluindo suporte remoto, presencial e pacotes de manutenção preventiva.",
  },
  {
    question: "Fazem formação para os utilizadores?",
    answer:
      "Sim, oferecemos formação completa para os utilizadores dos nossos sistemas. A formação pode ser realizada nas nossas instalações ou nas instalações do cliente. Também disponibilizamos materiais de formação e vídeos tutoriais para referência futura.",
  },
  {
    question: "Trabalham com empresas de todos os tamanhos?",
    answer:
      "Sim, trabalhamos com empresas de todos os tamanhos, desde startups até grandes corporações. Adaptamos as nossas soluções às necessidades específicas de cada cliente, independentemente do tamanho da empresa.",
  },
  {
    question: "Oferecem serviços de consultoria em TI?",
    answer:
      "Sim, oferecemos serviços de consultoria em TI para ajudar as empresas a identificar as melhores soluções tecnológicas para os seus negócios. A nossa equipa de consultores experientes pode ajudar a desenvolver estratégias de TI alinhadas com os objetivos de negócio.",
  },
]

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <section id="FAQ" className="py-16 md:py-24 bg-green-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-green-700 bg-green-100 px-4 py-1 rounded-full text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas Frequentes</h2>
          <p className="text-muted-foreground text-lg">
            Encontre respostas para as perguntas mais comuns sobre os nossos produtos e serviços.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-white rounded-lg shadow-sm border border-green-100 overflow-hidden"
              >
                <AccordionTrigger
                  className="px-6 py-4 hover:bg-green-50 transition-colors text-left font-medium"
                  onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2">
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </motion.div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Additional questions CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Não encontrou a resposta que procura? Entre em contacto connosco.
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Fazer uma pergunta
          </a>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqData.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}