"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/lib/useTranslation";
import FieldRowDivider from "@/components/FieldRowDivider";

export default function HomeContent() {
  const { t, language } = useTranslation();

  return (
    <>
      {/* Premium Full-Bleed Hero Section */}
      <section className="relative overflow-hidden bg-brand-dark-green px-4 py-16 lg:py-0 lg:h-[calc(100vh-80px)] min-h-[500px] lg:min-h-0 flex items-center text-brand-cream">
        {/* Subtle repeating field pattern texture in background */}
        <div className="absolute inset-0 bg-field-pattern opacity-[0.03] pointer-events-none" />
        
        {/* Soft glowing ambient light shapes */}
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand-light-green/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand-orange/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Column 1: Text Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-start animate-fade-in-up">
              <div className="mb-6 flex items-center gap-3">
                <div className="relative h-14 w-14 overflow-hidden rounded-full border border-brand-wheat-gold/30 p-0.5 bg-white/10 backdrop-blur-sm shadow-inner">
                  <Image
                    src="/images/logo.jpeg"
                    alt={t("nav.logoAlt")}
                    fill
                    className="object-cover rounded-full"
                    sizes="56px"
                    priority
                  />
                </div>
                <span className="text-xs uppercase tracking-widest text-brand-wheat-gold font-semibold font-work-sans">
                  MRS Agro Chemicals
                </span>
              </div>
              
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.2] text-brand-cream font-fraunces">
                {t("home.heroTitle")}
              </h1>
              
              <p className="mb-8 text-lg sm:text-xl text-brand-cream/80 leading-relaxed max-w-2xl font-light">
                {t("home.heroSubtitle")}
              </p>
              
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 rounded-full bg-brand-orange px-8 py-4 text-lg font-semibold text-brand-cream transition-all duration-300 hover:scale-105 hover:bg-brand-orange/95 shadow-lg shadow-brand-orange/20 active:scale-95"
              >
                <span>{t("home.ctaButton")}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:rtl:-translate-x-1 rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Column 2: Premium Visual Collage (Asymmetric Card Deck) */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[400px] aspect-[4/5] rounded-3xl border border-brand-wheat-gold/25 p-3 bg-white/5 backdrop-blur-md shadow-2xl overflow-hidden group">
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src="/images/products/Product1.jpeg"
                    alt="Premium Crop Field Showcase"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-w-lg) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark-green/60 via-transparent to-transparent" />
                </div>
                
                {/* Floating Glassmorphic Metric Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-brand-charcoal/95 backdrop-blur-md border border-brand-wheat-gold/20 shadow-xl flex items-center gap-4 transition-all duration-300 hover:translate-y-[-2px]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-dark-green text-brand-cream">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-brand-charcoal/60 uppercase font-semibold font-work-sans tracking-wider">
                      {language === "ur" ? "تصدیق شدہ اور محفوظ" : "Certified & Verified"}
                    </p>
                    <p className="text-sm font-bold text-brand-dark-green">
                      {language === "ur" ? "اعلیٰ معیار اور جراثیم سے پاک" : "98% Germination Standard"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Signature Section Divider */}
      <FieldRowDivider />

      {/* Premium Intro & Values Section */}
      <section className="bg-brand-cream px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Asymmetric Heading Statement */}
            <div className="lg:col-span-5 border-s-4 border-brand-light-green ps-6 lg:ps-8 py-2">
              <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark-green leading-tight font-fraunces">
                {t("home.introHeading")}
              </h2>
            </div>
            
            {/* Right: Intro Paragraph & Trust Cards */}
            <div className="lg:col-span-7">
              <p className="text-lg sm:text-xl leading-relaxed text-brand-charcoal/80 mb-12 font-light">
                {t("home.introText")}
              </p>
              
              {/* Trust Metric Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="rounded-2xl border border-brand-wheat-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-wheat-gold/10 text-brand-wheat-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-brand-dark-green font-fraunces">
                    {language === "ur" ? "معیار کی ضمانت" : "Pure Seed Guarantee"}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-work-sans">
                    {language === "ur" ? "لیبارٹری سے تصدیق شدہ اور کاشتکاروں کی پسند۔" : "Rigorous double-testing pipeline ensuring maximum purity and grain viability."}
                  </p>
                </div>

                <div className="rounded-2xl border border-brand-wheat-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-wheat-gold/10 text-brand-wheat-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-brand-dark-green font-fraunces">
                    {language === "ur" ? "اعلیٰ پیداوار" : "High Resistance"}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-work-sans">
                    {language === "ur" ? "خشک سالی اور بیماریوں کے خلاف بہترین مزاحمت۔" : "Climate-resilient hybrids optimized for Pakistani climates and soil variations."}
                  </p>
                </div>

                <div className="rounded-2xl border border-brand-wheat-gold/20 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-wheat-gold/10 text-brand-wheat-gold">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-brand-dark-green font-fraunces">
                    {language === "ur" ? "ملک گیر نیٹ ورک" : "Nationwide Network"}
                  </h3>
                  <p className="text-sm text-brand-charcoal/70 leading-relaxed font-work-sans">
                    {language === "ur" ? "پنجاب اور سندھ کے تمام اہم اضلاع میں دستیابی۔" : "Fast delivery and expert franchise backing in every major district."}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
