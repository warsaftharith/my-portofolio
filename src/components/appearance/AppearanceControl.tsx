import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Palette, RotateCcw, X, Monitor, Smartphone } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import { useLang, type Lang } from "../../context/LangContext";
import "../../styles/warsa-appearance.css";
import { useNavigationAppearance } from "../../context/NavigationAppearanceContext";
import { useProfileHeroMode } from "../../hooks/useProfileHeroMode";
import type { Device, NavStyle, NavPosition, NavSize } from "../../context/NavigationAppearanceContext";

type Color = string | null;
type ColorMode = { heading: Color; body: Color; muted: Color };
type Appearance = {
  accent: Color; light: ColorMode; dark: ColorMode;
  background: Color; backgroundStrength: number; backgroundBrightness: number;
  fontFamily: 'original' | 'modern' | 'serif';
  bodySize: number | null;
  headingTracking: number;
};
type ColorKey = keyof ColorMode;
type Mode = "light" | "dark";

const STORAGE_KEY = "warsa-portfolio-appearance-v1";
const DEFAULT_COLORS: Appearance = {
  accent: null,
  light: { heading: null, body: null, muted: null },
  dark: { heading: null, body: null, muted: null },
  background: null, backgroundStrength: 16, backgroundBrightness: 0,
  fontFamily: 'original', bodySize: null, headingTracking: 0,
};
const EXAMPLE: Record<Mode, Record<ColorKey, string>> = {
  light: { heading: "#0f172a", body: "#475569", muted: "#64748b" },
  dark: { heading: "#f8fafc", body: "#cbd5e1", muted: "#94a3b8" },
};
const PRESETS = ["#176fe5", "#10b981", "#7559cc", "#d17d37", "#e25574"];
const HEX = /^#[\da-fA-F]{6}$/;
const safeNumber = (n: unknown, fallback: number, min: number, max: number) =>
  typeof n === 'number' && Number.isFinite(n) ? Math.min(max, Math.max(min, n)) : fallback;
const rgb = (hex: string) => [1,3,5].map(i => parseInt(hex.slice(i,i+2),16));
const hexColor = (parts: number[]) => '#' + parts.map(c=>Math.round(c).toString(16).padStart(2,'0')).join('');
const luminance = (hex:string) => {
  const [r,g,b]=rgb(hex).map(v=>{const c=v/255;return c<=.04045?c/12.92:((c+.055)/1.055)**2.4});
  return r*.2126+g*.7152+b*.0722;
};
const contrast=(a:string,b:string)=>{const l1=luminance(a),l2=luminance(b);return (Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05)};
/** Strong contrast even when a bright or saturated background is requested. */
function safeBackground(color:string, strength:number, brightness:number, dark:boolean, foreground:string) {
  const base=dark?'#020617':'#f8fafc';
  const x=rgb(base),original=rgb(color);
  const target=brightness>=0?255:0;
  const y=original.map(v=>v*(1-Math.abs(brightness)/100)+target*Math.abs(brightness)/100);
  for (let ratio=Math.min(strength/100,.32);ratio>=0;ratio-=.005) {
    const blended=hexColor(x.map((v,i)=>v*(1-ratio)+y[i]*ratio));
    if (contrast(blended,foreground)>=7) return blended;
  }
  return base;
}
const validColor = (value: unknown): Color =>
  typeof value === "string" && HEX.test(value) ? value.toLowerCase() : null;

function readSaved(): Appearance {
  if (typeof window === "undefined") return DEFAULT_COLORS;
  try {
    const raw = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "null");
    if (!raw || typeof raw !== "object") return DEFAULT_COLORS;
    return {
      accent: validColor(raw.accent),
      light: {
        heading: validColor(raw.light?.heading),
        body: validColor(raw.light?.body),
        muted: validColor(raw.light?.muted),
      },
      dark: {
        heading: validColor(raw.dark?.heading),
        body: validColor(raw.dark?.body),
        muted: validColor(raw.dark?.muted),
      },
      background: validColor(raw.background),
      backgroundStrength: safeNumber(raw.backgroundStrength, 16, 0, 32),
      backgroundBrightness: safeNumber(raw.backgroundBrightness, 0, -25, 25),
      fontFamily: ['original','modern','serif'].includes(raw.fontFamily) ? raw.fontFamily : 'original',
      bodySize: typeof raw.bodySize === 'number' && raw.bodySize >= 12 && raw.bodySize <= 22 ? raw.bodySize : null,
      headingTracking: safeNumber(raw.headingTracking, 0, -2, 5),
    };
  } catch {
    return DEFAULT_COLORS;
  }
}

