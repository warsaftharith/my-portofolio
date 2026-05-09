import heroImg from "../assets/profile.jpeg";
import { motion, type Variants } from "framer-motion";
import { useLang } from "../context/LangContext";
import { useEffect, useState } from "react";
import { en } from "../lang/en";
import { id } from "../lang/id";
import { jp } from "../lang/jp";
import { ar } from "../lang/ar";
import { sas } from "../lang/sas";

    const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
        },
    },
    };

    const stagger: Variants = {
    hidden: {},
    show: {
        transition: {
        staggerChildren: 0.15,
        },
    },
    };

    const Hero = () => {
    const { lang } = useLang();
    const translations = {
        en: en.hero,
        id: id.hero,
        jp: jp.hero,
        ar: ar.hero,
        sas: sas.hero,
    };

    const t = translations[lang as keyof typeof translations];
    const fullText = t.subtitle;

    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && index < fullText.length) {
            timeout = setTimeout(() => {
            setIndex((i) => i + 1);
            setText(fullText.slice(0, index + 1)); 
            }, 60);
        } else if (deleting && index > 0) {
            timeout = setTimeout(() => {
            setIndex((i) => i - 1);
            setText(fullText.slice(0, index - 1));
            }, 40);
        } else if (!deleting && index === fullText.length) {
            timeout = setTimeout(() => setDeleting(true), 1500);
        } else if (deleting && index === 0) {
            setDeleting(false);
        }

        return () => clearTimeout(timeout);
    }, [index, deleting, fullText]);

    return (
        <section
        id="hero"
        className="min-h-screen flex items-center pt-28 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 bg-white dark:bg-slate-950 transition-colors duration-300"
        >
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center">

            {/* HERO CONTENT */}
            <motion.div
            className="lg:col-span-7 space-y-6 sm:space-y-8 order-2 lg:order-1"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            >

            {/* BADGE */}
            <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm"
            >
                <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                </span>

                <span className="font-medium text-slate-600 dark:text-emerald-400">
                {t.available}
                </span>
            </motion.div>

            {/* TITLE */}
            <motion.div variants={fadeUp} className="space-y-3 sm:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {t.title}{" "}
                <span className="text-emerald-600 dark:text-emerald-400">
                    Wahyu
                </span>
                </h1>

                <p className="text-xl sm:text-2xl md:text-2.5xl lg:text-3xl font-light text-slate-600 dark:text-slate-400 leading-relaxed">
                    {text}
                    <span className="animate-pulse">|</span>
                </p>
            </motion.div>

            {/* DESCRIPTION */}
            <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-500 max-w-sm sm:max-w-md lg:max-w-xl leading-relaxed"
            >
                {t.desc}
            </motion.p>

            {/* BUTTONS */}
            <motion.div
                variants={fadeUp}
                className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-2"
            >
                <motion.a
                    href="#contact"
                    className="px-6 sm:px-8 py-3.5 sm:py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold rounded-xl text-sm sm:text-base w-full sm:w-auto text-center sm:text-left"
                    animate={{ x: [0, 6, 0] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    whileHover={{ scale: 1.05 }}
                    >
                    {t.contact}
                </motion.a>

                <a
                    href="/cv/cv-wahyu.pdf"
                    download
                    className="px-6 sm:px-8 py-3.5 sm:py-4 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl hover:scale-105 transition-all duration-300 text-sm sm:text-base w-full sm:w-auto text-center sm:text-left"
                    >
                    {t.cv}
                </a>
            </motion.div>
            </motion.div>

            {/* IMAGE */}
            <motion.div
                className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2 w-full"
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.9,
                    ease: [0.25, 0.1, 0.25, 1],
                }}
                viewport={{ once: true, amount: 0.3 }}
                >
                <div className="w-full flex justify-center lg:justify-end">

                    {/* OUTER BORDER */}
                    <div className="
                    relative 
                    w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96
                    aspect-square
                    rounded-full
                    p-2 sm:p-3
                    border border-slate-200 dark:border-slate-800
                    bg-white/60 dark:bg-slate-900/60
                    backdrop-blur
                    shadow-lg
                    ">

                    {/* IMAGE WRAPPER */}
                    <div className="w-full h-full rounded-full overflow-hidden">

                        <img
                        src={heroImg}
                        alt="Wahyu"
                        className="
                            w-full h-full
                            object-cover object-center
                            grayscale hover:grayscale-0
                            transition-all duration-700
                            scale-105 hover:scale-110
                        "
                        />

                    </div>

                    </div>

                </div>
            </motion.div>

        </div>
        </section>
    );
};

export default Hero;