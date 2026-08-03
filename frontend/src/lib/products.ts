import productsData from "./products.json";

export interface RawProduct {
  name: string;
  image: string;
  previewImage: string;
  size: string;
  category: string;
}

export function getAllProducts(): RawProduct[] {
  return productsData;
}

export function getBaseName(fileName: string): string {
  // Strip size parts like "-600x1200", "-800x1600", "-1200x1800", "-1200x2400"
  let name = fileName.replace(/-(600x1200|800x1600|1200x1800|1200x2400|800x2400|1000x3000|1200x1200|800x800|600x600|400x400|300x300)/i, "");
  // Strip finishes like "-glossy", "-matt", "-high-gloss", "-carving", etc.
  name = name.replace(/-(glossy|matt|high-gloss|carving|rustic|satin|sugar)/i, "");
  // Strip preview suffix if present
  name = name.replace(/-preview/i, "");
  return name;
}
