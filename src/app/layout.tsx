import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google";

import { Navbar } from "@/components/navbar"
import Footer from "@/components/footer/footer"
import { LanguageProvider } from "@/contexts/language-context"
import { CartProvider } from "@/lib/cart-context"
import { Suspense } from "react"
import "./globals.css"
import { Providers } from "@/contexts/providers";
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes"


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.milones.ao'),
  title: 'Milones Lda - Soluções Profissionais',
  description: 'Compre produtos de qualidade com os melhores preços. Entrega rápida e garantia de satisfação.',
  generator: 'milones-website',
  keywords: ['loja online', 'produtos', 'compras', 'melhor preço', 'entrega rápida'],
  openGraph: {
    type: 'website',
    locale: 'pt_AO',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.milones.ao',
    siteName: 'Milones Lda',
    title: 'Milones Lda - Soluções Profissionais',
    description: 'Compre produtos de qualidade com os melhores preços. Entrega rápida e garantia de satisfação.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Milones',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Milones Lda - Soluções Profissionais',
    description: 'Compre produtos de qualidade com os melhores preços.',
    creator: '@milones',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      {
        url: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    apple: '/apple-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}











export const viewport: Viewport = {
  colorScheme: "light dark",
};

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        <LanguageProvider>
          <ThemeProvider attribute="class" enableSystem={true} defaultTheme="light">
            <CartProvider>
              <Providers>
                <div className="">
                  <Suspense fallback={<div>Loading...</div>}>
                    <Navbar />
                  </Suspense>
                  <main className=""> {children} </main>
                  <Toaster />
                  <Suspense fallback={<div>Loading...</div>}>
                    <Footer />
                  </Suspense>
                </div>
              </Providers>
            </CartProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
