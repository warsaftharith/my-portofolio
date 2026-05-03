import { motion } from "framer-motion";
import { useLang } from "../context/LangContext";
import { en } from "../lang/en";
import { id } from "../lang/id";

const About = () => {
  const { lang } = useLang();
  const t = lang === "en" ? en.about : id.about;

  const skillColors = [
    "from-emerald-400 to-emerald-600",
    "from-blue-400 to-blue-600",
    "from-purple-400 to-purple-600",
    "from-pink-400 to-pink-600",
  ];

  return (
    <section
      id="about"
      className="py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors"
    >
        <div className="flex justify-center mb-10 sm:mb-12">
            <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto">

            {/* HEADER */}
            <motion.div
            className="text-center mb-14 sm:mb-16 lg:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 dark:from-white to-slate-600 dark:to-slate-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                {t.title}
            </h2>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {t.subtitle}
            </p>
            </motion.div>

            {/* GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* LEFT */}
            <motion.div
                className="space-y-6 sm:space-y-8"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <p
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.description1 }}
                />

                <p
                className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: t.description2 }}
                />

                {/* INFO GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-200 dark:border-slate-800">

                <div>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t.email}
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-1 text-sm sm:text-base break-all">
                    warsabusiness@email.com
                    </p>
                </div>

                <div>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t.location}
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-1 text-sm sm:text-base">
                    {t.locationValue}
                    </p>
                </div>

                <div>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t.experience}
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-1 text-sm sm:text-base">
                    {t.experienceValue}
                    </p>
                </div>

                <div>
                    <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                    {t.language}
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white mt-1 text-sm sm:text-base">
                    {t.languageValue}
                    </p>
                </div>

                </div>
            </motion.div>

            {/* RIGHT */}
            <motion.div
                className="space-y-5 sm:space-y-6"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {t.skillsTitle}
                </h3>

                <div className="space-y-4 sm:space-y-5">

                {t.skillItems.map((skill, index) => (
                    <div key={index}>

                    <div className="flex justify-between mb-2">
                        <span className="font-medium text-slate-900 dark:text-slate-200 text-sm sm:text-base">
                        {skill.name}
                        </span>
                        <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                        {skill.width}
                        </span>
                    </div>

                    <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2.5 sm:h-3 overflow-hidden">
                        <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.width }}
                        transition={{ duration: 1.2 }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full bg-gradient-to-r ${
                            skillColors[index % skillColors.length]
                        }`}
                        />
                    </div>

                    </div>
                ))}

                </div>
            </motion.div>

            </div>
        </div>
    </section>
  );
};

export default About;