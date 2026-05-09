import project1 from "@/assets/images/project1.png";
import project2 from "@/assets/images/project2.png";
import project3 from "@/assets/images/project3.png";

export const id = {
    // nav
    navbar: {
        home: "Beranda",
        about: "Tentang",
        skills: "Skill",
        projects: "Proyek",
        contact: "Kontak",

        themeLight: "Mode Terang",
        themeDark: "Mode Gelap",
    },
    // hero
    hero: {
        available: "Tersedia untuk project baru",
        title: "Halo, saya",
        subtitle: "Fullstack Developer & UI/UX Designer",
        desc: "Membangun solusi digital yang stabil, fungsional, dan estetis dengan fokus pada React dan Laravel. Terbuka untuk jasa pembuatan website dan kerja sama.",
        contact: "Hubungi Saya",
        cv: "Unduh CV",
    },
    // expreince
    experience: {
        title: "Pengalaman & Pendidikan",
        items: [
        {
            year: "2024 - sekarang",
            title: "Frontend Developer (Freelance)",
            company: "Perusahaan Solusi Teknologi",
            description: "Membangun dashboard POS multi-tenant menggunakan React & Laravel.",
            color: "bg-emerald-500",
        },
        {
            year: "2019 — 2021",
            title: "Junior Web Developer",
            company: "Agensi Kreatif",
            description: "Mengembangkan UI responsif dan integrasi API.",
            color: "bg-blue-500",
        },
        {
            year: "2020 — 2024",
            title: "Sarjana Manajmen Pendidikan Islam",
            company: "STIT Palapa Nusantara",
            description: "IPK: 3.32/4.00",
            color: "bg-purple-500",
        },
        ],
    },
    //footer
    footer: {
        home: "Beranda",
        about: "Tentang",
        skills: "Skill",
        projects: "Proyek",
        contact: "Kontak",
        tagline: "Membangun keunggulan digital.",
        copyright: "© {year} Warsa. Semua hak dilindungi.",
    },
    //project
    projects: {
        title: "Proyek Portofolio",
        subtitle: "Beberapa proyek terbaik yang pernah saya kerjakan",
        featured: "Unggulan",
        liveDemo: "Demo Langsung",
        github: "GitHub",
        items: [
        {
            title: "Platform Kasir (POS)",
            desc: "Platform POS modern dengan fitur lengkap termasuk gateway pembayaran, dasbor admin, dan inventaris realtime.",
            image: project1,
            tech: ["React", "Laravel", "MySQL"],
            featured: true,
        },
        {
            title: "Dashboard Analitik",
            desc: "Dashboard analitik perusahaan dengan visualisasi data real-time, grafik kustom, dan dukungan multi-tenant.",
            image: project2,
            tech: ["React", "TypeScript", "Chart.js"],
            featured: true,
        },
        {
            title: "Manajemen Proyek SaaS",
            desc: "Aplikasi SaaS untuk manajemen proyek dengan fitur Kanban, pelacakan waktu, dan kolaborasi tim.",
            image: project3,
            tech: ["Laravel", "MySQL", "Tailwind"],
            featured: true,
        },
        ],
    },
    //skill
    skills: {
        title: "Keahlian & Teknologi",
        subtitle: "Teknologi & bahasa yang saya kuasai",
        items: [
        { name: "HTML5", desc: "Markup" },
        { name: "CSS3", desc: "Styling" },
        { name: "JavaScript", desc: "Core" },
        { name: "TypeScript", desc: "Typed JS" },
        { name: "React", desc: "Frontend" },
        { name: "Laravel", desc: "Backend" },
        { name: "Tailwind", desc: "CSS Framework" },
        { name: "PHP", desc: "Server Side" },
        { name: "MySQL", desc: "Database" },
        { name: "Git", desc: "Version Control" },
        ],
    },
    //kontak
    contact: {
        title: "Mari Berkolaborasi",
        subtitle: "Punya project menarik? Kirim pesan, saya akan segera membalasnya.",
        namePlaceholder: "Nama Lengkap",
        emailPlaceholder: "Email",
        phonePlaceholder: "Nomor Telepon",
        messagePlaceholder: "Tulis pesan anda",
        button: "Kirim Pesan →",
        social: "Media Sosial",
        emailLabel: "Email",
        whatsappLabel: "WhatsApp"
    },
    //tentang
    about: {
        title: "Tentang Saya",
        subtitle: "Fullstack Developer dengan 2+ tahun pengalaman dalam membangun aplikasi web dan mobile yang scalable.",
        description1: "Halo! Saya <span class='font-semibold text-amber-500'>Wahyu</span>, Fullstack Developer yang penuh semangat dalam menciptakan solusi digital yang bermakna. Saya menggabungkan desain yang indah dengan kode yang efisien untuk menghasilkan pengalaman user yang luar biasa.",
        description2: "Saya spesialis dalam <span class='font-semibold bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded-lg text-amber-700 dark:text-amber-300'>React, Laravel</span> dan selalu up-to-date dengan tren teknologi terbaru.",
        email: "Email",
        location: "Lokasi",
        experience: "Pengalaman",
        language: "Bahasa",
        locationValue: "Nusa Tenggara Barat, Indonesia",
        experienceValue: "2+ Tahun",
        languageValue: "ID, EN",
        skillsTitle: "Keahlian Utama",
        skillItems: [
        { name: "Frontend Development", width: "75%" },
        { name: "Backend Development", width: "80%" },
        { name: "UI/UX Design", width: "60%" },
        ]
    },
};