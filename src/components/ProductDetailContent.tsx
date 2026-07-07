"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import type { Product } from "@/lib/products";

export default function ProductDetailContent({
  product,
}: {
  product: Product;
}) {
  const { t, language } = useTranslation();
  const dir = language === "ur" ? "rtl" : "ltr";

  // Typical premium agricultural specification table values based on pesticide varieties
  const specItems = [
    { keyEn: "Germination Standard", keyUr: "جرمینییشن کا تناسب", valEn: "95% - 98%", valUr: "95% - 98%" },
    { keyEn: "Physical Purity", keyUr: "طبیعی صفائی", valEn: "99.2%", valUr: "99.2%" },
    { keyEn: "Moisture Limit", keyUr: "نمی کا تناسب", valEn: "12% Max", valUr: "زیادہ سے زیادہ 12%" },
    { keyEn: "Crop Duration", keyUr: "فصل کا دورانیہ", valEn: "Season Optimal", valUr: "موسم کے مطابق" },
    { keyEn: "Treatment Type", keyUr: "علاج کی قسم", valEn: "Certified Safe Fungicide", valUr: "تصدیق شدہ فنگسائڈ محفوظ" },
  ];

  return (
    <div className="bg-brand-cream min-h-screen pt-16 lg:pt-28 pb-16 lg:pb-24 overflow-hidden" dir={dir}>
      <div className="mx-auto max-w-7xl w-full px-4 animate-fade-in-up">
        
        {/* Back Link */}
        <Link
          href="/products"
          className="group mb-10 inline-flex items-center gap-2 text-sm font-semibold text-brand-dark-green/70 hover:text-brand-orange transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 group-hover:rtl:translate-x-1 rtl:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          <span>{t("products.backToProducts")}</span>
        </Link>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 lg:mt-8">
          
          {/* Column 1: Large Product Image */}
          <div className="lg:col-span-7 relative w-full aspect-[4/3] rounded-3xl bg-white shadow-xl overflow-hidden">
            <div className="relative w-full h-full bg-gradient-to-br from-brand-cream via-white to-brand-wheat-gold/10">
              <Image
                src={product.imageUrl}
                alt={language === "en" ? product.nameEn : product.nameUr}
                fill
                className="object-contain p-6 sm:p-8 drop-shadow-2xl"
                priority
                sizes="(max-w-lg) 100vw, 600px"
              />
            </div>
          </div>

          {/* Column 2: Product Info */}
          <div className="lg:col-span-5 flex flex-col justify-center text-start">
            
            {/* Category Pill Badge */}
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-brand-dark-green/10 px-3 py-1 text-xs font-semibold text-brand-dark-green self-start font-work-sans">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-light-green" />
              <span className="font-bold">{language === "en" ? product.categoryEn : product.categoryUr}</span>
            </div>

            <h1 className="mb-5 text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark-green font-fraunces leading-tight">
              {language === "en" ? product.nameEn : product.nameUr}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-brand-charcoal/70 font-light mb-10">
              {language === "en" ? product.descriptionEn : product.descriptionUr}
            </p>

            {/* Specifications Table */}
            <div className="mb-8 rounded-2xl border border-brand-wheat-gold/15 bg-white/80 p-6 shadow-sm">
              <h3 className="mb-4 text-base font-bold text-brand-dark-green font-fraunces tracking-tight">
                {language === "ur" ? "تکنیکی خصوصیات" : "Technical Specifications"}
              </h3>
              <div className="divide-y divide-brand-wheat-gold/10 text-sm">
                {specItems.map((item) => (
                  <div key={item.keyEn} className="flex justify-between py-2.5">
                    <span className="font-medium text-brand-charcoal/60">
                      {language === "ur" ? item.keyUr : item.keyEn}
                    </span>
                    <span className="font-semibold text-brand-dark-green">
                      {language === "ur" ? item.valUr : item.valEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Franchise CTA */}
            <div className="rounded-2xl bg-brand-dark-green p-6 text-brand-cream relative overflow-hidden">
              <div className="absolute inset-0 bg-field-pattern opacity-[0.02] pointer-events-none" />
              <h4 className="mb-1.5 text-base font-bold font-fraunces tracking-tight">
                {language === "ur" ? "تقسیم کار بنیں" : "Interested in Distributing?"}
              </h4>
              <p className="mb-5 text-sm text-brand-cream/75 leading-relaxed font-light font-work-sans">
                {language === "ur" 
                  ? "اپنے علاقے میں آفیشل ڈیلر بننے کے لیے آج ہی فرنچائز کی درخواست جمع کروائیں۔" 
                  : "Become an authorized franchise partner and supply premium Pesticides to farmers in your area."}
              </p>
              <Link
                href="/franchise"
                className="inline-block rounded-full bg-brand-orange px-6 py-2.5 text-xs font-bold text-brand-cream transition-all duration-300 hover:scale-103 hover:bg-brand-orange/95 shadow-md active:scale-95 font-work-sans"
              >
                {language === "ur" ? "فرنچائز کے لیے اپلائی کریں" : "Apply for Franchise"}
              </Link>
            </div>

          </div>
          
        </div>
        
      </div>
    </div>
  );
}
