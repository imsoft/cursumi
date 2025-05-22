import type React from "react";
import type { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Cursumi",
  description:
    "Conoce cómo Cursumi recopila, utiliza y protege tu información personal.",
};

export default function PrivacyLayout({
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
