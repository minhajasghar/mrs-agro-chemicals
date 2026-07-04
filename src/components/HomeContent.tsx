"use client";

import { useTranslation } from "@/lib/useTranslation";

export default function HomeContent() {
  const { t } = useTranslation();

  return (
    <>
      <section className="bg-brand-cream px-4 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-8 flex h-24 w-48 items-center justify-center rounded bg-gray-400 text-lg font-bold text-white">
            LOGO
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-brand-dark-green md:text-5xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mb-8 text-lg text-brand-charcoal/80 md:text-xl">
            {t("home.heroSubtitle")}
          </p>
          <a
            href="#"
            className="inline-block rounded bg-brand-orange px-8 py-3 text-lg font-semibold text-brand-cream transition-opacity hover:opacity-90"
          >
            {t("home.ctaButton")}
          </a>
        </div>
      </section>

      <section className="bg-brand-cream px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 text-3xl font-bold text-brand-dark-green">
            {t("home.introHeading")}
          </h2>
          <p className="text-lg leading-relaxed text-brand-charcoal/80">
            {t("home.introText")}
          </p>
        </div>
      </section>
    </>
  );
}
