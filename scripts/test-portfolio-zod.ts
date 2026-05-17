import { portfolioSchema } from "../src/lib/validations";

const data = {
  title: "ФК «Динамо» Брест",
  slug: "dynamo-brest",
  excerpt: "Официальный сайт футбольного клуба",
  description: "Флагманский проект студии",
  content: "Полный текст",
  imageUrl: "/images/portfolio/dynamo-brest.jpg",
  projectUrl: "https://dynamo-brest.by/",
  tags: "спорт",
  featured: true,
  published: true,
  sortOrder: 1,
};

console.log(JSON.stringify(portfolioSchema.safeParse(data), null, 2));
