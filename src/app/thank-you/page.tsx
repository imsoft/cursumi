import type { Metadata } from "next"
import PurchaseConfirmation from "./PurchaseConfirmation"

export const metadata: Metadata = {
  title: "Thank you for your purchase! | Cursumi",
  description: "Your purchase has been successfully processed. Your ebooks have been sent to your email.",
}

export default function ThankYouPage() {
  return <PurchaseConfirmation />
}
