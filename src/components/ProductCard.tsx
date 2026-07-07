"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import type { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  const { t, language } = useTranslation();

  const isPlaceholder = !product.imageUrl || product.imageUrl.includes("placeholder");

  return (
    <div className="group flex flex-col h-full rounded-3xl border border-brand-wheat-gold/20 bg-white shadow-sm transition-all duration-500 hover:shadow-xl hover:border-brand-light-green/45 hover:-translate-y-1.5 overflow-hidden">
      
      {/* Product Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-brand-cream via-white to-brand-wheat-gold/10 border-b border-brand-wheat-gold/10">
        {isPlaceholder ? (
          <div className="flex h-full w-full flex-col items-center justify-center p-6 text-brand-wheat-gold/60">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
            </svg>
            <span className="text-center text-xs font-medium font-work-sans">
              {t("products.noImageText")}
            </span>
          </div>
        ) : (
          <Image
            src={product.imageUrl}
            alt={language === "en" ? product.nameEn : product.nameUr}
            fill
            className="object-contain p-4 sm:p-6 drop-shadow-xl transition-transform duration-700 group-hover:scale-105"
            sizes="(max-w-md) 100vw, 360px"
          />
        )}
      </div>

      {/* Product Details Section */}
      <div className="flex flex-col flex-1 p-6 sm:p-8 text-start">
        
        {/* Category Pill Badge */}
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-brand-dark-green/10 px-3 py-1 text-xs font-semibold text-brand-dark-green self-start font-work-sans">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-light-green animate-pulse" />
          <span className="font-bold">{language === "en" ? product.categoryEn : product.categoryUr}</span>
        </div>

        <h3 className="mb-3 text-xl font-bold text-brand-dark-green font-fraunces leading-tight transition-colors duration-300 group-hover:text-brand-orange">
          {language === "en" ? product.nameEn : product.nameUr}
        </h3>

        <p className="mb-6 text-sm leading-relaxed text-brand-charcoal/70 font-light line-clamp-3">
          {language === "en" ? product.descriptionEn : product.descriptionUr}
        </p>

        <Link
          href={`/products/${product.slug}`}
          className="mt-auto group/btn inline-flex items-center gap-2 self-start rounded-full bg-brand-orange px-6 py-3 text-xs font-bold text-brand-cream transition-all duration-300 hover:bg-brand-orange/95 hover:scale-103 shadow-md hover:shadow-brand-orange/20 active:scale-95"
        >
          <span>{t("products.viewDetailsButton")}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:rtl:-translate-x-0.5 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

    </div>
  );
}
