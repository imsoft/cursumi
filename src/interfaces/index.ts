import type { ReactNode } from "react"

// Tipos generales de la aplicación
export interface LayoutProps {
  children: ReactNode
}

// Tipos para los ebooks
export interface Ebook {
  id: string
  title: string
  description: string
  longDescription: string
  price: number
  category: string
  level: string
  pages: number
  language: string
  publishDate: string
  publish_date?: string // Para compatibilidad con Supabase
  author: string
  tableOfContents: string[]
  features: string[]
  purchases?: number // Número de compras del ebook
  cover_url?: string // URL de la imagen de portada
}

// Tipos para el carrito
export interface CartState {
  items: string[] // Array de IDs de ebooks
  addItem: (id: string) => void
  removeItem: (id: string) => void
  clearCart: () => void
  getItemsCount: () => number
  getCartItems: () => (Ebook | undefined)[]
  getSubtotal: () => number
  getTax: () => number
  getTotal: () => number
}

// Tipos para el formulario de contacto
export interface ContactFormState {
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
    acceptTerms?: string[]
    _form?: string[]
  }
  message?: string
  success?: boolean
}

export interface ContactFormValues {
  name: string
  email: string
  message: string
  acceptTerms: boolean
}

// Tipos para componentes específicos
export interface EbookDetailClientProps {
  ebook: Ebook
}

export interface FeaturedBook {
  id: string
  title: string
  description: string
  price: number
}
