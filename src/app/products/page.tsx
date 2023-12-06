"use client";
import { Product } from "@/types/product";
import { useProductData } from "../customHooks/useProductData";
import ProductCard from "../../components/ProductCard";
import Container from "../../components/Container";
import ProductGrid from "../../components/ProductGrid";

export default function ProductPage() {
  const products: Product[] = useProductData();

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
