export type PortfolioSeedItem = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  content: string;
  projectUrl: string;
  tags: string;
  featured: boolean;
  sortOrder: number;
  imagePath: string;
};

export const PORTFOLIO_PROJECTS: PortfolioSeedItem[] = [
  {
    slug: "dynamo-brest",
    title: "ФК «Динамо» Брест",
    excerpt: "Официальный сайт футбольного клуба с акцентом на матчи, состав и новости клуба.",
    description:
      "Флагманский проект студии: современный клубный сайт с удобной навигацией по матчам, турнирной таблице и медиа.",
    content:
      "Разработали цифровую витрину для ФК «Динамо» Брест — с акцентом на актуальные матчи, результаты и контент для болельщиков. Структура построена вокруг ключевых сценариев: календарь игр, новости клуба, информация о команде и билетах. Визуальный стиль поддерживает бренд клуба, а интерфейс остаётся быстрым на мобильных устройствах.",
    projectUrl: "https://dynamo-brest.by/",
    tags: "спорт, клуб, медиа",
    featured: true,
    sortOrder: 1,
    imagePath: "/images/portfolio/dynamo-brest.jpg",
  },
  {
    slug: "advokat-kuchun",
    title: "Адвокат Кучун",
    excerpt: "Сайт адвоката: услуги, экспертиза и понятный путь к консультации.",
    description: "Корпоративный сайт для адвокатской практики с акцентом на доверие и конверсию в заявку.",
    content:
      "Создали лаконичный сайт для адвоката: чёткая структура услуг, блоки доверия, удобные контакты и формы обратной связи. Дизайн выдержан в сдержанной деловой эстетике — без визуального шума, с фокусом на экспертизу и юридическую помощь.",
    projectUrl: "https://advokat-kuchun.by/",
    tags: "юриспруденция, услуги",
    featured: false,
    sortOrder: 2,
    imagePath: "/images/portfolio/advokat-kuchun.jpg",
  },
  {
    slug: "startravel",
    title: "Star Travel",
    excerpt: "Туристический портал с вдохновляющей подачей направлений и туров.",
    description: "Туристический сайт с каталогом предложений и удобным путём к бронированию.",
    content:
      "Реализовали сайт туристического агентства: яркая визуальная подача направлений, структурированные туры и быстрый доступ к консультации. Проект ориентирован на эмоциональный storytelling и простую навигацию для планирования поездки.",
    projectUrl: "https://startravel.ru/",
    tags: "туризм, travel",
    featured: false,
    sortOrder: 3,
    imagePath: "/images/portfolio/startravel.jpg",
  },
  {
    slug: "clevermed",
    title: "CleverMed",
    excerpt: "Медицинский проект с понятной структурой услуг и записи.",
    description: "Сайт медицинской тематики с акцентом на услуги, специалистов и запись.",
    content:
      "Разработали сайт для медицинского направления: понятная иерархия услуг, информационные блоки о клинике/практике и удобные точки контакта для пациентов. Интерфейс спокойный, читаемый и адаптирован под мобильные сценарии.",
    projectUrl: "https://clevermed.by/",
    tags: "медицина, здоровье",
    featured: false,
    sortOrder: 4,
    imagePath: "/images/portfolio/clevermed.jpg",
  },
  {
    slug: "andreipalych",
    title: "Andrei Palych",
    excerpt: "Персональный бренд с сильной визуальной подачей и структурой услуг.",
    description: "Персональный сайт эксперта с акцентом на имидж и конверсию.",
    content:
      "Собрали персональный сайт с выразительной подачей бренда, блоками услуг и контактами. Проект демонстрирует, как личный бренд может быть одновременно эстетичным и практичным для привлечения клиентов.",
    projectUrl: "https://andreipalych.by/",
    tags: "персональный бренд",
    featured: false,
    sortOrder: 5,
    imagePath: "/images/portfolio/andreipalych.jpg",
  },
  {
    slug: "klaus-clinic",
    title: "Klaus Clinic",
    excerpt: "Сайт клиники с премиальной подачей и структурой медицинских услуг.",
    description: "Медицинский сайт клиники с акцентом на доверие и сервис.",
    content:
      "Создали сайт клиники с аккуратной типографикой, структурой услуг и блоками, формирующими доверие к медицинскому бренду. Упор на понятную навигацию и комфортное чтение на всех устройствах.",
    projectUrl: "https://www.klausclinic.by/",
    tags: "клиника, медицина",
    featured: false,
    sortOrder: 6,
    imagePath: "/images/portfolio/klaus-clinic.jpg",
  },
  {
    slug: "4derevo",
    title: "4 Дерева",
    excerpt: "Проект с натуральной эстетикой и каталогом продукции/услуг.",
    description: "Сайт с экологичной визуальной концепцией и продуктовой структурой.",
    content:
      "Реализовали сайт с натуральной визуальной айдентикой: акцент на материалы, продукт и философию бренда. Структура помогает быстро познакомиться с предложением и перейти к заказу или консультации.",
    projectUrl: "https://4derevo.ru/",
    tags: "каталог, бренд",
    featured: false,
    sortOrder: 7,
    imagePath: "/images/portfolio/4derevo.jpg",
  },
  {
    slug: "golden-lion",
    title: "Golden Lion",
    excerpt: "Корпоративный сайт с акцентом на имидж и ключевые преимущества.",
    description: "Бизнес-сайт с презентацией компании и услуг.",
    content:
      "Разработали корпоративный сайт с сильной первой экранной подачей, блоками преимуществ и понятной структурой услуг. Проект ориентирован на формирование доверия и лидогенерацию.",
    projectUrl: "https://golden-lion.by/",
    tags: "бизнес, корпоративный",
    featured: false,
    sortOrder: 8,
    imagePath: "/images/portfolio/golden-lion.jpg",
  },
  {
    slug: "ilh",
    title: "ILH",
    excerpt: "Корпоративный веб-проект с чёткой структурой и деловой подачей.",
    description: "Сайт компании с фокусом на услуги и контакты.",
    content:
      "Создали структурированный корпоративный сайт: услуги, о компании, кейсы и контакты. Дизайн сдержанный, с акцентом на читаемость и профессиональный тон коммуникации.",
    projectUrl: "https://ilh.by/",
    tags: "корпоративный",
    featured: false,
    sortOrder: 9,
    imagePath: "/images/portfolio/ilh.jpg",
  },
  {
    slug: "microcement",
    title: "Microcement",
    excerpt: "Сайт для отделочного направления с визуальным акцентом на материал.",
    description: "Презентация услуг микроцемента и портфолио работ.",
    content:
      "Реализовали сайт для направления микроцемента: визуальная демонстрация фактур, преимущества технологии, примеры работ и удобный путь к заявке. Подача подчёркивает премиальность отделочного решения.",
    projectUrl: "https://microcement.by/",
    tags: "строительство, интерьер",
    featured: false,
    sortOrder: 10,
    imagePath: "/images/portfolio/microcement.jpg",
  },
  {
    slug: "newviewtravel",
    title: "New View Travel",
    excerpt: "Туристический сайт с каталогом направлений и акцентом на конверсию.",
    description: "Travel-проект с витриной туров и быстрым контактом.",
    content:
      "Создали туристический сайт с понятной витриной предложений, акцентными блоками направлений и быстрыми CTA для связи. Структура оптимизирована под поиск тура и консультацию.",
    projectUrl: "https://newviewtravel.ru/",
    tags: "туризм",
    featured: false,
    sortOrder: 11,
    imagePath: "/images/portfolio/newviewtravel.jpg",
  },
  {
    slug: "carpro",
    title: "CarPro",
    excerpt: "Автомобильный проект с каталогом услуг и сильной коммерческой подачей.",
    description: "Сайт автосервиса/автониши с фокусом на услуги и заявки.",
    content:
      "Разработали сайт для автомобильной тематики: услуги, преимущества, портфолио работ и контактные формы. Интерфейс построен вокруг быстрого понимания предложения и записи на сервис.",
    projectUrl: "https://carpro.by/",
    tags: "авто, услуги",
    featured: false,
    sortOrder: 12,
    imagePath: "/images/portfolio/carpro.jpg",
  },
  {
    slug: "dolphin",
    title: "Dolphin",
    excerpt: "Многоязычный проект для рынка Молдовы с адаптивной структурой.",
    description: "Веб-проект dolphin.md с международной аудиторией.",
    content:
      "Реализовали сайт для проекта Dolphin: адаптивная вёрстка, структурированная подача услуг/продуктов и удобная навигация для пользователей из Молдовы и соседних рынков.",
    projectUrl: "https://dolphin.md/",
    tags: "международный",
    featured: false,
    sortOrder: 13,
    imagePath: "/images/portfolio/dolphin.jpg",
  },
];
