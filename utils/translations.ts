import type { Language } from '../types';

const en = {
    // SEO
    seo_about_title: "SparkScript | AI Prompt Engineering for Developers",
    seo_about_desc: "SparkScript helps you transform your app ideas into powerful, detailed prompts for AI developers. Speed up your workflow and get better results from AI.",
    seo_generator_title: "Prompt Builder | SparkScript",
    seo_generator_desc: "Use our intuitive prompt builder to define your application's core purpose, features, and tech stack. Generate a comprehensive prompt in seconds.",
    seo_scripts_title: "Prompt Scripts | SparkScript",
    seo_scripts_desc: "Explore a collection of pre-made prompt scripts for common application types. Kickstart your project with proven templates.",
    seo_terms_title: "Terms of Use | SparkScript",
    seo_terms_desc: "Read the terms and conditions for using SparkScript.",
    seo_privacy_title: "Privacy Policy | SparkScript",
    seo_privacy_desc: "Learn how SparkScript handles your data and respects your privacy.",

    // General
    lastUpdated: "Last Updated",
    contactEmail: "hello@sparkscript.tech",

    // Header & Footer
    nav_about: "About",
    nav_scripts: "Scripts",
    promptBuilder: "Prompt Builder",
    aria_label_homepage: "Go to homepage",
    termsOfUse: "Terms of Use",
    privacyPolicy: "Privacy Policy",
    
    // Generator Page
    generator_title_part1: "Build Your",
    generator_title_part2_highlight: "AI Prompt",

    // About Page
    about_hero_title_part1: "Turn Your",
    about_hero_title_part2_highlight: "Idea",
    about_hero_title_part3: "into a",
    about_hero_title_part4_highlight: "Plan",
    about_hero_title_part5: "",
    about_hero_subtitle: "SparkScript helps you transform a simple app concept into a detailed, structured prompt for an AI developer. Get better results, faster.",
    about_hero_cta: "Start Building Now",
    about_mission_title: "Our Mission",
    about_value1_title: "Accelerate",
    about_value1_desc: "Move from idea to implementation faster than ever. Stop wasting time explaining and start building.",
    about_value2_title: "Clarify",
    about_value2_desc: "Our structured process forces you to think through the core components of your app, ensuring a clear vision.",
    about_value3_title: "Empower",
    about_value3_desc: "Generate prompts that give AI developers the context they need to produce high-quality, relevant code.",
    about_why_title: "Why SparkScript?",
    about_why_desc: "In the age of AI-powered development, the quality of your input determines the quality of your output. A vague idea leads to generic code. SparkScript bridges that gap by guiding you to create a comprehensive plan that AI can understand and execute effectively. It's the blueprint for your AI-built application.",
    about_tools_title: "Our Favorite AI Tools",
    about_tools_desc: "SparkScript is one piece of the puzzle. We love these other tools that are pushing the boundaries of AI-assisted development.",
    tool_lovable_desc: "An incredible tool for building beautiful, production-ready UIs with AI.",
    tool_bolt_desc: "Scaffold your backend and database schemas in seconds with this lightning-fast tool.",
    tool_google_ai_studio_desc: "Experiment with the latest Gemini models and craft powerful prompts directly from Google.",
    tool_cursor_desc: "An AI-first code editor that's deeply integrated with your codebase.",
    tool_v0_desc: "Generate React components with simple text prompts, created by the team at Vercel.",
    tool_replit_desc: "A powerful online IDE with AI features to help you build, test, and deploy from anywhere.",

    // Scripts Page
    scripts_page_title_part1: "Kickstart Your Project with",
    scripts_page_title_part2_highlight: "Scripts",
    scripts_page_subtitle: "Don't want to start from scratch? Use one of our pre-built scripts for common app types to fill in the basics for you.",
    scripts_seo_title: "What are Scripts?",
    scripts_seo_desc_p1: "Scripts are pre-filled templates for the Prompt Builder. They contain the core purpose, features, and tech stack for a specific type of application, like a 'To-Do List App' or a 'Blog Platform'.",
    scripts_seo_desc_p2: "They provide a great starting point, saving you time and giving you ideas for your own project. Just select a script, customize the details, and generate your prompt!",
    scripts_how_to_title: "How to Use a Script",
    scripts_how_to_step1_title: "1. Choose a Script",
    scripts_how_to_step1_desc: "Browse our collection and find a script that matches the type of application you want to build.",
    scripts_how_to_step2_title: "2. Load the Data",
    scripts_how_to_step2_desc: "Click the 'Use Script' button. This will take you to the Prompt Builder and pre-fill the form with the script's data.",
    scripts_how_to_step3_title: "3. Customize",
    scripts_how_to_step3_desc: "Review the pre-filled information. Add, edit, or remove features to match your unique vision.",
    scripts_how_to_step4_title: "4. Generate!",
    scripts_how_to_step4_desc: "Once you're happy with the details, generate your prompt and get started with your AI developer.",
    script_use_button: "Use Script",

    // Script details
    script_title_todo: "To-Do List App",
    script_desc_todo: "A classic productivity tool to manage tasks. Includes features like task creation, completion status, and filtering.",
    script_title_blog: "Personal Blog Platform",
    script_desc_blog: "A simple platform for writing and publishing articles. Includes markdown support, categories, and comments.",
    script_title_portfolio: "Developer Portfolio",
    script_desc_portfolio: "A sleek, modern website to showcase your projects, skills, and experience to potential employers.",
    script_title_ecommerce: "E-commerce Storefront",
    script_desc_ecommerce: "A basic online store to list products, manage a shopping cart, and handle a checkout process.",
    script_title_social: "Social Media Feed",
    script_desc_social: "A simple social feed where users can post short messages, see posts from others, and like content.",
    script_title_recipe: "Recipe Book",
    script_desc_recipe: "An app for users to save, organize, and search for their favorite recipes. Includes ingredients, instructions, and images.",

    // Form
    form_section_details: "App Details",
    form_label_appName: "App Name (Optional)",
    form_placeholder_appName: "e.g., 'TaskMaster Pro'",
    form_label_corePurpose: "Core Purpose",
    form_placeholder_corePurpose: "What is the main goal of your app? What problem does it solve? e.g., 'A simple, minimalist to-do app to help users focus on their most important tasks.'",
    form_section_features: "Key Features",
    form_section_audience: "Audience & Style",
    form_label_targetAudience: "Target Audience (Optional)",
    form_placeholder_targetAudience: "e.g., 'Busy professionals, students'",
    form_label_styling: "Styling / Theme (Optional)",
    form_placeholder_styling: "e.g., 'Dark mode, minimalist, futuristic'",
    form_section_tech: "Technology",
    form_label_techStack: "Preferred Tech Stack (Optional)",
    form_placeholder_techStack: "e.g., 'React, TypeScript, Tailwind CSS'",
    form_help_techStack: "If left blank, 'React with TypeScript and Tailwind CSS' will be assumed.",
    form_section_prompt: "Prompt Type",
    form_prompt_minimal_title: "Minimal Prompt",
    form_prompt_minimal_desc: "A concise, high-level overview. Good for a quick start.",
    form_prompt_detailed_title: "Detailed Prompt",
    form_prompt_detailed_desc: "A comprehensive plan with user flows and a data model. Recommended.",
    button_generating: "Generating...",
    button_generate: "Generate Prompt",
    error_apiKeyMissing: "API key is not configured. Please set it up to enable prompt generation.",
    error_failedToGenerate: "Failed to generate prompt. Please check the console for details and try again.",

    // Feature Input
    feature_label: "List the essential features of your app.",
    feature_placeholder: "Feature",
    feature_remove_aria: "Remove feature",
    feature_add: "Add Feature",
    
    // Prompt Display
    display_error_title: "An Error Occurred",
    display_placeholder_title: "Your Prompt Will Appear Here",
    display_placeholder_desc: "Fill out the form on the left and click 'Generate Prompt' to see the result.",
    display_generated_title: "Generated Prompt",
    display_copied: "Copied!",
    display_copy: "Copy Prompt",

    // Terms Page
    terms_section1_title: "1. Acceptance of Terms",
    terms_section1_p1: "By accessing or using SparkScript (the 'Service'), you agree to be bound by these Terms of Use ('Terms'). If you do not agree to all of these Terms, do not use the Service.",
    terms_section1_p2: "We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms.",
    terms_section1_p3: "You must be at least 13 years old to use the Service.",

    terms_section2_title: "2. Description of Service",
    terms_section2_p1: "SparkScript is a tool designed to help users generate structured text prompts for use with AI development models. The Service takes user inputs about an application idea and transforms them into a detailed prompt.",
    terms_section2_p2: "The generated prompts are intended as starting points and are not guaranteed to be perfect or produce a specific outcome from any AI model. The quality of the output from an AI model depends on many factors beyond the scope of this Service.",

    terms_section3_title: "3. User Responsibilities",
    terms_section3_p1: "You are responsible for the information you provide to the Service. You agree not to submit any content that is unlawful, harmful, defamatory, or otherwise objectionable.",
    terms_section3_p2: "You are responsible for securing your own API key for the Google Gemini API. The Service does not store, collect, or manage your API key. Your use of the Google Gemini API is subject to Google's own terms and policies.",
    terms_section3_p3: "You agree not to misuse the Service, including but not limited to, attempting to gain unauthorized access, disrupting the service, or using it for any illegal purpose.",

    terms_section4_title: "4. Intellectual Property",
    terms_section4_p1: "The content you generate using the Service is your own. We claim no intellectual property rights over the prompts you create. The Service itself, including its design, text, graphics, and code, is the property of SIA Lucidious and is protected by copyright and other intellectual property laws.",

    terms_section5_title: "5. Disclaimers and Limitation of Liability",
    terms_section5_p1: "The Service is provided on an 'AS IS' and 'AS AVAILABLE' basis. We make no warranties, express or implied, regarding the operation or availability of the Service or the accuracy of the information and materials contained therein.",
    terms_section5_p2: "In no event shall SIA Lucidious be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or in connection with your use of the Service.",

    terms_section6_title: "6. Third-Party Services",
    terms_section6_p1: "The Service relies on the Google Gemini API. We are not responsible for the availability, performance, or any issues related to this third-party service.",

    terms_section7_title: "7. Termination",
    terms_section7_p1: "We reserve the right to suspend or terminate your access to the Service at any time, without notice, for any reason, including for a breach of these Terms.",

    terms_section8_title: "8. Governing Law",
    terms_section8_p1: "These Terms shall be governed by and construed in accordance with the laws of the Republic of Latvia, without regard to its conflict of law provisions.",

    terms_section9_title: "9. Privacy",
    terms_section9_p1: "Your use of the Service is also governed by our Privacy Policy, which is incorporated herein by reference.",

    terms_section10_title: "10. Contact Information",
    terms_section10_p1: "If you have any questions about these Terms, please contact us at:",

    // Privacy Page
    privacy_section1_title: "1. Introduction",
    privacy_section1_p1: "Welcome to SparkScript. We are committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights in relation to it.",
    privacy_section1_p2: "This policy applies to the SparkScript website and services (collectively, the 'Service'). By using the Service, you agree to the collection and use of information in accordance with this policy.",

    privacy_section2_title: "2. Information We Do NOT Collect",
    privacy_section2_p1: "We believe in data minimization. Crucially, we do NOT collect or store:",
    
    privacy_section3_title: "3. Information We Collect",
    privacy_section3_p1: "We use Google Analytics to collect anonymous usage data to help us improve the Service. This includes information such as your browser type, device type, pages visited, and time spent on the site. This data is aggregated and cannot be used to identify you personally.",
    
    privacy_section4_title: "4. How We Use Information",
    privacy_section4_p1: "We use the limited information we collect to:",
    privacy_section4_li1: "Operate and maintain the Service.",
    privacy_section4_li2: "Improve, personalize, and expand our Service.",
    privacy_section4_li3: "Understand and analyze how you use our Service.",
    privacy_section4_li4: "Develop new products, services, features, and functionality.",
    privacy_section4_li5: "Communicate with you for customer service, updates, and marketing.",
    privacy_section4_li6: "Find and prevent fraud.",

    privacy_section5_title: "5. Legal Basis for Processing",
    privacy_section5_p1: "Our legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect it.",
    
    privacy_section6_title: "6. Your Data Protection Rights",
    privacy_section6_p1: "You have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Information.",
    privacy_section6_li1: "The right to access, update or delete the information we have on you.",
    privacy_section6_li2: "The right of rectification.",
    privacy_section6_li3: "The right to object.",
    privacy_section6_li4: "The right of restriction.",
    privacy_section6_li5: "The right to data portability.",
    privacy_section6_li6: "The right to withdraw consent.",
    privacy_section6_p2: "Please note that we may ask you to verify your identity before responding to such requests.",

    privacy_section7_title: "7. Cookies",
    privacy_section7_p1: "We use cookies only for essential functionality, such as remembering your preferred language. We do not use cookies for tracking or advertising purposes.",

    privacy_section8_title: "8. Changes to This Privacy Policy",
    privacy_section8_p1: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.",

    privacy_section9_title: "9. Contact Us",
    privacy_section9_p1: "If you have any questions about this Privacy Policy, please contact us:",

};

