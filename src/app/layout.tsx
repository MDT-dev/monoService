import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { CartProvider } from "@/lib/cart-context"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mono Service Lda - Soluções Profissionais",
  description:
    "Mono Service Lda oferece produtos e serviços de qualidade. Explore nosso catálogo completo com fácil busca, filtros inteligentes e pagamento seguro.",
  generator: "v0.app",
  colorScheme: "light dark",
}


const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



const themeScript = `
  try {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning  className={inter.variable}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body  className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={<div>Loading...</div>}>
                <Navbar />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Suspense fallback={<div>Loading...</div>}>
                <Footer />
              </Suspense>
            </div>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
