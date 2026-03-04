"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

// FAQ data with structured data for SEO
const faqData = [
  {
    question: "Quais são os métodos de pagamento aceites?",
    answer:
      "Aceitamos pagamentos por cartão de crédito, transferência bancária, MB Way e pagamento em numerário na entrega (dependendo da localidade). Para compras maiores, oferecemos planos de pagamento flexíveis.",
  },
  {
    question: "Quanto tempo demora a entrega dos produtos?",
    answer:
      "O tempo de entrega varia conforme a sua localização e o stock do produto. Normalmente, entregas em Luanda levam 1 a 3 dias úteis, enquanto para outras províncias podem levar até 7 dias. Fornecemos sempre um número de rastreio para acompanhar a sua encomenda.",
  },
  {
    question: "Posso devolver ou trocar um produto?",
    answer:
      "Sim, aceitamos devoluções ou trocas em até 14 dias após a entrega, desde que o produto esteja em perfeitas condições e na embalagem original. Consulte a nossa política de devolução para mais detalhes.",
  },
  {
    question: "Oferecem suporte em caso de problemas com o pedido?",
    answer:
      "Sim, a nossa equipa de apoio ao cliente está disponível para resolver qualquer problema relacionado com pedidos, entregas ou produtos defeituosos. Pode contactar-nos por email, telefone ou chat online.",
  },
  {
    question: "Fazem envio para todo o país?",
    answer:
      "Sim, realizamos entregas para todas as províncias de Angola. Os custos e prazos variam conforme a localização, e informamos sempre antes da finalização da compra.",
  },
  {
    question: "Oferecem promoções ou descontos especiais?",
    answer:
      "Sim, regularmente temos promoções e descontos exclusivos para clientes registados ou para compras acima de determinado valor. Subscreva a nossa newsletter para receber as últimas ofertas.",
  },
];

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
          <Link
            href="mailto:info@milones.ao"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
          >
            Fazer uma pergunta
          </Link>
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