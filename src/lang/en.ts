import project1 from "@/assets/images/project1.png";
import project2 from "@/assets/images/project2.png";
import project3 from "@/assets/images/project3.png";

export const en = {
    // nav
    navbar: {
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
    },
    // hero
    hero: {
        available: "Available for new projects",
        title: "Hi, I'm",
        subtitle: "Fullstack Developer & UI/UX Designer",
        desc: "Building stable, functional, and aesthetic digital solutions with a focus on React and Laravel. Open to website development services and collaborations.",
        contact: "Get in Touch",
        cv: "Download CV",
    },
    // experiece
    experience: {
        title: "Experience & Education",
        items: [
        {
            year: "2024 — Present",
            title: "Frontend Developer (Freelance)",
            company: "Tech Solutions Corp",
            description: "Built multi-tenant POS dashboard using React & Laravel.",
            color: "bg-emerald-500",
        },
        {
            year: "2022 — 2023",
            title: "Junior Web Developer",
            company: "Creative Agency",
            description: "Developed responsive UI and API integration.",
            color: "bg-blue-500",
        },
        {
            year: "2020 — 2024",
            title: "Bachelor of Islamic Education Management",
            company: "STIT Palapa Nusantara",
            description: "GPA: 3.32/4.00",
            color: "bg-purple-500",
        },
        ],
    },

    // footer
    footer: {
        home: "Home",
        about: "About",
        skills: "Skills",
        projects: "Projects",
        contact: "Contact",
        tagline: "Building digital excellence.",
        copyright: "© {year} Warsa. All rights reserved.",
    },

    // project
    projects: {
        title: "Portfolio Projects",
        subtitle: "Some of the best projects I've worked on",
        featured: "Featured",
        liveDemo: "Live Demo",
        github: "GitHub",
        items: [
        {
            title: "Cashier Platform (POS)",
            desc: "Modern POS platform with full features including payment gateway, admin dashboard, and real-time inventory.",
            image: project1,
            tech: ["React", "Laravel", "MySQL"],
            featured: true,
        },
        {
            title: "Analytics Dashboard",
            desc: "Enterprise analytics dashboard with real-time data visualization, custom charts, and multi-tenant support.",
            image: project2,
            tech: ["React", "TypeScript", "Chart.js"],
            featured: true,
        },
        {
            title: "SaaS Project Management",
            desc: "SaaS application for project management with Kanban features, time tracking, and team collaboration.",
            image: project3,
            tech: ["Laravel", "MySQL", "Tailwind"],
            featured: true,
        },
        ],
    },
    // skill
    skills: {
        title: "Skills & Technologies",
        subtitle: "Technologies & languages I have mastered",
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
    // contact
    contact: {
        title: "Let's Collaborate",
        subtitle: "Have an interesting project? Send a message, I'll get back to you soon.",
        namePlaceholder: "Full Name",
        emailPlaceholder: "Email",
        phonePlaceholder: "Phone Number",
        messagePlaceholder: "Write your message",
        button: "Send Message →",
        social: "Social Media",
        emailLabel: "Email",
        whatsappLabel: "WhatsApp"
    },
    // about
    about: {
        title: "About Me",
        subtitle: "Fullstack Developer with 2+ years of experience in building scalable web and mobile applications.",
        description1: "Hello! I'm <span class='font-semibold text-amber-500'>Wahyu</span>, a Fullstack Developer passionate about creating impactful digital solutions. I combine beautiful design with efficient code to deliver exceptional user experiences.",
        description2: "I specialize in <span class='font-semibold bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded-lg text-amber-700 dark:text-amber-300'>React, Laravel</span> and am always up-to-date with the latest technology trends.",
        email: "Email",
        location: "Location",
        experience: "Experience",
        language: "Languages",
        locationValue: "West Nusa Tenggara, Indonesia",
        experienceValue: "2+ Years",
        languageValue: "ID, EN",
        skillsTitle: "Core Expertise",
        skillItems: [
        { name: "Frontend Development", width: "75%" },
        { name: "Backend Development", width: "80%" },
        { name: "UI/UX Design", width: "60%" },
        ]
    },
};