const copy = {
  id: {
    title: "Sesuaikan Tampilan", theme: "Tema", light: "Terang", dark: "Gelap", system: "Sistem",
    language: "Bahasa", autoLanguage: "Sistem (otomatis)", palette: "Warna aksen", colorSection: "Warna teks", heading: "Judul",
    body: "Teks isi", muted: "Teks sekunder", original: "Asli", reset: "Kembalikan bawaan",
    close: "Tutup pengaturan", open: "Buka Appearance", custom: "Pilih warna sendiri",
    hint: "Warna diterapkan langsung tanpa reload. Pengaturan tersimpan di browser.",
    preview: "Pratinjau", previewTitle: "Judul portfolio", previewText: "Contoh isi teks dan informasi sekunder.",
    background: "Warna latar", bgStrength:"Intensitas warna", bgBrightness:"Kecerahan latar", readability:"Kecerahan dibatasi otomatis agar teks mudah dibaca.",
    typography:"Tipografi", fontFamily:"Model font", fontOriginal:"Bawaan", fontModern:"Modern", fontSerif:"Editorial",
    bodySize:"Ukuran teks isi", headingTracking:"Jarak huruf judul", bodyAuto:"Asli",
    heroLayout:"Tampilan Hero", heroProfile:"Profil + Banner", heroOriginal:"Hero Bawaan", heroNote:"Cover banner di atas, foto dan statistik di kiri, perkenalan di kanan. Bisa kembali ke Hero asli kapan saja.",
  },
  en: {
    title: "Customize Appearance", theme: "Theme", light: "Light", dark: "Dark", system: "System",
    language: "Language", autoLanguage: "System (auto)", palette: "Accent color", colorSection: "Text colors", heading: "Headings",
    body: "Body text", muted: "Secondary text", original: "Original", reset: "Reset to original",
    close: "Close settings", open: "Open Appearance", custom: "Pick custom color",
    hint: "Changes apply instantly without reloading. Preferences stay in your browser.",
    preview: "Preview", previewTitle: "Portfolio heading", previewText: "Example body copy and secondary information.",
    background:"Background color", bgStrength:"Color intensity", bgBrightness:"Background brightness", readability:"Brightness is automatically limited to maintain text contrast.",
    typography:"Typography", fontFamily:"Font style", fontOriginal:"Original", fontModern:"Modern", fontSerif:"Editorial",
    bodySize:"Body text size", headingTracking:"Heading letter spacing", bodyAuto:"Default",
    heroLayout:"Hero layout", heroProfile:"Profile + Banner", heroOriginal:"Original Hero", heroNote:"A cover banner, photo and stats on the left, and an introduction on the right. Switch back to the original Hero anytime.",
  },
} as const;

const NAV_COPY = {
  id: {
    navigation: "Navigasi & dock", desktop: "Desktop", mobile: "Mobile", design: "Model navigasi",
    original: "Bawaan", apple: "Apple Dock", liquid: "Liquid Glass", capsule: "Capsule", minimal: "Minimal", solid: "Solid",
    position: "Posisi dock", bottom: "Bawah", left: "Kiri", right: "Kanan", size: "Ukuran",
    compact: "Kecil", normal: "Sedang", large: "Besar", magnify: "Animasi pembesaran", animate: "Animasi halus",
    labels: "Tampilkan nama menu", autoHide: "Sembunyikan dock saat scroll", resetNav: "Kembalikan navigasi bawaan",
    width:"Lebar tombol", height:"Tinggi tombol", spacing:"Jarak ikon", labelSize:"Ukuran teks menu",
    transparency:"Transparansi dock", blur:"Blur dock", navbarPadding:"Tinggi navbar", navbarFont:"Ukuran teks navbar", navbarGlass:"Transparansi navbar", navbarBlur:"Blur navbar", off:"Mati", on:"Aktif",
    navNote: "Mode Bawaan menggunakan navbar asli tanpa perubahan. Pengaturan desktop dan mobile berbeda.",
  },
  en: {
    navigation: "Navigation & dock", desktop: "Desktop", mobile: "Mobile", design: "Navigation design",
    original: "Original", apple: "Apple Dock", liquid: "Liquid Glass", capsule: "Capsule", minimal: "Minimal", solid: "Solid",
    position: "Dock position", bottom: "Bottom", left: "Left", right: "Right", size: "Size",
    compact: "Small", normal: "Medium", large: "Large", magnify: "Magnification", animate: "Smooth animation",
    labels: "Show menu labels", autoHide: "Auto-hide dock on scroll", resetNav: "Restore original navigation",
    width:"Item width", height:"Item height", spacing:"Icon spacing", labelSize:"Menu label size",
    transparency:"Dock transparency", blur:"Dock blur", navbarPadding:"Navbar height", navbarFont:"Navbar font size", navbarGlass:"Navbar transparency", navbarBlur:"Navbar blur", off:"Off", on:"On",
    navNote: "Original mode uses your existing navbar without changes. Desktop and mobile settings are independent.",
  },
} as const;
const NAV_STYLES: NavStyle[] = ["original", "apple", "liquid", "capsule", "minimal", "solid"];
const NAV_POSITIONS: NavPosition[] = ["bottom", "left", "right"];
const NAV_SIZES: NavSize[] = ["compact", "normal", "large"];

