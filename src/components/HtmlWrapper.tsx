"use client";

import { useEffect, ReactNode } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function HtmlWrapper({ children }: { children: ReactNode }) {
  const { language, isRTL } = useLanguage();

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = language;
  }, [isRTL, language]);

  useEffect(() => {
    const body = document.body;
    if (language === "ur") {
      body.style.fontFamily =
        "var(--font-nastaliq), var(--font-noto-sans-arabic), serif";
    } else {
      body.style.fontFamily = "var(--font-poppins), sans-serif";
    }
  }, [language]);

  return <>{children}</>;
}
