import { products, categories } from "@/lib/data";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "./product-detail-content";

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Find category name for breadcrumb
  const categoryName =
    categories.find((c) => c.slug === product.category)?.name || "Product";

  return (
    <ProductDetailContent
      product={product}
      categoryName={categoryName}
      relatedProducts={relatedProducts}
    />
  );
}
