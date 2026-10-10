import { useParams } from "react-router-dom";
import ProductDetailClient from "../components/collections/ProductDetailClient";
import { groupedProducts } from "../lib/productData";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const product = groupedProducts.find((item) => item.id === slug);

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
