import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mubbashir | Creative Developer",
  description: "Portfolio of a Creative Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${outfit.className} bg-black text-white antialiased selection:bg-white selection:text-black`}
      >
        <Header />
        {/* <SmoothScroll>{children}</SmoothScroll> */}
        {children}
      </body>
    </html>
  );
}
