/**
 * Захват скриншотов сайтов портфолио в public/images/portfolio/
 * Запуск: npx tsx scripts/capture-portfolio-screens.ts
 */
import fs from "node:fs";
import path from "node:path";
import { PORTFOLIO_PROJECTS } from "../src/data/portfolio-projects";

async function main() {
  const { chromium } = await import("playwright");

  const outDir = path.join(process.cwd(), "public", "images", "portfolio");
  fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const project of PORTFOLIO_PROJECTS) {
    const outfile = path.join(outDir, `${project.slug}.jpg`);
    console.log(`Capturing ${project.projectUrl} → ${project.slug}.jpg`);

    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    });

    try {
      await page.goto(project.projectUrl, {
        waitUntil: "domcontentloaded",
        timeout: 45000,
      });
      await page.waitForTimeout(2500);
      await page.screenshot({
        path: outfile,
        type: "jpeg",
        quality: 82,
        fullPage: false,
      });
      console.log(`  ✓ saved`);
    } catch (error) {
      console.warn(`  ✗ failed:`, error);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
