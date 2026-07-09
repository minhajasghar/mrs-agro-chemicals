"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { useTranslation } from "@/lib/useTranslation";

const navItems: { key: string; href: string }[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "products", href: "/products" },
  { key: "franchise", href: "/franchise" },
  { key: "contact", href: "/contact" },
];

export default function Header() {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-dark-green/90 text-brand-cream border-b border-brand-wheat-gold/20 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
        
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-brand-wheat-gold/30 p-0.5 bg-white/10 shadow-md transition-transform group-hover:scale-105 duration-300">
              <Image
                src="/images/logo.jpeg"
                alt={t("nav.logoAlt")}
                fill
                className="object-cover rounded-full"
                sizes="44px"
              />
            </div>
            <span className="hidden sm:inline-block font-fraunces font-bold text-lg text-brand-cream tracking-wide group-hover:text-brand-orange transition-colors">
              {t("footer.companyName")}
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className="text-sm font-medium tracking-wide transition-colors hover:text-brand-orange nav-link-hover py-1"
            >
              {t(`nav.${key}`)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="rounded-full border border-brand-wheat-gold/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-all hover:bg-brand-orange/15 hover:border-brand-orange cursor-pointer font-work-sans text-brand-cream"
          >
            {language === "en" ? t("nav.toggleToUrdu") : t("nav.toggleToEnglish")}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col justify-center items-center gap-1.5 md:hidden w-8 h-8 rounded-full border border-brand-wheat-gold/25 bg-white/5 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-4 bg-brand-cream transition-transform duration-300 ${
                menuOpen ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-brand-cream transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-brand-cream transition-transform duration-300 ${
                menuOpen ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-brand-wheat-gold/15 bg-brand-dark-green/95 backdrop-blur-lg px-6 pb-6 pt-3 md:hidden space-y-4 shadow-xl">
          {navItems.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="py-2 text-base font-semibold border-b border-brand-wheat-gold/10 hover:text-brand-orange transition-colors flex items-center justify-between"
            >
              <span>{t(`nav.${key}`)}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-brand-wheat-gold rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
