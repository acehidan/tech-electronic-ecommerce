"use client"

import { Navigation } from "@/components/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, Minus, Plus } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { formatPrice } from "@/lib/format-price"

const relatedProducts = [
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
]

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const images = [
    "/wireless-headphones-front.png",
    "/wireless-headphones-side.png",
    "/wireless-headphones-detail.png",
    "/wireless-headphones-case.png",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          <span>Home</span> / <span>Audio</span> / <span className="text-foreground">Premium Wireless Headphones</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="mb-4 aspect-square rounded-lg overflow-hidden bg-secondary">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt="Product"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden bg-secondary border-2 transition-all ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Premium Wireless Headphones with Active Noise Cancellation
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="text-muted-foreground">(234 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">{formatPrice(627900)}</span>
              <span className="text-2xl text-muted-foreground line-through">{formatPrice(837900)}</span>
              <span className="px-3 py-1 bg-destructive text-destructive-foreground rounded-md font-semibold">
                Save 25%
              </span>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Experience superior sound quality with our Premium Wireless Headphones featuring advanced active noise
              cancellation technology. Perfect for music lovers and professionals who demand the best audio experience.
            </p>

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-foreground mb-2 block">Quantity</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button size="lg" className="flex-1">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="mr-2 h-5 w-5" />
                Wishlist
              </Button>
              <Button size="lg" variant="outline" className="sm:w-auto bg-transparent">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="space-y-4 pt-6 border-t border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Free Shipping</p>
                  <p className="text-sm text-muted-foreground">On orders over 210,000 MMK</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">2 Year Warranty</p>
                  <p className="text-sm text-muted-foreground">Extended protection included</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">30 Day Returns</p>
                  <p className="text-sm text-muted-foreground">Hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews (234)</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold text-foreground mb-4">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our Premium Wireless Headphones deliver an unparalleled audio experience with advanced active noise
                cancellation technology. Designed for audiophiles and professionals, these headphones combine superior
                sound quality with exceptional comfort for all-day wear.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The adaptive noise cancellation automatically adjusts to your environment, blocking out unwanted
                background noise while maintaining awareness of important sounds. With up to 40 hours of battery life,
                you can enjoy your music without interruption.
              </p>
              <h4 className="text-lg font-semibold text-foreground mb-3 mt-6">Key Features:</h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Active Noise Cancellation with adaptive technology</li>
                <li>40-hour battery life with quick charging</li>
                <li>Premium audio drivers for exceptional sound quality</li>
                <li>Comfortable over-ear design with memory foam cushions</li>
                <li>Multi-device connectivity via Bluetooth 5.2</li>
                <li>Built-in microphone for crystal-clear calls</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Technical Specifications</h4>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Driver Size</dt>
                    <dd className="font-medium text-foreground">40mm</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Frequency Response</dt>
                    <dd className="font-medium text-foreground">20Hz - 20kHz</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Impedance</dt>
                    <dd className="font-medium text-foreground">32 Ohms</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Bluetooth Version</dt>
                    <dd className="font-medium text-foreground">5.2</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Range</dt>
                    <dd className="font-medium text-foreground">30 feet</dd>
                  </div>
                </dl>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-4">Physical Specifications</h4>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Weight</dt>
                    <dd className="font-medium text-foreground">250g</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Dimensions</dt>
                    <dd className="font-medium text-foreground">7.5 x 6.7 x 3.3 in</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Battery Life</dt>
                    <dd className="font-medium text-foreground">40 hours</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Charging Time</dt>
                    <dd className="font-medium text-foreground">2 hours</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">Charging Port</dt>
                    <dd className="font-medium text-foreground">USB-C</dd>
                  </div>
                </dl>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {[1, 2, 3].map((review) => (
                <div key={review} className="pb-6 border-b border-border">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                        ))}
                      </div>
                      <span className="font-semibold text-foreground">John Doe</span>
                    </div>
                    <span className="text-sm text-muted-foreground">2 weeks ago</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    These headphones exceeded my expectations! The sound quality is phenomenal and the noise
                    cancellation works like a charm. Comfortable for long listening sessions.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="text-2xl font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
