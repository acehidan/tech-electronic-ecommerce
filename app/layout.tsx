import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language-context";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OTAS-store",
  description:
    "Shop the latest construction tool at unbeatable prices in Myanmar Kyat (MMK). Free shipping on orders over 210,000 MMK.",
  generator: "otas",
  icons: {
    icon: [
      {
        url: "/otas.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/otas.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/otas.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/otas.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <LanguageProvider>
          <CartProvider>{children}</CartProvider>
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
