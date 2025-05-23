import { notFound } from "next/navigation"
import { getEbookById } from "@/lib/getEbooks"
import EbookDetailClient from "./EbookDetailClient"
import { Metadata } from "next"

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const ebook = await getEbookById(id)

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

export default async function EbookPage({ params }: Props) {
  const { id } = await params
  const ebook = await getEbookById(id)

  if (!ebook) {
    notFound()
  }

  return <EbookDetailClient ebook={ebook} />
}
