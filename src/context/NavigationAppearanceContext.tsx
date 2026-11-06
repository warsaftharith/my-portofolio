import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Device = "desktop" | "mobile";
export type NavStyle = "original" | "apple" | "liquid" | "capsule" | "minimal" | "solid";
export type NavPosition = "bottom" | "left" | "right";
export type NavSize = "compact" | "normal" | "large";
export type NavConfig = {
  style: NavStyle;
  position: NavPosition;
  size: NavSize;
  magnify: boolean;
  animate: boolean;
  labels: boolean;
  autoHide: boolean; // hide on downward scroll, reveal on upward scroll
  width: number;       // flexible item width percentage (70..130)
  height: number;      // item height percentage (75..135)
  spacing: number;     // gap (0..14px)
  labelSize: number;   // label font px (8..15)
  transparency: number; // translucent percentage (10..95)
  blur: number;        // px (0..36)
  navbarPadding: number; // original navbar vertical padding, px
  navbarFont: number; // original navbar menu text, px
  navbarGlass: number; // original navbar opacity, percent
  navbarBlur: number; // original navbar blur, px
};
export type NavigationPreferences = Record<Device, NavConfig>;
const KEY = "warsa-nav-appearance-v2";

export const DEFAULT_NAV: NavigationPreferences = {
  desktop: { style: "original", position: "bottom", size: "normal", magnify: true, animate: true, labels: true, autoHide: true, width: 100, height: 100, spacing: 6, labelSize: 10, transparency: 76, blur: 22, navbarPadding: 12, navbarFont: 14, navbarGlass: 80, navbarBlur: 8 },
  mobile: { style: "original", position: "bottom", size: "compact", magnify: false, animate: true, labels: true, autoHide: true, width: 100, height: 100, spacing: 3, labelSize: 9, transparency: 76, blur: 22, navbarPadding: 12, navbarFont: 14, navbarGlass: 80, navbarBlur: 8 },
};
const styles: readonly NavStyle[] = ["original", "apple", "liquid", "capsule", "minimal", "solid"];
const positions: readonly NavPosition[] = ["bottom", "left", "right"];
const sizes: readonly NavSize[] = ["compact", "normal", "large"];
const numberIn = (value: unknown, fallback: number, low: number, high: number) =>
  typeof value === 'number' && Number.isFinite(value) ? Math.max(low, Math.min(high, value)) : fallback;
const bool = (value: unknown, fallback: boolean) => typeof value === "boolean" ? value : fallback;

function validateOne(raw: unknown, defaults: NavConfig): NavConfig {
  const r = raw && typeof raw === "object" ? raw as Partial<NavConfig> : {};
  return {
    style: styles.includes(r.style as NavStyle) ? r.style as NavStyle : defaults.style,
    position: positions.includes(r.position as NavPosition) ? r.position as NavPosition : defaults.position,
    size: sizes.includes(r.size as NavSize) ? r.size as NavSize : defaults.size,
    magnify: bool(r.magnify, defaults.magnify),
    animate: bool(r.animate, defaults.animate),
    labels: bool(r.labels, defaults.labels),
    autoHide: bool(r.autoHide, defaults.autoHide),
    width: numberIn(r.width, defaults.width, 70, 130),
    height: numberIn(r.height, defaults.height, 75, 135),
    spacing: numberIn(r.spacing, defaults.spacing, 0, 14),
    labelSize: numberIn(r.labelSize, defaults.labelSize, 8, 15),
    transparency: numberIn(r.transparency, defaults.transparency, 10, 95),
    blur: numberIn(r.blur, defaults.blur, 0, 36),
    navbarPadding: numberIn(r.navbarPadding, defaults.navbarPadding, 6, 22),
    navbarFont: numberIn(r.navbarFont, defaults.navbarFont, 11, 18),
    navbarGlass: numberIn(r.navbarGlass, defaults.navbarGlass, 0, 95),
    navbarBlur: numberIn(r.navbarBlur, defaults.navbarBlur, 0, 28),
  };
}
function load(): NavigationPreferences {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || "null");
    return {
      desktop: validateOne(raw?.desktop, DEFAULT_NAV.desktop),
      mobile: validateOne(raw?.mobile, DEFAULT_NAV.mobile),
    };
  } catch { return { desktop: { ...DEFAULT_NAV.desktop }, mobile: { ...DEFAULT_NAV.mobile } }; }
}

type NavigationContextValue = {
  navigation: NavigationPreferences;
  changeNavigation: (device: Device, patch: Partial<NavConfig>) => void;
  resetNavigation: () => void;
};
const Context = createContext<NavigationContextValue | null>(null);

export function NavigationAppearanceProvider({ children }: { children: ReactNode }) {
  const [navigation, setNavigation] = useState<NavigationPreferences>(load);
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.waNavDesktop = navigation.desktop.style === "original" ? "original" : "dock";
    root.dataset.waNavDesktopPosition = navigation.desktop.position;
    root.dataset.waNavMobile = navigation.mobile.style === "original" ? "original" : "dock";
    root.dataset.waNavMobilePosition = navigation.mobile.position;
    root.style.setProperty('--wa-original-padding-desktop', `${navigation.desktop.navbarPadding}px`);
    root.style.setProperty('--wa-original-font-desktop', `${navigation.desktop.navbarFont}px`);
    root.style.setProperty('--wa-original-padding-mobile', `${navigation.mobile.navbarPadding}px`);
    root.style.setProperty('--wa-original-font-mobile', `${navigation.mobile.navbarFont}px`);
    root.style.setProperty('--wa-original-glass-desktop', String(navigation.desktop.navbarGlass / 100));
    root.style.setProperty('--wa-original-glass-mobile', String(navigation.mobile.navbarGlass / 100));
    root.style.setProperty('--wa-original-blur-desktop', `${navigation.desktop.navbarBlur}px`);
    root.style.setProperty('--wa-original-blur-mobile', `${navigation.mobile.navbarBlur}px`);
    root.toggleAttribute('data-wa-navbar-glass-desktop', navigation.desktop.navbarGlass!==80 || navigation.desktop.navbarBlur!==8);
    root.toggleAttribute('data-wa-navbar-glass-mobile', navigation.mobile.navbarGlass!==80 || navigation.mobile.navbarBlur!==8);
    return () => { delete root.dataset.waNavDesktop; delete root.dataset.waNavDesktopPosition; delete root.dataset.waNavMobile; delete root.dataset.waNavMobilePosition; };
  }, [navigation]);
  const commit = useCallback((next: NavigationPreferences) => {
    setNavigation(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage blocked */ }
  }, []);
  const changeNavigation = useCallback((device: Device, patch: Partial<NavConfig>) => {
    setNavigation(previous => {
      const next = { ...previous, [device]: validateOne({ ...previous[device], ...patch }, DEFAULT_NAV[device]) };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* storage blocked */ }
      return next;
    });
  }, []);
  const resetNavigation = useCallback(() => commit({ desktop: { ...DEFAULT_NAV.desktop }, mobile: { ...DEFAULT_NAV.mobile } }), [commit]);
  const value = useMemo(() => ({ navigation, changeNavigation, resetNavigation }), [navigation, changeNavigation, resetNavigation]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useNavigationAppearance() {
  const value = useContext(Context);
  if (!value) throw new Error("useNavigationAppearance must be used within NavigationAppearanceProvider");
  return value;
}