const ru = {
    // SEO
    seo_about_title: "SparkScript | AI Промпт-инжиниринг для разработчиков",
    seo_about_desc: "SparkScript помогает превратить ваши идеи приложений в мощные, детализированные промпты для AI-разработчиков. Ускорьте свой рабочий процесс и получайте лучшие результаты от ИИ.",
    seo_generator_title: "Конструктор Промптов | SparkScript",
    seo_generator_desc: "Используйте наш интуитивно понятный конструктор промптов, чтобы определить основную цель, функции и технологический стек вашего приложения. Создайте исчерпывающий промпт за секунды.",
    seo_scripts_title: "Скрипты Промптов | SparkScript",
    seo_scripts_desc: "Ознакомьтесь с коллекцией готовых скриптов промптов для распространенных типов приложений. Начните свой проект с проверенных шаблонов.",
    seo_terms_title: "Условия использования | SparkScript",
    seo_terms_desc: "Прочтите правила и условия использования SparkScript.",
    seo_privacy_title: "Политика конфиденциальности | SparkScript",
    seo_privacy_desc: "Узнайте, как SparkScript обрабатывает ваши данные и уважает вашу конфиденциальность.",

    // General
    lastUpdated: "Последнее обновление",
    contactEmail: "hello@sparkscript.tech",

    // Header & Footer
    nav_about: "О проекте",
    nav_scripts: "Скрипты",
    promptBuilder: "Конструктор",
    aria_label_homepage: "Перейти на главную",
    termsOfUse: "Условия использования",
    privacyPolicy: "Политика конфиденциальности",

    // Generator Page
    generator_title_part1: "Создайте свой",
    generator_title_part2_highlight: "AI Промпт",

    // About Page
    about_hero_title_part1: "Превратите",
    about_hero_title_part2_highlight: "Идею",
    about_hero_title_part3: "в",
    about_hero_title_part4_highlight: "План",
    about_hero_title_part5: "",
    about_hero_subtitle: "SparkScript помогает вам преобразовать простую концепцию приложения в подробный, структурированный промпт для AI-разработчика. Получайте лучшие результаты быстрее.",
    about_hero_cta: "Начать создание",
    about_mission_title: "Наша миссия",
    about_value1_title: "Ускорение",
    about_value1_desc: "Переходите от идеи к реализации быстрее, чем когда-либо. Перестаньте тратить время на объяснения и начните создавать.",
    about_value2_title: "Ясность",
    about_value2_desc: "Наш структурированный процесс заставляет вас продумать основные компоненты вашего приложения, обеспечивая четкое видение.",
    about_value3_title: "Возможности",
    about_value3_desc: "Создавайте промпты, которые дают AI-разработчикам контекст, необходимый для создания высококачественного, релевантного кода.",
    about_why_title: "Почему SparkScript?",
    about_why_desc: "В эпоху разработки с помощью ИИ качество вашего ввода определяет качество вывода. Нечеткая идея ведет к общему коду. SparkScript устраняет этот пробел, помогая вам создать комплексный план, который ИИ может понять и эффективно выполнить. Это чертеж для вашего приложения, созданного ИИ.",
    about_tools_title: "Наши любимые AI-инструменты",
    about_tools_desc: "SparkScript — это одна часть головоломки. Мы любим эти другие инструменты, которые расширяют границы разработки с помощью ИИ.",
    tool_lovable_desc: "Невероятный инструмент для создания красивых, готовых к производству UI с помощью ИИ.",
    tool_bolt_desc: "Создавайте свой бэкенд и схемы баз данных за секунды с помощью этого молниеносного инструмента.",
    tool_google_ai_studio_desc: "Экспериментируйте с последними моделями Gemini и создавайте мощные промпты прямо от Google.",
    tool_cursor_desc: "Редактор кода, ориентированный на ИИ, глубоко интегрированный с вашей кодовой базой.",
    tool_v0_desc: "Создавайте React-компоненты с помощью простых текстовых промптов, созданные командой Vercel.",
    tool_replit_desc: "Мощная онлайн-IDE с функциями ИИ, которые помогут вам создавать, тестировать и развертывать из любого места.",
    
    // Scripts Page
    scripts_page_title_part1: "Начните свой проект со",
    scripts_page_title_part2_highlight: "Скриптов",
    scripts_page_subtitle: "Не хотите начинать с нуля? Используйте один из наших готовых скриптов для распространенных типов приложений, чтобы заполнить основы за вас.",
    scripts_seo_title: "Что такое Скрипты?",
    scripts_seo_desc_p1: "Скрипты - это предварительно заполненные шаблоны для Конструктора Промптов. Они содержат основную цель, функции и технологический стек для определенного типа приложения, например, 'Приложение со списком дел' или 'Платформа для блога'.",
    scripts_seo_desc_p2: "Они предоставляют отличную отправную точку, экономя ваше время и давая идеи для вашего собственного проекта. Просто выберите скрипт, настройте детали и сгенерируйте свой промпт!",
    scripts_how_to_title: "Как использовать скрипт",
    scripts_how_to_step1_title: "1. Выберите скрипт",
    scripts_how_to_step1_desc: "Просмотрите нашу коллекцию и найдите скрипт, который соответствует типу приложения, которое вы хотите создать.",
    scripts_how_to_step2_title: "2. Загрузите данные",
    scripts_how_to_step2_desc: "Нажмите кнопку 'Использовать скрипт'. Это перенесет вас в Конструктор Промптов и предварительно заполнит форму данными скрипта.",
    scripts_how_to_step3_title: "3. Настройте",
    scripts_how_to_step3_desc: "Просмотрите предварительно заполненную информацию. Добавляйте, редактируйте или удаляйте функции в соответствии с вашим уникальным видением.",
    scripts_how_to_step4_title: "4. Генерируйте!",
    scripts_how_to_step4_desc: "Когда вы будете довольны деталями, сгенерируйте свой промпт и начните работу с вашим AI-разработчиком.",
    script_use_button: "Использовать скрипт",

    // Script details
    script_title_todo: "Приложение со списком дел",
    script_desc_todo: "Классический инструмент для управления задачами. Включает создание задач, статусы выполнения и фильтрацию.",
    script_title_blog: "Платформа для личного блога",
    script_desc_blog: "Простая платформа для написания и публикации статей. Включает поддержку markdown, категории и комментарии.",
    script_title_portfolio: "Портфолио разработчика",
    script_desc_portfolio: "Стильный, современный веб-сайт для демонстрации ваших проектов, навыков и опыта потенциальным работодателям.",
    script_title_ecommerce: "Витрина интернет-магазина",
    script_desc_ecommerce: "Базовый интернет-магазин для перечисления товаров, управления корзиной покупок и обработки процесса оформления заказа.",
    script_title_social: "Лента социальных сетей",
    script_desc_social: "Простая социальная лента, где пользователи могут публиковать короткие сообщения, видеть посты других и ставить лайки.",
    script_title_recipe: "Книга рецептов",
    script_desc_recipe: "Приложение для сохранения, организации и поиска любимых рецептов. Включает ингредиенты, инструкции и изображения.",

    // Form
    form_section_details: "Детали приложения",
    form_label_appName: "Название приложения (необязательно)",
    form_placeholder_appName: "например, 'TaskMaster Pro'",
    form_label_corePurpose: "Основная цель",
    form_placeholder_corePurpose: "Какова основная цель вашего приложения? Какую проблему оно решает? например, 'Простое, минималистичное приложение со списком дел, чтобы помочь пользователям сосредоточиться на своих самых важных задачах.'",
    form_section_features: "Ключевые функции",
    form_section_audience: "Аудитория и стиль",
    form_label_targetAudience: "Целевая аудитория (необязательно)",
    form_placeholder_targetAudience: "например, 'Занятые профессионалы, студенты'",
    form_label_styling: "Стиль / Тема (необязательно)",
    form_placeholder_styling: "например, 'Темный режим, минимализм, футуризм'",
    form_section_tech: "Технологии",
    form_label_techStack: "Предпочтительный тех. стек (необязательно)",
    form_placeholder_techStack: "например, 'React, TypeScript, Tailwind CSS'",
    form_help_techStack: "Если оставить пустым, будет использоваться 'React с TypeScript и Tailwind CSS'.",
    form_section_prompt: "Тип промпта",
    form_prompt_minimal_title: "Минимальный промпт",
    form_prompt_minimal_desc: "Краткий, высокоуровневый обзор. Хорошо для быстрого старта.",
    form_prompt_detailed_title: "Подробный промпт",
    form_prompt_detailed_desc: "Комплексный план с пользовательскими потоками и моделью данных. Рекомендуется.",
    button_generating: "Генерация...",
    button_generate: "Сгенерировать промпт",
    error_apiKeyMissing: "API-ключ не настроен. Пожалуйста, настройте его, чтобы включить генерацию промптов.",
    error_failedToGenerate: "Не удалось сгенерировать промпт. Пожалуйста, проверьте консоль на наличие деталей и повторите попытку.",
    
    // Feature Input
    feature_label: "Перечислите основные функции вашего приложения.",
    feature_placeholder: "Функция",
    feature_remove_aria: "Удалить функцию",
    feature_add: "Добавить функцию",

    // Prompt Display
    display_error_title: "Произошла ошибка",
    display_placeholder_title: "Ваш промпт появится здесь",
    display_placeholder_desc: "Заполните форму слева и нажмите 'Сгенерировать промпт', чтобы увидеть результат.",
    display_generated_title: "Сгенерированный промпт",
    display_copied: "Скопировано!",
    display_copy: "Копировать промпт",
};

