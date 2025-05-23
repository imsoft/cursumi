"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { useCartStore } from "@/store/cart-store"
import { ModeToggle } from "./mode-toggle"
import { useEffect, useState } from "react"

export default function Header() {
  const [mounted, setMounted] = useState(false)
  const itemsCount = useCartStore((state) => state.getItemsCount())

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 md:px-6 flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="transition-transform duration-300 hover:scale-110">
            <Image src="/cursumi-logo.svg" alt="Cursumi Logo" width={40} height={40} className="rounded-md" />
          </Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium relative hover:text-primary transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            href="/ebooks"
            className="text-sm font-medium relative hover:text-primary transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Ebooks
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium relative hover:text-primary transition-colors duration-300 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="relative transition-transform duration-300 hover:scale-110"
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5 transition-colors duration-300 hover:text-primary" />
              <span className="sr-only">Shopping cart</span>
              {mounted && itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-purple-600 text-[10px] font-medium text-white flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
