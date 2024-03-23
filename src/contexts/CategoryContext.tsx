"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Category } from "../types/category";

type CategoryContextType = {
  categories: Category[];
};

const CategoryContext = createContext<CategoryContextType>({
  categories: [],
});

export function useCategoryData(): CategoryContextType {
  return useContext(CategoryContext);
}

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function getCategories(): Promise<any> {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/categories/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const category = await response.json();

      setCategories(category);
    }
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
}
