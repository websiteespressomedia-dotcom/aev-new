import rawProducts from "../data/products.json";

export const allProducts = rawProducts;

export function getBaseName(name = "") {
  return String(name)
    .replace(/\.(jpe?g|png|webp)$/i, "")
    .replace(/\s*\(\d+\)\s*$/i, "")
    .replace(/\s+copy\s*$/i, "")
    .replace(/[_\s-]+F\d+\s*$/i, "")
    .replace(/[_\s-]+F\d+\s*copy\s*$/i, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function slugify(value = "") {
  return encodeURIComponent(
    String(value).trim().toLowerCase().replace(/\s+/g, "-")
  );
}

export const groupedProducts = (() => {
  const grouped = new Map();

  allProducts.forEach((product) => {
    const baseName = getBaseName(product.name);
    if (!grouped.has(baseName)) {
      grouped.set(baseName, {
        id: slugify(baseName),
        baseName,
        name: baseName,
        image: product.image,
        previewImage: product.previewImage,
        size: product.size,
        category: product.category,
        variations: [],
      });
    }

    grouped.get(baseName).variations.push(product);
  });

  return Array.from(grouped.values());
})();
