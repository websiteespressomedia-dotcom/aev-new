import CollectionsClient from "./CollectionsClient";
import { groupedProducts } from "../lib/productData";

export default function CollectionsPage() {
  return <CollectionsClient products={groupedProducts} />;
}
