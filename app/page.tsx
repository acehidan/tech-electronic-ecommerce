"use client";

import { Navigation } from "@/components/navigation";
import { ProductCard } from "@/components/product-card";
import { CategoryCard } from "@/components/category-card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, Truck, ShoppingBag, ChevronRight } from "lucide-react";
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
      <section className="bg-gradient-to-r from-[#2216a8] to-[#3a2dbb] relative overflow-hidden">
        <div className="container mx-auto py-8 md:py-20  ">
          <div className="grid grid-cols-7 gap-2 items-center">
            <div className="text-white space-y-6 px-4 col-span-4">
              <h1 className="text-[16px] md:text-xl lg:text-4xl font-bold leading-[1.8] lg:leading-[1.5]">
                {t("heroTitle")}
              </h1>
              <Link href="/products" className="inline-block">
                <button
                  className="bg-white text-[#2216a8] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 text-[12px] md:text-base cursor-pointer"
                >
                  အော်ဒါတင်မယ်
                  <ChevronRight className="w-5 h-5" />
                </button>
              </Link>
            </div>

            <div className="relative h-48 md:h-80 col-span-3">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=800"
                alt="Electronics Banner"
                className="absolute right-0 top-0 w-full h-full object-cover rounded-l-lg shadow-lg"
              />
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
      {/* <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {t("shopByCategory")}
              </h2>
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
      </section> */}

      {/* New Arrivals */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[22px] sm:text-2xl md:text-3xl font-bold text-[#2216a8] leading-none mb-1">
                {t("newArrivals")}
              </h2>
              <p className="text-[13px] sm:text-sm md:text-base text-foreground/90 font-medium leading-[1.4]">
                {t("newArrivalsDesc")}
              </p>
            </div>
            <Link href="/products" className="shrink-0 ml-2">
              <Button
                variant="outline"
                className="rounded-[14px] border border-[#2216a8] text-[#2216a8] hover:bg-blue-50/50 hover:text-[#2216a8] bg-white px-5 sm:px-6 py-4 h-auto text-[15px] sm:text-base font-bold shadow-none"
              >
                ကြည့်မယ်
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col gap-1.5">
              <h2 className="w-[200px] sm:w-full text-[22px] sm:text-2xl md:text-3xl font-bold text-[#0051a8] leading-[2] mb-1">
                {t("bestSellers")}
              </h2>
              <p className="text-[13px] sm:text-sm md:text-base text-foreground/90 font-medium leading-[1.4]">
                {t("bestSellersDesc")}
              </p>
            </div>
            <Link href="/products" className="shrink-0 ml-2">
              <Button
                variant="outline"
                className="rounded-[14px] border border-[#2216a8] text-[#2216a8] hover:bg-blue-50/50 hover:text-[#2216a8] bg-white px-5 sm:px-6 py-4 h-auto text-[15px] sm:text-base font-bold shadow-none"
              >
                ကြည့်မယ်
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                <img src="/autoshop.png" alt="AutoShop Logo" className="h-10 w-10 object-contain" />
                <span className="text-lg font-bold text-foreground">
                  AutoShop
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
            <p>&copy; 2025 AutoShop. {t("rightsReserved")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