const lv = {
    // SEO
    seo_about_title: "SparkScript | AI Uzdevumu Inženierija Izstrādātājiem",
    seo_about_desc: "SparkScript palīdz pārvērst jūsu lietotņu idejas jaudīgos, detalizētos uzdevumos AI izstrādātājiem. Paātriniet savu darba plūsmu un iegūstiet labākus rezultātus no AI.",
    seo_generator_title: "Uzdevumu Veidotājs | SparkScript",
    seo_generator_desc: "Izmantojiet mūsu intuitīvo uzdevumu veidotāju, lai definētu savas lietotnes galveno mērķi, funkcijas un tehnoloģiju kopumu. Izveidojiet visaptverošu uzdevumu dažu sekunžu laikā.",
    seo_scripts_title: "Uzdevumu Skripti | SparkScript",
    seo_scripts_desc: "Izpētiet gatavu uzdevumu skriptu kolekciju bieži sastopamiem lietotņu veidiem. Sāciet savu projektu ar pārbaudītām veidnēm.",
    seo_terms_title: "Lietošanas noteikumi | SparkScript",
    seo_terms_desc: "Izlasiet SparkScript lietošanas noteikumus un nosacījumus.",
    seo_privacy_title: "Privātuma politika | SparkScript",
    seo_privacy_desc: "Uzziniet, kā SparkScript apstrādā jūsu datus un ciena jūsu privātumu.",

    // General
    lastUpdated: "Pēdējo reizi atjaunināts",
    contactEmail: "hello@sparkscript.tech",

    // Header & Footer
    nav_about: "Par",
    nav_scripts: "Skripti",
    promptBuilder: "Veidotājs",
    aria_label_homepage: "Doties uz sākumlapu",
    termsOfUse: "Lietošanas noteikumi",
    privacyPolicy: "Privātuma politika",

    // Generator Page
    generator_title_part1: "Izveidojiet savu",
    generator_title_part2_highlight: "AI Uzdevumu",

    // About Page
    about_hero_title_part1: "Pārvērtiet",
    about_hero_title_part2_highlight: "Ideju",
    about_hero_title_part3: "",
    about_hero_title_part4_highlight: "Plānā",
    about_hero_title_part5: "",
    about_hero_subtitle: "SparkScript palīdz pārvērst vienkāršu lietotnes konceptu detalizētā, strukturētā uzdevumā AI izstrādātājam. Iegūstiet labākus rezultātus ātrāk.",
    about_hero_cta: "Sākt Veidot Tagad",
    about_mission_title: "Mūsu Misija",
    about_value1_title: "Paātrināt",
    about_value1_desc: "Pārejiet no idejas uz realizāciju ātrāk nekā jebkad agrāk. Pārtrauciet tērēt laiku skaidrošanai un sāciet būvēt.",
    about_value2_title: "Skaidrība",
    about_value2_desc: "Mūsu strukturētais process liek jums pārdomāt lietotnes galvenos komponentus, nodrošinot skaidru redzējumu.",
    about_value3_title: "Iespējas",
    about_value3_desc: "Ģenerējiet uzdevumus, kas sniedz AI izstrādātājiem nepieciešamo kontekstu, lai radītu augstas kvalitātes, atbilstošu kodu.",
    about_why_title: "Kāpēc SparkScript?",
    about_why_desc: "AI vadītas attīstības laikmetā jūsu ievades kvalitāte nosaka jūsu izvades kvalitāti. Neskaidra ideja noved pie vispārīga koda. SparkScript novērš šo plaisu, palīdzot jums izveidot visaptverošu plānu, ko AI var saprast un efektīvi izpildīt. Tas ir jūsu AI veidotās lietojumprogrammas projekts.",
    about_tools_title: "Mūsu Iecienītākie AI Rīki",
    about_tools_desc: "SparkScript ir viena puzles daļa. Mēs mīlam šos citus rīkus, kas paplašina AI atbalstītas izstrādes robežas.",
    tool_lovable_desc: "Neticams rīks, lai ar AI palīdzību veidotu skaistus, ražošanai gatavus UI.",
    tool_bolt_desc: "Izveidojiet savu aizmugursistēmu un datu bāzes shēmas dažu sekunžu laikā ar šo zibensātro rīku.",
    tool_google_ai_studio_desc: "Eksperimentējiet ar jaunākajiem Gemini modeļiem un veidojiet jaudīgus uzdevumus tieši no Google.",
    tool_cursor_desc: "AI pirmais koda redaktors, kas ir dziļi integrēts ar jūsu kodu bāzi.",
    tool_v0_desc: "Ģenerējiet React komponentus ar vienkāršiem teksta uzdevumiem, ko izveidojusi Vercel komanda.",
    tool_replit_desc: "Jaudīga tiešsaistes IDE ar AI funkcijām, kas palīdz jums veidot, testēt un izvietot no jebkuras vietas.",

    // Scripts Page
    scripts_page_title_part1: "Sāciet savu projektu ar",
    scripts_page_title_part2_highlight: "Skriptiem",
    scripts_page_subtitle: "Nevēlaties sākt no nulles? Izmantojiet kādu no mūsu gatavajiem skriptiem bieži sastopamiem lietotņu veidiem, lai aizpildītu pamatinformāciju jūsu vietā.",
    scripts_seo_title: "Kas ir Skripti?",
    scripts_seo_desc_p1: "Skripti ir iepriekš aizpildītas veidnes Uzdevumu Veidotājam. Tie satur galveno mērķi, funkcijas un tehnoloģiju kopumu konkrētam lietojumprogrammas veidam, piemēram, 'Darāmo darbu saraksta lietotne' vai 'Bloga platforma'.",
    scripts_seo_desc_p2: "Tie nodrošina lielisku sākumpunktu, ietaupot jūsu laiku un sniedzot idejas jūsu pašu projektam. Vienkārši izvēlieties skriptu, pielāgojiet detaļas un ģenerējiet savu uzdevumu!",
    scripts_how_to_title: "Kā lietot skriptu",
    scripts_how_to_step1_title: "1. Izvēlieties skriptu",
    scripts_how_to_step1_desc: "Pārlūkojiet mūsu kolekciju un atrodiet skriptu, kas atbilst lietojumprogrammas veidam, kuru vēlaties izveidot.",
    scripts_how_to_step2_title: "2. Ielādējiet datus",
    scripts_how_to_step2_desc: "Noklikšķiniet uz pogas 'Lietot skriptu'. Tas jūs aizvedīs uz Uzdevumu Veidotāju un iepriekš aizpildīs veidlapu ar skripta datiem.",
    scripts_how_to_step3_title: "3. Pielāgojiet",
    scripts_how_to_step3_desc: "Pārskatiet iepriekš aizpildīto informāciju. Pievienojiet, rediģējiet vai noņemiet funkcijas, lai tās atbilstu jūsu unikālajam redzējumam.",
    scripts_how_to_step4_title: "4. Ģenerējiet!",
    scripts_how_to_step4_desc: "Kad esat apmierināts ar detaļām, ģenerējiet savu uzdevumu un sāciet darbu ar savu AI izstrādātāju.",
    script_use_button: "Lietot skriptu",

    // Script details
    script_title_todo: "Darāmo darbu saraksta lietotne",
    script_desc_todo: "Klasisks produktivitātes rīks uzdevumu pārvaldībai. Ietver uzdevumu izveidi, pabeigšanas statusu un filtrēšanu.",
    script_title_blog: "Personīgā bloga platforma",
    script_desc_blog: "Vienkārša platforma rakstu rakstīšanai un publicēšanai. Ietver markdown atbalstu, kategorijas un komentārus.",
    script_title_portfolio: "Izstrādātāja portfolio",
    script_desc_portfolio: "Stilīga, moderna vietne, lai parādītu savus projektus, prasmes un pieredzi potenciālajiem darba devējiem.",
    script_title_ecommerce: "E-komercijas veikala skatlogs",
    script_desc_ecommerce: "Pamata tiešsaistes veikals, lai uzskaitītu produktus, pārvaldītu iepirkumu grozu un apstrādātu norēķinu procesu.",
    script_title_social: "Sociālo mediju plūsma",
    script_desc_social: "Vienkārša sociālā plūsma, kurā lietotāji var publicēt īsziņas, redzēt citu ziņas un atzīmēt saturu ar 'patīk'.",
    script_title_recipe: "Recepšu grāmata",
    script_desc_recipe: "Lietotne, kurā lietotāji var saglabāt, organizēt un meklēt savas iecienītākās receptes. Ietver sastāvdaļas, instrukcijas un attēlus.",
    
    // Form
    form_section_details: "Lietotnes detaļas",
    form_label_appName: "Lietotnes nosaukums (pēc izvēles)",
    form_placeholder_appName: "piem., 'TaskMaster Pro'",
    form_label_corePurpose: "Galvenais mērķis",
    form_placeholder_corePurpose: "Kāds ir jūsu lietotnes galvenais mērķis? Kādu problēmu tā risina? piem., 'Vienkārša, minimālistiska darāmo darbu lietotne, lai palīdzētu lietotājiem koncentrēties uz svarīgākajiem uzdevumiem.'",
    form_section_features: "Galvenās funkcijas",
    form_section_audience: "Mērķauditorija un stils",
    form_label_targetAudience: "Mērķauditorija (pēc izvēles)",
    form_placeholder_targetAudience: "piem., 'Aizņemti profesionāļi, studenti'",
    form_label_styling: "Stils / Tēma (pēc izvēles)",
    form_placeholder_styling: "piem., 'Tumšais režīms, minimālistisks, futūristisks'",
    form_section_tech: "Tehnoloģijas",
    form_label_techStack: "Vēlamais tehnoloģiju kopums (pēc izvēles)",
    form_placeholder_techStack: "piem., 'React, TypeScript, Tailwind CSS'",
    form_help_techStack: "Ja atstāj tukšu, tiks pieņemts 'React ar TypeScript un Tailwind CSS'.",
    form_section_prompt: "Uzdevuma veids",
    form_prompt_minimal_title: "Minimāls uzdevums",
    form_prompt_minimal_desc: "Īss, augsta līmeņa pārskats. Labs ātrai sākšanai.",
    form_prompt_detailed_title: "Detalizēts uzdevums",
    form_prompt_detailed_desc: "Visaptverošs plāns ar lietotāju plūsmām un datu modeli. Ieteicams.",
    button_generating: "Ģenerē...",
    button_generate: "Ģenerēt uzdevumu",
    error_apiKeyMissing: "API atslēga nav konfigurēta. Lūdzu, iestatiet to, lai iespējotu uzdevumu ģenerēšanu.",
    error_failedToGenerate: "Neizdevās ģenerēt uzdevumu. Lūdzu, pārbaudiet konsoli, lai iegūtu sīkāku informāciju, un mēģiniet vēlreiz.",
    
    // Feature Input
    feature_label: "Uzskaitiet savas lietotnes būtiskās funkcijas.",
    feature_placeholder: "Funkcija",
    feature_remove_aria: "Noņemt funkciju",
    feature_add: "Pievienot funkciju",

    // Prompt Display
    display_error_title: "Radās kļūda",
    display_placeholder_title: "Jūsu uzdevums parādīsies šeit",
    display_placeholder_desc: "Aizpildiet veidlapu kreisajā pusē un noklikšķiniet uz 'Ģenerēt uzdevumu', lai redzētu rezultātu.",
    display_generated_title: "Ģenerētais uzdevums",
    display_copied: "Nokopēts!",
    display_copy: "Kopēt uzdevumu",
};

export const translations = { en, ru, lv };

export type Translations = typeof translations;
