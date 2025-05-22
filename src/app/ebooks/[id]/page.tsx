import { notFound } from "next/navigation"
import { getEbookById } from "@/lib/getEbooks"
import EbookDetailClient from "./EbookDetailClient"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const ebook = await getEbookById(params.id)

  if (!ebook) {
    return {
      title: "Ebook not found | Cursumi",
      description: "Sorry, the ebook you are looking for is not available.",
    }
  }

  return {
    title: `${ebook.title} | Cursumi`,
    description: ebook.description,
  }
}

export default async function EbookPage({ params }: { params: { id: string } }) {
  const ebook = await getEbookById(params.id)

  if (!ebook) {
    notFound()
  }

  return <EbookDetailClient ebook={ebook} />
}
