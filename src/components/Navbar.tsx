import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Check, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { en } from "../lang/en";
import { id } from "../lang/id";
import { jp } from "../lang/jp";
import { ar } from "../lang/ar";
import { sas } from "../lang/sas";
import { useLang } from "../context/LangContext";
import logo from "@/assets/profile.jpeg";

type MenuKey = "home" | "about" | "skills" | "projects" | "contact";

const Navbar = () => {
    const { lang, setLang } = useLang();
    const [activeSection, setActiveSection] = useState("hero");
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });
    const [openLang, setOpenLang] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const isClicking = useRef(false);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

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
        sas: sas.navbar,
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

    // CLOSE DROPDOWN & MOBILE MENU OUTSIDE CLICK
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Close language dropdown
            if (!target.closest(".lang-dropdown")) {
                setOpenLang(false);
            }

            // Close mobile menu
            if (
                isMobileMenuOpen &&
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(target) &&
                !target.closest(".mobile-menu-toggle")
            ) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener("click", handleClickOutside);
        return () => window.removeEventListener("click", handleClickOutside);
    }, [isMobileMenuOpen]);

    // ESCAPE KEY TO CLOSE MOBILE MENU
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMobileMenuOpen(false);
                setOpenLang(false);
            }
        };

        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
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

    // CLICK SCROLL
    const scrollToSection = (id: string) => {
        isClicking.current = true;

        setActiveSection(id);
        moveIndicator(id);
        setIsMobileMenuOpen(false);
        setOpenLang(false);
        
        setTimeout(() => {
            const el = document.getElementById(id);

            if (!el) return;

            const offset = 90;

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
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-white/80 to-white/0 dark:from-slate-950/80 dark:to-slate-950/0 backdrop-blur">
                <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-3 flex justify-between items-center">
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
                                            { code: "ar", label: "العربية" },
                                            { code: "sas", label: "Sasak" }
                                        ].map((item) => (
                                            <button
                                                key={item.code}
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setLang(item.code as "en" | "id" | "jp" | "ar" | "sas");
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

                        {/* THEME TOGGLE */}
                        <li>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 transition-all duration-200"
                            >
                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                            </button>
                        </li>
                    </ul>

                    {/* MOBILE HAMBURGER BUTTON */}
                    <button
                        className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all duration-200 mobile-menu-toggle"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMobileMenuOpen(!isMobileMenuOpen);
                        }}
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
            </nav>

            {/* MOBILE SIDEBAR MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* OVERLAY */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        
                        {/* COMPACT SIDEBAR */}
                        <motion.div
                            ref={mobileMenuRef}
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 30,
                            }}
                            className="fixed top-0 right-0 h-full w-72 z-50 md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-l border-slate-200 dark:border-slate-800 shadow-2xl"
                        >
                            {/* HEADER - Lebih compact */}
                            <div className="p-4 border-b border-slate-200 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={logo}
                                            alt="logo"
                                            className="w-8 h-8 object-cover rounded-full"
                                        />
                                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                            Warsa
                                        </h2>
                                    </div>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-1.5 -m-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* MENU ITEMS - Lebih compact */}
                            <div className="p-4">
                                <ul className="space-y-2">
                                    {menuItems.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => scrollToSection(item.id)}
                                                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 group ${
                                                    activeSection === item.id
                                                        ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 font-semibold shadow-sm"
                                                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-emerald-500 border border-transparent"
                                                }`}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                <span className="font-medium">{t[item.key]}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                {/* DIVIDER */}
                                <div className="my-4 h-px bg-slate-200 dark:bg-slate-700" />

                                {/* LANGUAGE & THEME - Compact */}
                                <div className="space-y-2">
                                    {/* LANGUAGE */}
                                    <div className="lang-dropdown">
                                        <button
                                            onClick={() => setOpenLang(!openLang)}
                                            className="w-full px-4 py-3 text-left border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between text-sm text-slate-600 dark:text-slate-300 hover:text-emerald-500 hover:border-emerald-500 transition-all duration-200 group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Globe size={16} className="group-hover:scale-110 transition-transform flex-shrink-0" />
                                                <span className="font-medium">{lang.toUpperCase()}</span>
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {openLang && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                                    transition={{ duration: 0.15 }}
                                                    className="mt-2 w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg overflow-hidden"
                                                >
                                                    {[
                                                        { code: "en", label: "English" },
                                                        { code: "id", label: "Indonesia" },
                                                        { code: "jp", label: "日本語" },
                                                        { code: "ar", label: "العربية" },
                                                        { code: "sas", label: "Sasak" }
                                                    ].map((item) => (
                                                        <button
                                                            key={item.code}
                                                            type="button"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setLang(item.code as "en" | "id" | "jp" | "ar" | "sas");
                                                                setOpenLang(false);
                                                            }}
                                                            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all ${
                                                                lang === item.code
                                                                    ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium"
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
                                    </div>

                                    {/* THEME TOGGLE */}
                                    <button
                                        onClick={toggleTheme}
                                        className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-emerald-500 hover:border-emerald-500 transition-all duration-200 group"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/20 transition-all">
                                                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                                            </div>
                                            <span className="font-medium">Theme</span>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;