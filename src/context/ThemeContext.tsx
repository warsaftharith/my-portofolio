import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";
export type ThemePreference = Theme | "system";
type ThemeContextType = {
  // Existing components still receive the RESOLVED light/dark theme.
  theme: Theme;
  themePreference: ThemePreference;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setThemePreference: (preference: ThemePreference) => void;
};
const ThemeContext = createContext<ThemeContextType | null>(null);
const readPreference = (): ThemePreference => {
  try {
    const saved = localStorage.getItem("theme");

    return saved === "light" ||
      saved === "dark" ||
      saved === "system"
      ? saved
      : "system";
  } catch {
    return "system";
  }
};
const systemDark = () => typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themePreference, setThemePreference] = useState<ThemePreference>(readPreference);
  const [prefersDark, setPrefersDark] = useState(systemDark);
  const theme: Theme = themePreference === "system" ? (prefersDark ? "dark" : "light") : themePreference;

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => setPrefersDark(event.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    try { localStorage.setItem("theme", themePreference); } catch { /* storage blocked */ }
  }, [theme, themePreference]);
  const setTheme = (value: Theme) => setThemePreference(value);
  const toggleTheme = () => setThemePreference(theme === "dark" ? "light" : "dark");
  return <ThemeContext.Provider value={{ theme, themePreference, toggleTheme, setTheme, setThemePreference }}>{children}</ThemeContext.Provider>;
};
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
