import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronUp,
  X,
  GraduationCap,
  FileText,
  ArrowRight,
} from "lucide-react";

import Navbar from "./Navbar";
import Footer from "./Footer";

import { useLang } from "../../context/LangContext";

import { en } from "../../lang/en";
import { id } from "../../lang/id";
import { jp } from "../../lang/jp";
import { ar } from "../../lang/ar";
import { sas } from "../../lang/sas";

const localeText = {
  en: en.layout,
  id: id.layout,
  jp: jp.layout,
  ar: ar.layout,
  sas: sas.layout,
};

const PROMO_INTERVAL = 60 * 60 * 1000;
const PROMO_STORAGE_KEY = "promo_next_show";

function Layout({ children }: { children: React.ReactNode }) {
  const { lang } = useLang();

  const [showButton, setShowButton] = useState(false);
  const [showPromo, setShowPromo] = useState(false);

  const t = useMemo(() => {
    return (
      localeText[lang as keyof typeof localeText] ??
      localeText.en
    );
  }, [lang]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const checkPromo = () => {
      const nextShow = localStorage.getItem(
        PROMO_STORAGE_KEY
      );

      if (!nextShow) {
        setShowPromo(true);
        return;
      }

      const nextShowTime = Number(nextShow);
      if (Date.now() >= nextShowTime) {
        setShowPromo(true);
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    };

    checkPromo();

    const interval = setInterval(checkPromo, 1000);

    return () => clearInterval(interval);
  }, []);

  const closePromo = () => {
    setShowPromo(false);

    const nextShowTime =
      Date.now() + PROMO_INTERVAL;

    localStorage.setItem(
      PROMO_STORAGE_KEY,
      String(nextShowTime)
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* POPUP PROMO */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{
              opacity: 0,
              x: 120,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              x: 120,
              scale: 0.95,
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            className={`
              fixed
              right-5
              z-50

              ${
                showButton
                  ? "bottom-24"
                  : "bottom-5"
              }

              w-[480px]
              max-w-[calc(100vw-2rem)]

              overflow-hidden

              rounded-3xl
              border
              border-slate-200
              dark:border-slate-800

              bg-white/95
              dark:bg-slate-900/95

              backdrop-blur-xl
              shadow-[0_25px_80px_rgba(0,0,0,.25)]
            `}
          >
            {/* HEADER */}
            <div
              className="
                flex
                items-center
                gap-4
                px-6
                py-5

                border-b
                border-slate-200
                dark:border-slate-800
              "
            >
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                }}
                className="
                  w-14
                  h-14
                  rounded-2xl

                  bg-slate-100
                  dark:bg-slate-800

                  flex
                  items-center
                  justify-center
                "
              >
                <GraduationCap
                  size={30}
                  className="text-slate-900 dark:text-white"
                />
              </motion.div>

              <div className="flex-1">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {t.promoLabel}
                </p>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.promoTitle}
                </h3>
              </div>

              <button
                onClick={closePromo}
                className="
                  p-2
                  rounded-xl
                  text-slate-400
                  hover:bg-slate-100
                  hover:text-slate-900
                  dark:hover:bg-slate-800
                  dark:hover:text-white
                  transition
                "
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-5">
              <div className="flex gap-3 mb-4">
                <FileText
                  size={18}
                  className="mt-1 text-slate-500"
                />

                <p className="leading-8 text-sm text-slate-600 dark:text-slate-400">
                  {t.promoDescription}{" "}

                  <strong className="text-slate-900 dark:text-white">
                    {t.proposal}
                  </strong>
                  ,{" "}

                  <strong className="text-slate-900 dark:text-white">
                    {t.skripsi}
                  </strong>
                  ,{" "}

                  <strong className="text-slate-900 dark:text-white">
                    {t.jurnal}
                  </strong>
                  ,{" "}

                  <strong className="text-slate-900 dark:text-white">
                    {t.ppt}
                  </strong>{" "}

                  {t.promoDescriptionEnd}
                </p>
              </div>

              <Link
                to="/skripsi"
                className="
                  group
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  w-full
                  rounded-2xl
                  bg-slate-900
                  dark:bg-white
                  py-3.5
                  text-white
                  dark:text-slate-900
                  font-semibold
                  hover:-translate-y-0.5
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
              >
                {t.promoButton}

                <ArrowRight
                  size={18}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full overflow-x-hidden">
        {children}
      </main>

      <Footer />

      {/* Scroll To Top */}
      <button
        onClick={scrollToTop}
        className={`
          fixed
          bottom-5
          right-5
          z-40
          p-3
          rounded-full
          bg-black
          text-white
          dark:bg-white
          dark:text-black
          shadow-lg
          transition-all
          duration-300
          hover:scale-110
          ${
            showButton
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }
        `}
      >
        <ChevronUp size={22} />
      </button>
    </div>
  );
}

export default Layout;