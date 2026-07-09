"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

const STORAGE_KEY = "mrs-agro-language";

type Language = "en" | "ur";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

function getInitialLanguage(): Language {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ur") return saved;
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("lang="));
    if (cookie) {
      const val = cookie.split("=")[1];
      if (val === "en" || val === "ur") return val;
    }
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = getInitialLanguage();
    setLanguage(saved);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, language);
    document.cookie = `lang=${language};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    document.documentElement.dir = language === "ur" ? "rtl" : "ltr";
    document.documentElement.lang = language;
    document.body.style.fontFamily =
      language === "ur"
        ? "var(--font-noto-sans-arabic), sans-serif"
        : "var(--font-work-sans), sans-serif";
  }, [language, mounted]);

  const isRTL = language === "ur";

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => {
      const next = prev === "en" ? "ur" : "en";
      localStorage.setItem(STORAGE_KEY, next);
      document.cookie = `lang=${next};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
      document.documentElement.dir = next === "ur" ? "rtl" : "ltr";
      document.documentElement.lang = next;
      return next;
    });
  }, []);

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ language: "en", toggleLanguage: () => {}, isRTL: false }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
