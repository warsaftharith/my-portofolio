import heroImg from "../../assets/profile.jpeg";
import { motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../context/LangContext";

import { en } from "../../lang/en";
import { id } from "../../lang/id";
import { jp } from "../../lang/jp";
import { ar } from "../../lang/ar";
import { sas } from "../../lang/sas";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const localeText = {
  en: en.hero,
  id: id.hero,
  jp: jp.hero,
  ar: ar.hero,
  sas: sas.hero,
};

function useTypingEffect(value: string) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setText("");
    setIndex(0);
    setIsDeleting(false);
  }, [value]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const typingSpeed = isDeleting ? 35 : 65;

    if (!isDeleting && index < value.length) {
      timeout = setTimeout(() => {
        const nextIndex = index + 1;
        setIndex(nextIndex);
        setText(value.slice(0, nextIndex));
      }, typingSpeed);
    }

    if (isDeleting && index > 0) {
      timeout = setTimeout(() => {
        const nextIndex = index - 1;
        setIndex(nextIndex);
        setText(value.slice(0, nextIndex));
      }, typingSpeed);
    }

    if (!isDeleting && index === value.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1600);
    }

    if (isDeleting && index === 0) {
      timeout = setTimeout(() => setIsDeleting(false), 500);
    }

    return () => clearTimeout(timeout);
  }, [index, isDeleting, value]);

  return text;
}

const Hero = () => {
  const { lang } = useLang();

  const t = useMemo(() => {
    return localeText[lang as keyof typeof localeText] ?? localeText.en;
  }, [lang]);

  const typedText = useTypingEffect(t.subtitle);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">
        <motion.div
          className="lg:col-span-7 space-y-7 order-2 lg:order-1"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            <span className="font-medium text-slate-600 dark:text-emerald-400">
              {t.available}
            </span>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t.title}{" "}
              <span className="text-emerald-600 dark:text-emerald-400">
                Wahyu
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-600 dark:text-slate-400 leading-relaxed min-h-[42px]">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-500 max-w-xl leading-relaxed"
          >
            {t.desc}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2"
          >
            <motion.a
              href="#contact"
              className="px-7 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl text-sm sm:text-base text-center"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              {t.contact}
            </motion.a>

            <a
              href="/cv/cv-wahyu.pdf"
              download
              className="px-7 py-4 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-center"
            >
              {t.cv}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
          initial={{ opacity: 0, x: 45 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="relative w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96 aspect-square rounded-full p-2 sm:p-3 border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/60 backdrop-blur shadow-lg">
            <div className="w-full h-full rounded-full overflow-hidden">
              <img
                src={heroImg}
                alt="Wahyu"
                className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-110"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;