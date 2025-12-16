"use client"

import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"
import { useState } from "react"

const products = [
  {
    id: "1",
    name: "Premium Wireless Headphones with Active Noise Cancellation",
    price: 627900,
    originalPrice: 837900,
    rating: 4.8,
    reviews: 234,
    image: "/wireless-headphones.png",
  },
  {
    id: "2",
    name: "4K Ultra HD Smart Monitor 32 inch",
    price: 1152900,
    rating: 4.9,
    reviews: 189,
    image: "/4k-monitor.jpg",
  },
  {
    id: "3",
    name: "Mechanical Gaming Keyboard RGB",
    price: 312900,
    originalPrice: 417900,
    rating: 4.7,
    reviews: 456,
    image: "/gaming-keyboard.png",
  },
  {
    id: "4",
    name: "Portable SSD 2TB External Storage",
    price: 522900,
    rating: 4.9,
    reviews: 312,
    image: "/portable-ssd.jpg",
  },
  {
    id: "5",
    name: "Wireless Mouse Ergonomic Design",
    price: 165900,
    originalPrice: 207900,
    rating: 4.6,
    reviews: 567,
    image: "/wireless-mouse.png",
  },
  {
    id: "6",
    name: "USB-C Hub Multiport Adapter",
    price: 123900,
    rating: 4.7,
    reviews: 423,
    image: "/usb-hub.png",
  },
  {
    id: "7",
    name: "Smartphone Stand Adjustable Aluminum",
    price: 60900,
    originalPrice: 81900,
    rating: 4.5,
    reviews: 891,
    image: "/phone-stand.jpg",
  },
  {
    id: "8",
    name: "Webcam 4K Ultra HD with Microphone",
    price: 270900,
    rating: 4.8,
    reviews: 278,
    image: "/webcam-4k.jpg",
  },
  {
    id: "9",
    name: "Laptop Stand Aluminum Portable",
    price: 102900,
    rating: 4.9,
    reviews: 1234,
    image: "/laptop-stand.png",
  },
  {
    id: "10",
    name: "Smart Watch Fitness Tracker",
    price: 417900,
    originalPrice: 522900,
    rating: 4.7,
    reviews: 892,
    image: "/modern-smartwatch.png",
  },
  {
    id: "11",
    name: "Bluetooth Speaker Waterproof",
    price: 186900,
    rating: 4.8,
    reviews: 623,
    image: "/bluetooth-speaker.jpg",
  },
  {
    id: "12",
    name: "Graphics Tablet for Designers",
    price: 375900,
    originalPrice: 480900,
    rating: 4.9,
    reviews: 445,
    image: "/graphics-tablet.png",
  },
]

export default function ProductsPage() {
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 2100000])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">All Products</h1>
          <p className="text-muted-foreground">Showing {products.length} products</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h2>
                <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setShowFilters(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-4">Category</h3>
                <div className="space-y-3">
                  {["All Products", "Laptops", "Audio", "Accessories", "Gaming"].map((category) => (
                    <div key={category} className="flex items-center">
                      <Checkbox id={category} />
                      <Label htmlFor={category} className="ml-2 text-sm text-foreground cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2100000}
                    step={10000}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{(priceRange[0] / 1000).toFixed(0)}K MMK</span>
                    <span>{(priceRange[1] / 1000).toFixed(0)}K MMK</span>
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-4">Brand</h3>
                <div className="space-y-3">
                  {["TechBrand", "ElectroMax", "GadgetPro", "InnoTech", "SmartDevices"].map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox id={brand} />
                      <Label htmlFor={brand} className="ml-2 text-sm text-foreground cursor-pointer">
                        {brand}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-4">Rating</h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox id={`rating-${rating}`} />
                      <Label htmlFor={`rating-${rating}`} className="ml-2 text-sm text-foreground cursor-pointer">
                        {rating}★ & up
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full bg-transparent" variant="outline">
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-lg">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden bg-transparent"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select defaultValue="featured">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center gap-2">
              <Button variant="outline" size="sm">
                Previous
              </Button>
              <Button variant="default" size="sm">
                1
              </Button>
              <Button variant="outline" size="sm">
                2
              </Button>
              <Button variant="outline" size="sm">
                3
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
