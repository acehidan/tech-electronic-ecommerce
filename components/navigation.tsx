"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, Menu, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { CartSheet } from "@/components/cart-sheet";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartCount, isCartOpen, openCart, closeCart } = useCart();
  const { language, setLanguage, t } = useLanguage();

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/medicine-logo.svg" alt="Logo" width={32} height={32} />
              <span className="text-xl font-bold text-foreground">
                MediCare Store
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            {/* <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("searchPlaceholder")}
                  className="w-full pl-10"
                />
              </div>
            </div> */}

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/categories"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {t("categories")}
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {t("newProducts")}
              </Link>
              {/* <Link
                href="/account"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {t("account")}
              </Link> */}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Globe className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("my")}>
                    မြန်မာ
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("en")}>
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}

              {/* <Button variant="ghost" size="icon" className="hidden md:flex">
                <User className="h-5 w-5" />
              </Button> */}
              <Button
                variant="default"
                size="sm"
                className="relative gap-2 px-4"
                onClick={openCart}
              >
                <ShoppingCart className="h-4 w-4" />
                <span className="font-semibold">အော်ဒါတင်ရန်</span>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground border-2 border-background flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
              {/* <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button> */}
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-4">
              {/* <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pl-10"
                />
              </div> */}
              <nav className="flex flex-col space-y-3">
                <Link
                  href="/categories"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Categories
                </Link>
                <Link
                  href="/products"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  New Products
                </Link>
                {/* <Link
                  href="/account"
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                >
                  Account
                </Link> */}
              </nav>
            </div>
          )}
        </div>
      </header>

      <CartSheet isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
