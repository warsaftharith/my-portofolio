import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Compass, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useLang } from "../../context/LangContext";
import { useTheme } from "../../context/ThemeContext";
import "../../styles/warsa-onboarding.css";

const TOUR_KEY = "warsa-onboarding-v1-completed";
const TOTAL_STEPS = 5;

type Rect = { left: number; top: number; width: number; height: number };
type StepText = { title: string; description: string };
type TourText = {
  next: string; back: string; skip: string; finish: string; counter: string;
  steps: readonly StepText[];
};
const copies: Record<string, TourText> = {
  id: {
    next:"Berikutnya", back:"Kembali", skip:"Lewati", finish:"Mulai jelajahi",counter:"Langkah",
    steps:[
      {title:"Selamat datang!",description:"Kenalan sebentar dengan navigasi dan pengaturan portfolio. Tur ini hanya muncul pada kunjungan pertama."},
      {title:"Menu navigasi",description:"Pakai navbar atau dock untuk berpindah ke Beranda, Tentang, Keahlian, Proyek, dan Kontak."},
      {title:"Sesuaikan tampilan",description:"Tombol Appearance membuka pilihan warna, tipografi, dan berbagai model dock. Pengaturan tersimpan otomatis."},
      {title:"Pilih tema",description:"Coba mode Terang, Gelap, atau Sistem. Mode Sistem mengikuti tampilan perangkatmu."},
      {title:"Pilih bahasa",description:"Ubah bahasa dengan satu klik, tanpa reload. Kamu dapat mengulang tutorial dari panel Appearance kapan saja."},
    ],
  },
  en: {
    next:"Next",back:"Back",skip:"Skip",finish:"Explore portfolio",counter:"Step",
    steps:[
      {title:"Welcome!",description:"A quick introduction to portfolio navigation and personalization. This guide appears only on your first visit."},
      {title:"Navigation",description:"Use the navbar or dock to move between Home, About, Skills, Projects, and Contact."},
      {title:"Customize Appearance",description:"Open Appearance to change colors, typography, and dock layouts. Changes are saved automatically."},
      {title:"Choose a theme",description:"Pick Light, Dark, or System. System follows your device’s display settings."},
      {title:"Select a language",description:"Switch languages in one click without reloading. You can replay this tour from Appearance."},
    ],
  },
  jp: {
    next:"次へ",back:"戻る",skip:"スキップ",finish:"ポートフォリオを見る",counter:"ステップ",
    steps:[
      {title:"ようこそ！",description:"ナビゲーションと表示設定をご案内します。このガイドは初回のみ表示されます。"},
      {title:"ナビゲーション",description:"ナビゲーションバーやドックから各セクションに移動できます。"},
      {title:"表示をカスタマイズ",description:"色、文字、ドックのデザインを変更できます。設定は自動保存されます。"},
      {title:"テーマの選択",description:"ライト、ダーク、システムから選べます。"},
      {title:"言語の選択",description:"ページを再読み込みせずに言語を変更できます。設定からガイドを再表示できます。"},
    ],
  },
  ar: {
    next:"التالي",back:"السابق",skip:"تخطي",finish:"استكشف المعرض",counter:"الخطوة",
    steps:[
      {title:"مرحبًا بك!",description:"جولة سريعة للتعرف على التنقل وإعدادات المظهر. تظهر هذه الجولة في زيارتك الأولى فقط."},
      {title:"التنقل",description:"استخدم شريط التنقل أو القائمة العائمة للانتقال بين أقسام الموقع."},
      {title:"تخصيص المظهر",description:"غيّر الألوان والخطوط وتصميم القائمة. تُحفظ إعداداتك تلقائيًا."},
      {title:"اختيار السمة",description:"اختر الفاتح أو الداكن أو إعداد النظام."},
      {title:"اختيار اللغة",description:"يمكنك تغيير اللغة بنقرة واحدة دون تحديث الصفحة، وإعادة الجولة من الإعدادات."},
    ],
  },
};

const selectors: (string | null)[] = [
  null,
  ".wa-floating-dock, nav",
  ".wa-appearance-trigger",
  ".wa-appearance-theme",
  ".wa-language-clicks",
];

