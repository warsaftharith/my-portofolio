import { createContext, useContext, useEffect, useState } from "react";

/**
 * Daftar bahasa yang tersedia
 */
export const LANGUAGES = ["en", "id", "jp", "ar", "sas"] as const;

export type Lang = (typeof LANGUAGES)[number];

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

/**
 * Validasi bahasa
 */
const isValidLang = (value: string | null): value is Lang => {
  return value !== null && (LANGUAGES as readonly string[]).includes(value);
};

/**
 * Deteksi bahasa berdasarkan bahasa browser
 */
const detectBrowserLanguage = (): Lang => {
  const browserLang = navigator.language.toLowerCase();

  // Indonesia
  if (browserLang.startsWith("id")) {
    return "id";
  }

  // Jepang
  if (browserLang.startsWith("ja")) {
    return "jp";
  }

  // Arab
  if (browserLang.startsWith("ar")) {
    return "ar";
  }

  // Sasak tidak punya kode browser standar,
  // jadi tidak bisa dideteksi otomatis dengan akurat.
  
  // English sebagai fallback
  return "en";
};

export const LangProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    /**
     * Cek apakah user sudah pernah memilih bahasa
     */
    const savedLang = localStorage.getItem("lang");

    if (isValidLang(savedLang)) {
      // Kalau pernah memilih manual,
      // gunakan pilihan tersebut.
      setLangState(savedLang);
      return;
    }

    /**
     * Kalau belum pernah memilih,
     * gunakan bahasa browser.
     */
    const detectedLang = detectBrowserLanguage();

    setLangState(detectedLang);

    // Simpan bahasa hasil deteksi
    localStorage.setItem("lang", detectedLang);
  }, []);

  /**
   * User mengganti bahasa secara manual
   */
  const setLang = (newLang: Lang) => {
    setLangState(newLang);

    // Simpan pilihan user
    localStorage.setItem("lang", newLang);
  };

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      {children}
    </LangContext.Provider>
  );
};

/**
 * Custom hook
 */
export const useLang = () => {
  const context = useContext(LangContext);

  if (!context) {
    throw new Error("useLang must be used inside LangProvider");
  }

  return context;
};