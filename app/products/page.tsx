"use client";

import { Navigation } from "@/components/navigation";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";
import { formatPrice } from "@/lib/format-price";

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const myNameMatch = product.name_my
      ? product.name_my.toLowerCase().includes(searchQuery.toLowerCase())
      : false;
    return nameMatch || myNameMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t("allProducts")}
            </h1>
            <p className="text-muted-foreground">
              {t("showingResults").replace(
                "{count}",
                filteredProducts.length.toString()
              )}
            </p>
          </div>

          <div className="relative w-full md:max-w-md group">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("searchPlaceholder") || "Search products..."}
              className="pl-10 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
            />

            {/* Autocomplete Dropdown */}
            {showSuggestions && searchQuery.length >= 2 && (
              <div className="absolute z-50 w-full mt-1 bg-background border border-border rounded-lg shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
                {filteredProducts.length > 0 ? (
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredProducts.slice(0, 8).map((product) => (
                      <button
                        key={product.id}
                        className="w-full flex items-center gap-3 p-3 hover:bg-secondary text-left transition-colors border-b border-border last:border-0"
                        onClick={() => {
                          setSearchQuery(language === "my" && product.name_my ? product.name_my : product.name);
                          setShowSuggestions(false);
                        }}
                      >
                        <div className="relative h-10 w-10 flex-shrink-0 bg-secondary rounded overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm truncate text-foreground">
                            {language === "my" && product.name_my ? product.name_my : product.name}
                          </div>
                          <div className="text-xs text-primary font-bold">
                            {formatPrice(product.price)}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-sm text-muted-foreground">
                    {t("noProductsFound")}
                  </div>
                )}
              </div>
            )}

            {/* Click outside to close suggestion */}
            {showSuggestions && (
              <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={() => setShowSuggestions(false)}
              />
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                name={
                  language === "my" && (product as any).name_my
                    ? (product as any).name_my
                    : product.name
                }
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">
              {t("noProductsFound") || "No products found matching your search."}
            </p>
            <Button
              variant="link"
              onClick={() => setSearchQuery("")}
              className="mt-2 text-primary"
            >
              {t("clearSearch") || "Clear search"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsContent />
    </Suspense>
  );
}
