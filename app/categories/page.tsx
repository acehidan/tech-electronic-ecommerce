"use client";

import { Navigation } from "@/components/navigation";
import { CategoryCard } from "@/components/category-card";
import { categories } from "@/lib/data";
import { useLanguage } from "@/lib/language-context";

export default function CategoriesPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("allCategories")}
          </h1>
          <p className="text-muted-foreground">{t("browseCategories")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.slug}
              {...category}
              name={category.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
