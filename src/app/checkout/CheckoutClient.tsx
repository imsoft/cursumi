"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, CreditCard, Mail } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "sonner"
import { createClient } from "@supabase/supabase-js"
import type { Ebook } from "@/interfaces"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function CheckoutClient() {
  const router = useRouter()
  const { items } = useCartStore()
  const [cartEbooks, setCartEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)

  const [email, setEmail] = useState("")
  const [confirmEmail, setConfirmEmail] = useState("")
  const [emailError, setEmailError] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    async function fetchEbooks() {
      setLoading(true)
      if (items.length === 0) {
        setCartEbooks([])
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from("ebooks")
        .select("*")
        .in("id", items)
      setCartEbooks(data || [])
      setLoading(false)
    }
    fetchEbooks()
  }, [items])

  useEffect(() => {
    // Recuperar el email si existe en localStorage
    const savedEmail = localStorage.getItem("customer_email")
    if (savedEmail) {
      setEmail(savedEmail)
    }
    // Verificar si hay items en el carrito (solo cuando loading es false)
    if (!loading && items.length === 0) {
      router.push("/cart")
    }
  }, [items.length, loading, router])

  // Cálculos
  const subtotal = cartEbooks.reduce((total, item) => total + (item.price || 0), 0)
  const tax = subtotal * 0.16
  const total = subtotal + tax

  const validateEmails = () => {
    if (!email) {
      setEmailError("Please enter your email address.")
      return false
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regex.test(email)) {
      setEmailError("Please enter a valid email address.")
      return false
    }

    if (email !== confirmEmail) {
      setEmailError("Email addresses do not match.")
      return false
    }

    return true
  }

  const handleCompletePurchase = async () => {
    if (!validateEmails()) return;

    setIsProcessing(true);

    try {
      // Obtener los ebooks del carrito
      const cartItems = cartEbooks.filter((item): item is NonNullable<typeof item> => Boolean(item)).map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        price: item.price,
      }));

      // Llamar al endpoint de Stripe
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: cartItems, email }),
      });
      const { url, error } = await res.json();
      if (url) {
        window.location.href = url;
      } else {
        toast.error(error || "There was an error creating the payment session.");
        setIsProcessing(false);
      }
    } catch (error: any) {
      toast.error(error.message || "Unexpected error.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="py-12 md:py-16">
      <div className="w-full px-4 md:px-6">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="group">
            <Link href="/cart">
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to cart
            </Link>
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in">
              Complete your purchase
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto animate-fade-in-delay">
              Complete your information to receive your ebooks.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-purple-600" />
                  Contact information
                </CardTitle>
                <CardDescription>
                  Enter your email address where you will receive the download links for your ebooks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setEmailError("")
                    }}
                    className="transition-all duration-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmEmail">Confirm email address</Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    placeholder="tu@email.com"
                    value={confirmEmail}
                    onChange={(e) => {
                      setConfirmEmail(e.target.value)
                      setEmailError("")
                    }}
                    className="transition-all duration-300 focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                {emailError && (
                  <Alert variant="destructive">
                    <AlertDescription>{emailError}</AlertDescription>
                  </Alert>
                )}
              </CardContent>

              <CardHeader className="border-t pt-6">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  Payment information
                </CardTitle>
                <CardDescription>For this example, no real payment information is required.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border p-4 bg-slate-50 dark:bg-slate-900">
                  <p className="text-center text-muted-foreground">
                    In a full implementation, Stripe or another payment processor would be integrated here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartEbooks.map(
                  (item) =>
                    item && (
                      <div key={item.id} className="flex justify-between py-2">
                        <div>
                          <p className="font-medium">{item.title}</p>
                          <p className="text-sm text-muted-foreground">Format: PDF</p>
                        </div>
                        <span>${item.price?.toFixed(2) || "0.00"}</span>
                      </div>
                    ),
                )}

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">IVA (16%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                  onClick={handleCompletePurchase}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : "Complete purchase"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
