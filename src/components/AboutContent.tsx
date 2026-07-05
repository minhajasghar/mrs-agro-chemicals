"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/useTranslation";

const overviewItems = [
  { labelKey: "about.foundedLabel", valueKey: "about.foundedValue" },
  { labelKey: "about.headOfficeLabel", valueKey: "about.headOfficeValue" },
  { labelKey: "about.coreBusinessLabel", valueKey: "about.coreBusinessValue" },
  { labelKey: "about.keyBrandsLabel", valueKey: "about.keyBrandsValue" },
  { labelKey: "about.coverageLabel", valueKey: "about.coverageValue" },
];

const missionKeys = ["mission1", "mission2", "mission3", "mission4"];

const coreValues = [
  { titleKey: "coreValue1Title", textKey: "coreValue1Text", icon: "shield" },
  { titleKey: "coreValue2Title", textKey: "coreValue2Text", icon: "users" },
  { titleKey: "coreValue3Title", textKey: "coreValue3Text", icon: "trending" },
];

export default function AboutContent() {
  const { t, language } = useTranslation();
  const [ceoImgError, setCeoImgError] = useState(false);

  return (
    <div className="bg-brand-cream overflow-x-hidden">
      {/* 1. Header Hero section */}
      <section className="relative px-4 py-20 text-center md:py-24 bg-white border-b border-brand-wheat-gold/15">
        <div className="absolute inset-0 bg-field-pattern opacity-[0.015] pointer-events-none" />
        <div className="mx-auto max-w-4xl animate-fade-in-up">
          <p className="mb-3 text-xs uppercase tracking-widest text-brand-wheat-gold font-bold font-work-sans">
            {t("about.tagline")}
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-dark-green font-fraunces leading-tight">
            {t("about.pageTitle")}
          </h1>
          <div className="mx-auto mt-6 h-1 w-16 bg-brand-orange rounded-full" />
        </div>
      </section>

      {/* 2. Full-bleed CEO Message section */}
      <section className="relative bg-brand-dark-green px-4 py-16 md:py-20 text-brand-cream">
        <div className="absolute inset-0 bg-field-pattern opacity-[0.02] pointer-events-none" />
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            
            {/* CEO Image Container */}
            <div className="relative shrink-0 w-[240px] h-[240px] md:w-[280px] md:h-[280px] rounded-3xl border border-brand-wheat-gold/30 p-2.5 bg-white/5 backdrop-blur-sm shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-brand-dark-green flex items-center justify-center">
                {ceoImgError ? (
                  <div className="flex h-full w-full items-center justify-center bg-brand-charcoal/50 p-6">
                    <span className="text-center text-xs text-brand-cream/60 leading-relaxed font-work-sans">
                      {t("about.ceoImageAlt")}
                    </span>
                  </div>
                ) : (
                  <Image
                    src="/images/ceo.jpeg"
                    alt={t("about.ceoImageAlt")}
                    fill
                    className="object-contain p-1"
                    sizes="(max-w-md) 100vw, 280px"
                    onError={() => setCeoImgError(true)}
                  />
                )}
              </div>
            </div>

            {/* CEO Text */}
            <div className="flex-1 text-start">
              <span className="text-xs uppercase tracking-widest text-brand-wheat-gold font-bold font-work-sans mb-2 block">
                {language === "ur" ? "چیف ایگزیکٹو کا پیغام" : "Executive Statement"}
              </span>
              <h2 className="mb-4 text-3xl font-bold text-brand-cream font-fraunces leading-snug">
                {t("about.ceoMessageHeading")}
              </h2>
              <p className="text-lg leading-relaxed text-brand-cream/85 font-light">
                {t("about.ceoMessageText")}
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-start">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 border-s-4 border-brand-light-green ps-6 py-1">
            <h2 className="text-3xl font-bold text-brand-dark-green font-fraunces leading-tight">
              {t("about.heading")}
            </h2>
          </div>
          
          <div className="lg:col-span-8 space-y-6 text-lg leading-relaxed text-brand-charcoal/80">
            <p>{t("about.paragraph1")}</p>
            <p>{t("about.paragraph2")}</p>
          </div>
          
        </div>
      </section>

      {/* 4. Company Overview Section */}
      <section className="bg-white border-y border-brand-wheat-gold/15 px-4 py-24 text-start">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-dark-green font-fraunces mb-3">
              {t("about.companyOverviewHeading")}
            </h2>
            <div className="mx-auto h-0.5 w-12 bg-brand-light-green" />
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {overviewItems.map((item, idx) => (
              <div
                key={item.labelKey}
                className="rounded-2xl border border-brand-wheat-gold/20 bg-brand-cream p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-light-green/40 hover:-translate-y-0.5"
              >
                <div className="text-xs uppercase font-bold tracking-widest text-brand-wheat-gold mb-3 font-work-sans">
                  0{idx + 1}
                </div>
                <h3 className="mb-2 text-lg font-bold text-brand-dark-green font-fraunces">
                  {t(item.labelKey)}
                </h3>
                <p className="text-sm leading-relaxed text-brand-charcoal/80 font-work-sans">
                  {t(item.valueKey)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Vision Section (Featured Accent Box) */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-start">
        <div className="relative rounded-3xl border-l-4 border-brand-orange bg-brand-dark-green text-brand-cream p-8 md:p-12 overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-field-pattern opacity-[0.02] pointer-events-none" />
          <span className="text-xs uppercase tracking-widest text-brand-wheat-gold font-bold font-work-sans mb-3 block">
            {language === "ur" ? "ہمارا وژن" : "Our Ultimate Aim"}
          </span>
          <h2 className="mb-4 text-3xl font-bold text-brand-cream font-fraunces">
            {t("about.visionHeading")}
          </h2>
          <p className="text-xl italic leading-relaxed text-brand-cream/90 font-light font-fraunces">
            &ldquo;{t("about.visionText")}&rdquo;
          </p>
        </div>
      </section>

      {/* 6. Mission Section */}
      <section className="bg-white border-t border-brand-wheat-gold/15 px-4 py-24 text-start">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-brand-dark-green font-fraunces mb-3">
              {t("about.missionHeading")}
            </h2>
            <div className="mx-auto h-0.5 w-12 bg-brand-light-green" />
          </div>

          <div className="space-y-6">
            {missionKeys.map((key, i) => (
              <div 
                key={key} 
                className="flex items-start gap-4 p-5 rounded-2xl border border-brand-wheat-gold/10 hover:border-brand-wheat-gold/30 bg-brand-cream transition-colors duration-300"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-brand-orange text-brand-orange text-sm font-bold font-fraunces">
                  {i + 1}
                </div>
                <div className="pt-0.5">
                  <p className="text-lg leading-relaxed text-brand-charcoal font-medium font-work-sans">
                    {t(`about.${key}`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Core Values Section */}
      <section className="mx-auto max-w-5xl px-4 py-24 text-start">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-brand-dark-green font-fraunces mb-3">
            {t("about.coreValuesHeading")}
          </h2>
          <div className="mx-auto h-0.5 w-12 bg-brand-light-green" />
        </div>
        
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {coreValues.map((v) => (
            <div
              key={v.titleKey}
              className="rounded-2xl border border-brand-wheat-gold/20 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-brand-light-green/45 hover:-translate-y-1.5 text-center flex flex-col items-center"
            >
              {/* Dynamic Icon Base */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-dark-green/10 text-brand-dark-green">
                {v.icon === "shield" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                )}
                {v.icon === "users" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
                {v.icon === "trending" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-dark-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                )}
              </div>
              <h3 className="mb-3 text-xl font-bold text-brand-dark-green font-fraunces">
                {t(`about.${v.titleKey}`)}
              </h3>
              <p className="text-sm leading-relaxed text-brand-charcoal/70 font-work-sans">
                {t(`about.${v.textKey}`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
