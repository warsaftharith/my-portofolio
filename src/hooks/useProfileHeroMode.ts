import { useSyncExternalStore } from "react";

export type ProfileHeroMode = "profile" | "original";
const KEY = "warsa-portfolio-profile-hero-mode-v1";
const EVENT = "warsa:profile-hero-mode";
let fallback: ProfileHeroMode = "profile";

function getSnapshot(): ProfileHeroMode {
  if (typeof window === "undefined") return fallback;
  try {
    return window.localStorage.getItem(KEY) === "original" ? "original" : "profile";
  } catch {
    return fallback;
  }
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function useProfileHeroMode() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, () => "profile");
  const setMode = (next: ProfileHeroMode) => {
    fallback = next;
    try { window.localStorage.setItem(KEY, next); } catch { /* No persistent storage */ }
    window.dispatchEvent(new Event(EVENT));
  };
  return [mode, setMode] as const;
}
