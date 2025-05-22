import type { Metadata } from "next";
import Header from "../../components/header";
import Footer from "../../components/footer";
import type { LayoutProps } from "@/interfaces";

export const metadata: Metadata = {
  title: "Thank you for your purchase! | Cursumi",
  description:
    "Your purchase has been successfully processed. Your ebooks have been sent to your email.",
};

export default function ThankYouLayout({ children }: LayoutProps) {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main className="flex-1">
        <div className="w-full px-4 md:px-6">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
