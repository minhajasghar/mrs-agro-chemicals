"use client";

import { useTranslation } from "@/lib/useTranslation";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export default function ProductsContent({ products }: { products: Product[] }) {
  const { t, language } = useTranslation();

  return (
    <div className="bg-brand-cream overflow-hidden">
      {/* Premium Products List Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 animate-fade-in-up">
        
        {/* Header Block */}
        <div className="mb-16 text-center">
          <span className="mb-3 text-xs uppercase tracking-widest text-brand-wheat-gold font-bold font-work-sans block">
            {language === "ur" ? "پریمیم بیج کی اقسام" : "Premium Certified Varieties"}
          </span>
          <h1 className="mb-6 text-4xl sm:text-5xl font-bold text-brand-dark-green font-fraunces leading-tight">
            {t("products.pageTitle")}
          </h1>
          <div className="mx-auto mb-6 h-0.5 w-12 bg-brand-orange" />
          <p className="mx-auto max-w-3xl text-lg sm:text-xl text-brand-charcoal/80 leading-relaxed font-light">
            {t("products.pageSubtitle")}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
      </section>
    </div>
  );
}
