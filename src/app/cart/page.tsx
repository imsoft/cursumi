import type { Metadata } from "next"
import CartClient from "./CartClient"

export const metadata: Metadata = {
  title: "Carrito de Compras | Cursumi",
  description: "Revisa y gestiona los ebooks en tu carrito de compras.",
}

export default function CartPage() {
  return <CartClient />
}
