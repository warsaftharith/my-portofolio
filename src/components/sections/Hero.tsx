import heroImg from "../../assets/profile.jpeg";
import { motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "../../context/LangContext";
import { Link } from "react-router-dom";
import {
  HiOutlineCode,
  HiOutlineBriefcase,
  HiOutlineSparkles,
  HiOutlineAcademicCap,
  HiOutlineDownload,
  HiOutlineMail,
  HiArrowRight,
} from "react-icons/hi";

import { en } from "../../lang/en";
import { id } from "../../lang/id";
import { jp } from "../../lang/jp";
import { ar } from "../../lang/ar";
import { sas } from "../../lang/sas";

const MotionLink = motion.create(Link);

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

function useWebsiteAge(startDate: string) {
  const calculateAge = () => {
    const start = new Date(startDate).getTime();
    const now = Date.now();

    const difference = Math.max(0, now - start);

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  };

  const [age, setAge] = useState(calculateAge);

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge());
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate]);

  return age;
}

const Hero = () => {
  const { lang } = useLang();
  const websiteAge = useWebsiteAge("2020-08-14T00:00:00+07:00");
  const pad = (value: number) => String(value).padStart(2, "0");
  const t = useMemo(() => {
    return localeText[lang as keyof typeof localeText] ?? localeText.en;
  }, [lang]);

  const typedText = useTypingEffect(t.subtitle);

const statIcons = [
  <HiOutlineAcademicCap key="education" />,
  <HiOutlineBriefcase key="briefcase" />,
  <HiOutlineCode key="code" />,
  <HiOutlineSparkles key="sparkles" />,
];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-20 px-4 sm:px-6 lg:px-12 xl:px-16 bg-white dark:bg-slate-950 transition-colors duration-300"
    >
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-20 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          className="lg:col-span-7 space-y-7 order-2 lg:order-1"
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* AVAILABLE */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full rounded-full bg-slate-400 opacity-75 animate-ping dark:bg-slate-500" />
              <span className="relative h-2 w-2 rounded-full bg-slate-700 dark:bg-white" />
            </span>

            <span className="font-medium text-slate-600 dark:text-slate-300">
              {t.available}
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.div variants={fadeUp} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              {t.title}{" "}
              <span className="text-slate-800 dark:text-slate-100">
                Wahyu
              </span>
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl font-light text-slate-600 dark:text-slate-400 leading-relaxed min-h-[42px]">
              {typedText}
              <span className="animate-pulse">|</span>
            </p>
          </motion.div>

          {/* DESCRIPTION */}
          <motion.p
            variants={fadeUp}
            className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-500 max-w-xl leading-relaxed"
          >
            {t.desc}
          </motion.p>

          {/* BUTTON */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2"
          >
            {/* CONTACT */}
            <motion.a
              href="#contact"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-7
                py-4
                bg-slate-900
                dark:bg-white
                text-white
                dark:text-slate-900
                font-medium
                rounded-full
                text-sm
                sm:text-base
                text-center
                hover:bg-slate-800
                dark:hover:bg-slate-100
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
              whileTap={{ scale: 0.97 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
            >
              {t.contact}
              <HiOutlineMail className="text-lg" />
            </motion.a>

            {/* PRICELIST */}
            <MotionLink
              to="/pricelist"
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-2
                px-7 py-4
                bg-slate-100
                dark:bg-slate-900
                text-slate-900
                dark:text-white
                border
                border-slate-200
                dark:border-slate-800
                font-medium
                rounded-full
                text-sm sm:text-base
                text-center
                hover:bg-slate-200
                dark:hover:bg-slate-800
                hover:-translate-y-0.5
                hover:shadow-sm
                transition-all
                duration-300
              "
              whileTap={{ scale: 0.97 }}
              whileHover={{ y: -2 }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
            >
              {t.pricelist}

              <HiArrowRight
                className="
                  text-slate-500
                  dark:text-slate-300
                  text-lg
                  transition-transform
                  duration-300
                  group-hover:translate-x-1.5
                "
              />
            </MotionLink>

            {/* CV */}
            <a
              href="/cv/cv-wahyu.pdf"
              download
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-7
                py-4
                bg-transparent
                border
                border-slate-300
                dark:border-slate-700
                text-slate-700
                dark:text-slate-300
                font-medium
                rounded-full
                text-sm
                sm:text-base
                text-center
                hover:bg-slate-100
                dark:hover:bg-slate-900
                hover:border-slate-400
                dark:hover:border-slate-600
                hover:-translate-y-0.5
                transition-all
                duration-300
              "
            >
              {t.cv}
              <HiOutlineDownload className="text-lg" />
            </a>
          </motion.div>

          {/* WEBSITE BANNER */}
          <motion.div
            variants={fadeUp}
            className="
              mt-6
              inline-flex
              flex-wrap
              items-center
              gap-x-4
              gap-y-2
              rounded-2xl
              border
              border-slate-200
              dark:border-slate-800
              bg-slate-50/80
              dark:bg-slate-900/80
              backdrop-blur
              px-5
              py-4
              shadow-sm
            "
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-slate-400 dark:bg-slate-500 animate-ping opacity-75" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-slate-700 dark:bg-white" />
              </span>

              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {t.onlineFor}
              </span>
            </div>

            <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 hidden sm:block" />

            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-slate-900 dark:text-white tabular-nums">
                {websiteAge.days}
              </span>

              <span className="text-sm text-slate-500 dark:text-slate-400">
                {t.days}
              </span>
            </div>

            <span className="text-slate-300 dark:text-slate-700">•</span>

            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
              {pad(websiteAge.hours)} {t.hours}
            </span>

            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
              {pad(websiteAge.minutes)} {t.minutes}
            </span>

            <span className="text-sm font-semibold text-slate-900 dark:text-white tabular-nums">
              {pad(websiteAge.seconds)} {t.seconds}
            </span>
          </motion.div>

          {/* STATS */}
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
          >
            {t.stats.map((item, index) => (
              <div
                key={item.title}
                className="
                  group
                  rounded-2xl
                  border border-slate-200 dark:border-slate-800
                  bg-white/70 dark:bg-slate-900/70
                  backdrop-blur
                  p-4 sm:p-5
                  shadow-sm
                  hover:shadow-lg
                  hover:-translate-y-1
                  transition-all duration-300
                "
              >
                <div
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-emerald-100 dark:bg-emerald-900/30
                    flex items-center justify-center
                    text-emerald-500
                    text-xl
                    mb-4
                  "
                >
                  {statIcons[index]}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </h3>

                <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {item.title}
                </p>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {item.subtitle}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
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