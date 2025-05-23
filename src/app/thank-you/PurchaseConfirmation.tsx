"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, BookOpen, Download } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { createClient } from "@supabase/supabase-js"
import type { Ebook } from "@/interfaces"
import Image from "next/image"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function PurchaseConfirmation() {
  const router = useRouter()
  const { clearCart } = useCartStore()
  const [email, setEmail] = useState("")
  const [cartEbooks, setCartEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Verificar que las variables de entorno estén disponibles
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Missing Supabase environment variables")
      setError("Error de configuración del servidor")
      setLoading(false)
      return
    }

    // Recuperar el email del localStorage
    const savedEmail = localStorage.getItem("customer_email")
    if (!savedEmail) {
      console.log("No email found in localStorage")
      router.push("/")
      return
    }
    setEmail(savedEmail)

    async function fetchPurchaseDetails() {
      try {
        console.log("Fetching purchases for email:", savedEmail)
        
        // Verificar la conexión con Supabase
        const { error: connectionError } = await supabase
          .from("purchases")
          .select("count")
          .limit(1)

        if (connectionError) {
          console.error("Error connecting to Supabase:", connectionError)
          throw new Error("Error de conexión con la base de datos")
        }

        // Obtener los ebooks comprados recientemente por este email
        const { data: purchases, error: purchasesError } = await supabase
          .from("purchases")
          .select("ebook_id, created_at")
          .eq("customer_email", savedEmail)
          .eq("status", "completed")
          .order("created_at", { ascending: false })
          .limit(10)

        if (purchasesError) {
          console.error("Error fetching purchases:", purchasesError)
          throw new Error(purchasesError.message || "Error al obtener las compras")
        }

        console.log("Purchases found:", purchases)

        if (purchases && purchases.length > 0) {
          const ebookIds = purchases.map(p => p.ebook_id)
          console.log("Fetching ebooks with IDs:", ebookIds)
          
          const { data: ebooks, error: ebooksError } = await supabase
            .from("ebooks")
            .select("*")
            .in("id", ebookIds)

          if (ebooksError) {
            console.error("Error fetching ebooks:", ebooksError)
            throw new Error(ebooksError.message || "Error al obtener los ebooks")
          }

          console.log("Ebooks found:", ebooks)
          setCartEbooks(ebooks || [])
        } else {
          console.log("No purchases found for this email")
          setCartEbooks([])
        }
      } catch (error) {
        console.error("Error fetching purchase details:", error)
        if (error instanceof Error) {
          console.error("Error message:", error.message)
          console.error("Error stack:", error.stack)
          setError(error.message)
        } else {
          setError("Error desconocido al obtener los detalles de la compra")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPurchaseDetails()

    // Limpiar el carrito después de mostrar la confirmación
    clearCart()
  }, [router, clearCart])

  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Cargando detalles de tu compra...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="text-red-600 dark:text-red-400 mb-4">
          <ShieldCheck className="h-12 w-12 mx-auto mb-2" />
          <h2 className="text-xl font-semibold">Error</h2>
          <p className="mt-2">{error}</p>
        </div>
        <Button asChild className="mt-4">
          <Link href="/">Volver al inicio</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="py-12 md:py-16">
      <div className="w-full px-4 md:px-6 max-w-3xl mx-auto">
        <Card className="border-green-200 dark:border-green-800 animate-fade-in">
          <CardHeader className="bg-green-50 dark:bg-green-950/20 border-b border-green-100 dark:border-green-800">
            <div className="flex items-center justify-center my-2">
              <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <CardTitle className="text-center text-2xl text-green-700 dark:text-green-300">
              Thank you for your purchase!
            </CardTitle>
            <CardDescription className="text-center text-green-600/80 dark:text-green-400/80">
              We have sent your ebooks to {email}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6 animate-fade-in-delay">
            <div className="space-y-6">
              <p className="text-center">
                Your purchase has been successfully processed. We have sent an email with the download links for your ebooks. If you do not receive it in the next few minutes, please check your spam folder.
              </p>

              {/* Mostrar la lista de ebooks si hay */}
              {cartEbooks.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-2xl font-bold mb-4">Your Ebooks</h2>
                  <div className="flex flex-col gap-4">
                    {cartEbooks.map((ebook: Ebook) => (
                      <div key={ebook.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                            {ebook.cover_url ? (
                              <Image src={ebook.cover_url} alt={ebook.title} width={40} height={40} style={{ objectFit: "cover" }} />
                            ) : (
                              <BookOpen className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium leading-none">{ebook.title}</p>
                            <p className="text-sm text-muted-foreground">{ebook.author}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
                          onClick={() => window.open(`/download/${ebook.id}`, '_blank')}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </CardContent>
          <CardFooter className="flex justify-center gap-4 animate-fade-in-delay-2">
            <Button asChild className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
              <Link href="/">Back to home</Link>
            </Button>
            <Button
              variant="outline"
              asChild
              className="transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              <Link href="/ebooks">Explore more ebooks</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
