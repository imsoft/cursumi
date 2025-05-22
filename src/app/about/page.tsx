import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Award, Heart } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us | Cursumi",
  description: "Learn more about Cursumi, our mission, vision and the team behind the platform.",
}

export default function AboutPage() {
  return (
    <div className="flex w-full flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-purple-50 dark:bg-purple-950/20">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl animate-fade-in">About Cursumi</h1>
                <p className="text-muted-foreground md:text-lg mx-auto animate-fade-in-delay">
                  Transforming the digital reading experience for readers around the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and Vision */}
        <section className="py-16 md:py-20">
          <div className="w-full px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Our Mission
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Democratize access to knowledge
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  At Cursumi, our mission is to make quality knowledge accessible to everyone. We believe that ebooks are a powerful tool to democratize education and learning, allowing people worldwide to access valuable content without traditional limitations.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  We strive to offer an intuitive and accessible platform that connects readers with the knowledge they need to grow personally and professionally.
                </p>
              </div>
              <div className="space-y-4">
                <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800">
                  <Award className="mr-2 h-4 w-4" />
                  Our Vision
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  A more informed and empowered world
                </h2>
                <p className="text-muted-foreground md:text-lg">
                  We envision a world where access to knowledge is not limited by geographic, economic, or social barriers. Where everyone can find and acquire the educational resources they need to achieve their goals.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  We aspire to be the leading platform for the distribution of educational and personal development ebooks, recognized for the quality of our catalog and the excellence of our user experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="space-y-2">
                <div className="inline-flex items-center rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800">
                  <Heart className="mr-2 h-4 w-4" />
                  Our Values
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">The principles that guide us</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg mx-auto">
                  These core values define our culture and guide our daily decisions.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800 transition-all duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-200"
                  >
                    <path d="M18 6 7 17l-5-5"></path>
                    <path d="m22 10-7.5 7.5L13 16"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Excellence</h3>
                <p className="text-center text-muted-foreground">
                  We strive to provide the best possible experience in every aspect of our platform, from content selection to customer service.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800 transition-all duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-200"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m7 10 3 3 7-7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Integrity</h3>
                <p className="text-center text-muted-foreground">
                  We act with honesty and transparency in all our operations, building trust with our users and partners.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800 transition-all duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-200"
                  >
                    <path d="M12 22v-5"></path>
                    <path d="M9 7V2"></path>
                    <path d="M15 7V2"></path>
                    <path d="M6 13V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3Z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Accessibility</h3>
                <p className="text-center text-muted-foreground">
                  We design our platform with all users in mind, regardless of their abilities or limitations, so that knowledge is truly accessible.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800 transition-all duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-200"
                  >
                    <path d="M12 2v4"></path>
                    <path d="M12 18v4"></path>
                    <path d="M4.93 4.93l2.83 2.83"></path>
                    <path d="M16.24 16.24l2.83 2.83"></path>
                    <path d="M2 12h4"></path>
                    <path d="M18 12h4"></path>
                    <path d="M4.93 19.07l2.83-2.83"></path>
                    <path d="M16.24 7.76l2.83-2.83"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Innovation</h3>
                <p className="text-center text-muted-foreground">
                  We constantly seek new ways to improve the digital reading experience, adopting emerging technologies and listening to user feedback.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800 transition-all duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-200"
                  >
                    <path d="M17 6.1H3"></path>
                    <path d="M21 12.1H3"></path>
                    <path d="M15.1 18H3"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Simplicity</h3>
                <p className="text-center text-muted-foreground">
                  We believe in the elegance of simplicity. We design intuitive interfaces and simple processes so our users can focus on what really matters: learning.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-purple-300 hover:translate-y-[-5px]">
                <div className="rounded-full bg-purple-100 p-3 dark:bg-purple-800 transition-all duration-300 hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-purple-600 dark:text-purple-200"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Community</h3>
                <p className="text-center text-muted-foreground">
                  We value the connection between readers and authors. We foster an ecosystem where knowledge flows freely and is enriched by everyone's contributions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-purple-50 dark:bg-purple-950/20">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  ¿Quieres formar parte de nuestra historia?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl mx-auto">
                  Explora nuestro catálogo de ebooks o contáctanos para conocer más sobre Cursumi.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button
                  size="lg"
                  asChild
                  className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  <Link href="/ebooks" className="group">
                    Explorar Ebooks{" "}
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                >
                  <Link href="/contact">Contact</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
