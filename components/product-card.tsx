"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import { useLanguage } from "@/lib/language-context";

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
  const { addItem } = useCart();
  const { t } = useLanguage();

  return (
    <Card className="group overflow-hidden hover:shadow-md transition-all duration-300 rounded-2xl border border-gray-100 bg-white shadow-sm">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary w-full">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
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
            className="flex-1 bg-[#2216a8] hover:bg-[#3a2dbb] text-white rounded-xl h-[42px] sm:h-11 flex items-center justify-center gap-1 sm:gap-1.5 text-[0.8rem] sm:text-sm font-bold shadow-none border border-[#2216a8] hover:border-[#3a2dbb]"
            onClick={(e) => {
              e.preventDefault();
              addItem(id, 1, false);
            }}
          >
            {t("addToCart")}
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
          <Link href={`/product/${id}`} className="flex-1 flex" onClick={(e) => e.stopPropagation()}>
            <Button
              variant="outline"
              className="w-full border border-[#2216a8] text-[#2216a8] hover:text-[#3a2dbb] hover:bg-blue-50/50 rounded-xl h-[42px] sm:h-11 flex items-center justify-center gap-1 sm:gap-1.5 text-[0.8rem] sm:text-sm font-bold bg-white"
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
