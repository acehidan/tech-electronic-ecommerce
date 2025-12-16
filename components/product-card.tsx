import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/format-price"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
}

export function ProductCard({ id, name, price, originalPrice, rating, reviews, image }: ProductCardProps) {
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

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
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-destructive text-destructive-foreground px-2 py-1 rounded-md text-xs font-semibold">
              -{discount}%
            </div>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${id}`}>
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">{formatPrice(price)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
              )}
            </div>
          </div>
          <Button size="icon" variant="outline" className="h-9 w-9 bg-transparent">
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
