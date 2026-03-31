"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Search, Menu, Globe, ShoppingBag, Home, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { CartSheet } from "@/components/cart-sheet";
import Image from "next/image";
import { products } from "@/lib/data";
import { formatPrice } from "@/lib/format-price";
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
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredProducts = products.filter((product) => {
    if (!searchQuery.trim()) return false;
    const nameMatch = product.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    const myNameMatch = (product as any).name_my
      ? (product as any).name_my.toLowerCase().includes(searchQuery.trim().toLowerCase())
      : false;
    return nameMatch || myNameMatch;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push(`/products`);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
        {/* Mobile Navigation */}
        <div className="md:hidden w-full flex flex-col py-3 px-4 gap-5">
          {/* Top row: Logo + Search + Cart */}
          <div className="flex items-center gap-3 w-full">
            <Link href="/" className="shrink-0 flex items-center justify-center p-1.5 h-10 w-10 bg-green-50 rounded-full border border-green-200 overflow-hidden">
               <span className="text-green-700 text-[10px] font-black leading-tight text-center block">Auto<br/>Shop</span>
            </Link>
            <form onSubmit={handleSearch} className="relative flex-1 z-50">
              <Input
                type="text"
                placeholder="အထည်တွေရှာမယ်"
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-5 rounded-[16px] border border-gray-200 text-sm focus-visible:ring-[#007bff] bg-white shadow-sm"
              />
              <button type="submit" className="absolute right-3.5 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-black" strokeWidth={2.5} />
              </button>

              {/* Mobile Autocomplete Dropdown */}
              {showSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {filteredProducts.length > 0 ? (
                  <div className="max-h-[300px] overflow-y-auto py-2">
                    {filteredProducts.slice(0, 6).map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-left transition-colors"
                        onClick={() => {
                          setSearchQuery(language === "my" && (product as any).name_my ? (product as any).name_my : product.name);
                          setShowSuggestions(false);
                          router.push(`/product/${product.id}`);
                        }}
                      >
                        <div className="relative h-10 w-10 flex-shrink-0 bg-gray-100 rounded overflow-hidden shadow-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[13px] truncate text-foreground leading-tight mb-0.5">
                            {language === "my" && (product as any).name_my ? (product as any).name_my : product.name}
                          </div>
                          <div className="text-[12px] text-[#007bff] font-bold">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-400 bg-white">
                    {t("noProductsFound") || "Couldn't find anything."}
                  </div>
                )}
              </div>
            )}
            </form>
            <button
                className="relative bg-white border border-gray-200 text-[#007bff] rounded-[16px] shrink-0 h-[42px] w-[42px] flex items-center justify-center shadow-sm"
                onClick={openCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
          
          {/* Bottom row: Tabs */}
          <div className="flex items-center justify-center gap-8 mb-1">
            <Link href="/" className="flex items-center gap-1.5">
              <Home className={`h-5 w-5 ${pathname === '/' ? 'text-[#007bff]' : 'text-gray-400'}`} />
              <span className={`text-[15px] font-bold ${pathname === '/' ? 'text-[#007bff]' : 'text-gray-400'}`}>ပင်မ</span>
            </Link>
            <Link href="/products" className="flex items-center gap-1.5">
              <Shirt className={`h-5 w-5 ${pathname === '/products' || pathname.startsWith('/product/') ? 'text-[#007bff]' : 'text-gray-400'}`} />
              <span className={`text-[15px] font-bold ${pathname === '/products' || pathname.startsWith('/product/') ? 'text-[#007bff]' : 'text-gray-400'}`}>အဝတ်အထည်များ</span>
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex container mx-auto px-4 h-[84px] items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center justify-center p-1.5 h-12 w-12 bg-green-50 rounded-full border border-green-200 overflow-hidden hover:opacity-90 transition-opacity">
             <span className="text-green-700 text-[11px] font-black leading-tight text-center block">Auto<br/>Shop</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl relative z-50">
            <Input
              type="text"
              placeholder="အထည်တွေရှာမယ်"
              value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-5 pr-12 py-6 rounded-[20px] border border-gray-200 text-[15px] focus-visible:ring-[#007bff] bg-white shadow-sm"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 hover:scale-110 transition-transform">
              <Search className="h-5 w-5 text-black" strokeWidth={2.5} />
            </button>

            {/* Desktop Autocomplete Dropdown */}
            {showSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 z-50 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {filteredProducts.length > 0 ? (
                  <div className="max-h-[350px] overflow-y-auto py-2">
                    {filteredProducts.slice(0, 8).map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-gray-50 text-left transition-colors"
                        onClick={() => {
                          setSearchQuery(language === "my" && (product as any).name_my ? (product as any).name_my : product.name);
                          setShowSuggestions(false);
                          router.push(`/product/${product.id}`);
                        }}
                      >
                        <div className="relative h-12 w-12 flex-shrink-0 bg-gray-100 rounded overflow-hidden shadow-sm">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-[15px] truncate text-foreground leading-tight mb-1">
                            {language === "my" && (product as any).name_my ? (product as any).name_my : product.name}
                          </div>
                          <div className="text-[13px] text-[#007bff] font-bold">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-gray-400 bg-white">
                    {t("noProductsFound") || "Couldn't find anything."}
                  </div>
                )}
              </div>
            )}
          </form>

          {/* Desktop Right: Tabs & Cart */}
          <div className="flex items-center gap-8 shrink-0">
            <nav className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <Home className={`h-[22px] w-[22px] transition-colors ${pathname === '/' ? 'text-[#007bff]' : 'text-gray-400 group-hover:text-[#007bff]'}`} />
                <span className={`text-[16px] font-bold transition-colors ${pathname === '/' ? 'text-[#007bff]' : 'text-gray-500 group-hover:text-[#007bff]'}`}>ပင်မ</span>
              </Link>
              <Link href="/products" className="flex items-center gap-2 group">
                <Shirt className={`h-[22px] w-[22px] transition-colors ${pathname === '/products' || pathname.startsWith('/product/') ? 'text-[#007bff]' : 'text-gray-400 group-hover:text-[#007bff]'}`} />
                <span className={`text-[16px] font-bold transition-colors ${pathname === '/products' || pathname.startsWith('/product/') ? 'text-[#007bff]' : 'text-gray-500 group-hover:text-[#007bff]'}`}>အဝတ်အထည်များ</span>
              </Link>
            </nav>

            <div className="w-px h-8 bg-gray-200"></div>

            <button
                className="relative bg-white border border-gray-200 hover:border-[#007bff]/50 text-[#007bff] hover:bg-blue-50/50 transition-all rounded-[16px] shrink-0 h-[48px] w-[48px] flex items-center justify-center shadow-sm group"
                onClick={openCart}
            >
              <ShoppingCart className="h-[22px] w-[22px] group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 h-5 w-5 rounded-full bg-red-500 text-[11px] font-bold text-white flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartSheet isOpen={isCartOpen} onClose={closeCart} />
    </>
  );
}
