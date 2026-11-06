import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

/** WARSA_LANG_SYSTEM_V353: bahasa tampilan berbeda dari preferensi Sistem/manual. */
export const LANGUAGES = ["en", "id", "jp", "ar", "sas"] as const;
export type Lang = (typeof LANGUAGES)[number];
export type LanguagePreference = Lang | "system";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  languagePreference: LanguagePreference;
  setLanguagePreference: (preference: LanguagePreference) => void;
};

const LangContext = createContext<LangContextType | null>(null);
const STORAGE_KEY = "warsa-language-preference-v1";

const isValidLang = (value: string | null): value is Lang =>
  value !== null && (LANGUAGES as readonly string[]).includes(value);

const detectBrowserLanguage = (): Lang => {
  if (typeof navigator === "undefined") return "en";
  const primary = navigator.languages?.[0] || navigator.language || "en";
  const code = primary.toLowerCase().split(/[-_]/)[0];
  if (code === "id" || code === "in") return "id";
  if (code === "ja") return "jp";
  if (code === "ar") return "ar";
  // Sasak belum punya pengenal otomatis yang dapat diandalkan.
  return "en";
};

const readPreference = (): LanguagePreference => {
  if (typeof window === "undefined") return "system";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "system" || isValidLang(stored)) return stored;
    // Migrasi: versi lama menyimpan hasil deteksi browser langsung ke "lang".
    // Jika nilainya sama dengan browser sekarang, kembalikan ke mode Sistem.
    // Jika berbeda, pertahankan kemungkinan pilihan bahasa manual.
    const legacy = window.localStorage.getItem("lang");
    if (isValidLang(legacy) && legacy !== detectBrowserLanguage()) return legacy;
  } catch { /* storage blocked */ }
  return "system";
};

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [languagePreference, setPreference] = useState<LanguagePreference>(readPreference);
  const [systemLanguage, setSystemLanguage] = useState<Lang>(detectBrowserLanguage);
  const lang: Lang = languagePreference === "system" ? systemLanguage : languagePreference;

  useEffect(() => {
    const handleLanguageChange = () => setSystemLanguage(detectBrowserLanguage());
    window.addEventListener("languagechange", handleLanguageChange);
    return () => window.removeEventListener("languagechange", handleLanguageChange);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, languagePreference);
      // Pertahankan key lama agar komponen legacy yang membacanya tetap kompatibel.
      window.localStorage.setItem("lang", lang);
    } catch { /* private browsing */ }
    document.documentElement.lang = lang === "jp" ? "ja" : lang === "sas" ? "id" : lang;
  }, [lang, languagePreference]);

  const setLanguagePreference = (value: LanguagePreference) => setPreference(value);
  const setLang = (value: Lang) => setPreference(value);

  return (
    <LangContext.Provider value={{ lang, setLang, languagePreference, setLanguagePreference }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used inside LangProvider");
  return context;
};
