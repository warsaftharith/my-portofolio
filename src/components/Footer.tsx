import { FaLinkedin } from "react-icons/fa";
import { SiTiktok, SiGithub } from "react-icons/si";
import { useLang } from "../context/LangContext";
import { en } from "../lang/en";
import { id } from "../lang/id";
import { jp } from "../lang/jp";
import { ar } from "../lang/ar";

const Footer = () => {
  const { lang } = useLang();

  const translations = {
    en: en.footer,
    id: id.footer,
    jp: jp.footer,
    ar: ar.footer,
  };

  const t = translations[lang as keyof typeof translations];

  const socials = [
    {
      name: "GitHub",
      icon: <SiGithub />,
      url: "https://github.com/warsaftharith",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin />,
      url: "https://linkedin.com/in/lm-wahyu-akbar-sakti-182658360",
    },
    {
      name: "TikTok",
      icon: <SiTiktok />,
      url: "https://tiktok.com/@anak.kuliahan",
    },
  ];

  const menu = [
    { label: t.home, href: "#hero" },
    { label: t.about, href: "#about" },
    { label: t.skills, href: "#skills" },
    { label: t.projects, href: "#projects" },
    { label: t.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* TOP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* BRAND */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Warsa.dev
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              {t.tagline}
            </p>
          </div>

          {/* NAV */}
          <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {menu.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:text-emerald-500 transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* SOCIAL */}
          <div className="flex gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-xl 
                bg-slate-100 dark:bg-slate-900 
                border border-slate-200 dark:border-slate-800 
                text-slate-600 dark:text-slate-400 
                hover:bg-emerald-500 hover:text-white hover:border-emerald-500 
                transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-200 dark:border-slate-800 my-8"></div>

        {/* BOTTOM */}
        <div className="text-center text-sm text-slate-500 dark:text-slate-400">
          {t.copyright.replace(
            "{year}",
            new Date().getFullYear().toString()
          )}
        </div>

      </div>
    </footer>
  );
};

export default Footer;