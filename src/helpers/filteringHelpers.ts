import { Product } from "../types/product";

export function filterProductsBySearchTerm(
  products: Product[],
  searchTerm: string
): Product[] {
  const filteredProducts = products.filter(
    (product) =>
      typeof product.name === "string" &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return filteredProducts;
}

export function filterProductsByCategory(
  products: Product[],
  category: string
): Product[] {
  const filteredProducts = products.filter(
    (product) =>
      typeof product.category === "string" &&
      product.category.toLowerCase().includes(category.toLowerCase())
  );

  return filteredProducts;
}
