"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BookOpen, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { useRouter } from "next/navigation"
import { getEbooks } from "@/lib/getEbooks"
import { useEffect, useState } from "react"
import type { Ebook } from "@/interfaces"

export default function EbooksClientPage() {
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getEbooks()
      .then((data) => {
        setEbooks(data || [])
        setLoading(false)
      })
      .catch((/* err */) => {
        setError("Error loading ebooks")
        setLoading(false)
      })
  }, [])

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    addItem(id)
    router.push("/cart")
  }

  if (loading) return <div className="py-12 text-center">Loading ebooks...</div>
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>

  return (
    <section className="py-12 md:py-16">
      <div className="w-full px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800 transition-transform duration-300 hover:scale-105">
              Catalog
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in">
              Explore Our Ebook Collection
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto animate-fade-in-delay">
              Discover quality knowledge on various topics to boost your personal and professional growth.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-delay-2">
          {ebooks.map((ebook) => (
            <Link
              key={ebook.id}
              href={`/ebooks/${ebook.id}`}
              className="flex flex-col rounded-lg border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-300 hover:translate-y-[-5px] group"
            >
              <div className="relative aspect-[3/4] bg-purple-100 overflow-hidden">
                {ebook.cover_url ? (
                  <Image
                    src={ebook.cover_url}
                    alt={ebook.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                    <BookOpen className="h-16 w-16 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold">{ebook.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground flex-grow">{ebook.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {ebook.category}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {ebook.level}
                  </span>
                  <span className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {ebook.pages} pages
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-lg font-bold">${ebook.price?.toFixed(2)}</span>
                  <div>
                    <Button
                      size="sm"
                      className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md group"
                      onClick={(e) => handleAddToCart(e, ebook.id)}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