const LANG_OPTIONS: { code: Lang; label: string }[] = [
  { code: "id", label: "Indonesia" }, { code: "en", label: "English" },
  { code: "jp", label: "日本語" }, { code: "ar", label: "العربية" },
  { code: "sas", label: "Sasak" },
];

/** CSS overrides are activated only for customized fields. Original Tailwind styles remain untouched by default. */
function applyColors(value: Appearance, mode: Mode) {
  const root = document.documentElement;
  const set = (name: string, color: Color) => {
    root.toggleAttribute(`data-wa-${name}`, Boolean(color));
    if (color) root.style.setProperty(`--wa-${name}`, color);
    else root.style.removeProperty(`--wa-${name}`);
  };
  set("accent", value.accent);
  set("heading", value[mode].heading);
  set("body", value[mode].body);
  set("muted", value[mode].muted);
  root.toggleAttribute('data-wa-background',Boolean(value.background));
  if (value.background) {
    root.style.setProperty('--wa-background-color',safeBackground(value.background,value.backgroundStrength,value.backgroundBrightness,mode==='dark',value[mode].body || (mode==='dark'?'#cbd5e1':'#334155')));
  } else root.style.removeProperty('--wa-background-color');
  root.dataset.waFont = value.fontFamily;
  root.toggleAttribute('data-wa-body-size', value.bodySize!==null);
  if(value.bodySize!==null) root.style.setProperty('--wa-body-size',`${value.bodySize}px`);
  else root.style.removeProperty('--wa-body-size');
  root.toggleAttribute('data-wa-heading-track',value.headingTracking!==0);
  root.style.setProperty('--wa-heading-tracking',`${value.headingTracking}px`);
}

