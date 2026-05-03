import { motion, type Variants } from "framer-motion";
import { useLang } from "../context/LangContext";
import { en } from "../lang/en";
import { id } from "../lang/id";
import { jp } from "../lang/jp";

type ExperienceItem = {
  year: string;
  title: string;
  company: string;
  description: string;
  color: string;
};

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const leftItem: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const rightItem: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const Experience = () => {
  const { lang } = useLang();

  const translations = {
    en: en.experience,
    id: id.experience,
    jp: jp.experience,
  };

  const t = translations[lang as keyof typeof translations];
  const data: ExperienceItem[] = t.items;

  return (
    <section
      id="experience"
      className="py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors"
    >
        <div className="flex justify-center mb-10 sm:mb-12">
            <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto">

            {/* HEADER */}
            <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 dark:from-white to-slate-600 dark:to-slate-400 bg-clip-text text-transparent mb-6">
                {t.title}
            </h2>
            </motion.div>

            {/* TIMELINE */}
            <motion.div
            className="max-w-3xl mx-auto space-y-12 relative"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            >

            {/* LINE */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-800" />

            {data.map((item, index) => {
                const isLeft = index % 2 === 0;

                return (
                <motion.div
                    key={index}
                    variants={isLeft ? leftItem : rightItem}
                    className={`relative flex ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                    }`}
                >
                    <div
                    className={`relative w-full md:w-[48%] pl-10 md:pl-0 ${
                        isLeft ? "md:pr-10" : "md:pl-10"
                    }`}
                    >

                    {/* DOT */}
                    <div
                        className={`absolute left-0 md:left-auto md:right-[-10px] top-2 w-4 h-4 rounded-full ${item.color} shadow-lg`}
                    >
                        <div className="w-full h-full animate-ping opacity-40 rounded-full bg-white" />
                    </div>

                    {/* CARD */}
                    <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300">

                        <div className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">
                        {item.year}
                        </div>

                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {item.title}
                        </h3>

                        <p className="text-slate-500 dark:text-slate-400">
                        {item.company}
                        </p>

                        <p className="mt-3 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.description}
                        </p>

                    </div>

                    </div>
                </motion.div>
                );
            })}

            </motion.div>

        </div>
    </section>
  );
};

export default Experience;