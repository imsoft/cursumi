import type React from "react";
import type { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "Carrito de Compras | Cursumi",
  description: "Revisa y gestiona los ebooks en tu carrito de compras.",
};

export default function CartLayout({
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
