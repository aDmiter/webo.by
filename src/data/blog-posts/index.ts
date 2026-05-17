import { CMS_CONTENT } from "./cms-content";
import { CONTEXT_ADS_CONTENT } from "./context-ads-content";
import { HOSTING_CONTENT } from "./hosting-content";

export type BlogPostSeed = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
};

export const BLOG_POSTS: BlogPostSeed[] = [
  {
    slug: "kak-vybrat-sistemu-upravleniya-dlya-internet-magazina",
    title: "Как выбрать систему управления для интернет-магазина",
    excerpt:
      "Облачные и коробочные CMS, самописные и готовые решения — как выбрать платформу под масштаб и бюджет интернет-магазина.",
    content: CMS_CONTENT,
    publishedAt: "2019-04-12T10:00:00.000Z",
  },
  {
    slug: "kak-pravilno-vybrat-khosting-dlya-sajta",
    title: "Как правильно выбрать хостинг для сайта?",
    excerpt:
      "Shared, VPS, dedicated, облако и colocation — виды хостинга, критерии выбора и на что смотреть у провайдера.",
    content: HOSTING_CONTENT,
    publishedAt: "2019-06-18T10:00:00.000Z",
  },
  {
    slug: "zachem-nuzhna-kontekstnaya-reklama-google-i-yandex",
    title: "Зачем нужна контекстная реклама Google и Yandex?",
    excerpt:
      "Кому нужен контекст, чем он эффективен, какие цели ставить и как получить бонусы на первые кампании.",
    content: CONTEXT_ADS_CONTENT,
    publishedAt: "2019-09-05T10:00:00.000Z",
  },
];
