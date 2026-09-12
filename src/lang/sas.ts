import project1 from "@/assets/images/project1.png";
import project2 from "@/assets/images/project2.png";
import project3 from "@/assets/images/project3.png";

export const sas = {
  // Navigasi
  navbar: {
    home: 'Beranda',
    about: 'Tentang',
    skills: 'Kemampuan',
    projects: 'Proyek',
    contact: 'Kontak',

    themeLight: "Mode Terang",
    themeDark: "Mode Peteng",
  },

  // Hero
  hero: {
    available: 'Sedië kanggo proyek baru',
    title: 'Halo, tiang',
    subtitle: 'Pengembang Fullstack & Desainer UI/UX',
    desc: 'Nggawe solusi digital saq kokoh, fungsional, dait estetik, fokus leq React dait Laravel. Bukaq kanggo jasa pembuatan website dait kerjasama.',
    contact: 'Hubungi Tiang',
    pricelist: 'Lihat Daftar Harga',
    cv: 'Unduh CV',

    stats: [
      {
        value: '2+',
        title: 'Taun Pengalaman',
        subtitle: 'Pengembangan Web',
      },
      {
        value: '15+',
        title: 'Proyek Saq Wah selese',
        subtitle: 'Website dait Aplikasi',
      },
      {
        value: '10+',
        title: 'Teknologi',
        subtitle: 'Frontend dait Backend',
      },
      {
        value: '100%',
        title: 'Komitmen',
        subtitle: 'Kualitas Saq Solah',
      },
    ],
    onlineFor: 'Website sampun online selame',
    days: 'Jelo',
    hours: 'Jam',
    minutes: 'Menit',
    seconds: 'Detik',
    since: 'Saking',
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

  // Daftar Harga
    pricelist: {
      badge: "Pilih Paket",
      // title: "Daftar Harga Jasa Pembuatan Website",
      subtitle:
          "Pilih paket saq paling cocok kadu kebutuhan side. Tiap project ite tetep bisa disesuaike kadu kebutuhan khusus.",

      button: "Mulai Jaq",
      popular: "Rekomendasi",
      normalPrice: "Harga Normal",

      note:
          "Harga niki harga awal dait bisa berubah tergantung kompleksitas dait kebutuhan project.",

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
                "Website personal, CV online, portofolio, atawa brand static.",
            whatsappMessage:
                "Halo Warsa, tiang tertarik kadu Paket Basic seharga Rp 199.000. Tiang ingin mengetahui detail dait cara pemesanannya.",
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
                "Website profesional saq fitur lengkap dait menggunakan database.",
            popular: true,
            whatsappMessage:
                "Halo Warsa, tiang tertarik kadu Paket Pro seharga Rp 1.999.000. Tiang ingin mengetahui detail fitur dait cara pemesanannya.",
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
                "Website personal saq disesuaike kadu kebutuhan side dait dukungan teknis.",
            whatsappMessage:
                "Halo Warsa, tiang tertarik kadu Personal Custom seharga Rp 2.999.000. Tiang ingin konsultasi mengenai kebutuhan website tiang.",
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
                "Website company profile profesional kanggo bisnis kecil.",
            whatsappMessage:
                "Halo Warsa, tiang tertarik kadu Business Starter seharga Rp 2.999.000. Tiang ingin mengetahui detail dait cara pemesanannya.",
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
                "Website bisnis kadu dashboard admin, kanggo bisnis menengah.",
            whatsappMessage:
                "Halo Warsa, tiang tertarik kadu Business Pro seharga Rp 4.999.000. Tiang ingin mengetahui detail fitur dait cara pemesanannya.",
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
                "Aplikasi web saq disesuaike kadu kebutuhan perusahaan, kanggo bisnis besar.",
            whatsappMessage:
                "Halo Warsa, tiang tertarik kadu paket Enterprise. Tiang ingin konsultasi mengenai kebutuhan aplikasi web kanggo perusahaan tiang dait mengetahui detail paketnya.",
            features: [
                "Custom domain, subdomain, dait SSL sesuai kebutuhan perusahaan",
                "Unlimited Fitur",
                "Database MySQL & PostgreSQL",
                "API Integration",
                "Authentication",
                "Role Management",
                "Custom Design & UI/UX",
                "Custom Optimasi & SEO",
                "Customer Support 24/7 & Maintenance selama 1 tahun",
                "Deployment",
                "Penyimpanan 100GB",
                "RAM 32GB",
            ],
          },
        ],
      },
  },
  // Pengalaman
  experience: {
    title: 'Pengalaman & Pendidikan',
    items: [
      {
        year: '2024 - saiki',
        title: 'Pengembang Frontend (Freelance)',
        company: 'Perusahaan Solusi Teknologi',
        description: 'Nggawe dashboard POS multi-tenant kadu React & Laravel.',
        color: 'bg-emerald-500',
      },
      {
        year: '2019 - 2021',
        title: 'Junior Web Developer',
        company: 'Agensi Kreatif',
        description: 'Ngembangin UI responsif dait integrasi API.',
        color: 'bg-blue-500',
      },
      {
        year: '2020 - 2024',
        title: 'Sarjana Manajemen Pendidikan Islam',
        company: 'STIT Palapa Nusantara',
        description: 'IPK: 3.32/4.00',
        color: 'bg-purple-500',
      },
    ],
  },

  // Footer
  footer: {
    home: 'Beranda',
    about: 'Tentang',
    skills: 'Kemampuan',
    projects: 'Proyek',
    contact: 'Kontak',
    tagline: 'Nggawe keunggulan digital.',
    copyright: '© {year} Warsa. Sak irup dilindungi.',
  },

  // Proyek
  projects: {
    title: 'Proyek Portofolio',
    subtitle: 'Sekeq-sekeq proyek paling solah saq tiang wah piak',
    featured: 'Unggulan',
    liveDemo: 'Demo Langsung',
    github: 'GitHub',
    items: [
      {
        title: 'Platform Kasir (POS)',
        desc: 'Platform POS modern dait fitur lengkap termasuk gateway pembayaran, dashboard admin, dait inventaris realtime.',
        image: project1,
        tech: ['React', 'Laravel', 'MySQL'],
        featured: true,
      },
      {
        title: 'Dashboard Analitik',
        desc: 'Dashboard analitik perusahaan dait visualisasi data real-time, grafik kustom, dait dukungan multi-tenant.',
        image: project2,
        tech: ['React', 'TypeScript', 'Chart.js'],
        featured: true,
      },
      {
        title: 'Manajemen Proyek SaaS',
        desc: 'Aplikasi SaaS kanggo manajemen proyek dait fitur Kanban, pelacakan waktu, dait kolaborasi tim.',
        image: project3,
        tech: ['Laravel', 'MySQL', 'Tailwind'],
        featured: true,
      },
    ],
  },

  // Skills
  skills: {
    title: 'Keahlian & Teknologi',
    subtitle: 'Teknologi & bahasa saq tiang kuasai',
    items: [
      { name: 'HTML5', desc: 'Markup' },
      { name: 'CSS3', desc: 'Styling' },
      { name: 'JavaScript', desc: 'Core' },
      { name: 'TypeScript', desc: 'Typed JS' },
      { name: 'React', desc: 'Frontend' },
      { name: 'Laravel', desc: 'Backend' },
      { name: 'Tailwind', desc: 'CSS Framework' },
      { name: 'PHP', desc: 'Server Side' },
      { name: 'MySQL', desc: 'Database' },
      { name: 'Git', desc: 'Version Control' },
    ],
  },

  // Kontak
  contact: {
    title: 'Ayo Kolaborasi',
    subtitle: 'Punyaq proyek menarik? Kirim pesan, tiang gen bales cepat.',
    namePlaceholder: 'Aran Lengkap',
    emailPlaceholder: 'Email',
    phonePlaceholder: 'Nomor Telepon',
    messagePlaceholder: 'Tulis pesan side',
    button: 'Kirim Pesan →',
    social: 'Media Sosial',
    emailLabel: 'Email',
    whatsappLabel: 'WhatsApp',
  },

  // Tentang
  about: {
    title: 'Tentang Tiang',
    subtitle: 'Pengembang Fullstack dait pengalaman 2+ tahun leq pengembangan aplikasi web dait mobile saq scalable.',
    description1: 'Halo! Tiang Wahyu, Pengembang Fullstack saq semangat gati leq nggawe solusi digital saq bermakna. Tiang gabungang desain saq bagus dait kode saq efisien kanggo pengalaman user saq luar biasa.',
    description2: 'Tiang spesialis leq React, Laravel dait selalu update dait tren teknologi paling baru.',
    email: 'Email',
    location: 'Lokasi',
    experience: 'Pengalaman',
    language: 'Bahasa',
    locationValue: 'Nusa Tenggara Barat, Indonesia',
    experienceValue: '2+ Tahun',
    languageValue: 'Sasak, Indonesia, English',
    skillsTitle: 'Keahlian Utama',
    skillItems: [
      { name: 'Frontend Development', width: '75%' },
      { name: 'Backend Development', width: '80%' },
      { name: 'UI/UX Design', width: '60%' },
    ],
  },
};