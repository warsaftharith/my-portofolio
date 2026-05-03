import { createContext, useContext, useState, useEffect } from "react";

type Lang = "en" | "id" | "jp" | "ar" | "sas";

type LangContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LangContext = createContext<LangContextType | null>(null);

export const LangProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLangState] = useState<Lang>("id");

  //ambil dari localStorage saat pertama kali load
  useEffect(() => {
  const savedLang = localStorage.getItem("lang");
    if (savedLang === "en" || savedLang === "id" || savedLang === "jp") {
      setLangState(savedLang);
    } else {
      setLangState("id");
      localStorage.setItem("lang", "id");
    }
  }, []);

  //wrapper setLang biar otomatis simpan ke localStorage
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

export const useLang = () => {
  const context = useContext(LangContext);
  if (!context) throw new Error("useLang must be used inside LangProvider");
  return context;
};