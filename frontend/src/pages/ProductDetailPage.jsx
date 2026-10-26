import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductDetailClient from "../components/collections/ProductDetailClient";
import { groupedProducts } from "../lib/productData";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = groupedProducts.find((item) => item.id === slug);

  useEffect(() => {
    if (product) return;

    document.title = "Design Not Found | Aevitas Ceramics";

    let robots = document.querySelector('meta[name="robots"]');
    const createdRobots = !robots;

    if (!robots) {
      robots = document.createElement("meta");
      robots.name = "robots";
      document.head.appendChild(robots);
    }

    robots.content = "noindex, follow";

    return () => {
      if (createdRobots) {
        robots.remove();
      } else {
        robots.content = "index, follow";
      }
    };
  }, [product]);

  if (!product) {
    return (
      <main className="aev-detail-not-found">
        <p>Design not found.</p>
        <a href="/collections#product-listing">Back to collections</a>
      </main>
    );
  }

  return <ProductDetailClient group={product} />;
}
