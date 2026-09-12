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
        pricelist: "Lihat Harga",
        cv: "Unduh CV",

        stats: [
            {
            value: "2+",
            title: "Tahun Pengalaman",
            subtitle: "Web Development",
            },
            {
            value: "15+",
            title: "Project Selesai",
            subtitle: "Website & Aplikasi",
            },
            {
            value: "10+",
            title: "Teknologi",
            subtitle: "Frontend & Backend",
            },
            {
            value: "100%",
            title: "Komitmen",
            subtitle: "Kualitas Terbaik",
            },
        ],
        onlineFor: "Website telah online selama",
        days: "Hari",
        hours: "Jam",
        minutes: "Menit",
        seconds: "Detik",
        since: "Sejak",
    },

    // Promo Jasa Skripsi
    layout: {
        promoLabel: "PROMO JASA",
        promoTitle: "Butuh Bantuan Skripsi?",
        promoDescription:
            "Selain pembuatan website, ite jua melayani jasa",
        proposal: "Proposal",
        skripsi: "Skripsi",
        jurnal: "Jurnal",
        ppt: "PPT Seminar",
        promoDescriptionEnd:
            "dait revisi dokumen akademik.",
        promoButton: "Lihat Detail Jasa",
    },

    pricelist: {
        badge: "Pilih Paket",
        // title: "Harga sederhana. Hasil maksimal.",
        subtitle:
            "Pilih paket yang sesuai dengan kebutuhan Anda. Setiap project juga dapat disesuaikan dengan kebutuhan khusus.",

        button: "Mulai Sekarang",
        popular: "Rekomendasi",
        normalPrice: "Harga Normal",

        note:
            "Harga merupakan harga mulai dan dapat berubah tergantung kompleksitas serta kebutuhan project.",

        tabs: {
            personal: "Personal",
            business: "Business",
        },

        plans: {
            personal: [
            {
                name: "Paket Basic",
                price: "Rp 199.000",
                oldPrice: "Rp 499.000",
                description:
                    "Website personal, CV online, portofolio, atau Brand static.",

                whatsappMessage:
                    "Halo Warsa, saya tertarik dengan Paket Basic seharga Rp 199.000. Saya ingin mengetahui detail dan cara pemesanannya.",

                features: [
                    "Custom Subdomain",
                    "Hosting",
                    "Responsive",
                    "1 Halaman",
                    "Basic SEO",
                    "Deployment",
                    "Penyimpanan 1GB",
                    "RAM 512MB",
                ],
            },

            {
                name: "Paket Pro",
                price: "Rp 1.999.000",
                oldPrice: "Rp 2.499.000",
                description:
                    "Website profesional dengan fitur lengkap, dan menggunakan database.",

                popular: true,

                whatsappMessage:
                    "Halo Warsa, saya tertarik dengan Paket Pro seharga Rp 1.999.000. Saya ingin mengetahui detail fitur dan cara pemesanannya.",

                features: [
                    "Custom Domain",
                    "Responsive Design",
                    "Hosting",
                    "Database MySQL & PostgreSQL",
                    "SEO",
                    "Deployment",
                    "Penyimpanan 10GB",
                    "RAM 1GB",
                ],
            },

            {
                name: "Personal Custom",
                price: "Rp 2.999.000",
                oldPrice: "Rp 3.999.000",
                description:
                    "Website personal sesuai kebutuhan dan dukungan teknis.",

                whatsappMessage:
                    "Halo Warsa, saya tertarik dengan Personal Custom seharga Rp 2.999.000. Saya ingin berkonsultasi mengenai kebutuhan website saya.",

                features: [
                    "Custom Design",
                    "Unlimited Section",
                    "React",
                    "Optimasi",
                    "SEO",
                    "Database MySQL & PostgreSQL",
                    "Deployment",
                    "Penyimpanan 20GB",
                    "RAM 2GB",
                ],
            },
        ],

            business: [
            {
                name: "Business Starter",
                price: "Rp 2.999.000",
                oldPrice: "Rp 3.999.000",

                description:
                    "Website company profile profesional, untuk bisnis kecil.",

                whatsappMessage:
                    "Halo Warsa, saya tertarik dengan Business Starter seharga Rp 2.999.000. Saya ingin mengetahui detail dan cara pemesanannya.",

                features: [
                    "Custom Domain",
                    "Hosting",
                    "5 Halaman",
                    "WhatsApp",
                    "Google Maps",
                    "SEO",
                    "Database MySQL & PostgreSQL",
                    "Deployment",
                    "Penyimpanan 10GB",
                    "RAM 1GB",
                ],
            },

            {
                name: "Business Pro",
                price: "Rp 4.999.000",
                oldPrice: "Rp 5.999.000",

                popular: true,

                description:
                    "Website bisnis dengan dashboard admin, untuk bisnis menengah.",

                whatsappMessage:
                    "Halo Warsa, saya tertarik dengan Business Pro seharga Rp 4.999.000. Saya ingin mengetahui detail fitur dan cara pemesanannya.",

                features: [
                    "Dashboard",
                    "Login Admin",
                    "Database MySQL & PostgreSQL",
                    "React + Laravel",
                    "Deployment",
                    "Penyimpanan 50GB",
                    "RAM 16GB",
                ],
            },

            {
                name: "Enterprise",
                price: "Custom",

                description:
                    "Aplikasi web sesuai kebutuhan perusahaan, untuk bisnis besar.",

                whatsappMessage:
                    "Halo Warsa, saya tertarik dengan paket Enterprise. Saya ingin berkonsultasi mengenai kebutuhan aplikasi web untuk perusahaan saya.",

                features: [
                    "Custom domain, subdomain, dan SSL",
                    "Unlimited Fitur",
                    "Database MySQL & PostgreSQL",
                    "API Integration",
                    "Authentication",
                    "Role Management",
                    "Custom design & UI/UX",
                    "Custom optimasi & SEO",
                    "Customer support 24/7 & maintenance selama 1 tahun",
                    "Deployment",
                    "Penyimpanan 100GB",
                    "RAM 32GB",
                ],
            },
        ],
        },
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