import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SiGithub, SiTiktok } from "react-icons/si";
import { HiOutlineMail, HiOutlineChatAlt2 } from "react-icons/hi";
import { FaLinkedin } from "react-icons/fa";
import { useLang } from "../context/LangContext";
import { en } from "../lang/en";
import { id } from "../lang/id";

// ================== VARIANTS ==================
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// Animasi dari Kiri ke Tengah
const slideLeft: Variants = {
  hidden: { opacity: 0, x: -100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// Animasi dari Kanan ke Tengah
const slideRight: Variants = {
  hidden: { opacity: 0, x: 100 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// ================== COMPONENT ==================
const Contact = () => {
  const { lang } = useLang();
  const t = lang === "en" ? en.contact : id.contact;

  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    const subject = encodeURIComponent(`Pesan dari ${form.name}`);
    const body = encodeURIComponent(`Nama: ${form.name}\nEmail: ${form.email}\nNomor: ${form.phone}\n\nPesan:\n${form.message}`);
    window.location.href = `mailto:warsabusiness@gmail.com?subject=${subject}&body=${body}`;
  };

  const socials = [
    { name: "GitHub", icon: <SiGithub />, url: "https://github.com/warsaftharith" },
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://linkedin.com/in/lm-wahyu-akbar-sakti-182658360" },
    { name: "TikTok", icon: <SiTiktok />, url: "https://tiktok.com/@anak.kuliahan" },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-950 transition-colors overflow-hidden">
        <div className="flex justify-center mb-10 sm:mb-12">
            <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent" />
        </div>
        <div className="max-w-6xl mx-auto">

            {/* HEADER */}
            <motion.div className="text-center mb-16" initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">
                {t.title}
            </motion.h2>
            <motion.p variants={fadeUp} className="text-lg text-slate-600 dark:text-slate-300">
                {t.subtitle}
            </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

            {/* FORM (Kiri ke Tengah) */}
            <motion.div
                variants={slideLeft}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800"
            >
                {/* ... isi form tetap sama ... */}
                <form onSubmit={handleSubmit} className="space-y-5">
                <input type="text" name="name" placeholder={t.namePlaceholder} required value={form.name} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input type="email" name="email" placeholder={t.emailPlaceholder} required value={form.email} onChange={handleChange} className="px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                    <input type="tel" name="phone" placeholder={t.phonePlaceholder} value={form.phone} onChange={handleChange} className="px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <textarea name="message" rows={4} value={form.message} placeholder={t.messagePlaceholder} required onChange={handleChange} className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                <button className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:scale-[1.02] transition"> {t.button} </button>
                </form>
            </motion.div>

            {/* INFO (Kanan ke Tengah) */}
            <motion.div
                variants={slideRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col justify-between"
            >
                {/* ... isi info tetap sama ... */}
                <div className="space-y-6">
                <a href="mailto:warsabusiness@gmail.com" className="flex items-center p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500 transition">
                    <div className="text-2xl mr-4 text-emerald-500"><HiOutlineMail /></div>
                    <div><p className="text-sm text-slate-500">{t.emailLabel}</p><p className="font-semibold text-slate-900 dark:text-white">warsabusiness@email.com</p></div>
                </a>
                <a href="https://wa.me/6287744586239" target="_blank" className="flex items-center p-4 rounded-2xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500 transition">
                    <div className="text-2xl mr-4 text-blue-500"><HiOutlineChatAlt2 /></div>
                    <div><p className="text-sm text-slate-500">{t.whatsappLabel}</p><p className="font-semibold text-slate-900 dark:text-white">+62 877-4458-6239</p></div>
                </a>
                </div>
                <div className="mt-10">
                <h3 className="font-semibold mb-4 text-slate-900 dark:text-white">{t.social}</h3>
                <div className="flex gap-4 text-xl">
                    {socials.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" className="w-12 h-12 flex items-center justify-center rounded-full border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-emerald-500 hover:text-white transition">
                        {s.icon}
                    </a>
                    ))}
                </div>
                </div>
            </motion.div>
            </div>
        </div>
    </section>
  );
};

export default Contact;