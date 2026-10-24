import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import products from "../src/data/products.json" with { type: "json" };

const currentDir = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(currentDir, "../public");
const sitemapPath = path.join(publicDir, "sitemap.xml");
const baseUrl = "https://aev-new.vercel.app";

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

const staticRoutes = [
  "/",
  "/about",
  "/collections",
  "/catalogue",
  "/contact",
  "/tile-calculator",
];

const uniqueProducts = new Map();

for (const product of products) {
  const name = getBaseName(product.name);
  if (!name) continue;

  const slug = slugify(name);
  if (!uniqueProducts.has(slug)) {
    uniqueProducts.set(slug, slug);
  }
}

const productRoutes = [...uniqueProducts.values()].map(
  (slug) => `/porcelain-floor-tiles/${slug}`
);

const urls = [...new Set([...staticRoutes, ...productRoutes])];

const escapeXml = (value) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((route) => `  <url><loc>${escapeXml(baseUrl + route)}</loc></url>`).join("\n")}
</urlset>
`;

fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(sitemapPath, xml, "utf8");

console.log(`Sitemap generated with ${urls.length} URLs.`);