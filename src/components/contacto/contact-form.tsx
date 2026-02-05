"use client"

import { motion } from "framer-motion"
import { Newspaper, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function NewsPreviewSection() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" as const },
    },
  }

  const iconVariants = {
    animate: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut" as const,
      },
    },
  }

  return (
    <motion.section
      className="py-20 md:py-28 bg-green-50 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-green-100 rounded-br-full opacity-30 z-0" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-100 rounded-tl-full opacity-20 z-0" />

      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 text-center lg:text-left">
          {/* Conteúdo principal */}
          <div className="lg:w-2/3 space-y-6">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full text-green-700 font-medium border border-green-200 shadow-md"
            >
              <Newspaper size={20} />
              Novidades & Dicas da Construção
            </motion.div>

            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
            >
              Informação Útil para a Sua Obra
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-700 max-w-2xl lg:mx-0 mx-auto"
            >
              Fique atualizado com artigos, lançamentos de produtos, dicas técnicas
              e boas práticas sobre materiais de construção, instalações elétricas
              e equipamentos profissionais.
            </motion.p>

            <motion.div variants={itemVariants}>
              <Link href="/noticias" passHref>
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-full shadow-lg group"
                >
                  Ver Todas as Novidades
                  <motion.div
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <ArrowRight size={20} />
                  </motion.div>
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Elemento visual */}
          <motion.div
            className="lg:w-1/3 relative flex justify-center items-center"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-green-300"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                variants={iconVariants}
                animate="animate"
                className="text-green-600"
              >
                <Newspaper size={120} />
              </motion.div>

              {/* Elementos decorativos */}
              <div className="absolute top-8 left-8 w-12 h-12 bg-green-200 rounded-full opacity-60" />
              <div className="absolute bottom-8 right-8 w-16 h-16 bg-green-200 rounded-full opacity-40" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
