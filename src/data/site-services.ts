export type SiteServiceSeed = {
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
};

export const SITE_SERVICES: SiteServiceSeed[] = [
  {
    title: "Сайты и лендинги",
    description: "Быстрые, адаптивные страницы с сильной визуальной подачей и анимациями.",
    icon: "web",
    sortOrder: 1,
  },
  {
    title: "Веб-приложения",
    description: "Next.js, API, админки и интеграции под задачи вашего бизнеса.",
    icon: "app",
    sortOrder: 2,
  },
  {
    title: "Поддержка",
    description: "Развитие, оптимизация и сопровождение после запуска.",
    icon: "care",
    sortOrder: 3,
  },
  {
    title: "Монтаж видео",
    description: "Ролики для сайта, соцсетей и рекламы — монтаж, цвет, титры и адаптация под форматы.",
    icon: "video",
    sortOrder: 4,
  },
  {
    title: "Обработка звука",
    description: "Озвучка, подкасты, музыка для роликов — сведение, шумоподавление и мастеринг.",
    icon: "audio",
    sortOrder: 5,
  },
  {
    title: "Контекстная реклама",
    description: "Настройка и ведение кампаний в Google и Яндекс: от стратегии до отчётов по лидам.",
    icon: "ads",
    sortOrder: 6,
  },
];
