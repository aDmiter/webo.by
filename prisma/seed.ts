import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PORTFOLIO_PROJECTS } from "../src/data/portfolio-projects";
import { SITE_SERVICES } from "../src/data/site-services";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      siteName: "WEBO.by",
      tagline: "Студия web-разработки",
      colorBackground: "#ffffff",
      colorPrimary: "#03ccbd",
      colorAccent: "#ff6b4a",
      colorForeground: "#0f172a",
      contactEmail: "hello@webo.by",
      contactPhone: "+375 (00) 000-00-00",
      contactAddress: "Минск, Беларусь",
    },
    update: {},
  });

  const email = process.env.ADMIN_EMAIL ?? "admin@webo.by";
  const password = process.env.ADMIN_PASSWORD ?? "changeme";
  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    create: { email, passwordHash, name: "Admin" },
    update: { passwordHash },
  });

  for (const service of SITE_SERVICES) {
    const existing = await prisma.service.findFirst({ where: { title: service.title } });
    if (existing) {
      await prisma.service.update({
        where: { id: existing.id },
        data: service,
      });
    } else {
      await prisma.service.create({ data: service });
    }
  }

  for (const project of PORTFOLIO_PROJECTS) {
    await prisma.portfolioItem.upsert({
      where: { slug: project.slug },
      create: {
        slug: project.slug,
        title: project.title,
        excerpt: project.excerpt,
        description: project.description,
        content: project.content,
        projectUrl: project.projectUrl,
        tags: project.tags,
        featured: project.featured,
        sortOrder: project.sortOrder,
        imageUrl: project.imagePath,
        published: true,
      },
      update: {
        title: project.title,
        excerpt: project.excerpt,
        description: project.description,
        content: project.content,
        projectUrl: project.projectUrl,
        tags: project.tags,
        featured: project.featured,
        sortOrder: project.sortOrder,
        imageUrl: project.imagePath,
        published: true,
      },
    });
  }

  console.log("Seed complete. Admin:", email);
  console.log("Portfolio projects:", PORTFOLIO_PROJECTS.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
