"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/useTranslation";

const infoItems = [
  { labelKey: "franchise.locationLabel", valueKey: "franchise.locationValue" },
  { labelKey: "franchise.networkLabel", valueKey: "franchise.networkValue" },
];

export default function FranchiseContent() {
  const { t, language } = useTranslation();
  const [imgError, setImgError] = useState(false);

  return (
    <div className="bg-brand-cream overflow-x-hidden">
      {/* Compact header + image side by side on desktop */}
      <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Title */}
          <div className="text-start animate-fade-in-up">
            <p className="mb-2 text-xs uppercase tracking-widest text-brand-wheat-gold font-bold font-work-sans">
              {language === "ur" ? "ہماری نمائش" : "Our Showroom"}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-dark-green font-fraunces leading-tight">
              {t("franchise.pageTitle")}
            </h1>
            <div className="mt-4 h-1 w-12 bg-brand-orange rounded-full" />
            <p className="mt-4 text-base sm:text-lg text-brand-charcoal/80 leading-relaxed font-light">
              {t("franchise.pageSubtitle")}
            </p>
          </div>

          {/* Right: Shop Image */}
          <div className="rounded-2xl border border-brand-wheat-gold/20 bg-white p-2 shadow-lg">
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-200">
              {imgError ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-200 p-6">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2 h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                    <span className="text-sm text-gray-500 font-work-sans">
                      {language === "ur" ? "تصویر جلد شامل کی جائے گی" : "Shop Image Coming Soon"}
                    </span>
                  </div>
                </div>
              ) : (
                <Image
                  src="/images/franchise-shop.jpeg"
                  alt={t("franchise.shopImageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-w-md) 100vw, 500px"
                  onError={() => setImgError(true)}
                />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Our Presence Section */}
      <section className="mx-auto max-w-5xl px-4 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 border-s-4 border-brand-light-green ps-6 py-1">
            <h2 className="text-3xl font-bold text-brand-dark-green font-fraunces leading-tight">
              {t("franchise.aboutHeading")}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-brand-charcoal/80 font-light">
              {t("franchise.aboutText")}
            </p>
          </div>
        </div>
      </section>

      {/* Info Cards Section */}
      <section className="bg-white border-y border-brand-wheat-gold/15 px-4 py-16 md:py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {infoItems.map((item) => (
              <div
                key={item.labelKey}
                className="rounded-2xl border border-brand-light-green/30 bg-brand-cream p-6 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <h3 className="mb-2 text-lg font-bold text-brand-dark-green font-fraunces">
                  {t(item.labelKey)}
                </h3>
                <p className="text-base leading-relaxed text-brand-charcoal/80 font-work-sans">
                  {t(item.valueKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
