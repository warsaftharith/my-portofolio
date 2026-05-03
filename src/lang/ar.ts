import project1 from "@/assets/images/project1.png";
import project2 from "@/assets/images/project2.png";
import project3 from "@/assets/images/project3.png";

export const ar = {
    // nav
    navbar: {
        home: "الرئيسية",
        about: "حول",
        skills: "المهارات",
        projects: "المشاريع",
        contact: "اتصل",
    },

    // hero
    hero: {
        available: "متاح لمشروع جديد",
        title: "مرحباً، أنا",
        subtitle: "مطور Fullstack ومصمم UI/UX",
        desc: "أبني حلولاً رقمية مستقرة وعملية وجمالية مع التركيز على React و Laravel. متاح لتنفيذ مواقع الويب والتعاون.",
        contact: "تواصل معي",
        cv: "تحميل السيرة الذاتية",
    },

    // experience
    experience: {
        title: "الخبرات والتعليم",
        items: [
        {
            year: "2024 - حتى الآن",
            title: "مطور واجهات أمامية (عمل حر)",
            company: "شركة حلول التكنولوجيا",
            description: "بناء لوحة تحكم POS متعددة المستأجرين باستخدام React و Laravel.",
            color: "bg-emerald-500",
        },
        {
            year: "2019 — 2021",
            title: "مطور ويب مبتدئ",
            company: "وكالة إبداعية",
            description: "تطوير واجهات مستخدم متجاوبة وربط واجهات برمجية (API).",
            color: "bg-blue-500",
        },
        {
            year: "2020 — 2024",
            title: "بكالوريوس في إدارة التربية الإسلامية",
            company: "STIT Palapa Nusantara",
            description: "المعدل التراكمي: 3.32 / 4.00",
            color: "bg-purple-500",
        },
        ],
    },

    // footer
    footer: {
        home: "الرئيسية",
        about: "حول",
        skills: "المهارات",
        projects: "المشاريع",
        contact: "اتصل",
        tagline: "بناء التميز الرقمي.",
        copyright: "© {year} Warsa. جميع الحقوق محفوظة.",
    },

    // projects
    projects: {
        title: "مشاريع المحفظة",
        subtitle: "بعض أفضل المشاريع التي قمت بتنفيذها",
        featured: "مميز",
        liveDemo: "عرض مباشر",
        github: "GitHub",
        items: [
        {
            title: "نظام نقاط البيع (POS)",
            desc: "منصة POS حديثة بميزات متكاملة تشمل بوابة الدفع ولوحة تحكم إدارية وإدارة المخزون في الوقت الحقيقي.",
            image: project1,
            tech: ["React", "Laravel", "MySQL"],
            featured: true,
        },
        {
            title: "لوحة تحليلات البيانات",
            desc: "لوحة تحكم تحليلية مع تصور بيانات مباشر ورسوم بيانية مخصصة ودعم تعدد المستأجرين.",
            image: project2,
            tech: ["React", "TypeScript", "Chart.js"],
            featured: true,
        },
        {
            title: "نظام إدارة المشاريع SaaS",
            desc: "تطبيق SaaS لإدارة المشاريع يتضمن لوحة كانبان وتتبع الوقت والتعاون بين الفرق.",
            image: project3,
            tech: ["Laravel", "MySQL", "Tailwind"],
            featured: true,
        },
        ],
    },

    // skills
    skills: {
        title: "المهارات والتقنيات",
        subtitle: "التقنيات واللغات التي أتقنها",
        items: [
        { name: "HTML5", desc: "ترميز" },
        { name: "CSS3", desc: "تصميم" },
        { name: "JavaScript", desc: "الأساس" },
        { name: "TypeScript", desc: "JavaScript بأنواع" },
        { name: "React", desc: "واجهة أمامية" },
        { name: "Laravel", desc: "الواجهة الخلفية" },
        { name: "Tailwind", desc: "إطار CSS" },
        { name: "PHP", desc: "خادم" },
        { name: "MySQL", desc: "قاعدة بيانات" },
        { name: "Git", desc: "إدارة الإصدارات" },
        ],
    },

    // contact
    contact: {
        title: "لنتعاون معاً",
        subtitle: "لديك مشروع مثير؟ أرسل رسالة وسأرد عليك سريعاً.",
        namePlaceholder: "الاسم الكامل",
        emailPlaceholder: "البريد الإلكتروني",
        phonePlaceholder: "رقم الهاتف",
        messagePlaceholder: "اكتب رسالتك",
        button: "إرسال →",
        social: "وسائل التواصل",
        emailLabel: "البريد الإلكتروني",
        whatsappLabel: "واتساب"
    },

    // about
    about: {
        title: "عني",
        subtitle: "مطور Fullstack مع أكثر من سنتين من الخبرة في بناء تطبيقات ويب وموبايل قابلة للتوسع.",
        description1: "مرحباً! أنا <span class='font-semibold text-amber-500'>Wahyu</span>، مطور Fullstack شغوف ببناء حلول رقمية ذات معنى. أدمج بين التصميم الجميل والكود الفعال لتقديم تجربة مستخدم مميزة.",
        description2: "أنا متخصص في React و Laravel وأتابع دائماً أحدث التقنيات.",
        email: "البريد الإلكتروني",
        location: "الموقع",
        experience: "الخبرة",
        language: "اللغات",
        locationValue: "نوسا تنقارا الغربية، إندونيسيا",
        experienceValue: "أكثر من سنتين",
        languageValue: "الإندونيسية، الإنجليزية",
        skillsTitle: "المهارات الأساسية",
        skillItems: [
        { name: "تطوير الواجهة الأمامية", width: "75%" },
        { name: "تطوير الخلفية", width: "80%" },
        { name: "تصميم UI/UX", width: "60%" },
        ]
    },
};
