import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "../components/header";
import Footer from "../components/footer";
import FeaturedBooks from "../components/featured-books";

const Home = () => {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="w-full px-4 md:px-6">
            <div className="grid w-full gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4 w-full">
                <div className="space-y-2 w-full">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none animate-fade-in w-full">
                    Transform your Reading Experience with Cursumi
                  </h1>
                  <p className="text-muted-foreground md:text-xl animate-fade-in-delay w-full">
                    The all-in-one platform to discover, acquire, and enjoy high-quality ebooks. Boost your knowledge today.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row animate-fade-in-delay-2 w-full">
                  <Button
                    size="lg"
                    asChild
                    className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                  >
                    <Link href="/ebooks">
                      Explore Ebooks{" "}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                  >
                    <Link href="/ebooks">View Ebooks</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center w-full">
                <Image
                  src="/photo-hero.webp"
                  width={550}
                  height={550}
                  alt="Cursumi Online Ebook Platform"
                  className="rounded-lg object-cover shadow-lg transition-all duration-500 hover:shadow-xl hover:scale-[1.02] w-full max-w-[550px]"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800 transition-transform duration-300 hover:scale-105">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need for a perfect reading experience
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Cursumi provides all the tools you need to discover and enjoy quality ebooks.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
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
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Digital Library</h3>
                <p className="text-center text-muted-foreground">
                  Access a wide collection of ebooks on various topics and categories.
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
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Secure Payments</h3>
                <p className="text-center text-muted-foreground">
                  Secure payment processing with Stripe integration for individual purchases.
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
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Recommendations</h3>
                <p className="text-center text-muted-foreground">
                  Get personalized recommendations based on your interests and reading habits.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Books Section */}
        <section className="bg-slate-50 py-20 dark:bg-slate-900">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm dark:bg-purple-800 transition-transform duration-300 hover:scale-105">
                  Featured
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Popular Ebooks
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Discover some of our best-selling and top-rated ebooks.
                </p>
              </div>
            </div>
            <FeaturedBooks />
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="lg"
                asChild
                className="transition-all duration-300 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:scale-105"
              >
                <Link href="/ebooks" className="group">
                  View All Ebooks{" "}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-slate-50 py-20 dark:bg-slate-900">
          <div className="w-full px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to start your reading journey?
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Explore our ebook collection and find the knowledge you are looking for.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  size="lg"
                  asChild
                  className="transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg"
                >
                  <Link href="/ebooks" className="group">
                    Explore Ebooks{" "}
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
      <Footer />
    </div>
  );
};

export default Home;
