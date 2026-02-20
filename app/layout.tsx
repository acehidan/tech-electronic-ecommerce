import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { CartProvider } from "@/lib/cart-context";
import { LanguageProvider } from "@/lib/language-context";
import { Chat } from "@/components/Chat";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MediCare Store",
  description:
    "Shop authentic medicines and healthcare essentials at unbeatable prices in Myanmar Kyat (MMK). Free delivery on orders over 50,000 MMK.",
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
          {/* <Chat /> */}
          <Analytics />
        </LanguageProvider>
      </body>
    </html>
  );
}
