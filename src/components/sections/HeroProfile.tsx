import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDownToLine, ArrowUpRight, Clock3, Mail, BriefcaseBusiness, Code2, Layers3, Sparkles } from "lucide-react";
import { useLang } from "../../context/LangContext";
import { en } from "../../lang/en";
import { id } from "../../lang/id";
import { jp } from "../../lang/jp";
import { ar } from "../../lang/ar";
import { sas } from "../../lang/sas";
import avatar from "../../assets/profile.png";
import cover from "../../assets/banner-warsa-profile.png";
import "../../styles/warsa-profile-hero.css";

const copy = { en: en.hero, id: id.hero, jp: jp.hero, ar: ar.hero, sas: sas.hero };
const icons = [BriefcaseBusiness, Layers3, Code2, Sparkles];
const START_DATE = new Date("2020-08-14T00:00:00+07:00").getTime();
const pad = (value: number) => String(value).padStart(2, "0");

const easeOutSoft: [number, number, number, number] = [0.22, 1, 0.36, 1];
const cardFlow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.10, delayChildren: 0.12 } },
};
const sideFlow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.04 } },
};
const mainFlow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.12 } },
};
const statFlow: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.075, delayChildren: 0.05 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.82, ease: easeOutSoft } },
};
const avatarReveal: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 145, damping: 22, mass: 0.9 } },
};
const pressSpring = { type: "spring" as const, stiffness: 235, damping: 19, mass: 0.8 };
const MotionLink = motion.create(Link);

function useTyping(text: string, disabled: boolean) {
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => { setIndex(0); setDeleting(false); }, [text]);
  useEffect(() => {
    if (disabled) return;
    const timeout = window.setTimeout(() => {
      if (!deleting && index >= text.length) setDeleting(true);
      else if (deleting && index <= 0) setDeleting(false);
      else setIndex(current => current + (deleting ? -1 : 1));
    }, !deleting && index === text.length ? 1700 : deleting && index === 0 ? 450 : deleting ? 40 : 70);
    return () => window.clearTimeout(timeout);
  }, [text, index, deleting, disabled]);
  return disabled ? text : text.slice(0, index);
}

function OnlineDuration({ labels }: { labels: typeof id.hero }) {
  const [seconds, setSeconds] = useState(() => Math.max(0, Math.floor((Date.now() - START_DATE) / 1000)));
  useEffect(() => {
    const update = () => setSeconds(Math.max(0, Math.floor((Date.now() - START_DATE) / 1000)));
    const interval = window.setInterval(() => {
      if (!document.hidden) update();
    }, 1000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const days = Math.floor(seconds / 86400);
  const hrs = Math.floor((seconds % 86400) / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return (
    <motion.div className="wph-online" aria-label={labels.onlineFor} variants={fadeUp}>
      <Clock3 size={18} strokeWidth={1.8} aria-hidden="true" />
      <div className="wph-online-copy">
        <span className="wph-online-kicker">{labels.onlineFor}</span>
        <span className="wph-online-time" aria-live="off"><strong>{days}</strong> {labels.days} <i aria-hidden="true">·</i> {pad(hrs)} {labels.hours} {pad(mins)} {labels.minutes} {pad(secs)} {labels.seconds}</span>
      </div>
    </motion.div>
  );
}

/** Profile-cover option. Existing Hero.tsx and Navbar.tsx are intentionally unchanged. */
export default function HeroProfile() {
  const { lang } = useLang();
  const reduce = Boolean(useReducedMotion());
  const t = useMemo(() => copy[lang] ?? copy.en, [lang]);
  const typed = useTyping(t.subtitle, reduce);
  const scrollToContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return (
    <section id="hero" className="wph-root" aria-label="WARSA Developer profile">
      <div className="wph-shell">
        <div className="wph-cover">
          <motion.img
            className="wph-cover-image"
            src={cover}
            width={2048}
            height={646}
            alt="WARSA Developer — Software Engineer, UI/UX Designer, Web Developer"
            fetchPriority="high"
            decoding="async"
            initial={reduce ? false : { opacity: 0.55, scale: 1.035 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={reduce ? { duration: 0 } : { duration: 1.2, ease: easeOutSoft }}
          />
          <div className="wph-cover-shade" aria-hidden="true" />
        </div>
        <motion.div
          className="wph-card"
          variants={cardFlow}
          initial={reduce ? false : "hidden"}
          animate={reduce ? "show" : undefined}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.08 }}
        >
          <motion.aside className="wph-sidebar" variants={sideFlow}>
            <motion.div
              className="wph-avatar-frame"
              variants={avatarReveal}
              whileHover={reduce ? undefined : { y: -3, scale: 1.018 }}
              transition={pressSpring}
            >
              <img src={avatar} alt="Foto profil Wahyu" width={256} height={256} decoding="async" />
              <span className="wph-avatar-online" aria-label={t.available} />
            </motion.div>
            <motion.div className="wph-identity" variants={fadeUp}>
              <span className="wph-overline">WARSA DEVELOPER</span>
              <strong>Wahyu</strong>
              <p>{t.subtitle}</p>
            </motion.div>
            <motion.div className="wph-stats" variants={statFlow}>
              {t.stats.map((stat, index) => {
                const Icon = icons[index] ?? Sparkles;
                return (
                  <motion.div className="wph-stat" key={index} variants={fadeUp} whileHover={reduce ? undefined : { y: -3 }} transition={pressSpring}>
                    <Icon size={17} strokeWidth={1.8} aria-hidden="true" />
                    <strong>{stat.value}</strong>
                    <span>{stat.title}</span>
                    <small>{stat.subtitle}</small>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.aside>
          <motion.div className="wph-main" variants={mainFlow}>
            <motion.div variants={fadeUp}><span aria-hidden="true" /></motion.div>
            <motion.h1 className="wph-heading" variants={fadeUp}>{t.title} <span>Wahyu</span><span className="wph-period">.</span></motion.h1>
            <motion.p className="wph-typed" aria-label={t.subtitle} variants={fadeUp}>{typed}<span className="wph-caret" aria-hidden="true">|</span></motion.p>
            <motion.p className="wph-description" variants={fadeUp}>{t.desc}</motion.p>
            <motion.div className="wph-cta" variants={fadeUp}>
              <motion.button className="wph-btn wph-btn-primary" type="button" onClick={scrollToContact} whileHover={reduce ? undefined : { y: -2 }} whileTap={reduce ? undefined : { scale: 0.97 }} transition={pressSpring}>{t.contact}<Mail size={17} strokeWidth={1.8} aria-hidden="true" /></motion.button>
              <MotionLink className="wph-btn wph-btn-muted" to="/pricelist" whileHover={reduce ? undefined : { y: -2 }} whileTap={reduce ? undefined : { scale: 0.97 }} transition={pressSpring}>{t.pricelist}<ArrowUpRight size={17} aria-hidden="true" /></MotionLink>
              <motion.a className="wph-btn wph-btn-outline" href="/cv/cv-wahyu.pdf" download whileHover={reduce ? undefined : { y: -2 }} whileTap={reduce ? undefined : { scale: 0.97 }} transition={pressSpring}>{t.cv}<ArrowDownToLine size={16} aria-hidden="true" /></motion.a>
            </motion.div>
            <OnlineDuration labels={t} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
