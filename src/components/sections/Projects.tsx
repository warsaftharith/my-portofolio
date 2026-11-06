import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { en } from "../../lang/en";
import { id } from "../../lang/id";
import { jp } from "../../lang/jp";
import { ar } from "../../lang/ar";
import { sas } from "../../lang/sas";
import "../../styles/warsa-project-showcase.css";

const translations = { en: en.projects, id: id.projects, jp: jp.projects, ar: ar.projects, sas: sas.projects };
const support = {
  id: { details: "Lihat detail", close: "Tutup detail", technologies: "Teknologi", count: "Karya terpilih", description: "Tentang proyek" },
  en: { details: "View details", close: "Close details", technologies: "Technologies", count: "Selected work", description: "About this project" },
} as const;

/**
 * Only this section is replaced. It reuses the existing localized project
 * content and bundled images; no additional projects or external links.
 * This section uses a sticky scroll narrative inspired by the provided HTML.
 */
export default function Projects() {
  const { lang } = useLang();
  const t = translations[lang];
  const ui = lang === "id" || lang === "sas" ? support.id : support.en;
  const target = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [detail, setDetail] = useState<number | null>(null);
  const items = t.items;
  const { scrollYProgress } = useScroll({ target, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", progress => {
    const next = Math.min(items.length - 1, Math.max(0, Math.floor(progress * items.length)));
    setActive(previous => previous === next ? previous : next);
  });

  useEffect(() => {
    if (detail === null) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDetail(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [detail]);

  const current = items[active];
  const selected = detail === null ? null : items[detail];
  const galleryLength = `${Math.max(items.length, 1) * 105}svh`;

  return (
    <section id="projects" ref={target} className="wa-project-gallery" style={{ height: galleryLength }} aria-label={t.title}>
      <div className="wa-project-sticky">
        <div className="wa-project-inner">
          <div className="wa-project-info">
            <div className="wa-project-section-label"><span className="wa-project-tiny-dot" /> {t.title}</div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={`${lang}-${active}`} className="wa-project-information"
                initial={reducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: -12 }}
                transition={{ duration: reducedMotion ? 0 : .44, ease: [.2,.8,.2,1] }}>
                <span className="wa-project-index">{String(active + 1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
                <h2>{current.title}</h2>
                <p>{current.desc}</p>
                <div className="wa-project-tech" aria-label={ui.technologies}>
                  {current.tech.map((tech: string) => <span key={tech}>{tech}</span>)}
                </div>
                <button type="button" className="wa-project-detail-button" onClick={() => setDetail(active)}>
                  {ui.details}<ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="wa-project-image-column">
            <button type="button" className="wa-project-picture" onClick={() => setDetail(active)} aria-label={`${ui.details}: ${current.title}`}>
              <AnimatePresence initial={false} mode="sync">
                <motion.img key={current.image} src={current.image} alt={current.title}
                  loading={active === 0 ? "eager" : "lazy"} decoding="async"
                  initial={reducedMotion ? false : { opacity: 0, scale: 1.07, clipPath: "inset(100% 0 0 0)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0 0 0 0)" }}
                  exit={reducedMotion ? undefined : { opacity: 0, scale: 1.035 }}
                  transition={{ duration: reducedMotion ? 0 : .8, ease: [.2,.8,.2,1] }}/>
              </AnimatePresence>
              <span className="wa-project-corner" aria-hidden="true"><ArrowUpRight size={22}/></span>
            </button>
            <div className="wa-project-progress">
              <span>{String(active + 1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
              <div className="wa-project-track"><motion.div className="wa-project-track-fill" style={{ scaleX: scrollYProgress }}/></div>
              <span>{ui.count}</span>
            </div>
          </div>
        </div>
      </div>
      {createPortal(<AnimatePresence>
        {selected && <motion.div className="wa-project-overlay" role="presentation"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : .25 }} onMouseDown={e => { if(e.target===e.currentTarget) setDetail(null); }}>
          <motion.div className="wa-project-dialog" role="dialog" aria-modal="true" aria-labelledby="wa-project-dialog-title"
            initial={reducedMotion ? false : { opacity: 0, y: 28, scale: .97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 16, scale: .98 }}
            transition={{ duration: reducedMotion ? 0 : .35, ease: [.2,.8,.2,1] }}>
            <button autoFocus type="button" className="wa-project-close" onClick={() => setDetail(null)} aria-label={ui.close}><X size={20}/></button>
            <img src={selected.image} alt={selected.title} decoding="async" />
            <span className="wa-project-index">{ui.description}</span>
            <h3 id="wa-project-dialog-title">{selected.title}</h3>
            <p>{selected.desc}</p>
            <div className="wa-project-tech">{selected.tech.map((tech: string) => <span key={tech}>{tech}</span>)}</div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>, document.body)}
    </section>
  );
}
