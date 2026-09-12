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

        themeLight: "Light Mode",
        themeDark: "Dark Mode",
    },
    // hero
    hero: {
        available: "Available for new projects",
        title: "Hi, I'm",
        subtitle: "Fullstack Developer & UI/UX Designer",
        desc: "Building stable, functional, and aesthetic digital solutions with a focus on React and Laravel. Open to website development services and collaborations.",
        contact: "Get in Touch",
        pricelist: "View Pricelist",
        cv: "Download CV",

        stats: [
            {
                value: "2+",
                title: "Years Experience",
                subtitle: "Web Development",
            },
            {
                value: "15+",
                title: "Projects Completed",
                subtitle: "Websites & Applications",
            },
            {
                value: "10+",
                title: "Technologies",
                subtitle: "Frontend & Backend",
            },
            {
                value: "100%",
                title: "Commitment",
                subtitle: "Best Quality",
            },
        ],
        onlineFor: "Website has been online for",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        since: "Since",
    },

    // Promo Jasa Skripsi
    layout: {
        promoLabel: "PROMO SERVICES",
        promoTitle: "Need Thesis Assistance?",
        promoDescription:
            "Besides website development, we also offer thesis writing services.",
        proposal: "Proposal",
        skripsi: "Thesis",
        jurnal: "Journal",
        ppt: "Seminar PPT",
        promoDescriptionEnd:
            "and academic document revision.",
        promoButton: "View Service Details",
    },

    pricelist: {
        badge: "Choose Your Plan",
        // title: "Simple Pricing. Powerful Results.",
        subtitle:
            "Choose the package that best fits your needs. Every project can also be customized to your specific requirements.",

        button: "Get Started",
        popular: "Recommended",
        normalPrice: "Regular Price",

        note:
            "Prices are starting rates and may vary depending on project scope, complexity, and requirements.",

        tabs: {
            personal: "Personal",
            business: "Business",
        },

        plans: {
            personal: [
                {
                    name: "Basic Package",
                    price: "$49",
                    oldPrice: "$99",
                    description:
                        "A personal website, online resume, portfolio, or static brand website.",

                    whatsappMessage:
                        "Hello Warsa, I'm interested in the Basic Package priced at $49. I'd like to know more about the details and ordering process.",

                    features: [
                        "Custom Subdomain",
                        "Hosting Included",
                        "Responsive Design",
                        "1 Page",
                        "Basic SEO",
                        "Deployment",
                        "1 GB Storage",
                        "512 MB RAM",
                    ],
                },

                {
                    name: "Pro Package",
                    price: "$249",
                    oldPrice: "$329",
                    description:
                        "A professional website with advanced features and database support.",

                    popular: true,

                    whatsappMessage:
                        "Hello Warsa, I'm interested in the Pro Package priced at $249. I'd like to know more about the features and ordering process.",

                    features: [
                        "Custom Domain",
                        "Responsive Design",
                        "Hosting Included",
                        "MySQL & PostgreSQL Database",
                        "SEO Optimization",
                        "Deployment",
                        "10 GB Storage",
                        "1 GB RAM",
                    ],
                },

                {
                    name: "Custom Personal",
                    price: "$399",
                    oldPrice: "$499",
                    description:
                        "A fully customized personal website tailored to your needs with technical support.",

                    whatsappMessage:
                        "Hello Warsa, I'm interested in the Custom Personal Package priced at $399. I'd like to discuss my website requirements.",

                    features: [
                        "Custom Design",
                        "Unlimited Sections",
                        "React",
                        "Performance Optimization",
                        "SEO",
                        "MySQL & PostgreSQL Database",
                        "Deployment",
                        "20 GB Storage",
                        "2 GB RAM",
                    ],
                },
            ],

            business: [
                {
                    name: "Business Starter",
                    price: "$399",
                    oldPrice: "$499",
                    description:
                        "A professional company profile website for small businesses.",

                    whatsappMessage:
                        "Hello Warsa, I'm interested in the Business Starter Package priced at $399. I'd like to know more about the details and ordering process.",

                    features: [
                        "Custom Domain",
                        "Hosting Included",
                        "Up to 5 Pages",
                        "WhatsApp Integration",
                        "Google Maps",
                        "SEO Optimization",
                        "MySQL & PostgreSQL Database",
                        "Deployment",
                        "10 GB Storage",
                        "1 GB RAM",
                    ],
                },

                {
                    name: "Business Pro",
                    price: "$699",
                    oldPrice: "$799",
                    popular: true,
                    description:
                        "A business website with an admin dashboard for growing companies.",

                    whatsappMessage:
                        "Hello Warsa, I'm interested in the Business Pro Package priced at $699. I'd like to know more about the features and ordering process.",

                    features: [
                        "Admin Dashboard",
                        "Admin Login",
                        "MySQL & PostgreSQL Database",
                        "React + Laravel",
                        "Deployment",
                        "50 GB Storage",
                        "16 GB RAM",
                    ],
                },

                {
                    name: "Enterprise",
                    price: "Custom Quote",
                    description:
                        "A fully customized web application designed for enterprise-level businesses.",

                    whatsappMessage:
                        "Hello Warsa, I'm interested in the Enterprise Package. I'd like to discuss my company's web application requirements.",

                    features: [
                        "Custom Domain & SSL",
                        "Unlimited Features",
                        "MySQL & PostgreSQL Database",
                        "API Integration",
                        "Authentication",
                        "Role Management",
                        "Custom UI/UX Design",
                        "Performance & SEO Optimization",
                        "1-Year Support & Maintenance",
                        "Deployment",
                        "100 GB Storage",
                        "32 GB RAM",
                    ],
                },
            ],
        },
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