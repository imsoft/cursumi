import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import { Toaster } from "sonner"
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cursumi - Online Ebook Platform",
  description: "Cursumi is an online ebook platform that offers a wide range of ebooks for readers of all ages. With a user-friendly interface and a vast library of titles, Cursumi makes it easy to find and read your favorite books. Whether you're looking for the latest bestsellers or classic literature, Cursumi has something for everyone.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased w-full`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster richColors position="top-center" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
