"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { BookOpen, ChevronLeft, ShoppingCart, Trash2 } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"
import type { Ebook } from "@/interfaces"
import Image from "next/image"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Esquema de validación con Zod
const checkoutFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
})

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

export default function CartClient() {
  const { items, removeItem } = useCartStore()
  const [cartEbooks, setCartEbooks] = useState<Ebook[]>([])

  useEffect(() => {
    async function fetchEbooks() {
      if (items.length === 0) {
        setCartEbooks([])
        return
      }
      const { data } = await supabase
        .from("ebooks")
        .select("*")
        .in("id", items)
      setCartEbooks(data || [])
    }
    fetchEbooks()
  }, [items])

  // Cálculos
  const subtotal = cartEbooks.reduce((total, item) => total + (item.price || 0), 0)
  const tax = subtotal * 0.16
  const total = subtotal + tax

  // Definir el formulario con react-hook-form y zod
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
    },
  })

  const handleProceedToCheckout = (data: CheckoutFormValues) => {
    // Guardar el email en localStorage para usarlo en el checkout
    localStorage.setItem("customer_email", data.email)

    // Redirigir a checkout (en una implementación real)
    window.location.href = "/checkout"
  }

  return (
    <div className="py-12 md:py-16">
      <div className="w-full px-4 md:px-6">
        <div className="mb-8">
          <Button variant="ghost" size="sm" asChild className="group">
            <Link href="/ebooks">
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Continue shopping
            </Link>
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in">
              Your Shopping Cart
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto animate-fade-in-delay">
              Review and manage the ebooks you&apos;ve added to your cart.
            </p>
          </div>
        </div>

        {cartEbooks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">You haven&apos;t added any ebooks to your cart yet.</p>
            <Button asChild className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
              <Link href="/ebooks">Explore ebooks</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Ebooks in your cart</h2>
                  <div className="space-y-6">
                    {cartEbooks.map(
                      (item) =>
                        item && (
                          <div key={item.id} className="flex flex-col sm:flex-row gap-4 pb-6 border-b">
                            <div className="relative aspect-[3/4] w-full sm:w-32 bg-purple-100 rounded-lg overflow-hidden">
                              {item.cover_url ? (
                                <Image
                                  src={item.cover_url}
                                  alt={item.title}
                                  fill
                                  style={{ objectFit: "cover" }}
                                  className="transition-transform duration-500"
                                  sizes="(max-width: 768px) 100vw, 33vw"
                                />
                              ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <BookOpen className="h-10 w-10 text-purple-600" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 space-y-2">
                              <h3 className="font-bold">{item.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <span className="mr-2">Author:</span>
                                <span>{item.author}</span>
                              </div>
                            </div>
                            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4">
                              <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-muted-foreground transition-all duration-300 hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="rounded-lg border shadow-sm overflow-hidden">
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Order summary</h2>
                  <div className="space-y-4">
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

                    {/* Campo de correo electrónico con validación Zod */}
                    <div className="space-y-4 mt-6">
                      <Alert
                        variant="default"
                        className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800"
                      >
                        <InfoIcon className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                        <AlertDescription className="text-sm text-purple-700 dark:text-purple-300">
                          Enter your email to receive your ebooks after purchase.
                        </AlertDescription>
                      </Alert>

                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleProceedToCheckout)} className="space-y-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Email</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="your@email.com"
                                    type="email"
                                    {...field}
                                    className="transition-all duration-300 focus:border-purple-500 focus:ring-purple-500"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <Button
                            type="submit"
                            size="lg"
                            className="w-full transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                          >
                            Proceed to payment
                          </Button>
                        </form>
                      </Form>

                      <p className="text-xs text-center text-muted-foreground mt-2">
                        By proceeding to payment, you agree to our{" "}
                        <Link
                          href="/terms"
                          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline underline-offset-2"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                          href="/privacy"
                          className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline underline-offset-2"
                        >
                          Privacy Notice
                        </Link>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
