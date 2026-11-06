import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLang } from "../../context/LangContext";
import { motion, AnimatePresence } from "framer-motion";
// WARSA_V354_ASSET_READINESS — gunakan URL Vite yang sama persis dengan gambar Hero.
import bannerImage from "../../assets/banner-warsa-profile.png";
import profileImage from "../../assets/profile.png";


/** Read the same stored Appearance palette before AppearanceControl mounts. */
const isHex = (value: unknown): value is string => typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
const rgb = (hex: string) => [1,3,5].map(index => parseInt(hex.slice(index,index+2),16));
const hex = (colors: number[]) => '#' + colors.map(value => Math.round(value).toString(16).padStart(2,'0')).join('');
const lum = (h: string) => rgb(h).map(n => {
  const c=n/255;return c <= .04045 ? c/12.92 : ((c+.055)/1.055)**2.4;
}).reduce((total,n,index)=>total+n*[.2126,.7152,.0722][index],0);
const contrast = (a: string,b:string) => (Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
function loaderPalette(dark: boolean) {
  const fallback = dark ? '#020617' : '#ffffff';
  const blendBase = dark ? '#020617' : '#f8fafc';
  const foreground = dark ? '#cbd5e1' : '#334155';
  try {
    const saved = JSON.parse(localStorage.getItem('warsa-portfolio-appearance-v1') || '{}');
    const accent = isHex(saved.accent) ? saved.accent : '#176fe5';
    let background = fallback;
    if (isHex(saved.background)) {
      const strength = typeof saved.backgroundStrength === 'number' && Number.isFinite(saved.backgroundStrength) ? Math.max(0,Math.min(32,saved.backgroundStrength)) : 16;
      const bright = typeof saved.backgroundBrightness === 'number' && Number.isFinite(saved.backgroundBrightness) ? Math.max(-25,Math.min(25,saved.backgroundBrightness)) : 0;
      const base = rgb(blendBase);
      const goal = rgb(saved.background).map((n:number)=>n*(1-Math.abs(bright)/100)+(bright >= 0 ? 255 : 0)*Math.abs(bright)/100);
      const chosenForeground = isHex(saved[dark?'dark':'light']?.body) ? saved[dark?'dark':'light'].body : foreground;
      for (let ratio = strength/100;ratio >= 0;ratio -= .005) {
        const candidate = hex(base.map((n,index)=>n*(1-ratio)+goal[index]*ratio));
        if(contrast(candidate,chosenForeground) >= 7) {background=candidate;break;}
      }
    }
    return {accent, background};
  } catch { return {accent:'#176fe5',background:fallback}; }
}
const mix = (a:string,b:string,portion:number) => hex(rgb(a).map((n,index)=>n*(1-portion)+rgb(b)[index]*portion));
const LOADING_COPY = {
  id: ['Selamat datang di Warsa Portfolio','Sedang menyiapkan portfolio…','Menyiapkan tampilan…','Memuat konten dan animasi…','Hampir selesai…','Siap!'],
  en: ['Welcome to Warsa Portfolio','Preparing your portfolio…','Preparing the interface…','Loading content and motion…','Almost ready…','Ready!'],
};
const LoadingScreen = ({ onFinish }: { onFinish: () => void }) => {
  const { theme } = useTheme();
  const { lang } = useLang();
  const colors = useMemo(() => loaderPalette(theme === 'dark'),[theme]);
  const text = lang === 'id' || lang === 'sas' ? LOADING_COPY.id : LOADING_COPY.en;
  const loaderStyle = {
    backgroundColor:colors.background,
    '--wa-loading-accent':colors.accent,
  } as CSSProperties;

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const timers: number[] = [];
    const startTime = performance.now();
    const minimumVisibleMs = 650; 
    const finalHoldMs = 320;    
    const perImageTimeoutMs = 30000; 

    // Pilih aset Hero yang benar-benar digunakan pengunjung.
    let originalHero = false;
    try {
      originalHero = localStorage.getItem("warsa-portfolio-profile-hero-mode-v1") === "original";
    } catch { /* penyimpanan mungkin diblokir; fallback ke Profile + Banner */ }
    const imageUrls = window.location.pathname === "/"
      ? (originalHero ? [profileImage] : [bannerImage, profileImage])
      : [];

    const waitForDecodedImage = (url: string): Promise<boolean> =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.fetchPriority = "high";
        let done = false;
        const settle = (ok: boolean) => {
          if (done) return;
          done = true;
          window.clearTimeout(timeout);
          img.onload = null;
          img.onerror = null;
          resolve(ok);
        };
        const timeout = window.setTimeout(() => settle(false), perImageTimeoutMs);
        img.onload = () => {
          // onload = jaringan/browser cache selesai; decode = bitmap siap dipakai.
          void img.decode().catch(() => {}).then(() => settle(img.naturalWidth > 0));
        };
        img.onerror = () => settle(false);
        img.src = url;
      });

    let completed = 0;
    void Promise.all(imageUrls.map(async (url) => {
      const successful = await waitForDecodedImage(url);
      completed += 1;
      if (!cancelled) {
        // Setiap gambar selesai menjadi milestone nyata; 100% hanya setelah semuanya.
        setProgress(Math.round((completed / imageUrls.length) * 96));
      }
      return successful;
    })).then((results) => {
      if (cancelled) return;
      if (results.some((success) => !success)) {
        console.warn("WARSA loading: salah satu gambar Hero gagal dimuat atau timeout; halaman tetap dibuka agar tidak terjebak di loading.");
      }
      const remaining = Math.max(0, minimumVisibleMs - (performance.now() - startTime));
      timers.push(window.setTimeout(() => {
        if (cancelled) return;
        setProgress(100);
        timers.push(window.setTimeout(() => {
          if (!cancelled) onFinish();
        }, finalHoldMs));
      }, remaining));
    });

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [onFinish]);


  return (
    <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
        style={loaderStyle}
        exit={{ opacity: 0 }}
        >
        {/* BACKGROUND GLOW */}
        <div className="absolute w-[400px] h-[400px] blur-3xl rounded-full animate-pulse"
          style={{ backgroundColor:colors.accent, opacity:.17 }} />

        {/* WELCOME TEXT */}
        <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-slate-900 dark:text-white mb-2 z-10"
        >
            {text[0]}
        </motion.h1>

        <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-slate-500 dark:text-slate-400 mb-6 z-10"
        >
            {text[1]}
        </motion.p>

        {/* CHARACTER */}
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="z-10"
                >
                <img
                    src="/character.gif"
                    alt="character"
                    className="w-24 h-24 object-contain"
                />
            </motion.div>

        {/* LOADING BAR */}
        <div className="w-72 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden z-10">
            <div
            className="h-full transition-all"
            style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${colors.accent}, ${mix(colors.accent, theme === "dark" ? "#cbd5e1" : "#ffffff", .25)})` }}
            />
        </div>

        {/* PERCENT */}
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 z-10">
            {progress}%
        </p>

        {/* FUN STATUS TEXT */}
        <AnimatePresence mode="wait">
            <motion.p
            key={progress}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-xs text-slate-400 z-10"
            >
            {progress < 30 && text[2]}
            {progress >= 30 && progress < 70 && text[3]}
            {progress >= 70 && progress < 100 && text[4]}
            {progress === 100 && text[5]}
            </motion.p>
        </AnimatePresence>
    </motion.div>
  );
};

export default LoadingScreen;