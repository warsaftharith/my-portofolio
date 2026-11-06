import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MotionValue } from "framer-motion";
import { Home, UserRound, Code2, FolderKanban, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useLang } from "../../context/LangContext";
import { en } from "../../lang/en";
import { id } from "../../lang/id";
import { jp } from "../../lang/jp";
import { ar } from "../../lang/ar";
import { sas } from "../../lang/sas";
import { useNavigationAppearance } from "../../context/NavigationAppearanceContext";
import type { NavConfig } from "../../context/NavigationAppearanceContext";
import "../../styles/warsa-navigation.css";

const LINKS = [
  { section: "hero", key: "home", icon: Home },
  { section: "about", key: "about", icon: UserRound },
  { section: "skills", key: "skills", icon: Code2 },
  { section: "projects", key: "projects", icon: FolderKanban },
  { section: "contact", key: "contact", icon: Mail },
] as const;
const translations = { en: en.navbar, id: id.navbar, jp: jp.navbar, ar: ar.navbar, sas: sas.navbar };
const MOBILE_QUERY = "(max-width: 767px)";

function useMobileViewport() {
  const [mobile, setMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches);
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const update = () => setMobile(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return mobile;
}

function DockItem({
  link, label, selected, config, pointer, vertical, reduce, onSelect,
}: {
  link: typeof LINKS[number];
  label: string;
  selected: boolean;
  config: NavConfig;
  pointer: MotionValue<number>;
  vertical: boolean;
  reduce: boolean;
  onSelect: (section: string) => void;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const scaleValue = useTransform(pointer, (point) => {
    if (!button.current || !config.magnify || reduce || !config.animate) return 1;
    const center = vertical
      ? button.current.offsetTop + button.current.offsetHeight / 2
      : button.current.offsetLeft + button.current.offsetWidth / 2;
    const distance = point - center;
    return 1 + 0.31 * Math.exp(-(distance * distance) / (2 * 62 * 62));
  });
  const raiseValue = useTransform(scaleValue, (scale) => (scale - 1) * -15);
  const scale = useSpring(scaleValue, { stiffness: 390, damping: 26, mass: 0.35 });
  const lift = useSpring(raiseValue, { stiffness: 390, damping: 26, mass: 0.35 });
  const Icon = link.icon;
  return (
    <button
      type="button"
      ref={button}
      className={`wa-dock-item${selected ? " is-active" : ""}`}
      aria-label={label}
      aria-current={selected ? "location" : undefined}
      title={label}
      onClick={() => onSelect(link.section)}
    >
      {selected && (
        <motion.span
          layoutId="wa-dock-active-indicator"
          className="wa-dock-indicator"
          transition={config.animate && !reduce ? { type: "spring", stiffness: 470, damping: 35 } : { duration: 0 }}
          aria-hidden="true"
        />
      )}
      <motion.span className="wa-dock-icon" style={{ scale, y: vertical ? 0 : lift, x: vertical ? lift : 0 }}>
        <Icon size={23} strokeWidth={1.9} aria-hidden="true" />
      </motion.span>
      {config.labels && <span className="wa-dock-label">{label}</span>}
    </button>
  );
}

function CustomDock({ config, mobile }: { config: NavConfig; mobile: boolean }) {
  const { lang } = useLang();
  const location = useLocation();
  const reduce = Boolean(useReducedMotion());
  const navRef = useRef<HTMLElement>(null);
  const pointer = useMotionValue(-9999);
  const [active, setActive] = useState("hero");
  const [dockHidden, setDockHidden] = useState(false);
  const vertical = config.position !== "bottom";
  const dockVariables = {
    '--wa-custom-gap': `${config.spacing}px`,
    '--wa-custom-item-width': `${Math.round(({ compact: 48, normal: 60, large: 74 }[config.size]) * config.width / 100)}px`,
    '--wa-custom-item-height': `${Math.round(({ compact: 51, normal: 57, large: 70 }[config.size]) * config.height / 100)}px`,
    '--wa-custom-label-size': `${config.labelSize}px`,
    '--wa-custom-opacity': config.transparency / 100,
    '--wa-custom-blur': `${config.blur}px`,
  } as CSSProperties;
  const t = translations[lang];

  useEffect(() => {
    let frame = 0;
    const inspect = () => {
      frame = 0;
      const threshold = window.innerHeight * .42;
      let current = "hero";
      for (const item of LINKS) {
        const el = document.getElementById(item.section);
        if (el && el.getBoundingClientRect().top <= threshold) current = item.section;
      }
      setActive(previous => previous === current ? previous : current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(inspect); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    inspect();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  // Auto-hide is opt-in per device, enabled by default for custom docks.
  // Track the previous scroll offset in an RAF to avoid extra work per event.
  useEffect(() => {
    if (!config.autoHide) {
      setDockHidden(false);
      return;
    }
    let lastY = window.scrollY;
    let frame = 0;
    const inspectDirection = () => {
      frame = 0;
      const nextY = window.scrollY;
      const delta = nextY - lastY;
      lastY = nextY;
      const nearTop = nextY < 120;
      const nearBottom = nextY + window.innerHeight >= document.documentElement.scrollHeight - 48;
      if (nearTop || nearBottom) {
        setDockHidden(false);
      } else if (delta > 4) {
        setDockHidden(true);
      } else if (delta < -4) {
        setDockHidden(false);
      }
    };
    const onScrollDirection = () => {
      if (!frame) frame = window.requestAnimationFrame(inspectDirection);
    };
    window.addEventListener("scroll", onScrollDirection, { passive: true });
    window.addEventListener("resize", onScrollDirection);
    return () => {
      window.removeEventListener("scroll", onScrollDirection);
      window.removeEventListener("resize", onScrollDirection);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [config.autoHide, location.pathname]);

  // Remove hidden dock buttons from keyboard navigation while concealed.
  useEffect(() => {
    if (navRef.current) navRef.current.inert = dockHidden;
  }, [dockHidden]);

  const select = (section: string) => {
    setActive(section);
    const element = document.getElementById(section);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.scrollY - (mobile ? 24 : 76);
    window.scrollTo({ top: Math.max(0, top), behavior: reduce || !config.animate ? "auto" : "smooth" });
  };
  return (
    <motion.nav
      ref={navRef}
      style={{ ...dockVariables, pointerEvents: dockHidden ? "none" : "auto" }}
      className={`wa-floating-dock wa-style-${config.style} wa-pos-${config.position} wa-size-${config.size}${config.labels ? " wa-has-labels" : ""}${mobile ? " wa-mobile" : ""}`}
      aria-label={lang === "id" ? "Navigasi dock portfolio" : "Portfolio dock navigation"}
      data-position={config.position}
      aria-hidden={dockHidden}
      initial={config.animate && !reduce ? { opacity: 0, y: config.position === "bottom" ? 15 : 0, scale: .96 } : false}
      animate={{
        opacity: dockHidden ? 0 : 1,
        y: dockHidden && !vertical ? 120 : 0,
        x: dockHidden && vertical ? (config.position === "left" ? -130 : 130) : 0,
        scale: dockHidden ? 0.98 : 1,
      }}
      transition={config.animate && !reduce
        ? { type: "spring", stiffness: 330, damping: 30 }
        : { duration: 0 }}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointer.set(vertical ? event.clientY - rect.top : event.clientX - rect.left);
      }}
      onPointerLeave={() => pointer.set(-9999)}
    >
      {LINKS.map((link) => (
        <DockItem key={link.section} link={link} label={t[link.key]} selected={active === link.section}
          pointer={pointer} vertical={vertical} reduce={reduce} config={config} onSelect={select} />
      ))}
    </motion.nav>
  );
}

/** Factory navbar is imported unchanged; alternative docks are separate components. */
export default function AdaptiveNavigation() {
  const { navigation } = useNavigationAppearance();
  const mobile = useMobileViewport();
  const chosen = mobile ? navigation.mobile : navigation.desktop;
  return chosen.style === "original" ? <Navbar /> : <CustomDock config={chosen} mobile={mobile} />;
}
