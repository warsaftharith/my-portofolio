import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Check, Menu, X } from "lucide-react";
import { en } from "../lang/en";
import { id } from "../lang/id";
import { jp } from "../lang/jp";
import { ar } from "../lang/ar";
import { useLang } from "../context/LangContext";
import logo from "@/assets/profile.jpeg";

type MenuKey = "home" | "about" | "skills" | "projects" | "contact";

const Navbar = () => {
    const { lang, setLang } = useLang();

    const [activeSection, setActiveSection] = useState("hero");
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });
    const [openLang, setOpenLang] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const isClicking = useRef(false);

    const menuItems: { id: string; key: MenuKey }[] = [
        { id: "hero", key: "home" },
        { id: "about", key: "about" },
        { id: "skills", key: "skills" },
        { id: "projects", key: "projects" },
        { id: "contact", key: "contact" },
    ];

    const translations = {
        en: en.navbar,
        id: id.navbar,
        jp: jp.navbar,
        ar: ar.navbar,
    };

    const t = translations[lang];

    const moveIndicator = (id: string) => {
        const el = itemRefs.current[id];
        if (!el) return;

        setIndicator({
            left: el.offsetLeft,
            width: el.offsetWidth,
        });
    };

    // CLOSE DROPDOWN OUTSIDE CLICK
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (!target.closest(".lang-dropdown")) {
                setOpenLang(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, []);

    // SCROLL ACTIVE SECTION
    useEffect(() => {
        const handleScroll = () => {
            if (isClicking.current) return;

            const scrollY = window.scrollY + 120;

            if (scrollY < 300) {
                setActiveSection("hero");
                moveIndicator("hero");
                return;
            }

            for (const item of menuItems.slice(1)) {
                const el = document.getElementById(item.id);
                if (!el) continue;

                const top = el.offsetTop;
                const bottom = top + el.offsetHeight;

                if (scrollY >= top && scrollY < bottom) {
                    setActiveSection(item.id);
                    moveIndicator(item.id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // ===== CLICK SCROLL
    const scrollToSection = (id: string) => {
        isClicking.current = true;

        setActiveSection(id);
        moveIndicator(id);
        setIsMobileMenuOpen(false);
        setTimeout(() => {
            const el = document.getElementById(id);

            if (!el) return;

            const offset = 90; // tinggi navbar

            const top =
                el.getBoundingClientRect().top +
                window.scrollY -
                offset;

            window.scrollTo({
                top,
                behavior: "smooth",
            });

            setTimeout(() => {
                isClicking.current = false;
            }, 700);
        }, 100);
    };

    useEffect(() => {
        requestAnimationFrame(() => {
            moveIndicator(activeSection);
        });
    }, [lang]);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-white/80 to-white/0 dark:from-slate-950/80 dark:to-slate-950/0 backdrop-blur">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <img
                        src={logo}
                        alt="logo"
                        className="w-8 h-8 object-cover rounded-full"
                    />
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                        Warsa
                    </h1>
                </div>

                {/* DESKTOP MENU */}
                <ul className="hidden md:flex relative gap-8 text-sm font-medium items-center">
                    {/* INDICATOR */}
                    <motion.span
                        layoutId="nav-indicator"
                        className="absolute -bottom-2 h-[3px] bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full"
                        style={{
                            left: indicator.left,
                            width: indicator.width,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                        }}
                    />

                    {/* MENU */}
                    {menuItems.map((item) => (
                        <li key={item.id}>
                            <button
                                ref={(el) => {
                                    itemRefs.current[item.id] = el;
                                }}
                                onClick={() => scrollToSection(item.id)}
                                onMouseEnter={() => moveIndicator(item.id)}
                                onMouseLeave={() => moveIndicator(activeSection)}
                                className={`px-2 py-2 transition-colors duration-300 relative group ${
                                    activeSection === item.id
                                        ? "text-emerald-600 dark:text-emerald-400"
                                        : "text-slate-600 dark:text-slate-300 hover:text-emerald-500"
                                }`}
                            >
                                {t[item.key]}
                                {/* Hover underline effect */}
                                <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-emerald-500 group-hover:w-full transition-all duration-300" />
                            </button>
                        </li>
                    ))}

                    {/* LANGUAGE DROPDOWN */}
                    <li className="relative lang-dropdown">
                        <button
                            onClick={() => setOpenLang(!openLang)}
                            className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 transition-all duration-200"
                        >
                            <Globe size={16} />
                            <span className="font-medium">{lang.toUpperCase()}</span>
                        </button>

                        <AnimatePresence>
                            {openLang && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-40 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden z-50"
                                >
                                    {[
                                        { code: "en", label: "English" },
                                        { code: "id", label: "Indonesia" },
                                        { code: "jp", label: "日本語" },
                                        { code: "ar", label: "العربية" }
                                    ].map((item) => (
                                        <button
                                            key={item.code}
                                            type="button"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setLang(item.code as "en" | "id" | "jp" | "ar");
                                                setOpenLang(false);
                                            }}
                                            className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                                                lang === item.code
                                                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                                                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                                            }`}
                                        >
                                            {item.label}
                                            {lang === item.code && <Check size={16} />}
                                        </button>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </li>
                </ul>

                {/* MOBILE HAMBURGER BUTTON */}
                <button
                    className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <motion.div
                        animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isMobileMenuOpen ? (
                            <X size={24} />
                        ) : (
                            <Menu size={24} />
                        )}
                    </motion.div>
                </button>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur border-t border-slate-200 dark:border-slate-800 overflow-hidden"
                    >
                        <div className="max-w-6xl mx-auto px-6 py-6">
                            <ul className="flex flex-col gap-4 text-base font-medium">
                                {menuItems.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => scrollToSection(item.id)}
                                            className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                                                activeSection === item.id
                                                    ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-semibold shadow-sm"
                                                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-emerald-500"
                                            }`}
                                        >
                                            {t[item.key]}
                                        </button>
                                    </li>
                                ))}

                                {/* MOBILE LANGUAGE DROPDOWN */}
                                <li className="lang-dropdown pt-2">
                                    <button
                                        onClick={() => setOpenLang(!openLang)}
                                        className="w-full px-4 py-3 text-left border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 transition-all duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Globe size={20} />
                                            <span className="font-medium">{lang.toUpperCase()}</span>
                                        </div>
                                        <span>▼</span>
                                    </button>

                                    <AnimatePresence>
                                        {openLang && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden"
                                            >
                                                {[
                                                    { code: "en", label: "English" },
                                                    { code: "id", label: "Indonesia" },
                                                    { code: "jp", label: "日本語" },
                                                    { code: "ar", label: "العربية" }
                                                ].map((item) => (
                                                    <button
                                                        key={item.code}
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setLang(item.code as "en" | "id" | "jp" | "ar");
                                                            setOpenLang(false);
                                                        }}
                                                        className={`w-full flex items-center justify-between px-4 py-3 text-sm transition-colors ${
                                                            lang === item.code
                                                                ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400"
                                                                : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700"
                                                        }`}
                                                    >
                                                        {item.label}
                                                        {lang === item.code && <Check size={16} />}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;