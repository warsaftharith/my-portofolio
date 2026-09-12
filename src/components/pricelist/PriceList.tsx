// src/components/pricelist/PriceList.tsx
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useMemo, useState } from "react";
import { useLang } from "../../context/LangContext";
import {
  HiArrowLeft,
  HiUser,
  HiOfficeBuilding,
} from "react-icons/hi";
import { Link } from "react-router-dom";

import { en } from "../../lang/en";
import { id } from "../../lang/id";
import { jp } from "../../lang/jp";
import { ar } from "../../lang/ar";
import { sas } from "../../lang/sas";

import PriceCard from "./PriceCard";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const localeText = {
  en: en.pricelist,
  id: id.pricelist,
  jp: jp.pricelist,
  ar: ar.pricelist,
  sas: sas.pricelist,
};

const PriceList = () => {
  const { lang } = useLang();
  const [plan, setPlan] = useState<"personal" | "business">("personal");
  const t = useMemo(() => {
    return (
      localeText[lang as keyof typeof localeText] ??
      localeText.en
    );
  }, [lang]);

  const items = t.plans[plan];

  return (
  <section
    id="pricelist"
    className="bg-white dark:bg-slate-950 pt-8 pb-24 transition-colors duration-300"
  >
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

      {/* BACK */}
      <motion.div
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.97 }}
        className="mb-12"
      >
        <Link
          to="/"
          className="
            inline-flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-slate-300
            text-slate-600
            hover:bg-slate-100
            hover:text-slate-900
            dark:border-slate-700
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-white
            transition-all
          "
        >
          <HiArrowLeft className="text-lg" />
        </Link>
      </motion.div>

      {/* HEADER */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        <span
          className="
            inline-flex
            items-center
            rounded-full
            border
            border-slate-300
            bg-slate-100
            px-5
            py-2
            text-sm
            font-semibold
            text-slate-700
            dark:border-slate-700
            dark:bg-slate-900
            dark:text-slate-200
            "
        >
          {t.badge}
        </span>

        <h2
          className="
            mt-8
            text-4xl
            font-black
            tracking-tight
            text-slate-900
            dark:text-white
            md:text-6xl
          "
        >
          {t.title}
        </h2>

        <p
          className="
            mt-6
            text-lg
            leading-relaxed
            text-slate-600
            dark:text-slate-400
          "
        >
          {t.subtitle}
        </p>
      </motion.div>

      {/* TAB */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-14 flex justify-center"
      >
        <div
          className="
            inline-flex
            rounded-full
            bg-slate-100
            p-1.5
            dark:bg-slate-900
          "
        >
          <button
            onClick={() => setPlan("personal")}
            className={`
              flex items-center gap-2
              rounded-full
              px-7
              py-2.5
              text-sm
              font-semibold
              transition-all
              ${
                plan === "personal"
                  ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }
            `}
          >
            <HiUser className="text-base" />
            {t.tabs.personal}
          </button>

          <button
            onClick={() => setPlan("business")}
            className={`
              flex items-center gap-2
              rounded-full
              px-7
              py-2.5
              text-sm
              font-semibold
              transition-all
              ${
                plan === "business"
                  ? "bg-slate-900 text-white shadow-lg dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }
            `}
          >
            <HiOfficeBuilding className="text-base" />
            {t.tabs.business}
          </button>
        </div>
      </motion.div>

      {/* CARD */}
      <AnimatePresence mode="wait">
        <motion.div
          key={plan}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -25 }}
          transition={{ duration: 0.35 }}
          className="
            mt-16
            grid
            gap-8
            sm:grid-cols-2
            xl:grid-cols-3
            justify-items-center
          "
        >
          {items.map((item, index) => (
            <PriceCard
              key={item.name}
              item={item}
              index={index}
              buttonText={t.button}
              popularText={t.popular}
              normalPriceText={t.normalPrice}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* NOTE */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="
          mx-auto
          mt-14
          max-w-3xl
          text-center
          text-sm
          leading-relaxed
          text-slate-500
          dark:text-slate-400
        "
      >
        {t.note}
      </motion.div>

    </div>
  </section>
);
};

export default PriceList;