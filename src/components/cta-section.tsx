"use client"
import { motion } from "framer-motion"
import { Phone, Mail } from "lucide-react"
import Link from "next/link"
import { useState, type FormEvent } from "react"

export default function CTASectionAlternative() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Construir o assunto e corpo do email
    const subject = `Contato de ${name} via Website`
    const body = `Nome: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMensagem: ${message || "Estou interessado nas suas soluções."}`

    // Criar o link mailto e redirecionar
    const mailtoLink = `mailto:info@mundosaudavel.ao?subject=${encodeURIComponent(subject)}&body=${body}`
    window.location.href = mailtoLink
  }

  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-br from-[#1F8A70] to-green-600 overflow-x-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-white text-sm font-medium">
              Soluções Tecnológicas
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Pronto para transformar o seu negócio?
            </h2>

            <p className="text-lg md:text-xl text-white/90 max-w-xl">
              Entre em contacto connosco hoje mesmo e descubra como as nossas soluções podem ajudar a sua empresa a
              crescer.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-green-600 font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Solicitar Orçamento
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/servicos"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20"
                >
                  Ver Serviços
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {/* Right side - Contact card */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-white/5 rounded-3xl transform rotate-3 scale-105" />
            <div className="relative bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-green-600 mb-6">Fale Connosco</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telefone</p>
                    <Link href="tel:+244923924881" className="text-green-600 hover:underline">
                    +244 923 924 881
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <Link
                      href="mailto:info@mundosaudavel.ao"
                      className="text-green-600 hover:underline break-all"
                    >
                      info@mundosaudavel.ao
                    </Link>
                  </div>
                </div>

                <form className="space-y-4 pt-4" onSubmit={handleSubmit}>
                  <div>
                    <input
                      type="text"
                      placeholder="O seu nome"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="O seu email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="A sua mensagem (opcional)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 bg-gradient-to-r from-[#1F8A70] to-green-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Enviar Mensagem
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}