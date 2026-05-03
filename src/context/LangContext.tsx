import { createContext, useContext, useEffect, useState } from "react";

/**
 * 🔥 Daftar bahasa cukup ditambah di sini saja
 */
export const LANGUAGES = ["en", "id", "jp", "ar", "sas"] as const;

export type Lang = (typeof LANGUAGES)[number];

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

/**
 * helper untuk validasi bahasa
 */
const isValidLang = (value: string | null): value is Lang => {
  return value !== null && (LANGUAGES as readonly string[]).includes(value);
};

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("jp"); // default fallback

  /**
   * ambil dari localStorage saat pertama load
   */
  useEffect(() => {
    const savedLang = localStorage.getItem("lang");

    if (isValidLang(savedLang)) {
      setLangState(savedLang);
    } else {
      setLangState("jp"); // default kalau belum ada / invalid
      localStorage.setItem("lang", "jp");
    }
  }, []);

  /**
   * setter aman + sync localStorage
   */
  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("lang", newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

/**
 * custom hook
 */
export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used inside LangProvider");
  }
  return context;
};