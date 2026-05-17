import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const items = await prisma.portfolioItem.findMany();
  console.log("count:", items.length);
  if (items[0]) console.log("first:", items[0].slug, items[0].title);
}

main()
  .catch((e) => {
    console.error("ERROR:", e.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
