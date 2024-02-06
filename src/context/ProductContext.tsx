"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "../types/product";

type ProductContextType = {
  products: Product[];
};

const ProductContext = createContext<ProductContextType>({
  products: [],
});

export function useProductData(): ProductContextType {
  return useContext(ProductContext);
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function getProducts(): Promise<any> {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/products/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const product = await response.json();

      setProducts(product);
    }
    getProducts();
  }, []);

  const getProductById = (id: string): Product | undefined => {
    return products.find((product) => product.id === id);
  };

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
}
