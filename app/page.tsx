import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"
import { CategoryCard } from "@/components/category-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, Shield, Truck } from "lucide-react"
import Link from "next/link"

const newArrivals = [
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
]

const bestSellers = [
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

const categories = [
  { name: "Laptops", icon: "💻", count: 156, slug: "laptops" },
  { name: "Smartphones", icon: "📱", count: 234, slug: "smartphones" },
  { name: "Audio", icon: "🎧", count: 189, slug: "audio" },
  { name: "Accessories", icon: "⌨️", count: 423, slug: "accessories" },
  { name: "Smart Home", icon: "🏠", count: 167, slug: "smart-home" },
  { name: "Gaming", icon: "🎮", count: 298, slug: "gaming" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Discover the Latest in Tech Innovation</h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 text-pretty">
              Premium electronics and accessories for professionals and enthusiasts. Shop cutting-edge technology at
              unbeatable prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className="text-base font-semibold">
                Shop New Arrivals
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-base font-semibold bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
              >
                View All Categories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over 210,000 MMK</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Secure Payment</h3>
                <p className="text-sm text-muted-foreground">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">2-3 business days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Shop by Category</h2>
              <p className="text-muted-foreground">Find exactly what you're looking for</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">New Arrivals</h2>
              <p className="text-muted-foreground">Latest products just for you</p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Best Sellers</h2>
              <p className="text-muted-foreground">Most popular products this month</p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Get 15% Off Your First Order</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            Sign up for our newsletter and receive exclusive deals, product launches, and tech tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
            />
            <Button size="lg" variant="secondary" className="font-semibold">
              Subscribe
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary" />
                <span className="text-lg font-bold text-foreground">TechStore</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted destination for premium tech and electronics.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/products" className="hover:text-primary transition-colors">
                    New Arrivals
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="hover:text-primary transition-colors">
                    Best Sellers
                  </Link>
                </li>
                <li>
                  <Link href="/categories" className="hover:text-primary transition-colors">
                    Categories
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Returns
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/account" className="hover:text-primary transition-colors">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/account" className="hover:text-primary transition-colors">
                    Order History
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-primary transition-colors">
                    Wishlist
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 TechStore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