/** A portal-based, optional introduction; the portfolio components stay unchanged. */
export default function FirstVisitTour() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const { pathname } = useLocation();
  const t = copies[lang === "sas" ? "id" : lang] || copies.en;
  const [step, setStep] = useState<number | null>(null);
  const [target, setTarget] = useState<Rect | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const reduced = Boolean(useReducedMotion());

  const start = useCallback(() => {
    if (window.location.pathname !== "/") return;
    window.scrollTo({top:0, behavior:"auto"});
    setStep(0);
  }, []);

  const finish = useCallback(() => {
    setStep(null);
    window.dispatchEvent(new Event("warsa:tour-close-appearance"));
    try { localStorage.setItem(TOUR_KEY, "yes"); } catch { /* private mode */ }
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const needsTour = (() => { try { return localStorage.getItem(TOUR_KEY) !== "yes"; } catch { return true; } })();
    const timeout = needsTour ? window.setTimeout(start, 650) : null;
    const repeat = () => start();
    window.addEventListener("warsa:tour-start", repeat);
    return () => {
      if (timeout !== null) clearTimeout(timeout);
      window.removeEventListener("warsa:tour-start",repeat);
    };
  }, [pathname, start]);

  const isTourOpen = step !== null;
  useEffect(() => {
    if (!isTourOpen) return;
    document.documentElement.dataset.waTour = "active";
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    window.addEventListener("keydown",esc);
    const focus = window.setTimeout(() => cardRef.current?.focus(),100);
    return () => {
      delete document.documentElement.dataset.waTour;
      document.body.style.overflow=previous;
      window.removeEventListener("keydown",esc);
      clearTimeout(focus);
    };
  }, [isTourOpen, finish]);

  useEffect(() => {
    if (step === null) {setTarget(null);return;}
    window.dispatchEvent(new Event(step >= 3 ? "warsa:tour-open-appearance" : "warsa:tour-close-appearance"));
    let frame=0;
    const measure=()=>{
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(()=>{
        const el=selectors[step] ? document.querySelector<HTMLElement>(selectors[step]!) : null;
        if (!el) {setTarget(null);return;}
        const rect=el.getBoundingClientRect();
        if(rect.width && rect.height) setTarget({left:rect.left,top:rect.top,width:rect.width,height:rect.height});
      });
    };
    measure();
    const delays=[window.setTimeout(measure,180),window.setTimeout(measure,420)];
    window.addEventListener("resize",measure);
    window.addEventListener("scroll",measure,{passive:true});
    return ()=>{
      if(frame) cancelAnimationFrame(frame);
      delays.forEach(clearTimeout);
      window.removeEventListener("resize",measure);
      window.removeEventListener("scroll",measure);
    };
  }, [step]);

  if (step === null) return null;
  const pad = 7;
  const highlight = target && {
    left: Math.max(3,target.left-pad),
    top: Math.max(3,target.top-pad),
    width: target.width+pad*2,
    height: target.height+pad*2,
  };
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const cardWidth = Math.min(352,viewportWidth-24);
  const cardHeight = 238;
  let left = Math.max(12,(viewportWidth-cardWidth)/2);
  let top = Math.max(20,(viewportHeight-cardHeight)/2);
  if (highlight) {
    // Prefer beside the highlighted settings panel on desktop; above/below on phones.
    if (viewportWidth > 750 && highlight.left + highlight.width + cardWidth + 20 < viewportWidth) {
      left = highlight.left + highlight.width + 20;
      top = Math.min(viewportHeight-cardHeight-12,Math.max(12,highlight.top));
    } else if (viewportWidth > 750 && highlight.left > cardWidth + 20) {
      left = highlight.left-cardWidth-20;
      top = Math.min(viewportHeight-cardHeight-12,Math.max(12,highlight.top));
    } else {
      left = Math.max(12,(viewportWidth-cardWidth)/2);
      top = highlight.top + highlight.height + cardHeight + 20 < viewportHeight
        ? highlight.top+highlight.height+16
        : Math.max(12,highlight.top-cardHeight-16);
    }
  }
  const rtl = lang === "ar";
  return createPortal(
    <AnimatePresence mode="wait">
      <div className={`wa-tour-root${theme === "dark" ? " is-dark" : ""}`} role="presentation">
        {highlight ? (
          <div className="wa-tour-spotlight" aria-hidden="true" style={{left:highlight.left,top:highlight.top,width:highlight.width,height:highlight.height}}/>
        ) : <div className="wa-tour-blanket" aria-hidden="true"/>}
        <div className="wa-tour-block" aria-hidden="true" />
        <motion.section
          key={step}
          ref={cardRef}
          className="wa-tour-card"
          role="dialog"
          tabIndex={-1}
          aria-modal="true"
          aria-label={t.steps[step].title}
          dir={rtl ? "rtl" : "ltr"}
          style={{left,top,width:cardWidth}}
          initial={reduced ? false : {opacity:0,y:13,scale:.97}}
          animate={{opacity:1,y:0,scale:1}}
          exit={reduced ? undefined : {opacity:0,y:-7,scale:.98}}
          transition={{duration:reduced ? 0 : .24,ease:[.2,.8,.2,1]}}
        >
          <div className="wa-tour-top">
            <span className="wa-tour-kicker"><Compass size={16} aria-hidden="true" />{t.counter} {step+1}/{TOTAL_STEPS}</span>
            <button className="wa-tour-close" type="button" onClick={finish} aria-label={t.skip} title={t.skip}><X size={18}/></button>
          </div>
          <h2 className="wa-tour-title">{t.steps[step].title}</h2>
          <p className="wa-tour-description">{t.steps[step].description}</p>
          <div className="wa-tour-progress" aria-hidden="true">{Array.from({length:TOTAL_STEPS},(_,i)=><span className={i<=step ? "is-active":""} key={i}/>)}</div>
          <div className="wa-tour-actions">
            <button className="wa-tour-skip" type="button" onClick={finish}>{t.skip}</button>
            <div className="wa-tour-buttons">
              {step>0 && <button className="wa-tour-back" type="button" onClick={()=>setStep(v=>v===null?null:Math.max(0,v-1))}><ArrowLeft size={15}/>{t.back}</button>}
              <button className="wa-tour-next" type="button" onClick={()=>step===TOTAL_STEPS-1?finish():setStep(v=>v===null?null:v+1)}>
                {step===TOTAL_STEPS-1?t.finish:t.next}<ArrowRight size={16}/>
              </button>
            </div>
          </div>
        </motion.section>
      </div>
    </AnimatePresence>,document.body
  );
}
