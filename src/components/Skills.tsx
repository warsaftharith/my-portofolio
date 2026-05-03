import {
  SiHtml5,
  SiJavascript,
  SiReact,
  SiLaravel,
  SiTailwindcss,
  SiTypescript,
  SiPhp,
  SiMysql,
  SiGit,
} from "react-icons/si";
import { FaCss3Alt } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";
import { useLang } from "../context/LangContext";
import { en } from "../lang/en";
import { id } from "../lang/id";
import { jp } from "../lang/jp";

const skillIcons: Record<string, React.ReactNode> = {
  HTML5: <SiHtml5 />,
  CSS3: <FaCss3Alt />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  React: <SiReact />,
  Laravel: <SiLaravel />,
  Tailwind: <SiTailwindcss />,
  PHP: <SiPhp />,
  MySQL: <SiMysql />,
  Git: <SiGit />,
};

const skillColors: Record<string, string> = {
  HTML5: "from-orange-500 to-orange-600",
  CSS3: "from-blue-500 to-blue-600",
  JavaScript: "from-yellow-400 to-yellow-500",
  TypeScript: "from-blue-600 to-blue-700",
  React: "from-cyan-400 to-cyan-500",
  Laravel: "from-red-500 to-red-600",
  Tailwind: "from-teal-400 to-teal-500",
  PHP: "from-indigo-500 to-indigo-600",
  MySQL: "from-blue-700 to-blue-800",
  Git: "from-orange-600 to-orange-700",
};

// ===== ANIMATION =====
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const card: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
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

const Skills = () => {
  const { lang } = useLang();
  const translations = {
    en: en.skills,
    id: id.skills,
    jp: jp.skills,
  };

  const t = translations[lang as keyof typeof translations];

  return (
    <section
      id="skills"
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
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
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
                grid-cols-2 
                sm:grid-cols-3 
                md:grid-cols-4 
                lg:grid-cols-5 
                xl:grid-cols-6 
                gap-4 sm:gap-6
            "
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            >
            {t.items.map((skill, index) => (
                <motion.div key={index} variants={card}>
                <div
                    className="
                    group
                    h-full
                    p-4 sm:p-5
                    rounded-2xl
                    bg-white dark:bg-slate-900
                    border border-slate-200 dark:border-slate-800
                    hover:shadow-xl
                    hover:-translate-y-2
                    transition-all duration-300
                    "
                >
                    {/* ICON */}
                    <div
                    className={`
                        w-14 h-14 sm:w-16 sm:h-16
                        flex items-center justify-center
                        rounded-2xl
                        bg-gradient-to-br ${skillColors[skill.name]}
                        text-white text-2xl sm:text-3xl
                        mb-4
                        group-hover:scale-110
                        transition-transform duration-300
                        shadow-md
                    `}
                    >
                    {skillIcons[skill.name]}
                    </div>

                    {/* TITLE */}
                    <h4 className="font-semibold text-base sm:text-lg mb-1 text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {skill.name}
                    </h4>

                    {/* DESC */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {skill.desc}
                    </p>
                </div>
                </motion.div>
            ))}
            </motion.div>

        </div>
    </section>
  );
};

export default Skills;