export default function AppearanceControl() {
  const { theme, themePreference, setThemePreference } = useTheme();
  const { navigation, changeNavigation, resetNavigation } = useNavigationAppearance();
  const [heroMode, setHeroMode] = useProfileHeroMode();
  const [device, setDevice] = useState<Device>(() => window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
  const currentNav = navigation[device];
  const { lang, setLang, languagePreference, setLanguagePreference } = useLang(); // WARSA_LANG_SYSTEM_V353
  const [open, setOpen] = useState(false);
  const [appearance, setAppearance] = useState<Appearance>(readSaved);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const t = lang === "id" || lang === "sas" ? copy.id : copy.en;
  const n = lang === "id" || lang === "sas" ? NAV_COPY.id : NAV_COPY.en;

  useEffect(() => {
    const openTourPanel = () => setOpen(true);
    const closeTourPanel = () => setOpen(false);
    window.addEventListener('warsa:tour-open-appearance',openTourPanel);
    window.addEventListener('warsa:tour-close-appearance',closeTourPanel);
    return () => {
      window.removeEventListener('warsa:tour-open-appearance',openTourPanel);
      window.removeEventListener('warsa:tour-close-appearance',closeTourPanel);
    };
  }, []);

  useEffect(() => {
    applyColors(appearance, theme);
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(appearance)); } catch { /* private browser */ }
  }, [appearance, theme]);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    };
    window.addEventListener("pointerdown", dismiss);
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("pointerdown", dismiss);
      window.removeEventListener("keydown", keydown);
    };
  }, [open]);

  const changeText = (key: ColorKey, color: Color) => {
    setAppearance((prev) => ({ ...prev, [theme]: { ...prev[theme], [key]: color } }));
  };
  const reset = () => {
    resetNavigation();
    setHeroMode("profile");
    setAppearance({
      accent: null,
      light: { heading: null, body: null, muted: null },
      dark: { heading: null, body: null, muted: null },
      background: null, backgroundStrength: 16, backgroundBrightness: 0,
      fontFamily: 'original', bodySize: null, headingTracking: 0,
    });
  };

  return createPortal(
    <div className="wa-appearance-root" ref={wrapperRef}>
      <button
        type="button"
        ref={triggerRef}
        className="wa-appearance-trigger"
        aria-label={t.open}
        aria-expanded={open}
        aria-controls="wa-appearance-panel"
        title={t.title}
        onClick={() => setOpen((value) => !value)}
      >
        <Palette size={19} strokeWidth={1.9} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.aside
            id="wa-appearance-panel"
            role="dialog"
            aria-modal="false"
            aria-label={t.title}
            className="wa-appearance-panel"
            initial={{ opacity: 0, y: 14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <header className="wa-appearance-header">
              <div className="wa-appearance-heading">
                <Palette size={18} aria-hidden="true" />
                <span>{t.title}</span>
              </div>
              <button type="button" className="wa-appearance-icon-button" aria-label={t.close} onClick={() => setOpen(false)}><X size={18} /></button>
            </header>

            <section className="wa-appearance-section" aria-label={t.theme}>
              <span className="wa-appearance-section-title">{t.theme}</span>
              <div className="wa-appearance-segmented wa-appearance-theme">
                {(["light", "dark", "system"] as const).map((mode) => (
                  <button key={mode} type="button" className={themePreference === mode ? "is-selected" : ""}
                    aria-pressed={themePreference === mode} onClick={() => setThemePreference(mode)}>{t[mode]}</button>
                ))}
              </div>
            </section>

            <section className="wa-appearance-section" aria-label={t.language}>
              <span className="wa-appearance-section-title">{t.language}</span>
              <div className="wa-language-clicks" role="group" aria-label={t.language}>
                <button type="button" onClick={() => setLanguagePreference("system")}
                  aria-pressed={languagePreference === "system"}
                  className={languagePreference === "system" ? "is-selected" : ""}>
                  {t.autoLanguage} · {lang.toUpperCase()}
                </button>
                {LANG_OPTIONS.map((item) => (
                  <button key={item.code} type="button" onClick={() => setLang(item.code)}
                    aria-pressed={languagePreference === item.code} className={languagePreference === item.code ? "is-selected" : ""}>
                    {item.label}
                  </button>
                ))}
              </div>
            </section>


            <section className="wa-appearance-section" aria-label={t.heroLayout}>
              <span className="wa-appearance-section-title">{t.heroLayout}</span>
              <div className="wa-appearance-segmented" role="group" aria-label={t.heroLayout}>
                {(["profile", "original"] as const).map((mode) => (
                  <button key={mode} type="button" className={heroMode === mode ? "is-selected" : ""}
                    aria-pressed={heroMode === mode} onClick={() => setHeroMode(mode)}>
                    {mode === "profile" ? t.heroProfile : t.heroOriginal}
                  </button>
                ))}
              </div>
              <p className="wa-appearance-hint">{t.heroNote}</p>
            </section>

            <section className="wa-appearance-section" aria-label={n.navigation}>
              <span className="wa-appearance-section-title">{n.navigation}</span>
              <div className="wa-appearance-segmented wa-appearance-devices" role="group" aria-label={n.navigation}>
                <button type="button" className={device === "desktop" ? "is-selected" : ""}
                  aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}><Monitor size={14}/> {n.desktop}</button>
                <button type="button" className={device === "mobile" ? "is-selected" : ""}
                  aria-pressed={device === "mobile"} onClick={() => setDevice("mobile")}><Smartphone size={14}/> {n.mobile}</button>
              </div>
              <span className="wa-appearance-subtitle">{n.design}</span>
              <div className="wa-nav-presets" role="group" aria-label={n.design}>
                {NAV_STYLES.map((style) => (
                  <button type="button" key={style} aria-pressed={currentNav.style === style}
                    className={`wa-nav-preset wa-mini-${style}${currentNav.style === style ? " is-selected" : ""}`}
                    onClick={() => changeNavigation(device, { style })}>
                    <span className="wa-nav-sample" aria-hidden="true"><i/><i/><i/></span>
                    <span>{n[style]}</span>
                  </button>
                ))}
              </div>
              {currentNav.style === "original" && <>
                {(["navbarPadding", "navbarFont", "navbarGlass", "navbarBlur"] as const).map(key => {
                  const bounds = { navbarPadding: [6,22], navbarFont:[11,18], navbarGlass:[0,95], navbarBlur:[0,28] };
                  return <label key={key} className="wa-control-range">
                    <span>{n[key]} <output>{currentNav[key]}{key==='navbarGlass'?'%':'px'}</output></span>
                    <input type="range" min={bounds[key][0]} max={bounds[key][1]}
                      value={currentNav[key]} onChange={e=>changeNavigation(device,{[key]:Number(e.target.value)})}/>
                  </label>;
                })}
              </>}
              {currentNav.style !== "original" && <>
                <span className="wa-appearance-subtitle">{n.position}</span>
                <div className="wa-appearance-segmented wa-appearance-thirds" role="group" aria-label={n.position}>
                  {NAV_POSITIONS.map(position => <button type="button" key={position}
                    aria-pressed={currentNav.position === position} className={currentNav.position === position ? "is-selected" : ""}
                    onClick={() => changeNavigation(device, { position })}>{n[position]}</button>)}
                </div>
                <span className="wa-appearance-subtitle">{n.size}</span>
                <div className="wa-appearance-segmented wa-appearance-thirds" role="group" aria-label={n.size}>
                  {NAV_SIZES.map(size => <button type="button" key={size}
                    aria-pressed={currentNav.size === size} className={currentNav.size === size ? "is-selected" : ""}
                    onClick={() => changeNavigation(device, { size })}>{n[size]}</button>)}
                </div>
                {(["width", "height", "spacing", "labelSize", "transparency", "blur"] as const).map((key) => {
                  const ranges = {width:[70,130,5],height:[75,135,5],spacing:[0,14,1],labelSize:[8,15,1],transparency:[10,95,5],blur:[0,36,2]} as const;
                  const [min,max,step] = ranges[key];
                  const suffix = key === "width" || key === "height" || key === "transparency" ? "%" : "px";
                  return <label className="wa-control-range" key={key}>
                    <span>{n[key]} <output>{currentNav[key]}{suffix}</output></span>
                    <input type="range" min={min} max={max} step={step} value={currentNav[key]}
                      onChange={event=>changeNavigation(device,{[key]:Number(event.target.value)})}/>
                  </label>;
                })}
                {(["labels", "animate", "magnify", "autoHide"] as const).map(key => (
                  <div className="wa-nav-toggle" key={key}>
                    <span>{n[key]}</span>
                    <button type="button" role="switch" aria-label={n[key]} aria-checked={currentNav[key]}
                      className={`wa-nav-switch ${currentNav[key] ? "is-on" : ""}`}
                      onClick={() => changeNavigation(device, { [key]: !currentNav[key] })}>
                      <span className="wa-switch-thumb" />
                    </button>
                  </div>
                ))}
              </>}
              <p className="wa-appearance-hint">{n.navNote}</p>
              <button type="button" className="wa-appearance-reset-all"
              onClick={() => {
                setOpen(false);
                window.dispatchEvent(new Event('warsa:tour-start'));
              }}>
              {lang === 'id' || lang === 'sas' ? 'Lihat tutorial lagi' : 'Replay guided tour'}
            </button>
            <button type="button" className="wa-appearance-reset-all" onClick={resetNavigation}>
                <RotateCcw size={14}/> {n.resetNav}
              </button>
            </section>

            <section className="wa-appearance-section" aria-label={t.palette}>
              <span className="wa-appearance-section-title">{t.palette}</span>
              <div className="wa-appearance-palette">
                <button type="button" className={`wa-appearance-default ${!appearance.accent ? "is-selected" : ""}`}
                  onClick={() => setAppearance((p) => ({ ...p, accent: null }))} aria-pressed={!appearance.accent}>{t.original}</button>
                {PRESETS.map((color) => (
                  <button type="button" key={color} className="wa-appearance-swatch" style={{ background: color }}
                    aria-label={color} title={color} aria-pressed={appearance.accent === color}
                    onClick={() => setAppearance((p) => ({ ...p, accent: color }))}>
                    {appearance.accent === color && <Check size={13} strokeWidth={3} aria-hidden="true" />}
                  </button>
                ))}
                <label className="wa-appearance-picker" title={t.custom}>
                  <input type="color" aria-label={t.custom} value={appearance.accent || "#176fe5"}
                    onChange={(e) => setAppearance((p) => ({ ...p, accent: e.target.value }))} />
                </label>
              </div>
            </section>

            <section className="wa-appearance-section" aria-label={t.colorSection}>
              <span className="wa-appearance-section-title">{t.colorSection} — {t[theme]}</span>
              {(["heading", "body", "muted"] as const).map((key) => (
                <div className="wa-appearance-color-row" key={key}>
                  <div className="wa-appearance-color-name"><span>{t[key]}</span><small>{appearance[theme][key] || t.original}</small></div>
                  <div className="wa-appearance-color-actions">
                    <input type="color" aria-label={`${t[key]} — ${t.custom}`} value={appearance[theme][key] || EXAMPLE[theme][key]}
                      onChange={(e) => changeText(key, e.target.value)} />
                    <button type="button" className="wa-appearance-reset-one" disabled={!appearance[theme][key]}
                      onClick={() => changeText(key, null)} aria-label={`${t[key]} — ${t.original}`}><RotateCcw size={14}/></button>
                  </div>
                </div>
              ))}
            </section>

            <section className="wa-appearance-section" aria-label={t.background}>
              <span className="wa-appearance-section-title">{t.background}</span>
              <div className="wa-appearance-color-row">
                <span>{t.background}</span>
                <div className="wa-appearance-color-actions">
                  <input type="color" aria-label={t.background} value={appearance.background || (theme==='dark'?'#1b3450':'#c2d4e6')}
                    onChange={event=>setAppearance(p=>({...p,background:event.target.value}))}/>
                  <button type="button" className="wa-appearance-reset-one" aria-label={t.original}
                    disabled={!appearance.background} onClick={()=>setAppearance(p=>({...p,background:null}))}><RotateCcw size={14}/></button>
                </div>
              </div>
              <label className="wa-control-range"><span>{t.bgStrength} <output>{appearance.backgroundStrength}%</output></span>
                <input type="range" min="0" max="32" step="1" value={appearance.backgroundStrength}
                  onChange={event=>setAppearance(p=>({...p,backgroundStrength:Number(event.target.value)}))}/>
              </label>
              <label className="wa-control-range"><span>{t.bgBrightness} <output>{appearance.backgroundBrightness > 0 ? '+' : ''}{appearance.backgroundBrightness}%</output></span>
                <input type="range" min="-25" max="25" step="1" value={appearance.backgroundBrightness}
                  onChange={event=>setAppearance(p=>({...p,backgroundBrightness:Number(event.target.value)}))}/>
              </label>
              <p className="wa-appearance-hint">{t.readability}</p>
            </section>
            <section className="wa-appearance-section" aria-label={t.typography}>
              <span className="wa-appearance-section-title">{t.typography}</span>
              <div className="wa-appearance-segmented wa-appearance-thirds">
                {(['original','modern','serif'] as const).map(f=><button type="button" key={f}
                  className={appearance.fontFamily===f?'is-selected':''} aria-pressed={appearance.fontFamily===f}
                  onClick={()=>setAppearance(p=>({...p,fontFamily:f}))}>{f==='original'?t.fontOriginal:f==='modern'?t.fontModern:t.fontSerif}</button>)}
              </div>
              <label className="wa-control-range"><span>{t.bodySize}: <output>{appearance.bodySize===null?t.bodyAuto:appearance.bodySize+'px'}</output></span>
                <input type="range" min="12" max="22" step="1" value={appearance.bodySize??16}
                  onChange={e=>setAppearance(p=>({...p,bodySize:Number(e.target.value)}))}/>
              </label>
              <label className="wa-control-range"><span>{t.headingTracking} <output>{appearance.headingTracking}px</output></span>
                <input type="range" min="-2" max="5" step="0.5" value={appearance.headingTracking}
                  onChange={e=>setAppearance(p=>({...p,headingTracking:Number(e.target.value)}))}/>
              </label>
              <button type="button" className="wa-appearance-default" onClick={()=>setAppearance(p=>({...p,fontFamily:'original',bodySize:null,headingTracking:0}))}>{t.original}</button>
            </section>

            <div className="wa-appearance-preview" aria-label={t.preview}>
              <strong style={{ color: appearance[theme].heading || undefined }}>{t.previewTitle}</strong>
              <span style={{ color: appearance[theme].body || undefined }}>{t.previewText}</span>
              <small style={{ color: appearance[theme].muted || undefined }}>{t.muted}</small>
            </div>
            <p className="wa-appearance-hint">{t.hint}</p>
            <button type="button" className="wa-appearance-reset-all" onClick={reset}><RotateCcw size={14} /> {t.reset}</button>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}
