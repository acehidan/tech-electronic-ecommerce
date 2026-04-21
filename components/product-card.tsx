"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Monitor, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
}

export function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
}: ProductCardProps) {
  const { items, addItem } = useCart();
  const { t } = useLanguage();

  const isInCart = items.some((item) => item.productId === id);

  return (
    <Card 
      className={cn(
        "group overflow-hidden hover:shadow-md transition-all duration-300 rounded-2xl border shadow-sm",
        isInCart 
          ? "border-green-600 bg-green-50/50 shadow-green-100/50" 
          : "border-gray-100 bg-white"
      )}
    >
      <Link href={`/product/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {isInCart && (
            <div className="absolute top-3 right-3 z-10 bg-green-600 text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg animate-in fade-in zoom-in duration-300">
              <Check className="w-3 h-3" />
              {t("inCart")}
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4 pt-5 pb-5 flex flex-col gap-5">
        <div className="flex justify-between items-start gap-4">
          <Link href={`/product/${id}`} className="flex-1">
            <h3 className="font-bold text-[15px] sm:text-base text-foreground leading-snug hover:text-[#2216a8] transition-colors line-clamp-2">
              {name}
            </h3>
          </Link>
          <div className="flex flex-col items-end justify-start leading-none shrink-0">
            <span className="text-xl sm:text-2xl font-black text-[#2216a8]">
              {price.toLocaleString("en-US")}
            </span>
            <span className="text-[10px] sm:text-xs font-bold text-[#2216a8] mt-1 uppercase tracking-wider">
              MMK
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <Button
            className={cn(
              "flex-1 rounded-xl h-[42px] sm:h-11 flex items-center justify-center gap-1 sm:gap-1.5 text-[0.8rem] sm:text-sm font-bold shadow-none border transition-all duration-300",
              isInCart 
                ? "bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700" 
                : "bg-[#2216a8] hover:bg-[#3a2dbb] text-white border-[#2216a8] hover:border-[#3a2dbb]"
            )}
            onClick={(e) => {
              e.preventDefault();
              addItem(id, 1, false);
            }}
          >
            {isInCart ? t("inCart") : t("addToCart")}
            {isInCart ? (
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </Button>
          <Link href={`/product/${id}`} className="flex-1 flex" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              className={cn(
                "w-full rounded-xl h-[42px] sm:h-11 flex items-center justify-center gap-1 sm:gap-1.5 text-[0.8rem] sm:text-sm font-bold transition-all duration-300",
                isInCart
                  ? "border-green-600 text-green-600 hover:bg-green-50 bg-white"
                  : "border-[#2216a8] text-[#2216a8] hover:text-[#3a2dbb] hover:bg-blue-50/50 bg-white"
              )}
            >
              {t("viewAll").includes("အားလုံး") ? "ကြည့်မယ်" : "View"}
              <Monitor className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
