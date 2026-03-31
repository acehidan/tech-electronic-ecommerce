"use client";

import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { formatPrice } from "@/lib/format-price";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { useCart } from "@/lib/cart-context";

import { useLanguage } from "@/lib/language-context";

export function ProductDetailContent({
  product,
  categoryName,
  relatedProducts,
}: {
  product: any;
  categoryName: string;
  relatedProducts: any[];
}) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const { addItem } = useCart();
  const { t, language } = useLanguage();

  // Mock multiple images for the gallery based on the main image
  const images = [product.image, product.image, product.image, product.image];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            {t("home")}
          </Link>{" "}
          /{" "}
          <Link
            href={`/categories/${product.category}`}
            className="hover:text-primary"
          >
            {categoryName}
          </Link>{" "}
          /{" "}
          <span className="text-foreground">
            {language === "my" && product.name_my
              ? product.name_my
              : product.name}
          </span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="mb-4 aspect-square rounded-lg overflow-hidden bg-secondary">
              <Image
                src={images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
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
                  className={`aspect-square rounded-lg overflow-hidden bg-secondary border-2 transition-all ${selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                    }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
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
              {language === "my" && product.name_my
                ? product.name_my
                : product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
            </div>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {t("productDetailStory")}
            </p>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color: string) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                        selectedColor === color
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Size
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size: string) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors min-w-[3rem] ${
                        selectedSize === size
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:border-primary/50 text-foreground"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-sm font-semibold text-foreground mb-2 block">
                {t("quantity")}
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 h-12">
              <Button
                size="lg"
                className="flex-1"
                onClick={() => addItem(product.id, quantity)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t("addToCart")}
              </Button>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <Tabs defaultValue="description" className="mb-16">
          <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden flex-nowrap scrollbar-hide bg-transparent border-b rounded-none h-auto p-0 space-x-8">
            <TabsTrigger
              value="description"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-4 px-0 whitespace-nowrap"
            >
              {t("description")}
            </TabsTrigger>
            <TabsTrigger
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-4 px-0 whitespace-nowrap"
            >
              {t("specifications")}
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-4 px-0 whitespace-nowrap"
            >
              {t("reviews")} ({product.reviews})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="prose prose-gray max-w-none">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {t("productDescription")}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("productDetailStory")}
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {t("productDetailMaterial")}
              </p>
              <h4 className="text-lg font-semibold text-foreground mb-3 mt-6">
                {t("keyFeatures")}
              </h4>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>{t("featureQuality")}</li>
                <li>{t("featurePremium")}</li>
                <li>{t("featureWashing")}</li>
                <li>{t("featureVersatile")}</li>
                <li>{t("featureAuthentic")}</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-4">
                  {t("techSpecs")}
                </h4>
                <dl className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">{t("model")}</dt>
                    <dd className="font-medium text-foreground">
                      {product.id.padStart(4, "0")} - {categoryName} Collection
                    </dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">
                      {t("releaseYear")}
                    </dt>
                    <dd className="font-medium text-foreground">2024</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-border">
                    <dt className="text-muted-foreground">{t("warranty")}</dt>
                    <dd className="font-medium text-foreground">Authenticity Guaranteed</dd>
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
                          <Star
                            key={i}
                            className="h-4 w-4 fill-accent text-accent"
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-foreground">
                        {t("verifiedBuyer")}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {review} {t("weeksAgo")}
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Great quality! Exactly as described and shipping was fast.
                    Would definitely recommend to anyone looking for stylish{" "}
                    {categoryName.toLowerCase()}.
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              {t("relatedProducts")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  {...p}
                  name={
                    language === "my" && (p as any).name_my
                      ? (p as any).name_my
                      : p.name
                  }
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
