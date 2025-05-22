import type { Metadata } from "next"
import EbooksClientPage from "./EbooksClientPage"

export const metadata: Metadata = {
  title: "Catálogo de Ebooks | Cursumi",
  description: "Explora nuestra colección de ebooks de alta calidad en diversos temas.",
}

export default function EbooksPage() {
  return <div className="w-full px-4 md:px-6">
    <EbooksClientPage />
  </div>
}
