import type { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";
import type { LayoutProps } from "@/interfaces";

export const metadata: Metadata = {
  title: "Sobre Nosotros | Cursumi",
  description:
    "Conoce más sobre Cursumi, nuestra misión, visión y el equipo detrás de la plataforma.",
};

export default function AboutLayout({ children }: LayoutProps) {
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
