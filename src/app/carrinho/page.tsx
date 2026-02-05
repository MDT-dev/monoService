"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import NextLink from "next/link"
import { useCart } from "@/lib/cart-context"
import { Trash2, Plus, Minus, MessageCircle } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function CartPage() {
  const { t } = useLanguage()
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart()
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(false)
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")

  const subtotal = total
  const shipping = 0
  const tax = subtotal * 0.23
  const finalTotal = subtotal + shipping + tax

  const generateWhatsAppMessage = () => {
    const itemsList = items
      .map((item) => `• ${item.name} (${item.quantity}x) - AOA${(item.price * item.quantity).toFixed(2)}`)
      .join("\n")

    return `Olá! Gostaria de fazer uma encomenda:

${itemsList}

*Subtotal:* AOA${subtotal.toFixed(2)}
*Envio:* Grátis
*Total:* AOA${finalTotal.toFixed(2)}

*Dados do Cliente:*
Nome: ${customerName}
Telefone: ${customerPhone}

Obrigado!`
  }

  const sendToWhatsApp = () => {
    if (!customerName.trim() || !customerPhone.trim()) {
      alert("Por favor, preencha o nome e telefone")
      return
    }

    const message = generateWhatsAppMessage()
    const encodedMessage = encodeURIComponent(message)
    // Portuguese phone number format - change to your business WhatsApp number
    const whatsappNumber = "244942093530" // Replace with your WhatsApp number
    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`, "_blank")

    clearCart()
    setShowWhatsAppPrompt(false)
    setCustomerName("")
    setCustomerPhone("")
  }

  if (showWhatsAppPrompt) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Detalhes para Envio da Encomenda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                <p className="text-sm text-primary/90">
                  A sua encomenda será enviada via WhatsApp. Por favor, confirme os seus dados.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="João Silva"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Telefone *</label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="+351 912 345 678"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-muted p-5 rounded-lg space-y-3">
                <h3 className="font-bold text-foreground mb-4">Resumo da Encomenda:</h3>
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium">AOA{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between font-bold">
                  <span>Total:</span>
                  <span className="text-primary text-lg">AOA{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={() => setShowWhatsAppPrompt(false)} variant="outline" className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={sendToWhatsApp}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Enviar via WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/30 to-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-12">{t("cart.title")}</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛒</div>
            <p className="text-xl text-muted-foreground mb-8">{t("cart.empty")}</p>
            <NextLink href="/produtos">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3">
                {t("cart.continueShopping")}
              </Button>
            </NextLink>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0 hover:bg-muted/50 p-3 rounded-lg transition-all"
                      >
                        <Image

                          src={item.image}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="rounded-lg object-cover shadow-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-bold text-foreground text-lg">{item.name}</h3>
                          <p className="text-muted-foreground text-sm">{item.category}</p>
                          <p className="font-bold text-primary text-lg mt-2">AOA{item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex flex-col items-end gap-3">
                          <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1.5 hover:bg-muted-foreground/20 rounded transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-muted-foreground/20 rounded transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive/80 hover:bg-destructive/10 p-2 rounded-lg transition-all"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <Card className="border-0 shadow-lg sticky top-24">
                <CardHeader>
                  <CardTitle>Resumo da Encomenda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">AOA{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Envio</span>
                      <span className="font-medium text-green-600">Grátis</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">AOA{tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-3 flex justify-between">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        AOA{finalTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowWhatsAppPrompt(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 shadow-lg hover:shadow-xl transition-all"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Enviar via WhatsApp
                  </Button>

                  <NextLink href="/checkout" className="block">
                    <Button
                      variant="outline"
                      className="w-full border-accent text-accent hover:bg-accent/5 font-semibold py-3 bg-transparent"
                    >
                      {t("checkout.placeOrder")}
                    </Button>
                  </NextLink>

                  <div className="bg-muted p-4 rounded-lg space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>Envio gratuito</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>Devolução em 30 dias</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-accent mt-0.5">✓</span>
                      <span>Garantia de 1 ano</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
