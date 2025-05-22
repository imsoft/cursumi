import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookX } from "lucide-react"

export default function EbookNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <BookX className="h-24 w-24 text-purple-600 mb-6" />
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">Ebook no encontrado</h1>
      <p className="max-w-[600px] text-muted-foreground md:text-xl mb-8">
        Lo sentimos, el ebook que estás buscando no está disponible o ha sido eliminado.
      </p>
      <Button asChild className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
        <Link href="/ebooks">Ver todos los ebooks</Link>
      </Button>
    </div>
  )
}
