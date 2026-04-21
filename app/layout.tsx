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
  title: "AutoShop",
  description:
    "Shop the latest home electronics at AutoShop. Smart TVs, refrigerators, and kitchen appliances at best prices in Myanmar. Official warranty and express delivery.",
  generator: "otas",
  icons: {
    icon: [
      {
        url: "/autoshop.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/autoshop.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/autoshop.png",
        type: "image/png",
      },
    ],
    apple: "/autoshop.png",
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
