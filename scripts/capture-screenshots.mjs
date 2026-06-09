import { chromium } from "playwright";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "docs", "screenshots");
const base = "https://redstream-enitha-s-projects.vercel.app";

const pages = [
  { name: "landing", path: "/" },
  { name: "login", path: "/login" },
  { name: "registration", path: "/registration" },
];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

for (const { name, path: route } of pages) {
  await page.goto(`${base}${route}`, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1200);
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: true,
  });
  console.log(`Saved ${name}.png`);
}

await browser.close();
