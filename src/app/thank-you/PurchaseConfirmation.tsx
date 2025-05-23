"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
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
  const { items, clearCart } = useCartStore()
  const [email, setEmail] = useState("")
  const [cartEbooks, setCartEbooks] = useState<Ebook[]>([])

  useEffect(() => {
    // Recuperar el email del localStorage
    const savedEmail = localStorage.getItem("customer_email")
    if (!savedEmail) {
      router.push("/")
      return
    }
    setEmail(savedEmail)

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

    // Limpiar el carrito después de mostrar la confirmación
    const timer = setTimeout(() => {
      clearCart()
    }, 2000)

    return () => clearTimeout(timer)
  }, [router, clearCart, items])

  return (
    <div className="py-12 md:py-16">
      <div className="w-full px-4 md:px-6 max-w-3xl mx-auto">
        <Card className="border-green-200 dark:border-green-800 animate-fade-in">
          <CardHeader className="bg-green-50 dark:bg-green-950/20 border-b border-green-100 dark:border-green-800">
            <div className="flex items-center justify-center mb-2">
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
                  <h2 className="text-2xl font-bold mb-4">Ebooks</h2>
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
                        {/* Reemplazar con Link de descarga real cuando esté implementado */}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0 text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-900/20"
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
