"use client";

import { Product } from "../types/product";

import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import ProductGrid from "../components/ProductGrid";

import { useProductData } from "../contexts/ProductContext";

export default function HomePage() {
  const { products } = useProductData();

  return (
    <Container title="Products">
      <ProductGrid>
        {products.map((product: Product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </ProductGrid>
    </Container>
  );
}
