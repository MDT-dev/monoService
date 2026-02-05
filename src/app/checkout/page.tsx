"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, AlertCircle } from "lucide-react"

// Gerar referência única do pedido
const gerarReferenciaPedido = (): string => {
  const randomPart = Math.random().toString(36).substr(2, 9).toUpperCase()
  return `MS-${randomPart}`
}

interface FormData {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  paymentMethod: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  country?: string
  paymentMethod?: string
}

export default function CheckoutPage() {
  const router = useRouter()
  const referenciaPedido = useMemo(() => gerarReferenciaPedido(), [])

  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "",
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = 299.99
  const shipping = 0
  const tax = subtotal * 0.23
  const total = subtotal + shipping + tax

  const validarFormulario = (): boolean => {
    const novosErros: FormErrors = {}

    if (!formData.fullName.trim()) novosErros.fullName = "O nome completo é obrigatório"
    if (!formData.email.trim()) {
      novosErros.email = "O email é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      novosErros.email = "Informe um email válido"
    }

    if (!formData.phone.trim()) novosErros.phone = "O número de telefone é obrigatório"
    if (!formData.address.trim()) novosErros.address = "O endereço é obrigatório"
    if (!formData.city.trim()) novosErros.city = "A cidade é obrigatória"
    if (!formData.postalCode.trim()) novosErros.postalCode = "O código postal é obrigatório"
    if (!formData.country.trim()) novosErros.country = "O país é obrigatório"
    if (!formData.paymentMethod) novosErros.paymentMethod = "Selecione um método de pagamento"

    setErrors(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validarFormulario()) return

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOrderComplete(true)
    setIsSubmitting(false)
  }

  /* =======================
     TELA DE SUCESSO
  ======================== */
  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-2">
                Pedido realizado com sucesso
              </h1>

              <p className="text-muted-foreground mb-8">
                O seu pedido foi confirmado. Em breve receberá um e-mail com os detalhes.
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8 text-left">
                <h3 className="font-semibold mb-4">Detalhes do Pedido</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Referência:</span>
                    <span className="font-medium">{referenciaPedido}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>AOA {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IVA (23%):</span>
                    <span>AOA {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 font-bold">
                    <span>Total:</span>
                    <span className="text-accent">AOA {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Button onClick={() => router.push("/produtos")} className="w-full mb-3">
                Continuar a comprar
              </Button>
              <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                Voltar para o início
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  /* =======================
     CHECKOUT
  ======================== */
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-2">Finalizar Compra</h1>
        <p className="text-muted-foreground mb-8">
          Conclua a sua compra de forma segura
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FORMULÁRIO */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Entrega e Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* DADOS PESSOAIS */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Dados Pessoais</h3>

                    <Label>Nome Completo *</Label>
                    <Input
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {errors.fullName && <p className="text-destructive text-sm">{errors.fullName}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div>
                        <Label>Email *</Label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
                      </div>

                      <div>
                        <Label>Número de Telefone *</Label>
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                        {errors.phone && <p className="text-destructive text-sm">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* ENDEREÇO */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Endereço de Entrega</h3>

                    <Label>Endereço *</Label>
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                    {errors.address && <p className="text-destructive text-sm">{errors.address}</p>}

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <Input placeholder="Cidade" value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                      <Input placeholder="Código Postal" value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })} />
                      <Input placeholder="País" value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })} />
                    </div>
                  </div>

                  {/* PAGAMENTO */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Método de Pagamento</h3>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(v) => setFormData({ ...formData, paymentMethod: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método de pagamento" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit">Cartão de Crédito</SelectItem>
                        <SelectItem value="paypal">PayPal</SelectItem>
                        <SelectItem value="bank">Transferência Bancária</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.paymentMethod && <p className="text-destructive text-sm">{errors.paymentMethod}</p>}
                  </div>

                  {/* SEGURANÇA */}
                  <div className="bg-green-50 border border-[#1F8A70] p-4 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-[#1F8A70]" />
                    <p className="text-sm text-[#1F8A70]">
                      As suas informações de pagamento são criptografadas e seguras.
                    </p>
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? "A processar..." : "Confirmar Pedido"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* RESUMO */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>AOA {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Envio</span>
                  <span className="text-green-600">Grátis</span>
                </div>
                <div className="flex justify-between font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-accent">AOA {total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
