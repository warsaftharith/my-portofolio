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

        themeLight: "الوضع الفاتح",
        themeDark: "الوضع الداكن",
    },

    // hero
    hero: {
        available: "متاح للمشاريع الجديدة",
        title: "مرحباً، أنا",
        subtitle: "مطور Fullstack ومصمم UI/UX",
        desc: "أبني حلولاً رقمية مستقرة وعملية وجذابة مع التركيز على React وLaravel. متاح لتطوير مواقع الويب والتعاون في المشاريع.",
        contact: "تواصل معي",
        pricelist: "عرض الأسعار",
        cv: "تحميل السيرة الذاتية",

        stats: [
            {
                value: "2+",
                title: "سنوات من الخبرة",
                subtitle: "تطوير الويب",
            },
            {
                value: "15+",
                title: "مشروعاً مكتملًا",
                subtitle: "مواقع وتطبيقات",
            },
            {
                value: "10+",
                title: "تقنيات",
                subtitle: "Frontend وBackend",
            },
            {
                value: "100%",
                title: "التزام",
                subtitle: "أفضل جودة",
            },
        ],
        onlineFor: "الموقع على الإنترنت منذ",
        days: "أيام",
        hours: "ساعات",
        minutes: "دقائق",
        seconds: "ثواني",
        since: "منذ",
    },

    // Promo Jasa Skripsi
    layout: {
        promoLabel: "عرض خدمات",

        promoTitle: "هل تحتاج إلى مساعدة في رسالة التخرج؟",

        promoDescription:
            "بالإضافة إلى تصميم وتطوير المواقع الإلكترونية، نقدم أيضًا خدمات",

        proposal: "المقترح البحثي",

        skripsi: "رسالة التخرج",

        jurnal: "البحث العلمي",

        ppt: "عرض تقديمي",

        promoDescriptionEnd:
            "بالإضافة إلى مراجعة وتعديل الوثائق الأكاديمية.",

        promoButton: "عرض تفاصيل الخدمات",
    },

    pricelist: {
        badge: "اختر الباقة",
        // title: "أسعار بسيطة. نتائج مميزة.",
        subtitle:
            "اختر الباقة التي تناسب احتياجاتك، ويمكن أيضًا تخصيص كل مشروع وفقًا لمتطلباتك.",

        button: "ابدأ الآن",
        popular: "موصى به",
        normalPrice: "السعر العادي",

        note:
            "الأسعار المذكورة هي أسعار ابتدائية وقد تختلف حسب حجم المشروع وتعقيده ومتطلباته.",

        tabs: {
            personal: "شخصي",
            business: "الأعمال",
        },

        plans: {
            personal: [
                {
                    name: "الباقة الأساسية",
                    price: "199 ر.س",
                    oldPrice: "399 ر.س",
                    description:
                        "موقع شخصي أو سيرة ذاتية أو معرض أعمال أو علامة تجارية ثابتة.",

                    whatsappMessage:
                        "مرحباً Warsa، أنا مهتم بالباقة الأساسية بسعر 199 ر.س. أود معرفة المزيد من التفاصيل وطريقة الطلب.",

                    features: [
                        "نطاق فرعي مخصص",
                        "استضافة",
                        "تصميم متجاوب",
                        "صفحة واحدة",
                        "تحسين SEO الأساسي",
                        "النشر",
                        "مساحة تخزين 1 جيجابايت",
                        "ذاكرة RAM ‏512 ميجابايت",
                    ],
                },

                {
                    name: "الباقة الاحترافية",
                    price: "999 ر.س",
                    oldPrice: "1,299 ر.س",
                    description:
                        "موقع احترافي متكامل مع قاعدة بيانات وميزات متقدمة.",

                    popular: true,

                    whatsappMessage:
                        "مرحباً Warsa، أنا مهتم بالباقة الاحترافية بسعر 999 ر.س. أود معرفة المزيد عن الميزات وطريقة الطلب.",

                    features: [
                        "نطاق مخصص",
                        "تصميم متجاوب",
                        "استضافة",
                        "قاعدة بيانات MySQL و PostgreSQL",
                        "تحسين SEO",
                        "النشر",
                        "مساحة تخزين 10 جيجابايت",
                        "ذاكرة RAM ‏1 جيجابايت",
                    ],
                },

                {
                    name: "الباقة الشخصية المخصصة",
                    price: "1,499 ر.س",
                    oldPrice: "1,999 ر.س",
                    description:
                        "موقع شخصي مخصص بالكامل مع تصميم ودعم فني حسب الطلب.",

                    whatsappMessage:
                        "مرحباً Warsa، أنا مهتم بالباقة الشخصية المخصصة بسعر 1,499 ر.س. أود مناقشة متطلبات الموقع الخاص بي.",

                    features: [
                        "تصميم مخصص",
                        "عدد غير محدود من الأقسام",
                        "React",
                        "تحسين الأداء",
                        "SEO",
                        "قاعدة بيانات MySQL و PostgreSQL",
                        "النشر",
                        "مساحة تخزين 20 جيجابايت",
                        "ذاكرة RAM ‏2 جيجابايت",
                    ],
                },
            ],

            business: [
                {
                    name: "باقة الأعمال الأساسية",
                    price: "1,499 ر.س",
                    oldPrice: "1,999 ر.س",
                    description:
                        "موقع احترافي للتعريف بالشركات والأعمال الصغيرة.",

                    whatsappMessage:
                        "مرحباً Warsa، أنا مهتم بباقة الأعمال الأساسية بسعر 1,499 ر.س. أود معرفة المزيد من التفاصيل وطريقة الطلب.",

                    features: [
                        "نطاق مخصص",
                        "استضافة",
                        "5 صفحات",
                        "تكامل واتساب",
                        "خرائط Google",
                        "تحسين SEO",
                        "قاعدة بيانات MySQL و PostgreSQL",
                        "النشر",
                        "مساحة تخزين 10 جيجابايت",
                        "ذاكرة RAM ‏1 جيجابايت",
                    ],
                },

                {
                    name: "باقة الأعمال الاحترافية",
                    price: "2,499 ر.س",
                    oldPrice: "2,999 ر.س",
                    popular: true,
                    description:
                        "موقع أعمال متكامل مع لوحة تحكم إدارية للشركات المتوسطة.",

                    whatsappMessage:
                        "مرحباً Warsa، أنا مهتم بباقة الأعمال الاحترافية بسعر 2,499 ر.س. أود معرفة المزيد عن الميزات وطريقة الطلب.",

                    features: [
                        "لوحة تحكم",
                        "تسجيل دخول المدير",
                        "قاعدة بيانات MySQL و PostgreSQL",
                        "React + Laravel",
                        "النشر",
                        "مساحة تخزين 50 جيجابايت",
                        "ذاكرة RAM ‏16 جيجابايت",
                    ],
                },

                {
                    name: "باقة المؤسسات",
                    price: "حسب الطلب",
                    description:
                        "تطبيق ويب متكامل مصمم خصيصًا لاحتياجات الشركات والمؤسسات الكبيرة.",

                    whatsappMessage:
                        "مرحباً Warsa، أنا مهتم بباقة المؤسسات. أود مناقشة متطلبات تطبيق الويب الخاص بشركتي ومعرفة التفاصيل.",

                    features: [
                        "نطاق مخصص وشهادة SSL",
                        "ميزات غير محدودة",
                        "قاعدة بيانات MySQL و PostgreSQL",
                        "تكامل API",
                        "نظام تسجيل دخول وصلاحيات",
                        "تصميم UI/UX مخصص",
                        "تحسين الأداء وSEO",
                        "دعم فني وصيانة لمدة سنة",
                        "النشر",
                        "مساحة تخزين 100 جيجابايت",
                        "ذاكرة RAM ‏32 جيجابايت",
                    ],
                },
            ],
        },
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
