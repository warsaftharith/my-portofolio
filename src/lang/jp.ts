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
        available: "新しいプロジェクトに対応可能",
        title: "こんにちは、私は",
        subtitle: "フルスタック開発者 & UI/UXデザイナー",
        desc: "ReactとLaravelを中心に、安定性・機能性・美しさを兼ね備えたデジタルソリューションを構築しています。Web制作やコラボレーションのご依頼を受け付けています。",
        contact: "お問い合わせ",
        pricelist: "料金表を見る",
        cv: "履歴書をダウンロード",

        stats: [
            {
                value: "2+",
                title: "経験年数",
                subtitle: "Web開発",
            },
            {
                value: "15+",
                title: "完成プロジェクト",
                subtitle: "Webサイト・アプリケーション",
            },
            {
                value: "10+",
                title: "テクノロジー",
                subtitle: "フロントエンド & バックエンド",
            },
            {
                value: "100%",
                title: "コミットメント",
                subtitle: "最高品質",
            },
        ],
        onlineFor: "ウェブサイトはオンラインで",
        days: "日間",
        hours: "時間",
        minutes: "分",
        seconds: "秒",
        since: "以来",
    },

    // promo jasa skripsi
    layout: {
        promoLabel: "サービスのご案内",

        promoTitle: "卒業論文でお困りですか？",

        promoDescription:
            "ウェブサイト制作だけでなく、以下の学術文書の作成・サポートも承っています。",

        proposal: "研究計画書",

        skripsi: "卒業論文",

        jurnal: "学術論文",

        ppt: "発表用PPT",

        promoDescriptionEnd:
            "また、学術文書の修正・添削にも対応しています。",

        promoButton: "サービスの詳細を見る",
    },


    pricelist: {
        badge: "Web制作サービス",
        title: "シンプルな料金。確かな結果。",
        subtitle:
            "ニーズに合ったプランをお選びください。プロジェクトの規模や要件に応じたカスタマイズにも対応しています。",

        button: "お問い合わせ",
        popular: "人気プラン",

        normalPrice: "通常価格",

        note:
            "料金は基本価格です。プロジェクトの規模、複雑さ、機能、要件によって変動する場合があります。",

        tabs: {
            personal: "個人向け",
            business: "法人・ビジネス向け",
        },

        plans: {
            personal: [
                {
                    name: "Personal Starter",
                    price: "¥9,900",
                    oldPrice: "¥14,900",
                    description:
                        "個人ブランド、ポートフォリオ、サービス紹介などに適したシンプルでプロフェッショナルなWebサイト。",

                    whatsappMessage:
                        "こんにちは、Warsaさん。Personal Starterプラン（¥9,900）に興味があります。詳細と申し込み方法について教えていただけますか？",

                    features: [
                        "カスタムドメイン",
                        "レスポンシブデザイン",
                        "ホスティング込み",
                        "基本SEO対策",
                        "公開設定",
                        "5 GB ストレージ",
                        "512 MB RAM",
                    ],
                },

                {
                    name: "Personal Pro",
                    price: "¥39,900",
                    oldPrice: "¥49,900",
                    popular: true,
                    description:
                        "高度な機能とデータベースを備えた、プロフェッショナルな個人向けWebサイト。",

                    whatsappMessage:
                        "こんにちは、Warsaさん。Personal Proプラン（¥39,900）に興味があります。機能の詳細と申し込み方法について教えていただけますか？",

                    features: [
                        "カスタムドメイン",
                        "レスポンシブデザイン",
                        "ホスティング込み",
                        "MySQL & PostgreSQL データベース",
                        "SEO対策",
                        "デプロイメント",
                        "10 GB ストレージ",
                        "1 GB RAM",
                    ],
                },

                {
                    name: "Custom Personal",
                    price: "¥69,900",
                    oldPrice: "¥79,900",
                    description:
                        "お客様のニーズに合わせて完全にカスタマイズされた個人向けWebサイト。技術サポートにも対応します。",

                    whatsappMessage:
                        "こんにちは、Warsaさん。Custom Personalプラン（¥69,900）に興味があります。自分のWebサイトについて相談したいです。",

                    features: [
                        "カスタムデザイン",
                        "無制限セクション",
                        "React",
                        "パフォーマンス最適化",
                        "SEO対策",
                        "MySQL & PostgreSQL データベース",
                        "デプロイメント",
                        "20 GB ストレージ",
                        "2 GB RAM",
                    ],
                },
            ],

            business: [
                {
                    name: "Business Starter",
                    price: "¥69,900",
                    oldPrice: "¥79,900",
                    description:
                        "中小企業、店舗、ブランド向けのプロフェッショナルな会社紹介Webサイト。",

                    whatsappMessage:
                        "こんにちは、Warsaさん。Business Starterプラン（¥69,900）に興味があります。詳細と申し込み方法について教えていただけますか？",

                    features: [
                        "カスタムドメイン",
                        "ホスティング込み",
                        "最大5ページ",
                        "WhatsApp連携",
                        "Google Maps",
                        "SEO対策",
                        "MySQL & PostgreSQL データベース",
                        "デプロイメント",
                        "10 GB ストレージ",
                        "1 GB RAM",
                    ],
                },

                {
                    name: "Business Pro",
                    price: "¥109,900",
                    oldPrice: "¥129,900",
                    popular: true,
                    description:
                        "成長する企業向けの管理ダッシュボードを備えたビジネスWebサイト。",

                    whatsappMessage:
                        "こんにちは、Warsaさん。Business Proプラン（¥109,900）に興味があります。機能の詳細と申し込み方法について教えていただけますか？",

                    features: [
                        "管理ダッシュボード",
                        "管理者ログイン",
                        "MySQL & PostgreSQL データベース",
                        "React + Laravel",
                        "デプロイメント",
                        "50 GB ストレージ",
                        "16 GB RAM",
                    ],
                },

                {
                    name: "Enterprise",
                    price: "個別見積もり",
                    description:
                        "大規模企業向けに設計された、完全カスタマイズ型のWebアプリケーション。",

                    whatsappMessage:
                        "こんにちは、Warsaさん。Enterpriseプランに興味があります。会社向けWebアプリケーションの要件について相談したいです。",

                    features: [
                        "カスタムドメイン & SSL",
                        "無制限の機能",
                        "MySQL & PostgreSQL データベース",
                        "API連携",
                        "認証機能",
                        "権限・ロール管理",
                        "カスタムUI/UXデザイン",
                        "パフォーマンス & SEO最適化",
                        "1年間のサポート & メンテナンス",
                        "デプロイメント",
                        "100 GB ストレージ",
                        "32 GB RAM",
                    ],
                },
            ],
        },
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