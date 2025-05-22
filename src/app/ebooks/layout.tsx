import type React from "react";
import type { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "Ebooks | Cursumi",
  description:
    "Explora nuestra colección de ebooks de alta calidad en diversos temas.",
};

export default function EbooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full px-4 md:px-6">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
