"use client";

import { Navigation } from "@/components/navigation";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Truck, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { products, categories } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
const bestSellers = products.filter((p) => p.isBestSeller).slice(0, 4);

export default function HomePage() {
  const { t, language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-3xl md:text-6xl font-bold mb-6 text-balance leading-15 md:leading-30">
              {t("heroTitle")}
            </h1>
            {/* <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 text-pretty">
              {t("heroSubtitle")}
            </p> */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button
                  size="4xl"
                  variant="secondary"
                  className="text-xl font-semibold"
                >
                  အော်ဒါတင်ရန်
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              {/* <Link href="/categories">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-base font-semibold bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground"
                >
                  {t("viewAllCategories")}
                </Button>
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      {/* <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t("freeShipping")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("freeShippingDesc")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t("securePayment")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("securePaymentDesc")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t("fastDelivery")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t("fastDeliveryDesc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {t("shopByCategory")}
              </h2>
              {/* <p className="text-muted-foreground">{t("shopByCategoryDesc")}</p> */}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                {...category}
                name={category.name_my}
              />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg md:text-3xl font-bold text-foreground mb-2">
                {t("newArrivals")}
              </h2>
              <p className="hidden md:block text-sm md:text-base text-muted-foreground">{t("newArrivalsDesc")}</p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                {t("viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {newArrivals.map((product) => (
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
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg md:text-3xl font-bold text-foreground mb-2">
                {t("bestSellers")}
              </h2>
              <p className="hidden md:block text-sm md:text-base text-muted-foreground">{t("bestSellersDesc")}</p>
            </div>
            <Link href="/products">
              <Button variant="outline">
                {t("viewAll")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {bestSellers.map((product) => (
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
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="py-16 md:py-20 bg-gradient-to-br from-primary via-primary/90 to-accent text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {t("getDiscount")}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto text-pretty">
            {t("newsletterDesc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder={t("enterEmail")}
              className="flex-1 px-4 py-3 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary-foreground/50"
            />
            <Button size="lg" variant="secondary" className="font-semibold">
              {t("subscribe")}
            </Button>
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-secondary border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="h-8 w-8 text-primary" />
                <span className="text-lg font-bold text-foreground">
                  Auto Shop
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{t("footerDesc")}</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {t("shop")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/products"
                    className="hover:text-primary transition-colors"
                  >
                    {t("newArrivals")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="hover:text-primary transition-colors"
                  >
                    {t("bestSellers")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className="hover:text-primary transition-colors"
                  >
                    {t("categories")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                {t("support")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {t("contactUs")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {t("shippingInfo")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {t("returns")}
                  </Link>
                </li>
              </ul>
            </div>
            {/* <div>
              <h4 className="font-semibold text-foreground mb-4">
                {t("account")}
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/account"
                    className="hover:text-primary transition-colors"
                  >
                    {t("myAccount")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account"
                    className="hover:text-primary transition-colors"
                  >
                    {t("orderHistory")}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="hover:text-primary transition-colors"
                  >
                    {t("wishlist")}
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Auto Shop. {t("rightsReserved")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
