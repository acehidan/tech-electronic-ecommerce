"use client";

import { Navigation } from "@/components/navigation";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter, X } from "lucide-react";
import { useState } from "react";
import { products, categories } from "@/lib/data";

import { useLanguage } from "@/lib/language-context";

export default function ProductsPage() {
  const { t, language } = useLanguage();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2100000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 2100000]);
    setSortOption("featured");
  };

  const filteredProducts = products
    .filter((product) => {
      // Category Filter
      if (
        selectedCategories.length > 0 &&
        (!product.category || !selectedCategories.includes(product.category))
      ) {
        return false;
      }
      // Price Filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0); // Simple sort by isNew flag
        default:
          return 0; // Featured (default order)
      }
    });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("allProducts")}
          </h1>
          <p className="text-muted-foreground">
            {t("showingResults").replace(
              "{count}",
              filteredProducts.length.toString()
            )}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside
            className={`lg:w-64 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  {t("filters")}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Category Filter */}
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("category")}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Checkbox
                      id="all"
                      checked={selectedCategories.length === 0}
                      onCheckedChange={(checked) => {
                        if (checked) setSelectedCategories([]);
                      }}
                    />
                    <Label
                      htmlFor="all"
                      className="ml-2 text-sm text-foreground cursor-pointer"
                    >
                      {t("allProductsLabel")}
                    </Label>
                  </div>
                  {categories.map((category) => (
                    <div key={category.slug} className="flex items-center">
                      <Checkbox
                        id={category.slug}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() => toggleCategory(category.slug)}
                      />
                      <Label
                        htmlFor={category.slug}
                        className="ml-2 text-sm text-foreground cursor-pointer"
                      >
                        {t(`cat_${category.slug.replace("-", "_")}` as any)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("priceRange")}
                </h3>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={3500000}
                    step={50000}
                    className="mb-4"
                  />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{(priceRange[0] / 1000).toFixed(0)}K</span>
                    <span>{(priceRange[1] / 1000).toFixed(0)}K+</span>
                  </div>
                </div>
              </div>

              {/* Brand Filter (Visual only for now) */}
              <div className="mb-6 pb-6 border-b border-border">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("brand")}
                </h3>
                <div className="space-y-3">
                  {["Makita", "Bosch", "DeWalt", "Stanley", "Milwaukee"].map(
                    (brand) => (
                      <div key={brand} className="flex items-center">
                        <Checkbox id={brand} />
                        <Label
                          htmlFor={brand}
                          className="ml-2 text-sm text-foreground cursor-pointer"
                        >
                          {brand}
                        </Label>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Rating Filter (Visual only for now) */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-4">
                  {t("rating")}
                </h3>
                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox id={`rating-${rating}`} />
                      <Label
                        htmlFor={`rating-${rating}`}
                        className="ml-2 text-sm text-foreground cursor-pointer"
                      >
                        {rating}★ {t("up")}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                className="w-full bg-transparent"
                variant="outline"
                onClick={clearFilters}
              >
                {t("clearAllFilters")}
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
                {t("filters")}
              </Button>
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-muted-foreground">
                  {t("sortBy")}
                </span>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">
                      {t("sortFeatured")}
                    </SelectItem>
                    <SelectItem value="price-low">
                      {t("sortPriceLow")}
                    </SelectItem>
                    <SelectItem value="price-high">
                      {t("sortPriceHigh")}
                    </SelectItem>
                    <SelectItem value="rating">{t("sortRating")}</SelectItem>
                    <SelectItem value="newest">{t("sortNewest")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  {t("noProductsFound")}
                </p>
                <Button variant="link" onClick={clearFilters} className="mt-2">
                  {t("clearFilters")}
                </Button>
              </div>
            )}

            {/* Pagination (Visual only) */}
            {filteredProducts.length > 0 && (
              <div className="mt-12 flex justify-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  {t("previous")}
                </Button>
                <Button variant="default" size="sm">
                  1
                </Button>
                <Button variant="outline" size="sm">
                  {t("next")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
