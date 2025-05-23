import type { Metadata } from "next"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "Contacto | Cursumi",
  description: "Ponte en contacto con nosotros para cualquier consulta sobre nuestros ebooks.",
}

export default function ContactPage() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="w-full px-4 md:px-6">
            <div className="mx-auto max-w-2xl space-y-8">
              <div className="space-y-2 text-center">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800 transition-transform duration-300 hover:scale-105">
                  Contact
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl animate-fade-in">
                  We&apos;re here to help you
                </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto animate-fade-in-delay">
                  Do you have any questions or comments? Fill out the form below and we will get in touch with you as soon as possible.
                </p>
              </div>
              <div className="animate-fade-in-delay-2">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
