import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface CategoryCardProps {
  name: string
  icon: string
  count: number
  slug: string
}

export function CategoryCard({ name, icon, count, slug }: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
        <CardContent className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <span className="text-3xl">{icon}</span>
            </div>
          </div>
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{name}</h3>
          <p className="text-sm text-muted-foreground">{count} Products</p>
        </CardContent>
      </Card>
    </Link>
  )
}
