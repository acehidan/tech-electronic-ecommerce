"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatPrice } from "@/lib/format-price";
import { useCart } from "@/lib/cart-context";

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
  const { addItem, updateQuantity, items } = useCart();
  const cartItem = items.find((item) => item.productId === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <Link href={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* {discount > 0 && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-semibold">
              -{discount}%
            </div>
          )} */}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="font-semibold h-10 text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        {/* <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? "fill-accent text-accent"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div> */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">
                {formatPrice(price)}
              </span>
              {/* {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  {formatPrice(originalPrice)}
                </span>
              )} */}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex w-full items-center justify-between bg-primary/10 rounded-lg overflow-hidden border border-primary/20">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
                onClick={() => updateQuantity(id, quantity - 1)}
                disabled={quantity === 0}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center text-sm font-bold text-primary">
                {quantity}
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-primary hover:bg-primary hover:text-primary-foreground rounded-none"
                onClick={() => {
                  if (quantity === 0) {
                    addItem(id, 1, false);
                  } else {
                    updateQuantity(id, quantity + 1);
                  }
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
