/* eslint-disable */
import { getAllProducts, getBaseName } from "@/lib/products";
import CollectionsClient from "./CollectionsClient";

// Since we read the filesystem at build/request time, this must be a Server Component
export default function CollectionsPage() {
  const products = getAllProducts();

  // Group products by base name
  const groupedMap = new Map<string, any>();
  products.forEach(p => {
    const baseName = getBaseName(p.name);
    if (!groupedMap.has(baseName)) {
      groupedMap.set(baseName, {
        id: encodeURIComponent(baseName.replace(/\s+/g, '-').toLowerCase()),
        baseName: baseName,
        name: baseName, // for backwards compatibility with the listing component's search
        image: p.image,
        previewImage: p.previewImage,
        size: p.size,
        category: p.category,
        variations: []
      });
    }
    groupedMap.get(baseName).variations.push(p);
  });

  const groupedProducts = Array.from(groupedMap.values());

  return <CollectionsClient products={groupedProducts} />;
}
