import { useLanguage } from "@/lib/LanguageContext";
import en from "@/messages/en.json";
import ur from "@/messages/ur.json";

const messages: Record<string, typeof en> = { en, ur };

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function useTranslation() {
  const { language } = useLanguage();
  const dict = messages[language];

  const t = (key: string): string => {
    const value = getNestedValue(dict, key);
    if (typeof value === "string") return value;
    return key;
  };

  return { t, language };
}
