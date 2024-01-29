"use client";

import { Product } from "../types/product";

import ProductCard from "../components/ProductCard";
import Container from "../components/Container";
import ProductGrid from "../components/ProductGrid";

import { useEffect, useState } from "react";

async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/products`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

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
