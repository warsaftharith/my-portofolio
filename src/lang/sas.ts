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
  },

  // Hero
  hero: {
    available: 'Sedië kanggo proyek baru',
    title: 'Halo, tiang',
    subtitle: 'Pengembang Fullstack & Desainer UI/UX',
    desc: 'Nggawe solusi digital saq kokoh, fungsional, dait estetik, fokus leq React dait Laravel. Bukaq kanggo jasa pembuatan website dait kerjasama.',
    contact: 'Hubungi Tiang',
    cv: 'Unduh CV',
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