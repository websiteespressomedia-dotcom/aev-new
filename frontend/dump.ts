import { getAllProducts } from "./src/lib/products.ts";
import fs from "fs";
const products = getAllProducts();
fs.writeFileSync("./src/lib/products.json", JSON.stringify(products, null, 2));
console.log("Products dumped!");
