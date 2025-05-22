import type React from "react";
import type { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "Contacto | Cursumi",
  description:
    "Ponte en contacto con nosotros para cualquier consulta sobre nuestros ebooks.",
};

export default function ContactLayout({
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
