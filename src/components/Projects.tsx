import { motion, type Variants } from "framer-motion";
import { useLang } from "../context/LangContext";
import { en } from "../lang/en";
import { id } from "../lang/id";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

const Projects = () => {
  const { lang } = useLang();
  const t = lang === "en" ? en.projects : id.projects;

  return (
    <section
      id="projects"
      className="py-24 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors"
    >
        <div className="flex justify-center mb-10 sm:mb-12">
            <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto">

            {/* HEADER */}
            <motion.div
            className="text-center mb-14 sm:mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, amount: 0.3 }}
            >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-900 dark:from-white to-slate-600 dark:to-slate-400 bg-clip-text text-transparent mb-4 sm:mb-6">
                {t.title}
            </h2>

            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {t.subtitle}
            </p>
            </motion.div>

            {/* GRID */}
            <motion.div
            className="
                grid 
                grid-cols-1 
                md:grid-cols-2 
                xl:grid-cols-3 
                gap-6 sm:gap-8
            "
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            >
            {t.items.map((project, index) => (
                <motion.div
                key={index}
                variants={card}
                className={`group ${index === 1 ? "md:row-span-2" : ""}`}
                >
                <div
                    className="
                    h-full
                    flex flex-col
                    overflow-hidden
                    rounded-2xl sm:rounded-3xl
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800
                    shadow-lg hover:shadow-2xl
                    transition-all duration-500
                    group-hover:-translate-y-3
                    "
                >

                    {/* IMAGE */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="
                        w-full h-full object-cover
                        group-hover:scale-110
                        transition-transform duration-700
                        "
                    />

                    <div className="absolute inset-0 bg-black/20 dark:bg-black/40 group-hover:bg-black/0 transition-all duration-500" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-1">

                    {/* FEATURED BADGE */}
                    {project.featured && (
                        <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-5 w-fit">
                        ⭐ {t.featured}
                        </div>
                    )}

                    {/* TITLE */}
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-emerald-600 transition-colors">
                        {project.title}
                    </h3>

                    {/* DESC */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-5 leading-relaxed">
                        {project.desc}
                    </p>

                    {/* TECH */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((tech, i) => (
                        <span
                            key={i}
                            className="
                            text-xs sm:text-sm
                            bg-slate-100 dark:bg-slate-800
                            text-slate-700 dark:text-slate-200
                            px-3 py-1 rounded-full
                            "
                        >
                            {tech}
                        </span>
                        ))}
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-auto flex gap-3 sm:gap-4">
                        <a
                        href="#"
                        className="
                            flex-1 text-center
                            px-4 py-2 sm:py-3
                            bg-emerald-500 hover:bg-emerald-600
                            text-white
                            rounded-lg
                            font-medium
                            transition
                            hover:scale-[1.02]
                            active:scale-95
                        "
                        >
                        {t.liveDemo}
                        </a>

                        <a
                        href="#"
                        className="
                            px-4 py-2 sm:py-3
                            border border-slate-300 dark:border-slate-700
                            text-slate-800 dark:text-slate-200
                            rounded-lg
                            hover:bg-slate-100 dark:hover:bg-slate-800
                            transition
                        "
                        >
                        {t.github}
                        </a>
                    </div>

                    </div>
                </div>
                </motion.div>
            ))}
            </motion.div>

        </div>
    </section>
  );
};

export default Projects;