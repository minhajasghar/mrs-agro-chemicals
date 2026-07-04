"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

const navItems = ["Home", "About", "Products", "Franchise", "Contact"];

export default function Header() {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand-dark-green text-brand-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-16 items-center justify-center rounded bg-gray-400 text-sm font-bold text-white">
            LOGO
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="transition-colors hover:text-brand-orange"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleLanguage}
            className="rounded border border-brand-cream px-3 py-1 text-sm transition-colors hover:bg-brand-cream hover:text-brand-dark-green"
          >
            {language === "en" ? "اردو" : "English"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1 md:hidden"
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-6 bg-brand-cream transition-transform ${
                menuOpen ? "translate-y-1.5 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-brand-cream transition-opacity ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-brand-cream transition-transform ${
                menuOpen ? "-translate-y-1.5 -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="flex flex-col border-t border-brand-cream/20 px-4 pb-4 pt-2 md:hidden">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className="py-2 transition-colors hover:text-brand-orange"
            >
              {item}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
