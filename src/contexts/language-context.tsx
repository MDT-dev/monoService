"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export type Language = "en" | "pt"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.contact": "Contact",
    "nav.cart": "Cart",
    "nav.brand": "Mono Service",
    "nav.search": "Search products...",

    // Hero Section
    "hero.title": "Premium Products & Solutions",
    "hero.subtitle": "Quality You Can Trust",
    "hero.description":
      "Discover our curated selection of professional products and services designed to meet your needs.",
    "hero.shopNow": "Shop Now",
    "hero.featured": "Featured Products",

    // Products
    "products.title": "Our Products",
    "products.categories": "Categories",
    "products.allCategories": "All Categories",
    "products.filter": "Filter by Price",
    "products.sort": "Sort by",
    "products.sortNewest": "Newest",
    "products.sortPrice": "Price: Low to High",
    "products.sortPriceDesc": "Price: High to Low",
    "products.sortRating": "Highest Rated",
    "products.noResults": "No products found",
    "products.addedCart": "Added to cart!",

    // Cart
    "cart.title": "Shopping Cart",
    "cart.empty": "Your cart is empty",
    "cart.continueShopping": "Continue Shopping",
    "cart.quantity": "Quantity",
    "cart.remove": "Remove",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Shipping",
    "cart.tax": "Tax",
    "cart.total": "Total",
    "cart.checkout": "Proceed to Checkout",

    // Checkout
    "checkout.title": "Checkout",
    "checkout.orderSummary": "Order Summary",
    "checkout.fullName": "Full Name",
    "checkout.email": "Email",
    "checkout.phone": "Phone Number",
    "checkout.address": "Delivery Address",
    "checkout.city": "City",
    "checkout.postalCode": "Postal Code",
    "checkout.country": "Country",
    "checkout.paymentMethod": "Payment Method",
    "checkout.creditCard": "Credit Card",
    "checkout.paypal": "PayPal",
    "checkout.bankTransfer": "Bank Transfer",
    "checkout.cardNumber": "Card Number",
    "checkout.expiryDate": "Expiry Date",
    "checkout.cvv": "CVV",
    "checkout.placeOrder": "Place Order",
    "checkout.processing": "Processing...",

    // Footer
    "footer.about": "About Us",
    "footer.aboutText":
      "Mono Service Lda is committed to delivering quality products and exceptional customer service.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact Us",
    "footer.address": "123 Business Street, City, Country",
    "footer.phone": "+244 942 093 530",
    "footer.email": "info@monoservice.com",
    "footer.followUs": "Follow Us",
    "footer.copyright": "© 2026 Mono Service Lda. All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.shipping": "Shipping Info",
    "footer.returns": "Returns & Exchanges",

    // Contact
    "contact.title": "Contact Us",
    "contact.subtitle": "We'd love to hear from you",
    "contact.name": "Your Name",
    "contact.email": "Your Email",
    "contact.subject": "Subject",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.sending": "Sending...",
    "contact.success": "Thank you! We'll get back to you soon.",
    "contact.hours": "Business Hours",
    "contact.mondayFriday": "Monday - Friday: 9:00 AM - 6:00 PM",
    "contact.saturday": "Saturday: 10:00 AM - 4:00 PM",
    "contact.sunday": "Sunday: Closed",
  },
  pt: {
    // Navegação
    "nav.home": "Início",
    "nav.products": "Produtos",
    "nav.contact": "Contacto",
    "nav.cart": "Carrinho",
    "nav.brand": "Mono Service",
    "nav.search": "Pesquisar produtos...",

    // Hero
    "hero.title": "Produtos e Soluções Premium",
    "hero.subtitle": "Qualidade em que Pode Confiar",
    "hero.description":
      "Descubra nossa seleção curada de produtos e serviços profissionais projetados para atender suas necessidades.",
    "hero.shopNow": "Comprar Agora",
    "hero.featured": "Produtos em Destaque",

    // Produtos
    "products.title": "Nossos Produtos",
    "products.categories": "Categorias",
    "products.allCategories": "Todas as Categorias",
    "products.filter": "Filtrar por Preço",
    "products.sort": "Ordenar por",
    "products.sortNewest": "Mais Recente",
    "products.sortPrice": "Preço: Menor para Maior",
    "products.sortPriceDesc": "Preço: Maior para Menor",
    "products.sortRating": "Melhor Avaliado",
    "products.noResults": "Nenhum produto encontrado",
    "products.addedCart": "Adicionado ao carrinho!",

    // Carrinho
    "cart.title": "Carrinho de Compras",
    "cart.empty": "Seu carrinho está vazio",
    "cart.continueShopping": "Continuar Comprando",
    "cart.quantity": "Quantidade",
    "cart.remove": "Remover",
    "cart.subtotal": "Subtotal",
    "cart.shipping": "Envio",
    "cart.tax": "Imposto",
    "cart.total": "Total",
    "cart.checkout": "Prosseguir para Checkout",

    // Checkout
    "checkout.title": "Finalizar Compra",
    "checkout.orderSummary": "Resumo do Pedido",
    "checkout.fullName": "Nome Completo",
    "checkout.email": "Email",
    "checkout.phone": "Número de Telefone",
    "checkout.address": "Endereço de Entrega",
    "checkout.city": "Cidade",
    "checkout.postalCode": "Código Postal",
    "checkout.country": "País",
    "checkout.paymentMethod": "Método de Pagamento",
    "checkout.creditCard": "Cartão de Crédito",
    "checkout.paypal": "PayPal",
    "checkout.bankTransfer": "Transferência Bancária",
    "checkout.cardNumber": "Número do Cartão",
    "checkout.expiryDate": "Data de Validade",
    "checkout.cvv": "CVV",
    "checkout.placeOrder": "Confirmar Pedido",
    "checkout.processing": "Processando...",

    // Rodapé
    "footer.about": "Sobre Nós",
    "footer.aboutText":
      "Mono Service Lda está comprometida em oferecer produtos de qualidade e atendimento excepcional.",
    "footer.quickLinks": "Links Rápidos",
    "footer.contact": "Entre em Contacto",
    "footer.address": "123 Rua de Negócios, Cidade, País",
    "footer.phone": "+244 942 093 530",
    "footer.email": "info@monoservice.com",
    "footer.followUs": "Siga-nos",
    "footer.copyright": "© 2026 Mono Service Lda. Todos os direitos reservados.",
    "footer.privacy": "Política de Privacidade",
    "footer.terms": "Termos de Serviço",
    "footer.shipping": "Informações de Envio",
    "footer.returns": "Devoluções e Trocas",

    // Contacto
    "contact.title": "Contacte-nos",
    "contact.subtitle": "Gostaríamos de ouvir você",
    "contact.name": "Seu Nome",
    "contact.email": "Seu Email",
    "contact.subject": "Assunto",
    "contact.message": "Sua Mensagem",
    "contact.send": "Enviar Mensagem",
    "contact.sending": "Enviando...",
    "contact.success": "Obrigado! Entraremos em contacto em breve.",
    "contact.hours": "Horário de Funcionamento",
    "contact.mondayFriday": "Segunda a Sexta: 9:00 AM - 18:00 PM",
    "contact.saturday": "Sábado: 10:00 AM - 16:00 PM",
    "contact.sunday": "Domingo: Fechado",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") return "en"
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "pt")) {
      return savedLanguage
    }
    return "en"
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
      document.documentElement.lang = language
    }
  }, [language])

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)[typeof language]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
