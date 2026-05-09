import project1 from "@/assets/images/project1.png";
import project2 from "@/assets/images/project2.png";
import project3 from "@/assets/images/project3.png";

export const jp = {
    // nav
    navbar: {
        home: "ホーム",
        about: "概要",
        skills: "スキル",
        projects: "プロジェクト",
        contact: "連絡先",

        themeLight: "ライトモード",
        themeDark: "ダークモード",
    },

    // hero
    hero: {
        available: "新しいプロジェクト対応可能",
        title: "こんにちは、私は",
        subtitle: "フルスタック開発者 & UI/UXデザイナー",
        desc: "ReactとLaravelを中心に、安定性・機能性・美しさを兼ね備えたデジタルソリューションを構築しています。Web制作やコラボの依頼を受け付けています。",
        contact: "お問い合わせ",
        cv: "履歴書をダウンロード",
    },

    // experience
    experience: {
        title: "経歴と学歴",
        items: [
            {
                year: "2024 - 現在",
                title: "フロントエンド開発者 (フリーランス)",
                company: "テクノロジーソリューション企業",
                description:
                    "ReactとLaravelを使用したマルチテナントPOSダッシュボードの開発。",
                color: "bg-emerald-500",
            },
            {
                year: "2019 — 2021",
                title: "ジュニアWeb開発者",
                company: "クリエイティブエージェンシー",
                description:
                    "レスポンシブUIの開発とAPI統合を担当。",
                color: "bg-blue-500",
            },
            {
                year: "2020 — 2024",
                title: "イスラム教育学 学士",
                company: "STIT Palapa Nusantara",
                description: "GPA: 3.32/4.00",
                color: "bg-purple-500",
            },
        ],
    },

    // footer
    footer: {
        home: "ホーム",
        about: "概要",
        skills: "スキル",
        projects: "プロジェクト",
        contact: "連絡先",
        tagline: "デジタルの卓越性を構築する。",
        copyright: "© {year} Warsa. 全著作権所有。",
    },

    // projects
    projects: {
        title: "ポートフォリオプロジェクト",
        subtitle: "これまで手掛けた代表的なプロジェクト",
        featured: "注目",
        liveDemo: "デモを見る",
        github: "GitHub",
        items: [
            {
                title: "POSシステムプラットフォーム",
                desc: "決済ゲートウェイ、管理ダッシュボード、リアルタイム在庫管理を備えたモダンなPOSシステム。",
                image: project1,
                tech: ["React", "Laravel", "MySQL"],
                featured: true,
            },
            {
                title: "分析ダッシュボード",
                desc: "リアルタイムデータ可視化、カスタムチャート、マルチテナント対応の企業向けダッシュボード。",
                image: project2,
                tech: ["React", "TypeScript", "Chart.js"],
                featured: true,
            },
            {
                title: "SaaSプロジェクト管理アプリ",
                desc: "カンバンボード、時間追跡、チームコラボ機能を備えたSaaSプロジェクト管理アプリ。",
                image: project3,
                tech: ["Laravel", "MySQL", "Tailwind"],
                featured: true,
            },
        ],
    },

    // skills
    skills: {
        title: "スキル & 技術",
        subtitle: "習得している技術とプログラミング言語",
        items: [
            { name: "HTML5", desc: "マークアップ" },
            { name: "CSS3", desc: "スタイリング" },
            { name: "JavaScript", desc: "コア言語" },
            { name: "TypeScript", desc: "型付きJS" },
            { name: "React", desc: "フロントエンド" },
            { name: "Laravel", desc: "バックエンド" },
            { name: "Tailwind", desc: "CSSフレームワーク" },
            { name: "PHP", desc: "サーバーサイド" },
            { name: "MySQL", desc: "データベース" },
            { name: "Git", desc: "バージョン管理" },
        ],
    },

    // contact
    contact: {
        title: "一緒にコラボしましょう",
        subtitle:
            "興味のあるプロジェクトがありますか？メッセージを送ってください。すぐに返信します。",
        namePlaceholder: "フルネーム",
        emailPlaceholder: "メールアドレス",
        phonePlaceholder: "電話番号",
        messagePlaceholder: "メッセージを入力してください",
        button: "送信 →",
        social: "ソーシャルメディア",
        emailLabel: "メール",
        whatsappLabel: "WhatsApp",
    },

    // about
    about: {
        title: "私について",
        subtitle:
            "スケーラブルなWebおよびモバイルアプリを構築する2年以上の経験を持つフルスタック開発者。",
        description1:
            "こんにちは！私は<span class='font-semibold text-amber-500'>Wahyu</span>です。意味のあるデジタルソリューションを作ることに情熱を持つフルスタック開発者です。美しいデザインと効率的なコードを組み合わせ、優れたユーザー体験を提供します。",
        description2:
            "私は<span class='font-semibold bg-amber-100 dark:bg-amber-900/40 px-2 py-1 rounded-lg text-amber-700 dark:text-amber-300'>React、Laravel</span>を専門とし、常に最新技術を追い続けています。",
        email: "メール",
        location: "所在地",
        experience: "経験",
        language: "言語",
        locationValue: "インドネシア・西ヌサトゥンガラ",
        experienceValue: "2年以上",
        languageValue: "インドネシア語、英語",
        skillsTitle: "主要スキル",
        skillItems: [
            { name: "フロントエンド開発", width: "75%" },
            { name: "バックエンド開発", width: "80%" },
            { name: "UI/UXデザイン", width: "60%" },
        ],
    },
};