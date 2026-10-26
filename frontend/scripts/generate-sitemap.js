import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const frontendDir = path.resolve(currentDir, "..");
const publicDir = path.join(frontendDir, "public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const productsPath = path.join(frontendDir, "src/data/products.json");

const baseUrl = "https://aev-new.vercel.app";

const staticRoutes = [
  "/",
  "/about",
  "/collections",
  "/catalogue",
  "/contact",
  "/tile-calculator",
];

const products = JSON.parse(fs.readFileSync(productsPath, "utf8"));

function getBaseName(name = "") {
  return String(name)
    .replace(/\.(jpe?g|png|webp)$/i, "")
    .replace(/\s*\(\d+\)\s*$/i, "")
    .replace(/\s+copy\s*$/i, "")
    .replace(/[_\s-]+F\d+\s*$/i, "")
    .replace(/[_\s-]+F\d+\s*copy\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(value = "") {
  return encodeURIComponent(
    String(value).trim().toLowerCase().replace(/\s+/g, "-")
  );
}

const groupedNames = new Map();

for (const product of products) {
  const baseName = getBaseName(product.name);

  if (!groupedNames.has(baseName)) {
    groupedNames.set(baseName, slugify(baseName));
  }
}

const productRoutes = [...groupedNames.values()].map(
  (slug) => `/porcelain-floor-tiles/${slug}`
);

const urls = [
  ...new Set([...staticRoutes, ...productRoutes]),
];

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((route) => `  <url><loc>${escapeXml(baseUrl + route)}</loc></url>`)
  .join("\n")}
</urlset>
`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(sitemapPath, xml, "utf8");

console.log(`Sitemap generated with ${urls.length} URLs.`);