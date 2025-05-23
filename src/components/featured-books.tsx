"use client"

import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { useRouter } from "next/navigation"
import { getPopularEbooks } from "@/lib/getEbooks"
import { useEffect, useState } from "react"
import type { Ebook } from "@/interfaces"
import Image from "next/image"

export default function FeaturedBooks() {
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()
  const [ebooks, setEbooks] = useState<Ebook[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    getPopularEbooks()
      .then((data) => {
        setEbooks(data || [])
        setLoading(false)
      })
      .catch(() => {
        setError("Error loading popular ebooks")
        setLoading(false)
      })
  }, [])

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault()
    addItem(id)
    router.push("/cart")
  }

  if (loading) return <div className="py-12 text-center">Loading popular ebooks...</div>
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>

  return (
    <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
      {ebooks.map((book) => (
        <Link
          key={book.id}
          href={`/ebooks/${book.id}`}
          className="flex flex-col rounded-lg border shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-purple-300 hover:translate-y-[-5px] group"
        >
          <div className="relative aspect-[3/4] bg-purple-100 overflow-hidden">
            {book.cover_url ? (
              <Image
                src={book.cover_url}
                alt={book.title}
                fill
                style={{ objectFit: "cover" }}
                className="transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                <BookOpen className="h-16 w-16 text-purple-600 transition-transform duration-300 group-hover:scale-110" />
              </div>
            )}
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground flex-grow">{book.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-lg font-bold">${book.price?.toFixed(2)}</span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-md group"
                  onClick={(e) => handleAddToCart(e, book.id)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  Añadir
                </Button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
