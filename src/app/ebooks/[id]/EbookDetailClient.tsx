"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, ChevronLeft, FileText, Globe, ShoppingCart, User } from "lucide-react"
import type { EbookDetailClientProps } from "@/interfaces"
import { useCartStore } from "@/store/cart-store"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function EbookDetailClient({ ebook }: EbookDetailClientProps) {
  const addItem = useCartStore((state) => state.addItem)
  const router = useRouter()

  const handleAddToCart = () => {
    addItem(ebook.id)
    router.push("/cart")
  }

  return (
    <div className="py-12 md:py-16">
      <div className="w-full px-4 md:px-6">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild className="mb-6 group">
            <Link href="/ebooks">
              <ChevronLeft className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to catalog
            </Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <div className="flex flex-col space-y-6">
            <div className="relative aspect-[3/4] bg-purple-100 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              {ebook.cover_url ? (
                <Image
                  src={ebook.cover_url}
                  alt={ebook.title}
                  fill
                  style={{ objectFit: "contain" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-32 w-32 text-purple-600" />
                </div>
              )}
            </div>

            <div className="space-y-4 rounded-lg border p-6 shadow-sm">
              <h3 className="text-xl font-bold">Ebook details</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Author:</span> {ebook.author}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Published:</span> {ebook.publish_date || ebook.publishDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Pages:</span> {ebook.pages}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    <span className="font-medium">Language:</span> {ebook.language}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge
                  variant="secondary"
                  className="bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/40"
                >
                  {ebook.category}
                </Badge>
                <Badge variant="outline">{ebook.level}</Badge>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{ebook.title}</h1>
              <div className="mt-4 flex items-center">
                <span className="text-3xl font-bold text-purple-600">${ebook.price.toFixed(2)}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full md:w-auto transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg group"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                Add to cart
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Description</h2>
              <p className="text-muted-foreground">{ebook.longDescription}</p>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contents</h2>
              <ul className="space-y-2">
                {(ebook.tableOfContents || []).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-purple-600">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Features</h2>
              <ul className="space-y-2">
                {ebook.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-purple-600">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
