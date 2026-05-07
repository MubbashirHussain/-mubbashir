import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/animations/SmoothScroll";
import { ThemeProvider } from "@/components/providers/theme-provider";
import ClientWrapper from "@/components/layout/ClientWrapper";
import { CursorProvider } from "@/components/providers/cursor-provider";
import { ArrowCursor } from "@/components/base/arrowCursor";
import { ThemeToggle } from "@/components/ui/theme-toggle";
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} antialiased selection:bg-primary selection:text-black transition-colors duration-300`}
      >
        <ThemeProvider attribute="class" enableSystem disableTransitionOnChange>
          <CursorProvider>
            {/* <ArrowCursor /> */}
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <SmoothScroll>
              <ClientWrapper>{children}</ClientWrapper>
            </SmoothScroll>
          </CursorProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
