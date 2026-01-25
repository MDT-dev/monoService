"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Check, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"

// Generate a unique order ID
const generateOrderId = (): string => {
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
  const { t } = useLanguage()
  const orderId = useMemo(() => generateOrderId(), [])
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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required"
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required"
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setOrderComplete(true)
    setIsSubmitting(false)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{t("contact.success")}</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Your order has been placed successfully. You will receive a confirmation email shortly.
              </p>

              <div className="bg-muted p-6 rounded-lg mb-8 text-left">
                <h3 className="font-semibold text-foreground mb-4">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Reference:</span>
                    <span className="font-medium">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal:</span>
                    <span>AOA{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (23%):</span>
                    <span>AOA{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 mt-2 font-bold">
                    <span>Total:</span>
                    <span className="text-accent">AOA{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push("/produtos")}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Continue Shopping
                </Button>
                <Button onClick={() => router.push("/")} variant="outline" className="w-full">
                  Return Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">{t("checkout.title")}</h1>
          <p className="text-muted-foreground">Complete your purchase securely</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Delivery & Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info Section */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="fullName">{t("checkout.fullName")} *</Label>
                        <Input
                          id="fullName"
                          type="text"
                          value={formData.fullName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                          className={errors.fullName ? "border-destructive" : ""}
                          placeholder="John Doe"
                        />
                        {errors.fullName && <p className="text-sm text-destructive mt-1">{errors.fullName}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">{t("checkout.email")} *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            className={errors.email ? "border-destructive" : ""}
                            placeholder="john@example.com"
                          />
                          {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                        </div>

                        <div>
                          <Label htmlFor="phone">{t("checkout.phone")} *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                            className={errors.phone ? "border-destructive" : ""}
                            placeholder="+244 942 093 530"
                          />
                          {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Delivery Address Section */}
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Delivery Address</h3>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">{t("checkout.address")} *</Label>
                        <Input
                          id="address"
                          type="text"
                          value={formData.address}
                          onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                          className={errors.address ? "border-destructive" : ""}
                          placeholder="123 Main Street"
                        />
                        {errors.address && <p className="text-sm text-destructive mt-1">{errors.address}</p>}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">{t("checkout.city")} *</Label>
                          <Input
                            id="city"
                            type="text"
                            value={formData.city}
                            onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                            className={errors.city ? "border-destructive" : ""}
                            placeholder="Lisbon"
                          />
                          {errors.city && <p className="text-sm text-destructive mt-1">{errors.city}</p>}
                        </div>

                        <div>
                          <Label htmlFor="postalCode">{t("checkout.postalCode")} *</Label>
                          <Input
                            id="postalCode"
                            type="text"
                            value={formData.postalCode}
                            onChange={(e) => setFormData((prev) => ({ ...prev, postalCode: e.target.value }))}
                            className={errors.postalCode ? "border-destructive" : ""}
                            placeholder="1000-001"
                          />
                          {errors.postalCode && <p className="text-sm text-destructive mt-1">{errors.postalCode}</p>}
                        </div>

                        <div>
                          <Label htmlFor="country">{t("checkout.country")} *</Label>
                          <Input
                            id="country"
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData((prev) => ({ ...prev, country: e.target.value }))}
                            className={errors.country ? "border-destructive" : ""}
                            placeholder="Portugal"
                          />
                          {errors.country && <p className="text-sm text-destructive mt-1">{errors.country}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Section */}
                  <div className="border-t border-border pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">{t("checkout.paymentMethod")}</h3>
                    <Select
                      value={formData.paymentMethod}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentMethod: value }))}
                    >
                      <SelectTrigger className={errors.paymentMethod ? "border-destructive" : ""}>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="credit-card">{t("checkout.creditCard")}</SelectItem>
                        <SelectItem value="paypal">{t("checkout.paypal")}</SelectItem>
                        <SelectItem value="bank-transfer">{t("checkout.bankTransfer")}</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.paymentMethod && <p className="text-sm text-destructive mt-1">{errors.paymentMethod}</p>}
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900">
                      Your payment information is encrypted and secure. We never store your full credit card details.
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-3 text-base h-auto"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("checkout.processing") : t("checkout.placeOrder")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>{t("checkout.orderSummary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex gap-3 mb-4">
                    <div className="w-16 h-16 rounded-lg bg-muted flex-shrink-0 flex items-center justify-center">
                      <span className="text-2xl">📦</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground text-sm">Premium Business Solution</h3>
                      <p className="text-xs text-muted-foreground">Professional Package</p>
                      <p className="text-xs text-muted-foreground mt-1">Qty: 1</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("checkout.subtotal")}</span>
                    <span className="font-medium">AOA{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t("checkout.shipping")}</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (23%)</span>
                    <span className="font-medium">AOA{tax.toFixed(2)}</span>
                  </div>

                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-bold text-foreground">{t("checkout.total")}</span>
                    <span className="text-2xl font-bold text-accent">AOA{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    <span>1-year product warranty</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
