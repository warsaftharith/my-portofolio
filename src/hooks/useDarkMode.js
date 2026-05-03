import { useEffect, useState } from "react"

export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(false)

  // INIT: sync dari HTML + localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme")
    const html = document.documentElement

    if (saved === "dark" || (!saved && html.classList.contains("dark"))) {
      html.classList.add("dark")
      setIsDark(true)
    } else {
      html.classList.remove("dark")
      setIsDark(false)
    }
  }, [])

  const toggleDark = () => {
    const html = document.documentElement
    const next = !html.classList.contains("dark")

    if (next) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    }
  }

  return { isDark, toggleDark }
}