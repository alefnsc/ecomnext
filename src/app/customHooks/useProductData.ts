"use client";
import { useEffect, useState } from "react";
import { getProductById, getProductData } from "../services/fetchProducts";
import { Product } from "@/types/product";

export function useProductData(): Product[] {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductData();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
  }, []);

  return products;
}
